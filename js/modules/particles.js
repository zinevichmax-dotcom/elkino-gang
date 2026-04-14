/**
 * Hero: лёгкие «частицы» — случайные задержки и длительность анимации float.
 */
export function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 6}s`;
    p.style.animationDuration = `${4 + Math.random() * 4}s`;
    const size = `${1 + Math.random() * 2}px`;
    p.style.width = size;
    p.style.height = size;
    container.appendChild(p);
  }
}
