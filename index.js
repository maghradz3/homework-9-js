// `https://jsonplaceholder.typicode.com/users/${userId}` იუზერების აიდი

//https://jsonplaceholder.typicode.com/posts პოსტების აიდი
const search = document.querySelector("#search");
const post = document.querySelector(".post");
const posts = document.querySelector(".posts");

const info = function (data) {
  const html = `
      <div class="post">
     <h1 class="h-1">title</h1>
      <p class="h1--p">${data.title}</p>
      <h2 class="h-2">description</h2>
      <p class="h2--p">${data.body}</p>
      <h2 class="h-3">Author name</h2>
      <p class="h3--p">${data.userId}</p>
      </div>
      `;
  posts.insertAdjacentHTML("beforeend", html);
};

const renderError = function (msg) {
  posts.insertAdjacentText("beforeend", msg);
};

const postDatas = async function () {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    if (!res.ok) throw new Error(`Problem  is getting from post data`);
    // console.log(res);
    const json = await res.json();
    // console.log(json);
    let userId;
    const itter = json.map((el) => {
      const userId = el.userId;

      info(el);
    });
    const newFetch = await fetch(
      `https://jsonplaceholder.typicode.com/users/1`
    );
    const userJson = newFetch.json();
    const userName = console.log(userJson);
    //ვერ გავეკეთეეე
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong ${err}`);
  }
};

postDatas();
//დავამატო ივენთის მომსმენი ინფუთისთვის
search.addEventListener("keyup", filterPosts);

//calback function = filterPosts\
function filterPosts() {
  let filterValue = search.value;
  console.log(filterValue);
  let item = posts.querySelectorAll(".post");
  for (i = 0; i < item.length; i++) {
    let text = item[i].querySelector(".h1--p");
    if (text.innerHTML.indexOf(filterValue) > -1) {
      item[i].style.display = "";
    } else {
      item[i].style.display = "none";
    }
  }
}
