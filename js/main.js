// MV表示用
const video = document.getElementById('mv');
const text = document.querySelector('.mv_text');

// ローディング表示時間の最小値
const MIN_TIME = 1100;
const startTime = Date.now();

window.addEventListener('load', () => {

  // --- ローディング非表示 ---
  const loader = document.getElementById('loading');
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_TIME - elapsed);

  if (loader) {
    setTimeout(() => {
      loader.classList.add('is-hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 800);
    }, remaining);
  }

  // --- 各要素のfade-in監視 ---
  // setTimeout 100msの理由：アニメーション初期状態が適用されるのを待つため
  setTimeout(() => {
    const targets = document.querySelectorAll(
      '.fade-in, .works_item_title, .work_description_list , .main_visual_work_title, .page_title, .all_works_deco, .btn_inner_work, .work_screen_image_title , .self_introduction_title , .skill_card_wrapper , .strengths_wrapper , .btn_inner_about , .career_wrapper , .sketch_text_closing , .about_deco , .heading--contact , .thanks_text , .thanks_deco');
    // 表の下部の要素もスクロール時に表示し始めたいため、最後の要素も監視対象に追加
    const lastItem = document.querySelectorAll(
      '.work_description_item:last-of-type , .skill_card:last-of-type , .strengths_text_wrapper:last-of-type .strengths_text'
    );
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-show');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px'
    });

    targets.forEach(target => observer.observe(target));
    lastItem.forEach(item => observer.observe(item));
  }, 100);
});


if (video) {
  // 二重実行防止フラグ
  let isShown = false;
  const showText = () => {
    if (isShown) return;
    text?.classList.add('show');
    isShown = true;
  };

  // MVのフェードイン完了後にmp4再生開始
  video.addEventListener('animationend', () => {
    video.play();
  });

  // mp4再生終了後にテキストを表示
  video.addEventListener('ended', showText);
  // mp4再生エラー時もテキストを表示
  video.addEventListener('error', showText);

  setTimeout(showText, 5000); // フェールセーフ
}

// スクロールでトップへ戻るボタン表示
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.to_top');
  if (!btn) return;

  if (window.scrollY > 300) {
    btn.classList.add('is-show');
  } else {
    btn.classList.remove('is-show');
  }
});

// ハンバーガーボタン
const hamburger = document.querySelector('.hamburger');
const globalNav = document.getElementById('global-nav');

if (hamburger && globalNav) {

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    globalNav.classList.toggle('is-open');

    const isOpen = hamburger.classList.contains('is-active');
    hamburger.setAttribute('aria-expanded', isOpen);
    globalNav.setAttribute('aria-hidden', !isOpen);

    const hiddenText = hamburger.querySelector('.visually-hidden');
    const label = isOpen ? 'メニューを閉じる' : 'メニューを開く';
    if (hiddenText) hiddenText.textContent = label;
    hamburger.setAttribute('aria-label', label);
  });

  // ナビ内リンククリック時にメニューを閉じる
  globalNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      globalNav.classList.remove('is-open');

      hamburger.setAttribute('aria-expanded', 'false');
      globalNav.setAttribute('aria-hidden', 'true');

      const hiddenText = hamburger.querySelector('.visually-hidden');
      if (hiddenText) hiddenText.textContent = 'メニューを開く';
      hamburger.setAttribute('aria-label', 'メニューを開く');
    });
  });

  // CareerのOpen/Close
  const toggleBtn = document.querySelector(".btn--about");
  const careerDetail = document.querySelector("#career_open_close");
  const btnInner = document.querySelector(".btn_inner_about");

  if (toggleBtn && careerDetail) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = careerDetail.classList.contains("is-open");

      if (isOpen) {
        careerDetail.classList.remove("is-open");
        toggleBtn.classList.remove("is-open");
        toggleBtn.querySelector(".btn_inner_about").textContent = "Open";
        toggleBtn.setAttribute("aria-expanded", "false");
      } else {
        careerDetail.classList.add("is-open");
        toggleBtn.classList.add("is-open");
        btnInner.classList.add("is-show");

        toggleBtn.querySelector(".btn_inner_about").textContent = "Close";
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    });
  }

}
