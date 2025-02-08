import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";

const cardContents = [
  {
    image: "/images/2.png",
    content:
      "Amazon Clone Homepage replicates Amazon's interface using HTML, CSS, JavaScript, and Font Awesome. Hosted on Render, it features product display, a search bar, user authentication, and cart functionality, showcasing modern web development",
    link: "https://amazon-clone-gefd.onrender.com/",
  },
  {
    image: "/images/3.avif",
    content:
      "Welcome to Buildcon, a dynamic and engaging landing page built using Bootstrap and enhanced with GSAP animations! This project is inspired by Divinector's YouTube tutorial and has been further customized to add some GSAP magic for smooth and captivating animations 💻🚀.",
    link: "https://buildcon-z0ss.onrender.com/",
  },
  {
    image: "/images/4.png",
    content:
      "I had made 10 vanilla JS projects as beginner projects: Animated Menu Slider, Currency Converter, Digital Clock, Glassmorphism Calculator, Memory-Card Game, OTP Verification Form, Password Generator, Quiz App, Synonyms Search App, and Whack a Mole.",
    link: "https://vanilla-js-projects.onrender.com",
  },
  {
    image: "/images/5.png",
    content:
      "Created a 2D mini portfolio using Kaboom.js for game development and Terser for JavaScript minification, showcasing interactive elements and optimized code performance.",
    link: "https://twod-mini-portfolio.onrender.com",
  },
  {
    image: "/images/6.jpeg",
    content:
      "Developed a Doze STD clone using GSAP to create a smooth scroll-based web animation with sequenced image/frame transitions, delivering an immersive visual storytelling experience.",
    link: "https://doze-std.onrender.com",
  },
  {
    image: "/images/7.jpeg",
    content:
      "Created a Giphy clone using React and Vite, featuring a Pacman-themed loader animation for a fun and engaging user experience while searching and browsing GIFs.",
    link: "https://giphy-clone-qt2a.onrender.com",
  },
  {
    image: "/images/8.png",
    content:
      "Developed an interactive GSAP ScrollTrigger project showcasing smooth scroll-based animations, parallax effects, and timeline sequencing for engaging user experiences.",
    link: "https://scrolltrigger-project.onrender.com",
  },
  {
    image: "/images/9.png",
    content:
      "Developed an interactive GSAP ScrollTrigger project using Locomotive JS, showcasing smooth scroll-based animations, parallax effects, and timeline sequencing for engaging user experiences.",
    link: "https://locomotive-js-project.onrender.com",
  },
  {
    image: "/images/10.png",
    content:
      "Developed an award-winning website clone of Rejouice (version 1) using GSAP and Locomotive JS, featuring advanced scroll-based animations, smooth transitions, and a modern UI/UX design. This project showcases my ability to replicate complex web designs with precision.",
    link: "https://rejouice-n6gm.onrender.com",
  },

  {
    image: "/images/1.png",
    content:
      "Zentry Gaming Clone Website: A fully responsive gaming platform that allows users to explore, review, and play a variety of games. The site features an intuitive interface, user authentication, and a dynamic game catalog.",
    link: "https://zentry-uoq3.onrender.com",
  },
];

const backgroundColors = [
  "#050505",
  "#0f0c29",
  "#302b63",
  "#1e3c72",
  "#2a5298",
  "#283c86",
  "#45a247",
  "#3a1c71",
  "#d76d77",
  "#ffaf7b",
  "#0f2027",
  "#050505",
];

const StepsSection = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const stickySection = document.querySelector(".steps");
    const stickyHeight = window.innerHeight * 3;
    const cards = document.querySelectorAll(".card");
    const countContainer = document.querySelector(".count-container");
    const totalCards = cards.length;

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        positonCards(self.progress);
        changeBackgroundColor(self.progress);

        // Vanish text logic based on progress
        const vanishText = document.querySelector(".vanish");
        gsap.to(vanishText, {
          opacity: 1 - self.progress, // Fade out as progress increases
          ease: "power1.out",
        });
      },
    });

    const getRadius = () => {
      return window.innerWidth < 640
        ? window.innerWidth * 12.5
        : window.innerWidth * 7.5;
    };
    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;

    function positonCards(progress = 0) {
      const radius = getRadius();
      const totalTravel = 1 + totalCards / 7.5;
      const adjustedProgress = (progress * totalTravel - 1) * 0.75;
      cards.forEach((card, i) => {
        const normalizedProgress = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalizedProgress + adjustedProgress;
        const angle = startAngle + arcAngle * cardProgress;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = (angle - Math.PI / 2) * (180 / Math.PI);
        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
        });
      });
    }
    positonCards(0);

    let lastScrollY = 0;

    const options = {
      root: null,
      rootMargin: "0% 0%",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lastScrollY = window.scrollY;
          let cardIndex = Array.from(cards).indexOf(entry.target);
          setCurrentCardIndex(cardIndex);

          const targetY = 150 - (cardIndex + 1) * 150;
          gsap.to(countContainer, {
            y: targetY,
            duration: 0.3,
            ease: "power1.out",
            overwrite: true,
          });
        }
      });
    }, options);
    cards.forEach((card) => {
      observer.observe(card);
    });

    window.addEventListener("resize", () => positonCards(0));

    function changeBackgroundColor(progress) {
      const index = Math.floor(progress * totalCards);
      const newColor =
        backgroundColors[index] ||
        backgroundColors[backgroundColors.length - 1];
      document.body.style.backgroundColor = newColor;
    }
  });

  return (
    <div
      className="overflow-hidden max-sm:relative max-sm:z-0"
      style={{ background: backgroundColors[currentCardIndex] }}
    >
      <section className="steps">
        <div className="step-counter">
          <div className="counter-title">
            <h1 className="vanish text-white text-6xl font-extrabold tracking-tight">
              Projects
            </h1>
          </div>
          <div className="count">
            <div className="count-container">
              {cardContents.map((_, index) => (
                <h1 key={index} className="text-white text-8xl font-extrabold">
                  {String(index + 1).padStart(2, "0")}
                </h1>
              ))}
            </div>
          </div>
        </div>
        <div className="cards">
          {cardContents.map((card, index) => (
            <a
              key={index}
              className="card"
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card-img">
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="card-content">
                <p className="text-white text-lg font-medium">{card.content}</p>
              </div>
            </a>
          ))}
          <div className="card empty"></div>
          <div className="card empty"></div>
        </div>
      </section>
    </div>
  );
};

export default StepsSection;
