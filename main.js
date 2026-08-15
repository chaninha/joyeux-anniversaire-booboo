/* =========================================================
   main.js — logique du site (pages plein écran, centré sur lui)
   Dépend de data.js (doit être chargé avant ce fichier)
   ========================================================= */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $all = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener("DOMContentLoaded", () => {
    initPagination();
    initEnterButton();
    initFlipCards();
    initMemoryCarousel();
    initSecret();
    initMusicToggle();
    initChapter6();
  });

  /* =========================================================
     Navigation par pages : une seule page visible à la fois.
     Pour avancer, il faut répondre à une question sur "nous"
     (une seule fois par page — une fois déverrouillée, on peut
     y revenir librement).
  ========================================================= */
  let pageOrder = [];
  let currentIndex = 0;
  let maxUnlocked = 0;

  function initPagination() {
    pageOrder = $all(".page", $("#pages"))
      .filter((p) => !p.hasAttribute("hidden"))
      .map((p) => p.id);

    renderDots();
    showPage(0, { instant: true });

    $("#globalNext")?.addEventListener("click", attemptGoNext);
    $("#globalPrev")?.addEventListener("click", () => {
      if (currentIndex > 0) showPage(currentIndex - 1);
    });
  }

  function renderDots() {
    const dotsNav = $("#pageDots");
    if (!dotsNav) return;
    dotsNav.innerHTML = pageOrder
      .map((id, i) => {
        const cls = ["page-dot"];
        if (i === currentIndex) cls.push("is-active");
        if (i <= maxUnlocked && i !== currentIndex) cls.push("is-visited");
        if (i > maxUnlocked) cls.push("is-locked");
        return `<button class="${cls.join(" ")}" data-index="${i}" aria-label="Page ${i + 1}"${i > maxUnlocked ? " disabled" : ""}></button>`;
      })
      .join("");

    $all(".page-dot", dotsNav).forEach((dot) => {
      dot.addEventListener("click", () => {
        const i = parseInt(dot.dataset.index, 10);
        if (i <= maxUnlocked) showPage(i);
      });
    });
  }

  function showPage(index) {
    const targetId = pageOrder[index];
    if (!targetId) return;

    $all(".page").forEach((p) => p.classList.remove("is-active"));
    document.getElementById(targetId)?.classList.add("is-active");

    currentIndex = index;
    if (index > maxUnlocked) maxUnlocked = index;

    $("#globalPrev").hidden = index === 0;
    const isLastPage = index === pageOrder.length - 1;
    const noAutoNext = ["page-secret", "page-twist"].includes(targetId); // ces pages gèrent leur propre suite
    $("#globalNext").hidden = isLastPage || noAutoNext;

    renderDots();
  }

  /* Ajoute une page révélée en cours de route (twist, bonus) et y navigue —
     pas de question, elle vient de se débloquer par l'histoire elle-même. */
  function appendAndGoToPage(id) {
    if (!pageOrder.includes(id)) pageOrder.push(id);
    showPage(pageOrder.indexOf(id));
  }

  /* =========================================================
     La porte : une question simple sur "nous" avant d'avancer
  ========================================================= */
  function attemptGoNext() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= pageOrder.length) return;

    if (nextIndex <= maxUnlocked) {
      showPage(nextIndex);
      return;
    }
    openGate(() => showPage(nextIndex));
  }

  function openGate(onSuccess) {
    const gate = $("#gate");
    const pool = SITE_DATA.gateQuestions;
    const q = pool[Math.floor(Math.random() * pool.length)];

    $("#gateQuestion").textContent = q.question;
    $("#gateFeedback").textContent = "";
    $("#gateOptions").innerHTML = q.options
      .map((opt, i) => `<button class="quiz__option" data-index="${i}">${escapeHTML(opt)}</button>`)
      .join("");

    let answered = false;
    $all(".quiz__option", $("#gateOptions")).forEach((btn) => {
      btn.addEventListener("click", () => {
        if (answered) return;
        const i = parseInt(btn.dataset.index, 10);
        if (i === q.correct) {
          answered = true;
          btn.classList.add("is-correct");
          $("#gateFeedback").textContent = "Exactement.";
          setTimeout(() => {
            gate.classList.remove("is-open");
            onSuccess();
          }, 500);
        } else {
          btn.classList.add("is-wrong");
          btn.disabled = true;
          $("#gateFeedback").textContent = "Pas tout à fait. Réessaie.";
        }
      });
    });

    gate.classList.add("is-open");
  }

  /* =========================================================
     PAGE 0 — Hero
  ========================================================= */
  function initEnterButton() {
    const btn = $("#enterBtn");
    if (!btn) return;
    setTimeout(() => { btn.hidden = false; }, 3200);
    btn.addEventListener("click", attemptGoNext);
  }

  /* =========================================================
     PAGE 1 — "Toi" : carte à retourner, portrait de lui
  ========================================================= */
  let loveIndex = 0;

  function initFlipCards() {
    const card = $("#flipCard");
    if (!card) return;

    card.addEventListener("click", () => card.classList.toggle("is-flipped"));

    $("#lovePrev")?.addEventListener("click", (e) => {
      e.stopPropagation();
      stepLove(-1);
    });
    $("#loveNext")?.addEventListener("click", (e) => {
      e.stopPropagation();
      stepLove(1);
    });

    function stepLove(dir) {
      const list = SITE_DATA.loveReasons;
      loveIndex = (loveIndex + dir + list.length) % list.length;
      card.classList.remove("is-flipped");
      renderLoveCard();
    }

    function renderLoveCard() {
      const list = SITE_DATA.loveReasons;
      const item = list[loveIndex];
      $("#loveIndex").textContent = item.index;
      $("#loveTitle").textContent = item.title;
      $("#loveDesc").textContent = item.description;
      $("#loveCount").textContent = `${loveIndex + 1} / ${list.length}`;
    }

    renderLoveCard();
  }

  /* =========================================================
     PAGE 2 — Carrousel de souvenirs
  ========================================================= */
  function initMemoryCarousel() {
    setupCarousel(SITE_DATA.memories, {
      img: "#memImg",
      caption: "#memCaption",
      prev: "#memPrev",
      next: "#memNext",
      dots: "#memDots",
    });
  }

  function setupCarousel(items, ids) {
    const img = $(ids.img);
    if (!img || !items || items.length === 0) return;
    let index = 0;

    const dotsEl = ids.dots ? $(ids.dots) : null;
    if (dotsEl) {
      dotsEl.innerHTML = items.map((_, i) => `<span class="cdot${i === 0 ? " is-active" : ""}"></span>`).join("");
    }

    function render() {
      const item = items[index];
      img.src = item.src;
      img.alt = item.caption;
      $(ids.caption).textContent = item.caption;
      if (dotsEl) {
        $all(".cdot", dotsEl).forEach((d, i) => d.classList.toggle("is-active", i === index));
      }
    }

    $(ids.prev)?.addEventListener("click", () => {
      index = (index - 1 + items.length) % items.length;
      render();
    });
    $(ids.next)?.addEventListener("click", () => {
      index = (index + 1) % items.length;
      render();
    });

    render();
  }

  /* =========================================================
     PAGE 3 — Secret + lettre
  ========================================================= */
  function initSecret() {
    const form = $("#secretForm");
    const input = $("#secretInput");
    const feedback = $("#secretFeedback");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = normalize(input.value);
      const code = normalize(SITE_DATA.secretCode);

      if (value === code) {
        unlockSecret();
      } else {
        feedback.textContent = "Pas tout à fait. Réessaie.";
        feedback.classList.add("is-error");
        input.classList.add("is-error");
        setTimeout(() => input.classList.remove("is-error"), 400);
      }
    });
  }

  function normalize(str) {
    return (str || "").trim().toLowerCase().replace(/\s+/g, "");
  }

  function unlockSecret() {
    const locked = $("#secretLocked");
    const unlocked = $("#letterUnlocked");
    const flash = $("#unlockFlash");

    flash.classList.add("is-flashing");
    setTimeout(() => {
      locked.hidden = true;
      unlocked.hidden = false;
      typeLetter();
    }, 350);
  }

  function typeLetter() {
    const el = $("#letterText");
    const text = SITE_DATA.letter.trim();
    const tokens = text.split(/(\s+)/); // mots ET espaces/sauts de ligne séparés
    el.innerHTML = "";

    let wordDelayIndex = 0;
    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        // espace ou saut de ligne : texte normal, jamais un span animé
        // (sinon le navigateur peut l'ignorer et coller les mots entre eux)
        el.appendChild(document.createTextNode(token));
      } else if (token.length > 0) {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = token;
        span.style.animationDelay = wordDelayIndex * 45 + "ms";
        wordDelayIndex++;
        el.appendChild(span);
      }
    });

    const totalDelay = wordDelayIndex * 45 + 600;
    setTimeout(() => {
      $("#letterSignoff").hidden = false;
      const btn = $("#continueAfterLetter");
      btn.hidden = false;
      btn.addEventListener("click", revealTwist, { once: true });
    }, totalDelay);
  }

  /* =========================================================
     PAGE 4 — Le twist + compte à rebours
  ========================================================= */
  function revealTwist() {
    const twist = $("#page-twist");
    twist.hidden = false;
    appendAndGoToPage("page-twist");

    const lines = $all(".twist__line", $("#twistSequence"));
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add("js-line-in"), i * 1300 + 300);
    });

    const totalDelay = lines.length * 1300 + 1000;
    setTimeout(() => {
      $("#twistMeet").hidden = false;
      startCountdown();
    }, totalDelay);
  }

  function startCountdown() {
    const { hour, minute } = SITE_DATA.meetingTime;

    function tick() {
      const now = new Date();
      const target = new Date();
      target.setHours(hour, minute, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);

      let diff = target - now;

      if (diff <= 0) {
        $("#countdown").hidden = true;
        $("#countdownDone").hidden = false;
        clearInterval(interval);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      diff -= h * 1000 * 60 * 60;
      const m = Math.floor(diff / (1000 * 60));
      diff -= m * 1000 * 60;
      const s = Math.floor(diff / 1000);

      $("#cdHours").textContent = String(h).padStart(2, "0");
      $("#cdMinutes").textContent = String(m).padStart(2, "0");
      $("#cdSeconds").textContent = String(s).padStart(2, "0");
    }

    tick();
    const interval = setInterval(tick, 1000);
  }

  /* =========================================================
     Musique de fond (jamais d'autoplay)
  ========================================================= */
  function initMusicToggle() {
    const btn = $("#musicToggle");
    const audio = $("#bgMusic");
    if (!btn || !audio) return;

    btn.addEventListener("click", () => {
      const playing = btn.getAttribute("aria-pressed") === "true";
      if (playing) {
        audio.pause();
        btn.setAttribute("aria-pressed", "false");
      } else {
        audio.play().catch(() => {});
        btn.setAttribute("aria-pressed", "true");
      }
    });
  }

  /* =========================================================
     PAGE 5 — Bonus (désactivée par défaut)
  ========================================================= */
  function initChapter6() {
    if (!SITE_DATA.chapter6Enabled) return;
    $("#page-bonus").hidden = false;
    setupCarousel(SITE_DATA.bonusMemories, {
      img: "#bonusImg",
      caption: "#bonusCaption",
      prev: "#bonusPrev",
      next: "#bonusNext",
    });
  }

  /* ---------------- Sécurité : échappement HTML ---------------- */
  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }
})();
