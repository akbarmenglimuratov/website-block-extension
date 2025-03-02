function getWebsiteLists() {
    // var text = document.getElementById('currentWebpageUrl');
    var url = window.location.href;

    chrome.storage.local.set({ 'urls': url}).then(() => {
        console.log("Value is set");
    });
    chrome.storage.local.get(['urls']).then((result) => {
        console.log(result.key);
    })
}

let addButton = document.getElementById("currentWebsiteAddButton");

if (addButton) {
    addButton.addEventListener("click", getWebsiteLists);
}

// let currentWebpageUrl = document.getElementById('currentWebpageUrl');

async function getCurrentTabUrl() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    // console.log(tab.url);
    return tab.url;
}

let currentWebpageUrl = getCurrentTabUrl();
console.log(currentWebpageUrl.innerHTML);

if (currentWebpageUrl) {
    currentWebpageUrl.innerHTML = window.location.toString();
    // document.getElementById('currentWebpageUrl').innerHTML = currentWebpageUrl.innerHTML;
}
