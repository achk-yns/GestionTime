const mongoose = require("mongoose");

const agentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  productionTime: {
    type: Number,
    default: 0,
  },
  pauseTime: {
    type: Number,
    default: 0,
  },
  lastSessionDate: {
    type: Date,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  }
});

const agent  =mongoose.model("Agent",agentSchema)

module.exports = agent
