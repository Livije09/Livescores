import { DEFAULT_LEAGUE, DEFAULT_SEASON } from "./config.js";
import * as model from "./model.js";
import HeaderView from "./views/HeaderView.js";
import LogoView from "./views/LogoView.js";
import SelectionView from "./views/SelectionView.js";
import TableSelectionView from "./views/TableSelectionView.js";
import TableView from "./views/TableView.js";
import TopScorersView from "./views/TopScorersView.js";

const controlShowLeague = async function (
  league = model.state.league.id,
  season = model.state.season
) {
  try {
    await model.getLeague(league, season);
    // await model.getFixtures(league, season);
    model.changeSeason(season);
    TableView.showTable(model.state.currentTable, model.state.where);
    SelectionView.changeTab();
    LogoView.showLogo(model.state.league.logo, model.state.league.id);
  } catch (e) {
    console.error(e);
  }
};

const controlShowDetail = function (team) {
  try {
    TableView.showDetails(team);
  } catch (e) {
    console.log(e);
  }
};

const controlHideDetail = function () {
  try {
    TableView.hideDetails();
  } catch (e) {
    console.log(e);
  }
};

const controlSort = function (flag, select) {
  try {
    model.sortTeams(flag, select);
    TableView.showTable(
      model.state.teams[model.state.table],
      model.state.where
    );
  } catch (e) {
    console.log(e);
  }
};

const controlChangeWhere = function (whichTable = model.state.where) {
  try {
    model.changeWhere(whichTable);
    const newPoints = TableSelectionView.changePoints(
      model.state.teams[model.state.table],
      model.state.where
    );
    model.updatePoints(newPoints);
    model.sortByPoints();
    TableSelectionView.changeWhere(model.state.currentTable, whichTable);
    TableSelectionView.changeSelectedTab(whichTable);
  } catch (e) {
    console.log(e);
  }
};

const controlChangeTab = async function (id) {
  if (
    model.state.season !== model.state.currentSeason ||
    model.state.league.id !== model.state.currentLeagueId
  )
    await model.getTopScorers(model.state.league.id, model.state.season);
  model.changeCurrentSeasonAndLeague(model.state.season, model.state.league.id);
  TopScorersView.generateTopScorers(model.state.topScorers);
  SelectionView.changeTab(id);
};

const init = async function () {
  TableView.addHandlerPageLoaded(controlShowLeague);
  SelectionView.addHandlerChangeSeason(controlShowLeague);
  TableView.addHandlerShowDetail(controlShowDetail);
  TableView.addHandlerHideDetail(controlHideDetail);
  HeaderView.addHandlerSort(controlSort);
  TableSelectionView.addHandlerChangeTable(controlChangeWhere);
  SelectionView.addHandlerChangeTab(controlChangeTab);
};

// init();
