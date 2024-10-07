import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";


interface ImageCarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [x, setX] = useState(100);
  const totalImages = images.length;

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    setX(100);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    setX(-100);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <button onClick={prevImage} className="absolute left-2 z-10 w-8 h-8 bg-gray-100 text-black rounded-full hidden md:flex items-center justify-center hover:bg-white hover:scale-105">
          <ChevronLeft />
        </button>
        <div
          className="relative w-full h-96 sm:rounded-tr-lg sm:rounded-tl-lg overflow-hidden cursor-pointer"
          onClick={nextImage}
          onTouchStart={(e) => {
            const touchStartX = e.touches[0].clientX;
            const handleTouchEnd = (event: TouchEvent) => {
              const touchEndX = event.changedTouches[0].clientX;
              if (touchStartX - touchEndX > 50) {
                nextImage();
              } else if (touchEndX - touchStartX > 50) {
                prevImage();
              }
              document.removeEventListener('touchend', handleTouchEnd);
            };
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          <motion.div
            key={currentIndex}
            initial={{ x: -x, /*opacity: 0 */ }}
            animate={{ x: 0, /*opacity: 1,*/ transition: { duration: .5, ease: "easeInOut" } }}
            // exit={{ x: x, opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            // transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              priority
              width={200}
              height={300} 
              src={images[currentIndex]}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
        <button onClick={nextImage} className="absolute right-2 z-10 w-8 h-8 bg-gray-100 text-black rounded-full hidden md:flex items-center justify-center hover:bg-white hover:scale-105">
          <ChevronRight />
        </button>
      </div>
      <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;