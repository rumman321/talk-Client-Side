import { Globe } from "../magicui/globe";

const Banner = () => {
  return (
    <div className="  relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background px-4 pb-8 pt-8 md:pb-60">
      <div className="relative z-10 text-center">
        {" "}
        {/* Added z-index and container */}
        <span className="block bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-7xl font-semibold leading-none text-transparent dark:from-gray-100 dark:to-gray-400 sm:text-5xl md:text-7xl">
          {" "}
          {/* Responsive font sizing */}
          You Are The World Now !
        </span>
      </div>
      {/* If the Globe component has an inline z-index greater than 0, the z-0 class will be ignored.that's we used style={{ zIndex: 0 }} is also an inline style, but it's being applied directly to the Globe component  */}
      <Globe
        className="absolute top-20 left-0 right-0 mx-auto"
        style={{ zIndex: 0 }}
      />{" "}
      {/* Centered Globe, z-index adjusted */}
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
};

export default Banner;
