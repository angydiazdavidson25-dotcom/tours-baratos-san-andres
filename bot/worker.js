/**
 * Tours Baratos San Andres - WhatsApp Bot
 * Cloudflare Worker webhook for Twilio WhatsApp
 *
 * Handles: tour info, pricing, reservations, itineraries
 * Connected to: Firebase Realtime Database
 */

// ===== CONFIGURATION (set these as Worker environment variables) =====
// TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER
// FIREBASE_DB_URL, ANTHROPIC_API_KEY

// ===== TOUR CATALOG =====
const TOURS = [
  { id:1, name:"Tour Platino (Ponton)", price:65000, schedule:"8:30 AM - 4:00 PM", checkIn:"8:15 AM", meetingPoint:"Muelle Toninos", desc:"Recorrido completo en ponton por Manglares, Acuario, Rocky Cay y El Palito. Musica en vivo." },
  { id:2, name:"Yate Rumba", price:130000, schedule:"Tarde / Noche", checkIn:"30 min antes", meetingPoint:"Muelle Toninos", desc:"Fiesta en alta mar con DJ, barra libre de licor nacional." },
  { id:3, name:"Acuario Directo", price:45000, schedule:"9:00 AM - 3:00 PM", checkIn:"8:45 AM", meetingPoint:"Muelle Toninos", desc:"Traslado directo al Acuario para snorkel con peces de colores." },
  { id:4, name:"Johnny Cay Directo", price:55000, schedule:"9:00 AM - 3:30 PM", checkIn:"8:45 AM", meetingPoint:"Muelle Toninos", desc:"Dia completo en el cayo principal de San Andres." },
  { id:5, name:"Johnny Cay + Acuario", price:65000, schedule:"8:30 AM - 3:30 PM", checkIn:"8:15 AM", meetingPoint:"Muelle Toninos", desc:"Tour clasico: Johnny Cay y Acuario en un solo dia." },
  { id:6, name:"Semi-Submarino", price:110000, schedule:"Varias salidas (1.5h)", checkIn:"15 min antes", meetingPoint:"Muelle Toninos", desc:"Observa arrecifes y vida marina por ventanas panoramicas bajo el agua." },
  { id:7, name:"Noche Blanca", price:245000, schedule:"7:00 PM - 10:00 PM", checkIn:"6:30 PM", meetingPoint:"Marina Portofino", desc:"Cena buffet mariscos, bar abierto premium, crucero VIP. Dress code: blanco." },
  { id:8, name:"Buceo (Mini-curso)", price:110000, schedule:"Manana / Tarde (3h)", checkIn:"30 min antes", meetingPoint:"Centro de Buceo", desc:"Mini-curso PADI: teoria + 1 inmersion hasta 12m. Incluye equipo completo." },
  { id:9, name:"Parasail", price:220000, schedule:"Turnos cada hora", checkIn:"15 min antes", meetingPoint:"Playa Spratt Bight", desc:"Vuela a 100m sobre el mar con vista panoramica de toda la isla." },
  { id:10, name:"Paddle Nocturno LED", price:220000, schedule:"4:30 PM en adelante", checkIn:"4:15 PM", meetingPoint:"Coco Loco", desc:"Rema sobre aguas iluminadas con tablas LED transparentes." },
  { id:11, name:"Tour Siete Colores", price:220000, schedule:"Amanecer - Medio dia", checkIn:"5:30 AM", meetingPoint:"Chameys Nautica", desc:"Catamaran a vela por los 7 colores del mar con snorkel." },
  { id:12, name:"Amanecer en Ponton", price:130000, schedule:"~4:30 AM - 8:00 AM", checkIn:"4:00 AM", meetingPoint:"Recogida en hotel", desc:"Amanecer en alta mar en ponton privado con musica suave y cafe." }
];

// ===== CONVERSATION STATE (in-memory, per phone number) =====
const conversations = new Map();

function getConversation(phone) {
  if (!conversations.has(phone)) {
    conversations.set(phone, { step: 'inicio', data: {}, lastActivity: Date.now() });
  }
  return conversations.get(phone);
}

// ===== FORMAT HELPERS =====
function formatCOP(n) { return "$" + n.toLocaleString('es-CO'); }

