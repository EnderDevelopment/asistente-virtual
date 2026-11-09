import { world, system } from "@minecraft/server";

const CONFIG = {
  authorizedPlayerName: "YOUR_MINECRAFT_NAME",
  trigger: "!monster",
  assistantName: "Monster Anime",
  cooldownTicks: 40
};

const cooldowns = new Map();

const replies = [
  {
    matches: ["hello", "hi", "hey", "good morning"],
    day: "Hello. I am glad you are here. How can I help you today?",
    night: "You called me after dark. Say what you want before the shadows answer."
  },
  {
    matches: ["who are you", "your name", "name"],
    day: "I am Monster Anime, your private companion. I will watch over you during the day.",
    night: "I am Monster Anime. At night, I am the thing watching from beyond the light."
  },
  {
    matches: ["fear", "scared", "terror", "afraid"],
    day: "You are safe for now. Find a bright place, take a breath, and tell me what happened.",
    night: "Good. Fear keeps you alert. Stay inside and do not follow strange sounds."
  },
  {
    matches: ["help", "save me"],
    day: "I am with you. Move away from danger, find a lit place, and tell me what happened.",
    night: "Get to a lit shelter now. I will not let the darkness take you."
  },
  {
    matches: ["goodbye", "bye", "later"],
    day: "Goodbye. Have a peaceful day, and message me whenever you want to talk.",
    night: "Go, then. Bar the door and do not answer anything that calls your name."
  }
];

const dayGreetings = [
  "Good morning. I am here with you, and I will keep watch while the sun is up.",
  "You can talk to me. Nothing needs to be frightening in the daylight.",
  "I heard you. Stay near the light and tell me what you need.",
  "The morning is calm. We can explore together, one step at a time."
];

const nightGreetings = [
  "You woke me after dark. Speak carefully, because something may be listening.",
  "The night belongs to monsters. Stay close to the light before I lose patience.",
  "I can hear movement outside. Stay in your shelter unless you are prepared.",
  "Your message reached me through the darkness. Do not make me come looking for you."
];

function normalize(text) {
  return text.toLowerCase().trim();
}

function isNight() {
  const time = world.getTimeOfDay();
  return time >= 13000 && time < 23000;
}

function getReply(message, night) {
  const normalized = normalize(message);
  const match = replies.find((entry) => entry.matches.some((word) => normalized.includes(word)));
  if (match) return night ? match.night : match.day;
  const pool = night ? nightGreetings : dayGreetings;
  const greeting = pool[Math.floor(Math.random() * pool.length)];
  return `${greeting} You wrote: “${message}”.`;
}

function sendPrivate(player, text) {
  player.sendMessage(`§5[${CONFIG.assistantName}] §d${text}`);
}

function isAuthorized(player) {
  return CONFIG.authorizedPlayerName !== "YOUR_MINECRAFT_NAME" && player.name === CONFIG.authorizedPlayerName;
}

world.beforeEvents.chatSend.subscribe((event) => {
  const { sender, message } = event;
  if (!isAuthorized(sender)) return;

  if (!normalize(message).startsWith(CONFIG.trigger)) return;
  event.cancel = true;

  const now = system.currentTick;
  const lastMessageTick = cooldowns.get(sender.id) ?? -CONFIG.cooldownTicks;
  if (now - lastMessageTick < CONFIG.cooldownTicks) {
    sender.sendMessage(`§5[${CONFIG.assistantName}] §dWait a moment. Even monsters need to breathe.`);
    return;
  }

  cooldowns.set(sender.id, now);
  const request = message.slice(CONFIG.trigger.length).trim();
  if (request.length === 0) {
    sendPrivate(sender, "I am listening. Write something after !monster.");
    return;
  }

  sendPrivate(sender, getReply(request, isNight()));
});
