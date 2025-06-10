import View from "./View";

export class StatisticsView extends View {
  #parentElement = document.querySelector(".statistics-div");

  showStatistics(match) {
    this.#parentElement.innerHTML = "";
    let html = "";
    const homeValues = [];
    const awayValues = [];
    if (!match.statistics[0]) return;
    match.statistics[0].statistics.forEach((stat, i) => {
      const homeValue = stat.value;
      const awayValue = match.statistics[1].statistics[i].value;
      let valueHome =
        typeof homeValue === "string" ? parseFloat(homeValue) : homeValue;
      if (valueHome === null) valueHome = 0;
      let valueAway =
        typeof awayValue === "string" ? parseFloat(awayValue) : awayValue;
      if (valueAway === null) valueAway = 0;
      homeValues.push(valueHome);
      awayValues.push(valueAway);

      html += `<div class="statistics-div">
                <p class="statistics-p">${
                  stat.type === "expected_goals"
                    ? "Expected goals(xG)"
                    : stat.type
                }</p>
                <div class="statistics-chart">
                  <p class="statistics-home">${valueHome}</p>
                  <div class="statistics-bar-container">
                    <div class="statistics-home-div statistics-home-${i}"></div>
                    <div class="statistics-away-div statistics-away-${i}"></div>
                  </div>
                  <p class="statistics-away">${valueAway}</p>
                </div>
              </div>`;
    });

    this.#parentElement.insertAdjacentHTML("beforeend", html);

    homeValues.forEach((home, i) => {
      const away = awayValues[i];
      const total = home + away;
      const homeWidth = (home / total) * 100;
      const awayWidth = (away / total) * 100;

      const homeDiv = document.querySelector(`.statistics-home-${i}`);
      const awayDiv = document.querySelector(`.statistics-away-${i}`);

      if (homeDiv) homeDiv.style.width = `${homeWidth}%`;
      if (awayDiv) awayDiv.style.width = `${awayWidth}%`;
    });
  }
}

export default new StatisticsView();
