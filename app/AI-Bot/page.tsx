"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import withAuth from '@/src/hoc/withAuth';

const AIquerybot: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [, setAnswer] = useState("");
  const [, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDkyivo4KBcmjJN_ZB2qq7_1II34IAI_uk");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const history = conversationHistory.join("\n");
      const prompt = `You are an educational chatbot. Remember to answer in a suitable manner, and only answer somewhat related questions to education. Refuse to answer questions not related to education. Never give direct answer, rather, always provide explanation. Keeping this in mind, still make sure most responses are under 6 lines, to promote ease of read. Remember, only study related queries. Provide all answer in plain text and not markdown. Here is the conversation history:\n${history}\nStudent: ${question}\nChatbot:`;
      const result = await model.generateContent(prompt);
      const newAnswer = result.response.text();

      setAnswer(newAnswer);
      setConversationHistory([...conversationHistory, `Student: ${question}`, `Chatbot: ${newAnswer}`]);
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
      <div className="triangle top-left"></div>
      <div className="triangle bottom-right"></div>
      <h1 className="bot-heading">Educational AI Query Bot</h1>
      <p className="entry-statement">
        Welcome to the Educational Query Bot. Do not hesitate to ask any question you have.
      </p>
      <div className="chat-history">
        {conversationHistory.map((entry, index) => (
          <p key={index} className={entry.startsWith("Student:") ? "student-message" : "bot-message"}>
            {entry}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Ask your educational question here"
        className="question-box"
        value={question}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default withAuth(AIquerybot);