import React, { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, user, room }) => {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [messafeList, setMessageList] = React.useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: user,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("message_received", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header"></div>
      <p>live chats</p>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
        {messafeList.map((messageContent) => {
          return (
            <div
              className="message"
              id={user === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="author">{messageContent.author}</p>
                  <p id="time"> {messageContent.time}</p>
                </div>
              </div>
            </div>
          );
        })}

        </ScrollToBottom>
      
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="HEy..."
          value={currentMessage}
          onChange={(e) =>  setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}> &#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
