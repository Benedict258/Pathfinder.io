"use client";

import { Loader2, RefreshCw, Send } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { sendChatMessage, type ChatMessage, type PathRecommendation } from "@/lib/api";

export function OnboardingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<PathRecommendation[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      handleStartConversation();
    }
  }, []);

  async function handleStartConversation() {
    setIsLoading(true);
    setError("");

    try {
      const result = await sendChatMessage([
        { role: "user", content: "Hi, I want to find a tech career path." },
      ]);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.message },
      ]);

      if (result.done && result.recommendations) {
        setRecommendations(result.recommendations);
        setIsComplete(true);
      }
    } catch {
      setError("Could not reach the backend. Make sure the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || isComplete) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const result = await sendChatMessage(updatedMessages);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.message },
      ]);

      if (result.done && result.recommendations) {
        setRecommendations(result.recommendations);
        setIsComplete(true);
      }
    } catch {
      setError("Connection lost. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setMessages([]);
    setInput("");
    setRecommendations([]);
    setIsComplete(false);
    setError("");
    hasStartedRef.current = true;
    handleStartConversation();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-950">
            Pathfinder Chat
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            <RefreshCw className="size-3.5" />
            Start over
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ maxHeight: "420px" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-6 ${
                  msg.role === "user"
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-slate-100 px-4 py-3">
                <Loader2 className="size-4 animate-spin text-slate-500" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {!isComplete && (
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 px-5 py-4 flex gap-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response..."
              disabled={isLoading}
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white hover:bg-slate-800 disabled:bg-slate-300"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </button>
          </form>
        )}

        {error && (
          <div className="border-t border-red-200 bg-red-50 px-5 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}
      </div>

      <aside className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-base font-semibold text-slate-950">Recommended paths</h2>
        <div className="mt-5 space-y-4">
          {recommendations.length === 0 ? (
            <p className="text-sm leading-6 text-slate-600">
              Chat with Pathfinder to get your personalized tech path recommendations.
            </p>
          ) : (
            recommendations.map((item) => (
              <div key={item.slug} className="rounded-md border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-950">{item.title}</h3>
                  <span className="text-sm font-semibold text-emerald-700">{item.confidence}%</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
