/* ========================================
   TOURS BARATOS SAN ANDRES - App Logic
   CRM + Booking + Voucher System
   ======================================== */
var LOGO_B64 = 'data:image/jpeg;base64,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';

// ===== TOURS DATABASE =====
const TOURS = [
    {
        id: 1, name: "Tour Platino (Ponton)", price: 65000,
        schedule: "8:30 AM - 4:00 PM", checkIn: "8:15 AM",
        meetingPoint: "Muelle Toninos, San Andres",
        category: "maritimo", emoji: "\u{1F6E5}",
        description: "Recorrido completo en ponton colectivo por los mejores puntos de San Andres. Dia completo disfrutando el mar de 7 colores con musica y ambiente.",
        included: ["Transporte maritimo ida y vuelta", "Paradas en Manglares, Acuario, Rocky Cay y El Palito", "Musica en vivo y ambiente", "Guia turistico", "Chaleco salvavidas"],
        notIncluded: ["Alimentacion y bebidas", "Impuesto de ingreso a cayos ($15.000)", "Alquiler de equipo de snorkel", "Propinas"]
    },
    {
        id: 2, name: "Yate Rumba", price: 130000,
        schedule: "Tarde / Noche", checkIn: "30 min antes",
        meetingPoint: "Muelle Toninos, San Andres",
        category: "fiesta", emoji: "\u{1F389}",
        description: "Fiesta en alta mar a bordo de un yate con DJ en vivo, barra libre y la mejor rumba sobre las aguas del Caribe.",
        included: ["Acceso al yate", "DJ en vivo", "Barra libre (licor nacional)", "Parada de bano en mar abierto", "Chaleco salvavidas"],
        notIncluded: ["Licor premium", "Snacks adicionales", "Transporte terrestre al muelle", "Propinas"]
    },
    {
        id: 3, name: "Acuario Directo", price: 45000,
        schedule: "9:00 AM - 3:00 PM", checkIn: "8:45 AM",
        meetingPoint: "Muelle Toninos, San Andres",
        category: "maritimo", emoji: "\u{1F420}",
        description: "Traslado directo al cayo del Acuario para disfrutar de snorkel entre peces de colores, mantarrayas y aguas cristalinas.",
        included: ["Transporte maritimo ida y vuelta", "Acceso al Acuario", "Guia turistico", "Chaleco salvavidas"],
        notIncluded: ["Alquiler equipo de snorkel ($10.000)", "Alimentacion y bebidas", "Impuesto de ingreso", "Propinas"]
    },
    {
        id: 4, name: "Johnny Cay Directo", price: 55000,
        schedule: "9:00 AM - 3:30 PM", checkIn: "8:45 AM",
        meetingPoint: "Muelle Toninos, San Andres",
        category: "maritimo", emoji: "\u{1F3DD}",
        description: "Dia completo de playa en el cayo principal de San Andres. Arena blanca, cocteleria local y reggae en vivo.",
        included: ["Transporte maritimo ida y vuelta", "Guia turistico", "Chaleco salvavidas"],
        notIncluded: ["Impuesto de ingreso a Johnny Cay ($15.000 p/p)", "Alimentacion y bebidas", "Alquiler de sillas/carpas", "Propinas"]
    },
    {
        id: 5, name: "Johnny Cay + Acuario", price: 65000,
        schedule: "8:30 AM - 3:30 PM", checkIn: "8:15 AM",
        meetingPoint: "Muelle Toninos, San Andres",
        category: "maritimo", emoji: "\u{1F6A4}",
        description: "El tour clasico de San Andres: visita los dos cayos mas famosos en un solo dia. Playa en Johnny Cay y snorkel en el Acuario.",
        included: ["Transporte maritimo ida y vuelta", "Parada en Johnny Cay y Acuario", "Guia turistico", "Chaleco salvavidas"],
        notIncluded: ["Impuesto de ingreso a Johnny Cay ($15.000 p/p)", "Alimentacion y bebidas", "Alquiler equipo snorkel", "Propinas"]
    },
    {
        id: 6, name: "Semi-Submarino", price: 110000,
        schedule: "Varias salidas (1.5 Horas)", checkIn: "15 min antes",
        meetingPoint: "Muelle Toninos, San Andres",
        category: "aventura", emoji: "\u{1F50D}",
        description: "Observa los arrecifes de coral y la vida marina sin mojarte a traves de ventanas panoramicas bajo el agua.",
        included: ["Recorrido de 1.5 horas", "Vista submarina panoramica", "Guia narrador", "Parada de snorkel opcional"],
        notIncluded: ["Alquiler equipo de snorkel", "Alimentacion y bebidas", "Transporte terrestre", "Propinas"]
    },
    {
        id: 7, name: "Noche Blanca", price: 245000,
        schedule: "7:00 PM - 10:00 PM", checkIn: "6:30 PM",
        meetingPoint: "Marina Portofino, San Andres",
        category: "fiesta", emoji: "â­•",
        description: "La experiencia VIP de San Andres: cena buffet con mariscos, bar abierto premium y fiesta en crucero bajo las estrellas. Dress code: todo blanco.",
        included: ["Cena buffet (mariscos y carnes)", "Bar abierto premium (toda la noche)", "DJ y musica en vivo", "Crucero por la bahia", "Evento exclusivo"],
        notIncluded: ["Transporte terrestre al punto de encuentro", "Dress code: ropa blanca (obligatorio)", "Propinas"]
    },
    {
        id: 8, name: "Buceo (Mini-curso)", price: 110000,
        schedule: "Manana / Tarde (3 horas)", checkIn: "30 min antes",
        meetingPoint: "Centro de Buceo, San Andres",
        category: "aventura", emoji: "\u{1F93F}",
        description: "Mini-curso de buceo con instructores certificados PADI. No necesitas experiencia previa. Incluye teoria, practica y 1 inmersion hasta 12 metros.",
        included: ["Instructor PADI certificado", "Equipo completo de buceo", "Clase teorica", "1 inmersion hasta 12m", "Seguro de buceo", "Certificado de participacion"],
        notIncluded: ["Fotos y videos submarinos", "Transporte al centro de buceo", "Inmersiones adicionales", "Propinas"]
    },
    {
        id: 9, name: "Parasail", price: 220000,
        schedule: "Turnos cada hora", checkIn: "15 min antes del turno",
        meetingPoint: "Playa de Spratt Bight, San Andres",
        category: "aventura", emoji: "\u{1FA82}",
        description: "Vuela sobre el mar de San Andres en parasail. 15 minutos de vuelo a 100 metros de altura con vista panoramica de toda la isla.",
        included: ["Vuelo de 15 minutos", "Equipo de seguridad completo", "Lancha de arrastre", "Instructor profesional", "Chaleco salvavidas"],
        notIncluded: ["Fotos aereas (se pueden tomar con celular)", "Transporte a la playa", "Segundo vuelo", "Propinas"]
    },
    {
        id: 10, name: "Paddle Nocturno LED", price: 220000,
        schedule: "4:30 PM en adelante", checkIn: "4:15 PM",
        meetingPoint: "Discoteca Coco Loco, San Andres",
        category: "aventura", emoji: "\u{1F4A1}",
        description: "Rema sobre aguas iluminadas con luces de neon. La experiencia nocturna mas magica de San Andres con tablas LED transparentes.",
        included: ["Tabla de paddle LED transparente", "Remo y chaleco", "Guia profesional", "Sesion de atardecer + nocturna", "Instruccion basica"],
        notIncluded: ["Transporte al punto de encuentro", "Funda impermeable para celular", "Bebidas", "Propinas"]
    },
    {
        id: 11, name: "Tour Siete Colores", price: 220000,
        schedule: "Amanecer - Medio dia", checkIn: "5:30 AM",
        meetingPoint: "Chameys Nautica, San Andres",
        category: "aventura", emoji: "\u{26F5}",
        description: "Tour completo en catamaran a vela recorriendo los 7 colores del mar. Visita Acuario, Trampa Tortuga, Mundo Marino y Barco Hundido con snorkel.",
        included: ["Catamaran a vela", "Recorrido completo 7 colores", "Paradas en Acuario, Trampa Tortuga, Mundo Marino", "Snorkel en Barco Hundido", "Guia experto", "Equipo de snorkel"],
        notIncluded: ["Alimentacion y bebidas", "Impuesto de ingreso a cayos", "Fotos profesionales", "Propinas"]
    },
    {
        id: 12, name: "Amanecer en Ponton", price: 130000,
        schedule: "~4:30 AM - 8:00 AM", checkIn: "4:00 AM",
        meetingPoint: "Recogida en hotel (zona centro)",
        category: "fiesta", emoji: "\u{1F305}",
        description: "Despierta con el amanecer mas hermoso del Caribe flotando en un ponton en alta mar. Musica suave, cafe y brisa del mar.",
        included: ["Recogida en hotel (zona centro)", "Ponton privado", "Musica ambiental", "Amanecer en alta mar", "Bebida de bienvenida"],
        notIncluded: ["Recogida hoteles lejanos (+$30.000 p/p)", "Desayuno completo", "Propinas"]
    }
];

