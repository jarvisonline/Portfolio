import React from "react"; // Added React import
import {
  FaFigma,
  FaCode,
  FaRobot,
  FaBolt,
  FaNodeJs,
  FaReact,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaStripe,
} from "react-icons/fa"; // Added relevant react-icons imports for additional tools
import {
  SiPostman,
  SiMongodb,
  SiExpress,
  SiSocketdotio,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si"; // Added MongoDB, Express, and other icons
import Marquee from "./ui/marquee";

const tools = [
  { name: "Figma", icon: <FaFigma size={32} /> },
  { name: "VS Code", icon: <FaCode size={32} /> },
  { name: "ChatGPT", icon: <FaRobot size={32} /> },
  { name: "Cursor AI", icon: <FaRobot size={32} /> },
  { name: "Postman", icon: <SiPostman size={32} /> },
  { name: "MongoDB", icon: <SiMongodb size={32} /> },
  { name: "Express", icon: <SiExpress size={32} /> },
  { name: "Node.js", icon: <FaNodeJs size={32} /> },
  { name: "React", icon: <FaReact size={32} /> },
  { name: "Next.js", icon: <SiNextdotjs size={32} /> },
  { name: "WebSocket", icon: <SiSocketdotio size={32} /> },
  { name: "Git", icon: <FaGitAlt size={32} /> },
  { name: "GitHub", icon: <FaGithub size={32} /> },
  { name: "Docker", icon: <FaDocker size={32} /> },
  { name: "Stripe", icon: <FaStripe size={32} /> },
  { name: "Giphy API", icon: <FaBolt size={32} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={32} /> },
  { name: "Bento Grid", icon: <FaDatabase size={32} /> },
  { name: "GSAP", icon: <FaBolt size={32} /> }, // Added GSAP
  { name: "Three.js", icon: <FaBolt size={32} /> }, // Added Three.js
];

const ToolCard = ({ icon, name }) => {
  return (
    <div className="flex gap-2 items-center p-4 bg-[#282828] rounded-3xl">
      {icon}
      <span className="mt-2 text-sm font-medium">{name}</span>
    </div>
  );
};

const ToolsMarquee = ({ reverse = false, pauseOnHover = false }) => {
  return (
    <div className="relative flex h-[80px] w-full items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
      <Marquee
        reverse={reverse}
        pauseOnHover={pauseOnHover}
        className="[--duration:60s]"
      >
        {tools.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </Marquee>
    </div>
  );
};

export default ToolsMarquee;
