import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(request: Request) {
  const { url } = await request.json();

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });

    const $ = cheerio.load(data);
    const content: string[] = [];

    // Try scraping common text elements
    $("h1, h2, p").each((_, el) => {
      const text = $(el).text().trim();
      if (text) content.push(text);
    });

    console.log("Scraped Content:", content); // Debug log
    if (content.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No meaningful content found on the website.",
      });
    }

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Error during crawling:", error);
    return NextResponse.json(
      { success: false, message: "Failed to crawl website." },
      { status: 500 }
    );
  }
}
