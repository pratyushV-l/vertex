"use client";
import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const StudyPlanner = () => {
  const [pdfContent, setPdfContent] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleDownload = async () => {
      if (!pdfContent) return;

      const genAI = new GoogleGenerativeAI("AIzaSyDkyivo4KBcmjJN_ZB2qq7_1II34IAI_uk");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Analyze the following PDF content and create a study guide: ${pdfContent}`;

      const result = await model.generateContent(prompt);
      const studyGuide = await result.response.text();

      // Create a Blob from the response
      const blob = new Blob([studyGuide], { type: 'text/tsx' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Simulate loading bar
      let progress = 0;
      const loadingBar = document.querySelector('.loading-bar') as HTMLElement;
      const interval = setInterval(() => {
        progress += 10;
        if (loadingBar) {
          loadingBar.style.width = `${progress}%`;
        }
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        if (loadingBar) {
          loadingBar.style.width = '100%';
        }
      }, 1000);
    };

    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
      downloadButton.addEventListener('click', handleDownload);
    }

    return () => {
      if (downloadButton) {
        downloadButton.removeEventListener('click', handleDownload);
      }
    };
  }, [pdfContent]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setPdfContent(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="study-planner-container">
      <h1 className="study-heading">Study Planner</h1>
      <div className="drag-drop-box">
        <p>Drag and drop your files here</p>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      <button className="download-button">
        Download
      </button>
      {downloadUrl && (
        <a href={downloadUrl} download="study-guide.tsx">
          Click here to download your study guide
        </a>
      )}
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default StudyPlanner;