"use client";

import { useEffect, useRef } from "react";
import { getCurrentUser } from "@/lib/auth";
import { update } from "@/lib/store";

/**
 * "Bagikan Materi Baru" dialog (teacher). Opened via the "Bagikan Materi"
 * header button (which dispatches a click on #dlg-materi).
 */
export default function MateriDialog({ classes }: { classes: string[] }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const open = () => {
      if (typeof el.showModal === "function") el.showModal();
      else el.setAttribute("open", "");
    };
    el.addEventListener("click", open);
    return () => el.removeEventListener("click", open);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;
    const form = e.currentTarget as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim();
    const klass = (form.elements.namedItem("class") as HTMLSelectElement).value;
    if (!title) return;
    update((d) => {
      const cls = d.classes.find((c) => c.name === klass);
      d.materials.push({
        id: d.nextId++,
        teacherId: user.id,
        classId: cls?.id ?? d.classes[0]?.id ?? 1,
        title: `Materi: ${title}`,
        pages: 10,
        status: "tayang",
        views: 0,
        createdAt: new Date().toISOString(),
      });
    });
    ref.current?.close();
    form.reset();
    window.gtoast?.("Materi berhasil dibagikan.");
  }

  return (
    <dialog className="gdialog" id="dlg-materi" ref={ref}>
      <div className="gdialog-head">
        <div>
          <h3>Bagikan Materi Baru</h3>
          <p>Materi bisa langsung dipakai AI untuk membuat kuis.</p>
        </div>
        <button className="gdialog-close" data-close aria-label="Tutup" onClick={() => ref.current?.close()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form className="gdialog-body" style={{ paddingBottom: 0 }} onSubmit={submit}>
        <div className="field-d">
          <label htmlFor="materi-title">Judul Materi</label>
          <div className="control">
            <input id="materi-title" name="title" type="text" placeholder="Contoh: Teks Eksposisi" required />
          </div>
        </div>
        <div className="field-d">
          <label htmlFor="materi-class">Kelas Tujuan</label>
          <div className="control">
            <select id="materi-class" name="class">
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="field-d">
          <label htmlFor="materi-topic">Ringkasan / Topik</label>
          <div className="control">
            <textarea id="materi-topic" placeholder="Ringkas isi materi agar AI bisa menyusun soal..." />
          </div>
        </div>
      </form>
      <div className="gdialog-foot">
        <button className="btn btn-outline" data-close onClick={() => ref.current?.close()}>
          Batal
        </button>
        <button className="btn btn-primary" type="submit" form="dlg-materi">
          Bagikan Materi
        </button>
      </div>
    </dialog>
  );
}