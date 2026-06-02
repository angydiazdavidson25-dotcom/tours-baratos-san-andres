// Tours Baratos San Andres - WhatsApp Bot (Twilio Function)
var TOURS = [
  { id:1, name:"Tour Platino (Ponton)", price:65000, schedule:"8:30 AM - 4:00 PM", checkIn:"8:15 AM", point:"Muelle Toninos", desc:"Recorrido en ponton por Manglares, Acuario, Rocky Cay y El Palito." },
  { id:2, name:"Yate Rumba", price:130000, schedule:"Tarde / Noche", checkIn:"30 min antes", point:"Muelle Toninos", desc:"Fiesta en alta mar, DJ, barra libre licor nacional." },
  { id:3, name:"Acuario Directo", price:45000, schedule:"9:00 AM - 3:00 PM", checkIn:"8:45 AM", point:"Muelle Toninos", desc:"Snorkel con peces de colores y mantarrayas." },
  { id:4, name:"Johnny Cay", price:55000, schedule:"9:00 AM - 3:30 PM", checkIn:"8:45 AM", point:"Muelle Toninos", desc:"Dia completo en el cayo principal." },
  { id:5, name:"Johnny Cay + Acuario", price:65000, schedule:"8:30 AM - 3:30 PM", checkIn:"8:15 AM", point:"Muelle Toninos", desc:"Los dos cayos mas famosos en un dia." },
  { id:6, name:"Semi-Submarino", price:110000, schedule:"Varias salidas (1.5h)", checkIn:"15 min antes", point:"Muelle Toninos", desc:"Arrecifes por ventanas panoramicas bajo el agua." },
  { id:7, name:"Noche Blanca", price:245000, schedule:"7:00 PM - 10:00 PM", checkIn:"6:30 PM", point:"Marina Portofino", desc:"Cena buffet, bar premium, crucero VIP. Dress code: blanco." },
  { id:8, name:"Buceo Mini-curso", price:110000, schedule:"Manana/Tarde (3h)", checkIn:"30 min antes", point:"Centro de Buceo", desc:"Curso PADI + 1 inmersion 12m. Equipo incluido." },
  { id:9, name:"Parasail", price:220000, schedule:"Turnos cada hora", checkIn:"15 min antes", point:"Playa Spratt Bight", desc:"Vuelo a 100m sobre el mar." },
  { id:10, name:"Paddle Nocturno LED", price:220000, schedule:"4:30 PM+", checkIn:"4:15 PM", point:"Coco Loco", desc:"Tablas LED transparentes de noche." },
  { id:11, name:"Tour Siete Colores", price:220000, schedule:"Amanecer - Mediodia", checkIn:"5:30 AM", point:"Chameys Nautica", desc:"Catamaran a vela por los 7 colores del mar." },
  { id:12, name:"Amanecer en Ponton", price:130000, schedule:"4:30 AM - 8:00 AM", checkIn:"4:00 AM", point:"Recogida hotel", desc:"Amanecer en alta mar, musica suave, cafe." }
];

var convos = {};
function fmt(n) { return "$" + Number(n).toLocaleString("es-CO"); }

function catalogo() {
  var m = "🏝️ *TOURS BARATOS SAN ANDRES*\n━━━━━━━━━━━━━━━━━━━━\n\n";
  TOURS.forEach(function(t, i) {
    m += (i+1) + ". *" + t.name + "* - " + fmt(t.price) + "/persona\n   🕐 " + t.schedule + " | 📍 " + t.point + "\n\n";
  });
  m += "⚠️ _Muelles privados: ingreso se paga directo, NO incluido._\n\n¿Cual te interesa? Escribe el *numero* o *nombre* 👆";
  return m;
}

function detalle(t) {
  var m = "🏝️ *" + t.name.toUpperCase() + "*\n━━━━━━━━━━━━━━━━━━━━\n\n";
  m += "💰 *" + fmt(t.price) + "* por persona\n🕐 *Horario:* " + t.schedule + "\n⏰ *Check-in:* " + t.checkIn + "\n📍 *Encuentro:* " + t.point + "\n\n" + t.desc + "\n\n";
  m += "⚠️ _Ingreso al muelle NO incluido_\n\n";
  if (t.name.toLowerCase().indexOf("buceo") >= 0) {
    m += "🤿 *RESTRICCIONES:*\n• No alcohol 24h antes\n• No problemas cardiacos/respiratorios\n• No embarazo\n• No vuelos 12h antes ni 18h despues\n\n";
  }
  m += "¿Quieres reservar? Escribe *SI* 📝";
  return m;
}

function buscar(txt) {
  var l = txt.toLowerCase().trim();
  var n = parseInt(l);
  if (n >= 1 && n <= 12) return TOURS[n-1];
  var keys = {platino:0,ponton:0,yate:1,rumba:1,acuario:2,"johnny cay + acuario":4,"johnny acuario":4,johnny:3,cay:3,submarino:5,semi:5,"noche blanca":6,blanca:6,buceo:7,parasail:8,paddle:9,led:9,"siete colores":10,colores:10,amanecer:11};
  for (var k in keys) { if (l.indexOf(k) >= 0) return TOURS[keys[k]]; }
  for (var i = 0; i < TOURS.length; i++) { if (TOURS[i].name.toLowerCase().indexOf(l) >= 0) return TOURS[i]; }
  return null;
}

