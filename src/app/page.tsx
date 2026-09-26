import Image from "next/image";
import Link from "next/link";
import BodySync from "@/components/body-sync";
import NavHeader from "@/components/landing/nav-header";
import ViewTabs from "@/components/landing/view-tabs";
import SiteFooter from "@/components/landing/footer";
import ScrollReveal from "@/components/landing/scroll-reveal";

export default function LandingPage() {
  return (
    <>
      <BodySync className="landing" />
      <ScrollReveal />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* ============ NAV ============ */}
      <NavHeader />

      {/* ============ HERO ============ */}
      <section className="hero" id="main">
        <div className="hero-copy">
          <div className="eyebrow">A clearer way to learn</div>
          <h1>
            Know where
            <br />
            you are.
            <span className="accent">Know what to do next.</span>
          </h1>
          <div className="hero-rule"></div>
          <p className="lead">
            Grafidu connects grades, teacher materials, assignments, and AI recommendations so
            students can act on weak areas — and teachers can see what the class needs.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/signup">
              Start with Grafidu
            </Link>
            <a className="btn btn-outline" href="#platform">
              See how it works
            </a>
          </div>
          <div className="hero-note">For students, teachers, and the people who support them.</div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="mock-scene">
            <div className="mock">
              {/* mini sidebar */}
              <div className="mock-side">
                <div className="mock-brand">
                  <Image src="/assets/logo.png" alt="" width={15} height={15} />
                  <b>GRAFIDU</b>
                </div>
                <div className="mock-cal-label">Calendar</div>
                <div className="mock-cal-head">
                  <span>‹</span>
                  <b>Agustus 2026</b>
                  <span>›</span>
                </div>
                <div className="mcal">
                  <i className="dim">27</i><i className="dim">28</i><i className="dim">29</i><i className="dim">30</i><i className="dim">31</i><i>1</i><i className="red">2</i>
                  <i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9<span className="em">🟢</span></i>
                  <i>10</i><i>11</i><i>12<span className="em">💞</span></i><i>13</i><i>14</i><i>15</i><i className="red">16</i>
                  <i>17</i><i>18</i><i>19</i><i>20</i><i>21</i><i>22</i><i className="red">23</i>
                  <i>24</i><i>25</i><i>26</i><i className="sel">27</i><i>28</i><i className="red">29<span className="em">💗</span></i><i className="red">30</i>
                  <i>31</i><i className="dim">1</i><i className="dim">2</i><i className="dim">3</i><i className="dim">4</i><i className="dim">5</i><i className="pale-red">6</i>
                </div>
                <div className="mock-tugas-h">
                  <b>Tugas Hari Ini</b>
                  <a href="#">Lihat Semua</a>
                </div>
                <div className="mtask t-lav done">
                  <span className="box">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#181516" strokeWidth="4">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span>
                    <b>Matematika</b>
                    <span>Latihan fungsi 16:00 - 18:00</span>
                  </span>
                </div>
                <div className="mtask t-pink">
                  <span className="box"></span>
                  <span>
                    <b>English</b>
                    <span>Essay</span>
                  </span>
                </div>
                <div className="mtask t-blue">
                  <span className="box"></span>
                  <span>
                    <b>Basis Data</b>
                    <span>Basis Data Komputer</span>
                  </span>
                </div>
                <div className="mtask">
                  <span className="box"></span>
                  <span>
                    <b>Seni Budaya</b>
                    <span>Review materi 19:00</span>
                  </span>
                </div>
                <div className="mock-user">
                  <Image src="/assets/jessie-side.png" alt="" width={22} height={22} />
                  <span>
                    <b>Jessie Cooper</b>
                    <span>XI RPL B</span>
                  </span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
              </div>

              {/* mini main */}
              <div className="mock-main">
                <div className="mock-brand" style={{ marginBottom: 8 }}>
                  <Image src="/assets/logo.png" alt="" width={15} height={15} />
                  <b>GRAFIDU</b>
                </div>
                <div className="mock-profile">
                  <Image src="/assets/jessie-large.png" alt="" width={32} height={32} />
                  <span>
                    <b>
                      Jessie Cooper<span className="cls"> • XI RPL B</span>
                    </b>
                    <span className="sub" style={{ display: "block" }}>
                      6 Kelas Terjadwal | 5 Tugas Belum Terkerjakan | 1 Tugas Telah Selesai
                    </span>
                  </span>
                  <span className="mock-edit">✎ Edit Profil</span>
                </div>
                <div className="mock-h2">Overview</div>
                <div className="mock-stats">
                  <div className="mstat">
                    <b>Tugas Selesai</b>
                    <div className="row">
                      <span className="c c-green">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span className="num">
                        70<small> %</small>
                      </span>
                    </div>
                    <div className="sub s-green">Bagus! Pertahankan!</div>
                  </div>
                  <div className="mstat">
                    <b>Rata-rata Nilai</b>
                    <div className="row">
                      <span className="c c-blue">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4">
                          <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                      </span>
                      <span className="num">
                        87<small> /100</small>
                      </span>
                    </div>
                    <div className="sub s-blue">Meningkat 5 poin</div>
                  </div>
                  <div className="mstat">
                    <b>Tugas Baru</b>
                    <div className="row">
                      <span className="c c-purple">
                        <span style={{ fontSize: 13, fontWeight: 700 }}>?</span>
                      </span>
                      <span className="num">
                        8<small> Tugas</small>
                      </span>
                    </div>
                    <div className="sub s-purple">Perlu perhatian</div>
                  </div>
                </div>
                <div className="mock-h2" style={{ marginTop: 12 }}>
                  Progres Nilai per Mata Pelajaran
                </div>
                <a className="mock-see" href="#">
                  Lihat Semua
                </a>
                <table className="mock-table">
                  <tbody>
                    <tr><th>Mata Pelajaran</th><th>Nilai Rata-rata</th><th>Progress</th><th>Trend</th></tr>
                    <tr><td>Matematika</td><td>80 /100</td><td><span className="bar"><i style={{ width: "80%" }}></i></span></td><td>80% <span className="up">↗</span></td></tr>
                    <tr><td>Bahasa Inggris</td><td>90 /100</td><td><span className="bar"><i style={{ width: "90%" }}></i></span></td><td>90% <span className="up">↗</span></td></tr>
                    <tr><td>Bahasa Indonesia</td><td>78 /100</td><td><span className="bar"><i style={{ width: "78%" }}></i></span></td><td>78% <span className="up">↗</span></td></tr>
                    <tr><td>Fisika</td><td>72 /100</td><td><span className="bar"><i style={{ width: "72%" }}></i></span></td><td>72% <span className="down">↘</span></td></tr>
                    <tr><td>Kimia</td><td>85 /100</td><td><span className="bar"><i style={{ width: "85%" }}></i></span></td><td>85% <span className="up">↗</span></td></tr>
                    <tr><td>Biologi</td><td>69 /100</td><td><span className="bar"><i style={{ width: "69%" }}></i></span></td><td>69% <span className="down">↘</span></td></tr>
                    <tr><td>Sejarah</td><td>76 /100</td><td><span className="bar"><i style={{ width: "76%" }}></i></span></td><td>76% <span className="up">↗</span></td></tr>
                    <tr><td>Geografi</td><td>74 /100</td><td><span className="bar"><i style={{ width: "74%" }}></i></span></td><td>74% <span className="down">↘</span></td></tr>
                    <tr><td>Informatika</td><td>95 /100</td><td><span className="bar"><i style={{ width: "95%" }}></i></span></td><td>95% <span className="up">↗</span></td></tr>
                    <tr><td>Seni Budaya</td><td>65 /100</td><td><span className="bar"><i style={{ width: "65%" }}></i></span></td><td>65% <span className="down">↘</span></td></tr>
                  </tbody>
                </table>
                <div className="mock-h2" style={{ marginTop: 12 }}>Kelas</div>
                <div className="mteacher-grid">
                  <div className="mteacher"><Image src="/assets/bu-septi.png" alt="" width={18} height={18} /><span><b>Bu Septi Retno</b><span>Matematika</span></span></div>
                  <div className="mteacher"><Image src="/assets/mr-windah.png" alt="" width={18} height={18} /><span><b>Mr Windah Class</b><span>Informatika</span></span></div>
                  <div className="mteacher"><Image src="/assets/pak-arfan.png" alt="" width={18} height={18} /><span><b>Pak Arfan Dwinarta</b><span>Fisika</span></span></div>
                  <div className="mteacher"><Image src="/assets/bu-dewi.png" alt="" width={18} height={18} /><span><b>Bu Dewi Lestari</b><span>B. Indonesia</span></span></div>
                  <div className="mteacher"><Image src="/assets/bu-citra.png" alt="" width={18} height={18} /><span><b>Bu Citra Melati</b><span>Seni Budaya</span></span></div>
                  <div className="mteacher"><Image src="/assets/pak-raka.png" alt="" width={18} height={18} /><span><b>Pak Raka Nugraha</b><span>Matematika</span></span></div>
                </div>
              </div>

              {/* mini right */}
              <div className="mock-right">
                <h5>Nilai Terbaru</h5>
                <table className="mtable">
                  <tbody>
                    <tr><th>Subject</th><th style={{ textAlign: "center" }}>Score</th><th style={{ textAlign: "right" }}>Status</th></tr>
                    <tr><td>Matematika</td><td style={{ textAlign: "center" }}>80</td><td style={{ textAlign: "right" }}><span className="pill pill-green">Atas Rata Rata</span></td></tr>
                    <tr><td>Bahasa Inggris</td><td style={{ textAlign: "center" }}>90</td><td style={{ textAlign: "right" }}><span className="pill pill-green">Atas Rata Rata</span></td></tr>
                    <tr><td>Bahasa Indonesia</td><td style={{ textAlign: "center" }}>78</td><td style={{ textAlign: "right" }}><span className="pill pill-green">Atas Rata Rata</span></td></tr>
                    <tr><td>Fisika</td><td style={{ textAlign: "center" }}>72</td><td style={{ textAlign: "right" }}><span className="pill pill-red">Bawah Rata Rata</span></td></tr>
                    <tr><td>Kimia</td><td style={{ textAlign: "center" }}>85</td><td style={{ textAlign: "right" }}><span className="pill pill-green">Atas Rata Rata</span></td></tr>
                    <tr><td>Biologi</td><td style={{ textAlign: "center" }}>69</td><td style={{ textAlign: "right" }}><span className="pill pill-red">Bawah Rata Rata</span></td></tr>
                    <tr><td>Sejarah</td><td style={{ textAlign: "center" }}>76</td><td style={{ textAlign: "right" }}><span className="pill pill-green">Atas Rata Rata</span></td></tr>
                    <tr><td>Geografi</td><td style={{ textAlign: "center" }}>74</td><td style={{ textAlign: "right" }}><span className="pill pill-red">Bawah Rata Rata</span></td></tr>
                    <tr><td>Informatika</td><td style={{ textAlign: "center" }}>95</td><td style={{ textAlign: "right" }}><span className="pill pill-green">Atas Rata Rata</span></td></tr>
                    <tr><td>Seni Budaya</td><td style={{ textAlign: "center" }}>65</td><td style={{ textAlign: "right" }}><span className="pill pill-red">Bawah Rata Rata</span></td></tr>
                  </tbody>
                </table>
                <div className="mock-ai">
                  <h6>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                    </svg>{" "}
                    Rekomendasi AI Umum
                  </h6>
                  <div className="mock-ai-note">Fokuskan pembelajaranmu ke Seni Budaya dan lanjutkan ke Fisika</div>
                  <div className="mock-attach">
                    <span className="sq" style={{ background: "#14B8A6" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </span>
                    <span><b>Belajar: Seni Budaya - Seni Rupa</b><span>Materi 20 menit</span></span>
                  </div>
                  <div className="mock-attach">
                    <span className="sq" style={{ background: "var(--blue)" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" /><circle cx="12" cy="12" r="10" />
                      </svg>
                    </span>
                    <span><b>Quiz: 15 Soal Seni Budaya</b><span>Level: Mudah</span></span>
                  </div>
                  <div className="mock-attach">
                    <span className="sq" style={{ background: "var(--purple)" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span><b>Jawaban: 20 menit/hari</b><span>4 Hari/minggu</span></span>
                  </div>
                  <span className="mock-btn">Mulai Rekomendasi</span>
                </div>
                <div className="mock-ai" style={{ marginTop: 8 }}>
                  <h6 style={{ marginBottom: 6 }}>Pengumuman</h6>
                  <div className="mock-ai-note" style={{ background: "#FFF6E1", borderLeftColor: "#E8B93B", color: "#5A4A22" }}>
                    Ujian Akhir Semester — 10 Sep 2026
                  </div>
                  <div className="mock-ai-note" style={{ background: "#F4F4F5", borderLeftColor: "#C9C7CE", color: "#4A4A4E", marginTop: 5 }}>
                    Kumpulkan tugas sebelum 1 Sep
                  </div>
                </div>
              </div>

              {/* floating nav + fab */}
              <div className="mock-nav">
                <a className="on">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                  Home
                </a>
                <a>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h13M3 12h9M3 18h13" />
                    <path d="m19 5 2 2-2 2" />
                  </svg>
                  Tasks
                </a>
                <a>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M8 17v-6M13 17V7M18 17v-3" />
                  </svg>
                  Grades
                </a>
                <a>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                  </svg>
                  AI Agent
                </a>
              </div>
              <div className="mock-fab">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                </svg>
              </div>
            </div>
          </div>

          {/* floating cards */}
          <div className="float-card float-insight">
            <span className="ic">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m10.29 3.86-8.53 14.14A2 2 0 0 0 3.47 21h17.06a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
            </span>
            <span>
              <h4>Insight Guru</h4>
              <p>60% siswa butuh remedial di Trigonometri</p>
            </span>
          </div>
          <div className="float-card float-quiz">
            <span className="ic">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M2 12l4 4L14 8" />
                <path d="M10 12l4 4 8-8" />
              </svg>
            </span>
            <span>
              <div className="t1">Kuis dibuat</div>
              <div className="t2">12 detik</div>
            </span>
          </div>
        </div>
      </section>

      {/* ============ STRIP ============ */}
      <div className="strip">
        <div className="container strip-inner">
          <span className="l">Learning data should lead somewhere.</span>
          <span className="r">Grafidu turns “my score is low” into a practical next step.</span>
        </div>
      </div>

      {/* ============ PLATFORM ============ */}
      <section className="section" id="platform">
        <div className="container">
          <div className="sec-head reveal">
            <h2>
              Everything revolves around
              <br />
              one question:
              <br />
              <span className="accent u">what needs attention?</span>
            </h2>
            <p>
              No maze of menus. No pile of disconnected tools. Grafidu puts the useful parts of
              schoolwork in one place and keeps the path forward visible.
            </p>
            <span className="label-caps sec-label">The Platform</span>
          </div>
          <div className="rows reveal">
            <div className="row-item">
              <span className="num">01</span>
              <h3>Track the details</h3>
              <p>
                Students can enter results by subject and build a simple history of where their
                performance changes over time.
              </p>
              <span className="row-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </div>
            <div className="row-item">
              <span className="num">02</span>
              <h3>Keep classwork close</h3>
              <p>
                Teachers share materials and tasks directly. Students get one place to find what they
                are supposed to learn.
              </p>
              <span className="row-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </div>
            <div className="row-item">
              <span className="num">03</span>
              <h3>Ask the AI for a plan</h3>
              <p>
                When results show a weak area, Grafidu can turn it into a study plan or a quiz based
                on the material provided by the teacher.
              </p>
              <span className="row-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </div>
            <div className="row-item">
              <span className="num">04</span>
              <h3>See the class clearly</h3>
              <p>
                Teachers can spot class-wide patterns, unfinished work, and students who may need a
                closer look without manually stitching the data together.
              </p>
              <span className="row-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GRADES BAND ============ */}
      <section className="grades-band" id="students">
        <div className="container grades-grid">
          <div className="grade-card reveal">
            <div className="grade-card-head">
              <b>Jessie Cooper · XI RPL B</b>
              <span>Current grades</span>
            </div>
            <div className="grade-row">
              <span>Matematika</span>
              <span className="score">80</span>
              <span className="pill pill-green">Above average</span>
            </div>
            <div className="grade-row">
              <span>Fisika</span>
              <span className="score">72</span>
              <span className="pill pill-red">Needs work</span>
            </div>
            <div className="grade-row">
              <span>Biologi</span>
              <span className="score">69</span>
              <span className="pill pill-red">Needs work</span>
            </div>
            <div className="grade-row">
              <span>Informatika</span>
              <span className="score">95</span>
              <span className="pill pill-green">Above average</span>
            </div>
            <div className="grade-row" style={{ borderBottom: "none" }}>
              <span>Seni Budaya</span>
              <span className="score">65</span>
              <span className="pill pill-red">Needs work</span>
            </div>
            <div className="grade-note">Focus on Seni Budaya first, then continue with Fisika.</div>
          </div>
          <div className="grades-copy reveal" data-delay="1">
            <span className="label-caps">For Students</span>
            <h2>
              Your grades
              <br />
              become a <span className="accent u">map</span>.
            </h2>
            <p>
              A low score shouldn’t be the end of the story. Grafidu helps connect that score to
              materials, practice, and a next session of focused study.
            </p>
            <ul className="grades-list">
              <li><span className="n">01</span><span>See which subjects are falling behind.</span></li>
              <li><span className="n">02</span><span>Open the teacher’s material without hunting for it.</span></li>
              <li><span className="n">03</span><span>Generate a realistic study plan instead of an overwhelming to-do list.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ VIEWS TABS ============ */}
      <section className="section" id="teachers" style={{ paddingTop: 96 }}>
        <div className="container">
          <ViewTabs />
        </div>
      </section>

      {/* ============ AI SECTION ============ */}
      <section className="section" id="ai">
        <div className="container">
          <div className="sec-head reveal">
            <h2>
              Not “AI for AI’s sake.” Just a
              <br />
              better <span className="accent u">next step</span>.
            </h2>
            <p>
              Grafidu’s useful moment is not the chatbot. It is the connection between a student’s
              actual results and the material a teacher has already shared.
            </p>
            <span className="label-caps sec-label">AI, with context</span>
          </div>
          <div className="rows reveal" data-delay="1">
            <div className="row-item">
              <span className="num">01</span>
              <h3>Recommend</h3>
              <p>“Seni Budaya is your weakest subject right now.” The recommendation starts with something concrete.</p>
              <span className="row-icon"><span className="ai-txt">AI</span></span>
            </div>
            <div className="row-item">
              <span className="num">02</span>
              <h3>Plan</h3>
              <p>Turn that gap into a manageable routine: what to review, how long to study, and what to do next.</p>
              <span className="row-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
            </div>
            <div className="row-item">
              <span className="num">03</span>
              <h3>Practice</h3>
              <p>Generate a quiz from the teacher’s material so practice stays tied to what is actually being taught.</p>
              <span className="row-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg></span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROOF STRIP ============ */}
      <div className="strip">
        <div className="container strip-inner">
          <span className="l"><strong>12 schools</strong> across Indonesia run on Grafidu.</span>
          <span className="r">&ldquo;Grades and tasks finally live in one place.&rdquo; &mdash; Bu Septi Retno, Math Teacher</span>
        </div>
      </div>

      {/* ============ START CTA ============ */}
      <section className="start">
        <div className="container">
          <div className="start-grid reveal">
            <div>
              <span className="label-caps">Start Here</span>
              <h2>
                Make the next study session
                <br />
                <span className="accent u">count</span>.
              </h2>
              <p className="lead">
                Grafidu is built around a simple idea: academic data is useful when somebody can act on
                it. Give students direction and teachers visibility.
              </p>
              <div className="start-ctas">
                <Link className="btn btn-primary" href="/signup">
                  Start with Grafidu
                </Link>
                <a className="btn btn-outline" href="#platform">
                  Read the platform overview
                </a>
              </div>
            </div>
            <p className="start-note">
              Designed for the everyday reality of school: many subjects, many tasks, and not enough time
              to figure out what matters first.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <SiteFooter />
    </>
  );
}