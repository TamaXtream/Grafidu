"use client";

import { useState } from "react";
import Link from "next/link";

export default function ViewTabs() {
  const [view, setView] = useState<"student" | "teacher">("student");

  return (
    <>
      <div className="viewtabs reveal">
        <button
          className={"viewtab" + (view === "student" ? " on" : "")}
          onClick={() => setView("student")}
        >
          Student view
        </button>
        <button
          className={"viewtab" + (view === "teacher" ? " on" : "")}
          onClick={() => setView("teacher")}
        >
          Teacher view
        </button>
      </div>

      {/* student panel */}
      <div
        className="view-panel reveal"
        id="panel-student"
        data-delay="1"
        style={{ display: view === "student" ? "" : "none" }}
      >
        <div className="view-copy">
          <span className="label-caps">Student</span>
          <h2>
            Less guessing.
            <br />
            More
            <br />
            <span className="accent u">focused practice</span>.
          </h2>
          <p>
            Students see progress by subject, get recommendations based on weak areas, and can turn
            teacher materials into practice.
          </p>
          <Link className="btn btn-outline" href="/student/home">
            Explore the student side
          </Link>
        </div>
        <div className="overview-box">
          <div className="ov-left">
            <div className="ov-head">
              <span>My learning overview</span>
              <span>August 2026</span>
            </div>
            <div className="ov-score">87</div>
            <div className="ov-sub">average score / 100</div>
            <div className="ov-bars">
              <div className="ov-bar">
                <span>Matematika</span>
                <span className="track">
                  <i style={{ width: "80%" }}></i>
                </span>
                <span className="val">80</span>
              </div>
              <div className="ov-bar">
                <span>Fisika</span>
                <span className="track">
                  <i style={{ width: "72%" }}></i>
                </span>
                <span className="val">72</span>
              </div>
              <div className="ov-bar">
                <span>Biologi</span>
                <span className="track">
                  <i style={{ width: "69%" }}></i>
                </span>
                <span className="val">69</span>
              </div>
              <div className="ov-bar">
                <span>Informatika</span>
                <span className="track">
                  <i style={{ width: "95%" }}></i>
                </span>
                <span className="val">95</span>
              </div>
            </div>
          </div>
          <div className="ov-right">
            <div className="ov-mini">
              <b>3</b>
              <span>weak subjects to review</span>
            </div>
            <div className="ov-mini">
              <b>8</b>
              <span>new tasks</span>
            </div>
            <div className="ov-mini ov-note">
              AI suggests a short Seni Budaya review before your next quiz.
            </div>
          </div>
        </div>
      </div>

      {/* teacher panel */}
      <div
        className="view-panel reveal"
        id="panel-teacher"
        data-delay="1"
        style={{ display: view === "teacher" ? "" : "none" }}
      >
        <div className="view-copy">
          <span className="label-caps">Teacher</span>
          <h2>
            See the class
            <br />
            clearly. Plan
            <br />
            <span className="accent u">what comes next</span>.
          </h2>
          <p>
            Teachers can spot class-wide patterns, share materials in one place, and follow up on
            students who need a closer look.
          </p>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => window.gtoast?.("Dashboard guru sedang dalam pengembangan — belum tersedia di versi ini.")}
          >
            Explore the teacher side
          </button>
        </div>
        <div className="overview-box">
          <div className="ov-left">
            <div className="ov-head">
              <span>My class overview</span>
              <span>XI RPL A</span>
            </div>
            <div className="ov-score">85</div>
            <div className="ov-sub">class average / 100</div>
            <div className="ov-bars">
              <div className="ov-bar">
                <span>Arfan D.</span>
                <span className="track">
                  <i style={{ width: "98%" }}></i>
                </span>
                <span className="val">98</span>
              </div>
              <div className="ov-bar">
                <span>Gibran R.</span>
                <span className="track">
                  <i style={{ width: "95%" }}></i>
                </span>
                <span className="val">95</span>
              </div>
              <div className="ov-bar">
                <span>Bima S.</span>
                <span className="track">
                  <i style={{ width: "72%" }}></i>
                </span>
                <span className="val">72</span>
              </div>
              <div className="ov-bar">
                <span>Joko P.</span>
                <span className="track">
                  <i style={{ width: "29%" }}></i>
                </span>
                <span className="val">29</span>
              </div>
            </div>
          </div>
          <div className="ov-right">
            <div className="ov-mini">
              <b>27/32</b>
              <span>submissions collected</span>
            </div>
            <div className="ov-mini">
              <b>5</b>
              <span>students need follow-up</span>
            </div>
            <div className="ov-mini ov-note">AI prepares extra quizzes to help Joko catch up.</div>
          </div>
        </div>
      </div>
    </>
  );
}