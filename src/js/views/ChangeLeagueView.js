import View from "./View";

export class ChangeLeagueView extends View {
  #parentElement = document.querySelector(".change-league-container");
  #closeBtn = document.querySelector(".search-close-svg");
  #overlay = document.querySelector(".overlay-2");
  #searchInput = document.querySelector(".search-input");
  #arrowRight = document.querySelector(".search-arrow-right");
  #arrowLeft = document.querySelector(".search-arrow-left");

  constructor() {
    super();
    this.#addHandlerClose();
  }

  #hideOverlayAndChangeLeague() {
    this.#parentElement.classList.add("hidden");
    this.#overlay.classList.add("hidden");
  }

  #addHandlerClose() {
    [this.#closeBtn, this.#overlay].forEach((click) => {
      click.addEventListener("click", () => this.#hideOverlayAndChangeLeague());
    });
  }

  addHandlerSearchLeagues(handler) {
    this.#searchInput.addEventListener("change", () => {
      const value = this.#searchInput.value;

      handler(value);
    });
  }

  // movePages() {
  //   let brojac = 0;
  //   this.#pages.forEach((e) => {
  //     console.log(e);
  //     e.style.transform = `translate(${brojac}%, 0%)`;
  //     brojac += 200;
  //   });
  // }
}

export default new ChangeLeagueView();
