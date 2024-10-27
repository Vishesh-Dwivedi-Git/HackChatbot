import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

// IMPORTANT: Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Initialize the Gemini model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Convert messages to Gemini format
  const geminiMessages = messages.map((message: Message) => ({
    role: message.role === 'user' ? 'user' : 'model',
    parts: [{ text: message.content }],
  }));

  // Start a chat session
  const chat = model.startChat({
    history: geminiMessages.slice(0, -1),
  });

  // Send the last user message and stream the response
  const result = await chat.sendMessageStream(geminiMessages[geminiMessages.length - 1].parts[0].text);

  // Convert the response to a readable stream
  const stream = GoogleGenerativeAIStream(result);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}