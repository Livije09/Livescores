import { DEFAULT_LEAGUE, DEFAULT_SEASON, REQUEST_OPTIONS } from "./config.js";

export const state = {
  league: {
    id: DEFAULT_LEAGUE,
    country: "",
    logo: "",
    name: "",
  },
  season: DEFAULT_SEASON,
  table: 0,
  teams: [],
};

export const getLeague = async function (league, season) {
  await fetch(
    `https://v3.football.api-sports.io/standings?league=${league}&season=${season}`,
    REQUEST_OPTIONS
  )
    .then((data) => data.json())
    .then((result) => {
      console.log(result.response);
      const { id, country, logo, name } = result.response[0].league;
      state.league = { id, country, logo, name };
      state.teams = [];
      result.response[0].league.standings.forEach((standing) => {
        const clubArray = [];
        standing.forEach((club) => {
          clubArray.push(club);
        });
        state.teams.push(clubArray);
      });
      console.log(state.teams[state.table], state.table);
    })
    .catch((error) => console.log("error", error));
};

export const changeSeason = function (season = state.season) {
  state.season = season;
};

export const sortTeams = function (direction, select) {
  if (select.includes(".")) {
    if (select.includes("team")) {
      direction
        ? state.teams[state.table].sort((a, b) =>
            b.team.name.localeCompare(a.team.name)
          )
        : state.teams[state.table].sort((a, b) =>
            a.team.name.localeCompare(b.team.name)
          );
    }

    if (select.includes("goals")) {
      direction
        ? state.teams[state.table].sort((a, b) => b.goalsDiff - a.goalsDiff)
        : state.teams[state.table].sort((a, b) => a.goalsDiff - b.goalsDiff);
    }

    const doubleSelect = select.split(".");
    direction
      ? state.teams[state.table].sort(
          (a, b) =>
            b[doubleSelect[0]][doubleSelect[1]] -
            a[doubleSelect[0]][doubleSelect[1]]
        )
      : state.teams[state.table].sort(
          (a, b) =>
            a[doubleSelect[0]][doubleSelect[1]] -
            b[doubleSelect[0]][doubleSelect[1]]
        );
  } else {
    if (select.includes("rank"))
      direction
        ? state.teams[state.table].sort((a, b) => a[select] - b[select])
        : state.teams[state.table].sort((a, b) => b[select] - a[select]);
    else
      direction
        ? state.teams[state.table].sort((a, b) => b[select] - a[select])
        : state.teams[state.table].sort((a, b) => a[select] - b[select]);
  }
};
