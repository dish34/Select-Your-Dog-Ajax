function handleRemoveChild(id) {
  var dogimage = document.querySelector(`#${id}`);
  let first = dogimage.firstElementChild;
  while (first) {
    first.remove();
    first = dogimage.firstElementChild;
  }
}
// To add breeds to the select tag
function load() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var breed = document.querySelector("#breeds");
      var subbreed = document.querySelector("#subbreeds");
      // console.log(JSON.parse(this.responseText));
      var obj = JSON.parse(this.responseText).message;
      //   console.log(obj);
      for (var dog in obj) {
        let option = document.createElement("OPTION");
        option.setAttribute("value", dog);
        option.innerHTML = dog;
        breed.appendChild(option);
      }
    }
  };
  req.open("GET", "https://dog.ceo/api/breeds/list/all", true);
  req.send();
}

function loadBreeds() {
  var req = new XMLHttpRequest();
  var breed = document.querySelector("#breeds");
  var subbreed = document.querySelector("#subbreeds");
  var dogimage = document.querySelector("#dog-images");
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText).message;
      console.log(obj);
      //  Removing Subbreeds
      handleRemoveChild("subbreeds");

      // Removing Imges of Dogs on change of breed
      handleRemoveChild("dog-images");

      // Adding Subbreds of dogs
      obj[breed.value].forEach((dog) => {
        let option = document.createElement("OPTION");
        option.setAttribute("value", dog);
        option.innerHTML = dog;
        subbreed.appendChild(option);
      });
      //   IF subbreed present then display select
      if (subbreed.value != "") {
        subbreed.style.display = "block";
      } else {
        subbreed.style.display = "none";
      }
    }
  };

  req.open("GET", "https://dog.ceo/api/breeds/list/all", true);
  req.send();
}

function displayImages() {
  var reqImage = new XMLHttpRequest();
  var url = "https://dog.ceo/api/breed/";
  var breed = document.querySelector("#breeds");
  var subbreed = document.querySelector("#subbreeds");
  var num = document.querySelector("#number-dog-images").value;
  if (num === "undefined" || num === "") {
    num = 6;
  }
  console.log("NUMBER", num);
  var breedUrl = `${breed.value}/images/random/`;
  var subbreedUrl = `${breed.value}/${subbreed.value}/images/random/`;
  // On State Change
  reqImage.onreadystatechange = function () {
    //   IF REQUEST IS RECEIVED
    if (this.readyState == 4 && this.status == 200) {
      var images = JSON.parse(this.responseText).message;
      console.log("images", images);
      var dogimage = document.querySelector("#dog-images");
      //   REMOVE PREVIOUS DOG-IMAGES
      handleRemoveChild("dog-images");
      //   CREATING AND ADDING IMAGES TO THE DOM
      images.forEach((img) => {
        let image = document.createElement("IMG");
        image.setAttribute("src", img);
        dogimage.appendChild(image);
      });
    }
  };
  //   FOR SUBBREADS if present otherwise Breeds
  if (subbreed.value !== "") {
    alert("YO");
    reqImage.open("GET", url + subbreedUrl + num, true);
    reqImage.send();
  } else {
    reqImage.open("GET", url + breedUrl + num, true);
    reqImage.send();
  }
}

function loadNumber() {
  document.querySelector("#btn").disabled = false;
}