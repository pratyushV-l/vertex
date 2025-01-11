import React from "react";


export default function AIquerybot() {
    return (
        <div className="AIquerybot">
          <h1 className="bot-heading">AI Query Bot </h1>
          <h1 className="entry-statement">Welcome to Query Bot I will answer your Questions. Don't hesitate to Ask me your queries!</h1>
        <input type="Question" placeholder="Ask your Question Here" className="question-box" />
        <p className="answer">Answer: </p>
        </div>
      );
    }



