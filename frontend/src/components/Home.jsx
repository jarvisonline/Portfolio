import React from "react";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { SiExpress, SiMongodb } from "react-icons/si";
import { GiJourney } from "react-icons/gi";
import { SiLeetcode } from "react-icons/si";
import { GrGithub } from "react-icons/gr";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { MdArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TbGoGame } from "react-icons/tb";

gsap.registerPlugin(useGSAP);
import {
  FaCodeCommit,
  FaGithub,
  FaNodeJs,
  FaPlus,
  FaReact,
  FaTwitter,
  FaServicestack,
  FaDiagramProject,
  FaLocationPin,
  FaGlobe,
  FaFlag,
  FaClock,
  FaLinkedin,
} from "react-icons/fa6";

import ToolsMarquee from "./tools";
import TwitterFollowers from "./TwitterFollowers";
import GitHubFollowers from "./GithubFollowers";
import GradientText from "./ui/gradient-text";
import GitHubCommits from "./GithubCommits";
import ShineBorder from "./ui/shine-border";
import { Tweet } from "react-tweet";
import Marquee from "./ui/marquee";
import { FaFile, FaTimesCircle, FaTools, FaUniversity } from "react-icons/fa";
import ServicesMarquee from "./service";
import WorkProcessMarquee from "./work";
import { MorphingTextDemo } from "./Roles";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".main",
        start: "top center",
        end: "bottom center",
        markers: true,
      },
    });
    timeline.from(".shine-border", {
      scale: 0,
      duration: 2,
      ease: "power2.out",
    });
  });

  return (
    <div className="bg-[#050505] min-h-screen w-full ">
      <div className="flex h-screen w-full items-center justify-center max-lg:h-auto max-lg:w-auto">
        <div className="grid h-full w-full gap-4 p-2 md:p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-11 grid-rows-10">
          {/* Main Stacks Section */}

          <ShineBorder className="main shine-border col-span-1 md:col-span-3 row-span-3 text-white max-sm:row-auto max-sm:col-span-2 bg-[#101010] backdrop-blur-md rounded-xl">
            <div className="max-sm:h-[13vh] md:p-[12px] font-[manrope] text-[#999999] text-[12px] max-sm:text-[13px] md:text-[14px] flex justify-center items-center gap-1">
              <HiSquare3Stack3D size={20} md={25} color="#7b74fc" />
              My Stacks
            </div>
            <div className="text-center font-manrope text-[14px] max-sm:text-[15px] md:text-[16px] leading-3">
              Tech Arsenal
            </div>
            <div className="p-3 flex flex-wrap gap-1 justify-between">
              {["MongoDB", "Express.js", "React.js", "Node.js"].map(
                (tech, index) => (
                  <div
                    key={index}
                    className="w-[120px] max-sm:w-[130px] md:w-[149px] h-[30px] md:h-[38px] flex justify-center items-center mt-1 bg-[#ffffff0e] rounded-lg font-[manrope] font-medium gap-2"
                  >
                    <div className="w-[30px] h-[30px] bg-[#282828] rounded-[5px] flex items-center justify-center">
                      {index === 0 && <SiMongodb size={20} />}
                      {index === 1 && <SiExpress size={20} />}
                      {index === 2 && <FaReact size={20} />}
                      {index === 3 && <FaNodeJs size={20} />}
                    </div>
                    {tech}
                  </div>
                )
              )}
            </div>
          </ShineBorder>

          {/* Responsive Changes for Smaller Screens */}
          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto row-span-2 text-white bg-[#101010] backdrop-blur-md rounded-xl">
            <div className="flex max-sm:items-center max-sm:justify-center">
              <GradientText
                colors={["#FFFFFF", "#E6E6E6", "#C0C0C0", "#E6E6E6", "#FFFFFF"]}
                animationSpeed={3}
                showBorder={false}
              >
                <TwitterFollowers username="AMANNIG48447492" />
              </GradientText>
              <FaPlus size={20} color="#7b74fc" />
            </div>
            <div className="max-sm:h-[17vh]">
              <div className="font-manrope flex justify-center gap-2 mt-11">
                <FaTwitter size={20} color="#7b74fc" />
                <span className="max-sm:hidden">Twitter</span>
                <span className="hidden max-sm:inline">Twitter Followers</span>
              </div>
            </div>
          </ShineBorder>

          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-1 row-span-2 text-white bg-[#101010] backdrop-blur-md rounded-xl">
            <div className="flex max-sm:items-center max-sm:justify-center mt-[3px]">
              <GradientText
                colors={["#C0C0C0", "#E6E6E6", "#FFFFFF", "#E6E6E6", "#C0C0C0"]}
                animationSpeed={3}
                showBorder={false}
              >
                <GitHubFollowers username="jarvisonline" />
              </GradientText>
              <FaPlus size={20} color="#7b74fc" />
            </div>
            <div className="">
              <div className="font-manrope flex justify-center gap-2 lg:mt-[2.5rem] max-sm:h-[21.5vh] max-sm:p-10">
                <FaGithub size={20} color="#7b74fc" />
                <span className="max-sm:hidden">Github</span>
                <span className="hidden max-sm:inline">Github Followers</span>
              </div>
            </div>
          </ShineBorder>

          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-1 row-span-2 text-white bg-[#101010] backdrop-blur-md rounded-xl">
            <div className="flex max-sm:items-center max-sm:justify-center mt-[3px]">
              <GradientText
                colors={["#C0C0C0", "#E6E6E6", "#FFFFFF", "#E6E6E6", "#C0C0C0"]}
                animationSpeed={3}
                showBorder={false}
              >
                <GitHubCommits username="jarvisonline" />
              </GradientText>
              <FaPlus size={20} color="#7b74fc" />
            </div>
            <div className="">
              <div className="font-manrope flex justify-center gap-2 lg:mt-[2.5rem] max-sm:h-[21.5vh] max-sm:p-10">
                <FaCodeCommit size={20} color="#7b74fc" />
                <span className="max-sm:hidden">Github</span>
                <span className="hidden max-sm:inline">Github Followers</span>
              </div>
            </div>
          </ShineBorder>

          <div className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-3 row-span-5 bg-[#101010] backdrop-blur-md rounded-xl text-white overflow-y-auto h-full max-sm:h-[50vh] max-sm:flex flex-col scrollbar-hidden">
            <div className="p-2 flex items-center justify-center gap-4">
              <GiJourney size={40} color="#7b74fc" /> My Twitter Journey
            </div>
            <div className="max-h-screen max-sm:h-full">
              <Marquee
                vertical
                pauseOnHover={true}
                className="[--duration:60s]"
              >
                <Tweet id="1869793505293598835" />
                <Tweet id="1857458011700154423" />
                <Tweet id="1849852865772388442" />
                <Tweet id="1838282076275249414" />
                <Tweet id="1777755977934119028" />
              </Marquee>
            </div>
          </div>

          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-2 row-span-5 bg-[#101010] backdrop-blur-md rounded-xl text-white">
            <div className="p-2  flex items-center justify-center gap-2">
              <FaDiagramProject size={30} color="#7b74fc" /> MERN FLOW
            </div>
            <WorkProcessMarquee
              pauseOnHover={true}
              className="[--duration:60s]"
            />
          </ShineBorder>

          <ShineBorder className="col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-3 row-span-4 bg-[#101010] backdrop-blur-md rounded-xl text-white">
            <div className="flex items-center gap-3">
              <img
                src="./images/aman.jpeg"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover filter grayscale"
              />
              <div>
                <div className="flex items-center gap-2 bg-[#141414] h-6 rounded-2xl">
                  <span
                    className="inline-block w-3 h-3 bg-[#6DD33D] border border-[#6DD33D] rounded-full animate-blinker"
                    title="Online Status"
                  ></span>
                  <span className="text-sm font-manrope text-[#ffffff]">
                    Available To Work
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#ffffff] mt-1">
                  Aman Nigam
                </div>
                <div className="text-[#7b74fc] flex items-start">
                  I'm a <MorphingTextDemo />
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-[#141414] flex justify-evenly flex-wrap mt-5 font-manrope text-base p-1 gap-1">
              <div className="rounded-xl bg-[#191919] flex w-[11rem] gap-2">
                <FaLocationPin color="#7b74fc" className="ml-1 mt-1" />
                UttarPradesh,India
              </div>
              <div className="rounded-xl bg-[#191919] flex w-[150px] gap-2">
                <FaGlobe color="#7b74fc" className="ml-1 mt-1" />
                English & Hindi
              </div>
              <div className="rounded-xl bg-[#191919] flex gap-2 w-[170px]">
                <FaFlag color="#7b74fc" className="ml-1 mt-1" />
                Frontend Devloper
              </div>
              <div className="rounded-xl bg-[#191919] flex gap-2 w-[130px]">
                <FaUniversity color="#7b74fc" className="ml-1 mt-1" />
                <a
                  href="https://www.psit.ac.in/"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PSIT, Kanpur
                </a>
              </div>
              <div className="rounded-xl bg-[#191919] flex gap-2 w-[60px]">
                <FaClock color="#7b74fc" className="ml-1 mt-1" />
                IST
              </div>
            </div>
            <div className="flex">
              <div className="rounded-xl"></div>
            </div>
          </ShineBorder>

          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-3 row-span-3 bg-[#101010] backdrop-blur-md flex items-center justify-center rounded-xl text-white">
            8
          </ShineBorder>

          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-2 row-span-5 bg-[#101010] backdrop-blur-md rounded-xl text-white">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex gap-1 text-xl font-manrope">
                <PiPlugsConnectedFill color="#7b74fc" size={30} />
                Follow Me
              </div>
              <div className="w-full h-[50px] rounded-lg bg-[#191919] flex justify-center items-center gap-1 group">
                <FaLinkedin size={30} className="mt-1 ml-1" />
                <a
                  href="https://www.linkedin.com/in/aman-nigam-088122251/"
                  className="text-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <div className="hidden group-hover:block">
                  <MdArrowOutward />
                </div>
              </div>
              <div className="w-full h-[50px] rounded-lg bg-[#191919] flex gap-1 justify-center items-center group">
                <FaTwitter size={30} className="mt-1 ml-1" />
                <a
                  href="https://x.com/AMANNIG48447492"
                  className="text-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <div className="hidden group-hover:block">
                  <MdArrowOutward />
                </div>
              </div>
              <div className="w-full h-[50px] rounded-lg bg-[#191919] flex gap-1 justify-center items-center group">
                <SiLeetcode size={30} className="mt-1 ml-1" />
                <a
                  href="https://leetcode.com/u/nigamaman70/"
                  className="text-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LeetCode
                </a>
                <div className="hidden group-hover:block">
                  <MdArrowOutward />
                </div>
              </div>
              <div className="w-full h-[50px] rounded-lg bg-[#191919] flex gap-1 justify-center items-center group">
                <GrGithub size={30} className="mt-1 ml-1" />
                <a
                  href="https://github.com/jarvisonline"
                  className="text-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <div className="hidden group-hover:block">
                  <MdArrowOutward />
                </div>
              </div>
            </div>
          </ShineBorder>

          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-3 row-span-5 bg-[#101010] backdrop-blur-md rounded-xl text-white">
            <div className="flex flex-col items-center justify-center mt-5">
              <div className="w-20 h-20 rounded-full bg-[#191919] flex items-center justify-center">
                <TbGoGame size={50} color="#7b74fc" />
              </div>
              <div className="text-center mt-2">
                <div className="text-2xl">Let's Work Together</div>
                <div className="text-sm">Let's Make Magic Happen Together</div>
              </div>
              <div className="mt-5 w-full flex flex-col gap-3 items-center">
                <div className="w-[80%] h-[50px] rounded-lg bg-[#191919] flex gap-1 justify-center items-center group">
                  <FaGlobe size={30} className="mt-1 ml-1" />
                  <a
                    href="mailto:nigamaman70@gmail.com"
                    className="text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mail Me
                  </a>
                  <div className="hidden group-hover:block">
                    <MdArrowOutward />
                  </div>
                </div>
                <div className="w-[80%] h-[50px] rounded-lg bg-[#191919] flex gap-1 justify-center items-center group">
                  <FaFile size={30} className="mt-1 ml-1" />
                  <a
                    href="https://drive.google.com/your-resume-link"
                    className="text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                  <div className="hidden group-hover:block">
                    <MdArrowOutward />
                  </div>
                </div>
              </div>
            </div>
          </ShineBorder>

          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-3 row-span-4 bg-[#101010] backdrop-blur-md rounded-xl text-white">
            <div className="text-xl mb-5 flex items-center justify-center gap-2 font-manrope">
              <FaServicestack size={20} color="#7b74fc" />
              Services
            </div>
            <ServicesMarquee pauseOnHover={true} />
            <ServicesMarquee reverse={true} pauseOnHover={true} />
          </ShineBorder>

          <ShineBorder className="shine-border col-span-1 max-sm:col-span-2 max-sm:row-auto md:col-span-3 row-span-4 bg-[#101010] backdrop-blur-md rounded-xl text-white">
            <div className="text-xl mb-5 flex items-center justify-center gap-2 font-manrope">
              <FaTools size={20} color="#7b74fc" />
              My Toolkit
            </div>
            <ToolsMarquee pauseOnHover={true} />
            <ToolsMarquee reverse={true} pauseOnHover={true} />
          </ShineBorder>
        </div>
      </div>
    </div>
  );
};

export default Home;
