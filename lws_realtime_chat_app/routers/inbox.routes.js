"use strict";
const { getInbox, searchUser, addConversation, getMessages, sendMessage } = require("../controllers/inbox.controller");
const authGuard = require("../middlewares/common/auth.middleware");
const decorateHTML = require("../middlewares/common/decorateHTML.middleware");
const attachmentUpload = require("../middlewares/inbox/attachmentUpload.middleware");
const inboxRouter = require("express").Router();

// inbox page
inboxRouter.get("/", decorateHTML("Inbox"), authGuard, getInbox);

// search user for conversation
inboxRouter.post("/search", authGuard, searchUser);

// add conversation
inboxRouter.post("/conversation", authGuard, addConversation);

// get messages of a conversation
inboxRouter.get("/messages/:conversation_id", authGuard, getMessages);

// send message
inboxRouter.post("/message", authGuard, attachmentUpload, sendMessage);


module.exports = inboxRouter