import View from "./View";

export class MatchView extends View {
  #parentElement = document.querySelector(".fixture-container");
  #matchTeams = document.querySelector(".fixture-teams");
  #xIcon = document.querySelector(".x-icon");
  #overlay = document.querySelector(".overlay");

  constructor() {
    super();
    this.#addHandlerHideMatchAndOverlay();
  }

  #addHandlerHideMatchAndOverlay() {
    this.#xIcon.addEventListener("click", () => {
      this.#parentElement.classList.add("hidden");
      this.#overlay.classList.add("hidden");
    });
  }

  #checkFirstMatch(homeGoals1, awayGoals1, homeGoals2, awayGoals2) {
    if (homeGoals1 === null || awayGoals1 === null) return "";
    return `
                <p class="fixture-first-game">
                  2. Game. Result of first game is ${homeGoals1}-${awayGoals1}. Aggregate score is ${
      +homeGoals1 + +homeGoals2
    }-${+awayGoals1 + +awayGoals2}.
                </p>`;
  }

  generateMatchTeams(match, homeGoals, awayGoals) {
    this.#matchTeams.innerHTML = "";
    this.#parentElement.classList.remove("hidden");
    this.#overlay.classList.remove("hidden");
    const html = `
                <p class="fixture-date">${this.getFixtureDate(
                  match
                )} ${this.getFixtureTime(match)}</p>
                <div class="fixture-home-team fixture-team">
                  <img
                    class="fixture-logo"
                    src="${match.teams.home.logo}"
                  />
                  <p class="fixture-home-team-name">${match.teams.home.name}</p>
                </div>
                <p class="fixture-result">${match.goals.home}-${
      match.goals.away
    }</p>
                <div class="fixture-away-team fixture-team">
                  <img
                    class="fixture-logo"
                    src="${match.teams.away.logo}"
                  />
                  <p class="fixture-away-team-name">${match.teams.away.name}</p>
                  </div>
                  ${this.#checkFirstMatch(
                    homeGoals,
                    awayGoals,
                    match.goals.home,
                    match.goals.away
                  )}
                  `;
    this.#matchTeams.insertAdjacentHTML("beforeend", html);
  }
}

export default new MatchView();
