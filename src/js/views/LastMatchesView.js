import View from "./View";

export class LastMatchesView extends View {
  #parentElement = document.querySelector(".last-matches-div");
  #homeTeam = document.querySelector(".last-matches-home");
  #awayTeam = document.querySelector(".last-matches-away");

  #clear() {
    this.#homeTeam.innerHTML = "";
    this.#awayTeam.innerHTML = "";
  }

  #checkWhichTeam(whichTeam) {
    if (!whichTeam) return "home";
    return "away";
  }

  #showScore(match) {}

  generateLastMatches(team, matches, whichTeam) {
    this.#clear();
    const firstMatches = matches.slice(0, 5);
    let html = `
                  <div class="last-matches-header">
                    <p class="last-matches-header-p">${team.name} last matches</p>
                  </div>`;
    matches.forEach((match, i) => {
      console.log(match);
      html += `
                  <div class="last-matches-${this.#checkWhichTeam(
                    whichTeam
                  )}-div">
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
                        <p class="last-matches-p ${
                          match.teams.home.winner ? "winner" : ""
                        }">${
        match.score.extratime.home === null
          ? `${match.score.fulltime.home}`
          : `${match.score.extratime.home}`
      }</p>
                        <p class="last-matches-p ${
                          match.teams.away.winner ? "winner" : ""
                        }">${
        match.score.extratime.away === null
          ? `${match.score.fulltime.away}`
          : `${match.score.extratime.away}`
      }</p>
</p>
                      </div>
                      <p
                        class="club-last-five-w club-last-five-p last-matches-status"
                      >
                        W
                      </p>
                    </div>
                    ${
                      i > 0 && i % 5 === 0
                        ? `<div class="last-matches-btn-div">
                      <button class="last-matches-btn last-matches-btn-${this.#checkWhichTeam(
                        whichTeam
                      )}">
                        Show more matches
                      </button>
                    </div>`
                        : ""
                    }
                  </div>`;
    });
    !whichTeam
      ? this.#homeTeam.insertAdjacentHTML("beforeend", html)
      : this.#awayTeam.insertAdjacentHTML("beforeend", html);
  }
}

export default new LastMatchesView();
