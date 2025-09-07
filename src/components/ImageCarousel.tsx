import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ImageModal from './ImageModal';

// Import all images from the previous work folder
import work1 from '../assets/previous/Silverpin-work.jpeg';
import work2 from '../assets/previous/Silverpin-work1.jpeg';
import work3 from '../assets/previous/Silverpin-work2.jpeg';
import work4 from '../assets/previous/Silverpin-work3.jpeg';
import work5 from '../assets/previous/Silverpin-work4.jpeg';
import work6 from '../assets/previous/Silverpin-work5.jpeg';
import work7 from '../assets/previous/Silverpin-work6.jpeg';
import work8 from '../assets/previous/Silverpin-work7.jpeg';
import work9 from '../assets/previous/Silverpin-work8.jpeg';
import work10 from '../assets/previous/Silverpin-work9.jpeg';
import work11 from '../assets/previous/Silverpin-work10.jpeg';
import work12 from '../assets/previous/Silverpin-work11.jpeg';
import work13 from '../assets/previous/Silverpin-work12.jpeg';
import work14 from '../assets/previous/Silverpin-work13.jpeg';

const images = [
  work1, work2, work3, work4, work5, work6, work7,
  work8, work9, work10, work11, work12, work13, work14
];

interface ImageCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  autoPlay = false, 
  autoPlayInterval = 4000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 16; // 1rem gap
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 16; // 1rem gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth'
      });
    }
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setModalImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Navigation arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-800 p-3 rounded-full transition-all duration-200 hover:scale-110 border border-gray-200"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-800 p-3 rounded-full transition-all duration-200 hover:scale-110 border border-gray-200"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>

      {/* Horizontal scroll container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-12 py-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image}
                alt={`Previous work ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={images}
        currentIndex={modalImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;