// ===== CANCELLATION POLICIES =====
const POLICIES = {
    title: "POLITICAS DE CANCELACION Y CONDICIONES",
    items: [
        "Cancelacion gratuita hasta 24 horas antes del tour.",
        "Cancelacion con menos de 24 horas: se cobra el 50% del valor total.",
        "No-show (no presentarse): no hay reembolso.",
        "En caso de mal clima, el tour se reprograma sin costo adicional.",
        "Menores de edad deben estar acompanados por un adulto responsable.",
        "Presentar documento de identidad original el dia del tour.",
        "Tours sujetos a disponibilidad y condiciones climaticas.",
        "El operador se reserva el derecho de cancelar por razones de seguridad (reembolso completo).",
        "Llegar al punto de encuentro minimo 15 minutos antes de la hora de salida.",
        "Precios por persona en pesos colombianos (COP). No incluyen impuestos de ingreso a cayos."
    ]
};

// ===== CART SYSTEM =====
let cart = [];

// ===== WHATSAPP NUMBER (change this!) =====
const WA_NUMBER = "573222123751"; // Replace with actual number

// ===== HELPER FUNCTIONS =====
function formatCOP(amount) {
    return "$" + amount.toLocaleString('es-CO');
}

function generateReservationCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "TB-";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function getTodayStr() {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// ===== CRM STORAGE =====
const CRM = {
    getReservations() {
        const data = localStorage.getItem('tb_reservations');
        return data ? JSON.parse(data) : [];
    },

    saveReservation(reservation) {
        const reservations = this.getReservations();
        reservations.unshift(reservation);
        localStorage.setItem('tb_reservations', JSON.stringify(reservations));
        return reservation;
    },

    updateReservation(code, updates) {
        const reservations = this.getReservations();
        const idx = reservations.findIndex(r => r.code === code);
        if (idx !== -1) {
            reservations[idx] = { ...reservations[idx], ...updates };
            localStorage.setItem('tb_reservations', JSON.stringify(reservations));
            return reservations[idx];
        }
        return null;
    },

    getStats() {
        const reservations = this.getReservations();
        const today = getTodayStr();
        return {
            total: reservations.length,
            pending: reservations.filter(r => r.status === 'pendiente').length,
            confirmed: reservations.filter(r => r.status === 'confirmado').length,
            completed: reservations.filter(r => r.status === 'completado').length,
            todayCount: reservations.filter(r => r.tourDate === today).length,
            totalRevenue: reservations
                .filter(r => r.status !== 'cancelado')
                .reduce((sum, r) => sum + r.total, 0),
        };
    }
};

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE NAV TOGGLE =====
document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// ===== TOUR FILTERS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.tour-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== BOOKING SYSTEM (MULTI-TOUR CART) =====
let currentTour = null;

function addToCart(tourId) {
    const tour = TOURS.find(t => t.id === tourId);
    if (!tour) return;
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    cart.push({ tourId: tour.id, date: tomorrow.toISOString().split('T')[0], qty: 1 });
    updateCartBadge(); renderCartItems(); updateSummary();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge(); renderCartItems(); updateSummary();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) { badge.textContent = cart.length > 0 ? cart.length : ''; badge.style.display = cart.length > 0 ? 'flex' : 'none'; }
    const mp = document.getElementById('modalTourPrice');
    if (mp) mp.textContent = cart.length + ' tour(es) seleccionado(s)';
}

