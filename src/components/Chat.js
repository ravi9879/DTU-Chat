import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import Url from "../stores/Url"; 
const socket = io(Url); 
function App() {
  const [messages, setMessages] = useState([]);
  let cnt = 0;
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const user_id = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    socket.on("receiveMessage", (msg) =>  {setMessages([...msg]) } ); 
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (input.trim() === "") return;
    socket.emit("sendMessage", {
      sender: "user1",
      receiver: "bot_id_here", // replace with real bot ID
      content: input,
    });
    setInput(""); 
  };
 
  const clearChats = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      axios
        .post(`${Url}/clear-chat/`, { 
          user_id : user_id 
        })
        .then((res) => {
          console.log(res) ;
          setMessages([]) ;
          setLoading(false); 
        });
    } catch (err) {
      setLoading(false);
      console.log("error at client side", err); 
    } 
  };


  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-85 z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 font-semibold text-blue-600 text-lg">
            Logging in...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col h-[32rem]">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold px-6 py-4 rounded-t-2xl shadow flex items-center justify-between">
          <span>SmartChat</span>
          <button
            onClick={clearChats}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition"
            title="Clear Chats"
          >
            Clear Chats
          </button>
        </div>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user1" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm ${
                  msg.sender === "user1"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <span className="block font-semibold mb-1">{msg.sender}</span>
                {msg.content}
                <div><small>{msg.timestamp}</small></div>  
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <div className="p-4 bg-gray-50 rounded-b-2xl flex space-x-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            onClick={send}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
