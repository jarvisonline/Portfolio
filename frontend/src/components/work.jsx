import React from "react"; // Added React import
import {
  FaCode,
  FaNodeJs,
  FaReact,
  FaDatabase,
  FaServer,
  FaCloudUploadAlt,
  FaCheckCircle,
} from "react-icons/fa"; // Added relevant react-icons imports
import Marquee from "./ui/marquee";

const workProcess = [
  { name: "Planning", icon: <FaCode size={32} /> },
  { name: "Development", icon: <FaNodeJs size={32} /> },
  { name: "Frontend", icon: <FaReact size={32} /> },
  { name: "Database Setup", icon: <FaDatabase size={32} /> },
  { name: "Deployment", icon: <FaCloudUploadAlt size={32} /> },
  { name: "Server Setup", icon: <FaServer size={32} /> }, // Added Server Setup
  { name: "Verification", icon: <FaCheckCircle size={32} /> },
];

const WorkCard = ({ icon, name }) => {
  return (
    <div className="flex gap-2 items-center p-4 bg-[#282828] rounded-3xl">
      {icon}
      <span className="mt-2 text-sm font-medium">{name}</span>
    </div>
  );
};

const WorkProcessMarquee = ({ reverse = false, pauseOnHover = false }) => {
  return (
    <div className="relative flex h-[38vh] w-full items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
      <Marquee
        reverse={reverse}
        pauseOnHover={pauseOnHover}
        vertical={true} // Added vertical prop
        className="[--duration:10s]"
      >
        {workProcess.map((process) => (
          <WorkCard key={process.name} {...process} />
        ))}
      </Marquee>
    </div>
  );
};

export default WorkProcessMarquee;
