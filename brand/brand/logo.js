/* ============================================================
   LOCAL LEGEND — Logo system (clean vector, rebuilt)
   Web components: <ll-badge>, <ll-pin>, <ll-wordmark>, <ll-lockup>
   Vanilla JS. Load with a normal <script src> tag.
   ============================================================ */
(function () {
  "use strict";

  const C = {
    blue: "#3B6BFF",
    lime: "#C6F042",
    ink:  "#0E1016",
    cream:"#F4EFE6",
    white:"#FFFFFF",
  };

  /* --- Clean contours extracted from the source mark (viewBox 1024) --- */
  const SHIELD = "M511.89 198.29C533.08 198.28 546.03 198.77 568.25 199.64C597.28 200.77 626.88 203.95 655.23 207.84C665.41 209.24 675.19 211.30 687.06 213.78Q702.69 217.04 717.42 225.11C732.26 233.24 743.54 246.12 749.13 262.08Q752.70 272.29 753.66 281.77Q754.33 288.32 754.32 307.75Q754.25 517.06 754.43 607.75C754.46 623.67 753.67 638.42 750.45 653.27Q742.61 689.34 721.79 719.52Q708.75 738.42 691.22 755.25Q676.67 769.22 654.38 784.46Q597.85 823.11 532.82 844.56Q524.90 847.17 511.96 847.17Q499.02 847.17 491.11 844.56Q426.07 823.13 369.53 784.49Q347.24 769.26 332.69 755.29Q315.15 738.46 302.11 719.57Q281.28 689.39 273.44 653.32C270.21 638.47 269.42 623.72 269.45 607.80Q269.61 517.11 269.49 307.80Q269.48 288.37 270.15 281.82Q271.10 272.34 274.67 262.13C280.26 246.17 291.53 233.29 306.37 225.15Q321.10 217.08 336.73 213.82C348.60 211.34 358.38 209.27 368.56 207.87C396.91 203.97 426.51 200.79 455.54 199.65C477.75 198.78 490.71 198.29 511.89 198.29Z";
  const STAR = "M512.28 268.43C519.86 268.42 525.30 272.22 528.58 279.17Q541.21 306.01 551.77 327.99Q559.95 345.00 561.84 348.60C565.71 355.96 571.33 356.86 578.96 358.03Q616.08 363.74 647.47 368.34C652.35 369.05 657.66 369.71 661.31 372.34C669.13 377.95 670.83 388.17 665.74 396.29Q664.21 398.75 659.34 403.36Q623.25 437.58 606.70 454.20Q600.12 460.81 601.96 470.77Q605.77 491.38 612.78 527.25Q614.06 533.83 614.99 537.70C616.49 543.99 617.52 550.12 615.18 556.46Q612.88 562.68 606.39 565.12C598.22 568.19 591.09 565.77 583.77 561.78Q536.90 536.23 526.56 530.74C522.66 528.67 517.17 525.71 512.34 525.72C507.51 525.72 502.01 528.68 498.11 530.75Q487.78 536.24 440.92 561.81C433.61 565.81 426.48 568.23 418.31 565.16Q411.81 562.73 409.51 556.51C407.17 550.17 408.20 544.04 409.69 537.75Q410.62 533.88 411.90 527.30Q418.89 491.42 422.69 470.81Q424.53 460.85 417.94 454.25Q401.38 437.63 365.28 403.43Q360.41 398.82 358.87 396.36C353.78 388.25 355.48 378.02 363.29 372.41C366.94 369.78 372.25 369.12 377.13 368.40Q408.52 363.79 445.64 358.06C453.27 356.89 458.89 355.99 462.75 348.62Q464.64 345.02 472.81 328.01Q483.36 306.02 495.98 279.18C499.25 272.22 504.70 268.43 512.28 268.43Z";
  const L1 = "M455.10 715.51Q479.11 715.46 493.21 715.41Q501.41 715.39 504.54 716.48C513.71 719.71 515.48 730.85 511.13 738.50C507.69 744.54 501.17 745.05 493.79 745.09Q445.81 745.34 435.88 745.08C423.40 744.75 417.89 736.01 417.89 724.34Q417.89 649.11 417.79 622.72C417.77 616.09 419.01 609.78 424.34 605.46C428.45 602.13 436.40 601.89 440.73 603.66C448.41 606.80 450.37 614.34 450.38 622.14Q450.47 672.28 450.36 710.56C450.35 713.57 452.19 715.52 455.10 715.51Z";
  const L2 = "M561.03 710.54C561.02 713.54 562.85 715.49 565.76 715.48Q589.73 715.46 603.81 715.43Q612.00 715.41 615.12 716.51C624.27 719.74 626.03 730.87 621.68 738.50C618.24 744.53 611.73 745.03 604.36 745.06Q556.45 745.26 546.54 744.99C534.08 744.64 528.59 735.91 528.60 724.26Q528.68 649.15 528.61 622.80C528.59 616.18 529.84 609.88 535.17 605.57C539.27 602.25 547.21 602.02 551.53 603.79C559.20 606.94 561.15 614.47 561.15 622.26Q561.18 672.32 561.03 710.54Z";
  const BADGE_VB = "244 178 536 690";

  let uid = 0;

  /* Build a 5-point star path centered (cx,cy), outer R, inner r, rotation deg */
  function starPath(cx, cy, R, r, rotDeg) {
    const rot = (rotDeg || -90) * Math.PI / 180;
    let d = "";
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? R : r;
      const a = rot + i * Math.PI / 5;
      const x = (cx + rad * Math.cos(a)).toFixed(2);
      const y = (cy + rad * Math.sin(a)).toFixed(2);
      d += (i === 0 ? "M" : "L") + x + " " + y + " ";
    }
    return d + "Z";
  }

  /* ---------- <ll-badge> ---------- */
  /* variant: blue (default) | blue-white | cream | ink | ink-cream */
  class LLBadge extends HTMLElement {
    connectedCallback() { this.render(); }
    static get observedAttributes() { return ["variant"]; }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const v = this.getAttribute("variant") || "blue";
      const id = "llb" + (++uid);
      let inner;
      if (v === "cream" || v === "ink") {
        // single-color silhouette, star + LL knocked out (background shows through)
        const col = v === "cream" ? C.cream : C.ink;
        inner = `
          <defs><mask id="${id}">
            <rect x="244" y="178" width="536" height="690" fill="#fff"/>
            <path d="${STAR}" fill="#000"/>
            <path d="${L1}" fill="#000"/>
            <path d="${L2}" fill="#000"/>
          </mask></defs>
          <path d="${SHIELD}" fill="${col}" mask="url(#${id})"/>`;
      } else {
        let shield = C.blue, star = C.lime, ll = C.cream;
        if (v === "blue-white") { shield = C.blue; star = C.lime; ll = C.white; }
        if (v === "ink-cream")  { shield = C.ink;  star = C.lime; ll = C.cream; }
        if (v === "ink-lime")      { shield = C.ink;  star = C.lime; ll = C.white; }
        if (v === "blue-lime")     { shield = C.blue; star = C.lime; ll = C.white; }
        if (v === "lime-ink")      { shield = C.lime; star = C.blue; ll = C.ink;   }
        if (v === "blue-ink-white"){ shield = C.blue; star = C.ink;  ll = C.white; }
        inner = `
          <path d="${SHIELD}" fill="${shield}"/>
          <path d="${STAR}" fill="${star}"/>
          <path d="${L1}" fill="${ll}"/>
          <path d="${L2}" fill="${ll}"/>`;
      }
      this.innerHTML =
        `<svg viewBox="${BADGE_VB}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Local Legend badge" style="width:100%;height:100%;display:block;overflow:visible">${inner}</svg>`;
    }
  }

  /* ---------- <ll-pin> ---------- */
  /* lime location pin with a star inside. star: ink (default) | cream | white */
  class LLPin extends HTMLElement {
    connectedCallback() { this.render(); }
    static get observedAttributes() { return ["star", "body"]; }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const starColAttr = this.getAttribute("star") || "ink";
      const starCol = C[starColAttr] || starColAttr;
      const bodyCol = this.getAttribute("body") || C.lime;
      const teardrop = "M60 7C32.4 7 10 29.4 10 57C10 84.8 44 124 54.6 135.6C57.5 138.8 62.5 138.8 65.4 135.6C76 124 110 84.8 110 57C110 29.4 87.6 7 60 7Z";
      const star = starPath(60, 52, 25, 10.4, -90);
      this.innerHTML =
        `<svg viewBox="0 0 120 145" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Local Legend pin" style="width:100%;height:100%;display:block;overflow:visible">
          <path d="${teardrop}" fill="${bodyCol}"/>
          <path d="${star}" fill="${starCol}"/>
        </svg>`;
    }
  }

  /* ---------- <ll-wordmark> ---------- */
  /* live Poppins text, title case. color: cream|white|ink|blue (default cream-aware) */
  class LLWordmark extends HTMLElement {
    connectedCallback() { this.render(); }
    static get observedAttributes() { return ["color"]; }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const col = this.getAttribute("color");
      const map = { cream: C.cream, white: C.white, ink: C.ink, blue: C.blue };
      const color = map[col] || "currentColor";
      this.innerHTML =
        `<span style="font-family:'Poppins',sans-serif;font-weight:700;letter-spacing:-0.025em;line-height:.9;color:${color};white-space:nowrap;display:inline-block">Local Legend</span>`;
    }
  }

  /* ---------- <ll-lockup> ---------- */
  /* type: horizontal (default) | stacked | icon ; theme: dark|light|cream ; url: show locallegend.studio */
  class LLLockup extends HTMLElement {
    connectedCallback() { this.render(); }
    static get observedAttributes() { return ["type", "theme", "url"]; }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const type = this.getAttribute("type") || "horizontal";
      const theme = this.getAttribute("theme") || "dark";
      const showUrl = this.hasAttribute("url");
      const wordColor = theme === "dark" ? C.white : C.ink;
      const urlColor = theme === "dark" ? C.cream : C.ink;
      const badgeVariant = "blue";

      const urlRow = showUrl
        ? `<span style="display:inline-flex;align-items:center;gap:.34em;font-family:'Poppins',sans-serif;font-weight:600;color:${urlColor}">
             <ll-pin star="ink" style="width:.92em;height:1.12em;transform:translateY(.04em)"></ll-pin>
             <span style="letter-spacing:.01em">locallegend.studio</span>
           </span>`
        : "";

      if (type === "icon") {
        this.innerHTML = `<ll-badge variant="${badgeVariant}" style="width:100%;height:100%"></ll-badge>`;
        return;
      }

      if (type === "stacked") {
        this.innerHTML =
          `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:.42em;text-align:center">
            <ll-badge variant="${badgeVariant}" style="width:1.55em;height:1.99em"></ll-badge>
            <ll-wordmark color="${theme === 'dark' ? 'white' : 'ink'}" style="font-size:1em"></ll-wordmark>
            ${showUrl ? `<span style="font-size:.34em;margin-top:.3em">${urlRow}</span>` : ""}
          </span>`;
        return;
      }

      // horizontal
      this.innerHTML =
        `<span style="display:inline-flex;align-items:center;gap:.5em">
          <ll-badge variant="${badgeVariant}" style="width:1.42em;height:1.83em;flex:0 0 auto"></ll-badge>
          <span style="display:inline-flex;flex-direction:column;gap:.2em;line-height:1">
            <ll-wordmark color="${theme === 'dark' ? 'white' : 'ink'}" style="font-size:.86em"></ll-wordmark>
            ${showUrl ? `<span style="font-size:.3em">${urlRow}</span>` : ""}
          </span>
        </span>`;
    }
  }

  customElements.define("ll-badge", LLBadge);
  customElements.define("ll-pin", LLPin);
  customElements.define("ll-wordmark", LLWordmark);
  customElements.define("ll-lockup", LLLockup);

  window.LLStar = starPath; // exposed for decorative use
})();
