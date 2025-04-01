import { DEFAULT_LEAGUE, DEFAULT_SEASON } from "./config.js";
import * as model from "./model.js";
import LogoView from "./views/LogoView.js";
import SelectionView from "./views/selectionView.js";
import TableView from "./views/TableView.js";

const controlShowLeague = async function (
  league = model.state.league.id,
  season = model.state.season
) {
  try {
    await model.getLeague(league, season);
    model.changeSeason(season);
    TableView.showTable(model.state.teams);
    LogoView.showLogo(model.state.league.logo, model.state.league.id);
  } catch (e) {
    console.error(e);
  }
};

const init = async function () {
  TableView.addHandlerPageLoaded(controlShowLeague);
  SelectionView.addHandlerChangeSeason(controlShowLeague);
};

// init();
