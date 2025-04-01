import View from "./View";

export class SelectionView extends View {
  _parentElement = document.querySelector(".selection");

  addHandlerChangeSeason(handler) {
    this._parentElement.addEventListener("change", function (e) {
      handler(undefined, e.target.value);
    });
  }
}

export default new SelectionView();
