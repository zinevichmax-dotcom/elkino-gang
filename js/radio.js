/* =============================================
   ELKINO GANG — Radio Player
   ============================================= */

const RADIO_STREAM_URL = 'https://elkinogang.ru/radio';
const RADIO_STATUS_URL = '/radio-status';
const META_INTERVAL = 10000; // 10 seconds

let radio = null;
let playing = false;
let elapsed = 0;
let timer = null;
let metaTimer = null;

const SVG_PLAY = '<polygon points="6,3 17,10 6,17" fill="#0A1F04"/>';
const SVG_PAUSE = '<rect x="5" y="3" width="4" height="14" rx="1" fill="#0A1F04"/><rect x="12" y="3" width="4" height="14" rx="1" fill="#0A1F04"/>';

function initRadio() {
  radio = document.getElementById('radioStream');
}

function toggleRadio() {
  if (!radio) initRadio();

  if (playing) {
    stopRadio();
  } else {
    startRadio();
  }
}

function startRadio() {
  radio.src = RADIO_STREAM_URL;
  radio.play();
  playing = true;
  elapsed = 0;

  // Start elapsed timer
  timer = setInterval(function() {
    elapsed++;
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    updateElement('spTime', (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s);
  }, 1000);

  // Update UI
  updatePlayButtons(SVG_PAUSE);
  updateElement('spStatus', 'LIVE');
  updateElement('mainBadgeText', 'В эфире');
  toggleClass('spDot', 'live', true);
  toggleClass('mainDot', 'live', true);
  toggleClass('spBarFill', 'active', true);
  toggleClass('mainBarFill', 'active', true);
  toggleClass('radioVis', 'playing', true);

  // Fetch metadata
  fetchMeta();
  metaTimer = setInterval(fetchMeta, META_INTERVAL);
}

function stopRadio() {
  radio.pause();
  radio.src = '';
  playing = false;

  clearInterval(timer);
  clearInterval(metaTimer);

  // Update UI
  updatePlayButtons(SVG_PLAY);
  updateElement('spStatus', 'OFF');
  updateElement('mainBadgeText', 'Нажми play');
  updateElement('spTime', '--:--');
  updateElement('spTrack', 'Elkino Radio');
  updateElement('mainTrackName', 'Elkino Radio');
  toggleClass('spDot', 'live', false);
  toggleClass('mainDot', 'live', false);
  toggleClass('spBarFill', 'active', false);
  toggleClass('mainBarFill', 'active', false);
  toggleClass('radioVis', 'playing', false);
}

function fetchMeta() {
  fetch(RADIO_STATUS_URL)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      const src = data.icestats.source;
      if (!src) return;

      const title = src.title || 'Elkino Radio';
      const listeners = src.listeners || 0;

      updateElement('spTrack', title);
      updateElement('mainTrackName', title);

      // Russian plural for "listeners"
      let word = 'слушателей';
      if (listeners === 1) word = 'слушатель';
      else if (listeners > 1 && listeners < 5) word = 'слушателя';

      updateElement('mainBadgeText', 'В эфире — ' + listeners + ' ' + word);
    })
    .catch(function() {});
}

// --- Helpers ---

function updateElement(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function updatePlayButtons(svg) {
  const sp = document.getElementById('spPlayIcon');
  const main = document.getElementById('mainPlayIcon');
  if (sp) sp.innerHTML = svg;
  if (main) main.innerHTML = svg;
}

function toggleClass(id, className, add) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle(className, add);
}

document.addEventListener('DOMContentLoaded', initRadio);
