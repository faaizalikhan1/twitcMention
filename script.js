// sending message

alert("injected");
let extensionInterval = setInterval(() => {
  checkForMentions();
}, 5000);

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  // let getMsg = document.querySelector("span.message").innerText;
  // alert(getMsg);
});

const checkForMentions = () => {
  if (chrome.runtime?.id) {
    const chats = document.querySelectorAll(".chat-line__message-container");
    const messages = [];
    chats?.forEach((chat) => {
      const userName = chat.querySelector(
        "span.chat-author__display-name"
      ).innerText;

      const message = chat.querySelector("span.message").innerText;
      messages.push(message);
      // if(userName === 'scrumptions')
    });

    chrome.storage.local.set({ twitchMessages: messages }).then(() => {
      console.log("Value is set to " + messages);
    });
  } else {
    clearInterval(extensionInterval);
  }
};

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   alert("storage chenaged");
// });

//span.chat-author__display-name
//div.chat-line__message-container
// chrome.tabs.executeScript({
//   code: 'console.log("addd")'
// });
