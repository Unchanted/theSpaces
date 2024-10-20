import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft2, Send2, ArrowCircleDown } from "iconsax-react";
import CreateSpaceIcon from "../assets/CreateSpace.svg";

const chatData = [
  {
    id: 1,
    sender: "other",
    message: "Hello, how are you?",
    dp: CreateSpaceIcon,
  },
  {
    id: 2,
    sender: "me",
    message: "I'm good, thanks! How about you?",
    dp: CreateSpaceIcon,
  },
  {
    id: 3,
    sender: "other",
    message: "I'm doing well, thank you!",
    dp: CreateSpaceIcon,
  },
];

const spaceDetails = {
  name: "Space Name",
  description: "This is the description of the space.",
  members: ["Member1", "Member2", "Member3", "Member4", "Member5"],
  dp: CreateSpaceIcon,
};

export default function SpaceChat() {
  const [messages, setMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "me",
          message: newMessage,
          dp: CreateSpaceIcon,
        },
      ]);
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 bg-white bg-opacity-40 backdrop-blur-lg fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <ArrowLeft2
            size="24"
            className="mr-2 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div
            onClick={handleModalOpen}
            className="flex items-center cursor-pointer"
          >
            <h1 className="text-xl font-bold mr-2">Space Name</h1>
          </div>
        </div>
        <img
          src={CreateSpaceIcon}
          alt="Space DP"
          className="w-10 h-10 rounded-full object-cover"
          onClick={handleModalOpen}
        />
      </div>
      <div
        className="flex-1 mt-16 p-4 overflow-y-auto pb-20"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end ml-6" : "justify-start mr-6"} mb-4`}
          >
            {msg.sender !== "me" && (
              <img
                src={msg.dp}
                alt="Sender DP"
                className="w-10 h-10 rounded-full object-cover mr-2"
              />
            )}
            <div className="max-w-3/4">
              <div className="text-sm text-gray-500 mb-1">
                {msg.sender === "me" ? "Me" : "Other"}
              </div>
              <div
                className={`p-3 rounded-lg break-words ${
                  msg.sender === "me"
                    ? "bg-accent text-textBlack"
                    : "bg-secondary text-textBlack"
                }`}
              >
                {msg.message}
              </div>
            </div>
            {msg.sender === "me" && (
              <img
                src={msg.dp}
                alt="Sender DP"
                className="w-10 h-10 rounded-full object-cover ml-2"
              />
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {!isAtBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-20 right-4 p-2 rounded-full bg-secondary text-white"
        >
          <ArrowCircleDown size="32" />
        </button>
      )}
      <div className="flex items-center p-4 bg-white bg-opacity-70 backdrop-blur-md fixed bottom-0 left-0 right-0 z-10">
        <div className="relative flex-1">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg pr-10 resize-none overflow-hidden"
            placeholder="Type your message..."
            rows="1"
            style={{ height: "auto" }}
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
          >
            <Send2 size="32" color="#a6ef5c" variant="Bold" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 m-8 rounded-lg shadow-lg w-full">
            <div className="flex justify-center mb-4">
              <img
                src={spaceDetails.dp}
                alt="Space DP"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {spaceDetails.name}
            </h2>
            <p className="text-gray-600 text-center mb-4">
              {spaceDetails.description}
            </p>
            <h3 className="text-xl font-bold mb-2">Members</h3>
            <ul className="list-disc list-inside">
              {spaceDetails.members.map((member, index) => (
                <li key={index} className="text-gray-800">
                  {member}
                </li>
              ))}
            </ul>
            <button
              onClick={handleModalClose}
              className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
