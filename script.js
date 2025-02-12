let noClicks = 0; // Start at 0 to loop from the beginning (excluding the happy GIF)
const maxNoClicks = 7; // Number of GIFs to loop through, excluding the happy GIF
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // This tracks the scaling factor directly
let noOpacity = 1; // Start with full opacity for the "No" button
const gifElement = document.getElementById("togepi-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// array of gifs - in order (skip the happy GIF)
const gifs = [
  "assets/images/togepi-happy.gif", // Happy GIF is excluded from the loop
  "assets/images/togepi-sad-1.gif",
  "assets/images/togepi-sad-2.gif",
  "assets/images/togepi-sad-3.gif",
  "assets/images/togepi-sad-1.gif",
  "assets/images/togepi-sad-4.gif",
  "assets/images/togepi-sad-1.gif",
  "assets/images/togepi-crying.gif",
];

// array of messages (you can add more messages here)
const buttonMessages = [
  "sure najud na?",
  "sige na, please :<<",
  "ay okay ana bitaw ko, no rajud :<",
  "mag ice cream ta, yes nana ron",
  "starbucks? yes nana frappe haha",
  "dunkin donuts! yiee yes nana",
  "sige na, yes ra jud ang mo work ani promise",
];

// Function to randomly place the "No" button within the viewport
function moveNoButtonRandomly() {
  // Get random positions within the viewport
  const randomTop = Math.random() * (window.innerHeight - noButton.offsetHeight); // Prevents overflow
  const randomLeft = Math.random() * (window.innerWidth - noButton.offsetWidth); // Prevents overflow

  // Apply the new position to the "No" button
  noButton.style.position = "absolute"; // Make sure the button is positioned absolutely
  noButton.style.top = `${randomTop}px`;
  noButton.style.left = `${randomLeft}px`;
}

// Function to enlarge the "Yes" button until it occupies the whole space
function enlargeYesButton() {
  // Get the current width and height of the "Yes" button
  const currentWidth = yesButton.offsetWidth;
  const currentHeight = yesButton.offsetHeight;

  // Get the maximum width and height of the viewport
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;

  // Increase the size of the "Yes" button if it hasn't reached the maximum dimensions yet
  if (currentWidth < maxWidth && currentHeight < maxHeight) {
    yesScale += 0.5; // Increase the scaling factor (adjust this value for speed of enlargement)
    yesButton.style.transform = `scale(${yesScale})`;
  }
}

// no button clicked
noButton.addEventListener("click", () => {
  // Loop through the GIFs (skip the happy GIF, so we start from index 1)
  if (noClicks >= maxNoClicks) {
    noClicks = 0; // Reset to loop
  }

  // Update the gifElement src, skip the first one (happy GIF)
  gifElement.src = gifs[noClicks + 1]; // Start from index 1 (exclude the happy GIF)

  // change no button text, using modulo to loop through messages
  noButton.textContent = buttonMessages[noClicks % buttonMessages.length]; // Loop through messages using modulo

  // Adjust button width to fit text
  noButton.style.width = "auto";
  noButton.style.width = `${noButton.scrollWidth}px`;

  // decrease the size of the no button
  if (noScale > minNoScale) {
    noScale -= 0.1;
    noButton.style.transform = `scale(${noScale})`;
  }

  // ** Make the "No" button fade out **
  if (noOpacity > 0) {
    noOpacity -= 0.05; // Decrease opacity by 0.05 with each click (you can adjust this value)
    noButton.style.opacity = noOpacity; // Apply the fading effect
  }

  // ** Move the "No" button to a random position after each click **
  moveNoButtonRandomly();

  // ** Enlarge the "Yes" button **
  enlargeYesButton();

  // increment the number of clicks, but make sure it loops properly
  noClicks++;
});
