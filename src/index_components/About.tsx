import { Trophy, Users, Star, Truck } from 'lucide-react';

const stats = [
  { icon: Trophy, value: '30+', label: 'Tahun Pengalaman' },
  { icon: Users, value: '10k+', label: 'Total Penjualan' }, 
  { icon: Star, value: '5.0', label: 'Rating Rata-rata' },
  { icon: Truck, value: '1 Hari', label: 'Waktu Pengiriman' },
];

const Tentang = () => {
  return (
    <section className="py-20 bg-white text-black" id="tentang">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-[#990100]">Tentang Kami</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Kami adalah perusahaan furniture terpercaya yang telah melayani pelanggan selama lebih dari 30 tahun. Dengan komitmen untuk kualitas dan kepuasan pelanggan, kami terus berinovasi untuk menghadirkan produk furniture terbaik untuk rumah Anda.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-white to-[#990100]/10 rounded-lg border border-[#990100]/20 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#990100]" />
              <div className="text-3xl font-medium mb-2 text-[#990100]">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tentang;
