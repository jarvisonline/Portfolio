require("dotenv").config();
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema & Model
const StatsSchema = new mongoose.Schema({
  visits: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});
const Stats = mongoose.model("Stats", StatsSchema);

// Social Media Stats Variables
let lastTwitterFollowersCount = null;
let lastFetchTime = null;

// Twitter API request function
const getTwitterData = async (username) => {
  const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`;
  const currentTime = new Date();

  if (lastFetchTime && currentTime - lastFetchTime < 15 * 60 * 1000) {
    return lastTwitterFollowersCount;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    lastTwitterFollowersCount =
      response.data.data.public_metrics.followers_count;
    lastFetchTime = currentTime;
    return lastTwitterFollowersCount;
  } catch (error) {
    console.error("Error fetching Twitter data: Failed to fetch Twitter data");
    if (lastTwitterFollowersCount !== null) {
      console.log(
        "Returning cached Twitter followers count due to API failure."
      );
      return lastTwitterFollowersCount;
    }
  }
  throw new Error("Error fetching Twitter data: No cached data available.");
};

// GitHub API request function
const getGitHubData = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    return response.data.followers;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch GitHub data"
    );
  }
};

// GitHub commits API request function
const getGitHubCommits = async (username) => {
  const url = `https://api.github.com/users/${username}/repos`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    const repos = response.data;
    const commitsPromises = repos.map(async (repo) => {
      const commitsUrl = `https://api.github.com/repos/${repo.full_name}/commits`;
      const commitsResponse = await axios.get(commitsUrl, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });
      return commitsResponse.data;
    });
    const commitsData = await Promise.all(commitsPromises);
    return commitsData.flat();
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch GitHub commits data"
    );
  }
};

// Stats Endpoints
app.get("/stats", async (req, res) => {
  let stats = await Stats.findOne();
  if (!stats) stats = await Stats.create({});
  res.json(stats);
});

app.post("/visit", async (req, res) => {
  let stats = await Stats.findOneAndUpdate(
    {},
    { $inc: { visits: 1 } },
    { new: true, upsert: true }
  );
  res.json(stats);
});

app.post("/like", async (req, res) => {
  let stats = await Stats.findOneAndUpdate(
    {},
    { $inc: { likes: 1 } },
    { new: true, upsert: true }
  );
  res.json(stats);
});

// Social Media Endpoints
app.get("/api/twitter/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const followers = await getTwitterData(username);
    res.json({ followers });
  } catch (error) {
    console.error("Error fetching Twitter data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/github/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const followers = await getGitHubData(username);
    res.json({ followers });
  } catch (error) {
    console.error("Error fetching GitHub data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/commits", async (req, res) => {
  const username = "jarvisonline"; // Replace with your GitHub username
  const token = process.env.GITHUB_TOKEN; // Securely access token

  try {
    // Fetch all repositories
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: { Authorization: `token ${token}` },
      }
    );

    const repos = reposResponse.data;
    let totalCommits = 0;

    // Fetch commits for each repository
    for (let repo of repos) {
      const commitsResponse = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/commits`,
        {
          headers: { Authorization: `token ${token}` },
        }
      );

      totalCommits += commitsResponse.data.length;
    }

    res.json({ totalCommits });
  } catch (error) {
    console.error("Error fetching commit data:", error.message);
    res.status(500).json({ message: "Error fetching commit data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
