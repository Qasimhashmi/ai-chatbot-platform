"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Crawl website
  const handleCrawl = async () => {
    setLoading(true);
    const response = await fetch("/api/crawl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    console.log(data); // Add this to debug the response
    setLoading(false);

    if (data.success) {
      setContent(data.content); // Ensure this is set
    } else {
      alert("Failed to crawl the website.");
    }
  };

  // Chatbot query
  const handleChat = async () => {
    setLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, content }),
    });

    const data = await response.json();
    setChatResponse(data.response);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>AI Chatbot Platform</h1>
        <p style={styles.subtitle}>
          Seamlessly integrate intelligent chatbots into your website.
        </p>
      </div>

      {/* Crawl Website Section */}
      <div style={styles.section}>
        <input
          type="text"
          placeholder="Enter your website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCrawl} style={styles.button}>
          {loading ? "Crawling..." : "Crawl Website"}
        </button>
      </div>

      {/* Display Crawled Content */}
      {content.length > 0 && (
        <div style={styles.contentSection}>
          <h2>Crawled Data:</h2>
          <ul style={styles.list}>
            {content.map((item, index) => (
              <li key={index} style={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chatbot Section */}
      {content.length > 0 && (
        <div style={styles.section}>
          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleChat} style={styles.button}>
            {loading ? "Processing..." : "Ask"}
          </button>
        </div>
      )}

      {/* Chatbot Response */}
      {chatResponse && (
        <div style={styles.card}>
          <h3>Chatbot Response:</h3>
          <p>{chatResponse}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center" as const,
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
  },
  section: {
    margin: "20px 0",
  },
  input: {
    width: "70%",
    padding: "10px",
    margin: "10px 0",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s",
    margin: "10px",
  },
  contentSection: {
    textAlign: "left" as const,
    marginTop: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    background: "#f9f9f9",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
};
