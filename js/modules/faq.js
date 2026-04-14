/**
 * FAQ: аккордеон. Кнопка .faq-q переключает класс .open на родителе.
 * aria-expanded синхронизируется с состоянием (несколько панелей могут быть открыты).
 */
export function initFAQ() {
  document.querySelectorAll(".faq-item").forEach((item, index) => {
    const trigger = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!trigger || !panel) return;

    const triggerId = trigger.id || `faq-trigger-${index}`;
    const panelId = panel.id || `faq-panel-${index}`;
    trigger.id = triggerId;
    panel.id = panelId;
    trigger.setAttribute("aria-controls", panelId);
    panel.setAttribute("role", "region");
    trigger.setAttribute("aria-expanded", String(item.classList.contains("open")));

    trigger.addEventListener("click", () => {
      item.classList.toggle("open");
      trigger.setAttribute(
        "aria-expanded",
        String(item.classList.contains("open"))
      );
    });
  });
}
