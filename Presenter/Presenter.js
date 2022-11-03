import View from "../View/View.js";
import Model from "../Model/Model.js";
import { EVENTS } from "../EventObserver/events.js";

class Presenter {
  constructor(container, posts, urlParam) {
    this.model = new Model(posts, urlParam);
    this.view = new View(container);
    this.updateView();
    this._addObservers();
  }

  updateView = () => {
    this.view.updateView(this.model.posts, this.model.urlParam);
  };

  _addObservers() {
    this.view.addObserver(EVENTS.CHECK_POST, this._handleCheckPost);
    this.model.addObserver(EVENTS.UPDATE_POSTS, this.updateView);
  }

  _handleCheckPost = (data) => this.model.checkPost(data);
}

export default Presenter;
