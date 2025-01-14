import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const promoBanners = [
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=2000&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2000&q=80',
  },
];

const Hero = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % promoBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev + 1) % promoBanners.length);
  };

  const prevSlide = () => {
    setCurrentBanner((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);
  };

  return (
    <section className="relative pt-28 pb-16 px-4 md:px-8" id="promo">
      <div className="container mx-auto max-w-[1500px] relative">
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
          {promoBanners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentBanner ? 'translate-x-0' : index < currentBanner ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <img
                src={banner.image}
                alt="Promo Banner"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-1 md:p-2 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-1 md:p-2 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {promoBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;