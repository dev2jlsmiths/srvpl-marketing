import React from "react";
import { useParams } from "react-router-dom";

const FileDetails = () => {
  const { id } = useParams();

  // Dummy file data for demonstration
  const file = {
    id: "file1",
    name: "File 1",
    content: "This is the content of the file.",
  };

  return (
    <div>
      <h2 className="text-xl font-bold">File: {file.name}</h2>
      <p className="mt-4">{file.content}</p>
    </div>
  );
};

export default FileDetails;
