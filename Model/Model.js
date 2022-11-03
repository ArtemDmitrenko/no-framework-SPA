import EventObserver from "../EventObserver/EventObserver.js";
import { EVENTS } from "../EventObserver/events.js";

class Model extends EventObserver {
  constructor(posts, urlParam) {
    super();
    this.urlParam = urlParam;
    this.posts = urlParam ? this._getFilteredPosts(posts, urlParam) : posts;
  }

  _getFilteredPosts(posts, urlParam) {
    return posts.filter((post) => post.title.includes(urlParam));
  }

  checkPost = (data) => {
    const { id, isChecked } = data;
    this.posts = this.posts.map((post) => {
      if (post.id === id) {
        post.isChecked = isChecked;
      }
      return post;
    });
    this._broadcast(EVENTS.UPDATE_POSTS);
  };
}

export default Model;
