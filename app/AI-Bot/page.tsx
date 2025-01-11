"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AIquerybot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDkyivo4KBcmjJN_ZB2qq7_1II34IAI_uk");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(question);
      setAnswer(result.response.text());
    } catch (error) {
      console.error("Error fetching the answer:", error);
      setAnswer("Sorry, I couldn't fetch the answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="ai-querybot-container">
      <h1 className="bot-heading">AI Query Bot</h1>
      <p className="entry-statement">
        Welcome to Query Bot. I will answer your questions. Do not hesitate to ask me your queries!
      </p>
      <input
        type="text"
        placeholder="Ask your question here"
        className="question-box"
        value={question}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <p className="answer">
        {isLoading ? "Loading..." : `Answer: ${answer}`}
      </p>
    </div>
  );
}