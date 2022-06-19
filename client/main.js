console.log("hello");

const projectDetails = document.getElementById("project-details");
const darkOverlay = document.getElementById("dark-overlay");
const projectLearnMoreButtons =
  document.getElementsByClassName("project-learn-more");
const exitButton = document.getElementById("project-details-exit");

console.log(projectLearnMoreButtons.length);

exitButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  projectDetails.style.display = "none";
});

const handler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  projectDetails.style.display = "flex";
};

for (let i = 0; i < projectLearnMoreButtons.length; i++) {
  projectLearnMoreButtons[i].addEventListener("click", handler);
}
