import { useState, useEffect, useRef } from "react";
import Terminal from "./Terminal";
import TypingText from "./TypingText";

const ChatLog = () => {
  const [messages, setMessages] = useState<
    Array<{ type: "system" | "user"; text: string }>
  >([
    { type: "system", text: "Establishing secure connection..." },
    {
      type: "system",
      text: "Connection established. Welcome to the chat system.",
    },
    { type: "system", text: "How can I assist you today?" },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedResponses = [
    "I'm a developer with a passion for creating innovative solutions.",
    "I specialize in machine learning development using modern technologies.",
    "Feel free to explore my projects to see my work.",
    "You can contact me through the contact section if you'd like to collaborate.",
    "I'm always open to new opportunities and challenges.",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    // Add system response after a delay
    setTimeout(() => {
      const randomResponse =
        predefinedResponses[
          Math.floor(Math.random() * predefinedResponses.length)
        ];
      setMessages((prev) => [
        ...prev,
        { type: "system", text: randomResponse },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Terminal title="CHAT SYSTEM" className="h-full">
      <div className="flex flex-col h-[300px]">
        <div className="flex-1 overflow-y-auto mb-2 p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 ${message.type === "user" ? "text-right" : ""}`}
            >
              <div
                className={`inline-block px-3 py-1 rounded text-sm ${
                  message.type === "user"
                    ? "bg-terminal-green/20 border border-terminal-green text-terminal-green"
                    : "bg-transparent text-terminal-green"
                }`}
              >
                {index === messages.length - 1 && message.type === "system" ? (
                  <TypingText text={message.text} speed={20} />
                ) : (
                  <div>{message.text}</div>
                )}
              </div>
              <div className="text-xs text-terminal-green-dim mt-1">
                {message.type === "user" ? "YOU" : "SYSTEM"} |{" "}
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="animate-pulse text-terminal-green">
              SYSTEM is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-auto border-t border-terminal-green-dim pt-2"
        >
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="terminal-input flex-1"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="ml-2 terminal-input hover:bg-terminal-glow/30"
              disabled={isTyping}
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </Terminal>
  );
};

export default ChatLog;
