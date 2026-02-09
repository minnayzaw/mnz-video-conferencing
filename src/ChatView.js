import { useState,useEffect } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import dayjs from 'dayjs';

function ChatView(props) {
  const [message, setMessage] = useState("");
  // Subscribe to the "CHAT" topic and get the publish method and messages array
  const { publish, messages } = usePubSub("CHAT");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Publish the message to the "CHAT" topic
      publish(message, { persist: true }); // 'persist: true' stores the message for new joiners
      setMessage(""); // Clear the input field
      
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      {messages.filter((value, index, self) => {
        // Return the first index where the object's id matches the current object's id
        return index === self.findIndex((obj) => obj.id === value.id);
      }).map((msg, index) => (
      <div className="chat-contents">
          <div className="chat-content-wrap">
              <div className="chat-wrap-inner">
                  <div className="chat-box">
                      <div className="chats">
                            <div className="chat chat-left" key={index}>
                                <div className="chat-avatar">
                                    <span>{msg.senderName}</span>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-bubble">
                                      <div className="chat-content">
                                            <p>{msg.message}</p>
                                            <span className="chat-time">{dayjs(msg.timestamp).format("YYYY/MM/DD hh:mm:ss")}</span>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          ))}                 
      <div className="message-area">
          <div className="input-group">
              <textarea className="form-control" placeholder="Type message..." onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
                <span className="input-group-append">
							    <button
                    className="btn btn-primary" 
                    type="button" 
                    onClick={handleSendMessage}
                    placeholder="Type a message..."
                  >
                    <i className="fa fa-send"></i>
                  </button>
								</span>
            </div>
        </div>
    </div>
  );
}
export default ChatView;