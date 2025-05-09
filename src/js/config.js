const MY_HEADERS = new Headers();
MY_HEADERS.append("x-rapidapi-key", "5bc600e303e4149e5da729bb173dab21");
MY_HEADERS.append("x-rapidapi-host", "v3.football.api-sports.io");

export const REQUEST_OPTIONS = {
  method: "GET",
  headers: MY_HEADERS,
  redirect: "follow",
};

export const DEFAULT_SEASON = 2021;
export const DEFAULT_LEAGUE = 144;
export const DEFAULT_GAMEWEEK = 1;
export const SHIFT_TOP = 22;
export const WHICH_TABLE = ["all", "home", "away"];
export const POINTS_FOR_WIN = 3;
export const POINTS_FOR_DRAW = 1;
export const FIXTURE_DATE = [0, 10];
export const FIXTURE_TIME = [11, 13, 14, 16];
export const NORMALIZE_TIME = 2;
export const FIRST_GAMEWEEK = 0;
export const HOME_TEAM = "home";
export const AWAY_TEAM = "away";
