import { SHIFT_TOP } from "../config";
import View from "./View";

export class TableView extends View {
  #parentElement = document.querySelector(".table-body");
  #clubDetail = document.querySelector(".club-detail");

  constructor() {
    super(document.querySelector(".table-body"));
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  showDetails(team) {
    if (team.dataset.description === "") return;

    const rect = team.getBoundingClientRect();
    this.#clubDetail.style.display = "block";
    this.#clubDetail.innerHTML = `${team.dataset.description}`;
    this.#clubDetail.style.left = rect.left + window.scrollX + "px";
    this.#clubDetail.style.top = rect.top + SHIFT_TOP + window.scrollY + "px";
  }

  hideDetails() {
    this.#clubDetail.style.display = "none";
  }

  showTable(teams, whichTable) {
    this.#clear();

    teams.forEach((team) => {
      const html = this.generateTableHTML(team, whichTable);
      this.#parentElement.insertAdjacentHTML("beforeend", html);
    });
  }

  addHandlerPageLoaded(handler) {
    document.addEventListener("DOMContentLoaded", function () {
      handler();
    });
  }

  addHandlerShowDetail(handler) {
    this.#parentElement.addEventListener("mouseover", function (e) {
      const position = e.target.closest(".club-position");
      if (!position) return;

      handler(position);
    });
  }

  addHandlerHideDetail(handler) {
    this.#parentElement.addEventListener("mouseout", function (e) {
      const position = e.target.closest(".club-position");
      if (!position) return;

      handler();
    });
  }
}

export default new TableView();
