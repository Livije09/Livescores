import { AWAY_TEAM, HOME_TEAM } from "../config";
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

  #checkIfPenalties(homePenalties, awayPenalties) {
    if (homePenalties === null || awayPenalties === null) return "";
    return `
            After penalties: ${homePenalties}-${awayPenalties}`;
  }

  #checkFirstMatch(
    homeGoals1,
    awayGoals1,
    homeGoals2,
    awayGoals2,
    homePenalties,
    awayPenalties
  ) {
    if (homeGoals1 === null || awayGoals1 === null) return "";
    return `
                <p class="fixture-first-game">
                  2. Game. Result of first game is ${homeGoals1}-${awayGoals1}. Aggregate score is ${
      +homeGoals1 + +homeGoals2
    }-${+awayGoals1 + +awayGoals2}. ${this.#checkIfPenalties(
      homePenalties,
      awayPenalties
    )}
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
                  <div class="fixture-team-div">
                    <p class="fixture-home-team-name ${this.checkWinner(
                      match.teams.home.winner
                    )}">${match.teams.home.name}</p>
                    <div class="icon-wrapper">
                      ${this.checkGoingThrough(
                        homeGoals,
                        awayGoals,
                        +match.goals.home,
                        +match.goals.away,
                        +match.score.penalty.home,
                        +match.score.penalty.away,
                        HOME_TEAM
                      )}
                    </div>
                  </div>
                </div>
                <p class="fixture-result">${match.goals.home}-${
      match.goals.away
    }</p>
                <div class="fixture-away-team fixture-team">
                  <img
                    class="fixture-logo"
                    src="${match.teams.away.logo}"
                  />
                  <div class="fixture-team-div">
                    <p class="fixture-away-team-name ${this.checkWinner(
                      match.teams.away.winner
                    )}">${match.teams.away.name}</p>
                    <div class="icon-wrapper">
                      ${this.checkGoingThrough(
                        homeGoals,
                        awayGoals,
                        +match.goals.home,
                        +match.goals.away,
                        +match.score.penalty.home,
                        +match.score.penalty.away,
                        AWAY_TEAM
                      )}
                    </div>
                  </div>
                  </div>
                  ${this.#checkFirstMatch(
                    homeGoals,
                    awayGoals,
                    match.goals.home,
                    match.goals.away,
                    match.score.penalty.home,
                    match.score.penalty.away
                  )}
                  `;
    this.#matchTeams.insertAdjacentHTML("beforeend", html);
  }
}

export default new MatchView();
