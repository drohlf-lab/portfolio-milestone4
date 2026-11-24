// 1. DOM Interaction
const toggleBtn = document.querySelector("#toggle-about-btn");
const moreAbout = document.querySelector("#more-about");

toggleBtn.addEventListener("click", () => {
  const isHidden = moreAbout.classList.toggle("hidden");
  toggleBtn.setAttribute("aria-expanded", String(!isHidden));
  toggleBtn.textContent = isHidden ? "Show More About Me" : "Hide Extra Details";
});

// 2. Contact Form Validation
const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#visitor-name");
const emailInput = document.querySelector("#visitor-email");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const formStatus = document.querySelector("#form-status");

nameInput.addEventListener("input", () => {
  if (nameInput.value.trim() !== "") {
    nameError.textContent = "";
    nameInput.removeAttribute("aria-invalid");
  }
});

emailInput.addEventListener("input", () => {
  if (emailInput.validity.valid && emailInput.value.trim() !== "") {
    emailError.textContent = "";
    emailInput.removeAttribute("aria-invalid");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let valid = true;
  formStatus.textContent = "";

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    nameInput.setAttribute("aria-invalid", "true");
    valid = false;
  }

  if (emailInput.value.trim() === "" || !emailInput.validity.valid) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.setAttribute("aria-invalid", "true");
    valid = false;
  }

  if (valid) {
    formStatus.textContent = "Form validated successfully! Ready to send.";
    form.reset();
  }
});

// 3. Optional Bonus: Public API Fetch
const ghInput = document.querySelector("#gh-username");
const loadGhBtn = document.querySelector("#load-gh-btn");
const ghResult = document.querySelector("#gh-result");

loadGhBtn.addEventListener("click", async () => {
  const username = ghInput.value.trim();

  if (!username) {
    ghResult.textContent = "Please enter a GitHub username first.";
    return;
  }

  ghResult.textContent = "Loading profile...";

  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const displayName = data.name || data.login;
    const bioText = data.bio || "No bio listed.";

    ghResult.innerHTML = "";

    const title = document.createElement("p");
    title.textContent = `${displayName} (@${data.login}) — Public Repos: ${data.public_repos}`;

    const bio = document.createElement("p");
    bio.textContent = bioText;

    ghResult.append(title, bio);
  } catch (error) {
    ghResult.textContent = "Could not load GitHub profile right now. Please check the username and try again.";
  }
});
