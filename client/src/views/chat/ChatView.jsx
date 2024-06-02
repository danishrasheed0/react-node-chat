import { useState } from "react";

const ChatboxPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Chat with User</h1>
      </header>
      {/* Chat List */}

      <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
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
  );
};

export default ChatboxPage;
