import React from "react";
import "./App.css";
import { io } from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3000");

function App() {
  const [user, setUser] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [showChat, setShowChat] = React.useState(false);

  const joinRoom = () => {
    if (room !== "" && user !== "") {
      socket.emit("joinRoom", { room: room, user: user });
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="Say something"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room  ID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}> Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} user={user} room={room} />
      )}
    </div>
  );
}

export default App;
