import { dogs } from "./data.js";
import { Dog } from "./dog.js";

const footerEl = document.getElementById("footer");

let isWaiting = false;
let likedArray = [];
let dogBio = getNewDog();

function render() {
  document.getElementById("dog-container").innerHTML = dogBio.getDogHtml();
}

render();

function getNewDog() {
  const nextDogData = dogs.shift();
  return nextDogData ? new Dog(nextDogData) : renderLikedList();
}

footerEl.addEventListener("click", (e) => {
  if (!isWaiting) {
    if (e.target.id.includes("nope-icon")) {
      dogBio.hasBeenSwiped = true;
      document.getElementById("nope-image").classList.remove("none");
    } else if (e.target.id.includes("like-icon")) {
      dogBio.hasBeenSwiped = true;
      dogBio.hasBeenLiked = true;
      likedArray.push(dogBio);
      document.getElementById("like-image").classList.remove("none");
    }

    if (dogBio.hasBeenSwiped === true) {
      isWaiting = true;
      if (getNewDog) {
        setTimeout(() => {
          dogBio = getNewDog();
          render();
          isWaiting = false;
        }, 1500);
      }
    }
  }
});

function renderLikedList() {
  document.getElementById("dog-container").innerHTML = getLikedList(likedArray);
  console.log(likedArray);
}

function getLikedList(likedArray) {
    console.log(likedArray[0]);
      return likedArray.map(dog => {
         return `
            <h1>Liked Profiles</h1>
            <div class='liked-list'>
                <div class='liked-profile'>
                    <img src="${dog.avatar}" class="liked-dog-image"/>
                    <div class='liked-text'>
                        <p class='liked-name-age'>${dog.name}, ${dog.age}</p>
                        <p class='liked-bio'>${dog.bio}</p>
                    </div>
                </div>
            </div>
            `;
      })
  }
