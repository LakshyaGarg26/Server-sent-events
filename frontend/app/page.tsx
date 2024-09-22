"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/stream");
    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    eventSource.onerror = (err) => {
      console.error("Error: ", err);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Server-Sent Events Example</h1>
      <div className="bg-white p-4 rounded shadow-md w-96">
        {messages.map((msg, index) => (
          <p key={index} className="text-gray-700 mb-2">{msg}</p>
        ))}
      </div>
    </div>
  );
}
