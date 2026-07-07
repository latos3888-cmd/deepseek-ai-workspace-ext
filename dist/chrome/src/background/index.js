// DeepSeek AI Workspace - Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  // Create context menu for sending text to DeepSeek
  chrome.contextMenus.create({
    id: "sendToDeepSeek",
    title: "Send to DeepSeek Workspace",
    contexts: ["selection"]
  });

  // Set default side panel behavior (Chrome only)
  if (typeof chrome !== 'undefined' && chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToDeepSeek") {
    const selectedText = info.selectionText;
    // Send message to sidebar
    chrome.runtime.sendMessage({
      type: "SEND_TO_CHAT",
      text: selectedText
    });
    
    // Ensure side panel is open
    if (typeof chrome !== 'undefined' && chrome.sidePanel && chrome.sidePanel.open) {
      chrome.sidePanel.open({ windowId: tab.windowId });
    } else if (typeof browser !== 'undefined' && browser.sidebarAction && browser.sidebarAction.open) {
      // Firefox specific opening if available
      browser.sidebarAction.open();
    }
  }
});

// Listen for messages from sidebar or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_TAB_INFO") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse(tabs[0]);
    });
    return true;
  }
});