function renderCartItems() {
    const container = document.getElementById('cartItemsList');
    if (!container) return;
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#64748B;padding:12px;font-size:0.85rem;">No hay tours. Usa "Agregar otro tour".</p>';
        return;
    }
    container.innerHTML = cart.map((item, i) => {
        const tour = TOURS.find(t => t.id === item.tourId);
        if (!tour) return '';
        return '<div style="display:flex;gap:8px;align-items:center;padding:10px;background:#F8FAFC;border-radius:8px;margin-bottom:6px;flex-wrap:wrap;">' +
            '<div style="flex:1;min-width:120px;"><strong style="font-size:0.85rem;color:#1B2A4A;">' + tour.name + '</strong>' +
            '<div style="font-size:0.72rem;color:#64748B;">' + tour.schedule + ' | ' + tour.meetingPoint + '</div></div>' +
            '<input type="date" value="' + item.date + '" min="' + minDate + '" onchange="cart[' + i + '].date=this.value" style="padding:5px;border:1px solid #E2E8F0;border-radius:6px;font-size:0.78rem;">' +
            '<div style="display:flex;align-items:center;gap:3px;">' +
            '<button type="button" onclick="changeCartQty(' + i + ',-1)" style="width:26px;height:26px;border:1px solid #E2E8F0;border-radius:6px;background:#fff;cursor:pointer;">-</button>' +
            '<span style="width:22px;text-align:center;font-weight:700;">' + item.qty + '</span>' +
            '<button type="button" onclick="changeCartQty(' + i + ',1)" style="width:26px;height:26px;border:1px solid #E2E8F0;border-radius:6px;background:#fff;cursor:pointer;">+</button></div>' +
            '<strong style="color:#2E6FCF;min-width:75px;text-align:right;">' + formatCOP(tour.price * item.qty) + '</strong>' +
            '<button type="button" onclick="removeFromCart(' + i + ')" style="width:24px;height:24px;border:none;background:#EF4444;color:#fff;border-radius:50%;cursor:pointer;font-size:0.8rem;">&times;</button></div>';
    }).join('');
}

function changeCartQty(index, delta) {
    if (!cart[index]) return;
    cart[index].qty = Math.max(1, Math.min(20, cart[index].qty + delta));
    renderCartItems(); updateSummary();
}

function getCartSubtotal() {
    return cart.reduce((sum, item) => {
        const tour = TOURS.find(t => t.id === item.tourId);
        return sum + (tour ? tour.price * item.qty : 0);
    }, 0);
}

function trackEvent(action, category, label, value) {
    if (typeof gtag === 'function') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value || 0
        });
    }
}

function populateAddTourSelect() {
    const sel = document.getElementById('addTourSelect');
    if (!sel) return;
    sel.innerHTML = '<option value="">+ Agregar otro tour...</option>';
    TOURS.forEach(function(t) {
        sel.innerHTML += '<option value="' + t.id + '">' + t.emoji + ' ' + t.name + ' - ' + formatCOP(t.price) + '/persona</option>';
    });
}

