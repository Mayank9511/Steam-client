import React, { useState } from "react";
import { Button, TextField, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react";

const GetStarted = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async () => {
    if (question) {
      setLoading(true);

      try {
        const res = await axios.post(
          "https://steam-server.onrender.com/api/text",
          { question }, // Send question as JSON
          {
            headers: {
              "Content-Type": "application/json", // Set header for JSON data
            },
          }
        );

        setResponse(res.data.answer); // Access the response data
      } catch (error) {
        console.error("Error:", error);
        setResponse("An error occurred while generating the response.");
      }

      setLoading(false);
    } else {
      alert("Please enter a valid question");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleQuestionSubmit();
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        STEAM
        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          Verse!
        </span>
      </h2>
      <div className="mt-[5vh] flex flex-grow flex-wrap">
        {/* Left Box - File Upload and Question (30% Width) */}
        <div className="w-full sm:w-1/2 lg:w-[30%] p-2">
          <div className="p-10 border border-neutral-700 rounded-xl h-full flex flex-col justify-between">
            <div>
              <Typography variant="h8" gutterBottom>
                This website uses AI and our research to help spread awareness
                about STEAM Education.
              </Typography>
            </div>
            <div>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Ask a Question"
                value={question}
                color="secondary"
                focused
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  style: { color: "white" }, // Sets the text color to white
                }}
              />

              <Button
                variant="contained"
                // color="secondary"
                onClick={handleQuestionSubmit}
                disabled={loading}
                style={{ margin: "20px 0", width: "100%" }}
                className="bg-gradient-to-r from-orange-500 to-orange-800 py-5 px-4 mx-3 rounded-md"
              >
                {loading ? (
                  <CircularProgress style={{ color: "white" }} size={24} />
                ) : (
                  "Submit Question"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Box - Response (70% Width) */}
        <div className="w-full sm:w-1/2 lg:w-[70%] p-2">
          <div className="p-10 border border-neutral-700 rounded-xl h-full">
            <Typography variant="h5" gutterBottom>
              Response:
            </Typography>

            <div className="max-h-[70vh] sm:h-[50vh] overflow-y-auto">
              {response ? (
                <Typography
                  variant="body1"
                  style={{ marginTop: "2rem", whiteSpace: "pre-line" }}
                  dangerouslySetInnerHTML={{
                    __html: response
                      .replace(/## (.*?)\n/g, "<h2>$1</h2>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
                      .replace(/_(.*?)_/g, "<em>$1</em>") // Italics
                      .replace(/~~(.*?)~~/g, "<s>$1</s>"), // Strikethrough
                  }}
                />
              ) : (
                <Typography variant="body1" style={{ marginTop: "2rem" }}>
                  No response yet.
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
      <Analytics />
    </div>
  );
};

export default GetStarted;
