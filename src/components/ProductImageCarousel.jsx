import { useState } from 'react';
import { Camera, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImageCarousel = ({ images = [], likes = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-h-[280px] overflow-hidden rounded-lg">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="product"
        className="w-full h-[280px] object-cover"
      />

      {/* Overlay (bottom controls) */}
      <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-between items-center">
        <div className="flex items-center gap-1 bg-[#00000080] py-0.5 px-1 rounded-full">
          <Camera color="#FFFFFFCC" size={8} />
          <p className="text-[8px] text-[#FFFFFFCC] font-light">
            {currentIndex + 1}/{images.length}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-[#00000080] py-0.5 px-1 rounded-full">
          <Heart color="#FFFFFFCC" size={8} />
          <p className="text-[8px] text-[#FFFFFFCC] font-light">{likes}</p>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#00000066] hover:bg-[#00000099] p-1 rounded-full"
          >
            <ChevronLeft color="white" size={14} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#00000066] hover:bg-[#00000099] p-1 rounded-full"
          >
            <ChevronRight color="white" size={14} />
          </button>
        </>
      )}
    </div>
  );
};

export default ProductImageCarousel;