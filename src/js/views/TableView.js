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

  #generateRecentForm(team) {
    let html = "";
    const lastFive = team.form.split("");
    lastFive.forEach((match) => {
      html += `
                    <li class="club-last-five-item">
                      <p class="club-last-five-${match.toLowerCase()} club-last-five-p">${match}</p>
                    </li>`;
    });
    return html;
  }

  #checkStatus(team) {
    if (!team.description) return;

    if (team.description.includes("Champions League"))
      return "club-position-cl";

    if (team.description.includes("Europa League")) return "club-position-uel";

    if (team.description.includes(" Conference League"))
      return "club-position-col";

    if (team.description.includes("Relegation"))
      return "club-position-relegation";

    if (team.description.includes("Play-off")) return "club-position-play-off";

    if (team.description.includes("Promotion"))
      return "club-position-promotion";

    if (team.description.includes("Championship Round"))
      return "club-championship-round";
  }

  #giveDescription(team) {
    if (!team.description) return "";
    return `${team.description}`;
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

  showTable(teams) {
    this.#clear();

    teams.forEach((team) => {
      const html = `
              <div class="table-row">
                <p class="club-position ${this.#checkStatus(
                  team
                )} table-p" data-description="${this.#giveDescription(team)}">${
        team.rank
      }.</p>
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
                  ${this.#generateRecentForm(team)}
                </ul>
              </div>`;
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
