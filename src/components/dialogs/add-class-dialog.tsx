"use client";

import { useEffect, useRef } from "react";
import { getCurrentUser } from "@/lib/auth";
import { update } from "@/lib/store";

/**
 * "Tambah Kelas" dialog (teacher). Mirrors the original #dlg-add-class,
 * opened via the sidebar's class-plus button (data-dialog convention:
 * click on #dlg-add-class opens it).
 */
export default function AddClassDialog() {
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
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    if (!name) return;
    update((d) => {
      let cls = d.classes.find((c) => c.name === name);
      if (!cls) {
        cls = { id: d.nextId++, name };
        d.classes.push(cls);
      }
      const teaching = d.teachings.find(
        (t) => t.classId === cls!.id && t.teacherId === user.id
      );
      if (!teaching) {
        d.teachings.push({
          classId: cls.id,
          teacherId: user.id,
          subject: user.subject || "Umum",
        });
      }
    });
    ref.current?.close();
    window.gtoast?.("Kelas baru berhasil ditambahkan.");
  }

  return (
    <dialog className="gdialog" id="dlg-add-class" ref={ref}>
      <div className="gdialog-head">
        <div>
          <h3>Tambah Kelas</h3>
          <p>Buat kelas baru dan bagikan kode join ke siswamu.</p>
        </div>
        <button className="gdialog-close" data-close aria-label="Tutup" onClick={() => ref.current?.close()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form className="gdialog-body" style={{ paddingBottom: 0 }} onSubmit={submit}>
        <div className="field-d">
          <label htmlFor="new-class-name">Nama Kelas</label>
          <div className="control">
            <input id="new-class-name" name="name" type="text" placeholder="Contoh: XI RPL D" required />
          </div>
        </div>
        <div className="field-d">
          <label htmlFor="new-class-count">Jumlah Siswa</label>
          <div className="control">
            <input id="new-class-count" name="count" type="number" min={1} max={50} defaultValue={30} required />
          </div>
        </div>
      </form>
      <div className="gdialog-foot">
        <button className="btn btn-outline" data-close onClick={() => ref.current?.close()}>
          Batal
        </button>
        <button className="btn btn-primary" type="submit" form="dlg-add-class">
          Tambah Kelas
        </button>
      </div>
    </dialog>
  );
}