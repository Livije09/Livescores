import {
  WHICH_TABLE,
  FIXTURE_TIME,
  NORMALIZE_TIME,
  FIXTURE_DATE,
} from "../config";

export default class View {
  generateRecentForm(team) {
    let html = "";
    const lastFive = team.form.split("");
    lastFive.forEach((match) => {
      html += `
                      <li class="club-last-five-item">
                        <p class="club-last-five-${match.toLowerCase()} club-last-five-p">${match}</p>
                      </li>`;
    });
    return html;
  }

  checkStatus(team) {
    if (!team.description) return;

    if (team.description.includes("Champions League"))
      return "club-position-blue";

    if (team.description.includes("Europa League"))
      return "club-position-brown";

    if (team.description.includes("Conference League"))
      return "club-position-yellow";

    if (team.description.includes("Relegation")) return "club-position-red";

    if (team.description.includes("Play-off")) return "club-position-brown";

    if (team.description.includes("Promotion")) return "club-position-blue";

    if (team.description.includes("Championship Round"))
      return "club-championship-blue";
  }

  giveDescription(team) {
    if (!team.description) return "";
    return `${team.description}`;
  }

  generateTableHTML(team, table) {
    return `
              <div class="table-row">
                <p class="club-position ${this.checkStatus(
                  team
                )} table-p" data-description="${this.giveDescription(team)}">${
      team.rank
    }.</p>
                <div class="club-team table-p">
                  <img
                    class="club-logo"
                    src="${team.team.logo}"
                  />
                  <p class="club-name table-p">${team.team.name}</p>
                </div>
                <p class="club-games-played table-p">${
                  team[WHICH_TABLE[table]].played
                }</p>
                <p class="club-games-wins table-p">${
                  team[WHICH_TABLE[table]].win
                }</p>
                <p class="club-games-draws table-p">${
                  team[WHICH_TABLE[table]].draw
                }</p>
                <p class="club-games-loses table-p">${
                  team[WHICH_TABLE[table]].lose
                }</p>
                <p class="club-games-goals table-p">${
                  team[WHICH_TABLE[table]].goals.for
                }:${team[WHICH_TABLE[table]].goals.against}</p>
                <p class="club-games-goal-difference table-p">${
                  team[WHICH_TABLE[table]].goals.for -
                  team[WHICH_TABLE[table]].goals.against
                }</p>
                <p class="club-points table-p">${team.points}</p>
                <ul class="club-last-five table-p">
                  ${this.generateRecentForm(team)}
                </ul>
              </div>`;
  }

  getFixtureTime(fixture) {
    const time =
      +fixture.fixture.date.slice(FIXTURE_TIME[0], FIXTURE_TIME[1]) +
      NORMALIZE_TIME +
      ":" +
      fixture.fixture.date.slice(FIXTURE_TIME[2], FIXTURE_TIME[3]);
    return time;
  }

  getFixtureDate(fixture) {
    const date = fixture.fixture.date.slice(FIXTURE_DATE[0], FIXTURE_DATE[1]);
    return date;
  }
}
