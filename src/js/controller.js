import {
  DEFAULT_LEAGUE,
  DEFAULT_SEASON,
  FIRST_GAMEWEEK,
  HOME_TEAM,
  LAST_MATCHES_ADD,
} from "./config.js";
import * as model from "./model.js";
import ChangeLeagueView from "./views/ChangeLeagueView.js";
import FixturesView from "./views/FixturesView.js";
import HeaderView from "./views/HeaderView.js";
import LastMatchesView from "./views/LastMatchesView.js";
import LeaguePhaseView from "./views/LeaguePhaseView.js";
import LineupsView from "./views/LineupsView.js";
import LogoView from "./views/LogoView.js";
import MatchView from "./views/MatchView.js";
import SelectionView from "./views/SelectionView.js";
import StatisticsView from "./views/StatisticsView.js";
import TableSelectionView from "./views/TableSelectionView.js";
import TableView from "./views/TableView.js";
import TopScorersView from "./views/TopScorersView.js";

const controlShowLeague = async function (
  league = model.state.league.id,
  season = model.state.season
) {
  try {
    // await model.getLeagues();
    // await model.getLastMatches(33, 0);
    // await model.getFixture(1149523);
    // await model.getFixture(710556);
    // await model.getFixture(851371);
    // MatchView.showMatch();
    // MatchView.generateMatchDetails(model.state.match);
    // model.state.matchTab = "0";
    // MatchView.changeDetailsTab(model.state.matchTab);
    await model.getLeague(league, season);
    ChangeLeagueView.hideOverlayAndChangeLeague();
    model.changeWhere();
    TableSelectionView.changeSelectedTab();
    model.changeSeason(season);
    if (model.state.teams.length > 1)
      LeaguePhaseView.generateLeaguePhaseSelection(model.state.teams);
    else LeaguePhaseView.clearLeaguePhaseList();
    TableView.showTable(
      model.state.currentTable,
      model.state.where,
      model.state.teams.length
    );
    SelectionView.changeTab();
    LogoView.showLogo(model.state.league.logo, model.state.league.id);
    model.resetCurrentScorersAndFixtures();
    HeaderView.resetClicked();
  } catch (e) {
    ChangeLeagueView.renderError(e.message);
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
      model.state.where,
      model.state.teams.length
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
    TableSelectionView.changeWhere(
      model.state.currentTable,
      whichTable,
      model.state.teams.length
    );
    TableSelectionView.changeSelectedTab(whichTable);
    HeaderView.resetClicked();
  } catch (e) {
    console.log(e);
  }
};

const controlChangeTab = async function (id) {
  try {
    if (id === "1" && model.state.currentFixtures === 0) {
      await model.getRounds(model.state.league.id, model.state.season);
      model.state.gameweek = FIRST_GAMEWEEK;
      await model.getFixtures(
        model.state.league.id,
        model.state.season,
        model.state.rounds[model.state.gameweek]
      );
      FixturesView.generateArrows(
        model.state.gameweek,
        model.state.numberOfRounds
      );
      model.state.currentFixtures = 1;
    }
    if (id === "1") {
      FixturesView.generateSelectOptions(model.state.rounds);
      FixturesView.generateFixtures(model.state.fixtures);
    }
    if (id === "2" && model.state.currentTopScorers === 0) {
      await model.getTopScorers(model.state.league.id, model.state.season);
      model.state.currentTopScorers = 1;
    }
    if (id === "2") TopScorersView.generateTopScorers(model.state.topScorers);
    SelectionView.changeTab(id);
  } catch (e) {
    console.log(e);
  }
};

const controlChangeGameweekSelect = async function (gameweek) {
  try {
    model.changeGameweek(gameweek);
    await model.getFixtures(
      model.state.league.id,
      model.state.season,
      model.state.rounds[model.state.gameweek]
    );
    FixturesView.generateFixtures(model.state.fixtures);
    FixturesView.generateArrows(gameweek, model.state.numberOfRounds);
  } catch (e) {
    console.log(e);
  }
};

const controlChangeGameweekArrows = async function (gameweek) {
  try {
    model.changeGameweek(gameweek);
    await model.getFixtures(
      model.state.league.id,
      model.state.season,
      model.state.rounds[model.state.gameweek]
    );
    FixturesView.generateFixtures(model.state.fixtures);
    FixturesView.generateArrows(gameweek, model.state.numberOfRounds);
  } catch (e) {
    console.log(e);
  }
};