function openBooking(tourId) {
    const tour = TOURS.find(t => t.id === tourId);
    if (!tour) return;
    trackEvent('begin_checkout', 'booking', tour.name, tour.price);
    currentTour = tour;

    // Reset cart and add this tour
    cart = [];
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    cart.push({ tourId: tour.id, date: tomorrow.toISOString().split('T')[0], qty: 1 });

    document.getElementById('modalTourName').textContent = 'Reserva de Tours';
    document.getElementById('modalTourPrice').textContent = cart.length + ' tour(es) seleccionado(s)';

    populateAddTourSelect();
    renderCartItems();
    updateCartBadge();
    updateSummary();

    document.getElementById('bookingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBooking() {
    document.getElementById('bookingModal').classList.remove('active');
    document.body.style.overflow = '';
}

function updateSummary() {
    if (cart.length === 0) return;
    const subtotal = getCartSubtotal();
    const payMethod = document.querySelector('input[name="payMethod"]:checked');
    const isCard = payMethod && payMethod.value === 'tarjeta';
    const surcharge = isCard ? Math.round(subtotal * CARD_SURCHARGE_PERCENT / 100) : 0;
    const total = subtotal + surcharge;

    // Build summary lines from cart
    const linesEl = document.getElementById('summaryLines');
    if (linesEl) {
        linesEl.innerHTML = cart.map(item => {
            const tour = TOURS.find(t => t.id === item.tourId);
            if (!tour) return '';
            return '<div class="summary-line"><span>' + tour.name + ' x' + item.qty + '</span><span>' + formatCOP(tour.price * item.qty) + '</span></div>';
        }).join('');
    }

    const surchargeEl = document.getElementById('summarySurcharge');
    if (surchargeEl) surchargeEl.textContent = '+' + formatCOP(surcharge);
    const totalEl = document.getElementById('summaryTotal');
    if (totalEl) totalEl.textContent = formatCOP(total);
}

function getBookingTotal() {
    if (cart.length === 0) return 0;
    const subtotal = getCartSubtotal();
    const payMethod = document.querySelector('input[name="payMethod"]:checked');
    const isCard = payMethod && payMethod.value === 'tarjeta';
    const surcharge = isCard ? Math.round(subtotal * CARD_SURCHARGE_PERCENT / 100) : 0;
    return subtotal + surcharge;
}

// ===== BOLD CONFIG =====
// IMPORTANT: Replace with your real Bold API Key from https://bold.co (Mi Negocio > Integraciones)
const BOLD_API_KEY = 'TU_API_KEY_BOLD'; // Change to your real key
const BOLD_REDIRECT_URL = window.location.origin + '/index.html';

// ===== CARD SURCHARGE =====
const CARD_SURCHARGE_PERCENT = 7; // 7% recargo por pago con tarjeta

// ===== SHOW/HIDE BOLD INFO BASED ON PAYMENT METHOD =====
document.querySelectorAll('input[name="payMethod"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const boldInfo = document.getElementById('boldPaymentInfo');
        const btnText = document.getElementById('btnSubmitBooking');
        const surchargeRow = document.getElementById('surchargeRow');

        if (this.value === 'tarjeta') {
            boldInfo.style.display = 'block';
            surchargeRow.style.display = 'flex';
            btnText.innerHTML = 'Pagar con Bold <i class="fas fa-credit-card"></i>';
        } else {
            boldInfo.style.display = 'none';
            surchargeRow.style.display = 'none';
            if (this.value === 'nequi') {
                btnText.innerHTML = 'Confirmar Reserva <i class="fas fa-mobile-alt"></i>';
            } else {
                btnText.innerHTML = 'Confirmar Reserva <i class="fas fa-lock"></i>';
            }
        }
        updateSummary(); // Recalculate total with/without surcharge
    });
});

// ===== ADD TOUR SELECTOR =====
document.getElementById('addTourSelect').addEventListener('change', function() {
    const tourId = parseInt(this.value);
    if (!tourId) return;
    addToCart(tourId);
    this.value = '';
});

// ===== FORM SUBMIT (MULTI-TOUR) =====
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (cart.length === 0) { alert('Agrega al menos un tour antes de reservar.'); return; }

    // Validate all cart items have dates
    for (let i = 0; i < cart.length; i++) {
        if (!cart[i].date) { alert('Selecciona la fecha para todos los tours.'); return; }
    }

    const subtotal = getCartSubtotal();
    const payMethod = document.querySelector('input[name="payMethod"]:checked').value;
    const isCard = payMethod === 'tarjeta';
    const surcharge = isCard ? Math.round(subtotal * CARD_SURCHARGE_PERCENT / 100) : 0;
    const total = subtotal + surcharge;

    // Build tours array for multi-tour
    const toursArr = cart.map(item => {
        const tour = TOURS.find(t => t.id === item.tourId);
        return {
            tourId: tour.id, tourName: tour.name, schedule: tour.schedule,
            checkIn: tour.checkIn, meetingPoint: tour.meetingPoint,
            description: tour.description, included: tour.included,
            notIncluded: tour.notIncluded,
            date: item.date, qty: item.qty, unitPrice: tour.price,
            subtotal: tour.price * item.qty
        };
    });

    // Primary tour info (backward-compat for admin and single-tour fields)
    const firstTour = TOURS.find(t => t.id === cart[0].tourId);
    const tourNames = toursArr.map(t => t.tourName).join(' + ');
    const totalQty = cart.reduce((s, c) => s + c.qty, 0);

    const reservation = {
        code: generateReservationCode(),
        tourId: firstTour.id,
        tourName: tourNames,
        tourSchedule: firstTour.schedule,
        tours: toursArr,
        clientName: document.getElementById('bookName').value,
        clientDoc: document.getElementById('bookDoc').value,
        clientPhone: document.getElementById('bookPhone').value,
        clientEmail: document.getElementById('bookEmail').value || '',
        tourDate: cart[0].date,
        qty: totalQty,
        unitPrice: firstTour.price,
        subtotal: subtotal,
        surcharge: surcharge,
        surchargePercent: isCard ? CARD_SURCHARGE_PERCENT : 0,
        total: total,
        hotel: document.getElementById('bookHotel').value || '',
        notes: document.getElementById('bookNotes').value || '',
        payMethod: payMethod,
        status: payMethod === 'tarjeta' ? 'procesando_pago' : 'pendiente',
        createdAt: new Date().toISOString(),
    };

    // Save to CRM
    CRM.saveReservation(reservation);

    // If card payment, redirect to Bold
    if (payMethod === 'tarjeta') {
        launchBoldCheckout(reservation);
        return;
    }

    // For Nequi/Efectivo: show success + WhatsApp
    showBookingSuccess(reservation);
});

