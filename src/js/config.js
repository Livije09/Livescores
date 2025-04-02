const MY_HEADERS = new Headers();
MY_HEADERS.append("x-rapidapi-key", "727b33a61481bce96db1c78dea5965d4");
MY_HEADERS.append("x-rapidapi-host", "v3.football.api-sports.io");

export const REQUEST_OPTIONS = {
  method: "GET",
  headers: MY_HEADERS,
  redirect: "follow",
};

export const DEFAULT_SEASON = 2021;
export const DEFAULT_LEAGUE = 39;
export const SHIFT_TOP = 22;
