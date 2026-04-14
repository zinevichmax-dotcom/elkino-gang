import { initParticles } from "./modules/particles.js";
import { initFAQ } from "./modules/faq.js";
import { initRadio } from "./modules/radio.js";

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initFAQ();
  initRadio();
});
