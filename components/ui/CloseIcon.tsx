import { motion } from "framer-motion";

export const CloseIcon = () => {
    return (
      <motion.svg
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.05,
          },
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="36" // Increased from 24 to 36
        height="36" // Increased from 24 to 36
        viewBox="0 0 36 36" // Increased from 0 0 24 24 to 0 0 36 36
        fill="none"
        stroke="currentColor"
        strokeWidth="2" // Increased from 2 to 3
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-black z-20" // Increased from h-4 w-4 to h-6 w-6
      >
        <path stroke="none" d="M0 0h36v36H0z" fill="none" /> // Increased from 24 to 36
        <path d="M27 9l-18 18" /> // Adjusted coordinates for larger size
        <path d="M9 9l18 18" /> // Adjusted coordinates for larger size
      </motion.svg>
    );
  };