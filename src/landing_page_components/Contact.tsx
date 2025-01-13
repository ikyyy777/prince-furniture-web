import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Kontak = () => {
  return (
    <section className="py-20 bg-gray-50" id="kontak">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-black">Kontak Kami</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  className="gmap_iframe"
                  width="100%"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=prince furniture&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
                <a href="https://princefurniture.com/" className="text-black">Prince Furniture</a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 mt-1 text-black" />
              <div>
                <h3 className="text-xl font-medium mb-2 text-black">Alamat</h3>
                <p className="text-gray-800">
                Jl. Komisaris Bambang Suprapto No.103, Cigrobak, Purwokerto Lor, Kec. Purwokerto Timur.<br />
                Kabupaten Banyumas, Jawa Tengah 53111
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 mt-1 text-black" />
              <div>
                <h3 className="text-xl font-medium mb-2 text-black">Jam Buka</h3>
                <p className="text-gray-800">
                  Setiap Hari: 8:30 AM - 17:00<br />
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 mt-1 text-black" />
              <div>
                <h3 className="text-xl font-medium mb-2 text-black">Hubungi Kami</h3>
                <p className="text-gray-800">+62 851-0063-1631</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 mt-1 text-black" />
              <div>
                <h3 className="text-xl font-medium mb-2 text-black">Email</h3>
                <p className="text-gray-800">princefurniturepwt@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontak;