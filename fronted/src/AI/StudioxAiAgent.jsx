// src/pages/TechQvAi.jsx
import { Icons } from "../../svg/Icons";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import socket from "../socket/socket";

// import dotenv from "dotenv";
// dotenv.config();

const backend_origin = "http://localhost:5000";
// alert(backend_origin)
// ||"https://photoshootstudio-backend.onrender.com"
// const socket = io("http://localhost:5000");
// adjust port if needed

const StudioxAiAgent = () => {
  const [aitoggle, setaitoggle] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [llmModel, setLlmModel] = useState(false);
  const chatRef = useRef(null);

  const handelAiToggleBtn = () => setaitoggle(!aitoggle);
  const handelModel = async () => setLlmModel((prev) => !prev);

  useEffect(() => {
    socket.emit("changeModel", llmModel, (res) => {
      console.log(res);
    });
  }, [llmModel]);

  useEffect(() => {
    const handleMessage = (msg) => {
      alert(msg);
      setMessages((prev) => [...prev, { sender: "AI", text: msg }]);
      scrollToBottom();
    };

    const handleModelChange = async (data) => {
      console.log("Model change triggered by server:", data);
      await handelModel();
    };

    socket.on("messageFromServer", handleMessage);
    socket.on("servertriggerToChangeModel", handleModelChange);

    return () => {
      socket.off("messageFromServer", handleMessage);
      socket.off("servertriggerToChangeModel", handleModelChange);
    };
  }, []);

  //   let defaultState = {};
  //   const [state, setState] = useState(defaultState);
  //   useEffect(() => {
  //     const io = new socketServer(socket, state, setState, defaultState);
  //     io.start();
  //   }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    socket.emit("messageFromClient", input);
    setInput("");
    scrollToBottom();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <>
      {!aitoggle && (
        <div
          className="absolute bottom-2 right-4 sm:right-5 z-[1000] backdrop-blur-[10px] shadow-sm border-2 border-pink-200/50 p-3 rounded-full flex gap-2 text-white font-semibold text-[15px] cursor-pointer bg-gradient-to-r from-[#ff6831b0]/50 to-[#00a6ffb0]/50 scale-[70%] hover:scale-[100%] transition-all duration-500 animate-pulse"
          onClick={handelAiToggleBtn}
        >
          <Icons icon="AI" color="blue" />
          <span className="text-blue-950 font-bold font-sans">
            AI Assistance
          </span>
        </div>
      )}

      {aitoggle && (
        <div className="absolute bottom-5 right-4 sm:right-5 w-[90%] sm:w-[80%] max-w-[500px] h-[85%] max-h-[700px] rounded-2xl p-0 z-50 backdrop-blur-[5px] flex flex-col bg-gray-50/50 shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600/40 p-4 flex items-center justify-between text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-purple-600">
                <Icons icon="AI" color="purple" />
              </div>
              <div>
                <h1 className="text-purple-900 font-mono font-extrabold text-[15px]">
                  TechQv AI
                </h1>
                <div className="flex items-center gap-1 text-[10px] opacity-90">
                  <span className="scale-[70%]">
                    <Icons icon="AI" color="green" />
                  </span>
                  <span className="text-blue-950 font-semibold text-[9px]">
                    Developed by Dinesh Verma
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-x-[10px] sm:gap-x-[20px] h-full w-fit items-center justify-between">
              <div className="cursor-pointer" onClick={handelModel}>
                {llmModel ? (
                  <span className="flex flex-col items-center">
                    <Icons icon="leftToggle" color="#940606" />
                    <span className="text-[#940606] font-extrabold text-[10px] select-none hidden md:block">
                      Helping model
                    </span>
                  </span>
                ) : (
                  <span className="flex flex-col items-center">
                    <Icons icon="rightToggle" color="#03672b" />
                    <span className="text-[#03672b] font-extrabold text-[10px] select-none hidden md:block">
                      info/chat model
                    </span>
                  </span>
                )}
              </div>
              <span
                className="scale-125 hover:scale-[150%] cursor-pointer"
                onClick={handelAiToggleBtn}
              >
                <Icons icon="x" color="white" />
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2"
            id="chatScreen"
            ref={chatRef}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  msg.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "AI" && (
                  <div className="w-8 h-8 rounded-full bg-purple-900/20 p-[6px] border border-gray-200 flex items-center justify-center text-purple-600 shrink-0 mt-1">
                    <Icons icon="AI" color="purple" />
                  </div>
                )}
                <div className="max-w-[80%] space-y-1">
                  <p className="text-[10px] text-gray-400 ml-1">{msg.sender}</p>
                  <div
                    className={`p-3 rounded-2xl shadow-sm text-sm ${
                      msg.sender === "You"
                        ? "bg-purple-300 text-gray-800 rounded-tr-2xl rounded-bl-2xl"
                        : "bg-white/70 text-gray-700 rounded-tl-2xl rounded-br-2xl overflow-x-auto"
                    }`}
                  >
                    {/* ✅ AI Markdown Rendering */}
                    {msg.sender === "AI" ? (
                      <div className="markdown-wrapper">
                        {msg.text.includes("```") ||
                        msg.text.includes(
                          "|" ||
                            msg.text.includes("**") ||
                            msg.text.includes("[") ||
                            (msg.text.includes("(") &&
                              msg.text.includes(")")) ||
                            msg.text.includes("]"),
                        ) ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            skipHtml={false}
                            components={{
                              a: ({ node, ...props }) => (
                                <a
                                  {...props}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                />
                              ),
                              code: ({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) => {
                                if (inline) {
                                  return (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  );
                                }
                                const codeText = String(children).replace(
                                  /\n$/,
                                  "",
                                );
                                const copyToClipboard = () =>
                                  navigator.clipboard.writeText(codeText);

                                return (
                                  <div className="relative group">
                                    <pre
                                      className={`${className} max-w-full overflow-x-auto p-2 rounded-md bg-gray-100/50 backdrop-blur-[5px]`}
                                      {...props}
                                    >
                                      <code>{children}</code>
                                    </pre>
                                    <button
                                      onClick={copyToClipboard}
                                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-black/50 text-white/60 text-xs px-2 py-1 rounded hover:bg-purple-700/50 transition"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                );
                              },
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        ) : (
                          <span>{msg.text}</span>
                        )}
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-[#19f2eb82] to-[#ee2ae78a] flex gap-2 backdrop-blur-[1px]">
            <input
              type="text"
              placeholder="Type a message..."
              className="outline-none w-full bg-gray-100/50 text-sm p-2 rounded-md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="bg-purple-600/70 text-white px-2 py-2 rounded-full"
              onClick={sendMessage}
            >
              <Icons icon="send" color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudioxAiAgent;
