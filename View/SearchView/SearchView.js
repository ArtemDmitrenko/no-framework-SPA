import EventObserver from "../../EventObserver/EventObserver.js";

class SearchView extends EventObserver {
  constructor(container) {
    super();
    this._render(container);
    this._addEventListeners();
  }

  updateView(urlParam) {
    this.inputValue = urlParam;
    this._render(this.el);
  }

  _render(container) {
    this.el = container;
    const searchHtml = `
      <div class="search">
        <form class="search__input-block">
          <input class="search__input" name="search" type="text" value="${this.inputValue}"/>
          <button class="search__button"  type="submit">Найти</button>
        </form>
      </div>
    `;
    this.el.innerHTML = searchHtml;
    this.inputEl = this.el.querySelector(".search__input");
    this.formEl = this.el.querySelector(".search__input-block");
    this.submitButtonEl = this.el.querySelector(".search__button");
  }

  _addEventListeners() {
    this.formEl.addEventListener("submit", this._handleSubmitButtonClick);
    this.inputEl.addEventListener("input", this._handleInputChange);
  }

  _deleteEventListeners() {
    this.formEl.removeEventListener("submit", this._handleSubmitButtonClick);
    this.inputEl.removeEventListener("input", this._handleInputChange);
  }

  _handleInputChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    this.inputValue = e.target.value;
    this._deleteEventListeners();
    this._render(this.el);
    this._addEventListeners();
    this.inputEl.focus();
    this.inputEl.setSelectionRange(
      this.inputValue.length,
      this.inputValue.length
    );
  };

  _handleSubmitButtonClick = (e) => {
    e.preventDefault();
    this._addSearchParam(this.inputValue);
  };

  _addSearchParam(searchParam) {
    console.log(searchParam);
    const newURL = new URL(window.location.href);
    newURL.searchParams.set("search", searchParam);
    if (history.pushState) {
      history.pushState(null, null, newURL);
    } else {
      console.warn("History API не поддерживается");
    }
  }
}

export default SearchView;
