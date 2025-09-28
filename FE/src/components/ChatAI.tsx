import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Mic, MicOff, Send, Settings, Trash2, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Type definitions for Speech Recognition
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [key: number]: {
      length: number;
      [key: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
  };
}

interface SpeechRecognitionAPI {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

interface WindowWithSpeechRecognition extends Window {
  webkitSpeechRecognition?: new () => SpeechRecognitionAPI;
  SpeechRecognition?: new () => SpeechRecognitionAPI;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface Character {
  value: string;
  name: string;
  desc: string;
  icon: string;
}

const ChatAI = () => {
  // Character data with icons and descriptions adapted to Vietnamese philosophy theme
  const characters: Character[] = [
    {
      value: "default",
      name: "Mặc định",
      desc: "Trợ lý AI tiêu chuẩn",
      icon: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2-3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z",
    },
    {
      value: "Socrates",
      name: "Socrates",
      desc: "Triết gia đặt câu hỏi",
      icon: "M12 2C13.1 2 14 2.9 14 4S13.1 6 12 6 10 5.1 10 4 10.9 2 12 2M21 9V7L15 1H5C3.89 1 3 1.89 3 3V21A2 2 0 0 0 5 23H19A2 2 0 0 0 21 21V9M19 9H14L19 14V9Z",
    },
    {
      value: "Marx",
      name: "Karl Marx",
      desc: "Phê phán chủ nghĩa tư bản",
      icon: "M12 2l3 6h-6l3-6zM10 20l-3-6h6l-3 6z",
    },
    {
      value: "HoChiMinh",
      name: "Hồ Chí Minh",
      desc: "Tư tưởng Hồ Chí Minh",
      icon: "M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z",
    },
  ];

  // State management
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Xin chào! Tôi là trợ lý AI tiếng Việt của bạn. Bạn có thể nhắn tin hoặc nói chuyện với tôi bằng giọng nói. Tôi có thể giúp gì cho bạn?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character>(characters[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognitionAPI | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const windowWithSR = window as WindowWithSpeechRecognition;
      const SpeechRecognition = windowWithSR.webkitSpeechRecognition || windowWithSR.SpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.lang = "vi-VN";
        recognition.current.continuous = true;
        recognition.current.interimResults = true;

        recognition.current.onstart = () => {
          setIsListening(true);
        };

        recognition.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setInputMessage((prev) => prev + finalTranscript);
          }
        };

        recognition.current.onend = () => {
          setIsListening(false);
        };

        recognition.current.onerror = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString() + "_user",
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call the API (adapted from original HTML template)
      const queryParams = `message=${encodeURIComponent(inputMessage)}&character=${encodeURIComponent(currentCharacter.value)}`;
      const response = await fetch(`http://localhost:8080/chat?${queryParams}`);

      if (!response.ok) throw new Error("API error");
      const aiResponse = await response.text();

      const aiMessage: Message = {
        id: Date.now().toString() + "_ai",
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Text-to-speech
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.lang = "vi-VN";
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const fallbackMessage: Message = {
        id: Date.now().toString() + "_ai",
        content: "Xin lỗi, tôi gặp lỗi khi xử lý. Hãy thử lại nhé!",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    }

    setIsLoading(false);
  };

  const toggleListening = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
    } else {
      setInputMessage(""); // Clear input when starting voice recognition
      recognition.current.start();
    }
  };

  const clearHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8080/chat/history`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages([
          {
            id: "1",
            content: "Lịch sử trò chuyện đã được xóa. Hôm nay tôi có thể giúp gì cho bạn?",
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Clear history failed:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[80vh] flex flex-col shadow-2xl border-amber-200">
          <CardHeader className="border-b bg-gradient-to-r from-amber-100 to-yellow-100 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">AI</span>
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-amber-900">Trợ lý AI Tiếng Việt</CardTitle>
                  <p className="text-sm text-amber-700">Sẵn sàng trò chuyện • Hỗ trợ giọng nói</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Trực tuyến
                </Badge>
                <Button onClick={clearHistory} variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Xóa lịch sử
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slide-in`}>
                    {message.sender === "ai" && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-amber-200 text-amber-800">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`max-w-[70%] ${message.sender === "user" ? "order-1" : ""}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                          message.sender === "user"
                            ? "bg-amber-600 text-white rounded-br-md"
                            : "bg-white border border-amber-200 text-amber-900 rounded-bl-md"
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                      </div>
                      <p className="text-xs text-amber-600 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="w-8 h-8 mt-1 order-2">
                        <AvatarFallback className="bg-blue-200 text-blue-800">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-amber-200 text-amber-800">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border border-amber-200 rounded-2xl px-4 py-3 rounded-bl-md">
                      <div className="flex items-center gap-2 text-amber-600">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                        <span className="text-sm">Đang suy nghĩ...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-amber-200 bg-amber-50/50 p-4">
                {/* Listening Status */}
                {isListening && (
                  <div className="mb-3 flex items-center justify-center">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-red-100 border border-red-300 rounded-full">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-700 font-medium">Đang nghe...</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  {/* Character Dropdown */}
                  <div className="relative">
                    <Button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      variant="outline"
                      size="sm"
                      className={`border-amber-300 text-amber-700 hover:bg-amber-50 ${currentCharacter.value !== "default" ? "bg-amber-100" : ""}`}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      {currentCharacter.name}
                    </Button>

                    {isDropdownOpen && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-amber-200 rounded-lg shadow-lg z-10">
                        <div className="p-2 space-y-1">
                          {characters.map((char) => (
                            <button
                              key={char.value}
                              onClick={() => {
                                setCurrentCharacter(char);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left p-2 rounded-md hover:bg-amber-50 ${
                                currentCharacter.value === char.value ? "bg-amber-100" : ""
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <svg className="w-4 h-4 mt-0.5 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
                                  <path d={char.icon} />
                                </svg>
                                <div>
                                  <div className="font-medium text-sm text-amber-900">{char.name}</div>
                                  <div className="text-xs text-amber-600">{char.desc}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Nhập tin nhắn hoặc sử dụng mic..."
                      className="w-full resize-none rounded-xl border border-amber-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                      rows={1}
                      style={{ minHeight: "44px", maxHeight: "120px" }}
                    />
                  </div>

                  {/* Mic Button */}
                  {recognition.current && (
                    <Button
                      onClick={toggleListening}
                      variant="outline"
                      size="icon"
                      className={`border-amber-300 hover:bg-amber-50 ${
                        isListening ? "bg-red-100 border-red-300 text-red-700 animate-pulse" : "text-amber-700"
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  )}

                  {/* Send Button */}
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-xs text-amber-600 mt-2">Nhấn Enter để gửi, Shift+Enter để xuống dòng</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatAI;
