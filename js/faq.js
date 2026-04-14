/* =============================================
   ELKINO GANG — FAQ Accordion
   ============================================= */

function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(function(item) {
    item.querySelector('.faq-q').addEventListener('click', function() {
      item.classList.toggle('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', initFAQ);
