"""A/B test: do the footer SVG animations actually cost frame time?

Idle test  : 5s idle at top of page (footer offscreen), animations on vs paused.
Scroll test: 40 rAF frames scrolling through the footer (footer in view),
             animations on vs paused.

Run:  python ab_footer.py   (opens a headed browser window briefly)
"""
import asyncio
import json

from playwright.async_api import async_playwright

BASE = "http://localhost:3000"
PAUSE_STYLE = ".site-footer, .site-footer * { animation-play-state: paused !important; }"

IDLE_SAMPLE = """
async (ms) => {
  const t0 = performance.now();
  let frames = 0;
  await new Promise(res => {
    const tick = () => {
      frames++;
      if (performance.now() - t0 < ms) requestAnimationFrame(tick); else res();
    };
    requestAnimationFrame(tick);
  });
  return { rafFrames: frames };
}
"""

FRAME_DELTAS = """
async () => {
  const deltas = [];
  let last = performance.now();
  await new Promise((resolve) => {
    const step = (t) => {
      deltas.push(t - last);
      last = t;
      if (deltas.length >= 40) { resolve(); return; }
      window.scrollBy(0, 150);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  deltas.shift();
  return {
    avgFrameMs: Math.round(deltas.reduce((a, b) => a + b, 0) / deltas.length * 10) / 10,
    maxFrameMs: Math.round(Math.max(...deltas) * 10) / 10,
    longFrames: deltas.filter(d => d > 25).length,
  };
}
"""


async def launch(p):
    for exe in (
        r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    ):
        try:
            return await p.chromium.launch(executable_path=exe, headless=False, args=["--window-size=1400,950"])
        except Exception:
            continue
    return await p.chromium.launch(headless=False)


async def task_duration(cdp):
    metrics = await cdp.send("Performance.getMetrics")
    return next(m["value"] for m in metrics["metrics"] if m["name"] == "TaskDuration")


async def main():
    async with async_playwright() as p:
        browser = await launch(p)
        context = await browser.new_context(viewport={"width": 1356, "height": 900})
        page = await context.new_page()
        cdp = await context.new_cdp_session(page)
        await cdp.send("Performance.enable")

        print("Loading landing page...")
        await page.goto(f"{BASE}/", wait_until="networkidle", timeout=90000)

        footer_info = await page.evaluate(
            """() => {
              const f = document.querySelector('.site-footer');
              let animated = 0;
              if (f) for (const el of f.querySelectorAll('*')) {
                const s = getComputedStyle(el);
                if (s.animationName && s.animationName !== 'none') animated++;
              }
              return {
                exists: !!f,
                height: f ? Math.round(f.getBoundingClientRect().height) : null,
                animatedElements: animated,
                docHeight: document.documentElement.scrollHeight,
              };
            }"""
        )
        print(f"Footer: exists={footer_info['exists']} height={footer_info['height']}px "
              f"animatedElements={footer_info['animatedElements']} docHeight={footer_info['docHeight']}px")

        # Warm the footer raster once so the A/B isolates animation cost, not first-paint
        await page.evaluate("document.querySelector('.site-footer').scrollIntoView({block:'end'})")
        await page.wait_for_timeout(1200)
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(1000)

        results = {}

        # --- Idle A: animations running, footer offscreen ---
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(500)
        t1 = await task_duration(cdp)
        a = await page.evaluate(IDLE_SAMPLE, 5000)
        t2 = await task_duration(cdp)
        a["taskDeltaMs"] = round(t2 - t1, 2)
        results["idle_animations_on"] = a
        print(f"Idle 5s, animations ON  : taskDelta={a['taskDeltaMs']}ms rafFrames={a['rafFrames']}")

        # --- Idle B: animations paused, footer offscreen ---
        await page.add_style_tag(content=PAUSE_STYLE)
        await page.wait_for_timeout(1000)
        t1 = await task_duration(cdp)
        b = await page.evaluate(IDLE_SAMPLE, 5000)
        t2 = await task_duration(cdp)
        b["taskDeltaMs"] = round(t2 - t1, 2)
        results["idle_animations_paused"] = b
        print(f"Idle 5s, animations PAUSED: taskDelta={b['taskDeltaMs']}ms rafFrames={b['rafFrames']}")

        # --- Scroll A: animations running, footer in view ---
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(400)
        sa = await page.evaluate(FRAME_DELTAS)
        results["scroll_animations_on"] = sa
        print(f"Scroll (footer in view), ON  : avg={sa['avgFrameMs']}ms max={sa['maxFrameMs']}ms long={sa['longFrames']}/39")

        # --- Scroll B: animations paused ---
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(600)
        sb = await page.evaluate(FRAME_DELTAS)
        results["scroll_animations_paused"] = sb
        print(f"Scroll (footer in view), PAUSED: avg={sb['avgFrameMs']}ms max={sb['maxFrameMs']}ms long={sb['longFrames']}/39")

        with open("ab_footer_results.json", "w") as f:
            json.dump({"footer": footer_info, **results}, f, indent=2)
        print("\nSaved to ab_footer_results.json")
        await browser.close()


asyncio.run(main())
