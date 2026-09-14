// 메인 상단 프로젝트 슬라이더: 화살표·점·키보드·스와이프로 이동하고, 보이는 슬라이드의 영상만 재생한다.
(() => {
  const root = document.getElementById('home-slider');
  if (!root) return;

  const stage = root.querySelector('.slider-stage');
  const track = root.querySelector('.slider-track');
  const slides = [...root.querySelectorAll('.slider-slide')];
  const kicker = root.querySelector('.slider-kicker');
  const title = root.querySelector('.slider-title');
  const count = root.querySelector('.slider-count');
  const dotsWrap = root.querySelector('.slider-dots');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;

  const dots = slides.map((slide, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `${i + 1}번 슬라이드: ${slide.dataset.kicker}`);
    dot.addEventListener('click', () => go(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function syncVideos() {
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (!video) return;
      if (i === index && !reduceMotion.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  function go(target) {
    index = (target + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
      dots[i].setAttribute('aria-current', String(active));
    });
    const current = slides[index];
    kicker.textContent = current.dataset.kicker;
    title.textContent = current.dataset.title;
    title.href = current.dataset.href;
    count.textContent = `${index + 1} / ${slides.length}`;
    syncVideos();
  }

  root.querySelector('.slider-prev').addEventListener('click', () => go(index - 1));
  root.querySelector('.slider-next').addEventListener('click', () => go(index + 1));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    }
  });

  let startX = null;
  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') startX = event.clientX;
  });
  stage.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', () => {
    startX = null;
  });

  root.classList.add('is-ready');
  go(0);
})();
