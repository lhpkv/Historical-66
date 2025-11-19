/* ================================
   Header Scroll
================================= */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

/* ================================
     Swiper Slider
  ================================= */
if (typeof Swiper !== 'undefined') {
  new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 80,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

/* ================================
     GSAP Parallax (DOMContentLoaded)
  ================================= */
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const createParallax = (selector, y, trigger) => {
    gsap.to(selector, {
      yPercent: y,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  };

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

  createParallax('.destination-content', -20, '.destinations-section');
  createParallax('.mySwiper', 10, '.destinations-section');
  createParallax('.map img', -20, '.map-section');
  createParallax('.stats', 15, '.map-section');
  createParallax('.popular-content', -15, '.popular-tourism-section');
  createParallax('.image-gallery', 10, '.popular-tourism-section');
  createParallax('.tips-content', -10, '.tips-section');
  createParallax('.video-info', -20, '.video-section');
  createParallax('.video-thumbnail', 10, '.video-section');

  gsap.utils.toArray('.pack-card').forEach((card, i) => {
    gsap.to(card, {
      yPercent: i % 2 === 0 ? -5 : 5,
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

/* ================================
     Province Cards
  ================================= */
(() => {
  const provinces = [
    {
      name: 'Chiang Mai',
      image:
        'https://live-less-ordinary.com/wp-content/uploads/2016/11/Mountains-Best-Attractions-in-Chiang-Mai-Thailand-Northern-Inthanon-4.jpg',
      attractions: ['Doi Suthep', 'Old City Temples', 'Elephant Nature Park'],
      description:
        'Chiang Mai, often called the "Rose of the North," is a vibrant city...',
    },
    {
      name: 'Bangkok',
      image:
        'https://images.unsplash.com/photo-1533929736458-ca588912187e?q=80&w=800&auto=format&fit=crop',
      attractions: ['Grand Palace', 'Wat Arun', 'Chatuchak Market'],
      description: 'Bangkok, Thailand’s capital city...',
    },
    {
      name: 'Phuket',
      image:
        'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=800&auto=format&fit=crop',
      attractions: ['Patong Beach', 'Big Buddha', 'Phi Phi Islands'],
      description: 'Phuket, a tropical Andaman paradise...',
    },
    {
      name: 'Ayutthaya',
      image:
        'https://images.unsplash.com/photo-1599573803325-1266b71b1220?q=80&w=800&auto=format&fit=crop',
      attractions: ['Historical Park', 'Wat Mahathat', 'Bang Pa-In Palace'],
      description: 'The ancient capital of Siam founded in 1350...',
    },
  ];

  const cards = document.getElementById('province-cards');
  const searchInput = document.getElementById('provinceSearch');
  const listView = document.getElementById('listView');
  const detailView = document.getElementById('detailView');

  function render(list) {
    cards.innerHTML = '';
    if (list.length === 0) {
      cards.innerHTML = `<p class="text-center col-12">No provinces found.</p>`;
      return;
    }

    list.forEach((p) => {
      cards.innerHTML += `
          <div class="col-md-6 col-lg-4 mb-4 province-card-item" data-name="${
            p.name
          }">
            <div class="card h-100">
              <img src="${
                p.image
              }" class="card-img-top" style="height:200px;object-fit:cover;">
              <div class="card-body d-flex flex-column">
                  <h5>${p.name}</h5>
                  <p><strong>Attractions:</strong> ${p.attractions
                    .slice(0, 2)
                    .join(', ')}...</p>
                  <a class="btn btn-primary mt-auto stretched-link">View Details</a>
              </div>
            </div>
          </div>
        `;
    });

    document.querySelectorAll('.province-card-item').forEach((c) => {
      c.addEventListener('click', () => showDetail(c.dataset.name));
    });
  }

  function showDetail(name) {
    const p = provinces.find((x) => x.name === name);
    if (!p) return;

    detailView.innerHTML = `
        <button class="btn btn-outline-light mb-3" id="backBtn">&larr; Back</button>
        <div class="row">
          <div class="col-lg-5">
            <img src="${p.image}" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-lg-7">
            <h2>${p.name}</h2>
            <p>${p.description}</p>
            <h5>Famous Attractions</h5>
            <ul class="list-group list-group-flush">
              ${p.attractions
                .map(
                  (a) =>
                    `<li class="list-group-item bg-transparent text-white">${a}</li>`,
                )
                .join('')}
            </ul>
          </div>
        </div>
      `;

    listView.style.display = 'none';
    detailView.style.display = 'block';

    document.getElementById('backBtn').addEventListener('click', () => {
      detailView.style.display = 'none';
      listView.style.display = 'block';
    });
  }

  searchInput?.addEventListener('keyup', (e) => {
    const q = e.target.value.toLowerCase().trim();
    render(provinces.filter((p) => p.name.toLowerCase().includes(q)));
  });

  document
    .getElementById('mapModal')
    ?.addEventListener('hidden.bs.modal', () => {
      detailView.style.display = 'none';
      listView.style.display = 'block';
      searchInput.value = '';
      render(provinces);
    });

  render(provinces);
})();

/* ================================
     MAP TOOLTIP
  ================================= */
(() => {
  const pinData = [
    {
      title: 'Ayutthaya Historical Park',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4xiTNZo4X6mC47meL91DT8T3q-8tlIaOCA&s',
      status: 'UNESCO World Heritage',
      time: '1350 AD',
      admin: 'กรมศิลปากร',
      desc: 'โบราณสถานสำคัญของอยุธยา...',
    },
    {
      title: 'Sukhothai Historical Park',
      img: 'https://blog.bangkokair.com/wp-content/uploads/2025/06/Cover_sukhothai-historical-park.jpg',
      status: 'UNESCO Heritage',
      time: 'สมัยสุโขทัย',
      admin: 'กรมศิลปากร',
      desc: 'เมืองหลวงแรกของไทย...',
    },
    {
      title: 'Wat Phra Kaew',
      img: 'https://smarthistory.org/wp-content/uploads/2020/12/Temple-complex-Wat-Phra-Kaew.jpg',
      status: 'Bangkok Landmark',
      time: 'พ.ศ. 2325',
      admin: 'สำนักพระราชวัง',
      desc: 'วัดคู่บ้านคู่เมืองไทย...',
    },
    {
      title: 'Wat Arun',
      img: 'https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Wat-Arun-Bangkok-Thailand.jpg',
      status: 'Riverside Landmark',
      time: 'ยุคอยุธยาตอนปลาย',
      admin: 'กรมศาสนา',
      desc: 'พระปรางค์วัดอรุณงดงามมาก...',
    },
    {
      title: 'Phanom Rung',
      img: 'https://13ased.moe.go.th/wp-content/uploads/2024/08/P03004793_1.jpeg',
      status: 'Khmer Ancient',
      time: 'พุทธศตวรรษที่ 15',
      admin: 'กรมศิลปากร',
      desc: 'ปราสาทหินบนยอดภูเขาไฟเก่า...',
    },
  ];

  const tooltip = document.getElementById('mapTooltip');
  const tTitle = document.getElementById('tooltip-title');
  const tImg = document.getElementById('tooltip-img');
  const tStatus = document.getElementById('tooltip-status');
  const tTime = document.getElementById('tooltip-time');
  const tAdmin = document.getElementById('tooltip-admin');
  const tDesc = document.getElementById('tooltip-desc');

  function addPin(pinClass, index) {
    const pin = document.querySelector(pinClass);
    if (!pin) return;

    pin.addEventListener('click', () => {
      const d = pinData[index];

      tImg.src = d.img;
      tTitle.innerText = d.title;
      tStatus.innerText = d.status;
      tTime.innerText = d.time;
      tAdmin.innerText = d.admin;
      tDesc.innerText = d.desc;

      tooltip.style.display = 'block';
      tooltip.classList.remove('show');
      void tooltip.offsetWidth;

      const rect = pin.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const mapRect = document
        .getElementById('mapArea')
        .getBoundingClientRect();

      const pinX = rect.left - mapRect.left + rect.width / 2;
      const pinY = rect.top - mapRect.top + rect.height / 2;

      let left = pinX - tooltipRect.width / 2;
      let top = pinY + 25;

      if (left < 20) left = 20;
      if (left > mapRect.width - tooltipRect.width - 20)
        left = mapRect.width - tooltipRect.width - 20;

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;

      tooltip.classList.add('show');
    });
  }

  addPin('.map-pin', 0);
  addPin('.map-pin2', 1);
  addPin('.map-pin3', 2);
  addPin('.map-pin4', 3);
  addPin('.map-pin5', 4);

  new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) {
        tooltip.classList.remove('show');
        tooltip.style.display = 'none';
      }
    },
    { threshold: 0.1 },
  ).observe(document.querySelector('.map-section'));
})();

/* ================================
     AUTO-SECTION ACTIVE NAV
  ================================= */
(() => {
  if (!window.__navObserver) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.__navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.getAttribute('id');
          if (e.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('active'));
            document
              .querySelector(`.nav-link[href="#${id}"]`)
              ?.classList.add('active');
          }
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((sec) => window.__navObserver.observe(sec));
  }
})();

/* ================================
     Scroll down button
  ================================= */
document.querySelector('.scroll-down')?.addEventListener('click', () => {
  document.querySelector('section:nth-of-type(2)')?.scrollIntoView({
    behavior: 'smooth',
  });
});

/* ================================
     Counter Animation
  ================================= */
(() => {
  function animateCounter(counter) {
    const target = +counter.dataset.target;
    const speed = 70;
    const inc = target / speed;

    const update = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + inc);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    update();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const counters = entry.target.querySelectorAll('.counter');
        if (entry.isIntersecting) counters.forEach(animateCounter);
        else counters.forEach((c) => (c.innerText = '0'));
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(document.querySelector('.stats'));
})();

/* ================================
     GALLERY
  ================================= */
(() => {
  const galleryData = [
    {
      title: 'Ayutthaya Historical Park',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4xiTNZo4X6mC47meL91DT8T3q-8tlIaOCA&s',
    },
    {
      title: 'Sukhothai Historical Park',
      img: 'https://blog.bangkokair.com/wp-content/uploads/2025/06/Cover_sukhothai-historical-park.jpg',
    },
    {
      title: 'Wat Phra Kaew',
      img: 'https://smarthistory.org/wp-content/uploads/2020/12/Temple-complex-Wat-Phra-Kaew.jpg',
    },
    {
      title: 'Wat Arun',
      img: 'https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Wat-Arun-Bangkok-Thailand.jpg',
    },
    {
      title: 'Phanom Rung',
      img: 'https://13ased.moe.go.th/wp-content/uploads/2024/08/P03004793_1.jpeg',
    },
    {
      title: 'Ayutthaya Historical Park',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4xiTNZo4X6mC47meL91DT8T3q-8tlIaOCA&s',
    },
  ];

  const container = document.getElementById('galleryContainer');

  galleryData.forEach((item, i) => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4 gallery-item';
    col.innerHTML = `
        <div class="gallery-card">
          <img src="${item.img}" class="gallery-img">
          <div class="gallery-overlay"><h5>${item.title}</h5></div>
        </div>
      `;

    col.addEventListener('click', () => {
      document.getElementById('modalImage').src = item.img;
      new bootstrap.Modal(document.getElementById('imageModal')).show();
    });

    container.appendChild(col);
  });

  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      },
    });

    tl.fromTo(
      item,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out' },
    );
  });
})();

/* ================================
     Animate On View (animate.css)
  ================================= */
(() => {
  const items = document.querySelectorAll('.animate-piece');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const anim = el.dataset.animate;
        const delay = el.dataset.delay || '0s';

        if (entry.isIntersecting) {
          el.style.setProperty('--animate-delay', delay);
          el.classList.add('animate__animated', anim);
        } else {
          el.classList.remove('animate__animated', anim);
        }
      });
    },
    { threshold: 0.2 },
  );

  items.forEach((el) => observer.observe(el));
})();
