import {
  AWAY_TEAM,
  DONT_GENERATE_BTN,
  HOME_TEAM,
  LAST_MATCHES_ADD,
} from "../config";
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

  #checkIfSecondMatch(match, prevMatch) {
    console.log(match, prevMatch);
    const teams1 = [match.teams.home.name, match.teams.away.name]
      .sort()
      .join("-")
      .toLowerCase();
    const teams2 = [prevMatch.teams.home.name, prevMatch.teams.away.name]
      .sort()
      .join("-")
      .toLowerCase();
    if (teams1 === teams2) return "second-game";
    return "";
  }

  #returnScore(match, whichTeam) {
    console.log(match);
    const goals =
      match.score.extratime.home === null && match.score.extratime.away === null
        ? `${match.score.fulltime[whichTeam]}`
        : `${match.goals[whichTeam]}`;
    return goals;
  }

  #generateLastMatchesHTML(
    matches,
    team,
    whichTeam,
    allMatches,
    generateBtn = 0
  ) {
    let html = "";
    matches.forEach((match, i) => {
      console.log(match);
      let secondMatch;
      if (allMatches[i + 1])
        secondMatch = this.#checkIfSecondMatch(match, allMatches[i + 1]);
      html += `
                    <div class="last-matches-row ${secondMatch}" data-matchid="${
        match.fixture.id
      }">
                      <p class="last-matches-p">${this.getFixtureDate(
                        match
                      )}</p>
                      <div class="last-matches-teams last-matches-home-team" data-firstmatch="${
                        allMatches[i + 1]
                          ? this.#returnScore(allMatches[i + 1], HOME_TEAM)
                          : ""
                      }">
                        <div class="last-matches-team">
                          <img
                            src="${match.teams.home.logo}"
                            class="last-matches-logo"
                          />
                          <p class="last-matches-name ${this.checkWinner(
                            match.teams.home.winner
                          )}">${match.teams.home.name}</p>
                        </div>
                        <div class="last-matches-team last-matches-away-team" data-firstmatch="${
                          allMatches[i + 1]
                            ? this.#returnScore(allMatches[i + 1], AWAY_TEAM)
                            : ""
                        }">
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
                        )}">${this.#returnScore(match, HOME_TEAM)}</p>
                        <p class="last-matches-result-p ${this.checkWinner(
                          match.teams.away.winner
                        )}">${this.#returnScore(match, AWAY_TEAM)}</p>
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
    html += this.#generateLastMatchesHTML(
      firstMatches,
      team,
      whichTeam,
      matches
    );
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
      matches,
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

  addHandlerShowMatch(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".last-matches-row");
      if (!btn) return;

      const id = btn.dataset.matchid;
      console.log(id);
      const secondMatch = btn.classList.contains("second-game") ? 1 : 0;
      console.log(secondMatch);
      if (secondMatch) {
        const homeGoalsFirstMatch = btn.querySelector(".last-matches-home-team")
          .dataset.firstmatch;
        const awayGoalsFirstMatch = btn.querySelector(".last-matches-away-team")
          .dataset.firstmatch;
        handler(secondMatch, id, awayGoalsFirstMatch, homeGoalsFirstMatch);
      } else handler(secondMatch, id);
    });
  }
}

export default new LastMatchesView();
