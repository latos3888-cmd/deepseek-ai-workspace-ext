// DeepSeek AI Workspace - Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  // Create context menu for sending text to DeepSeek
  chrome.contextMenus.create({
    id: "sendToDeepSeek",
    title: "Send to DeepSeek Workspace",
    contexts: ["selection"]
  });

  // Set default side panel behavior
  if (chrome.sidePanel) {
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
    if (chrome.sidePanel) {
      chrome.sidePanel.open({ windowId: tab.windowId });
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