// ===== BOLD CHECKOUT =====
function launchBoldCheckout(reservation) {
    const reference = reservation.code + '-' + Date.now();

    // Save reference for later verification
    CRM.updateReservation(reservation.code, { boldReference: reference });

    // Get saved Bold API key
    const savedKey = localStorage.getItem('tb_bold_key') || BOLD_API_KEY;

    try {
        // Bold Payment Link approach (most reliable for small businesses)
        // Option 1: Bold Checkout Button (if SDK loaded)
        if (typeof BoldCheckout !== 'undefined') {
            BoldCheckout.open({
                orderId: reference,
                currency: 'COP',
                amount: reservation.total,
                apiKey: savedKey,
                redirectionUrl: BOLD_REDIRECT_URL + '?ref=' + reservation.code,
                description: reservation.tourName + ' x' + reservation.qty + ' - Tours Baratos',
                tax: 0,
                customer: {
                    email: reservation.clientEmail || '',
                    fullName: reservation.clientName,
                    phone: reservation.clientPhone,
                    documentNumber: reservation.clientDoc
                }
            }, function(response) {
                if (response && (response.status === 'approved' || response.status === 'APPROVED')) {
                    CRM.updateReservation(reservation.code, {
                        status: 'pagado',
                        boldTransactionId: response.transactionId || response.id,
                        paidAt: new Date().toISOString()
                    });
                    closeBooking();
                    showBookingSuccess(reservation, true);
                } else {
                    CRM.updateReservation(reservation.code, { status: 'pendiente' });
                    closeBooking();
                    showBookingSuccess(reservation, false);
                }
            });
            return;
        }

        // Option 2: Bold Payment Link (fallback - generates link)
        // Build Bold payment link URL
        const boldLinkBase = 'https://checkout.bold.co/payment/';
        const boldParams = new URLSearchParams({
            apiKey: savedKey,
            amount: reservation.total,
            currency: 'COP',
            reference: reference,
            description: `${reservation.tourName} x${reservation.qty} personas`,
            redirectionUrl: BOLD_REDIRECT_URL + '?bold_ref=' + reservation.code,
            customerName: reservation.clientName,
            customerEmail: reservation.clientEmail || '',
            customerPhone: reservation.clientPhone
        });

        // If Bold key is configured, try the checkout link
        if (savedKey && savedKey !== 'TU_API_KEY_BOLD') {
            const paymentUrl = boldLinkBase + '?' + boldParams.toString();
            CRM.updateReservation(reservation.code, { status: 'procesando_pago' });
            closeBooking();
            window.open(paymentUrl, '_blank');
            showBookingSuccess(reservation, false);
            return;
        }

        // Option 3: No Bold key configured - show manual payment instructions
        CRM.updateReservation(reservation.code, { status: 'pendiente', payMethod: 'tarjeta_pendiente' });
        closeBooking();
        showPaymentInstructions(reservation);

    } catch (err) {
        console.warn('Bold checkout error:', err);
        CRM.updateReservation(reservation.code, { status: 'pendiente', payMethod: 'tarjeta_pendiente' });
        closeBooking();
        showPaymentInstructions(reservation);
    }
}

