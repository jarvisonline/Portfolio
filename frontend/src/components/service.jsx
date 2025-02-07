import React from "react"; // Added React import
import {
  FaCode,
  FaNodeJs,
  FaFigma,
  FaDocker,
  FaReact,
  FaStripe,
} from "react-icons/fa"; // Added relevant react-icons imports
import { SiMongodb, SiSocketdotio } from "react-icons/si"; // Added MongoDB and Socket.io imports
import Marquee from "./ui/marquee"; // Ensure Marquee component is imported

const services = [
  { name: "Web Development", icon: <FaCode size={32} /> },
  { name: "API Development", icon: <FaNodeJs size={32} /> },
  { name: "Database Management", icon: <SiMongodb size={32} /> },
  { name: "UI/UX Design", icon: <FaFigma size={32} /> },
  { name: "Cloud Integration", icon: <FaDocker size={32} /> },
  { name: "Responsive Design", icon: <FaReact size={32} /> },
  { name: "E-commerce Solutions", icon: <FaStripe size={32} /> },
  { name: "Real-time Applications", icon: <SiSocketdotio size={32} /> },
  { name: "No Code Website Development", icon: <FaReact size={32} /> }, // Added no code website service
  { name: "Landing Page Creation", icon: <FaFigma size={32} /> }, // Added landing page service
];

const ServiceCard = ({ icon, name }) => {
  return (
    <div className="flex gap-2 items-center p-4 bg-[#282828] rounded-3xl">
      {icon}
      <span className="mt-2 text-sm font-medium">{name}</span>
    </div>
  );
};

const ServicesMarquee = ({ reverse = false, pauseOnHover = false }) => {
  return (
    <div className="relative flex h-[80px] w-full items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
      <Marquee
        reverse={reverse}
        pauseOnHover={pauseOnHover}
        className="[--duration:60s]"
      >
        {services.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </Marquee>
    </div>
  );
};
export default ServicesMarquee;
