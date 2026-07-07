export class ExportEngine {
  static async toMarkdown(messages) {
    return messages.map(m => `### ${m.role === 'user' ? 'User' : 'DeepSeek'}\n\n${m.text}`).join('\n\n---\n\n');
  }

  static async toHTML(messages) {
    const content = messages.map(m => `
      <div class="message ${m.role}">
        <strong>${m.role === 'user' ? 'User' : 'DeepSeek'}:</strong>
        <p>${m.text}</p>
      </div>
    `).join('');
    return `<!DOCTYPE html><html><head><style>body{font-family:sans-serif;}.user{color:blue;}.ai{color:green;}</style></head><body>${content}</body></html>`;
  }

  static download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
