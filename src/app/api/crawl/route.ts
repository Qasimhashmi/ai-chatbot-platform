import { NextResponse } from "next/server";
import axios from "axios";
// Correct import for Cheerio
import * as cheerio from "cheerio";

export async function POST(request: Request) {
  const { url } = await request.json();

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract basic content (e.g., headings and paragraphs)
    const content: string[] = [];
    $("h1, h2, p").each((_, el) => {
      content.push($(el).text());
    });
    console.log(content);

    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to crawl website" }, { status: 500 });
  }

}