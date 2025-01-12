import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80',
    title: 'Modern Living Spaces',
    subtitle: 'Designed for Contemporary Lifestyles',
  },
  {
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=2000&q=80',
    title: 'Timeless Elegance',
    subtitle: 'Crafted with Precision',
  },
  {
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2000&q=80',
    title: 'Minimalist Design',
    subtitle: 'Maximum Impact',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden" id="beranda">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/30" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-light mb-4 transform translate-y-0 transition-transform duration-1000">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 transform translate-y-0 transition-transform duration-1000 delay-200">
                {slide.subtitle}
              </p>
              <button className="bg-white text-gray-900 px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 transform translate-y-0 transition-transform duration-1000 delay-400">
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-1 md:p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
      >
        <ChevronLeft className="text-white" size={24}/>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-1 md:p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-1 md:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-4 md:w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;