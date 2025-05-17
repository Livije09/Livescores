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

  #checkPair(seenPairs, pairKey, fixture) {
    seenPairs[pairKey] = fixture;
    return "";
  }

  generateFixtures(fixtures) {
    this.#clear();
    const seenPairs = {};
    const round = fixtures[0].league.round;
    fixtures.forEach((fixture, i) => {
      const homeTeam = fixture.teams.home.name;
      const awayTeam = fixture.teams.away.name;
      const pairKey = [homeTeam, awayTeam].sort().join("-");
      const time = this.getFixtureTime(fixture);
      const html = `
            <div class="matches-row" data-matchid=${fixture.fixture.id}>
              <p class="matches-date matches-p">${this.getFixtureDate(
                fixture
              )}</p>
              <p class="matches-time matches-p">${time}</p>
              <div class="matches-clubs matches-p">
                <div class="home-team matches-team">
                  <img
                    class="matches-logo"
                    src="${fixture.teams.home.logo}"
                  />
                  <p class="matches-name ${this.checkWinner(
                    fixture.teams.home.winner
                  )}">${fixture.teams.home.name}</p>
                </div>
                <div class="away-team matches-team matches-p">
                  <img
                    class="matches-logo"
                    src="${fixture.teams.away.logo}"
                  />
                  <p class="matches-name ${this.checkWinner(
                    fixture.teams.away.winner
                  )}">${fixture.teams.away.name}</p>
                </div>
              </div>
              <div class="matches-result matches-p">
                <p class="home-team-goals result ${this.checkWinner(
                  fixture.teams.home.winner
                )}">${fixture.goals.home}</p>
                <p class="away-team-goals result ${this.checkWinner(
                  fixture.teams.away.winner
                )}">${fixture.goals.away}</p>
              </div>
              ${
                seenPairs[pairKey]
                  ? `
                <div class="matches-result matches-first-match matches-p">
                <p class="home-team-goals result">${seenPairs[pairKey].score.fulltime.away}</p>
                <p class="away-team-goals result">${seenPairs[pairKey].score.fulltime.home}</p>
              </div>`
                  : this.#checkPair(seenPairs, pairKey, fixture)
              }
              ${
                fixture.score.penalty.home !== null &&
                fixture.score.penalty.away !== null
                  ? `<div class="matches-result matches-penalty matches-p">
                  <p class="home-team-goals result ${this.checkWinner(
                    fixture.teams.home.winner
                  )}">(${fixture.score.penalty.home})</p>
                  <p class="away-team-goals result ${this.checkWinner(
                    fixture.teams.away.winner
                  )}">(${fixture.score.penalty.away})</p>
                </div>`
                  : ""
              }
            </div>`;
      this.#parentElement.insertAdjacentHTML("beforeend", html);
      if (round.includes("finals")) {
        if (i === fixtures.length / 2 - 1) {
          const html = `
          <div class="matches-row matches-row-blank">
          <p class="matches-p"></p>
          </div>
          `;
          this.#parentElement.insertAdjacentHTML("beforeend", html);
        }
      }
      if (
        round.includes("Qualifying Round") ||
        round.includes("Preliminary Round") ||
        round === "Relegation Round" ||
        round.includes("Round of 16")
      ) {
        if (i > 0 && (i - 1) % 2 === 0 && i !== fixtures.length - 1) {
          const html = `
          <div class="matches-row matches-row-blank">
          <p class="matches-p"></p>
          </div>
          `;
          this.#parentElement.insertAdjacentHTML("beforeend", html);
        }
      }
    });
  }

  generateSelectOptions(gameweeks) {
    this.#select.innerHTML = ``;
    gameweeks.forEach((gameweek, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.innerHTML = gameweek.includes("Regular Season")
        ? `Gameweek ${i + 1}`
        : `${gameweek}`;
      this.#select.appendChild(option);
    });
  }

  generateArrows(gameweek, lastGameweek) {
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

  addHandlerShowMatch(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".matches-row");
      if (!btn) return;

      const firstMatch = btn.querySelector(".matches-first-match");

      if (firstMatch) {
        const goals = firstMatch.querySelectorAll("p");
        const homeGoals = goals[0].innerHTML;
        const awayGoals = goals[1].innerHTML;
        handler(btn.dataset.matchid, homeGoals, awayGoals);
      } else {
        handler(btn.dataset.matchid);
      }
    });
  }
}

export default new FixturesView();
