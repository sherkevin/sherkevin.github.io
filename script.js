const year = new Date().getFullYear();
document.documentElement.style.setProperty("--year", `"${year}"`);

// Right-rail table of contents: section titles stay visible, and the
// subsection titles of whichever section is in view expand beneath it.
(function buildToc() {
  const sections = [...document.querySelectorAll("main.content > section.section[id]")];
  if (sections.length < 3) return;
  // a div with the navigation role: the global `nav` element styles belong to
  // the sidebar and would flatten this rail into wrapped pills
  const nav = document.createElement("div");
  nav.className = "toc";
  nav.setAttribute("role", "navigation");
  nav.setAttribute("aria-label", document.documentElement.lang === "zh-CN" ? "页面目录" : "On this page");
  // stable ids for every subsection title, assigned once so links survive rebuilds
  for (const sec of sections) {
    [...sec.querySelectorAll("h3")].filter((h3) => !h3.closest(".timeline"))
      .forEach((h3, i) => {
        if (!h3.id) h3.id = sec.id + "-s" + (i + 1);
      });
  }
  // a title inside a closed <details> is not on display, so it stays out of the rail
  const visible = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      if (p.tagName === "DETAILS" && !p.open) return false;
    }
    return true;
  };
  let groups = [];
  function build() {
    nav.textContent = "";
    groups = [];
    for (const sec of sections) {
      const h2 = sec.querySelector(":scope > h2");
      if (!h2) continue;
      const group = document.createElement("div");
      group.className = "toc-group";
      const link = document.createElement("a");
      link.className = "toc-h2";
      link.href = "#" + sec.id;
      link.textContent = h2.textContent;
      group.appendChild(link);
      const subEls = [...sec.querySelectorAll("h3")]
        .filter((h3) => !h3.closest(".timeline"))
        .filter(visible);
      const subLinks = [];
      if (subEls.length) {
        const wrap = document.createElement("div");
        wrap.className = "toc-subs";
        for (const h3 of subEls) {
          const sub = document.createElement("a");
          sub.className = "toc-h3";
          sub.href = "#" + h3.id;
          sub.textContent = h3.textContent;
          sub.title = h3.textContent;
          wrap.appendChild(sub);
          subLinks.push(sub);
        }
        group.appendChild(wrap);
      }
      nav.appendChild(group);
      groups.push({ sec, group, link, subEls, subLinks });
    }
  }
  build();
  document.body.appendChild(nav);
  // only one company's work points float at a time
  document.addEventListener("toggle", (event) => {
    const d = event.target;
    if (!(d instanceof HTMLElement) || !d.classList.contains("tl-detail") || !d.open) return;
    for (const other of document.querySelectorAll(".tl-detail[open]")) {
      if (other !== d) other.open = false;
    }
  }, true);

  // folding or unfolding a block changes what is on display: rebuild the rail
  document.addEventListener("toggle", () => {
    build();
    update();
  }, true);

  let ticking = false;
  function update() {
    ticking = false;
    const probe = window.scrollY + window.innerHeight * 0.3;
    // subsections use a tighter line: entries can be short, and a 30% probe
    // would highlight the next title right after jumping to one
    const subProbe = window.scrollY + 96;
    let active = groups[0];
    for (const g of groups) {
      if (g.sec.offsetTop <= probe) active = g;
    }
    for (const g of groups) {
      const on = g === active;
      g.group.classList.toggle("is-active", on);
      g.link.classList.toggle("is-current", on);
      for (const l of g.subLinks) l.classList.remove("is-current");
      if (!on) continue;
      let current = null;
      g.subEls.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (!rect.height) return; // hidden inside a closed <details>
        if (rect.top + window.scrollY <= subProbe) current = g.subLinks[i];
      });
      if (current) current.classList.add("is-current");
    }
    // keep the highlighted entry inside the rail's own scrollport
    const cur = nav.querySelector(".toc-h3.is-current") || nav.querySelector("a.is-current");
    if (cur && nav.scrollHeight > nav.clientHeight) {
      const nr = nav.getBoundingClientRect();
      const cr = cur.getBoundingClientRect();
      if (cr.top < nr.top) nav.scrollTop += cr.top - nr.top - 8;
      else if (cr.bottom > nr.bottom) nav.scrollTop += cr.bottom - nr.bottom + 8;
    }
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    // an anchor inside a collapsed <details> has no box to scroll to
    for (const d of document.querySelectorAll("details")) {
      if (!d.open && d.contains(target)) d.open = true;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