const controlChangePhase = function (phase) {
  try {
    model.changeTable(phase);
    model.changeWhere();
    TableView.showTable(
      model.state.currentTable,
      model.state.where,
      model.state.teams.length
    );
    const newPoints = TableSelectionView.changePoints(
      model.state.currentTable,
      model.state.where
    );
    model.updatePoints(newPoints);
    model.sortByPoints();
    TableView.showTable(
      model.state.currentTable,
      model.state.where,
      model.state.teams.length
    );
    LeaguePhaseView.changePhaseTab(phase);
    TableSelectionView.changeSelectedTab();
    HeaderView.resetClicked();
  } catch (e) {
    console.log(e);
  }
};

const controlShowMatch = async function (
  secondMatch,
  matchId,
  homeGoals = null,
  awayGoals = null
) {
  try {
    await model.getFixture(matchId);
    MatchView.showMatch();
    MatchView.generateMatchTeams(
      secondMatch,
      model.state.match,
      homeGoals,
      awayGoals
    );
    MatchView.generateMatchDetails(model.state.match);
    model.state.matchTab = "0";
    MatchView.changeDetailsTab(model.state.matchTab);
    MatchView.changeFixtureTab();
    model.state.lastMatchesShown = 0;
    LastMatchesView.clearLastMatches();
    model.state.matchesShown.home = 5;
    model.state.matchesShown.away = 5;
  } catch (e) {
    console.log(e);
  }
};

const controlChangeDetailsTab = function (id) {
  try {
    MatchView.changeDetailsTab(id);
    StatisticsView.showStatistics(model.state.match);
    LineupsView.showLineups(model.state.match);
    model.state.matchTab = id;
  } catch (e) {
    console.log(e);
  }
};

const controlChangeFixtureTab = async function (filter) {
  try {
    MatchView.changeFixtureTab(+filter);
    MatchView.changeDetailsTab();
    if (filter && !model.state.lastMatchesShown) {
      model.state.lastMatches.home = [];
      model.state.lastMatches.away = [];
      await model.getLastMatches(model.state.currentTeams.home.id, 0);
      await model.getLastMatches(model.state.currentTeams.away.id, 1);
      console.log(model.state.lastMatches.home);
      LastMatchesView.generateLastMatches(
        model.state.currentTeams.home,
        model.state.lastMatches.home,
        0
      );
      LastMatchesView.generateLastMatches(
        model.state.currentTeams.away,
        model.state.lastMatches.away,
        1
      );
      model.state.lastMatchesShown = 1;
    }
  } catch (e) {
    console.log(e);
  }
};

const controlShowMoreMatches = function (whichTeam) {
  try {
    const whTeam = whichTeam === HOME_TEAM ? 0 : 1;
    LastMatchesView.showMoreMatches(
      model.state.lastMatches[whichTeam],
      model.state.matchesShown[whichTeam],
      model.state.currentTeams[whichTeam],
      whTeam
    );
    model.state.matchesShown[whichTeam] += LAST_MATCHES_ADD;
    if (
      model.state.matchesShown[whichTeam] >=
      model.state.lastMatches[whichTeam].length
    )
      LastMatchesView.hideShowMoreBtn(whTeam);
  } catch (e) {
    console.log(e);
  }
};

const controlShowChangeLeague = function () {
  LogoView.showChangeLeague();
};

const controlChangeLeague = async function (value) {
  await model.getLeagues(value);
  ChangeLeagueView.showFoundLeagues(model.state.leaguesSearched);
};

const init = async function () {
  TableView.addHandlerPageLoaded(controlShowLeague);
  SelectionView.addHandlerChangeSeason(controlShowLeague);
  TableView.addHandlerShowDetail(controlShowDetail);
  TableView.addHandlerHideDetail(controlHideDetail);
  HeaderView.addHandlerSort(controlSort);
  TableSelectionView.addHandlerChangeTable(controlChangeWhere);
  SelectionView.addHandlerChangeTab(controlChangeTab);
  FixturesView.addHandlerChangeGameweekSelect(controlChangeGameweekSelect);
  FixturesView.addHandlerChangeGameweekArrows(controlChangeGameweekArrows);
  LeaguePhaseView.addHandlerChangePhase(controlChangePhase);
  FixturesView.addHandlerShowMatch(controlShowMatch);
  MatchView.addHandlerChangeDetailsTab(controlChangeDetailsTab);
  MatchView.addHandlerChangeFixtureTab(controlChangeFixtureTab);
  LastMatchesView.addHandlerShowMoreMatches(controlShowMoreMatches);
  LastMatchesView.addHandlerShowMatch(controlShowMatch);
  LogoView.addHandlerShowChangeLeague(controlShowChangeLeague);
  ChangeLeagueView.addHandlerSearchLeagues(controlChangeLeague);
  ChangeLeagueView.addHandlerChangeLeague(controlShowLeague);
};

init();
