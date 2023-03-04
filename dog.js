export class Dog {
  constructor(data) {
    Object.assign(this, data);
  }

  getDogHtml() {
    const { name, avatar, age, bio, hasBeenSwiped, hasBeenLiked } = this;
    return `
        <div class="img-container">
            <img class="like-image none" id="like-image" src="images/like-image.png"/>
            <img class="nope-image none" id="nope-image" src="images/nope-image.png"/>
          <img class="dog-img" src="${avatar}" />
          <p class="name-age">${name}, ${age}</p>
          <p class="bio">${bio}</p>
        </div>
        `;
  }

  setLiked() {
    this.hasBeenSwiped = true;
    this.hasBeenLiked = true;
    document.getElementById('like-image').classList.remove('none')
  }

  setNope() {
    this.hasBeenSwiped = true;
    document.getElementById('nope-image').classList.remove('none')
  }
}
