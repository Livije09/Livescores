import View from "./View";

export class TopScorersView extends View {
  #parentElement = document.querySelector(".top-scorers-body");

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  generateTopScorers(players) {
    this.#clear();
    players.forEach((player, i) => {
      const html = `
            <div class="top-scorers-row">
              <p class="top-scorers-rank top-scorers-p">${i + 1}.</p>
              <div class="top-scorers-club">
                <img
                  class="top-scorers-logo"
                  src="${player.player.photo}"
                />
                <p class="top-scorers-name top-scorers-p">${
                  player.player.name
                }</p>
              </div>
              <div class="top-scorers-club">
                <img
                  class="top-scorers-logo"
                  src="${player.statistics[0].team.logo}"
                />
                <p class="top-scorers-club top-scorers-p">${
                  player.statistics[0].team.name
                }</p>
              </div>
              <p class="top-scorers-goals top-scorers-p">${
                player.statistics[0].goals.total
              }</p>
              <p class="top-scorers-assists top-scorers-p">${
                player.statistics[0].goals.assists
              }</p>
            </div>`;
      this.#parentElement.insertAdjacentHTML("beforeend", html);
    });
  }
}

export default new TopScorersView();
