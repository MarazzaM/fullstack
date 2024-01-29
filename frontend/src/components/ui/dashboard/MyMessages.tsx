"use client"
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/store/store";

export default function ScrollAreaMsg() {
  const user = useStore.getState().user;
  const [messages, setMessages] = useState([]);
  const backend = process.env.NEXT_PUBLIC_NEXTBACKEND_URL;
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${backend}/chat/messages/${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };

    fetchMessages();
  }, [user]);

  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 font-semibold leading-none tracking-tight">This are your messages!</h4>
        {messages.length === 0 ? (
          <div className="text-sm text-gray-500">No messages yet!.</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex flex-col space-y-1">
              <div className="text-sm">{message.content}</div>
              <div className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</div>
              <Separator className="my-2" />
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
