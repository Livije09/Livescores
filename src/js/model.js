import {
  DEFAULT_GAMEWEEK,
  DEFAULT_LEAGUE,
  DEFAULT_SEASON,
  LAST_GAMEWEEK,
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
  currentTable: [],
  topScorers: [],
  currentTopScorers: 0,
  fixtures: [],
  currentFixtures: 0,
  gameweek: DEFAULT_GAMEWEEK,
  numberOfRounds: 0,
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
      state.currentTable = state.teams[0];
      console.log(state.currentTable);
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
            a.team.name.localeCompare(b.team.name)
          )
        : state.teams[state.table].sort((a, b) =>
            b.team.name.localeCompare(a.team.name)
          );
    } else {
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
    }
  } else {
    if (select.includes("rank"))
      direction
        ? state.teams[state.table].sort((a, b) => a[select] - b[select])
        : state.teams[state.table].sort((a, b) => b[select] - a[select]);
    else if (select.includes("goals")) {
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
    } else
      direction
        ? state.teams[state.table].sort((a, b) => b[select] - a[select])
        : state.teams[state.table].sort((a, b) => a[select] - b[select]);
  }
};

export const changeWhere = function (where) {
  state.where = where;
};

export const sortByPoints = function () {
  state.currentTable.sort((a, b) => b.points - a.points);
  state.currentTable.forEach((team, i) => (team.rank = i + 1));
};

export const updatePoints = function (teams) {
  console.log(teams);
  state.currentTable.forEach((team, i) => (team.points = teams[i]));
};

export const getTopScorers = async function (league, season) {
  await fetch(
    `https://v3.football.api-sports.io/players/topscorers?season=${season}&league=${league}`,
    REQUEST_OPTIONS
  )
    .then((data) => data.json())
    .then((result) => {
      state.topScorers = [];
      result.response.forEach((player) => state.topScorers.push(player));
      console.log(state.topScorers);
    });
};

export const getFixtures = async function (league, season) {
  await fetch(
    `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}`,
    REQUEST_OPTIONS
  )
    .then((data) => data.json())
    .then((result) => {
      state.fixtures = [];
      result.response.forEach((fixture) => state.fixtures.push(fixture));
      console.log(state.fixtures);
    });
};

export const resetCurrentScorersAndFixtures = function () {
  state.currentFixtures = 0;
  state.currentTopScorers = 0;
};

export const getRounds = async function (league, season) {
  await fetch(
    `https://v3.football.api-sports.io/fixtures/rounds?season=${season}&league=${league}`,
    REQUEST_OPTIONS
  )
    .then((data) => data.json())
    .then((result) => {
      state.numberOfRounds = result.response.length;
    });
};
