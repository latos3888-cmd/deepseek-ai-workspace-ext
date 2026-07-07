// DeepSeek AI Workspace - Content Script

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EXTRACT_PAGE_CONTENT") {
    const content = {
      title: document.title,
      url: window.location.href,
      text: document.body.innerText.substring(0, 10000) // Limit for context
    };
    sendResponse(content);
  }
});

// Simple overlay for browser control (if enabled)
function createOverlay() {
  const div = document.createElement('div');
  div.id = "ds-workspace-overlay";
  div.style.cssText = "position:fixed;top:0;right:0;width:5px;height:100%;background:rgba(52, 152, 219, 0.5);z-index:999999;";
  document.body.appendChild(div);
}
