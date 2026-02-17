import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    // Try to list available models
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ 
        error: "Failed to fetch models", 
        details: error,
        status: response.status 
      }, { status: 400 });
    }

    const data = await response.json();
    
    // Filter for models that support generateContent
    const generateContentModels = data.models.filter((model: any) => 
      model.supportedGenerationMethods?.includes("generateContent")
    );

    return NextResponse.json({
      totalModels: data.models.length,
      generateContentModels: generateContentModels.length,
      models: generateContentModels.map((model: any) => ({
        name: model.name,
        displayName: model.displayName,
        description: model.description,
        version: model.version
      }))
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Debug failed" },
      { status: 500 }
    );
  }
}
