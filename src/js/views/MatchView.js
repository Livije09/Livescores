import View from "./View";

export class MatchView extends View {
  #parentElement = document.querySelector(".fixture-container");
  #matchTeams = document.querySelector(".fixture-teams");
  #xIcon = document.querySelector(".x-icon");

  constructor() {
    super();
    this.#addHandlerHideMatch();
  }

  #addHandlerHideMatch() {
    this.#xIcon.addEventListener("click", () =>
      this.#parentElement.classList.add("hidden")
    );
  }

  generateMatchTeams(match) {
    this.#matchTeams.innerHTML = "";
    this.#parentElement.classList.remove("hidden");
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
                  <p class="fixture-away-team-name">${
                    match.teams.away.name
                  }</p> 
                  `;
    this.#matchTeams.insertAdjacentHTML("beforeend", html);
  }
}

export default new MatchView();
