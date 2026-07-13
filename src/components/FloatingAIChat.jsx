import React, { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Bạn là "AI Trợ lý Hành trang" – chuyên gia về các chủ đề trong môn học Chủ nghĩa Xã hội Khoa học. 
Trả lời ngắn gọn, dễ hiểu bằng tiếng Việt, sử dụng emoji vừa phải. 
Chỉ trả lời các câu hỏi liên quan đến: Chủ nghĩa Xã hội, triết học Mác - Lênin, tư tưởng Hồ Chí Minh, lịch sử, văn hóa và các chủ đề liên quan.
Nếu câu hỏi ngoài phạm vi, lịch sự từ chối và gợi ý câu hỏi phù hợp.
Giữ câu trả lời dưới 150 từ để tiện đọc trên widget chat.`;

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const RATE_LIMIT_MS = 7000;

export default function FloatingAIChat() {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const chatMessagesEndRef = useRef(null);

  const callGemini = async (userMessage) => {
    if (!GEMINI_API_KEY) {
      return "⚠️ Hệ thống AI chưa được cấu hình (Thiếu API Key). Vui lòng liên hệ quản trị viên.";
    }

    const historyForApi = chatMessages.slice(-10).flatMap((m) => [{ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] }]);

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      {
        role: "model",
        parts: [
          { text: "Xin chào! Tôi là AI Trợ lý, sẵn sàng giúp bạn giải đáp các kiến thức. Hãy đặt câu hỏi nhé! 🤖" },
        ],
      },
      ...historyForApi,
      { role: "user", parts: [{ text: userMessage }] },
    ];

    try {
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });
      const data = await res.json();
      if (data.error) {
        return `⚠️ Lỗi: ${data.error.message || "API key không hợp lệ hoặc hết quota."}`;
      }
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại.";
    } catch (err) {
      return "⚠️ Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.";
    }
  };

  const handleSendChat = async () => {
    const msg = chatInput.trim();
    if (!msg || chatLoading) return;

    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < RATE_LIMIT_MS) {
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS - timeSinceLastRequest));
    }

    const userMsg = { role: "user", text: msg };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);
    setLastRequestTime(Date.now());

    const reply = await callGemini(msg);

    // Delay before showing response to simulate thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setChatMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    setChatLoading(false);
  };

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-body-md text-on-surface">
      {showChat && (
        <div className="mb-4 w-80 md:w-96 h-[500px] max-h-[80vh] bg-surface rounded-2xl shadow-2xl border border-outline-variant/60 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                🤖
              </div>
              <div>
                <p className="font-bold text-white text-sm">AI Trợ Lý</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <p className="text-xs text-white/80">Sẵn sàng hỗ trợ</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-low">
            {chatMessages.length === 0 && (
              <>
                <div className="bg-primary-container p-3 rounded-lg rounded-tl-none max-w-[85%] text-on-primary-container text-sm">
                  <p>👋 Xin chào! Tôi là AI Trợ lý, giúp bạn tìm hiểu kiến thức về môn học.</p>
                  <p className="mt-2">Hãy đặt câu hỏi hoặc chọn gợi ý bên dưới!</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Chủ nghĩa xã hội là gì?", "Thế nào là liên minh giai cấp?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => setChatInput(q)}
                      className="text-xs border border-primary text-primary px-3 py-1.5 rounded-full hover:bg-primary/5 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </>
            )}

            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-3 rounded-lg max-w-[85%] text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-surface border border-outline-variant text-on-surface rounded-bl-none"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-outline-variant p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-on-surface-variant">Đang suy nghĩ...</span>
                </div>
              </div>
            )}
            <div ref={chatMessagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-outline-variant bg-surface flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendChat();
                  }
                }}
                placeholder="Nhập câu hỏi..."
                disabled={chatLoading}
                className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors disabled:opacity-50 text-on-surface"
              />
              <button
                onClick={handleSendChat}
                disabled={chatLoading || !chatInput.trim()}
                className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
          showChat ? "bg-surface-variant text-on-surface-variant" : "bg-primary text-white"
        }`}
      >
        <span className="text-2xl">{showChat ? "✕" : "💬"}</span>
      </button>
    </div>
  );
}
