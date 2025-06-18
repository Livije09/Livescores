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

  resetChangeLeague() {
    this.#searchInput.value = "";
    const pagesContainers = document.querySelectorAll(".change-league-page");
    pagesContainers.forEach((container) => container.remove());
    [this.#arrowLeft, this.#arrowRight].forEach((arrow) =>
      arrow.classList.add("hidden")
    );
    const noResults = document.querySelector(".change-league-no-results");
    if (noResults) noResults.remove();
  }

  #addHandlerChangePage() {
    this.#arrowLeft.addEventListener("click", this.#previousPage.bind(this));
    this.#arrowRight.addEventListener("click", this.#nextPage.bind(this));
  }

  #clearAndReset() {
    if (document.querySelector(".div-pages-container"))
      document.querySelector(".div-pages-container").remove();
    this.#currentPage = 1;
    this.#maxPage = 1;
  }

  hideOverlayAndChangeLeague() {
    this.#parentElement.classList.add("hidden");
    this.#overlay.classList.add("hidden");
  }

  #addHandlerClose() {
    [this.#closeBtn, this.#overlay].forEach((click) => {
      click.addEventListener("click", () => this.hideOverlayAndChangeLeague());
    });
  }

  addHandlerSearchLeaguesIcon(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".search-icon");
      if (!btn) return;

      const value = document.querySelector(".search-input").value;
      handler(value);
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
              data-leagueid="${league.league.id}"
              title="${league.league.name}"
            />
      `
      )
      .join("");
  }

  #hideAndShowArrows(page) {
    page > 1
      ? [this.#arrowLeft, this.#arrowRight].forEach((arrow) =>
          arrow.classList.remove("hidden")
        )
      : [this.#arrowLeft, this.#arrowRight].forEach((arrow) =>
          arrow.classList.add("hidden")
        );
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
    if (page === 0)
      html = `
        <p class="change-league-no-results">
          No results
        </p>`;
    const htmlDiv = document.createElement("div");
    htmlDiv.classList.add("div-pages-container");
    htmlDiv.style.justifyContent === "unset";
    console.log(page);
    if (+page === 0) htmlDiv.classList.add("justify-content");
    htmlDiv.innerHTML = html;
    this.#changeLeagueContainer.insertBefore(htmlDiv, this.#arrowRight);
    const pagesContainers = document.querySelectorAll(".change-league-page");
    this.#movePages(pagesContainers);
    this.#hideAndShowArrows(page);
    this.#maxPage = page * 2 - 1;
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
      const offset = i * 100;
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
    else this.#currentPage += 2;
    this.#changePage(this.#currentPage);
  }

  #previousPage() {
    if (this.#currentPage === 1) this.#currentPage = this.#maxPage;
    else this.#currentPage -= 2;
    this.#changePage(this.#currentPage);
  }

  addHandlerChangeLeague(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".change-league-league");
      if (!btn) return;

      const id = btn.dataset.leagueid;
      handler(id);
    });
  }
}

export default new ChangeLeagueView();
