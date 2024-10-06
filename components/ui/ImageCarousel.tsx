import React, { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <button onClick={prevImage} className="absolute left-0 z-10 w-7 h-7 bg-gray-200 rounded-full translate-x-2 hidden md:block">
          &lt;
        </button>
        <div
          className="relative w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg overflow-hidden cursor-pointer"
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
          <Image
            priority
            width={200}
            height={200}
            src={images[currentIndex]}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <button onClick={nextImage} className="absolute right-0 z-10 w-7 h-7 bg-gray-200 rounded-full -translate-x-2 hidden md:block">
          &gt;
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
