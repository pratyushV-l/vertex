"use client";
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const StudyPlanner = () => {
  const [fileContents, setFileContents] = useState<string[]>([]);
  const [responseContent, setResponseContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const readers = Array.from(files).map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target?.result as string);
          };
          reader.onerror = reject;
          reader.readAsText(file);
        });
      });

      Promise.all(readers)
        .then(contents => setFileContents(contents))
        .catch(error => console.error("Error reading files:", error));
    }
  };

  const handleDownload = async () => {
    if (fileContents.length === 0) return;

    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDkyivo4KBcmjJN_ZB2qq7_1II34IAI_uk");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const combinedContent = fileContents.join("\n");
      const prompt = `You are an educational assistant. Please provide a detailed study plan based on the following content:\n${combinedContent}`;
      const result = await model.generateContent(prompt);
      const newResponse = result.response.text();

      setResponseContent(newResponse);

      // Create a blob from the response content
      const blob = new Blob([newResponse], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'study_plan.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating the study plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="study-planner-container">
      <h1 className="study-heading">Study Planner</h1>
      <div className="drag-drop-box">
        <p>Upload your .txt files here</p>
        <input type="file" accept=".txt" multiple onChange={handleFileUpload} />
      </div>
      <button className="download-button" onClick={handleDownload} disabled={isLoading}>
        {isLoading ? "Generating..." : "Download"}
      </button>
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: isLoading ? '100%' : '0%' }}></div>
      </div>
    </div>
  );
};

export default StudyPlanner;