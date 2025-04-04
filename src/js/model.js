import {
  DEFAULT_LEAGUE,
  DEFAULT_SEASON,
  REQUEST_OPTIONS,
  WHICH_TABLE,
} from "./config.js";

export const state = {
  league: {
    id: DEFAULT_LEAGUE,
    country: "",
    logo: "",
    name: "",
  },
  season: DEFAULT_SEASON,
  table: 0,
  where: 0,
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
  if (select.includes("team")) {
    direction
      ? state.teams[state.table].sort((a, b) =>
          a.team.name.localeCompare(b.team.name)
        )
      : state.teams[state.table].sort((a, b) =>
          b.team.name.localeCompare(a.team.name)
        );
  }
  if (select.includes(".")) {
    const selection = WHICH_TABLE[state.where] + select;
    const doubleSelect = selection.split(".");
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
  if (select.includes("goals")) {
    direction
      ? state.teams[state.table].sort((a, b) => {
          const aGoals = a[WHICH_TABLE[state.where]].goals;
          const bGoals = b[WHICH_TABLE[state.where]].goals;

          const aDiff = aGoals.for - aGoals.against;
          const bDiff = bGoals.for - bGoals.against;

          return bDiff - aDiff;
        })
      : state.teams[state.table].sort((a, b) => {
          const aGoals = a[WHICH_TABLE[state.where]].goals;
          const bGoals = b[WHICH_TABLE[state.where]].goals;

          const aDiff = aGoals.against - aGoals.for;
          const bDiff = bGoals.against - bGoals.for;

          return bDiff - aDiff;
        });
  }
};

export const changeWhere = function (where) {
  state.where = where;
};

export const sortWins = function () {
  state.teams[state.table].sort(
    (a, b) => b[WHICH_TABLE[state.where]].win - a[WHICH_TABLE[state.where]].win
  );
};
