// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "ON",
//   });
// });

chrome.runtime.onInstalled.addListener(async () => {
  console.log(chrome.runtime.getManifest().content_scripts);
});

console.log("does this even work?");

// listen for messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("pog opened");
});

const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   console.log("storage changed");
// });

chrome.tabs.onActivated.addListener(async (info) => {
  console.log(chrome.runtime.getManifest().content_scripts);
  chrome.tabs.get(info.tabId, (tab) => {
    if (tab.url.includes("twitch.tv")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["script.js"],
      });
    }
  });
});
// chrome.runtime.onInstalled.addListener(async () => {
//   let [tab] = await chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true,
//   });

// });

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  chrome.action.setPopup({
    popup: "index.html",
    tabId: tab.id,
  });

  // if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
  //   // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
  //   const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  //   // Next state will always be the opposite
  //   const nextState = prevState === "ON" ? "OFF" : "ON";
  //   // Set the action badge to the next state
  //   await chrome.action.setBadgeText({
  //     tabId: tab.id,
  //     text: nextState,
  //   });
  //   if (nextState === "ON") {
  //     // Insert the CSS file when the user turns the extension on
  //     await chrome.scripting.insertCSS({
  //       target: { tabId: tab.id },
  //     });
  //   } else if (nextState === "OFF") {
  //     // Remove the CSS file when the user turns the extension off
  //     await chrome.scripting.removeCSS({
  //       target: { tabId: tab.id },
  //     });
  //   }
  // }
});
