export class MCPClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async listTools() {
    const response = await fetch(`${this.endpoint}/tools`);
    return await response.json();
  }

  async callTool(name, args) {
    const response = await fetch(`${this.endpoint}/call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, arguments: args })
    });
    return await response.json();
  }
}
