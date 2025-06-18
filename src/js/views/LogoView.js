import View from "./View";

export class LogoView extends View {
  #parentElement = document.querySelector(".div-logo");
  #overlay = document.querySelector(".overlay-2");
  #chaneLeagueContainer = document.querySelector(".change-league-container");
  #searchInput = document.querySelector(".search-input");

  constructor() {
    super();
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  showLogo(logo, logoid) {
    this.#clear();
    const html = `
          <img
            src="${logo}"
            class="logo"
            data-logoid="${logoid}"
          />`;
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }

  showChangeLeague() {
    this.#overlay.classList.remove("hidden");
    this.#chaneLeagueContainer.classList.remove("hidden");
  }

  addHandlerShowChangeLeague(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".logo");
      if (!btn) return;

      handler();
    });
  }
}

export default new LogoView();
