// Fetch Document Elements
const main1 = document.getElementById("fav-main");

// Retrieve the favList from localStorage or initialize it to an empty array
let storedList = localStorage.getItem("favList");
let favList = storedList ? JSON.parse(storedList) : [];

// API Keys
let publicKey = "0c9cef7f06e35dda7b9b2b06249f18b4";
let privateKey = "d68d5ade3258d9c2a8c5934c4590023f45b65d04";

// Generate Hash Key
let baseURL = "https://gateway.marvel.com/v1/public/characters";
let timeStamp = Date.now().toString();
let hash = generateHash(timeStamp, privateKey, publicKey);

// Construct the query parameters
let queryParams = constructQueryParams("");

// Function to generate the Query Parameters
function constructQueryParams(searchTerm) {
  if (searchTerm === "") {
    return new URLSearchParams({
      ts: timeStamp,
      apikey: publicKey,
      hash: hash,
    });
  } else {
    return new URLSearchParams({
      nameStartsWith: searchTerm,
      ts: timeStamp,
      apikey: publicKey,
      hash: hash,
    });
  }
}

const apiUrl = `${baseURL}?${queryParams}`;

// Function to generate the MD5 hash
function generateHash(timeStmp, privKey, pubKey) {
  const hashResult = CryptoJS.MD5(timeStmp + privKey + pubKey).toString();
  return hashResult;
}

// Populate the Favorite Superheroes list in the main
function populateFavorites() {
  main1.innerHTML = "";
  let mainHeading = document.createElement("h1");
  mainHeading.textContent = "My Favorite SuperHeroes";
  main1.appendChild(mainHeading);

  favList.forEach((superhero) => {
    // Create the SuperHero Card
    const card = document.createElement("div");
    card.classList.add("superhero-card");

    // Create a dynamic link to the superhero page with the superhero name as a query parameter
    const nameLink = document.createElement("a");
    nameLink.classList.add("superhero-link");
    nameLink.href = `superhero.html?name=${superhero.name}`;
    const name = document.createElement("h4");
    name.textContent = superhero.name;
    nameLink.appendChild(name);
    card.appendChild(nameLink);

    // Add description for the current superhero
    const description = document.createElement("div");
    const para = document.createElement("p");
    para.textContent = superhero.description;
    description.appendChild(para);

    if (para.textContent === "") {
      para.textContent =
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea vero necessitatibus beatae fugiat autem quaerat ad cum! Saepe, inventore necessitatibus cumque officiis possimus dolore nostrum, earum quasi provident laudantium aut?";
    }
    card.appendChild(description);

    // Adding a favorites button to the card
    let favBtn = document.createElement("button");
    let icon = document.createElement("i");
    icon.classList.add("fa", "fa-regular", "fa-heart", "fa-xl");
    favBtn.appendChild(icon);

    // Adding styles to the fav button
    favBtn.style.backgroundColor = "transparent";
    favBtn.style.borderColor = "transparent";
    favBtn.style.color = "white";
    favBtn.style.cursor = "pointer";
    favBtn.style.position = "absolute";
    favBtn.style.top = "10px";
    favBtn.style.right = "10px";

    let favClicked = false;

    // Add event listener to the button
    favBtn.addEventListener("click", function () {
      if (!favClicked) {
        favBtn.style.color = "#ee171f";
        favClicked = true;
        if (!favList.find((element) => element.name == superhero.name))
          favList.push(superhero);
      } else {
        favBtn.style.color = "white";
        favClicked = false;
        let index = favList.findIndex(
          (element) => element.name === superhero.name
        );
        if (index !== -1) {
          favList.splice(index, 1);
        }
      }
      localStorage.setItem("favList", JSON.stringify(favList));
      updateFavoritesList();
    });

    favBtn.addEventListener("mouseenter", function () {
      if (!favClicked) {
        favBtn.style.color = "#ee171f";
      }
    });

    favBtn.addEventListener("mouseleave", function () {
      if (!favClicked) {
        favBtn.style.color = "white";
      }
    });

    card.appendChild(favBtn);
    main1.appendChild(card);

    nameLink.style.textDecoration = "none";
    nameLink.style.color = "white";
    nameLink.style.transition = "all 0.5s ease";

    nameLink.addEventListener("mouseenter", function () {
      nameLink.style.color = "rgb(255, 0, 0)";
    });

    nameLink.addEventListener("mouseleave", function () {
      nameLink.style.color = "white";
    });

    card.style.width = "40%";
    card.style.height = "min-content";
    card.style.minHeight = "40%";
    card.style.position = "relative";
    card.style.margin = "10px";
    card.style.padding = "10px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.overflow = "hidden";
    card.style.borderRadius = "4px";
    card.style.backgroundColor = "#565869";
    card.style.color = "white";
  });

  updateFavoritesList();
}

// Function to update the favorites list in the aside
function updateFavoritesList() {
  const favListElement = document.getElementById("fav-list");
  favListElement.innerHTML = "";

  favList.forEach((favorite) => {
    const listItem = document.createElement("li");
    listItem.textContent = favorite.name;
    favListElement.appendChild(listItem);
  });
}

// Call the updateFavoritesList function initially to populate the list
updateFavoritesList();
populateFavorites();

// Search Results
let searchBtn = document.getElementById("search-button");
let searchModal = document.getElementById("search-modal");
let modalBody = document.getElementsByClassName("modal-body")[0];
var searchFieldValue;

