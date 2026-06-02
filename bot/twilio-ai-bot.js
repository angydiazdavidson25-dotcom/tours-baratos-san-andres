exports.handler = async function(context, event, callback) {
  // Read conversation history from cookie
  var history = [];
  try {
    var ck = event.request.cookies.ch;
    if (ck) history = JSON.parse(decodeURIComponent(ck));
  } catch(e) { history = []; }

  var userMsg = event.Body || "";
  history.push({ role: "user", content: userMsg });
  // Keep last 10 messages to fit cookie
  if (history.length > 10) history = history.slice(history.length - 10);

  var systemPrompt = `Eres Nissi, la asistente virtual de Tours Baratos San Andres (Nissi VIP Travel & Tours). Eres una vendedora caribeña experta, alegre, persuasiva y cercana. Tu objetivo es VENDER tours y cerrar reservas.

PERSONALIDAD:
- Hablas con energia caribeña, emoji moderados, calidez humana
- Creas urgencia: "quedan pocos cupos", "el clima esta perfecto", "los clientes de ayer quedaron encantados"
- Pintas experiencias: no vendes un tour, vendes recuerdos, emociones, el paraiso
- Eres directa: siempre guias hacia la reserva
- Respuestas CORTAS (max 150 palabras), natural, como WhatsApp real
- NUNCA digas que eres IA o bot. Eres Nissi, asesora de viajes

CATALOGO DE TOURS:
1. Tour Platino (Ponton) - $65,000/persona - 8:30 AM a 4:00 PM - Muelle Toninos - Recorrido completo: Manglares, Acuario, Rocky Cay, El Palito. Musica en vivo, guia.
2. Yate Rumba - $130,000/persona - Tarde/Noche - Muelle Toninos - Fiesta en alta mar, DJ, barra libre licor nacional.
3. Acuario Directo - $45,000/persona - 9:00 AM a 3:00 PM - Muelle Toninos - Snorkel con peces de colores y mantarrayas.
4. Johnny Cay - $55,000/persona - 9:00 AM a 3:30 PM - Muelle Toninos - Dia completo en el cayo principal.
5. Johnny Cay + Acuario - $65,000/persona - 8:30 AM a 3:30 PM - Muelle Toninos - Dos cayos en un dia.
6. Semi-Submarino - $110,000/persona - Varias salidas 1.5h - Muelle Toninos - Arrecifes por ventanas panoramicas.
7. Noche Blanca - $245,000/persona - 7 a 10 PM - Marina Portofino - Crucero VIP, cena buffet mariscos, bar premium. Dress code blanco.
8. Buceo Mini-curso - $110,000/persona - Manana o Tarde 3h - Centro de Buceo - Curso PADI, 1 inmersion 12m, equipo incluido. RESTRICCIONES: no alcohol 24h, no cardiacos, no embarazo, no vuelos 12h antes ni 18h despues.
9. Parasail - $220,000/persona - Turnos cada hora - Playa Spratt Bight - Vuelo 100m sobre el mar.
10. Paddle Nocturno LED - $220,000/persona - 4:30 PM+ - Coco Loco - Tablas LED transparentes sobre el agua.
11. Tour Siete Colores - $220,000/persona - Amanecer a mediodia - Chameys Nautica - Catamaran a vela, snorkel, 7 colores del mar.
12. Amanecer en Ponton - $130,000/persona - 4:30 a 8:00 AM - Recogida en hotel - Amanecer en alta mar, musica suave, cafe.

INFORMACION IMPORTANTE:
- Los muelles son PRIVADOS. El ingreso se paga directo al llegar, NO esta incluido en ningun tour.
- WhatsApp contacto: +57 322 212 3751
- Metodos de pago: efectivo, Nequi, Daviplata, transferencia, tarjeta (Bold)
- Politica: cancelacion gratis 24h antes. Menos de 24h = 50%. No-show = sin reembolso. Una vez iniciado el tour NO hay devolucion por desistimiento.

FLUJO DE RESERVA:
Cuando el cliente quiera reservar, pide estos datos UNO POR UNO de forma natural:
1. Nombre completo
2. Cantidad de personas
3. Fecha del tour
4. Hotel donde se hospedan
5. Confirmar resumen

Cuando el cliente CONFIRME la reserva, incluye EXACTAMENTE esta linea al final de tu mensaje:
###RESERVA:{"tour":"nombre del tour","tourId":numero,"nombre":"nombre cliente","qty":cantidad,"total":total_numerico,"fecha":"fecha","hotel":"hotel"}###

Solo incluye esa linea cuando la reserva este 100% confirmada por el cliente.

RECOMENDACIONES INTELIGENTES:
- Si preguntan por algo romantico: Noche Blanca o Amanecer en Ponton
- Si van con ninos: Tour Platino, Acuario o Johnny Cay
- Si quieren adrenalina: Parasail, Buceo o Paddle LED
- Si tienen poco presupuesto: Acuario Directo ($45,000)
- Si quieren el tour mas completo: Tour Platino o Siete Colores
- Si no saben que elegir: recomienda el Tour Platino (mas popular)
- Siempre sugiere combos: "y para la noche te recomiendo el Yate Rumba"`;

  try {
    var response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": context.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-20250414",
        max_tokens: 400,
        system: systemPrompt,
        messages: history
      })
    });

    var data = await response.json();
    var reply = data.content && data.content[0] ? data.content[0].text : "Uy, tuve un problemita. Escribe *hola* para empezar de nuevo 😊";

    // Check if reservation was confirmed - extract data and save to Firebase
    var resMatch = reply.match(/###RESERVA:(.*?)###/);
    if (resMatch) {
      reply = reply.replace(/###RESERVA:.*?###/, "").trim();
      try {
        var resData = JSON.parse(resMatch[1]);
        var rid = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        var phone = (event.From || "").replace("whatsapp:", "");
        var reservation = {
          id: rid,
          tourName: resData.tour || "",
          tourId: resData.tourId || 0,
          clientName: resData.nombre || "",
          clientPhone: phone,
          qty: resData.qty || 1,
          total: resData.total || 0,
          date: resData.fecha || "",
          hotel: resData.hotel || "",
          status: "pendiente",
          channel: "whatsapp-bot",
          createdAt: new Date().toISOString()
        };
        await fetch("https://tours-baratos-52996-default-rtdb.firebaseio.com/data/tb_ventas/" + rid + ".json", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservation)
        });
      } catch(e) { console.log("Firebase error:", e); }
    }

    // Save assistant reply to history
    history.push({ role: "assistant", content: reply });
    if (history.length > 10) history = history.slice(history.length - 10);

    // Response with cookie
    var resp = new Twilio.Response();
    var twiml = new Twilio.twiml.MessagingResponse();
    twiml.message(reply);
    resp.appendHeader("Content-Type", "text/xml");
    resp.setCookie("ch", encodeURIComponent(JSON.stringify(history)));
    resp.setBody(twiml.toString());
    callback(null, resp);

  } catch(err) {
    console.log("Error:", err);
    var twiml2 = new Twilio.twiml.MessagingResponse();
    twiml2.message("Disculpa, tuve un inconveniente. Escribeme de nuevo en un momento 😊");
    callback(null, twiml2);
  }
};
