import View from "./View";

export class ChangeLeagueView extends View {
  #parentElement = document.querySelector(".change-league-container");
  #changeLeagueContainer = document.querySelector(".change-league-leagues");
  #closeBtn = document.querySelector(".search-close-svg");
  #overlay = document.querySelector(".overlay-2");
  #searchInput = document.querySelector(".search-input");
  #arrowRight = document.querySelector(".search-arrow-right");
  #arrowLeft = document.querySelector(".search-arrow-left");
  #currentPage = 1;
  #maxPage = 1;

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

  #generatePage(pageNumber, leagues) {
    return `
      <div class="change-league-page change-league-page${pageNumber}">
        ${this.#generateLogos(leagues)}
      </div>
    `;
  }

  #generateLogos(leagues) {
    return leagues
      .map(
        (league) => `<img
              src="${league.league.logo}"
              class="change-league-league"
              data-leagueid="1"
            />
      `
      )
      .join("");
  }

  showFoundLeagues(leagues) {
    let html = "";
    let page = 0;
    leagues.forEach((_, i) => {
      if (i % 5 === 0) {
        page++;
        html += this.#generatePage(page, leagues.slice(i, page * 5));
      }
    });
    console.log(html);
    this.#changeLeagueContainer.insertBefore(html, this.#arrowRight);
    const pagesContainers = document.querySelectorAll(".change-league-page");
    this.#movePages(pagesContainers);
    if (page > 1) {
      [this.#arrowLeft, this.#arrowRight].forEach((arrow) =>
        arrow.classList.remove("hidden")
      );
    }
    this.#maxPage = page;
    this.#currentPage = 1;
  }

  #movePages(pages) {
    let counter = 0;
    pages.forEach((page) => {
      page.style.transform = `translate(${counter}%, 0%)`;
      counter += 200;
    });
  }
}

export default new ChangeLeagueView();
