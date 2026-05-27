/* ========================================
   TOURS BARATOS SAN ANDRES - App Logic
   CRM + Booking + Voucher System
   ======================================== */

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
        category: "fiesta", emoji: "⭕",
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
        doc.rect(0, 0, W, 36, 'F');
        doc.setFillColor(255, 230, 0);
        doc.rect(0, 36, W, 2.5, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        txt('TOURESBARATOS.COM', W / 2, 15, { align: 'center' });
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        txt('NISSI VIP TRAVEL & TOURS', W / 2, 23, { align: 'center' });
        doc.setFontSize(7.5);
        txt('San Andres Islas, Colombia | WhatsApp: +57 322 212 3751 | touresbaratos.com', W / 2, 31, { align: 'center' });

        // ===== TITLE + CODE =====
        y = 48;
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
