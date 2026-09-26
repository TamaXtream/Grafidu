"use client";

import { useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { update, useDB } from "@/lib/store";

export type QuizData = {
  id: number;
  title: string;
  meta: string;
  topic: string;
  difficulty: string;
  status: string;
  questions: { n: number; text: string }[];
};

const QUIZ_TEMPLATES: Record<string, string[]> = {
  Mudah: [
    "Apa yang dimaksud dengan {t}?",
    "Sebutkan dua contoh {t} yang kamu ketahui.",
    "Apa fungsi utama {t}?",
    "Sebutkan ciri dasar dari {t}.",
    "Apa manfaat mempelajari {t}?",
    "Jelaskan pengertian {t} dengan bahasamu sendiri.",
  ],
  Sedang: [
    "Jelaskan perbedaan {t} dengan konsep yang mirip dengannya.",
    "Analisislah contoh {t} berikut, lalu tentukan bagian-bagiannya.",
    "Diberikan teks tentang {t}, tentukan strukturnya.",
    "Mengapa {t} penting dalam keseharian? Berikan dua alasan.",
    "Bandingkan dua pendekatan dalam memahami {t}.",
    "Temukan kesalahan dalam contoh {t} berikut dan jelaskan.",
  ],
  Sulit: [
    "Evaluasilah penerapan {t} pada studi kasus yang diberikan guru.",
    "Buatlah analisis kritis mengenai {t} beserta argumen pendukung.",
    "Rancang sebuah karya/teks {t} atau turunannya, lalu jelaskan alasannya.",
    "Simpulkan benang merah dari materi {t} yang telah dipelajari.",
  ],
};

export default function TeacherQuizManager({ classes }: { classes: string[] }) {
  const db = useDB();
  const user = getCurrentUser();
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const [topic, setTopic] = useState("");
  const [selectedClass, setSelectedClass] = useState(classes[0] || "XI RPL A");
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("Sedang");
  const [generating, setGenerating] = useState(false);
  const [invalidTopic, setInvalidTopic] = useState(false);

  const quizzes: QuizData[] = (db?.quizzes ?? [])
    .filter((q) => q.createdBy === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((q) => {
      const klass = db?.classes.find((c) => c.id === q.classId)?.name ?? "";
      return {
        id: q.id,
        title: q.title,
        meta: `${klass} · ${q.numQuestions} soal · ${q.durationMin} menit`,
        topic: q.topic,
        difficulty: q.difficulty,
        status: q.status,
        questions: (db?.quizQuestions ?? [])
          .filter((qq) => qq.quizId === q.id)
          .sort((a, b) => a.idx - b.idx)
          .map((qq) => ({ n: qq.idx, text: qq.text })),
      };
    });

  function toggleAccordion(id: number) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleGenerate() {
    if (!topic.trim() || !user) {
      setInvalidTopic(true);
      window.gtoast?.("Isi topik / materi dulu agar AI bisa menyusun soal.", "error");
      return;
    }
    setInvalidTopic(false);
    if (generating) return;
    setGenerating(true);

    const rawTopic = topic.trim();
    const label = rawTopic.split("—")[0].trim().replace(/-+$/, "").trim() || rawTopic;
    const templates = QUIZ_TEMPLATES[difficulty] ?? QUIZ_TEMPLATES.Sedang;
    const questions: string[] = [];
    for (let i = 0; i < numQuestions; i++) {
      questions.push(templates[i % templates.length].replace(/\{t\}/g, label));
    }

    let newId = 0;
    update((d) => {
      const cls = d.classes.find((c) => c.name === selectedClass);
      newId = d.nextId++;
      d.quizzes.push({
        id: newId,
        classId: cls?.id ?? d.classes[0]?.id ?? 1,
        createdBy: user.id,
        title: `Kuis: ${label}`,
        topic: rawTopic,
        difficulty,
        numQuestions: questions.length,
        durationMin: Math.max(10, questions.length * 2),
        status: "draft",
        createdAt: new Date().toISOString(),
      });
      questions.forEach((text, i) => {
        d.quizQuestions.push({ id: d.nextId++, quizId: newId, idx: i + 1, text });
      });
    });
    setOpenIds((prev) => new Set(prev).add(newId));
    window.gtoast?.("Kuis berhasil dibuat oleh AI. Kuis disimpan sebagai draft.");

    // Brief loading state so the generate button's progress animation still reads.
    window.setTimeout(() => setGenerating(false), 600);
  }

  function handlePublish(id: number) {
    if (!user) return;
    update((d) => {
      const q = d.quizzes.find((x) => x.id === id && x.createdBy === user.id);
      if (q) q.status = "tayang";
    });
    window.gtoast?.("Kuis tayang ke siswa.");
  }

  function handleDelete(id: number) {
    if (!user) return;
    update((d) => {
      d.quizzes = d.quizzes.filter((x) => !(x.id === id && x.createdBy === user.id));
      d.quizQuestions = d.quizQuestions.filter((x) => x.quizId !== id);
    });
    window.gtoast?.("Kuis dihapus.");
  }

  return (
    <>
      <div className="quiz-grid" style={{ marginTop: 26 }}>
        {/* builder */}
        <div className="panel">
          <div className="panel-head">
            <span
              className="task-ic"
              style={{
                background: "#fff",
                border: "1.4px solid var(--purple)",
                color: "var(--purple)",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 15 }}>?</span>
            </span>
            <b>Buat Kuis Baru</b>
          </div>
          <div className="f2">
            <div className="field-d">
              <label>Kelas</label>
              <div className="control">
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                  {classes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field-d">
              <label>Jumlah Soal</label>
              <div className="control">
                <select value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))}>
                  <option value={10}>10 soal</option>
                  <option value={15}>15 soal</option>
                  <option value={20}>20 soal</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field-d">
            <label>Topik / Materi</label>
            <div className={"control" + (invalidTopic ? " invalid" : "")}>
              <textarea
                id="quiz-topic"
                placeholder="Contoh: Teks Eksposisi — struktur, kebahasaan, dan contoh..."
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (e.target.value.trim()) setInvalidTopic(false);
                }}
              />
            </div>
            <p className="hint">AI menyusun soal dari materi yang kamu bagikan di menu Materi.</p>
          </div>
          <div className="field-d">
            <label>Tingkat Kesulitan</label>
            <div className="diff-chips">
              {["Mudah", "Sedang", "Sulit"].map((d) => (
                <button
                  key={d}
                  className={"diff" + (difficulty === d ? " on" : "")}
                  type="button"
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <button
            className={"btn btn-primary btn-generate" + (generating ? " is-loading" : "")}
            id="btn-generate"
            type="button"
            onClick={handleGenerate}
            disabled={generating}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
            </svg>
            Generate Kuis dengan AI
          </button>
        </div>

        {/* preview */}
        <div className="panel">
          <div className="panel-head">
            <span className="task-ic" style={{ background: "var(--purple-soft)", color: "var(--purple)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
              </svg>
            </span>
            <span>
              <b>Pratinjau Soal</b>
              <span className="sub">{difficulty} · {numQuestions} soal · {selectedClass}</span>
            </span>
          </div>
          <div className="preview-list">
            <div className="preview-item"><span className="n">1</span><span>Apa yang dimaksud dengan gagasan pokok dalam sebuah teks?</span></div>
            <div className="preview-item"><span className="n">2</span><span>Pilihlah kalimat yang menggunakan ejaan baku dengan benar.</span></div>
            <div className="preview-item"><span className="n">3</span><span>Tentukan struktur teks dari paragraf berikut.</span></div>
            <div className="preview-item"><span className="n">4</span><span>Makna kata &quot;persuasif&quot; paling tepat adalah...</span></div>
            <div className="preview-item"><span className="n">5</span><span>Cocokkan jenis teks dengan ciri-cirinya berikut.</span></div>
          </div>
          <div className="preview-note">Soal lengkap beserta kunci jawaban otomatis tersimpan saat kuis dibuat.</div>
        </div>
      </div>

      <div className="sec-row">
        <h3>Kuis Saya</h3>
        <Link className="link-underline" href="/teacher/quiz">
          Semua Kuis
        </Link>
      </div>

      <div id="quiz-list">
        {quizzes.map((qz) => {
          const isOpen = openIds.has(qz.id);
          return (
            <div key={qz.id} className={"quiz-row acc-row" + (isOpen ? " open" : "")} data-quiz={qz.id}>
              <span className="task-ic">
                <span style={{ color: "var(--purple)", fontWeight: 700 }}>?</span>
              </span>
              <span className="info">
                <b>{qz.title}</b>
                <span>{qz.meta}</span>
              </span>
              <span className="right">
                <span className={"pill " + (qz.status === "tayang" ? "pill-green-plain" : "pill-gray")}>
                  {qz.status === "tayang" ? "Tayang" : "Draft"}
                </span>
                <button
                  className="chev"
                  aria-expanded={isOpen}
                  aria-label="Detail kuis"
                  onClick={() => toggleAccordion(qz.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </span>
              <div className="acc-body">
                <div>
                  <div className="acc-inner">
                    <div className="acc-title">Pratinjau Soal</div>
                    <ul className="acc-list">
                      {qz.questions.map((q) => (
                        <li key={q.n}>
                          <span className="n">{q.n}</span>
                          <span>{q.text}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="acc-meta" style={{ marginTop: 12 }}>
                      <span><b>Topik:</b> {qz.topic}</span>
                      <span><b>Tingkat:</b> {qz.difficulty}</span>
                    </div>
                    <div className="acc-actions">
                      {qz.status === "draft" ? (
                        <button
                          className="btn-mini btn-mini-primary"
                          data-publish={qz.id}
                          onClick={() => handlePublish(qz.id)}
                        >
                          Tayangkan
                        </button>
                      ) : null}
                      <button
                        className="btn-mini btn-mini-danger"
                        data-del={qz.id}
                        onClick={() => handleDelete(qz.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}