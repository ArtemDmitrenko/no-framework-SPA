import { getPosts } from "./API/api.js";
import Presenter from "./Presenter/Presenter.js";

const root = document.querySelector(".root");
const posts = await getPosts();
const urlParam = new URLSearchParams(window.location.search);

new Presenter(root, posts, urlParam.get("search"));
