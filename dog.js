export class Dog {
    constructor(data) {
        Object.assign(this, data);
    }

    getDogHtml(data) {
        const {name, avatar, age, bio, hasBeenSwiped, hasBeenLiked} = this
        return `
        <div class="img-container">
          <img class="dog-img" src="${avatar}" />
          <p class="name-age">${name}, ${age}</p>
          <p class="bio">${bio}</p>
        </div>
        `
    }

    isLiked() {

    }

    isSwiped() {
        
    }
}

