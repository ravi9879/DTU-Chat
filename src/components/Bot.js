import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import Url from "../stores/Url";

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
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
          <div className="mt-4 fw-semibold text-primary fs-5">
            Please wait...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: 440,
          maxWidth: "100%",
          minHeight: 600,
          borderRadius: 28,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        {/* Header */}
        <div
          className="card-header bg-success text-white d-flex justify-content-between align-items-center"
          style={{
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
            boxShadow: "0 2px 8px rgba(67,233,123,0.08)",
          }}
        >
          <div className="d-flex align-items-center gap-2"> 
            <span className="fw-bold fs-4" style={{ letterSpacing: 1 }}>
              Smart Chat Bot
            </span>
          </div>
          <button
            onClick={clearChats}
            className="btn btn-danger btn-sm fw-semibold shadow-sm"
            title="Clear Chats"
            style={{ borderRadius: 16, padding: "4px 14px" }}
          >
            <i className="bi bi-trash"></i> Clear
          </button>
        </div>
        {/* Chat messages */}
        <div
          className="card-body overflow-auto px-4 py-3"
          style={{
            height: 400,
            background: "rgba(248,250,252,0.7)",
            borderBottom: "1px solid #e0eafc",
          }}
        >
          {messages.length === 0 && (
            <div className="text-center text-secondary mt-5">
              <i className="bi bi-robot fs-1 mb-2 d-block"></i>
              <span>No messages yet. Start the conversation!</span>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`d-flex mb-3 ${
                msg.sender === user_id
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-3 rounded-4 shadow-sm position-relative ${
                  msg.sender === user_id
                    ? "bg-success text-white"
                    : "bg-white border text-dark"
                }`}
                style={{
                  maxWidth: "75%",
                  borderBottomRightRadius: msg.sender === user_id ? 0 : 24,
                  borderBottomLeftRadius: msg.sender === user_id ? 24 : 0,
                  boxShadow: "0 2px 8px rgba(67,233,123,0.08)",
                  fontSize: 15,
                }}
              >
                <div className="fw-bold small mb-1" style={{ opacity: 0.85 }}>
                  {msg.sender === user_id ? (
                    "You"
                  ) : (
                    <span>
                      <i className="bi bi-robot"></i> Bot
                    </span>
                  )}
                </div> 
                <div style={{ wordBreak: "break-word" }}>{msg.content}</div>
                {msg.timestamp && (
                  <div className="text-end small">{msg.timestamp}</div>
                )}
                {msg.sender !== user_id && (
                  <span
                    className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-info"
                    style={{ fontSize: 10, left: "-10px", top: "-10px" }}
                  >
                    Bot
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <div
          className="card-footer bg-white border-0"
          style={{
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 -2px 8px rgba(67,233,123,0.04)",
          }}
        >
          <form
            className="d-flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              className="form-control rounded-pill px-3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                background: "#f1f5f9",
                border: "none",
                boxShadow: "0 1px 4px rgba(67,233,123,0.07)",
                fontSize: 16,
              }}
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-success fw-semibold px-4 rounded-pill"
              disabled={input.trim() === ""}
              style={{
                fontSize: 16,
                boxShadow: "0 2px 8px rgba(67,233,123,0.08)",
                letterSpacing: 1,
              }}
            >
              <i className="bi bi-send"></i> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
