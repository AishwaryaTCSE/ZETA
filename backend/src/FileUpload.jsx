import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("⚠️ Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setMessage("✅ " + data.message);
    } catch (error) {
      setMessage("❌ File upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "350px", margin: "40px auto" }}>
      <h3>File Upload</h3>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
