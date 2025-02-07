import React, { useEffect, useState } from "react";
import NumberTicker from "@/components/ui/number-ticker";
import axios from "axios";

const FollowerTicker = ({ username }) => {
  const [followers, setFollowers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/twitter/${username}`
        );
        setFollowers(response.data.followers);
      } catch (err) {
        setError("Failed to fetch follower data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  return <NumberTicker value={followers || 0} decimalPlaces={0} />;
};

export default FollowerTicker;
