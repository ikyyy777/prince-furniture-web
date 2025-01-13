import { Trophy, Users, Star, Truck } from 'lucide-react';

const stats = [
  { icon: Trophy, value: '30+', label: 'Years of Excellence' },
  { icon: Users, value: '10k+', label: 'Happy Customers' },
  { icon: Star, value: '5.0', label: 'Average Rating' },
  { icon: Truck, value: 'Same Day', label: 'Delivery Time' },
];

const Tentang = () => {
  return (
    <section className="py-20 bg-white text-black" id="tentang">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-light mb-6 text-black">Cerita Kami</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
              alt="Workspace"
              className="rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
              alt="Living room"
              className="rounded-lg mt-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-lg"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-gray-700" />
              <div className="text-3xl font-medium mb-2 text-black">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tentang;
