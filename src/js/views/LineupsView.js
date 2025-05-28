import View from "./View";

export class LineupsView extends View {
  #formationsHeader = document.querySelector(".formations-header");
  #lineupsHome = document.querySelector(".formations-home");
  #lineupsAway = document.querySelector(".formations-away");

  #clear() {
    this.#formationsHeader.innerHTML = "";
    this.#lineupsHome.innerHTML = "";
    this.#lineupsAway.innerHTML = "";
  }

  #showHeader(match) {
    console.log(match);
    const html = `
                  <p class="formations-header-p">${match.lineups[0].formation}</p>
                  <p class="formations-header-text">Formations</p>
                  <p class="formations-header-p">${match.lineups[1].formation}</p>`;
    this.#formationsHeader.insertAdjacentHTML("beforeend", html);
  }

  #checkWhichTeam(whichTeam) {
    if (!whichTeam) return "home";
    return "away";
  }

  #returnSecondName(name) {
    const nameInParts = name.trim().split(" ");
    if (nameInParts.length < 2) return name;

    return nameInParts[1];
  }

  #addClassForGap(whichTeam, lines) {
    !whichTeam
      ? this.#lineupsHome.classList.add(`formations-column-${lines}`)
      : this.#lineupsAway.classList.add(`formations-column-${lines}`);
  }

  #showTeam(team, match, whichTeam) {
    const players = {};
    team.startXI.forEach((player) => {
      const gridPosition = player.player.grid[0];
      players[gridPosition]
        ? players[gridPosition].push(player)
        : (players[gridPosition] = [player]);
    });
    const playerPositions = Object.values(players);
    this.#addClassForGap(whichTeam, playerPositions.length);
    console.log(match, playerPositions);
    let html = ``;
    console.log(match.lineups[whichTeam].team.colors.player.border);
    console.log(match.lineups[whichTeam].team.colors.player.primary);
    playerPositions.forEach((playerArray, i) => {
      html += `
                        <div
                          class="formations-column-${this.#checkWhichTeam(
                            whichTeam
                          )} formations-column
                          data-grid="${i}"
                        >`;
      playerArray.forEach((player) => {
        html += `
                        <div class="formations-player">
                          <div class="jersey-wrapper">
                            
                            <svg
                              viewBox="0 -7.72 127.24603 127.24603"
                              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              xml:space="preserve"
                              enable-background="new 0 0 856 412"
                              y="0px"
                              x="0px"
                              xmlns:cc="http://creativecommons.org/ns#"
                              xmlns:dc="http://purl.org/dc/elements/1.1/"
                              fill="#${
                                i === 0
                                  ? match.lineups[whichTeam].team.colors
                                      .goalkeeper.border
                                  : match.lineups[whichTeam].team.colors.player
                                      .border
                              }"
                              class="jersey-${this.#checkWhichTeam(
                                whichTeam
                              )} jersey"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  fill="#${
                                    i === 0
                                      ? match.lineups[whichTeam].team.colors
                                          .goalkeeper.primary
                                      : match.lineups[whichTeam].team.colors
                                          .player.primary
                                  }"
                                  d="m32 109c-1.4 0-2.5-1.1-2.5-2.5v-62.6l-7 5.9c-.1.1-.2.1-.2.2-1 .6-2.1 1-3.2 1-2 0-3.8-1-4.9-2.6l-10.7-16.1c-1.8-2.7-1-6.3 1.7-8.1l29.7-20.7c.2-.1.4-.3.7-.3.1 0 2.8-.9 6.6-1h3.1c.7 0 1.4.3 1.8.8.5.5.7 1.2.6 1.9 0 .1 0 .3-.1.4.2 7.5 8.1 14.5 16.5 14.5s16.3-7 16.5-14.5c0-.1 0-.3-.1-.4-.1-.7.2-1.4.6-1.9s1.1-.8 1.8-.8h6.1c2.4 0 4.3 1.1 4.5 1.2.1 0 .1.1.2.1l28.7 20.7c2.6 1.7 3.4 5.4 1.6 8.1l-10.7 15.2c-1 1.6-2.9 2.6-4.9 2.6-1.2 0-2.3-.3-3.2-1-.1 0-.1-.1-0.2-.2l-6.4-5.3-.2 62.9c0 1.4-1.1 2.5-2.5 2.5h-63.9z"
                                ></path>
                                <path
                                  d="m89.1 5c1.8 0 3.1.9 3.1.9l28.7 20.6c1.6 1 2 3.1.9 4.7l-10.7 15.1c-0.6 1-1.7 1.5-2.8 1.5-.6 0-1.3-.2-1.9-.6l-10.5-8.6-.2 68.2h-63.7v-68l-11.2 9.4c-.6.4-1.2.6-1.9.6-1.1 0-2.2-.5-2.8-1.5l-10.6-16.1c-1-1.6-.6-3.6.9-4.7l29.7-20.7s2.4-.8 5.8-.9h3.1v.2.2c0 9 9.1 17.3 19 17.3s19-8.3 19-17.3v-.2-.2h5.9.2c-.1.1 0 .1 0 .1m0-5s-.1 0 0 0h-.2-5.9c-1.4 0-2.7.6-3.7 1.6-.9 1-1.4 2.4-1.3 3.8v.4c-.3 6.1-7.1 11.9-14 11.9s-13.7-5.8-14-11.9v-.4c.1-1.4-.3-2.8-1.3-3.8-.9-1-2.3-1.6-3.7-1.6h-3.1-.1c-4 .1-6.9 1-7.3 1.1-.5.2-.9.4-1.3.7l-29.5 20.6c-3.8 2.6-4.8 7.7-2.3 11.6l10.7 16.1c1.6 2.3 4.2 3.7 7 3.7 1.6 0 3.2-.5 4.6-1.4.2-.1.3-.2.5-.3l2.9-2.5v57.2c0 2.8 2.2 5 5 5h63.8c2.8 0 5-2.2 5-5l.1-57.7 2.3 1.9c.1.1.3.2.4.3 1.4.9 3 1.4 4.6 1.4 2.8 0 5.4-1.4 6.9-3.7l10.6-15 .1-.1c2.5-3.8 1.5-9-2.3-11.5l-28-20.9c-.1-.1-.2-.1-.3-.2-.3-.2-2.6-1.5-5.6-1.5z"
                                ></path>
                              </g>
                            </svg>
                            <p class="formations-player-number" style="color: #${
                              match.lineups[whichTeam].team.colors.player.number
                            }">${player.player.number}</p>
                          </div>
                          <p class="formations-player-name">${this.#returnSecondName(
                            player.player.name
                          )}</p>
                        </div>
        `;
      });
      html += `</div>`;
    });
    !whichTeam
      ? this.#lineupsHome.insertAdjacentHTML("beforeend", html)
      : this.#lineupsAway.insertAdjacentHTML("beforeend", html);
  }

  showLineups(match) {
    this.#clear();
    this.#showHeader(match);
    match.lineups.forEach((team, i) => this.#showTeam(team, match, i));
  }
}

export default new LineupsView();
