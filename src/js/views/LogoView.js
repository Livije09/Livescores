import View from "./View";

export class LogoView extends View {
  _parentElement = document.querySelector(".div-logo");

  constructor() {
    super();
  }

  #clear() {
    this._parentElement.innerHTML = "";
  }

  showLogo(logo, logoid) {
    this.#clear();
    const html = `
          <img
            src="${logo}"
            class="logo"
            data-logoid="${logoid}"
          />`;
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}

export default new LogoView();
