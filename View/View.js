import EventObserver from "../EventObserver/EventObserver.js";
import PostListView from "./PostListView/PostListView.js";
import SearchView from "./SearchView/SearchView.js";
import { EVENTS } from "../EventObserver/events.js";

class View extends EventObserver {
  constructor(container) {
    super();
    this._render(container);
    this._addObservers();
  }

  updateView(posts, urlParam) {
    this.postListView.updateView(posts);
    this.search.updateView(urlParam ?? "");
  }

  _render(container) {
    this.el = container;
    this._renderSearch(this.el);
    this._renderPostList(this.el);
  }

  _renderSearch(container) {
    this.searchEl = document.createElement("div");
    this.searchEl.classList.add("search");
    container.append(this.searchEl);
    this.search = new SearchView(this.searchEl);
  }

  _renderPostList(container) {
    this.postsEl = document.createElement("div");
    this.postsEl.classList.add("posts");
    container.append(this.postsEl);
    this.postListView = new PostListView(this.postsEl);
  }

  _addObservers() {
    this.postListView.addObserver(EVENTS.CHECK_POST, this._handleCheckPost);
  }

  _handleCheckPost = (data) => {
    this._broadcast(EVENTS.CHECK_POST, data);
  };
}

export default View;
