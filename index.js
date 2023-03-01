import { dogs } from "./data.js";
import { Dog } from "./dog.js";

const footerEl = document.getElementById("footer");

let isWaiting = false;
let likedArray = [];

// this variable takes in the object information from the getNewDog function and 
// applies it to the dogBio variable so that the object properties and methods can
// be accessed using dot notation
let dogBio = getNewDog();

// this function grabs the .getDogHtml method from the Dog class and applies it
// to the container in between the hearder and the footer
function render() {
  document.getElementById("dog-container").innerHTML = dogBio.getDogHtml();
}

render();

// this function looks at the array of objects called 'dogs', takes the first object in the array,
// and passes that object's info into a new instance of the Dog class
function getNewDog() {
  const nextDogData = dogs.shift();
  return nextDogData ? new Dog(nextDogData) : renderLikedList();
}

// this event listener looks for clicks on the footer section which holds just 2 divs, the nope
// and the like 'buttons'. When the click is made, it determines whether or not it was the nope
// or the like icon that was clicked. If 'nope', then the hasBeenSwiped property is changed to true and the 'nope'
// image is revealed. If 'like' was clicked then the hasBeenSwiped and the hasBeenLiked properties are
// changed to true, that dog's info is pushed to the likedArray, and the 'like' image is revealed
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

    // The purpose of this if statement is to wait for a swipe event on a dog bio, and then fetch a new dog bio from the
    // dogs array in the data.js file and update the UI.
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

// this function checks to see if there are any objects in the likedArray. If not, then a title and gif is rendered.
// if there are objects, they are rendered as a list using the getLikedList function with the likedArray as a parameter
function renderLikedList() {
  if (likedArray.length === 0) {
    return document.getElementById("dog-container").innerHTML = `
            <h1>No Liked Profiles</h1>
            <img class="no-likes" src="images/Elmo.gif"/>
            `;
  } else {
    document.getElementById("dog-container").innerHTML = `
    <h1>Liked Profiles</h1>
  ${getLikedList(likedArray)}
  `;
  }
}

// this fucntion takes in any dog bios that have been pushed to the likedArray, maps over the bio, and returns the 
// info in a template literal that is used in the renderLikedList function to display the bio info
function getLikedList(likedArray) {
  return likedArray.map((dog) => {
      return `
        <div class='liked-list'>
            <div class='liked-profile'>
                <div class="liked-image-container">
                    <img src="${dog.avatar}" class="liked-dog-image"/>
                </div>
                <div class='liked-text'>
                    <p class='liked-name-age'>${dog.name}, ${dog.age}</p>
                    <p class='liked-bio'>${dog.bio}</p>
                </div>
            </div>
        </div>`;
    }).join("");
}
