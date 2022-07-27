console.log("background loaded");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get("swaggerUrls").then(({ swaggerUrls }) => {
      swaggerUrls.forEach(({ url, enabled }) => {
        if (enabled && url && tab.url.startsWith(url)) {
          chrome.scripting.executeScript({
            target: { tabId },
            files: ["src/pages/content/index.js"],
          });
        }
      });
    });
  }
});
