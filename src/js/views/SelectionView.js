import View from "./View";

export class SelectionView extends View {
  #parentElement = document.querySelector(".selection");
  #bigContainers = document.querySelectorAll(".big-container");

  addHandlerChangeSeason(handler) {
    this.#parentElement.addEventListener("change", function (e) {
      handler(undefined, e.target.value);
    });
  }

  changeTab(id) {
    this.#bigContainers.forEach((container) => {
      container.classList.add("hidden");
    });
    this.#bigContainers.forEach((container) => {
      if (container.dataset.tab === id) container.classList.remove("hidden");
    });
  }

  addHandlerChangeTab(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".selection-btn");
      if (!btn) return;

      const id = btn.dataset.selection;
      handler(id);
    });
  }
}

export default new SelectionView();
