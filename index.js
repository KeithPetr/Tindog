import { dogs } from "./data.js";
import { Dog } from "./dog.js";

const footerEl = document.getElementById("footer");

let isWaiting = false;
let dogBio = getNewDog();

function render() {
  document.getElementById("dog-container").innerHTML = dogBio.getDogHtml();
}

render();

function getNewDog() {
  const nextDogData = dogs.shift();
  return nextDogData ? new Dog(nextDogData) : {};
}

footerEl.addEventListener("click", (e) => {
  if (!isWaiting) {
    if (e.target.id.includes("nope-icon")) {
      dogBio.hasBeenSwiped = true;
      document.getElementById("nope-image").classList.remove('none')
    } else if (e.target.id.includes("like-icon")) {
      dogBio.hasBeenSwiped = true;
      document.getElementById("like-image").classList.remove('none')
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
