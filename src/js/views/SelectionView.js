import View from "./View";

export class SelectionView extends View {
  #parentElement = document.querySelector(".selection");

  addHandlerChangeSeason(handler) {
    this.#parentElement.addEventListener("change", function (e) {
      handler(undefined, e.target.value);
    });
  }
}

export default new SelectionView();
