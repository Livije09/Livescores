import View from "./View";

export class LeaguePhaseView extends View {
  #parentElement = document.querySelector(".league-phase-selection");
  #leaguePhaseList = document.querySelector(".league-phase-list");

  generateLeaguePhaseSelection(phases) {
    this.#leaguePhaseList.innerHTML = "";
    phases.forEach((phase, i) => {
      const html = `
            <li class="league-phase-item">
                <button
                  class="league-phase-btn ${
                    i === 0 ? "league-phase-btn-active" : ""
                  }"
                  data-phase="${i}"
                >
                  ${phase[0].group}
                </button>
            </li>`;
      this.#leaguePhaseList.insertAdjacentHTML("beforeend", html);
    });
  }

  addHandlerChangePhase(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".league-phase-btn");
      if (!btn) return;

      const id = +btn.dataset.phase;
      handler(id);
    });
  }

  changePhaseTab(phase) {
    const leaguePhaseBtns = document.querySelectorAll(".league-phase-btn");
    leaguePhaseBtns.forEach((btn) => {
      btn.classList.remove("league-phase-btn-active");
      if (+btn.dataset.phase === phase)
        btn.classList.add("league-phase-btn-active");
    });
  }
}

export default new LeaguePhaseView();
