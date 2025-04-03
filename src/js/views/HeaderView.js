import View from "./View";

export class HeaderView extends View {
  #parentElement = document.querySelector(".table-header");
  #childElements = document.querySelectorAll(".table-header-p");
  #direction = 0;

  constructor() {
    super();
  }

  #removeClickedClass() {
    this.#childElements.forEach((el) =>
      el.classList.remove("table-header-p-clicked")
    );
  }

  #checkDirection() {
    if (this.#direction === 0) this.#direction = 1;
    else this.#direction = 0;
    return this.#direction;
  }

  addHandlerSort(handler) {
    const self = this;
    this.#parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".table-header-p");
      if (!btn || btn.classList.contains("last-five")) return;

      const select = btn.dataset.header;

      if (!btn.classList.contains("table-header-p-clicked")) {
        self.#direction = 0;
        self.#removeClickedClass();
        btn.classList.add("table-header-p-clicked");
      }

      handler(self.#checkDirection(), select);
    });
  }
}

export default new HeaderView();
