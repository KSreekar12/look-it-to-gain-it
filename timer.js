function waitThenCountdown(waitSec, countSec, display, onDone) {
  let wait = waitSec;

  // ❌ No card during wait
  display.className = "";
  display.innerText = `Please wait ${wait}s`;

  const waitInterval = setInterval(() => {
    wait--;
    display.innerText = `Please wait ${wait}s`;

    if (wait <= 0) {
      clearInterval(waitInterval);
      startCountdown(countSec, display, onDone);
    }
  }, 1000);
}

function startCountdown(total, display, callback) {
  let time = total;

  // ✅ Show card only for countdown
  display.className = "timer-card";
  display.innerHTML = `
    <div class="timer-fill"></div>
    <div class="timer-text">${time}</div>
  `;

  const fill = display.querySelector(".timer-fill");
  const text = display.querySelector(".timer-text");

  const interval = setInterval(() => {
    time--;
    text.innerText = time;

    // Color rules
    if (time >= 4) {
      display.style.background = "#ef4444"; // red
    } else if (time >= 1) {
      display.style.background = "#f59e0b"; // orange
    } else {
      display.style.background = "#22c55e"; // green
    }

    // Fill progress
    const progress = ((total - time) / total) * 100;
    fill.style.width = progress + "%";

    if (time <= 0) {
      clearInterval(interval);
      callback();
    }
  }, 1000);
}

/* Scroll activation – mobile + desktop + tablet */
function activateOnScroll(button, nextUrl) {
  function enable() {
    if (button.classList.contains("active")) return;
    button.classList.add("active");
    button.onclick = () => location.href = nextUrl;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 250) enable();
  });

  // Safety fallback
  setTimeout(enable, 20000);
}
