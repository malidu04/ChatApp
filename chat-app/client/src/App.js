import React, { useState } from "react";
import JoinRoom from "./Components/JoinRoom";
import Chat from "./Components/Chat";

function App() {
  const [room, setRoom] = useState("");


  return (
    <div>
      {room === "" ? (
        <JoinRoom setRoom={setRoom} />
      ) : (
        <Chat room={room} />
      )}
    </div>
  );
}

export default App;