function buildCatalog() {
  let msg = "🏝️ *TOURS BARATOS SAN ANDRES*\n";
  msg += "━━━━━━━━━━━━━━━━━━━━\n\n";
  TOURS.forEach(function(t) {
    msg += "🔹 *" + t.name + "*\n";
    msg += "💰 " + formatCOP(t.price) + " por persona\n";
    msg += "🕐 " + t.schedule + "\n";
    msg += "📍 " + t.meetingPoint + "\n\n";
  });
  msg += "━━━━━━━━━━━━━━━━━━━━\n";
  msg += "⚠️ _Los muelles son privados. El ingreso se paga directo en el muelle y NO esta incluido._\n\n";
  msg += "¿Cual te interesa? Escribe el *nombre* o *numero* del tour 👆";
  return msg;
}

function buildTourDetail(tour) {
  let msg = "🏝️ *" + tour.name.toUpperCase() + "*\n";
  msg += "━━━━━━━━━━━━━━━━━━━━\n\n";
  msg += "💰 *Precio:* " + formatCOP(tour.price) + " por persona\n";
  msg += "🕐 *Horario:* " + tour.schedule + "\n";
  msg += "⏰ *Check-in:* " + tour.checkIn + "\n";
  msg += "📍 *Punto de encuentro:* " + tour.meetingPoint + "\n\n";
  msg += "📋 " + tour.desc + "\n\n";
  msg += "⚠️ _Ingreso al muelle es privado y se paga directo (no incluido)._\n\n";
  if (tour.name.toLowerCase().indexOf('buceo') >= 0) {
    msg += "🤿 *RESTRICCIONES DE BUCEO:*\n";
    msg += "• No alcohol 24h antes\n";
    msg += "• No problemas cardiacos/respiratorios\n";
    msg += "• No embarazo\n";
    msg += "• No vuelos 12h antes ni 18h despues\n";
    msg += "• Saber nadar\n\n";
  }
  msg += "¿Quieres reservar? Escribe *SI* y te pido los datos 📝";
  return msg;
}

// ===== FIND TOUR =====
function findTour(text) {
  var lower = text.toLowerCase().trim();
  // By number
  var num = parseInt(lower);
  if (num >= 1 && num <= TOURS.length) return TOURS[num - 1];
  // By name match
  for (var i = 0; i < TOURS.length; i++) {
    if (lower.indexOf(TOURS[i].name.toLowerCase().split('(')[0].trim().split(' ').slice(0,2).join(' ').toLowerCase()) >= 0) return TOURS[i];
    if (TOURS[i].name.toLowerCase().indexOf(lower) >= 0) return TOURS[i];
  }
  // Partial matches
  var keywords = {
    'platino': 1, 'ponton': 1, 'yate': 2, 'rumba': 2, 'acuario': 3,
    'johnny': 4, 'cay': 4, 'johnny cay': 4, 'johnny + acuario': 5, 'johnny acuario': 5,
    'submarino': 6, 'semi': 6, 'noche blanca': 7, 'blanca': 7, 'buceo': 8,
    'parasail': 9, 'paddle': 10, 'led': 10, 'siete colores': 11, 'colores': 11,
    'amanecer': 12
  };
  for (var key in keywords) {
    if (lower.indexOf(key) >= 0) return TOURS[keywords[key] - 1];
  }
  return null;
}

