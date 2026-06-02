import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const templatePath = path.join(process.cwd(), "src", "data", "social-copy-templates.json");
  
  try {
    const rawData = await fs.readFile(templatePath, "utf8");
    const templates = JSON.parse(rawData);
    
    // Validate structure before returning
    if (!templates.instagram_bio || !templates.whatsapp_sms) {
      return NextResponse.json(
        { error: "Invalid template data", details: "Missing required sections" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    return NextResponse.json(templates, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=600, public",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Handle path resolution errors specifically
    if (errorMessage.includes("ENOENT") || errorMessage.includes("not found")) {
      return NextResponse.json(
        { 
          error: "Template file not found", 
          details: "social-copy-templates.json is missing or in wrong location" 
        },
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to load templates", details: errorMessage },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
