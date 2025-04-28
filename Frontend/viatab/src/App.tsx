import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; // Import the CSS file

interface Story {
  id: number;
  title: string;
  content: string;
  department: string;
}

const App = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState({ title: "", content: "", department: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch stories from the backend
  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/stories");
      setStories(response.data);
    } catch (err) {
      console.error("Error fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Add a new story to the backend
  const addStory = async () => {
    if (!newStory.title || !newStory.content || !newStory.department) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/stories", newStory);
      setStories([...stories, response.data]);
      setNewStory({ title: "", content: "", department: "" });
      setError(""); // Reset error
    } catch (err) {
      console.error("Error adding new story:", err);
    }
  };

  return (
    <div className="container">
      <h1>VIA Tabloid - Stories</h1>

      <div className="add-story-form">
        <h2>Add a New Story</h2>
        <input
          type="text"
          placeholder="Title"
          value={newStory.title}
          onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newStory.content}
          onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={newStory.department}
          onChange={(e) => setNewStory({ ...newStory, department: e.target.value })}
        />
        <button onClick={addStory}>Add Story</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <h2>All Stories</h2>

      {loading ? (
        <p>Loading stories...</p>
      ) : (
        <ul className="story-list">
          {stories.map((story) => (
            <li key={story.id}>
              <h2>{story.title}</h2>
              <p>{story.content}</p>
              <small>{story.department}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
