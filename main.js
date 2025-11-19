const header = document.querySelector('header');
const mapSection = document.querySelector('.map-section');
const statsSection = document.querySelector('.stats');
const animateItems = document.querySelectorAll('.animate-piece');
const galleryContainer = document.getElementById('galleryContainer');

window.addEventListener(
  'scroll',
  () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  },
  { passive: true },
);

if (window.Swiper) {
  new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    keyboard: true,
    autoplay: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 80,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    pagination: { el: '.swiper-pagination', clickable: true },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero-content', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  [
    ['.destination-content', -20, '.destinations-section'],
    ['.mySwiper', 10, '.destinations-section'],
    ['.map img', -20, '.map-section'],
    ['.stats', 15, '.map-section'],
    ['.popular-content', -15, '.popular-tourism-section'],
    ['.image-gallery', 10, '.popular-tourism-section'],
    ['.tips-content', -10, '.tips-section'],
    ['.video-info', -20, '.video-section'],
    ['.video-thumbnail', 10, '.video-section'],
  ].forEach(([el, y, trg]) => {
    gsap.to(el, {
      yPercent: y,
      ease: 'none',
      scrollTrigger: {
        trigger: trg,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  gsap.utils.toArray('.pack-card').forEach((card, i) => {
    gsap.to(card, {
      yPercent: i % 2 ? 5 : -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.travel-pack-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
});

(() => {
  const tooltip = document.getElementById('mapTooltip');
  const tTitle = document.getElementById('tooltip-title');
  const tImg = document.getElementById('tooltip-img');
  const tStatus = document.getElementById('tooltip-status');
  const tTime = document.getElementById('tooltip-time');
  const tAdmin = document.getElementById('tooltip-admin');
  const tDesc = document.getElementById('tooltip-desc');

  const data = [
    [
      'Ayutthaya Historical Park',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4xiTNZo4X6mC47meL91DT8T3q-8tlIaOCA&s',
      'UNESCO World Heritage',
      '1350 AD',
      'กรมศิลปากร',
      'โบราณสถานสำคัญของอยุธยา...',
    ],
    [
      'Sukhothai Historical Park',
      'https://blog.bangkokair.com/wp-content/uploads/2025/06/Cover_sukhothai-historical-park.jpg',
      'UNESCO Heritage',
      'สมัยสุโขทัย',
      'กรมศิลปากร',
      'เมืองหลวงแรกของไทย...',
    ],
    [
      'Wat Phra Kaew',
      'https://smarthistory.org/wp-content/uploads/2020/12/Temple-complex-Wat-Phra-Kaew.jpg',
      'Bangkok Landmark',
      'พ.ศ. 2325',
      'สำนักพระราชวัง',
      'วัดคู่บ้านคู่เมืองไทย...',
    ],
    [
      'Wat Arun',
      'https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Wat-Arun-Bangkok-Thailand.jpg',
      'Riverside Landmark',
      'ปลายอยุธยา',
      'กรมศาสนา',
      'พระปรางค์วัดอรุณงดงามมาก...',
    ],
    [
      'Phanom Rung',
      'https://13ased.moe.go.th/wp-content/uploads/2024/08/P03004793_1.jpeg',
      'Khmer Ancient',
      'พุทธศตวรรษที่ 15',
      'กรมศิลปากร',
      'ปราสาทหินบนยอดภูเขาไฟเก่า...',
    ],
  ];

  const pins = ['.map-pin', '.map-pin2', '.map-pin3', '.map-pin4', '.map-pin5'];

  pins.forEach((p, i) => {
    const el = document.querySelector(p);
    if (!el) return;
    el.addEventListener('click', () => {
      const d = data[i];
      tTitle.textContent = d[0];
      tImg.src = d[1];
      tStatus.textContent = d[2];
      tTime.textContent = d[3];
      tAdmin.textContent = d[4];
      tDesc.textContent = d[5];
      tooltip.style.display = 'block';
      tooltip.classList.remove('show');
      void tooltip.offsetWidth;
      const r = el.getBoundingClientRect();
      const map = document.getElementById('mapArea').getBoundingClientRect();
      const tt = tooltip.getBoundingClientRect();
      let left = r.left - map.left + r.width / 2 - tt.width / 2;
      if (left < 20) left = 20;
      if (left > map.width - tt.width - 20) left = map.width - tt.width - 20;
      tooltip.style.left = left + 'px';
      tooltip.style.top = r.top - map.top + 25 + 'px';
      tooltip.classList.add('show');
    });
  });

  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) tooltip.style.display = 'none';
  }).observe(mapSection);
})();

(() => {
  if (!window.__navObserver) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.__navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            navLinks.forEach((l) =>
              l.classList.toggle('active', l.getAttribute('href') === '#' + id),
            );
          }
        });
      },
      { threshold: 0.6 },
    );
    sections.forEach((sec) => window.__navObserver.observe(sec));
  }
})();

document.querySelector('.scroll-down')?.addEventListener('click', () => {
  document
    .querySelector('section:nth-of-type(2)')
    ?.scrollIntoView({ behavior: 'smooth' });
});

(() => {
  function animateCounter(c) {
    const t = +c.dataset.target;
    const inc = t / 70;
    const u = () => {
      const v = +c.textContent;
      if (v < t) {
        c.textContent = Math.ceil(v + inc);
        requestAnimationFrame(u);
      } else c.textContent = t.toLocaleString();
    };
    u();
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const cs = e.target.querySelectorAll('.counter');
        if (e.isIntersecting) cs.forEach(animateCounter);
        else cs.forEach((c) => (c.textContent = '0'));
      });
    },
    { threshold: 0.5 },
  );
  obs.observe(statsSection);
})();

(() => {
  const list = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4xiTNZo4X6mC47meL91DT8T3q-8tlIaOCA&s',
    'https://blog.bangkokair.com/wp-content/uploads/2025/06/Cover_sukhothai-historical-park.jpg',
    'https://smarthistory.org/wp-content/uploads/2020/12/Temple-complex-Wat-Phra-Kaew.jpg',
    'https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Wat-Arun-Bangkok-Thailand.jpg',
    'https://13ased.moe.go.th/wp-content/uploads/2024/08/P03004793_1.jpeg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4xiTNZo4X6mC47meL91DT8T3q-8tlIaOCA&s',
  ];

  list.forEach((img) => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4 gallery-item';
    col.innerHTML = `
      <div class="gallery-card">
        <img src="${img}" class="gallery-img">
        <div class="gallery-overlay"><h5></h5></div>
      </div>`;
    col.addEventListener('click', () => {
      document.getElementById('modalImage').src = img;
      new bootstrap.Modal(document.getElementById('imageModal')).show();
    });
    galleryContainer.appendChild(col);
  });

  gsap.utils.toArray('.gallery-item').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.15,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      },
    );
  });
})();

(() => {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const el = e.target;
        const anim = el.dataset.animate;
        const delay = el.dataset.delay || '0s';
        if (e.isIntersecting) {
          el.style.setProperty('--animate-delay', delay);
          el.classList.add('animate__animated', anim);
        } else el.classList.remove('animate__animated', anim);
      });
    },
    { threshold: 0.2 },
  );
  animateItems.forEach((el) => obs.observe(el));
})();

document.addEventListener('DOMContentLoaded', function () {
  const tooltip = document.getElementById('mapTooltip');
  const closeBtn = tooltip.querySelector('.btn-close');

  closeBtn.addEventListener('click', () => {
    tooltip.style.display = 'none';
  });
});
