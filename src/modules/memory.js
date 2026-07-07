export class LongTermMemory {
  static async store(key, value) {
    const memory = await this.getMemory();
    memory[key] = {
      value,
      timestamp: Date.now()
    };
    await chrome.storage.local.set({ longTermMemory: memory });
  }

  static async getMemory() {
    const result = await chrome.storage.local.get('longTermMemory');
    return result.longTermMemory || {};
  }

  static async search(query) {
    const memory = await this.getMemory();
    // Simple keyword search for now
    return Object.values(memory).filter(item => 
      item.value.toLowerCase().includes(query.toLowerCase())
    );
  }
}
