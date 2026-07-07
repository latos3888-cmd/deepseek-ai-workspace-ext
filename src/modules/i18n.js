const translations = {
  en: {
    chat: "Chat",
    projects: "Projects",
    prompts: "Prompts",
    notes: "Notes",
    placeholder: "Type your message...",
    send: "Send"
  },
  zh: {
    chat: "聊天",
    projects: "项目",
    prompts: "提示词",
    notes: "笔记",
    placeholder: "输入消息...",
    send: "发送"
  }
};

let currentLang = 'en';

export async function initI18n() {
  const result = await chrome.storage.local.get('language');
  currentLang = result.language || 'en';
}

export function t(key) {
  return translations[currentLang][key] || key;
}

export function setLanguage(lang) {
  currentLang = lang;
  chrome.storage.local.set({ language: lang });
}
