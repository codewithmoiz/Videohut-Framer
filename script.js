// Lenis JS with speed-controlling code
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

lenis.on('scroll', ScrollTrigger.update);

function update(time) {
  lenis.raf(time * 1000);
}
gsap.ticker.add(update);
gsap.ticker.lagSmoothing(0);



const speedElements = document.querySelectorAll('[data-speed]');

lenis.on('scroll', ({ scroll }) => {
  speedElements.forEach((element) => {
    const speedMultiplier = parseFloat(element.dataset.speed) || 1;
    const direction = element.dataset.direction || 'y';
    const movement = (scroll * speedMultiplier) / 25;


    if (direction.toLowerCase() === 'x') {
      element.style.transform = `translateX(${movement})px`;
    } else {
      element.style.transform = `translateY(${movement})px`;
    }
  });
});


// Mouse Move Effect's-code
document.addEventListener('DOMContentLoaded', () => {
    const tiltButtons = document.querySelectorAll('[data-tilt]');

    tiltButtons.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            let x = (e.offsetX - btn.offsetWidth / 2) * 0.01;
            let y = (e.offsetY - btn.offsetHeight / 2) * 0.01;

            gsap.to(btn, {
                x: x,
                y: y,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
});



if (window.matchMedia("(min-width: 1024px)").matches) {

  // Hero Section

gsap.to('.hero', {
  rotateX: '-45deg',
  scale: '0.7',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    scrub: true,
  }
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.parent',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 2,
  }
});

tl.to('.showreel h1',{
  scale: '0',
}, 'a')
.to('.showreel video',{
  scale: '1',
}, 'a')

}


// Logos Marquee
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".logos-wrapper");
  const container = document.querySelector(".logos-container");

  const clone = wrapper.cloneNode(true);
  container.appendChild(clone);

  const totalWidth = wrapper.offsetWidth;

  gsap.to(".logos-wrapper", {
      x: `-${totalWidth}px`,
      duration: 12,
      ease: "none",
      repeat: -1
  });
});

if (window.matchMedia("(min-width: 1024px)").matches) {


  // Portfolio Cards Cursor and Horizontal Scroll
document.addEventListener('DOMContentLoaded', () => {
  let cards = document.querySelectorAll('.portfolio-cards .card');

  cards.forEach((card) => {
    let cursor = card.querySelector('.card-cursor');
    let video = card.querySelector('video');
    
    
    card.addEventListener('mouseenter', () => {

      video.play();

      gsap.to(cursor, {
        opacity: 1,
      });

    });

    card.addEventListener('mousemove', (event) => {

      let rect = card.getBoundingClientRect();
      let cursorSize = 115 / 2;

      let x = event.clientX - rect.left - cursorSize;
      let y = event.clientY - rect.top - cursorSize;

      gsap.to(cursor, {
        top: `${y}px`,
        left: `${x}px`,
        ease: "ease"
      });

    });

    card.addEventListener('mouseleave', () => {

      video.pause();

      gsap.to(cursor, {
        opacity: 0,
      });

    });

  });


});


gsap.to('.portfolio-parent .portfolio-cards',{
  x: '-40%',
  scrollTrigger: {
    trigger: '.portfolio-parent',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 2,
  }
})

}






