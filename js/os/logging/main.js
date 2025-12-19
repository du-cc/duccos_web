// Module: System-wide logging

// Settings
var log = true;

var channels = {};
var messages = [];

export function log(message, channel = "general") {
  if (log) {
    console.log(`[${channel}] ${message}`);
    messages.push({ message, channel });
  }
}

export function warn(message, channel = "general") {
  console.warn(`[${channel}] ${message}`);
}

export function error(message, channel = "general") {
  console.error(`[${channel}] ${message}`);
}

export function enable() {
  if (!log) {
    log = true;
    console.log("[logging] Logging enabled");
  }
}
