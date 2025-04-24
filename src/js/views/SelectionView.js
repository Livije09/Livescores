import View from "./View";

export class SelectionView extends View {
  #parentElement = document.querySelector(".selection");
  #bigContainers = document.querySelectorAll(".big-container");
  #selectionBtns = document.querySelectorAll(".selection-btn");

  addHandlerChangeSeason(handler) {
    this.#parentElement.addEventListener("change", function (e) {
      handler(undefined, e.target.value);
    });
  }

  changeTab(id = 0) {
    this.#bigContainers.forEach((container) => {
      container.classList.add("hidden");
    });
    this.#bigContainers.forEach((container) => {
      if (container.dataset.tab === id) container.classList.remove("hidden");
    });
    this.#selectionBtns.forEach((btn) =>
      btn.classList.remove("selection-btn-active")
    );
    this.#selectionBtns.forEach((btn) => {
      if (btn.dataset.selection === id)
        btn.classList.add("selection-btn-active");
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
