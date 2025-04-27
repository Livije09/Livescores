import { FIXTURE_DATE, FIXTURE_TIME, NORMALIZE_TIME } from "../config";
import View from "./View";

export class FixturesView extends View {
  #parentElement = document.querySelector(".matches-body");
  #header = document.querySelector(".matches-header");

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  generateFixtures(fixtures) {
    this.#clear();
    fixtures.forEach((fixture) => {
      const time =
        +fixture.fixture.date.slice(FIXTURE_TIME[0], FIXTURE_TIME[1]) +
        NORMALIZE_TIME +
        ":" +
        fixture.fixture.date.slice(FIXTURE_TIME[2], FIXTURE_TIME[3]);
      const html = `
            <div class="matches-row">
              <p class="matches-date matches-p">${fixture.fixture.date.slice(
                FIXTURE_DATE[0],
                FIXTURE_DATE[1]
              )}</p>
              <p class="matches-time matches-p">${time}</p>
              <div class="matches-clubs matches-p">
                <div class="home-team matches-team">
                  <img
                    class="matches-logo"
                    src="${fixture.teams.home.logo}"
                  />
                  <p class="matches-name">${fixture.teams.home.name}</p>
                </div>
                <div class="away-team matches-team matches-p">
                  <img
                    class="matches-logo"
                    src="${fixture.teams.away.logo}"
                  />
                  <p class="matches-name">${fixture.teams.away.name}</p>
                </div>
              </div>
              <div class="matches-result matches-p">
                <p class="home-team-goals result ${
                  fixture.teams.home.winner ? "winner" : ""
                }">${fixture.score.fulltime.home}</p>
                <p class="away-team-goals result ${
                  fixture.teams.away.winner ? "winner" : ""
                }">${fixture.score.fulltime.away}</p>
              </div>
            </div>`;
      this.#parentElement.insertAdjacentHTML("beforeend", html);
    });
  }

  addHandlerChangeGameweek(handler) {
    this.#header.addEventListener("click", function (e) {
      const btn = e.target.closest(".arrow");
      if (!btn) return;

      console.log(btn);
    });
  }
}

export default new FixturesView();
