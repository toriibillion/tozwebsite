const canvas = document.getElementById("linesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // إعادة التهيئة عند تغيير الحجم
});

let lines = [];

class Line {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 100 + 50;
        this.speedX = (Math.random() - 0.2) * 2; // سرعة أفقية عشوائية
        this.speedY = (Math.random() - 0.2) * 2; // سرعة عمودية عشوائية
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // إعادة ضبط الموقع إذا خرج من الشاشة
        if (this.x < -this.length) this.x = canvas.width;
        if (this.x > canvas.width + this.length) this.x = -this.length;
        if (this.y < -this.length) this.y = canvas.height;
        if (this.y > canvas.height + this.length) this.y = -this.length;
    }

    draw() {
        ctx.strokeStyle = "rgba(0, 222, 238, 0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y + this.length * 0.1); // خط مائل بسيط
        ctx.stroke();
    }
}

function init() {
    lines = [];
    for (let i = 0; i < 40; i++) {
        lines.push(new Line());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(line => {
        line.update();
        line.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();



 // Worn


 (function () {
    const msg = "هذا الإجراء غير مسموح";
  
    // 🔐 Prevent developer tools shortcuts
    document.addEventListener("keydown", function (event) {
      const key = event.key.toLowerCase();
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (event.ctrlKey && ["u", "ع", "c", "x", "v"].includes(key)) // Prevent copy, paste, cut
      ) {
        event.preventDefault();
      }
    });
  
    // 🛑 Prevent right-click (optional)
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  
    // 🖼️ Prevent dragging images
    document.addEventListener("dragstart", function (event) {
      if (event.target.tagName === "IMG") {
        event.preventDefault();
      }
    });
  
    // 🚨 Show warning when developer tools are detected
    function showWarning() {
      document.body.innerHTML = `
        <div class="dev-warning">
          <h1>🤨 Developer Tool 🤨</h1>
          <p>تم اكتشاف أدوات المطور.</p>
        </div>
        <style>
          body {
            background-color: #111;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            font-family: Arial, sans-serif;
            overflow: hidden;
          }
          .dev-warning {
            padding: 20px;
            border: 2px solid red;
            background: rgba(175, 24, 24, 0.1);
            box-shadow: 0 0 20px red;
            border-radius: 10px;
            animation: pulse 1.5s infinite;
          }
          h1 {
            color: red;
            font-size: 2rem;
            text-shadow: 0 0 10px red;
          }
          p {
            font-size: 1.2rem;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 10px red; }
            50% { box-shadow: 0 0 25px red; }
            100% { box-shadow: 0 0 10px red; }
          }
        </style>
      `;
      setTimeout(() => window.close(), 1000);
    }
  
    // 🧠 Detect developer tools using time difference
    setInterval(() => {
      const before = new Date().getTime();
      debugger;
      const after = new Date().getTime();
      if (after - before > 100) {
        showWarning();
      }
    }, 2000);
  
    // 📐 Detect developer tools by window resize
    function detectDevToolsByResize() {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        showWarning();
      }
    }
  
    window.addEventListener("resize", detectDevToolsByResize);
  })();