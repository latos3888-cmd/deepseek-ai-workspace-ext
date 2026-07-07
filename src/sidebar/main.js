import { initI18n, t } from '../modules/i18n.js';
import { ProjectManager } from '../modules/projects.js';
import { DeepSeekClient } from '../modules/api-client.js';

const state = {
  currentView: 'chat',
  language: 'en',
  projects: [],
  currentProject: null
};

async function init() {
  await initI18n();
  setupEventListeners();
  updateUI();
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      e.target.classList.add('active');
      switchView(e.target.dataset.view);
    });
  });

  // Language Switch
  document.getElementById('language-switch').addEventListener('change', (e) => {
    state.language = e.target.value;
    // Handle language change logic
  });

  // Send Message
  document.getElementById('send-btn').addEventListener('click', handleSendMessage);
  document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Listen for background messages
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'SEND_TO_CHAT') {
      document.getElementById('user-input').value = message.text;
      switchView('chat');
    }
  });
}

function switchView(view) {
  state.currentView = view;
  // Hide all sections, show current
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const activeView = document.getElementById(`${view}-view`);
  if (activeView) activeView.style.display = 'flex';
}

async function handleSendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  input.value = '';

  // Call DeepSeek API (Placeholder)
  appendMessage('ai', 'Thinking...');
  // const response = await DeepSeekClient.chat(text);
  // updateLastMessage(response);
}

function appendMessage(role, text) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function updateUI() {
  // Update strings based on current language
}

init();
