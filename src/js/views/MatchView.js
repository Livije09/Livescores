import { AWAY_TEAM, HOME_TEAM } from "../config";
import { SVGS } from "../svgs";
import View from "./View";

export class MatchView extends View {
  #parentElement = document.querySelector(".fixture-container");
  #matchTeams = document.querySelector(".fixture-teams");
  #xIcon = document.querySelector(".x-icon");
  #overlay = document.querySelector(".overlay");
  #firstHalfContainer = document.querySelector(".first-half");
  #secondHalfContainer = document.querySelector(".second-half");
  #score = {
    home: 0,
    away: 0,
  };

  constructor() {
    super();
    this.#addHandlerHideMatchAndOverlay();
  }

  showMatch() {
    this.#parentElement.classList.remove("hidden");
    this.#overlay.classList.remove("hidden");
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

  #clearHalfs() {
    this.#firstHalfContainer.innerHTML = "";
    this.#secondHalfContainer.innerHTML = "";
  }

  #resetScore() {
    this.#score.home = 0;
    this.#score.away = 0;
  }

  #shortenTheName(name) {
    const nameInParts = name.trim().split(" ");
    if (nameInParts.length < 2) return name;

    const initials = nameInParts[0][0].toUpperCase();
    const lastName = nameInParts.slice(1).join(" ");
    return `${initials}. ${lastName}`;
  }

  #showMinute(event) {
    if (event.time.extra === null) return Math.abs(event.time.elapsed);
    return `${Math.abs(event.time.elapsed)}+${event.time.extra}`;
  }

  #showSVG(event) {
    if (!event.detail.toLowerCase().includes("Substitution"))
      return SVGS[event.detail.toLowerCase().replace(/\s+/g, "")];
    return SVGS[event.detail.toLowerCase().split(" ")[0]];
  }

  #generateEventHTML(match) {
    const halfs = {
      firstHalf: "",
      secondHalf: "",
    };
    match.events.forEach((event) => {
      if (event.type === "Goal")
        event.team.id === match.teams.home.id
          ? this.#score.home++
          : this.#score.away++;
      const html = `<div class="first-half-details details">
                <div class="detail ${
                  event.team.id === match.teams.home.id
                    ? "home-detail"
                    : "away-detail"
                }">
                  <p class="minute">${this.#showMinute(event)}'</p>
                  ${this.#showSVG(event)}
                  ${
                    event.type === "Goal"
                      ? `
                  <p class="current-score">${this.#score.home} - ${
                          this.#score.away
                        }</p>`
                      : ""
                  }
                  <p class="scorer player">${this.#shortenTheName(
                    event.player.name
                  )}</p>
                  ${
                    event.assist.id === null
                      ? `<p class="assist player">(${this.#shortenTheName(
                          event.assist.name
                        )})</p>`
                      : ""
                  }
                </div>
              </div>`;
      Math.abs(event.time.elapsed) <= 45
        ? (halfs.firstHalf += html)
        : (halfs.secondHalf += html);
    });
    return halfs;
  }

  generateMatchDetails(match) {
    this.#clearHalfs();
    this.#resetScore();
    const { firstHalf, secondHalf } = this.#generateEventHTML(match);
    const htmlFirstHalf = `<div class="first-half-header">
                    <p class="first-half-header-p">1. Half</p>
                    <p class="first-half-header-p">${match.score.halftime.home} - ${match.score.halftime.away}</p>
                  </div>
                  ${firstHalf}
    `;
    this.#firstHalfContainer.insertAdjacentHTML("beforeend", htmlFirstHalf);
    const htmlSecondHalf = `<div class="second-half-header">
                    <p class="second-half-header-p">2. Half</p>
                    <p class="second-half-header-p">${match.score.fulltime.home} - ${match.score.fulltime.away}</p>
                  </div>
                  ${secondHalf}
     `;
    this.#secondHalfContainer.insertAdjacentHTML("beforeend", htmlSecondHalf);
  }
}

export default new MatchView();
