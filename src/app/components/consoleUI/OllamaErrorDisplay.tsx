// src/app/components/consoleUI/OllamaErrorDisplay.tsx
import React from "react";

interface OllamaErrorDisplayProps {
  errorMessage: string | undefined;
}

const OllamaErrorDisplay: React.FC<OllamaErrorDisplayProps> = ({
  errorMessage,
}) => {
  if (errorMessage) {
    return (
      <pre data-prefix=">" className="text-warning mt-2">
        <code>Error: {errorMessage}</code>
      </pre>
    );
  }
  return null;
};

export default OllamaErrorDisplay;
