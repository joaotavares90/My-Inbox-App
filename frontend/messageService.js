const API_BASE = "/api/messages";

export const messageService = {
  // Get all the messages
  async getAll() {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Failed to fetch messages");
    return response.json();
  },

  // Get message by id
  async getById(id) {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch message");
    return response.json();
  },

  // Create a new messagess
  async create(message) {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error("Failed to create message");
    return response.json();
  },

  // Delete message by ids
  async delete(id) {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete message");
  },
};
