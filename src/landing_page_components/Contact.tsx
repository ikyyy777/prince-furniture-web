import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Kontak = () => {
  return (
    <section className="py-20 bg-gray-50" id="kontak">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12">Get in Touch</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  className="gmap_iframe"
                  width="100%"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=prince furniture&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
                <a href="https://princefurniture.com/">Prince Furniture</a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-gray-700 mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Visit Us</h3>
                <p className="text-gray-600">
                  123 Design Street<br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-gray-700 mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-gray-700 mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-gray-700 mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Email</h3>
                <p className="text-gray-600">info@mobel.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontak;