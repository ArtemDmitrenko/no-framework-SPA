const URL = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7";

async function getPosts() {
  const response = await fetch(URL);
  if (response.ok) {
    return await response.json();
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

export { getPosts };
