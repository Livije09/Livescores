import { COUNTER_INCREASE, COUNTER_STARTING_VALUE } from "../config";
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
    this.#addHandlerChangePage();
  }

  #addHandlerChangePage() {
    this.#arrowLeft.addEventListener("click", this.#previousPage.bind(this));
    this.#arrowRight.addEventListener("click", this.#nextPage.bind(this));
  }

  #clearAndReset() {
    if (document.querySelector(".div-pages-container"))
      document.querySelector(".div-pages-container").innerHTML = "";
    this.#currentPage = 1;
    this.#maxPage = 1;
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
    this.#clearAndReset();
    let html = "";
    let page = 0;
    leagues.forEach((_, i) => {
      if (i % 5 === 0) {
        page++;
        html += this.#generatePage(page, leagues.slice(i, i + 5));
      }
    });
    console.log(html);
    const htmlDiv = document.createElement("div");
    htmlDiv.classList.add("div-pages-container");
    htmlDiv.innerHTML = html;
    this.#changeLeagueContainer.insertBefore(htmlDiv, this.#arrowRight);
    const pagesContainers = document.querySelectorAll(".change-league-page");
    this.#movePages(pagesContainers);
    if (page > 1) {
      [this.#arrowLeft, this.#arrowRight].forEach((arrow) =>
        arrow.classList.remove("hidden")
      );
    }
    this.#maxPage = page;
    console.log(this.#maxPage);
    this.#currentPage = 1;
  }

  #movePages(pages) {
    // let counter = 0;
    // pages.forEach((page) => {
    //   page.style.transform = `translate(${counter}%, 0%)`;
    //   counter += 50;
    // });
    pages.forEach((page, i) => {
      const offset = i * 0;
      page.style.transform = `translateX(${offset}%)`;
    });
  }

  #changePage(pageNumber) {
    const pages = document.querySelectorAll(".change-league-page");
    pages.forEach((page, i) => {
      const offset = (i - (pageNumber - 1)) * 100;
      page.style.transform = `translateX(${offset}%)`;
    });
  }

  #nextPage() {
    if (this.#currentPage === this.#maxPage) this.#currentPage = 1;
    else this.#currentPage++;
    this.#changePage(this.#currentPage);
  }

  #previousPage() {
    if (this.#currentPage === 1) this.#currentPage = this.#maxPage;
    else this.#currentPage--;
    this.#changePage(this.#currentPage);
  }
}

export default new ChangeLeagueView();