// Concept Cards
document.addEventListener('DOMContentLoaded', () => {
  let cards = document.querySelectorAll('.concept-cards .concept-card');

  cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
          gsap.to(card, {
              "--gradient-x": "50%",
              duration: 0.7,
              ease: "power3.out"
          });
      });

      card.addEventListener('mouseleave', () => {
          gsap.to(card, {
              "--gradient-x": "0%",
              duration: 0.5,
              ease: "power2.out"
          });
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.concept-card').forEach(card => {
      const details = card.querySelector('.concept-card-details');

      card.addEventListener('click', () => {
          if (card.classList.contains('open')) {
              details.style.height = details.scrollHeight + "px";
              setTimeout(() => details.style.height = "0px", 10);
              card.classList.remove('open');
              card.querySelector('button').innerHTML = `Learn More <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" color="var(--token-d9d01f21-7a47-443c-a8bc-56cdb453de6f, rgba(255, 255, 255, 0.8))" style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-d9d01f21-7a47-443c-a8bc-56cdb453de6f, rgba(255, 255, 255, 0.8)); color: var(--token-d9d01f21-7a47-443c-a8bc-56cdb453de6f, rgba(255, 255, 255, 0.8)); flex-shrink: 0;"><g color="var(--token-d9d01f21-7a47-443c-a8bc-56cdb453de6f, rgba(255, 255, 255, 0.8))" weight="thin"><path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm34.83-86.83a4,4,0,0,1,0,5.66l-32,32a4,4,0,0,1-5.66,0l-32-32a4,4,0,0,1,5.66-5.66L124,158.34V88a4,4,0,0,1,8,0v70.34l25.17-25.17A4,4,0,0,1,162.83,133.17Z"></path></g></svg>`;
          } else {
              details.style.height = details.scrollHeight + "px";
              card.classList.add('open');
              card.querySelector('button').innerHTML = `Hide Detais <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" color="var(--token-d9d01f21-7a47-443c-a8bc-56cdb453de6f, rgba(255, 255, 255, 0.8))" style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-d9d01f21-7a47-443c-a8bc-56cdb453de6f, rgba(255, 255, 255, 0.8)); color: var(--token-d9d01f21-7a47-443c-a8bc-56cdb453de6f, rgba(255, 255, 255, 0.8)); flex-shrink: 0;"><g color="var(--token-d9d01f21-7a47-443c-a8bc-56cdb453de6f, rgba(255, 255, 255, 0.8))" weight="thin"><path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm34.83-86.83a4,4,0,0,1,0,5.66l-32,32a4,4,0,0,1-5.66,0l-32-32a4,4,0,0,1,5.66-5.66L124,158.34V88a4,4,0,0,1,8,0v70.34l25.17-25.17A4,4,0,0,1,162.83,133.17Z"></path></g></svg>`;
              setTimeout(() => details.style.height = "auto", 400);
          }
      });
  });
});


// Testimonial Slider
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 50,
  centeredSlides: true,
  speed: 750,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints:{
    768: {
      slidesPerView: 1.3,
    }
  }
});



// FAQ
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const arrow = button.querySelector('.faq-arrow');
      const item = button.closest('.faq-item');

      if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
          document.querySelectorAll('.faq-answer').forEach(a => {
              a.style.maxHeight = '0px';
              a.style.marginBottom = '0px';
          });
          document.querySelectorAll('.faq-item').forEach(faq => {
              faq.classList.remove('open');
          });
          document.querySelectorAll('.faq-arrow').forEach(a => a.classList.remove('rotate-180'));

          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.marginBottom = '24px';
          arrow.classList.add('rotate-180');
          item.classList.add('open');
      } else {
          answer.style.maxHeight = '0px';
          answer.style.marginBottom = '0px';
          arrow.classList.remove('rotate-180');
          item.classList.remove('open');
      }
  });
});


  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            duration: 0.7,
            ease: "power3.out",
            "--faq-gradient-x": "50%",
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            duration: 0.5,
            ease: "power2.out",
            "--faq-gradient-x": "0%",
        });
    });
});


// Text With Image Marquee
document.addEventListener("DOMContentLoaded", function () {
  const marqueeTrack = document.querySelector(".marquee-track");
  const clone = marqueeTrack.cloneNode(true);
  marqueeTrack.parentNode.appendChild(clone);

  gsap.to(".marquee-track", {
      xPercent: -50,
      duration: 13,
      repeat: -1,
      ease: "linear",
  });
});



// Footer Hover
document.querySelector('.footer-inner').addEventListener('mouseenter', () => {
  gsap.to('.footer-inner', {
      "--footer-bg-value": "90% 0%",
      duration: 1,
      ease: "power3.out"
  })
})
document.querySelector('.footer-inner').addEventListener('mouseleave', () => {
  gsap.to('.footer-inner', {
      "--footer-bg-value": "3.7% 0%",
      duration: 1,
      ease: "power3.out"
  })
})


// Popup Menu
const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close menu when clicking a link (optional)
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
      nav.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});


// Scroll To Top Button
// document.addEventListener("DOMContentLoaded", () => {
//   window.addEventListener('scroll', () => {
//     if (window.scrollY > 10) {
//       gsap.to('#scroll-btn', {
//         opacity: 1,
//         bottom: "5%"
//       });
//     } else {
//       gsap.to('#scroll-btn', {
//         opacity: 0,
//         bottom: "3%"
//       });
//     }
//   });
// });

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    gsap.to("#scroll-btn", {
      opacity: 1,
      bottom: "5%",
      duration: 0.3,
      ease: "ease"
    });
  } else {
    gsap.to("#scroll-btn", {
      opacity: 0,
      bottom: "1%",
      duration: 0.3,
      ease: "ease"
    });
  }
});
