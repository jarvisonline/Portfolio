import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import LoadingScreen from "./components/LoadingScreen";
import Page from "./components/Page";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 9000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Page />
          <Home />
          <Projects />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
