import { POINTS_FOR_DRAW, POINTS_FOR_WIN, WHICH_TABLE } from "../config";
import View from "./View";

export class TableSelection extends View {
  #parentElement = document.querySelector(".table-selection-list");
  #tableBody = document.querySelector(".table-body");

  #clear() {
    this.#tableBody.innerHTML = "";
  }

  changeWhere(teams, whichTable) {
    this.#clear();

    teams.forEach((team) => {
      const html = this.generateTableHTML(team, whichTable);
      this.#tableBody.insertAdjacentHTML("beforeend", html);
    });
  }

  #calculatePoints(team, where) {
    return (
      team[WHICH_TABLE[where]].win * POINTS_FOR_WIN +
      team[WHICH_TABLE[where]].draw * POINTS_FOR_DRAW
    );
  }

  changePoints(teams, where) {
    const tableRow = document.querySelectorAll(".table-row");
    const updatedPoints = [];
    tableRow.forEach((row, i) => {
      const newPoints = this.#calculatePoints(teams[i], where);
      row.querySelector(".club-points").innerHTML = newPoints;
      updatedPoints.push(newPoints);
    });
    return updatedPoints;
  }

  changeSelectedTab(tab) {
    const btns = document.querySelectorAll(".table-selection-btn");
    btns.forEach((btn) => btn.classList.remove("table-selection-btn-active"));
    btns[tab].classList.add("table-selection-btn-active");
  }

  addHandlerChangeTable(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".table-selection-btn");
      if (!btn) return;

      const where = +btn.dataset.where;
      handler(where);
    });
  }
}

export default new TableSelection();
