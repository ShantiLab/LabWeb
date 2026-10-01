// Srivastava Lab – small enhancements. The site works without JavaScript;
// this only adds menus, the news carousel, publication search and the photo viewer.
(function () {
  "use strict";
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // Toggle helper for buttons that control something via aria-expanded
  function setOpen(btn, open) { btn.setAttribute("aria-expanded", String(open)); }

  // ----- Mobile menu -----
  var navToggle = $(".nav-toggle");
  var nav = $("#site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      setOpen(navToggle, open);
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // ----- Research dropdown (click/tap; hover is handled in CSS) -----
  $$(".sub-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var li = btn.parentElement;
      var open = !li.classList.contains("open");
      $$(".has-sub.open").forEach(function (o) { o.classList.remove("open"); setOpen($(".sub-toggle", o), false); });
      li.classList.toggle("open", open);
      setOpen(btn, open);
    });
  });

  // ----- Appointment panel -----
  var apptBtn = $(".appointment-toggle");
  var apptPanel = $("#appointment-panel");
  if (apptBtn && apptPanel) {
    apptBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      apptPanel.hidden = !apptPanel.hidden;
      setOpen(apptBtn, !apptPanel.hidden);
      if (!apptPanel.hidden) { var first = $("input:not([type=hidden])", apptPanel); if (first) first.focus(); }
    });
    apptPanel.addEventListener("click", function (e) { e.stopPropagation(); });
  }

  // Close open menus on outside click or Escape
  function closeAll() {
    $$(".has-sub.open").forEach(function (o) { o.classList.remove("open"); setOpen($(".sub-toggle", o), false); });
    if (apptPanel && !apptPanel.hidden) { apptPanel.hidden = true; setOpen(apptBtn, false); }
  }
  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });

  // ----- Sticky header shadow + back-to-top button -----
  var header = $("#site-header");
  var toTop = $(".to-top");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 60);
    if (toTop) toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ----- News carousel -----
  $$("[data-carousel]").forEach(function (c) {
    var track = $(".carousel-track", c);
    var prev = $(".carousel-prev", c);
    var next = $(".carousel-next", c);
    function step() { var card = track.firstElementChild; return card ? card.getBoundingClientRect().width + 30 : track.clientWidth; }
    function update() {
      prev.disabled = track.scrollLeft <= 10;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  // ----- Publication search -----
  var search = $("#pub-search");
  if (search) {
    var cards = $$("[data-pub]");
    var years = $$("[data-year]");
    var count = $("#pub-count");
    var empty = $("#pub-empty");
    var total = cards.length;
    cards.forEach(function (c) { c._text = (c.textContent + " " + (c.closest("[data-year]").querySelector(".year-heading").textContent)).toLowerCase(); });
    search.addEventListener("input", function () {
      var terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      var shown = 0;
      cards.forEach(function (c) {
        var hit = terms.every(function (t) { return c._text.indexOf(t) !== -1; });
        c.hidden = !hit;
        if (hit) shown++;
      });
      years.forEach(function (y) { y.hidden = !$$("[data-pub]", y).some(function (c) { return !c.hidden; }); });
      count.textContent = terms.length ? shown + " of " + total + " publications" : total + " publications";
      empty.hidden = shown > 0;
    });
  }

  // ----- Photo viewer for the team gallery -----
  var box = $(".lightbox");
  if (box && box.showModal) {
    var boxImg = $("img", box);
    $$("[data-lightbox]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        boxImg.src = a.href;
        boxImg.alt = ($("img", a) || {}).alt || "";
        box.showModal();
      });
    });
    $(".lightbox-close", box).addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  }
})();