function procesar(phone, txt) {
  if (!convos[phone]) convos[phone] = { step:"inicio", data:{} };
  var c = convos[phone];
  var l = txt.toLowerCase().trim();

  if (l==="menu"||l==="inicio"||l==="hola"||l==="hi"||l==="buenas"||l==="buenos dias"||l==="buenas tardes") {
    c.step="inicio"; c.data={};
    return "¡Hola! 👋 Bienvenido a *Tours Baratos San Andres* 🏝️\n\nSoy tu asistente. ¿Que necesitas?\n\n1️⃣ Ver *catalogo*\n2️⃣ Hacer una *reserva*\n3️⃣ *Hablar con asesor*\n\nO escribe el nombre de un tour 😊";
  }
  if (l==="catalogo"||l==="tours"||l==="1"||l==="precios") { c.step="catalogo"; return catalogo(); }
  if (l==="asesor"||l==="3"||l==="hablar"||l==="humano") { c.step="inicio"; return "📞 Te comunico:\n👉 wa.me/573222123751\n\nEscribe *menu* para volver."; }
  if (l==="reservar"||l==="reserva"||l==="2") { c.step="elegir"; return "¿Que tour quieres? 📝\n\n" + catalogo(); }

  if (c.step==="inicio"||c.step==="catalogo"||c.step==="elegir") {
    var t = buscar(txt);
    if (t) { c.data.tour=t; c.step="detalle"; return detalle(t); }
  }
  if (c.step==="detalle") {
    if (l==="si"||l==="sí"||l==="dale"||l==="va"||l==="quiero") { c.step="nombre"; return "📝 *Reserva: " + c.data.tour.name + "*\n\n¿Tu *nombre completo*?"; }
    var t2 = buscar(txt);
    if (t2) { c.data.tour=t2; return detalle(t2); }
    c.step="catalogo"; return "Sin problema. Escribe *catalogo* o *menu*.";
  }
  if (c.step==="nombre") { c.data.nombre=txt.trim(); c.step="personas"; return "👋 *" + c.data.nombre + "*\n\n¿Cuantas *personas*?"; }
  if (c.step==="personas") {
    var q=parseInt(txt); if(isNaN(q)||q<1||q>50) return "Escribe un numero valido (ej: *2*)";
    c.data.qty=q; c.data.total=q*c.data.tour.price; c.step="fecha";
    return "👥 "+q+" personas = *"+fmt(c.data.total)+"*\n\n¿Para que *fecha*?";
  }
  if (c.step==="fecha") { c.data.fecha=txt.trim(); c.step="hotel"; return "📅 *"+c.data.fecha+"*\n\n¿En que *hotel* estan?"; }
  if (c.step==="hotel") {
    c.data.hotel=txt.trim(); c.step="confirmar";
    return "📋 *RESUMEN*\n━━━━━━━━━━━━\n\n🏝️ "+c.data.tour.name+"\n👤 "+c.data.nombre+"\n👥 "+c.data.qty+" personas\n📅 "+c.data.fecha+"\n🏨 "+c.data.hotel+"\n💰 *"+fmt(c.data.total)+"*\n\n⏰ Check-in: "+c.data.tour.checkIn+"\n📍 "+c.data.tour.point+"\n\n¿Correcto? Escribe *CONFIRMAR* ✅\nO *CORREGIR* para cambiar.";
  }
  if (c.step==="confirmar") {
    if (l==="confirmar"||l==="confirmo"||l==="si"||l==="ok") {
      c.step="listo";
      var r = "✅ *RESERVA CONFIRMADA!*\n━━━━━━━━━━━━\n\n";
      r += "🎉 *" + c.data.tour.name + "* reservado.\n\n";
      r += "📌 *Recuerda:*\n• Llegar a *" + c.data.tour.point + "* a las *" + c.data.tour.checkIn + "*\n• Documento de identidad\n• Ingreso muelle se paga directo\n• Bloqueador y ropa comoda\n\n";
      r += "💳 *Pagar:*\n• Efectivo el dia del tour\n• Nequi/Daviplata: +57 322 212 3751\n• Transferencia bancaria\n\n";
      r += "Escribe *menu* para volver.\n_Tours Baratos - Nissi VIP Travel_ 🏝️";
      // Save to Firebase
      try {
        var fbUrl = "https://tours-baratos-52996-default-rtdb.firebaseio.com";
        var rid = Date.now().toString(36) + Math.random().toString(36).substr(2,5);
        var reservation = {
          id: rid, tourName: c.data.tour.name, tourId: c.data.tour.id,
          clientName: c.data.nombre, clientPhone: phone,
          qty: c.data.qty, total: c.data.total,
          date: c.data.fecha, hotel: c.data.hotel,
          status: "pendiente", channel: "whatsapp-bot",
          createdAt: new Date().toISOString()
        };
        fetch(fbUrl + "/data/tb_ventas/" + rid + ".json", {
          method: "PUT", headers: {"Content-Type":"application/json"},
          body: JSON.stringify(reservation)
        }).catch(function(e){ console.log("Firebase error",e); });
      } catch(e) { console.log("FB save error",e); }
      return r;
    }
    if (l==="corregir"||l==="cambiar") { c.step="nombre"; return "Ok, de nuevo.\n\n¿Tu *nombre completo*?"; }
  }
  if (c.step==="listo") { c.step="inicio"; }

  var tf = buscar(txt);
  if (tf) { c.data.tour=tf; c.step="detalle"; return detalle(tf); }

  return "No entendi 😅\n\n• *Menu* - opciones\n• *Catalogo* - ver tours\n• *Reservar* - nueva reserva\n• *Asesor* - hablar con persona\n\nO escribe el nombre de un tour 🏝️";
}

exports.handler = function(context, event, callback) {
  var twiml = new Twilio.twiml.MessagingResponse();
  var phone = (event.From || "").replace("whatsapp:","");
  var body = event.Body || "";
  var reply = procesar(phone, body);
  twiml.message(reply);
  callback(null, twiml);
};
