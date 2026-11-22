const clock = document.querySelector('[data-clock]');
const timeInBarcelona = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit'
});
function updateClock() {
  clock.textContent = timeInBarcelona.format(new Date());
}
updateClock();
setInterval(updateClock, 1000);

const greeting = document.querySelector('.greeting-word');
if (greeting) {
  const words = [
    { text: 'Hello', lang: 'en' },
    { text: 'Hola', lang: 'es' },
    { text: 'مرحبا', lang: 'ar' }
  ];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  function showNextGreeting() {
    current = (current + 1) % words.length;
    greeting.lang = words[current].lang;
    greeting.textContent = words[current].text;
  }
  setInterval(() => {
    if (document.hidden || greeting.getAnimations().length) return;
    if (reducedMotion.matches) {
      showNextGreeting();
      return;
    }
    const flipOut = greeting.animate(
      { transform: ['rotateX(0deg)', 'rotateX(90deg)'] },
      { duration: 160, easing: 'ease-in' }
    );
    flipOut.onfinish = () => {
      showNextGreeting();
      greeting.animate(
        { transform: ['rotateX(-90deg)', 'rotateX(0deg)'] },
        { duration: 200, easing: 'ease-out' }
      );
    };
  }, 3000);
}

const languageMenu = document.querySelector('.language');
if (languageMenu) {
  document.addEventListener('click', event => {
    if (!languageMenu.contains(event.target)) languageMenu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && languageMenu.open) {
      languageMenu.open = false;
      languageMenu.querySelector('summary').focus();
    }
  });
}
