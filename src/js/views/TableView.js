import View from "./View";

export class TableView extends View {
  _parentElement = document.querySelector(".table-body");

  constructor() {
    super(document.querySelector(".table-body"));
  }

  #clear() {
    this._parentElement.innerHTML = "";
  }

  showTable(teams) {
    this.#clear();

    teams.forEach((team) => {
      const html = `
              <div class="table-row">
                <p class="club-position table-p">${team.rank}</p>
                <div class="club-team table-p">
                  <img
                    class="club-logo"
                    src="${team.team.logo}"
                  />
                  <p class="club-name table-p">${team.team.name}</p>
                </div>
                <p class="club-games-played table-p">${team.all.played}</p>
                <p class="club-games-wins table-p">${team.all.win}</p>
                <p class="club-games-draws table-p">${team.all.draw}</p>
                <p class="club-games-loses table-p">${team.all.lose}</p>
                <p class="club-games-goals table-p">${team.all.goals.for}:${
        team.all.goals.against
      }</p>
                <p class="club-games-goal-difference table-p">${
                  team.all.goals.for - team.all.goals.against
                }</p>
                <p class="club-points table-p">${team.points}</p>
                <ul class="club-last-five table-p">
                  <li class="club-last-five-item">
                    <p class="club-last-five-w club-last-five-p">W</p>
                  </li>
                  <li class="club-last-five-item">
                    <p class="club-last-five-w club-last-five-p">W</p>
                  </li>
                  <li class="club-last-five-item">
                    <p class="club-last-five-l club-last-five-p">L</p>
                  </li>
                  <li class="club-last-five-item">
                    <p class="club-last-five-w club-last-five-p">W</p>
                  </li>
                  <li class="club-last-five-item">
                    <p class="club-last-five-d club-last-five-p">D</p>
                  </li>
                </ul>
              </div>`;
      this._parentElement.insertAdjacentHTML("beforeend", html);
    });
  }

  addHandlerPageLoaded(handler) {
    document.addEventListener("DOMContentLoaded", function () {
      handler();
    });
  }
}

export default new TableView();
