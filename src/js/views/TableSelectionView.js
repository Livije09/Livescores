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

  addHandlerChangeTable(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".table-selection-btn");
      if (!btn) return;

      const where = +btn.dataset.where;
      handler(undefined, where);
    });
  }
}

export default new TableSelection();
