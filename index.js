import {dogs} from './data.js'
import {Dog} from './dog.js'

// let dogsArray = [dog1, dog2, dog3]

function render() {
    document.getElementById('dog-container').innerHTML = dogBio.getDogHtml()
}

let dogBio = new Dog(dogs[2])

render()