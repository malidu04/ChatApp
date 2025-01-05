import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../SocketContext";

const Chat = ({ room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const sendMessage = () => {
    if (message !== "") {
      const data = {
        room: room,
        message: message,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send_message", data);
      setMessages((list) => [...list, data]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);
 
  const returnToJoinRoom = () => {
    navigate("/");
  };

  return (
    <div style={styles.chatContainer}>
      <header style={styles.header}>
        <button onClick={returnToJoinRoom} style={styles.backButton}>
          ⬅
        </button>
        <h2 style={styles.roomName}>Room: {room}</h2>
      </header>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.isSender ? styles.sentMessageBubble : styles.receivedMessageBubble
            }
          >
            <p style={styles.messageText}>{msg.message}</p>
            <small style={styles.timestamp}>{msg.time}</small>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.inputField}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    height: "100vh",
    backgroundColor: "#ece5dd",
    fontFamily: "'Roboto', sans-serif",
    border: "1px solid #ccc",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#075e54",
    color: "white",
  },
  backButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "18px",
    marginRight: "10px",
    cursor: "pointer",
  },
  roomName: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sentMessageBubble: {
    alignSelf: "flex-end",
    maxWidth: "60%",
    backgroundColor: "#dcf8c6",
    color: "#000",
    padding: "10px",
    borderRadius: "10px",
    borderTopRightRadius: "0px",
    wordWrap: "break-word",
    fontSize: "14px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
  receivedMessageBubble: {
    alignSelf: "flex-start",
    maxWidth: "60%",
    backgroundColor: "#fff",
    color: "#000",
    padding: "10px",
    borderRadius: "10px",
    borderTopLeftRadius: "0px",
    wordWrap: "break-word",
    fontSize: "14px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
  messageText: {
    marginBottom: "5px",
  },
  timestamp: {
    fontSize: "10px",
    color: "#555",
    textAlign: "right",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    outline: "none",
    fontSize: "14px",
    marginRight: "10px",
    backgroundColor: "#f5f5f5",
  },
  sendButton: {
    backgroundColor: "#075e54",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
};
