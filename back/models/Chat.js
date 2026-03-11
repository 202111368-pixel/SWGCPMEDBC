const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  emisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mensaje: { type: String, required: true },
  sala: { type: String, default: "general" }, 
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);