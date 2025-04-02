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
        console.log(state.teams);
      });
    })
    .catch((error) => console.log("error", error));
};

export const changeSeason = function (season = state.season) {
  state.season = season;
};