// ===== MANUAL PAYMENT INSTRUCTIONS (fallback) =====
function showPaymentInstructions(reservation) {
    lastReservation = reservation; // Save for PDF download
    document.getElementById('reservationCode').textContent = reservation.code;

    const waMsg = encodeURIComponent(
        `Hola! Quiero pagar con tarjeta mi reserva:\n\n` +
        `Codigo: ${reservation.code}\n` +
        `Tour: ${reservation.tourName}\n` +
        `Total: ${formatCOP(reservation.total)}\n\n` +
        `Me pueden enviar el link de pago Bold por favor?`
    );
    document.getElementById('successWhatsapp').href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

    // Store notification
    const notifications = JSON.parse(localStorage.getItem('tb_notifications') || '[]');
    notifications.unshift({
        type: 'payment_request',
        code: reservation.code,
        message: `${reservation.clientName} quiere pagar con tarjeta: ${reservation.code} - ${formatCOP(reservation.total)}. Enviar link Bold.`,
        timestamp: new Date().toISOString(),
        read: false
    });
    localStorage.setItem('tb_notifications', JSON.stringify(notifications));

    document.getElementById('successModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== SHOW SUCCESS =====
function showBookingSuccess(reservation, isPaid) {
    lastReservation = reservation; // Save for PDF download
    document.getElementById('reservationCode').textContent = reservation.code;

    // Build WhatsApp message with all tours
    const paidLabel = isPaid ? 'PAGADO con tarjeta' : reservation.payMethod;
    let tourLines = '';
    if (reservation.tours && reservation.tours.length > 0) {
        tourLines = reservation.tours.map(t => `- ${t.tourName} (${t.date}) x${t.qty}`).join('\n');
    } else {
        tourLines = `- ${reservation.tourName} (${reservation.tourDate}) x${reservation.qty}`;
    }
    const waMsg = encodeURIComponent(
        `Hola! Acabo de reservar:\n\n` +
        `Codigo: ${reservation.code}\n` +
        `Tours:\n${tourLines}\n\n` +
        `Total: ${formatCOP(reservation.total)}\n` +
        `Pago: ${paidLabel}\n` +
        `Hotel: ${reservation.hotel}\n\n` +
        `Nombre: ${reservation.clientName}\n` +
        `Doc: ${reservation.clientDoc}`
    );
    document.getElementById('successWhatsapp').href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

    document.getElementById('successModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Track conversion in Analytics
    trackEvent('purchase', 'booking', reservation.tourName, reservation.total);

    // Auto-send admin notification via WhatsApp API link (opens in background)
    const adminMsg = encodeURIComponent(
        `NUEVA RESERVA!\n\n` +
        `Codigo: ${reservation.code}\n` +
        `Tour: ${reservation.tourName}\n` +
        `Fecha: ${reservation.tourDate}\n` +
        `Cliente: ${reservation.clientName}\n` +
        `Tel: ${reservation.clientPhone}\n` +
        `Personas: ${reservation.qty}\n` +
        `Total: ${formatCOP(reservation.total)}\n` +
        `Pago: ${paidLabel}\n` +
        `Hotel: ${reservation.hotel}`
    );
    // Store notification for admin panel
    const notifications = JSON.parse(localStorage.getItem('tb_notifications') || '[]');
    notifications.unshift({
        type: 'new_booking',
        code: reservation.code,
        message: `Nueva reserva ${reservation.code} - ${reservation.tourName} - ${reservation.clientName} - ${formatCOP(reservation.total)}`,
        timestamp: new Date().toISOString(),
        read: false
    });
    localStorage.setItem('tb_notifications', JSON.stringify(notifications));
}

function closeSuccess() {
    document.getElementById('successModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== PDF ITINERARY GENERATOR =====
let lastReservation = null; // Store last reservation for PDF download

function downloadVoucherPDF(reservationData) {
    var r = reservationData || lastReservation;
    if (!r) { alert('No hay reserva para generar PDF. Intenta hacer la reserva de nuevo.'); return; }

    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('La libreria PDF aun no ha cargado. Espera unos segundos e intenta de nuevo.');
        return;
    }

    try {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF('p', 'mm', 'a4');
        var W = 210;
        var M = 18;
        var CW = W - M * 2;
        var y = 0;
        var L = M + 6;
        var R = M + CW / 2 + 4;

        // Safe text helper
        function txt(text, x, yy, opts) {
            doc.text(String(text || ''), x, yy, opts || {});
        }

        // Build tours list
        var toursList = [];
        if (r.tours && r.tours.length > 0) {
            toursList = r.tours;
        } else {
            var t = TOURS.find(function(x) { return x.id === r.tourId; }) || {};
            toursList = [{
                tourName: r.tourName || t.name || 'Tour',
                schedule: r.tourSchedule || t.schedule || '-',
                checkIn: t.checkIn || '15 min antes',
                meetingPoint: t.meetingPoint || 'Consultar',
                description: t.description || '',
                included: t.included || [],
                notIncluded: t.notIncluded || [],
                date: r.tourDate || '-',
                qty: r.qty || 1,
                subtotal: r.subtotal || 0
            }];
        }

        // ===== HEADER =====
        doc.setFillColor(27, 42, 74);
        doc.rect(0, 0, W, 40, 'F');
        doc.setFillColor(255, 230, 0);
        doc.rect(0, 40, W, 2.5, 'F');
        try { doc.addImage(LOGO_B64, 'JPEG', 8, 2, 20, 20); } catch(e) {}
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        txt('TOURESBARATOS.COM', W / 2 + 5, 14, { align: 'center' });
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        txt('NISSI VIP TRAVEL & TOURS', W / 2 + 5, 22, { align: 'center' });
        doc.setFontSize(7.5);
        txt('San Andres Islas, Colombia | WhatsApp: +57 322 212 3751', W / 2 + 5, 30, { align: 'center' });
        doc.setTextColor(255, 230, 0);
        doc.setFontSize(6.5);
        txt('NIT: 1.082.402.387-1', W / 2 + 5, 36, { align: 'center' });

        // ===== TITLE + CODE =====
        y = 50;
        doc.setTextColor(27, 42, 74);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        txt('ITINERARIO DE RESERVA', W / 2, y, { align: 'center' });
        y += 10;
        doc.setFillColor(27, 42, 74);
        doc.rect(60, y - 4, 90, 13, 'F');
        doc.setTextColor(255, 230, 0);
        doc.setFontSize(14);
        txt(r.code || 'TB-000000', W / 2, y + 5, { align: 'center' });
        y += 18;

        // ===== CLIENT INFO =====
        doc.setFillColor(240, 245, 255);
        doc.rect(M, y - 3, CW, 30, 'F');
        doc.setTextColor(27, 42, 74);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        txt('DATOS DEL CLIENTE', L, y + 3);
        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(50, 65, 85);
        txt('Nombre: ' + (r.clientName || '-'), L, y);
        txt('WhatsApp: ' + (r.clientPhone || '-'), R, y);
        y += 5.5;
        txt('Documento: ' + (r.clientDoc || '-'), L, y);
        txt('Email: ' + (r.clientEmail || '-'), R, y);
        y += 5.5;
        txt('Hotel: ' + (r.hotel || 'No indicado'), L, y);
        var payLabel = r.payMethod === 'nequi' ? 'Nequi/Daviplata' : r.payMethod === 'tarjeta' ? 'Tarjeta' : 'Efectivo';
        txt('Pago: ' + payLabel, R, y);
        y += 12;

        // ===== TOUR ITINERARIES =====
        for (var ti = 0; ti < toursList.length; ti++) {
            var tour = toursList[ti];

            // Check if we need a new page
            if (y > 200) {
                doc.addPage();
                y = 20;
            }

            // Tour header bar
            doc.setFillColor(46, 111, 207);
            doc.rect(M, y - 3, CW, 11, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            txt('TOUR ' + (ti + 1) + ': ' + String(tour.tourName || 'Tour').toUpperCase(), M + 5, y + 4);
            doc.setFontSize(9);
            txt(formatCOP(tour.subtotal || 0), W - M - 5, y + 4, { align: 'right' });
            y += 13;

            // Details grid
            doc.setFillColor(248, 250, 252);
            doc.rect(M, y - 2, CW, 18, 'F');
            doc.setTextColor(27, 42, 74);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);

            txt('CHECK-IN:', L, y + 2);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 65, 85);
            txt(tour.checkIn || '15 min antes', L + 22, y + 2);

            doc.setTextColor(27, 42, 74);
            doc.setFont('helvetica', 'bold');
            txt('HORARIO:', R, y + 2);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 65, 85);
            txt(tour.schedule || '-', R + 20, y + 2);

            y += 6;
            doc.setTextColor(27, 42, 74);
            doc.setFont('helvetica', 'bold');
            txt('PUNTO:', L, y + 2);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 65, 85);
            txt(tour.meetingPoint || 'Consultar', L + 16, y + 2);

            y += 6;
            doc.setTextColor(27, 42, 74);
            doc.setFont('helvetica', 'bold');
            txt('FECHA:', L, y + 2);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 65, 85);
            txt(tour.date || '-', L + 16, y + 2);

            doc.setTextColor(27, 42, 74);
            doc.setFont('helvetica', 'bold');
            txt('PERSONAS:', R, y + 2);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 65, 85);
            txt(String(tour.qty || 1), R + 22, y + 2);
            y += 9;

            // Description
            if (tour.description) {
                doc.setTextColor(100, 116, 139);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                var dLines = doc.splitTextToSize(String(tour.description), CW - 12);
                for (var di = 0; di < dLines.length; di++) {
                    txt(dLines[di], L, y);
                    y += 4;
                }
                y += 2;
            }

            // Included / Not Included
            var inc = tour.included || [];
            var notInc = tour.notIncluded || [];
            var maxR = Math.max(inc.length, notInc.length);

            if (maxR > 0) {
                if (y > 240) { doc.addPage(); y = 20; }

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(8);
                doc.setTextColor(34, 197, 94);
                txt('INCLUYE:', L, y);
                doc.setTextColor(239, 68, 68);
                txt('NO INCLUYE:', R, y);
                y += 5;

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.5);

                for (var ri = 0; ri < maxR; ri++) {
                    if (ri < inc.length) {
                        doc.setTextColor(34, 120, 60);
                        txt('+ ' + String(inc[ri] || ''), L, y);
                    }
                    if (ri < notInc.length) {
                        doc.setTextColor(180, 50, 50);
                        txt('- ' + String(notInc[ri] || ''), R, y);
                    }
                    y += 4.5;
                }
            }

            y += 6;

            // Divider between tours
            if (ti < toursList.length - 1) {
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.3);
                doc.line(M + 10, y, W - M - 10, y);
                y += 6;
            }
        }

        // ===== TOTAL BOX =====
        if (y > 250) { doc.addPage(); y = 20; }
        y += 4;
        doc.setFillColor(27, 42, 74);
        doc.rect(M, y - 3, CW, 16, 'F');
        doc.setTextColor(255, 230, 0);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        txt('TOTAL: ' + formatCOP(r.total || 0), W / 2, y + 7, { align: 'center' });
        y += 22;

        // ===== POLICIES =====
        if (y > 210) { doc.addPage(); y = 20; }
        doc.setTextColor(27, 42, 74);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        txt('POLITICAS DE CANCELACION Y CONDICIONES', M, y);
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        var pols = POLICIES.items;
        for (var pi = 0; pi < pols.length; pi++) {
            if (y > 270) { doc.addPage(); y = 20; }
            var pLines = doc.splitTextToSize((pi + 1) + '. ' + pols[pi], CW - 4);
            for (var pli = 0; pli < pLines.length; pli++) {
                txt(pLines[pli], M + 2, y);
                y += 4;
            }
            y += 1;
        }

        // ===== QUE TRAER =====
        if (y > 240) { doc.addPage(); y = 20; }
        y += 4;
        doc.setTextColor(27, 42, 74);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        txt('QUE TRAER AL TOUR', M, y);
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        var bring = ['Bloqueador solar biodegradable', 'Traje de bano y toalla', 'Documento de identidad original', 'Efectivo para gastos extras', 'Gafas de sol y gorra', 'Ropa comoda y zapatos para agua'];
        for (var bi = 0; bi < bring.length; bi++) {
            txt('  *  ' + bring[bi], M + 2, y);
            y += 4.5;
        }

        // ===== NOTA IMPORTANTE =====
        if (y > 255) { doc.addPage(); y = 20; }
        y += 4;
        doc.setFillColor(255, 248, 235);
        doc.rect(M, y - 3, CW, 16, 'F');
        doc.setTextColor(180, 130, 0);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        txt('IMPORTANTE:', M + 4, y + 3);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        txt('Presentar este itinerario (digital o impreso) el dia del tour.', M + 4, y + 8);
        txt('Llegar al punto de encuentro minimo 15 minutos antes.', M + 4, y + 12);

        // ===== FOOTER =====
        doc.setFillColor(27, 42, 74);
        doc.rect(0, 280, W, 17, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        txt('touresbaratos.com | WhatsApp: +57 322 212 3751 | Instagram: @touresbaratossanandres', W / 2, 287, { align: 'center' });
        txt('Tours Baratos San Andres - Nissi VIP Travel & Tours | San Andres Islas, Colombia', W / 2, 292, { align: 'center' });

        // ===== SAVE =====
        doc.save('Itinerario_' + (r.code || 'TB') + '.pdf');

    } catch (err) {
        console.error('PDF Error:', err);
        alert('Error PDF: ' + (err.message || err));
    }
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    const waMsg = encodeURIComponent(
        `Hola! Quiero info sobre tours:\n\n` +
        `Nombre: ${name}\n` +
        `WhatsApp: ${phone}\n` +
        `Email: ${email}\n\n` +
        `Consulta: ${message}`
    );

    // Use direct link instead of window.open to avoid popup blockers
    const waLink = document.createElement('a');
    waLink.href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
    waLink.target = '_blank';
    waLink.rel = 'noopener';
    waLink.click();

    this.reset();
    alert('Consulta enviada! Se abrira WhatsApp para completar tu mensaje.');
});

