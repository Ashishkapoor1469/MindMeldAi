"use client"

import { useState, useCallback } from "react"
import type { Message, Conversation, ChatState } from "@/types/chat"

export function useChat() {
  const [state, setState] = useState<ChatState>({
    conversations: [],
    currentConversationId: null,
    isLoading: false,
    isTyping: false,
  })

  // ✅ safer random ID generator
  const generateId = () => Math.random().toString(36).substring(2, 11)

  // ✅ create new conversation
  const createNewConversation = useCallback((firstMessage?: string): Conversation => {
    const conversation: Conversation = {
      id: generateId(),
      title: firstMessage
        ? firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "")
        : "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setState((prev) => ({
      ...prev,
      conversations: [conversation, ...prev.conversations],
      currentConversationId: conversation.id,
    }))

    return conversation
  }, [])

  // ✅ send message function
  const sendMessage = useCallback(
    async (content: string) => {
      setState((prev) => {
        let conversationId = prev.currentConversationId

        // if no conversation exists → create one
        if (!conversationId) {
          const newConv: Conversation = {
            id: generateId(),
            title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          conversationId = newConv.id
          return {
            ...prev,
            conversations: [newConv, ...prev.conversations],
            currentConversationId: newConv.id,
            isTyping: true,
          }
        }

        // add user message
        const userMessage: Message = {
          id: generateId(),
          content,
          role: "user",
          timestamp: new Date(),
        }

        return {
          ...prev,
          conversations: prev.conversations.map((conv) =>
            conv.id === conversationId
              ? { ...conv, messages: [...conv.messages, userMessage], updatedAt: new Date() }
              : conv
          ),
          isTyping: true,
        }
      })

      try {
        // ✅ use env variable instead of hardcoded localhost
        const API_URL =  "https://mindmidbackend.vercel.app"

        const res = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        })

        const data = await res.json()
        if (data.error) throw new Error(data.error)

        const aiMessage: Message = {
          id: generateId(),
          content: data.text,
          role: "assistant",
          timestamp: new Date(),
        }

        setState((prev) => ({
          ...prev,
          conversations: prev.conversations.map((conv) =>
            conv.id === prev.currentConversationId
              ? { ...conv, messages: [...conv.messages, aiMessage], updatedAt: new Date() }
              : conv
          ),
          isTyping: false,
        }))
      } catch (err: any) {
        console.error("Chat error:", err)

        const errorMessage: Message = {
          id: generateId(),
          content: "⚠️ Something went wrong. Please try again.",
          role: "assistant",
          timestamp: new Date(),
        }

        setState((prev) => ({
          ...prev,
          conversations: prev.conversations.map((conv) =>
            conv.id === prev.currentConversationId
              ? { ...conv, messages: [...conv.messages, errorMessage], updatedAt: new Date() }
              : conv
          ),
          isTyping: false,
        }))
      }
    },
    [createNewConversation]
  )

  // ✅ get active conversation
  const getCurrentConversation = useCallback(() => {
    return state.conversations?.find((c) => c.id === state.currentConversationId) || null
  }, [state])

  return {
    ...state,
    sendMessage,
    createNewConversation,
    getCurrentConversation,
  }
}
