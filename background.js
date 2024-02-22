chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab's URL is not restricted
    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://') && !tab.url.startsWith('about:')) {
      chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['content.js']
      }).catch(error => {
        // Properly handling the promise rejection
        console.error('Error injecting script into tab:', error);
      });
    }
  });