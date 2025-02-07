import React, { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import * as THREE from "three";
import simulationVertexShader from "@/shaders/simulationVertexShader.glsl";
import simulationFragmentShader from "@/shaders/simulationFragmentShader.glsl";
import renderVertexShader from "@/shaders/renderVertexShader.glsl";
import renderFragmentShader from "@/shaders/renderFragmentShader.glsl";
import DecryptedText from "./ui/decrypted-text";
import { ScriptCopyBtn } from "./ui/script-copy-btn";

const Page = () => {
  const canvasRef = useRef();
  const customCommandMap = {
    npx: "npx jarvisonline",
  };

  const [stats, setStats] = useState({ visits: 0, likes: 0 });
  const [liked, setLiked] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // Fetch visit & like count
    axios
      .get(`${apiUrl}/stats`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));

    // Increment visit count (only when the page loads)
    axios
      .post(`${apiUrl}/visit`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error updating visit count:", err));

    // Check if the user has already liked
    if (localStorage.getItem("liked") === "true") {
      setLiked(true);
    }
  }, []);

  const handleLike = () => {
    if (!liked) {
      axios
        .post(`${apiUrl}/like`)
        .then((res) => {
          setStats(res.data);
          setLiked(true);
          localStorage.setItem("liked", "true");
        })
        .catch((err) => console.error("Error updating like count:", err));
    } else {
      alert("You already liked this!");
    }
  };

  useEffect(() => {
    let animationFrameId;
    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false, // Reduce GPU load
      alpha: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: false, // Reduce memory usage
    });

    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    const scaleFactor = 0.8; // Reduce render resolution for performance
    const width = Math.round(window.innerWidth * pixelRatio * scaleFactor);
    const height = Math.round(window.innerHeight * pixelRatio * scaleFactor);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);

    const mouse = new THREE.Vector2();
    let frame = 0;

    const options = {
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType || THREE.FloatType, // Optimize memory usage
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };

    let rtA = new THREE.WebGLRenderTarget(width, height, options);
    let rtB = new THREE.WebGLRenderTarget(width, height, options);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(0.5, "#111111");
      gradient.addColorStop(1, "#222222");
      return gradient;
    };

    const updateTextTexture = () => {
      ctx.fillStyle = createGradient();
      ctx.fillRect(0, 0, width, height);

      const fontSize = Math.round(
        window.innerWidth < 640 ? 60 * pixelRatio : 180 * pixelRatio
      );
      ctx.fillStyle = "#fef4b8";
      ctx.font = `bold ${fontSize}px "Test Sohne", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MERN DEV", width / 2, height / 2);
    };

    updateTextTexture();
    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.format = THREE.RGBAFormat;

    const handleResize = () => {
      const newWidth = Math.round(window.innerWidth * pixelRatio * scaleFactor);
      const newHeight = Math.round(
        window.innerHeight * pixelRatio * scaleFactor
      );

      renderer.setSize(newWidth, newHeight);
      rtA.setSize(newWidth, newHeight);
      rtB.setSize(newWidth, newHeight);
      simMaterial.uniforms.resolution.value.set(newWidth, newHeight);

      canvas.width = newWidth;
      canvas.height = newHeight;
      updateTextTexture();
      textTexture.needsUpdate = true;
    };

    const onMouseMove = (() => {
      let rafId;
      return (e) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          mouse.x = e.clientX * pixelRatio;
          mouse.y = (window.innerHeight - e.clientY) * pixelRatio;
        });
      };
    })();

    window.addEventListener("resize", handleResize);
    canvasRef.current.addEventListener("mousemove", onMouseMove, {
      passive: true,
    });

    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;
      simMaterial.uniforms.textureA.value = rtA.texture;

      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtB.texture;
      renderMaterial.uniforms.textureB.value = textTexture;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      [rtA, rtB] = [rtB, rtA]; // Swap render targets
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        animate();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasRef.current.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      simMaterial.dispose();
      renderMaterial.dispose();
      plane.dispose();
      textTexture.dispose();
    };
  }, []);

  return (
    <>
      <div className="h-screen w-full overflow-hidden relative">
        <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-10">
          <div className="logo text-5xl text-[#fef4b8] font-kalki max-sm:text-3xl">
            <DecryptedText
              text="AMAN"
              speed={500}
              maxIterations={20}
              characters="Aमानஅமఅమఅமಅமn"
              className="revealed"
              parentClassName="all-letters"
              encryptedClassName="encrypted"
              animateOn="view"
            />
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${
                liked
                  ? "bg-pink-500/20 cursor-not-allowed"
                  : "bg-[#fef4b8]/10 hover:bg-[#fef4b8]/20"
              } transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={liked ? "#ec4899" : "none"}
                stroke={liked ? "#ec4899" : "#fef4b8"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span
                className={`text-sm sm:text-base ${
                  liked ? "text-pink-500" : "text-[#fef4b8]"
                }`}
              >
                Likes ({stats.likes})
              </span>
            </button>
            <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-[#fef4b8]/10 hover:bg-[#fef4b8]/20 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fef4b8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-sm sm:text-base text-[#fef4b8]">
                Visits: {stats.visits}
              </span>
            </button>
          </div>
        </nav>
        <footer className="absolute bottom-0 left-0 text-[#fef4b8] w-full p-8 flex justify-between items-end z-10 max-sm:justify-center">
          <DecryptedText
            text="FRONTEND DEVLOPER"
            speed={500}
            maxIterations={20}
            characters="Frontrend Developer"
            className="revealed text-3xl max-sm:text-2xl max-sm:text-center"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
            animateOn="view"
          />
          <div className="footer-links flex max-sm:hidden">
            <ScriptCopyBtn
              showMultiplePackageOptions={true}
              codeLanguage="shell"
              lightTheme="nord"
              darkTheme="vitesse-dark"
              commandMap={customCommandMap}
            />
          </div>
        </footer>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </>
  );
};
export default Page;
