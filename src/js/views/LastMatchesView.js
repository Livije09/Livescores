import { DONT_GENERATE_BTN, LAST_MATCHES_ADD } from "../config";
import View from "./View";

export class LastMatchesView extends View {
  #parentElement = document.querySelector(".last-matches-div");
  #homeTeam = document.querySelector(".last-matches-home");
  #awayTeam = document.querySelector(".last-matches-away");

  clearLastMatches() {
    this.#homeTeam.innerHTML = "";
    this.#awayTeam.innerHTML = "";
  }

  #generateWhoWon(match, team) {
    const { home, away } = match.goals;
    const isDraw = home === away;

    let result;
    if (isDraw) {
      result = "D";
    } else {
      const isHomeTeam = team.id === match.teams.home.id;
      const isWin = (isHomeTeam && home > away) || (!isHomeTeam && away > home);
      result = isWin ? "W" : "L";
    }

    const resultClass = result.toLowerCase();

    return `<p class="club-last-five-${resultClass} club-last-five-p last-matches-status">
            ${result}
          </p>`;
  }

  #generateLastMatchesHTML(matches, team, whichTeam, generateBtn = 0) {
    let html = "";
    matches.forEach((match, i) => {
      console.log(match);
      html += `
                    <div class="last-matches-row">
                      <p class="last-matches-p">${this.getFixtureDate(
                        match
                      )}</p>
                      <div class="last-matches-teams">
                        <div class="last-matches-team">
                          <img
                            src="${match.teams.home.logo}"
                            class="last-matches-logo"
                          />
                          <p class="last-matches-name ${this.checkWinner(
                            match.teams.home.winner
                          )}">${match.teams.home.name}</p>
                        </div>
                        <div class="last-matches-team">
                          <img
                            src="${match.teams.away.logo}"
                            class="last-matches-logo"
                          />
                          <p class="last-matches-name ${this.checkWinner(
                            match.teams.away.winner
                          )}">${match.teams.away.name}</p>
                        </div>
                      </div>
                      <div class="last-matches-result">
                        <p class="last-matches-result-p ${this.checkWinner(
                          match.teams.home.winner
                        )}">${
        match.score.extratime.home === null &&
        match.score.extratime.away === null
          ? `${match.score.fulltime.home}`
          : `${match.goals.home}`
      }</p>
                        <p class="last-matches-result-p ${this.checkWinner(
                          match.teams.away.winner
                        )}">${
        match.score.extratime.home === null &&
        match.score.extratime.away === null
          ? `${match.score.fulltime.away}`
          : `${match.goals.away}`
      }</p>
</p>
                      </div>
                      ${this.#generateWhoWon(match, team)}
                    </div>
                    ${
                      i > 0 && (i + 1) % 5 === 0 && !generateBtn
                        ? `<div class="last-matches-btn-div">
                      <button class="last-matches-btn last-matches-btn-${this.checkWhichTeam(
                        whichTeam
                      )}" data-lmbtn="${this.checkWhichTeam(whichTeam)}">
                        Show more matches
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="last-matches-svg">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
                      </button>
                    </div>`
                        : ""
                    }`;
    });
    return html;
  }

  generateLastMatches(team, matches, whichTeam) {
    const firstMatches = matches.slice(0, 5);
    let html = `
                  <div class="last-matches-header">
                    <p class="last-matches-header-p">${team.name} last matches</p>
                  </div>`;
    html += this.#generateLastMatchesHTML(firstMatches, team, whichTeam);
    !whichTeam
      ? this.#homeTeam.insertAdjacentHTML("beforeend", html)
      : this.#awayTeam.insertAdjacentHTML("beforeend", html);
  }

  showMoreMatches(matches, matchesShown, team, whichTeam) {
    const matchesToShow = matches.slice(
      matchesShown,
      matchesShown + LAST_MATCHES_ADD
    );
    const html = this.#generateLastMatchesHTML(
      matchesToShow,
      team,
      whichTeam,
      DONT_GENERATE_BTN
    );
    const insertDiv = document.createElement("div");
    insertDiv.innerHTML = html;
    const teamContainer = !whichTeam ? this.#homeTeam : this.#awayTeam;
    const btn = teamContainer.lastChild;
    teamContainer.insertBefore(insertDiv, btn);
  }

  hideShowMoreBtn(whichTeam) {
    const teamContainer = !whichTeam ? this.#homeTeam : this.#awayTeam;
    const btn = teamContainer.lastChild;
    btn.classList.add("hidden");
  }

  addHandlerShowMoreMatches(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".last-matches-btn");
      if (!btn) return;

      const id = btn.dataset.lmbtn;
      handler(id);
    });
  }
}

export default new LastMatchesView();
