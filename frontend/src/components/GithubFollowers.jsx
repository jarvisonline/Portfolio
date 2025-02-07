import React, { useEffect, useState } from "react";
import axios from "axios";
import NumberTicker from "./ui/number-ticker";

const GitHubFollowers = ({ username }) => {
  const [followers, setFollowers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        // Pass the username dynamically in the API call
        const response = await axios.get(`/api/github/${username}`);
        setFollowers(response.data.followers);
      } catch (err) {
        setError("Failed to fetch GitHub follower data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  return <NumberTicker value={followers || 0} decimalPlaces={0} />;
};

export default GitHubFollowers;
