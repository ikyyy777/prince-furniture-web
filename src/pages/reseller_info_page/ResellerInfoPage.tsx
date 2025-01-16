import { useState } from 'react';

const ResellerInfoPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '', 
    noTelp: '',
    alamat: '',
    alasanBergabung: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data formulir:', formData);
  };

  return (
    <section className="py-20 bg-gray-50" id="reseller">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-8 text-gray-800">Program Reseller Prince Furniture</h2>
        
        <div className="max-w-3xl mx-auto mb-12">
          <div className="prose prose-lg mx-auto text-gray-600">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">Mengapa Bergabung dengan Kami?</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Margin keuntungan yang menarik hingga 30%</li>
              <li>Dukungan pemasaran dan materi promosi</li>
              <li>Pelatihan product knowledge secara berkala</li>
              <li>Sistem dropship yang memudahkan</li>
              <li>Produk berkualitas dengan garansi resmi</li>
            </ul>

            <h3 className="text-2xl font-medium text-gray-800 mb-4">Syarat Menjadi Reseller</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Memiliki KTP dan NPWP</li>
              <li>Memiliki toko fisik atau online shop aktif</li>
              <li>Minimal pembelian pertama Rp 5.000.000</li>
              <li>Berkomitmen untuk mengembangkan bisnis bersama</li>
            </ul>

            <h3 className="text-2xl font-medium text-gray-800 mb-4">Cara Bergabung</h3>
            <ol className="list-decimal pl-6 mb-8 space-y-2">
              <li>Klik tombol "Daftar Jadi Reseller" di bawah</li>
              <li>Isi formulir pendaftaran dengan lengkap</li>
              <li>Tim kami akan menghubungi Anda dalam 1x24 jam</li>
              <li>Lakukan meeting online untuk diskusi lebih lanjut</li>
              <li>Tanda tangan kontrak kerjasama</li>
            </ol>
          </div>

          {!showForm ? (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowForm(true)}
                className="bg-gray-100 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300 text-lg border border-gray-300"
              >
                Daftar Jadi Reseller
              </button>
            </div>
          ) : (
            <div className={`mt-12 bg-white p-8 rounded-lg shadow-sm transform transition-all duration-500 ease-in-out ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-2xl font-medium text-center mb-8 text-gray-800">Formulir Pendaftaran Reseller</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-600 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="noTelp" className="block text-sm font-medium text-gray-600 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="noTelp"
                    name="noTelp"
                    value={formData.noTelp}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-600 mb-1">
                    Alamat
                  </label>
                  <input
                    type="text"
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="alasanBergabung" className="block text-sm font-medium text-gray-600 mb-1">
                    Alasan Ingin Bergabung
                  </label>
                  <textarea
                    id="alasanBergabung"
                    name="alasanBergabung"
                    value={formData.alasanBergabung}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gray-100 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
                  >
                    Kirim Pendaftaran
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResellerInfoPage;
