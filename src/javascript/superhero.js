// API Keys
let publicKey = "0c9cef7f06e35dda7b9b2b06249f18b4";
let privateKey = "d68d5ade3258d9c2a8c5934c4590023f45b65d04";

// Generate Hash Key
let baseURL = "https://gateway.marvel.com/v1/public/characters";
let timeStamp = Date.now().toString();
let hash = generateHash(timeStamp, privateKey, publicKey);

// Retrieve the favList from localStorage or initialize it to an empty array
let storedList = localStorage.getItem("favList");
let favList = storedList ? JSON.parse(storedList) : [];

// Get the superhero name from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const superheroName = urlParams.get("name");

let apiUrl = getApi(superheroName);

if (superheroName) {
  // Set the superhero heading
  const superheroHeading = document.getElementById("superhero-heading");
  superheroHeading.textContent = superheroName;

  // Fetch and display superhero details
  const mainContainer = document.getElementById("main-container");
  const superheroDetails = document.getElementById("superhero-details");
  const description = document.getElementById("description");
  const comicsElement = document.getElementById("comics");
  const storiesElement = document.getElementById("stories");
  const seriesElement = document.getElementById("series");
  const eventsElement = document.getElementById("events");
  const superheroImage = document.getElementById("superheroImage");

  fetch(`${apiUrl}`)
    .then((response) => response.json())
    .then((data) => {
      let hero = data.data.results[0];
      // Display superhero details

       //Add SuperHero Image
       const img1 = hero.thumbnail.path + "/landscape_incredible" +".jpg";
       console.log(hero.thumbnail.path);
       console.log("Img:"+img1);
       if(img1 !== ''){
         superheroImage.children[0].src=img1;
       }
       else
       superheroImage.children[0].src="src/images/default_image_superhero.png";
      //  console.log("Src: "+superheroImage.src);

      // Add Superhero Description
      description.textContent = hero.description;
      if (description.textContent === "") {
        description.textContent =
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea vero necessitatibus beatae fugiat autem quaerat ad cum! Saepe, inventore necessitatibus cumque officiis possimus dolore nostrum, earum quasi provident laudantium aut?";
      }

      // Add Superhero Comics
      hero.comics.items.forEach((comic) => {
        const listItem = document.createElement("li");
        listItem.textContent = comic.name;
        comicsElement.children[1].appendChild(listItem);
      });

      // Add SuperHero Series
      hero.stories.items.forEach((story) => {
        const listItem = document.createElement("li");
        listItem.textContent = story.name;
        seriesElement.children[1].appendChild(listItem);
      });

      // Add SuperHero Stories
      hero.series.items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name;
        storiesElement.children[1].appendChild(listItem);
      });

      // Add SuperHero Events
      hero.events.items.forEach((ele) => {
        const listItem = document.createElement("li");
        listItem.textContent = ele.name;
        eventsElement.children[1].appendChild(listItem);

       

        
        // const imageTag = document.createElement('img');
        // imageTag.src=img;
        updateFavoritesList();
      });
      // Create Favorite Button
      createFavButton(mainContainer, hero);
    })
    .catch((error) => {
      console.error("Error fetching superhero data: " + error);
      superheroDetails.innerHTML = "Failed to load superhero details.";
    });
}

// Search Results
let searchBtn = document.getElementById("search-button");
let searchModal = document.getElementById("search-modal");
let modalBody = document.getElementsByClassName("modal-body")[0];
var searchFieldValue;

function fetchSearchField(event) {
  event.preventDefault();
  searchFieldValue = document.getElementById("search-field").value;

  let searchQueryParams = constructQueryParams(searchFieldValue);
  let apiUrlForSearch = getApi(searchFieldValue);

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

// Fetch search term specific characters from the API and display on Modal
function fetchResults(apiUrlForSearch) {
  modalBody.innerHTML = "";
  fetch(`${apiUrlForSearch}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.data.results.length !== 0) {
        data.data.results.forEach((superhero) => {
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
        console.log(modalBody);
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

function getApi(searchterm) {
  let queryParams = constructQueryParams();

  function constructQueryParams() {
    return new URLSearchParams({
      nameStartsWith: searchterm,
      ts: timeStamp,
      apikey: publicKey,
      hash: hash,
    });
  }

  return `${baseURL}?${queryParams}`;
}

function createFavButton(mainContainer, superhero) {
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

  mainContainer.appendChild(favBtn);
  updateFavoritesList();
}

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

// Generate MD5 hash
function generateHash(timeStmp, privKey, pubKey) {
  const hashResult = CryptoJS.MD5(timeStmp + privKey + pubKey).toString();
  return hashResult;
}
