import EventObserver from "../../EventObserver/EventObserver.js";
import { EVENTS } from "../../EventObserver/events.js";

class PostListView extends EventObserver {
  constructor(container) {
    super();
    this._render(container);
  }

  updateView(posts) {
    this._createPostList(posts);
    this._addEventListeners();
  }

  _render(container) {
    this.el = container;
    this.posts = document.createElement("ul");
    this.posts.classList.add("post-list");
    this.el.append(this.posts);
  }

  _addEventListeners() {
    const checkboxEl = this.posts.querySelectorAll(".post__checkbox");
    checkboxEl.forEach((el) =>
      el.addEventListener("click", this._handleCheckboxClick)
    );
  }

  _handleCheckboxClick = (e) => {
    const id = Number(e.target.dataset.id);
    const options = {
      isChecked: e.target.checked,
      id,
    };
    this._broadcast(EVENTS.CHECK_POST, options);
  };

  _createPostList(posts) {
    if (posts.length > 0) {
      const cards = posts.map((post) => {
        const { title, body, id, isChecked = false } = post;
        return `
          <li class="post ${isChecked ? "post_checked" : ""}">
            <div class="post__content">
              <h2 class="post__title">${title}</h2>
              <p class="post__description">${body}</p>
              <input type="checkbox" ${
                isChecked ? "checked" : ""
              } data-id="${id}" class="post__checkbox"/>
            </div>
          </li>
        `;
      });
      this.posts.innerHTML = cards.join("");
    } else {
      this.posts.innerHTML = `<p class="no-data">No data. Try to change search parameter...</p>`;
    }
  }
}

export default PostListView;
