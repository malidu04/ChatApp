import React, { useState, useContext } from "react";
import { SocketContext } from "../SocketContext";

const JoinRoom = ({ setRoom }) => {
    const [username, setUsername] = useState("");
    const [room, setRoomName] = useState("");
    const socket = useContext(SocketContext);

    const joinRoom = () => {
        if (room !== "" && username !== "") {
            socket.emit("join_room", room);
            setRoom(room);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Join Room</h2>
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Enter a Room Name"
                    value={room}
                    onChange={(e) => setRoomName(e.target.value)}
                    style={styles.input}
                />
                <button onClick={joinRoom} style={styles.button}>
                    Join
                </button>
            </div>
        </div>
    );
};

export default JoinRoom;

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #25d366, #128c7e)", // WhatsApp-like gradient
        fontFamily: "'Roboto', sans-serif",
    },
    formContainer: {
        width: "90%",
        maxWidth: "400px",
        background: "white",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#128c7e",
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        border: "1px solid #ddd",
        borderRadius: "20px",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.2s",
    },
    button: {
        width: "100%",
        padding: "10px",
        border: "none",
        borderRadius: "20px",
        backgroundColor: "#25d366",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

// Add hover and focus effects for a polished look
Object.assign(styles.input, {
    focus: {
        borderColor: "#25d366",
    },
});

Object.assign(styles.button, {
    hover: {
        backgroundColor: "#128c7e",
    },
});
