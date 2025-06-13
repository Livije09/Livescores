import {
  WHICH_TABLE,
  FIXTURE_TIME,
  NORMALIZE_TIME,
  FIXTURE_DATE,
} from "../config";
import { SVGS } from "../svgs";

export default class View {
  #timer;
  #topMessage = document.querySelector(".top-message");

  #resetTimer() {
    if (this.#timer) {
      clearTimeout(this.#timer);
    }
  }

  #clear() {
    this.#topMessage.innerHTML = "";
  }

  #hideMessage() {
    this.#topMessage.style.transform = "translate(-50%, -250%)";
  }

  #prepareTopMessage() {
    this.#topMessage.style.transform = "translate(-50%, -50%)";
    this.#clear();
  }

  renderError(error) {
    this.#resetTimer();
    this.#prepareTopMessage();
    // this.#topMessage.classList.remove("success-message");
    const html = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="error-icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>

    <p class="top-message-text">${error}</p>
    `;
    this.#topMessage.insertAdjacentHTML("afterbegin", html);
    this.#topMessage.classList.add("fail-message");
    this.#timer = setTimeout(() => this.#hideMessage(), 2000);
  }

  generateRecentForm(team) {
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

  checkStatus(team) {
    if (!team.description) return;

    if (team.description.includes("Champions League"))
      return "club-position-blue";

    if (team.description.includes("Europa League"))
      return "club-position-brown";

    if (team.description.includes("Conference League"))
      return "club-position-yellow";

    if (team.description.includes("Relegation")) return "club-position-red";

    if (team.description.includes("Play-off")) return "club-position-brown";

    if (team.description.includes("Promotion")) return "club-position-blue";

    if (team.description.includes("Championship Round"))
      return "club-championship-blue";
  }

  giveDescription(team) {
    if (!team.description) return "";
    return `${team.description}`;
  }

  generateTableHTML(team, table) {
    return `
              <div class="table-row">
                <p class="club-position ${this.checkStatus(
                  team
                )} table-p" data-description="${this.giveDescription(team)}">${
      team.rank
    }.</p>
                <div class="club-team table-p">
                  <img
                    class="club-logo"
                    src="${team.team.logo}"
                  />
                  <p class="club-name table-p">${team.team.name}</p>
                </div>
                <p class="club-games-played table-p">${
                  team[WHICH_TABLE[table]].played
                }</p>
                <p class="club-games-wins table-p">${
                  team[WHICH_TABLE[table]].win
                }</p>
                <p class="club-games-draws table-p">${
                  team[WHICH_TABLE[table]].draw
                }</p>
                <p class="club-games-loses table-p">${
                  team[WHICH_TABLE[table]].lose
                }</p>
                <p class="club-games-goals table-p">${
                  team[WHICH_TABLE[table]].goals.for
                }:${team[WHICH_TABLE[table]].goals.against}</p>
                <p class="club-games-goal-difference table-p">${
                  team[WHICH_TABLE[table]].goals.for -
                  team[WHICH_TABLE[table]].goals.against
                }</p>
                <p class="club-points table-p">${team.points}</p>
                <ul class="club-last-five table-p">
                  ${this.generateRecentForm(team)}
                </ul>
              </div>`;
  }

  getFixtureTime(fixture) {
    const time =
      +fixture.fixture.date.slice(FIXTURE_TIME[0], FIXTURE_TIME[1]) +
      NORMALIZE_TIME +
      ":" +
      fixture.fixture.date.slice(FIXTURE_TIME[2], FIXTURE_TIME[3]);
    return time;
  }

  getFixtureDate(fixture) {
    const date = fixture.fixture.date.slice(FIXTURE_DATE[0], FIXTURE_DATE[1]);
    return date;
  }

  checkWinner(team) {
    if (team) return "winner";
    return "";
  }

  checkGoingThrough(
    homeGoals,
    awayGoals,
    homeGoals1,
    awayGoals1,
    homePenalties,
    awayPenalties,
    whichTeam
  ) {
    console.log(
      `Home goals: ${homeGoals}, Away goals: ${awayGoals}, Home goals 1: ${homeGoals1}, Away goals 1: ${awayGoals1}`
    );
    if (homeGoals === null || awayGoals === null) return "";
    const returnHTML =
      SVGS.goingThrough + `<p class="going-through-detail">Going through</p>`;
    if (whichTeam === "home") {
      if (homeGoals + homeGoals1 > awayGoals + awayGoals1) return returnHTML;
      if (homeGoals + homeGoals1 === awayGoals + awayGoals1) {
        if (homePenalties > awayPenalties) return returnHTML;
        if (awayGoals1 > awayGoals) return returnHTML;
        return "";
      }
    }
    if (whichTeam === "away") {
      if (homeGoals + homeGoals1 < awayGoals + awayGoals1) return returnHTML;
      if (homeGoals + homeGoals1 === awayGoals + awayGoals1) {
        if (homePenalties < awayPenalties) return returnHTML;
        if (awayGoals > awayGoals1) return returnHTML;
        return "";
      }
    }
    return "";
  }

  checkWhichTeam(whichTeam) {
    if (!whichTeam) return "home";
    return "away";
  }
}
