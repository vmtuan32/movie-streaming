import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || ""; // cấu hình env nếu cần

function App() {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get(`${API_URL}/videos`);
    setVideos(res.data);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await axios.post(`${API_URL}/videos/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUploading(false);
    setFile(null);
    fetchVideos();
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Movie Streaming App</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? "Đang upload..." : "Upload Video"}
        </button>
      </form>
      <h2>Danh sách video đã upload</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.filename}>
            <div>
              <strong>{video.filename}</strong>
            </div>
            <video
              src={`${API_URL}${video.url}`}
              controls
              width="480"
              style={{ marginTop: 8, marginBottom: 16 }}
            />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;