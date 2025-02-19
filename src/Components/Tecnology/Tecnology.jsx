import React from "react";
import { IconCloud } from "../magicui/icon-cloud";
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
  return (
    <div>
        <h2 className="text-center text-2xl font-bold mt-20">Technology & Tools Used This Project </h2>
      <div className="relative flex size-full items-center justify-center overflow-hidden">
        <IconCloud images={images} />
      </div>
    </div>
  );
};

export default Tecnology;
