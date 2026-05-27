/* ========================================
   TOURS BARATOS SAN ANDRES - App Logic
   CRM + Booking + Voucher System
   ======================================== */

// ===== TOURS DATABASE =====
const TOURS = [
    {
        id: 1,
        name: "Tour Platino (Ponton)",
        price: 65000,
        schedule: "8:30 AM - 4:00 PM",
        includes: "Avistamiento de Manglares, Acuario, Rocky Cay, parada de bano en El Palito",
        category: "maritimo",
        emoji: "\u{1F6E5}"
    },
    {
        id: 2,
        name: "Yate Rumba",
        price: 130000,
        schedule: "Tarde / Noche",
        includes: "Fiesta en alta mar a bordo de un yate",
        category: "fiesta",
        emoji: "\u{1F389}"
    },
    {
        id: 3,
        name: "Acuario Directo",
        price: 45000,
        schedule: "9:00 AM - 3:00 PM",
        includes: "Traslado directo al cayo para snorkel",
        category: "maritimo",
        emoji: "\u{1F420}"
    },
    {
        id: 4,
        name: "Johnny Cay Directo",
        price: 55000,
        schedule: "9:00 AM - 3:30 PM",
        includes: "Dia completo de playa en el cayo principal",
        category: "maritimo",
        emoji: "\u{1F3DD}"
    },
    {
        id: 5,
        name: "Johnny Cay + Acuario",
        price: 65000,
        schedule: "8:30 AM - 3:30 PM",
        includes: "Tour clasico: visita ambos cayos",
        category: "maritimo",
        emoji: "\u{1F6A4}"
    },
    {
        id: 6,
        name: "Semi-Submarino",
        price: 110000,
        schedule: "1.5 Horas",
        includes: "Observacion de arrecifes sin mojarse",
        category: "aventura",
        emoji: "\u{1F50D}"
    },
    {
        id: 7,
        name: "Noche Blanca",
        price: 245000,
        schedule: "7:00 PM - 10:00 PM",
        includes: "Cena buffet, Bar Abierto y fiesta en crucero",
        category: "fiesta",
        emoji: "⚪"
    },
    {
        id: 8,
        name: "Buceo (Mini-curso)",
        price: 110000,
        schedule: "Manana / Tarde",
        includes: "Equipo completo, teoria y 1 inmersion (12m)",
        category: "aventura",
        emoji: "\u{1F93F}"
    },
    {
        id: 9,
        name: "Parasail",
        price: 220000,
        schedule: "Turnos / Hora",
        includes: "Vuelo de 15 min a 100m de altura",
        category: "aventura",
        emoji: "\u{1FA82}"
    },
    {
        id: 10,
        name: "Paddle Nocturno LED",
        price: 220000,
        schedule: "4:30 PM en adelante",
        includes: "Tabla LED transparente y guia profesional",
        category: "aventura",
        emoji: "\u{1F4A1}",
        meetingPoint: "Discoteca Coco Loco"
    },
    {
        id: 11,
        name: "Tour Siete Colores",
        price: 220000,
        schedule: "Amanecer - Medio dia",
        includes: "Catamaran a vela, Acuario, Trampa Tortuga, Mundo Marino, Barco Hundido, snorkel",
        category: "aventura",
        emoji: "\u{26F5}",
        meetingPoint: "Chameys Nautica"
    },
    {
        id: 12,
        name: "Amanecer en Ponton",
        price: 130000,
        schedule: "Madrugada ~4:30 AM",
        includes: "Amanecer en alta mar con musica. Recogida en hotel (centro). Lejano: +$30.000 p/p",
        category: "fiesta",
        emoji: "\u{1F305}",
        meetingPoint: "Recogida en hotel"
    }
];

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

// ===== BOOKING SYSTEM =====
let currentTour = null;

function trackEvent(action, category, label, value) {
    if (typeof gtag === 'function') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value || 0
        });
    }
}

