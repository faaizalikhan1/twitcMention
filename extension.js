let twitchUsername = "";
const userNameInput = document.querySelector("#userName--input");
const submitBtn = document.querySelector("#btn--submit");

userNameInput.addEventListener("input", (e) => {
  twitchUsername = e.target.value;

  if (e.target.value) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.addAttribute("disabled");
  }
});

submitBtn.addEventListener("click", async (e) => {
  document.querySelector(
    "#selected--username"
  ).innerHTML = `@${twitchUsername}`;

  chrome.storage.local
    .set({ twitchMessageUser: twitchUsername })
    .then(async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      const response = await chrome.tabs.sendMessage(tab.id, {
        greeting: "hello",
        name: twitchUsername,
      });
    });

  // do something with response here, not outside the function
  // console.log(response);
});

// check if username has already been selected

chrome.storage.local.get(["twitchMessageUser"]).then(async (result) => {
  document.querySelector(
    "#selected--username"
  ).innerHTML = `@${result?.twitchMessageUser}`;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  alert("storage chenaged");
});
