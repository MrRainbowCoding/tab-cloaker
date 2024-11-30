// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('Tab Cloaker extension installed!');
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'cloakTab') {
        // Get the active tab in the current window
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab && activeTab.id) {
                // Replace the tab's title and favicon
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    function: cloakTab,
                    args: [message.title, message.faviconUrl]
                }, (results) => {
                    if (chrome.runtime.lastError) {
                        console.error('Script injection failed:', chrome.runtime.lastError.message);
                    } else {
                        console.log('Script executed successfully:', results);
                    }
                });
            } else {
                console.error('No active tab found or tab ID is undefined.');
            }
        });
    }
});

// Function to cloak the tab
function cloakTab(newTitle, newFavicon) {
    console.log('Cloaking tab with new title:', newTitle);
    // Change the tab's title
    document.title = newTitle;

    // Change the favicon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = newFavicon;
}