function openBooking(tourId) {
    const tour = TOURS.find(t => t.id === tourId);
    if (!tour) return;

    trackEvent('begin_checkout', 'booking', tour.name, tour.price);
    currentTour = tour;

    document.getElementById('modalTourName').textContent = tour.emoji + " " + tour.name;
    document.getElementById('modalTourPrice').textContent = formatCOP(tour.price) + " por persona | " + tour.schedule;
    document.getElementById('bookingTourId').value = tour.id;
    document.getElementById('summaryTour').textContent = tour.name;
    document.getElementById('summaryUnitPrice').textContent = formatCOP(tour.price);

    // Set min date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('bookDate').min = tomorrow.toISOString().split('T')[0];

    // Reset form
    document.getElementById('bookingForm').reset();
    document.getElementById('bookQty').value = 1;
    updateSummary();

    document.getElementById('bookingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBooking() {
    document.getElementById('bookingModal').classList.remove('active');
    document.body.style.overflow = '';
}

function changeQty(delta) {
    const input = document.getElementById('bookQty');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    if (val > 20) val = 20;
    input.value = val;
    updateSummary();
}

function updateSummary() {
    if (!currentTour) return;
    const qty = parseInt(document.getElementById('bookQty').value);
    const subtotal = currentTour.price * qty;
    const payMethod = document.querySelector('input[name="payMethod"]:checked');
    const isCard = payMethod && payMethod.value === 'tarjeta';

    const surcharge = isCard ? Math.round(subtotal * CARD_SURCHARGE_PERCENT / 100) : 0;
    const total = subtotal + surcharge;

    document.getElementById('summaryQty').textContent = qty;
    document.getElementById('summarySubtotal').textContent = formatCOP(subtotal);
    document.getElementById('summarySurcharge').textContent = '+' + formatCOP(surcharge);
    document.getElementById('summaryTotal').textContent = formatCOP(total);
}

function getBookingTotal() {
    if (!currentTour) return 0;
    const qty = parseInt(document.getElementById('bookQty').value);
    const subtotal = currentTour.price * qty;
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

// ===== FORM SUBMIT =====
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const tour = currentTour;
    const qty = parseInt(document.getElementById('bookQty').value);
    const subtotal = tour.price * qty;
    const payMethod = document.querySelector('input[name="payMethod"]:checked').value;
    const isCard = payMethod === 'tarjeta';
    const surcharge = isCard ? Math.round(subtotal * CARD_SURCHARGE_PERCENT / 100) : 0;
    const total = subtotal + surcharge;

    const reservation = {
        code: generateReservationCode(),
        tourId: tour.id,
        tourName: tour.name,
        tourSchedule: tour.schedule,
        clientName: document.getElementById('bookName').value,
        clientDoc: document.getElementById('bookDoc').value,
        clientPhone: document.getElementById('bookPhone').value,
        clientEmail: document.getElementById('bookEmail').value || '',
        tourDate: document.getElementById('bookDate').value,
        qty: qty,
        unitPrice: tour.price,
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

    // Build WhatsApp message
    const paidLabel = isPaid ? 'PAGADO con tarjeta' : reservation.payMethod;
    const waMsg = encodeURIComponent(
        `Hola! Acabo de reservar:\n\n` +
        `Codigo: ${reservation.code}\n` +
        `Tour: ${reservation.tourName}\n` +
        `Fecha: ${reservation.tourDate}\n` +
        `Personas: ${reservation.qty}\n` +
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

// ===== PDF VOUCHER GENERATOR =====
let lastReservation = null; // Store last reservation for PDF download

function downloadVoucherPDF(reservationData) {
    const r = reservationData || lastReservation;
    if (!r) { alert('No hay reserva para generar PDF'); return; }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210; // A4 width
    const tour = TOURS.find(t => t.id === r.tourId) || {};

    // Colors
    const navy = [27, 42, 74];
    const yellow = [255, 230, 0];
    const blue = [46, 111, 207];
    const gray = [100, 116, 139];
    const white = [255, 255, 255];

    // ===== HEADER BAR =====
    doc.setFillColor(...navy);
    doc.rect(0, 0, W, 40, 'F');
    doc.setFillColor(...yellow);
    doc.rect(0, 40, W, 3, 'F');

    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('TOURESBARATOS.COM', W / 2, 18, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('NISSI VIP TRAVEL & TOURS', W / 2, 28, { align: 'center' });
    doc.setFontSize(8);
    doc.text('San Andres Islas, Colombia | WhatsApp: +57 322 212 3751', W / 2, 35, { align: 'center' });

    // ===== VOUCHER TITLE =====
    doc.setTextColor(...navy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('VOUCHER DE RESERVA', W / 2, 55, { align: 'center' });

    // ===== RESERVATION CODE =====
    doc.setFillColor(...navy);
    doc.roundedRect(65, 60, 80, 14, 4, 4, 'F');
    doc.setTextColor(...yellow);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(r.code || 'TB-000000', W / 2, 69.5, { align: 'center' });

    // ===== TOUR INFO SECTION =====
    let y = 85;
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(20, y - 5, W - 40, 35, 3, 3, 'F');

    doc.setTextColor(...navy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(r.tourName || 'Tour', W / 2, y + 5, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text(`Fecha: ${r.tourDate || '-'}  |  Horario: ${r.tourSchedule || tour.schedule || '-'}`, W / 2, y + 14, { align: 'center' });
    doc.text(`Incluye: ${tour.includes || '-'}`, W / 2, y + 22, { align: 'center' });

    // ===== DETAIL TABLE =====
    y = 125;
    const leftCol = 25;
    const rightCol = 115;
    const lineH = 9;

    function addRow(label, value, bold) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...gray);
        doc.text(label, leftCol, y);
        doc.setTextColor(...navy);
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
        doc.text(String(value || '-'), rightCol, y);
        doc.setDrawColor(230, 230, 230);
        doc.line(leftCol, y + 3, W - 25, y + 3);
        y += lineH;
    }

    addRow('Cliente:', r.clientName);
    addRow('Documento:', r.clientDoc);
    addRow('WhatsApp:', r.clientPhone);
    if (r.clientEmail) addRow('Email:', r.clientEmail);
    addRow('Personas:', r.qty);
    addRow('Hotel:', r.hotel || 'No indicado');
    addRow('Metodo de pago:', r.payMethod === 'nequi' ? 'Nequi / Daviplata' : r.payMethod === 'tarjeta' ? 'Tarjeta' : 'Efectivo');

    if (r.surcharge && r.surcharge > 0) {
        addRow('Subtotal:', formatCOP(r.subtotal || 0));
        addRow('Recargo tarjeta (' + (r.surchargePercent || 7) + '%):', '+' + formatCOP(r.surcharge));
    }

    // Total box
    y += 3;
    doc.setFillColor(...navy);
    doc.roundedRect(20, y - 3, W - 40, 14, 3, 3, 'F');
    doc.setTextColor(...yellow);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('TOTAL: ' + formatCOP(r.total || 0), W / 2, y + 7, { align: 'center' });

    // ===== QUE TRAER =====
    y += 25;
    doc.setTextColor(...navy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('QUE TRAER AL TOUR:', leftCol, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    const items = [
        'Bloqueador solar biodegradable',
        'Traje de bano y toalla',
        'Documento de identidad original',
        'Efectivo para gastos extras (comida, bebidas)',
        'Gafas de sol y gorra',
        'Ropa comoda y zapatos para agua'
    ];
    items.forEach(item => {
        doc.text('  •  ' + item, leftCol, y);
        y += 5.5;
    });

    // ===== NOTAS IMPORTANTES =====
    y += 5;
    doc.setFillColor(255, 248, 235);
    doc.roundedRect(20, y - 3, W - 40, 22, 3, 3, 'F');
    doc.setTextColor(180, 130, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('IMPORTANTE:', leftCol, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text('• Presentar este voucher (digital o impreso) el dia del tour.', leftCol, y + 10);
    doc.text('• Llegar al punto de encuentro 15 minutos antes de la hora de salida.', leftCol, y + 15);

    // ===== FOOTER =====
    doc.setFillColor(...navy);
    doc.rect(0, 277, W, 20, 'F');
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('touresbaratos.com | WhatsApp: +57 322 212 3751 | Instagram: @touresbaratos', W / 2, 285, { align: 'center' });
    doc.text('Tours Baratos San Andres - Nissi VIP Travel & Tours | San Andres Islas, Colombia', W / 2, 291, { align: 'center' });

    // Download
    doc.save(`Voucher_${r.code}_${r.tourName.replace(/\s/g, '_')}.pdf`);
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
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SET MIN DATE ON LOAD =====
window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
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