// ===== PROCESS MESSAGE =====
async function processMessage(phone, text, env) {
  var conv = getConversation(phone);
  var lower = text.toLowerCase().trim();
  conv.lastActivity = Date.now();

  // Global commands
  if (lower === 'menu' || lower === 'inicio' || lower === 'hola' || lower === 'hi' || lower === 'hello' || lower === 'buenos dias' || lower === 'buenas' || lower === 'buenas tardes' || lower === 'buenas noches') {
    conv.step = 'inicio';
    conv.data = {};
    return "¡Hola! 👋 Bienvenido a *Tours Baratos San Andres* 🏝️\n\n" +
      "Soy tu asistente virtual. ¿En que te puedo ayudar?\n\n" +
      "1️⃣ Ver *catalogo* de tours\n" +
      "2️⃣ *Precios* y disponibilidad\n" +
      "3️⃣ Hacer una *reserva*\n" +
      "4️⃣ *Hablar con un asesor*\n\n" +
      "Escribe el numero o lo que necesites 😊";
  }

  if (lower === 'catalogo' || lower === 'tours' || lower === 'ver tours' || lower === '1') {
    conv.step = 'viendo_catalogo';
    return buildCatalog();
  }

  if (lower === 'precios' || lower === '2') {
    conv.step = 'viendo_catalogo';
    return buildCatalog();
  }

  if (lower === 'asesor' || lower === 'asesora' || lower === 'hablar' || lower === '4' || lower === 'humano' || lower === 'persona') {
    conv.step = 'inicio';
    return "📞 Te comunico con un asesor:\n\n" +
      "👉 WhatsApp: wa.me/573222123751\n\n" +
      "_Tambien puedes llamarnos directamente al +57 322 212 3751_\n\n" +
      "Escribe *menu* para volver al inicio.";
  }

  // Reservation flow
  if (lower === 'reservar' || lower === 'reserva' || lower === '3') {
    conv.step = 'elegir_tour';
    return "¡Perfecto! 📝\n\n¿Que tour quieres reservar?\n\n" + buildCatalog();
  }

  // Step: elegir_tour or viendo_catalogo - try to match a tour
  if (conv.step === 'inicio' || conv.step === 'viendo_catalogo' || conv.step === 'elegir_tour') {
    var tour = findTour(text);
    if (tour) {
      conv.data.tour = tour;
      conv.step = 'tour_detalle';
      return buildTourDetail(tour);
    }
  }

  // Step: tour_detalle - waiting for SI to reserve
  if (conv.step === 'tour_detalle') {
    if (lower === 'si' || lower === 'sí' || lower === 'dale' || lower === 'reservar' || lower === 'quiero' || lower === 'va') {
      conv.step = 'pedir_nombre';
      return "📝 *Empecemos con la reserva de " + conv.data.tour.name + "*\n\n¿Cual es tu *nombre completo*?";
    }
    // Maybe they typed another tour
    var tour2 = findTour(text);
    if (tour2) {
      conv.data.tour = tour2;
      return buildTourDetail(tour2);
    }
    conv.step = 'viendo_catalogo';
    return "No hay problema. Escribe *catalogo* para ver los tours o *menu* para volver al inicio.";
  }

  // Step: pedir_nombre
  if (conv.step === 'pedir_nombre') {
    conv.data.clientName = text.trim();
    conv.step = 'pedir_personas';
    return "Perfecto, *" + conv.data.clientName + "* 👋\n\n¿Cuantas *personas* van? (incluido tu)";
  }

  // Step: pedir_personas
  if (conv.step === 'pedir_personas') {
    var qty = parseInt(text);
    if (isNaN(qty) || qty < 1 || qty > 50) {
      return "Por favor escribe un numero valido de personas (ej: *2*)";
    }
    conv.data.qty = qty;
    conv.data.total = qty * conv.data.tour.price;
    conv.step = 'pedir_fecha';
    return "👥 " + qty + " personas\n💰 Total: *" + formatCOP(conv.data.total) + "*\n\n¿Para que *fecha*? (ej: mañana, 15 de junio, 2026-06-15)";
  }

  // Step: pedir_fecha
  if (conv.step === 'pedir_fecha') {
    conv.data.date = text.trim();
    conv.step = 'pedir_hotel';
    return "📅 Fecha: *" + conv.data.date + "*\n\n¿En que *hotel* estan hospedados? (o zona/direccion)";
  }

  // Step: pedir_hotel
  if (conv.step === 'pedir_hotel') {
    conv.data.hotel = text.trim();
    conv.step = 'confirmar';

    var summary = "📋 *RESUMEN DE TU RESERVA*\n";
    summary += "━━━━━━━━━━━━━━━━━━━━\n\n";
    summary += "🏝️ *Tour:* " + conv.data.tour.name + "\n";
    summary += "👤 *Nombre:* " + conv.data.clientName + "\n";
    summary += "👥 *Personas:* " + conv.data.qty + "\n";
    summary += "📅 *Fecha:* " + conv.data.date + "\n";
    summary += "🏨 *Hotel:* " + conv.data.hotel + "\n";
    summary += "💰 *Total:* " + formatCOP(conv.data.total) + "\n\n";
    summary += "⏰ *Check-in:* " + conv.data.tour.checkIn + "\n";
    summary += "📍 *Punto de encuentro:* " + conv.data.tour.meetingPoint + "\n\n";
    summary += "⚠️ _Ingreso al muelle se paga directo (no incluido)_\n\n";
    summary += "¿Todo correcto? Escribe *CONFIRMAR* para reservar ✅\n";
    summary += "O escribe *CORREGIR* para cambiar algo.";
    return summary;
  }

  // Step: confirmar
  if (conv.step === 'confirmar') {
    if (lower === 'confirmar' || lower === 'confirmo' || lower === 'si' || lower === 'ok') {
      // Save to Firebase
      var reservationId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      var reservation = {
        id: reservationId,
        tourId: conv.data.tour.id,
        tourName: conv.data.tour.name,
        clientName: conv.data.clientName,
        clientPhone: phone,
        qty: conv.data.qty,
        total: conv.data.total,
        date: conv.data.date,
        hotel: conv.data.hotel,
        status: 'pendiente',
        channel: 'whatsapp-bot',
        createdAt: new Date().toISOString()
      };

      // Try to save to Firebase
      try {
        if (env.FIREBASE_DB_URL) {
          await fetch(env.FIREBASE_DB_URL + '/data/tb_reservations/' + reservationId + '.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
          });
        }
      } catch(e) {
        console.error('Firebase save error:', e);
      }

      conv.step = 'reservado';
      var confirm = "✅ *¡RESERVA CONFIRMADA!*\n";
      confirm += "━━━━━━━━━━━━━━━━━━━━\n\n";
      confirm += "🎉 Tu reserva para *" + conv.data.tour.name + "* ha sido registrada.\n\n";
      confirm += "📌 *Recuerda:*\n";
      confirm += "• Llegar a *" + conv.data.tour.meetingPoint + "* a las *" + conv.data.tour.checkIn + "*\n";
      confirm += "• Llevar documento de identidad\n";
      confirm += "• El ingreso al muelle se paga directo\n";
      confirm += "• Llevar bloqueador, ropa comoda y efectivo\n\n";
      confirm += "💳 *Para pagar puedes:*\n";
      confirm += "• Efectivo el dia del tour\n";
      confirm += "• Nequi/Daviplata al +57 322 212 3751\n";
      confirm += "• Transferencia bancaria\n\n";
      confirm += "¿Alguna pregunta? Escribe *menu* para volver al inicio.\n\n";
      confirm += "_Tours Baratos San Andres - Nissi VIP Travel & Tours_ 🏝️";
      return confirm;
    }
    if (lower === 'corregir' || lower === 'cambiar') {
      conv.step = 'pedir_nombre';
      return "Ok, empecemos de nuevo.\n\n¿Cual es tu *nombre completo*?";
    }
  }

  // Default / fallback
  if (conv.step === 'reservado') {
    conv.step = 'inicio';
  }

  // Try to match a tour from any state
  var tourMatch = findTour(text);
  if (tourMatch) {
    conv.data.tour = tourMatch;
    conv.step = 'tour_detalle';
    return buildTourDetail(tourMatch);
  }

  // Nothing matched
  return "No entendi tu mensaje 😅\n\nPuedes escribir:\n• *Menu* - ver opciones\n• *Catalogo* - ver tours\n• *Reservar* - hacer una reserva\n• *Asesor* - hablar con una persona\n\nO escribe el nombre de un tour directamente 🏝️";
}

