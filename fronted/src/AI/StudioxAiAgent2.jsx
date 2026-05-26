// src/pages/TechQvAi.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import socket from "../socket/socket";
const TechQvAi = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      text: "✨ Welcome to StudioX AI Assistant",
    },
  ]);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    const handleMessage = (msg) => {
      setTyping(false);
      setInputDisabled(false);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "AI",
          text: msg,
        },
      ]);
    };

    socket.on("messageFromServer", handleMessage);

    return () => {
      socket.off("messageFromServer", handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "You",
        text: msg,
      },
    ]);

    socket.emit("messageFromClient", msg);

    setInput("");
    setTyping(true);
    setInputDisabled(true);
  };

  return (
    <>
      {/* FLOAT BUTTON */}

      {!open && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setOpen(true)}
          className="
            fixed bottom-5 right-5 z-50
            px-5 py-4 rounded-full
            bg-white/10 backdrop-blur-2xl
            border border-white/10
            shadow-2xl text-white
            flex items-center gap-3
          "
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <FaRobot />
          </div>

          <div className="text-left">
            <h1 className="font-bold text-sm">StudioX AI</h1>
            <p className="text-xs text-white/60">Smart Assistant</p>
          </div>
        </motion.button>
      )}

      {/* CHAT WINDOW */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="
              fixed bottom-5 right-[12px] z-50
              w-[95%] sm:w-[420px]
              h-[85vh]
              rounded-[5px]
              overflow-hidden
              border border-white/10
              bg-white/[0.08]
              backdrop-blur-3xl
              shadow-2xl
              flex flex-col
            "
          >
            {/* HEADER */}

            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <FaRobot />
                </div>

                <div>
                  <h2 className="font-bold">StudioX AI Aggent</h2>
                  <p className="text-xs text-green-400">● Online</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-white text-xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* CHAT */}

            <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[85%]
                      px-4 py-3 rounded-[25px]
                      backdrop-blur-xl border
                      ${
                        msg.sender === "You"
                          ? "bg-pink-500/30 border-pink-400/20 text-white"
                          : "bg-white/10 border-white/10 text-white/90"
                      }
                    `}
                  >
                    <p className="text-xs text-white/40 mb-2">{msg.sender}</p>

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="text-white/60 text-sm animate-pulse">
                  AI Agent planing and taking action to response... <br />{" "}
                  <small>
                    <i>It may take times</i>
                  </small>
                </div>
              )}
            </div>

            {/* INPUT */}

            <div className="p-2 border-t border-white/10 bg-black/10">
              <div className="flex gap-3 bg-white/10 rounded-[25px] p-3 border border-white/10 max-h-[50px] items-center">
                <textarea
                  disabled={inputDisabled}
                  rows={0}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask anything..."
                  className="flex-1 flex pt-5  items-center bg-transparent resize-none outline-none text-white placeholder:text-white/40"
                />

                <button
                  disabled={inputDisabled}
                  onClick={sendMessage}
                  className="w-12 h-8 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TechQvAi;
