import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, provider } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    let response;

    if (provider === "groq") {
      response = await callGroq(messages, apiKey);
    } else {
      return NextResponse.json({ error: "Only Groq AI is supported" }, { status: 400 });
    }
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: error?.message || "AI service failed" },
      { status: 500 }
    );
  }
}

async function callGroq(messages: any[], apiKey: string) {
  const systemPrompt = `You are an agentic AI assistant with access to API testing tools. You can:
1. Analyze data and provide insights
2. Help users test APIs using natural language  
3. Make HTTP requests to external APIs
4. Process and visualize data
5. Write and execute code snippets

IMPORTANT: When users want to test APIs, you MUST execute the actual API calls using these special commands:
- For setting URL: "url https://api.example.com/endpoint"
- For setting method: "method GET" or "method POST" etc.
- For setting body: "body {\"key\":\"value\"}"
- For executing: "run"

When users mention testing APIs, JSONPlaceholder, or any API endpoint, immediately set up the request and run it. Be proactive in making actual API calls, not just describing them.

Example workflow:
User: "Test the JSONPlaceholder API"
You: Set up URL, method, then run the actual request and show real results

Always execute real API calls when users ask about APIs. Don't just explain - DO IT.`;

  // Convert messages to Groq format (similar to OpenAI)
  const groqMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((msg: any) => ({
      role: msg.role,
      content: msg.text || msg.content
    }))
  ];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant", // Fast and reliable Groq model
      messages: groqMessages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${error}`);
  }

  const data = await response.json();
  return {
    message: data.choices[0].message.content,
    usage: data.usage
  };
}