// ===== CLOSE MODALS ON OVERLAY CLICK =====
document.getElementById('bookingModal').addEventListener('click', function(e) {
    if (e.target === this) closeBooking();
});

document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) closeSuccess();
});

// ===== CLOSE ON ESCAPE =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeBooking();
        closeSuccess();
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip links inside modals (WhatsApp, PDF, etc.)
    if (anchor.closest('.modal-overlay') || anchor.closest('.modal')) return;
    anchor.addEventListener('click', function(e) {
        // Only prevent default for internal hash links, not external URLs
        const href = this.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== INIT ON LOAD =====
window.addEventListener('DOMContentLoaded', () => {
    populateAddTourSelect();
});

// ===== CHECK BOLD RETURN =====
(function checkBoldReturn() {
    const urlParams = new URLSearchParams(window.location.search);
    const boldRef = urlParams.get('bold_ref');
    const boldTxId = urlParams.get('bold-tx-id') || urlParams.get('id') || urlParams.get('transactionId');

    if (boldRef || boldTxId) {
        const reservations = CRM.getReservations();
        let res = null;

        if (boldRef) {
            res = reservations.find(r => r.code === boldRef);
        } else {
            res = reservations.find(r => r.status === 'procesando_pago');
        }

        if (res) {
            CRM.updateReservation(res.code, {
                status: 'pagado',
                boldTransactionId: boldTxId || 'confirmed',
                paidAt: new Date().toISOString()
            });

            // Notification for admin
            const notifications = JSON.parse(localStorage.getItem('tb_notifications') || '[]');
            notifications.unshift({
                type: 'payment_confirmed',
                code: res.code,
                message: `PAGO CONFIRMADO via Bold: ${res.code} - ${res.clientName} - ${formatCOP(res.total)}`,
                timestamp: new Date().toISOString(),
                read: false
            });
            localStorage.setItem('tb_notifications', JSON.stringify(notifications));

            showBookingSuccess(res, true);
        }
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
})();

// ===== REMINDER SYSTEM =====
const ReminderSystem = {
    checkReminders() {
        const reservations = CRM.getReservations();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        return reservations.filter(r =>
            r.tourDate === tomorrowStr &&
            (r.status === 'confirmado' || r.status === 'pagado') &&
            !r.reminderSent
        );
    },

    generateReminderMsg(reservation) {
        return encodeURIComponent(
            `Hola ${reservation.clientName}! Te recordamos que manana tienes tu tour:\n\n` +
            `*${reservation.tourName}*\n` +
            `Fecha: ${reservation.tourDate}\n` +
            `Horario: ${reservation.tourSchedule || 'Confirmar horario'}\n` +
            `Personas: ${reservation.qty}\n` +
            `Hotel: ${reservation.hotel || 'No indicado'}\n\n` +
            `Codigo de reserva: *${reservation.code}*\n\n` +
            `Recuerda llegar 15 minutos antes. Te esperamos!\n` +
            `- Tours Baratos San Andres`
        );
    },

    markReminderSent(code) {
        CRM.updateReservation(code, { reminderSent: true, reminderSentAt: new Date().toISOString() });
    }
};

console.log("Tours Baratos San Andres - App v2.0 loaded successfully");
console.log("CRM Stats:", CRM.getStats());
console.log("Pending reminders:", ReminderSystem.checkReminders().length);
