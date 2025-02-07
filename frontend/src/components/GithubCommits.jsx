import React, { useEffect, useState } from "react";
import axios from "axios";
import NumberTicker from "./ui/number-ticker";

const GitHubCommits = () => {
  const [totalCommits, setTotalCommits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/commits`
        );
        setTotalCommits(response.data.totalCommits);
      } catch (err) {
        setError("Failed to fetch GitHub commits data.");
        console.error("Error fetching commits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && totalCommits !== null && (
        <NumberTicker delay={2} value={totalCommits} decimalPlaces={0} />
      )}
    </div>
  );
};

export default GitHubCommits;