// ===== SEND WHATSAPP MESSAGE VIA TWILIO =====
async function sendWhatsApp(to, body, env) {
  var url = 'https://api.twilio.com/2010-04-01/Accounts/' + env.TWILIO_ACCOUNT_SID + '/Messages.json';
  var auth = btoa(env.TWILIO_ACCOUNT_SID + ':' + env.TWILIO_AUTH_TOKEN);

  await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + auth,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      From: 'whatsapp:' + env.TWILIO_WHATSAPP_NUMBER,
      To: to,
      Body: body
    })
  });
}

// ===== CLOUDFLARE WORKER HANDLER =====
export default {
  async fetch(request, env) {
    var url = new URL(request.url);

    // Health check
    if (url.pathname === '/' && request.method === 'GET') {
      return new Response('Tours Baratos WhatsApp Bot - Active ✅', { status: 200 });
    }

    // Twilio webhook
    if (url.pathname === '/webhook' && request.method === 'POST') {
      try {
        var formData = await request.formData();
        var from = formData.get('From') || '';
        var body = formData.get('Body') || '';

        if (!from || !body) {
          return new Response('OK', { status: 200 });
        }

        // Extract phone number
        var phone = from.replace('whatsapp:', '');

        // Process the message
        var reply = await processMessage(phone, body, env);

        // Send reply via Twilio
        await sendWhatsApp(from, reply, env);

        return new Response('OK', { status: 200 });
      } catch (err) {
        console.error('Webhook error:', err);
        return new Response('Error', { status: 500 });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
