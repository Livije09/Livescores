import View from "./View";

export class LastMatchesView extends View {
  #parentElement = document.querySelector(".last-matches-div");
  #homeTeam = document.querySelector(".last-matches-home");
  #awayTeam = document.querySelector(".last-matches-away");

  #checkWhichTeam(whichTeam) {
    if (!whichTeam) return "home";
    return "away";
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

  generateLastMatches(team, matches, whichTeam) {
    !whichTeam
      ? (this.#homeTeam.innerHTML = "")
      : (this.#awayTeam.innerHTML = "");
    const firstMatches = matches.slice(0, 5);
    let html = `
                  <div class="last-matches-header">
                    <p class="last-matches-header-p">${team.name} last matches</p>
                  </div>`;
    firstMatches.forEach((match, i) => {
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
                          <p class="last-matches-name">${
                            match.teams.home.name
                          }</p>
                        </div>
                        <div class="last-matches-team">
                          <img
                            src="${match.teams.away.logo}"
                            class="last-matches-logo"
                          />
                          <p class="last-matches-name">${
                            match.teams.away.name
                          }</p>
                        </div>
                      </div>
                      <div class="last-matches-result">
                        <p class="last-matches-result-p ${
                          match.teams.home.winner ? "winner" : ""
                        }">${
        match.score.extratime.home === null
          ? `${match.score.fulltime.home}`
          : `${match.score.extratime.home}`
      }</p>
                        <p class="last-matches-result-p ${
                          match.teams.away.winner ? "winner" : ""
                        }">${
        match.score.extratime.away === null
          ? `${match.score.fulltime.away}`
          : `${match.score.extratime.away}`
      }</p>
</p>
                      </div>
                      ${this.#generateWhoWon(match, team)}
                    </div>
                    ${
                      i > 0 && (i + 1) % 5 === 0
                        ? `<div class="last-matches-btn-div">
                      <button class="last-matches-btn last-matches-btn-${this.#checkWhichTeam(
                        whichTeam
                      )}">
                        Show more matches
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="last-matches-svg">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
                      </button>
                    </div>`
                        : ""
                    }`;
    });
    !whichTeam
      ? this.#homeTeam.insertAdjacentHTML("beforeend", html)
      : this.#awayTeam.insertAdjacentHTML("beforeend", html);
  }
}

export default new LastMatchesView();
