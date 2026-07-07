export class DeepSeekClient {
  static async chat(messages, options = {}) {
    const { apiKey } = await chrome.storage.local.get('apiKey');
    if (!apiKey) {
      throw new Error("API Key not found. Please set it in settings.");
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'deepseek-chat',
        messages: messages,
        stream: options.stream || false
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to call DeepSeek API");
    }

    return await response.json();
  }
}
