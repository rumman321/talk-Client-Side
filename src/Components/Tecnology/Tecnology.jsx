import React from "react";
import { IconCloud } from "../magicui/icon-cloud";
import { Typewriter } from "react-simple-typewriter";
const slugs = [
    
    "javascript",
    "node",
    "npm",
    "react",
    "gmail",
    "firebase",
    "html5",
    "css3",
    "express",
    "gemini",
    "mongodb",
    "firebase",
    "vercel",
    "npm",
    "openai",
    "express",
    "git",
    "node",
    "github",
    "gitlab",
    "visualstudiocode",
    "shadcn",
    "html",
    "figma",
    "mongodb",
    "react",
    "html5",
    "css3",
    "openai",
    "javascript",
    "swiper",
    "magic",
  ];
const Tecnology = () => {
    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
      );
      const handleType = (count) => {
        // access word count number
      console.log(count)}
    
      const handleDone = () => {
        console.log(`Done after 5 loops!`)
      }
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-20" >
        
        <span style={{ color: 'red', fontWeight: 'bold' }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={['Technologies and Tools Behind the Scenes','Repeat!', 'Technologies and Tools Behind the Scenes', ]}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={handleDone}
            onType={handleType}
          />
        </span>
      </h1>
        {/* <h2 className="text-center text-2xl font-bold mt-20">Technologies and Tools Behind the Scenes </h2> */}
      <div className="relative flex size-full items-center justify-center overflow-hidden">
        <IconCloud images={images} />
      </div>
    </div>
  );
};

export default Tecnology;
