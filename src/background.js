// Cancel the requests if the requested website is blocked

function getWebsiteLists() {
  let blockedWebsites = [];
  chrome.storage.sync.get("blockedWebsites", function (result) {
    blockedWebsites = result.blockedWebsites || [];
  });

  return blockedWebsites;
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    let blockedWebsites = getWebsiteLists();
    // Check if the requested URL matches the blocked domain
    if (blockedWebsites.includes(details.url)) {
      // Cancel the request
      return { cancel: true };
    }
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);
