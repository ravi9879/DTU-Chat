import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import Url from "../stores/Url";

// Make sure Bootstrap CSS is imported in your index.js or App.js
// import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io(Url, { transports: ["polling"] });

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const user_id = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages([...msg]);
    });
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // Cleanup
    return () => socket.off("receiveMessage");
  }, [messages]);

  const send = () => {
    if (input.trim() === "") return;
    socket.emit("sendMessage", {
      sender: user_id,
      receiver: "bot_id_here",
      content: input,
    });
    setMessages((prev) => [
      ...prev,
      {
        sender: user_id,
        receiver: "bot_id_here",
        content: input,
      },
    ]);
    setInput("");
  };

  const clearChats = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      axios
        .post(`${Url}/clear-chat/`, {
          user_id: user_id,
        })
        .then((res) => {
          setMessages([]);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status"></div>
          <div className="mt-4 fw-semibold text-primary fs-5">
            Please wait...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ width: 420, maxWidth: "100%", minHeight: 600 }}>
        {/* Header */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-4">SmartChat</span>
          <button
            onClick={clearChats}
            className="btn btn-danger btn-sm fw-semibold"
            title="Clear Chats"
          >
            Clear Chats
          </button>
        </div>
        {/* Chat messages */}
        <div className="card-body overflow-auto px-3 py-2" style={{ height: 400 }}>
          {messages.length === 0 && (
            <div className="text-center text-secondary mt-5">No messages yet.</div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`d-flex mb-2 ${msg.sender === user_id ? "justify-content-end" : "justify-content-start"}`}
            >
              <div
                className={`p-2 rounded-3 shadow-sm ${msg.sender === user_id
                  ? "bg-primary text-white"
                  : "bg-light border text-dark"
                }`}
                style={{ maxWidth: "70%" }}
              >
                <div className="fw-bold small mb-1">{msg.sender}</div>
                <div>{msg.content}</div>
                {msg.timestamp && (
                  <div className="text-end small text-secondary">{msg.timestamp}</div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <div className="card-footer bg-white border-0">
          <form
            className="d-flex gap-2"
            onSubmit={e => {
              e.preventDefault();
              send();
            }}
          >
            <input
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              type="submit"
              className="btn btn-primary fw-semibold"
              disabled={input.trim() === ""}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;