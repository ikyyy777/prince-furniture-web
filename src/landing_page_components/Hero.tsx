import { useState, useEffect } from 'react';

interface Banner {
  id: number;
  name: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const Hero = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BANNERS_API_URL);
        const data = await response.json();
        if (data.success) {
          setBanners(data.banners);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swipe left
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    } else {
      // Swipe right
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="relative pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-2 sm:px-4 md:px-8" id="promo">
      <div className="container mx-auto max-w-[1200px] relative">
        <div 
          className="relative w-full rounded-lg overflow-hidden shadow-lg"
          style={{ paddingTop: 'calc(360 / 1200 * 100%)' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentBanner ? 'translate-x-0' : index < currentBanner ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <img
                src={banner.image_url}
                alt={banner.name}
                className="absolute top-0 left-0 w-full h-full object-fit"
                draggable="false"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
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