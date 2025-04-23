import View from "./View";

export class TopScorersView extends View {
  #parentElement = document.querySelector(".top-scorers-body");
}

export default new TopScorersView();
