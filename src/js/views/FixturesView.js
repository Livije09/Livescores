import {
  AWAY_TEAM,
  FIRST_GAMEWEEK,
  FIXTURE_DATE,
  FIXTURE_TIME,
  HOME_TEAM,
  LAST_GAMEWEEK,
  NORMALIZE_TIME,
} from "../config";
import View from "./View";

export class FixturesView extends View {
  #parentElement = document.querySelector(".matches-body");
  #header = document.querySelector(".matches-header");
  #select = document.querySelector(".select-gameweek");
  #leftArrow = document.querySelector(".arrow-left");
  #rightArrow = document.querySelector(".arrow-right");

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #checkWinner(fixture, where) {
    const winner = fixture.teams[where]?.winner ? "winner" : "";
    return winner;
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
                  <p class="matches-name ${this.#checkWinner(
                    fixture,
                    HOME_TEAM
                  )}">${fixture.teams.home.name}</p>
                </div>
                <div class="away-team matches-team matches-p">
                  <img
                    class="matches-logo"
                    src="${fixture.teams.away.logo}"
                  />
                  <p class="matches-name ${this.#checkWinner(
                    fixture,
                    AWAY_TEAM
                  )}">${fixture.teams.away.name}</p>
                </div>
              </div>
              <div class="matches-result matches-p">
                <p class="home-team-goals result ${this.#checkWinner(
                  fixture,
                  HOME_TEAM
                )}">${fixture.score.fulltime.home}</p>
                <p class="away-team-goals result ${this.#checkWinner(
                  fixture,
                  AWAY_TEAM
                )}">${fixture.score.fulltime.away}</p>
              </div>
            </div>`;
      this.#parentElement.insertAdjacentHTML("beforeend", html);
    });
  }

  generateSelectOptions(gameweeks) {
    // this.#select.innerHTML = ``;
    // gameweeks.forEach((gameweek, i) => {
    //   const option = document.createElement("option");
    //   option.value = i;
    //   option.innerHTML = gameweek.includes("Regular Season")
    //     ? `Gameweek ${i + 1}`
    //     : `${gameweek}`;
    //   this.#select.appendChild(option);
    // });
    const regularSeason = gameweeks.filter((gameweek) =>
      gameweek.includes("Regular Season")
    );
    const otherFixtures = gameweeks.filter(
      (gameweek) => !gameweek.includes("Regular Season")
    );
    otherFixtures.sort((a, b) => b.localeCompare(a));
    let counter = 0;
    regularSeason.forEach((_) => {
      const option = document.createElement("option");
      option.value = counter;
      option.innerHTML = `Gameweek ${counter + 1}`;
      this.#select.appendChild(option);
      counter++;
    });
    otherFixtures.forEach((gameweek) => {
      const option = document.createElement("option");
      option.value = counter;
      option.innerHTML = `${gameweek}`;
      this.#select.appendChild(option);
      counter++;
    });
  }

  generateArrows(gameweek, lastGameweek) {
    console.log(gameweek);
    this.#leftArrow.classList.remove("hideArrow");
    this.#rightArrow.classList.remove("hideArrow");
    if (+gameweek === FIRST_GAMEWEEK)
      this.#leftArrow.classList.add("hideArrow");
    if (+gameweek === lastGameweek - 1)
      this.#rightArrow.classList.add("hideArrow");
  }

  addHandlerChangeGameweekSelect(handler) {
    this.#header.addEventListener("change", function (e) {
      handler(e.target.value);
    });
  }

  addHandlerChangeGameweekArrows(handler) {
    const self = this;
    this.#header.addEventListener("click", function (e) {
      const btn = e.target.closest(".arrow");
      if (!btn) return;

      let id;
      if (btn.classList.contains("arrow-left")) id = +self.#select.value - 1;
      if (btn.classList.contains("arrow-right")) id = +self.#select.value + 1;
      self.#select.value = id;

      handler(id);
    });
  }
}

export default new FixturesView();
