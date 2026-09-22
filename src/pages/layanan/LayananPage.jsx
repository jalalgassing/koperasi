import "./LayananPage.css";

export default function LayananPage() {
  return (
    <>
      <section className="layanan-hero">
        <div className="container">
          <h1 className="layanan-hero__title">
            Solusi yang mendukung
            <br />
            pertumbuhan bisnis anda
          </h1>
          <p className="layanan-hero__desc">
            Berbagai layanan dan teknologi yang dirancang untuk membantu UMKM,
            koperasi, dan badan usaha kecil-menengah berkembang lebih mudah.
          </p>
        </div>
      </section>

      {/*
        Konten daftar layanan (kartu layanan, kategori, dsb.) menyusul setelah
        desain dari tim lengkap. Sengaja dikosongkan dulu sesuai instruksi.
      */}
      <section className="layanan-placeholder">
        <div className="container layanan-placeholder__inner">
          <p>Daftar layanan akan ditambahkan di sini.</p>
        </div>
      </section>
    </>
  );
}
