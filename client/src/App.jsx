
import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "./socket/socket";
import socket from "./socket/socket";
import { uploadFile } from "./utils/uploadFile";
import EmojiPicker from "emoji-picker-react";

function App() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
    setTyping(true);
  };
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [recipient, setRecipient] = useState(null); // For private messaging
  const messagesEndRef = useRef(null);

  const {
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  } = useSocket();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleJoin = () => {
    if (username.trim()) {
      connect(username);
      setJoined(true);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    let messageContent = input;
    let fileUrl = null;
    let fileName = null;
    if (file) {
      try {
        const res = await uploadFile(file);
        fileUrl = res.fileUrl;
        fileName = res.originalName;
      } catch (err) {
        alert('File upload failed');
        return;
      }
    }
    if (messageContent.trim() || fileUrl) {
      const msg = fileUrl
        ? `${messageContent}${messageContent ? ' ' : ''}[file]${fileUrl}|${fileName}`
        : messageContent;
      if (recipient) {
        sendPrivateMessage(recipient.id, msg);
      } else {
        sendMessage(msg);
      }
      setInput("");
      setFile(null);
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Socket.io Chat</h1>
      {!joined ? (
        <div className="flex flex-col items-center gap-2">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleJoin}
          >
            Join Chat
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl">
          <div className="mb-2 text-sm text-gray-600">
            Status: {isConnected ? "Connected" : "Disconnected"}
          </div>
          <div className="mb-2">
            <strong>Users Online:</strong>
            <ul className="flex flex-wrap gap-2">
              {users.map((user) => (
                <li key={user.id} className={`bg-gray-200 px-2 py-1 rounded cursor-pointer ${recipient && recipient.id === user.id ? 'bg-blue-300' : ''}`}
                  onClick={() => setRecipient(user.id !== socket.id ? user : null)}
                  title={user.id === socket.id ? 'You' : 'Click to send private message'}
                >
                  {user.username}
                  {user.id === socket.id && ' (You)'}
                  {recipient && recipient.id === user.id && ' (Private)'}
                </li>
              ))}
            </ul>
            {recipient && (
              <div className="text-xs text-blue-600 mt-1">
                Sending private message to: <strong>{recipient.username}</strong> <button className="ml-2 text-red-500" onClick={() => setRecipient(null)}>Cancel</button>
              </div>
            )}
          </div>
          <div className="bg-white border rounded p-4 h-64 overflow-y-auto mb-2">
            <ul>
              {messages.map((msg) => {
                // Check for file attachment in message
                let fileBlock = null;
                let text = msg.message;
                if (msg.message && msg.message.includes('[file]')) {
                  const [main, filePart] = msg.message.split('[file]');
                  if (filePart) {
                    const [url, name] = filePart.split('|');
                    if (url) {
                      if (url.match(/\.(jpg|jpeg|png|gif)$/i)) {
                        fileBlock = <img src={url} alt={name || 'file'} className="max-w-xs max-h-40 mt-1 border rounded" />;
                      } else {
                        fileBlock = <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{name || 'Download file'}</a>;
                      }
                    }
                    text = main;
                  }
                }
                return (
                  <li key={msg.id} className={msg.system ? "text-gray-500 italic" : msg.isPrivate ? "text-purple-600" : ""}>
                    {msg.system
                      ? msg.message
                      : <>
                          {msg.sender || "Anonymous"}{msg.isPrivate ? " (private)" : ""}: {text}
                          {fileBlock && <div>{fileBlock}</div>}
                        </>
                    }
                  </li>
                );
              })}
              <div ref={messagesEndRef} />
            </ul>
          </div>
          <form className="flex gap-2 items-center" onSubmit={handleSend}>
            <button
              type="button"
              className="px-2 text-xl"
              onClick={() => setShowEmoji((v) => !v)}
              title="Add emoji"
            >
              😊
            </button>
            {showEmoji && (
              <div className="absolute z-10 mt-32 ml-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} height={350} width={300} />
              </div>
            )}
            <input
              className="flex-1 border p-2 rounded"
              type="text"
              placeholder={recipient ? `Message @${recipient.username}...` : "Type a message..."}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setTyping(!!e.target.value);
              }}
              onBlur={() => setTyping(false)}
            />
            <input
              type="file"
              className="border rounded p-1"
              onChange={e => setFile(e.target.files[0])}
              accept="image/*,application/pdf,.doc,.docx,.txt,.zip,.rar"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Send
            </button>
          </form>
          {typingUsers.length > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              Typing: {typingUsers.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
