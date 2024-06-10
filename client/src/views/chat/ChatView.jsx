import { useState } from "react";

const ChatboxPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([
    { id: 1, name: "John Doe", image: "path/to/john_image.jpg" },
    { id: 2, name: "Jane Smith", image: "path/to/jane_image.jpg" },
    // Add more chat entries as needed
  ]);

  const handleSend = () => {
    if (input.trim() !== "" && selectedChat !== null) {
      setMessages([
        ...messages,
        { text: input, sender: "You", chatId: selectedChat },
      ]);
      setInput("");
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
  };

  const getMessagesForSelectedChat = () => {
    return messages.filter((message) => message.chatId === selectedChat);
  };

  return (
    <div className="h-[90%] flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-200 p-4 flex flex-col">
        <div className="mb-4">
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full mb-2">
            Add Person
          </button>
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full">
            Create Group
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center p-2 mb-2 bg-white rounded-lg cursor-pointer hover:bg-indigo-100"
              onClick={() => handleChatSelect(chat.id)}
            >
              <img
                src={chat.image}
                alt={chat.name}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span>{chat.name}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Box */}
      {selectedChat !== null && (
        <div className="w-3/4 border border-black">
          <div className="w-full h-full flex flex-col">
            {/* Header */}
            <header className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center ">
              <h1 className="text-2xl font-bold">
                Chat with {chats.find((chat) => chat.id === selectedChat)?.name}
              </h1>
              <button
                onClick={handleCloseChat}
                className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
              >
                Close
              </button>
            </header>

            {/* Chat List */}
            <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
              <div className="space-y-4">
                {getMessagesForSelectedChat().map((message, index) => (
                  <div key={index} className="flex">
                    <div
                      className={`max-w-xs mx-2 p-2 rounded-lg ${
                        message.sender === "You"
                          ? "bg-indigo-600 text-white self-end"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <span>{message.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Controls */}
            <footer className="bg-white py-4 px-6 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type a message"
                />
                <button
                  onClick={handleSend}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatboxPage;
