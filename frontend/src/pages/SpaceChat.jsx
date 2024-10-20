import React, { useState } from "react";
import { ArrowLeft2, Send2 } from "iconsax-react";
import CreateSpaceIcon from "../assets/CreateSpace.svg";

const chatData = [
  { id: 1, sender: "other", message: "Hello, how are you?" },
  { id: 2, sender: "me", message: "I'm good, thanks! How about you?" },
  { id: 3, sender: "other", message: "I'm doing well, thank you!" },
];

export default function SpaceChat() {
  const [messages, setMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "me", message: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 bg-white bg-opacity-70 backdrop-blur-md fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <ArrowLeft2 size="24" className="mr-2 cursor-pointer" />
          <h1 className="text-xl font-bold">Space Name</h1>
        </div>
        <img
          src={CreateSpaceIcon}
          alt="Space DP"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex-1 mt-16 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`p-3 rounded-lg ${msg.sender === "me" ? "bg-accent text-textBlack" : "bg-secondary text-textBlack"}`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 bg-white fixed bottom-0 left-0 right-0">
        <div className="relative flex-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg pr-10"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2  p-2 rounded-full"
          >
            <Send2 size="32" color="#a6ef5c" variant="Bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
