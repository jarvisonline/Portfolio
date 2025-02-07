import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-6">
            <a
              href="https://github.com/jarvisonline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/aman-nigam-088122251/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com/AMANNIG48447492"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="mailto:nigamaman70@gmail.com"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaEnvelope size={24} />
            </a>
          </div>

          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Aman Nigam. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Crafted with React, Tailwind CSS, shadcn/ui, Magic UI, and React
              Bits. Inspired by creative 3D websites and powered by ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