function fetchSearchField(event) {
  event.preventDefault();
  searchFieldValue = document.getElementById("search-field").value;
  let searchQueryParams = constructQueryParams(searchFieldValue);
  let apiUrlForSearch = `${baseURL}?${searchQueryParams}`;

  if (searchFieldValue !== "") {
    fetchResults(apiUrlForSearch);
  } else {
    modalBody.innerHTML = "";
    let para = document.createElement("p");
    para.textContent =
      "Search field is empty, please type something and try again!";
    modalBody.appendChild(para);
  }
}

//------Search Results for the Mobile Crumb Menu----
function fetchSearchFieldCrumb(event) {
  event.preventDefault();
  searchFieldValue = document.getElementById("search-field-crumb").value;

  let searchQueryParams = constructQueryParams(searchFieldValue);
  let apiUrlForSearch = `${baseURL}?${searchQueryParams}`;

  if (searchFieldValue !== "") {
    fetchResults(apiUrlForSearch);
  } else {
    modalBody.innerHTML = "";
    let para = document.createElement("p");
    para.textContent =
      "Search field is empty, please type something and try again!";
    modalBody.appendChild(para);
  }
}


function fetchResults(apiUrlForSearch) {
  modalBody.innerHTML = "";
  fetch(`${apiUrlForSearch}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.data.results.length !== 0) {
        data.data.results.forEach((superhero) => {
          const card = document.createElement("div");
          card.classList.add("superhero-card");

          const nameLink = document.createElement("a");
          nameLink.classList.add("superhero-link");
          nameLink.href = `superhero.html?name=${superhero.name}`;
          const name = document.createElement("h4");
          name.textContent = superhero.name;
          nameLink.appendChild(name);
          card.appendChild(nameLink);

          const description = document.createElement("div");
          const para = document.createElement("p");
          para.textContent = superhero.description;
          description.appendChild(para);

          if (para.textContent === "") {
            para.textContent =
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea vero necessitatibus beatae fugiat autem quaerat ad cum! Saepe, inventore necessitatibus cumque officiis possimus dolore nostrum, earum quasi provident laudantium aut?";
          }
          card.appendChild(description);

          let favBtn = document.createElement("button");
          let icon = document.createElement("i");
          icon.classList.add("fa", "fa-regular", "fa-heart", "fa-xl");
          favBtn.appendChild(icon);

          favBtn.style.backgroundColor = "transparent";
          favBtn.style.borderColor = "transparent";
          favBtn.style.color = "white";
          favBtn.style.cursor = "pointer";
          favBtn.style.position = "absolute";
          favBtn.style.top = "10px";
          favBtn.style.right = "10px";
          favBtn.style.zIndex='0';

          let favClicked = false;

          favBtn.addEventListener("click", function () {
            if (!favClicked) {
              favBtn.style.color = "#ee171f";
              favClicked = true;
              if (!favList.find((element) => element.name == superhero.name))
                favList.push(superhero);
            } else {
              favBtn.style.color = "white";
              favClicked = false;
              let index = favList.findIndex(
                (element) => element.name === superhero.name
              );
              if (index !== -1) {
                favList.splice(index, 1);
              }
            }
            localStorage.setItem("favList", JSON.stringify(favList));
            updateFavoritesList();
          });

          favBtn.addEventListener("mouseenter", function () {
            if (!favClicked) {
              favBtn.style.color = "#ee171f";
            }
          });

          favBtn.addEventListener("mouseleave", function () {
            if (!favClicked) {
              favBtn.style.color = "white";
            }
          });

          card.appendChild(favBtn);
          modalBody.appendChild(card);

          card.style.width = "40%";
          card.style.height = "min-content";
          card.style.minHeight = "40%";
          card.style.position = "relative";
          card.style.margin = "10px";
          card.style.padding = "10px";
          card.style.display = "flex";
          card.style.flexDirection = "column";
          card.style.alignItems = "center";
          card.style.overflow = "hidden";
          card.style.borderRadius = "4px";
          card.style.backgroundColor = "#565869";
          card.style.color = "white";

          description.style.textAlign = "center";

          nameLink.style.textDecoration = "none";
          nameLink.style.color = "white";
          nameLink.style.transition = "all 0.5s ease";

          nameLink.addEventListener("mouseenter", function () {
            nameLink.style.color = "rgb(255, 0, 0)";
          });

          nameLink.addEventListener("mouseleave", function () {
            nameLink.style.color = "white";
          });
        });

        updateFavoritesList();
      } else {
        let paraContent = document.createElement("p");
        paraContent.textContent =
          "No Characters found with the given search term!";
        modalBody.appendChild(paraContent);
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
}

// Add Event listener for the search button
searchBtn.addEventListener('click', fetchSearchField);

// JavaScript code to make superhero links dynamic
const superheroLinks = document.querySelectorAll(".superhero-link");

superheroLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const superheroName = link.querySelector("h4").textContent;
    window.location.href = `superhero.html?name=${encodeURIComponent(superheroName)}`;
  });
});

// Function to watch for changes in localStorage and update the UI
function watchForChanges() {
  setInterval(() => {
    const storedList = localStorage.getItem("favList");
    const newFavList = document.getElementsByClassName("superhero-card");

    if (!arraysEqual(newFavList, favList)) {
      populateFavorites();
    }
  }, 500);
}

// Function to compare two arrays
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return true;
}

// Call the watchForChanges function when the page loads
window.addEventListener("load", () => {
  watchForChanges();
  populateFavorites();
});
