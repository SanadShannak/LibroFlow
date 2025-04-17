import { Variants, Transition } from "framer-motion";

type Direction = "left" | "right" | "top" | "bottom";

export const getPageVariants = (direction: Direction): Variants => {
  const distance = 100;

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const value = direction === "left" || direction === "top" ? -distance : distance;

  return {
    initial: { opacity: 0, [axis]: value },
    animate: { opacity: 1, [axis]: 0 },
    exit: { opacity: 0, [axis]: value },
  };
};

export const pageTransition: Transition = {
  type: "tween",
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother motion
};
