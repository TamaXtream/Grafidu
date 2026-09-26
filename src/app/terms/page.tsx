import Link from "next/link";
import Image from "next/image";
import BodySync from "@/components/body-sync";
import SiteFooter from "@/components/landing/footer";

export const metadata = {
  title: "Syarat & Ketentuan — Grafidu",
};

export default function TermsPage() {
  return (
    <>
      <BodySync className="landing" />

      {/* Nav */}
      <header className="nav">
        <div className="container nav-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Link className="brand" href="/">
            <Image src="/assets/logo.png" alt="Grafidu" width={28} height={28} />
            <span>GRAFIDU</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link className="signin" href="/login">Sign in</Link>
            <Link className="btn btn-primary btn-sm" href="/signup">Try Grafidu</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 840, margin: "0 auto", padding: "64px 24px 80px" }}>
        <div className="crumbs" style={{ marginBottom: 20 }}>
          <Link href="/">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Beranda
          </Link>
          <span className="sep">/</span>
          <b>Terms &amp; Policies</b>
        </div>

        <div className="eyebrow" style={{ marginBottom: 12 }}>Ketentuan Resmi &amp; Penggunaan Layanan</div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 42px)", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 12px" }}>
          Syarat &amp; Kebijakan Layanan (Terms &amp; Policies)
        </h1>
        <span style={{ fontSize: 13, color: "var(--gray-4)", display: "block", marginBottom: 36 }}>
          Terakhir diperbarui: 15 September 2026
        </span>

        <div style={{ display: "grid", gap: 28, fontSize: 15, lineHeight: 1.75, color: "var(--gray-1)" }}>
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>
              1. Penerimaan Ketentuan
            </h2>
            <p>
              Dengan mendaftar, mengakses, atau menggunakan platform Grafidu, Anda menyetujui untuk terikat oleh Syarat dan Kebijakan Layanan ini. Apabila Anda tidak menyetujui ketentuan ini, Anda dipersilakan untuk tidak menggunakan platform.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>
              2. Akun dan Tanggung Jawab Pengguna
            </h2>
            <p>
              Pengguna bertanggung jawab penuh atas kerahasiaan informasi akun dan kata sandi yang digunakan. Akun siswa hanya boleh digunakan oleh siswa bersangkutan untuk keperluan pembelajaran, pengumpulan tugas, dan kuis akademik. Pengguna dilarang membagikan kredensial login kepada pihak di luar institusi.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>
              3. Hak Cipta dan Materi Pembelajaran
            </h2>
            <p>
              Materi ajar, modul PDF, dan soal kuis yang diunggah oleh guru atau pihak sekolah tetap menjadi hak milik intelektual guru dan sekolah bersangkutan. Grafidu memegang lisensi terbatas untuk menampilkan dan memproses materi tersebut guna kebutuhan pembelajaran dan analisis AI siswa.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>
              4. Pemanfaatan Asisten Pembelajaran AI
            </h2>
            <p>
              Rekomendasi belajar dan butir soal kuis yang dihasilkan oleh AI Agent Grafidu disediakan sebagai alat bantu pendamping belajar. Evaluasi formal dan penentuan kelulusan tetap berada di bawah wewenang guru pengampu dan kebijakan sekolah.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>
              5. Perubahan Ketentuan
            </h2>
            <p>
              Grafidu berhak memperbarui ketentuan ini dari waktu ke waktu. Setiap perubahan substansial akan diumumkan melalui papan pengumuman resmi platform.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
