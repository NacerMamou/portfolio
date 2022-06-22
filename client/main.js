let data = new Map();

data.set("project1", {
  mainImageUrl: "./images/openclassrooms.PNG",
  images: ["./images/home.jpg", "./images/home1.jpg", "./images/git.jpg"],
});

data.set("project2", {
  mainImageUrl: "./images/openclassrooms.PNG",
  images: ["./images/js1.png", "./images/js2.png"],
});

data.set("project3", {
  mainImageUrl: "./images/openclassrooms.PNG",
  images: [
    "./images/openclassrooms.PNG",
    "./images/logo.PNG",
    "./images/home.jpg",
    "./images/openclassrooms.PNG",
  ],
});

let numberOfImages;
let xTranslationMax;
let xTranslationAmount;
const darkOverlay = document.getElementById("dark-overlay");
const projectDetailsContainer = document.getElementById(
  "project-details-container"
);

const carousselContainer = document.getElementById("caroussel-container");

const exitButton = document.getElementById("project-details-exit");

const projectsContainer = document.getElementById("projects-container");

const setSlidePosition = (slide, index) => {
  slide.style.left = `${index * 100}%`;
};

const handler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const clickedProjectId = e.target.id;
  const clickedProjectData = data.get(clickedProjectId);
  carousselContainer.textContent = "";

  numberOfImages = clickedProjectData.images.length;
  xTranslationMax = +((numberOfImages - 1) * 100);
  xTranslationAmount = 0;

  for (let i = 0; i < clickedProjectData.images.length; i++) {
    const newImage = document.createElement("img");
    newImage.src = clickedProjectData.images[i];

    const newSlide = document.createElement("li");
    newSlide.classList.add("caroussel-slide");
    newSlide.id = "caroussel-slide";

    newSlide.appendChild(newImage);
    carousselContainer.appendChild(newSlide);
    setSlidePosition(newSlide, i);
  }

  darkOverlay.showModal();
  carousselconfigure();
};

async function displayProjects() {
  for (let [key, value] of data) {
    //Create a new project Topic and update its elements
    const newProjectTopic = document.createElement("div");
    newProjectTopic.classList.add("project-topic");

    const textTopDiv = document.createElement("div");
    textTopDiv.classList.add("text-top");

    const h3Elt = document.createElement("h3");
    h3Elt.textContent = "Show Now Ordering";
    const pElt = document.createElement("p");
    pElt.textContent = "React / Node.js";

    textTopDiv.appendChild(h3Elt);
    textTopDiv.appendChild(pElt);

    const textBottomDiv = document.createElement("div");
    textBottomDiv.classList.add("text-bottom");

    const imgElt = document.createElement("img");
    imgElt.src = value.mainImageUrl;

    const aElt = document.createElement("a");
    aElt.classList.add("project-learn-more");
    aElt.id = key;
    aElt.textContent = "LEARN MORE";
    aElt.addEventListener("click", handler);
    textBottomDiv.appendChild(aElt);

    newProjectTopic.appendChild(textTopDiv);
    newProjectTopic.appendChild(imgElt);
    newProjectTopic.appendChild(textBottomDiv);

    projectsContainer.appendChild(newProjectTopic);
  }
}

displayProjects();

// Carousel Animation

// const carousselSlide = document.getElementById("caroussel-slide");
const carouselRightButton = document.getElementById("right-button");
const carousselLeftButton = document.getElementById("left-button");

function carousselconfigure() {
  carouselRightButton.addEventListener("click", nextClickHandler);

  carousselLeftButton.addEventListener("click", prevClickHandler);

  exitButton.addEventListener("click", exitClickHandler);
}

const prevClickHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(xTranslationAmount);
  if (xTranslationAmount == 0) {
    xTranslationAmount = xTranslationMax;
  } else if (xTranslationAmount >= 100) {
    xTranslationAmount -= 100;
  } else {
    xTranslationAmount = xTranslationAmount;
  }
  carousselContainer.style.transform = `translateX(-${xTranslationAmount}%`;
  console.log(xTranslationAmount);
};

const nextClickHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(xTranslationAmount);
  if (xTranslationAmount == xTranslationMax) {
    xTranslationAmount = 0;
  } else if (xTranslationAmount < xTranslationMax) {
    xTranslationAmount += 100;
  } else {
    xTranslationAmount = xTranslationAmount;
  }
  carousselContainer.style.transform = `translateX(-${xTranslationAmount}%`;
  console.log(xTranslationAmount);
};

const exitClickHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  carousselLeftButton.removeEventListener("click", prevClickHandler);
  carousselLeftButton.removeEventListener("click", nextClickHandler);

  console.log(numberOfImages);
  numberOfImages = 0;
  console.log(numberOfImages);
  xTranslationMax = 0;
  xTranslationAmount = 0;
  carousselContainer.style.transform = `translateX(-${xTranslationAmount}%`;

  darkOverlay.setAttribute("closing", "");
  darkOverlay.addEventListener(
    "animationend",
    () => {
      darkOverlay.removeAttribute("closing");
      darkOverlay.close();
    },
    { once: true }
  );
};
