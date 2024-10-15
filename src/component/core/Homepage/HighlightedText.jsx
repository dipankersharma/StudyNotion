import React from "react";

const HighlightedText = ({ text }) => {
  return <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent font-bold bg-clip-text "> {text}</span>;
};

export default HighlightedText;
