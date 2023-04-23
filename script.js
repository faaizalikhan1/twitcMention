alert("IN CONTENT!");
setTimeout(() => {
  checkForMentions();
}, 5000);
// sending message

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // console.log(
  //   sender.tab
  //     ? "from a content script:" + sender.tab.url
  //     : "from the extension"
  // );
  let getMsg = document.querySelector("span.message").innerText;
  alert(getMsg);
});

const checkForMentions = () => {
  let getMsg = document.querySelector("span.message").innerText;
  alert(getMsg);
};

//span.chat-author__display-name
//div.chat-line__message-container
// chrome.tabs.executeScript({
//   code: 'console.log("addd")'
// });
