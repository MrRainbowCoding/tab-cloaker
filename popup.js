// popup.js

document.addEventListener('DOMContentLoaded', function() {
  const cloakButton = document.getElementById('cloakButton');

  // Click event to send a message to the background script
  cloakButton.addEventListener('click', () => {
      // Get values from the input fields
      const newTitle = document.getElementById('titleInput').value || "New Tab Title";
      const newFavicon = document.getElementById('faviconInput').value || "https://example.com/favicon.ico";

      // Log the message being sent
      console.log('Sending message to background:', { action: 'cloakTab', title: newTitle, faviconUrl: newFavicon });

      // Send message to background script to cloak the tab
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.runtime.sendMessage({
              action: 'cloakTab',
              title: newTitle,
              faviconUrl: newFavicon
          });
      });
  });
});
