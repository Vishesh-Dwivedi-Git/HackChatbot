'use client'

import { useChat } from 'ai/react'
import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles } from 'lucide-react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      setIsTyping(true)
      handleSubmit(e).finally(() => setIsTyping(false))
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-gray-100 shadow-2xl border border-gray-700 rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-700 bg-gray-900 p-6">
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <Sparkles className="inline-block mr-2 text-purple-400" />
            Ask me anything related to Mlops , Aiml , Mlflow
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[500px] pr-4 overflow-y-auto">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 mb-4 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
                    <Bot size={18} className="text-gray-100" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <p className="text-sm">{m.content}</p>
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center shadow-lg">
                    <User size={18} className="text-gray-100" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
                  <Bot size={18} className="text-gray-100" />
                </div>
                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg shadow-md">
                  <div className="typing-indicator space-x-1">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t border-gray-700 p-6 bg-gray-900">
          <form onSubmit={handleFormSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow bg-gray-800 text-gray-100 border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-full px-4 py-2"
            />
            <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-4 py-2 transition-all duration-200 ease-in-out transform hover:scale-105">
              <Send size={18} />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}