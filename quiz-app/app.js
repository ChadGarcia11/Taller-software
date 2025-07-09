const questions = [
    {
        question: "¿Qué superpoder te gustaría tener?",
        options: [
            { text: "Leer mentes", type: "horchata" },
            { text: "Teletransportación", type: "limon" },
            { text: "Hablar con animales", type: "guayaba" },
            { text: "Invisibilidad", type: "jamaica" },
            { text: "Controlar el clima", type: "sandia" },
            { text: "Cambiar de forma", type: "tamarindo" }
        ]
    },
    {
        question: "¿Qué harías en tu día libre?",
        options: [
            { text: "Dormir y ver pelis", type: "horchata" },
            { text: "Salir a correr", type: "limon" },
            { text: "Explorar un lugar nuevo", type: "guayaba" },
            { text: "Ir a un concierto", type: "jamaica" },
            { text: "Fiesta en la alberca", type: "sandia" },
            { text: "Probar comida exótica", type: "tamarindo" }
        ]
    },
    {
        question: "¿Qué accesorio siempre llevas?",
        options: [
            { text: "Suéter", type: "horchata" },
            { text: "Lentes de sol", type: "limon" },
            { text: "Cámara", type: "guayaba" },
            { text: "Audífonos", type: "jamaica" },
            { text: "Flotador", type: "sandia" },
            { text: "Pulsera", type: "tamarindo" }
        ]
    },
    {
        question: "¿Qué estación del año prefieres?",
        options: [
            { text: "Invierno", type: "horchata" },
            { text: "Primavera", type: "limon" },
            { text: "Otoño", type: "guayaba" },
            { text: "Verano", type: "jamaica" },
            { text: "Verano total", type: "sandia" },
            { text: "Temporada de lluvias", type: "tamarindo" }
        ]
    },
    {
        question: "¿Qué deporte prefieres?",
        options: [
            { text: "Yoga", type: "horchata" },
            { text: "Atletismo", type: "limon" },
            { text: "Senderismo", type: "guayaba" },
            { text: "Natación", type: "jamaica" },
            { text: "Voleibol de playa", type: "sandia" },
            { text: "Fútbol", type: "tamarindo" }
        ]
    }
];

const results = {
    horchata: {
        name: "Agua de Horchata",
        desc: "Eres dulce, tradicional y siempre traes calma a cualquier lugar. ¡Como la horchata, todos te quieren!",
        img: "6893973-2a5ef8b636a245a49db7b2e824059629.jpg"
    },
    jamaica: {
        name: "Agua de Jamaica",
        desc: "Elegante, clásico/a y refrescante. Siempre estás presente y nunca pasas desapercibido/a.",
        img: "IDNEPYYXRJBFHBLLZZ5BO5OJDY.avif"
    },
    limon: {
        name: "Agua de Limón con Chía",
        desc: "Eres chispeante, energético/a y refrescante. ¡Siempre animas el ambiente!",
        img: "Receta-Agua-de-Limón-con-Chia-900x500.jpg"
    },
    tamarindo: {
        name: "Agua de Tamarindo",
        desc: "Único/a, intenso/a y con un toque especial. ¡Sorprendes a todos a tu alrededor!",
        img: "16629.jpg.webp"
    },
    guayaba: {
        name: "Agua de Guayaba",
        desc: "Aventurero/a, dulce y exótico/a. ¡Te gusta probar cosas nuevas y contagias tu alegría!",
        img: "2023.11.02-Agua-de-Guayaba-Guava-Nectar-Guava-Agua-Fresca-Lolas-Cocina-8-819x1024.jpg"
    },
    sandia: {
        name: "Agua de Sandía",
        desc: "Fresco/a, divertido/a y tropical. ¡Siempre traes la fiesta contigo!",
        img: "unnamed.jpg"
    }
};

let currentQuestion = 0;
let answers = [];

const quizContainer = document.getElementById('quiz-container');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
    const percent = Math.round((currentQuestion / questions.length) * 100);
    progressBar.style.width = percent + '%';
}

function setQuestionBg() {
    document.body.className = '';
}

function showQuestion() {
    const q = questions[currentQuestion];
    quizContainer.innerHTML = `
        <div class="question">${q.question}</div>
        <div class="options">
            ${q.options.map((opt, idx) => `<button onclick="selectOption('${opt.type}')">${opt.text}</button>`).join('')}
        </div>
    `;
    updateProgressBar();
    setQuestionBg();
}

window.selectOption = function(type) {
    answers.push(type);
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
        updateProgressBar();
    }
};

function showResult() {
    // Contar la respuesta más frecuente
    const counts = {};
    answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
    const agua = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    quizContainer.innerHTML = '';
    resultDiv.innerHTML = `<h2>${results[agua].name}</h2><p>${results[agua].desc}</p><img src="img/${results[agua].img}" alt="${results[agua].name}" style="max-width:220px; margin-top:1rem; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">`;
    resultDiv.classList.remove('hidden');
    restartBtn.classList.remove('hidden');
    progressBar.style.width = '100%';
    document.body.className = '';
}

restartBtn.onclick = function() {
    currentQuestion = 0;
    answers = [];
    resultDiv.classList.add('hidden');
    restartBtn.classList.add('hidden');
    showQuestion();
};

// Iniciar quiz
showQuestion();
