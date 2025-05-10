// Lenis JS with speed-controlling code
gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08
  })

  function raf(time) {
    lenis.raf(time)
    ScrollTrigger.update()
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        lenis.scrollTo(target)
      }
    })
  })



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


// Video Popup
document.addEventListener('DOMContentLoaded', () => {
  // Get all card links and cards
  const cardLinks = document.querySelectorAll('.portfolio-cards a');
  const cards = Array.from(document.querySelectorAll('.portfolio-cards .card'));
  let currentCardIndex = 0;
  
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 hidden';
  document.body.appendChild(popupOverlay);
  
  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content relative rounded-3xl overflow-hidden';
  popupOverlay.appendChild(popupContent);
  
  const closeButton = document.createElement('button');
  closeButton.className = 'close-btn !absolute !top-[7.5%] md:!right-[12%] !right-[6%] z-[9] md:w-14 md:h-14 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300';
  closeButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  popupOverlay.appendChild(closeButton);
  
  const navControls = document.createElement('div');
  navControls.className = 'nav-controls w-[90vw] md:w-[75vw] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex justify-between gap-8 z-10';
  
  const prevButton = document.createElement('button');
  prevButton.className = 'prev-btn w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300';
  prevButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'next-btn w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300';
  nextButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  
  navControls.appendChild(prevButton);
  navControls.appendChild(nextButton);
  popupOverlay.appendChild(navControls);
  
  let activeCardData = null;
  
  function showPopup(cardIndex) {
    document.querySelector('nav').style.display = 'none';
    
    currentCardIndex = cardIndex;
    const card = cards[cardIndex];
    
    const cardRect = card.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    const videoSrc = card.querySelector('video').getAttribute('src');
    
    activeCardData = {
      element: card,
      rect: cardRect,
      scrollTop: scrollTop
    };
    
    popupContent.innerHTML = `
      <video autoplay loop controls class="w-full h-full object-cover object-center" src="${videoSrc}"></video>
    `;
    
    card.style.visibility = 'hidden';
    
    popupContent.style.position = 'absolute';
    popupContent.style.width = `${cardRect.width}px`;
    popupContent.style.height = `${cardRect.height}px`;
    popupContent.style.top = `${cardRect.top + scrollTop}px`;
    popupContent.style.left = `${cardRect.left}px`;
    popupContent.style.borderRadius = '51px';
    popupContent.style.transform = 'none';
    
    popupOverlay.style.opacity = '0';
    popupOverlay.classList.remove('hidden');
    
    closeButton.style.opacity = '0';
    navControls.style.opacity = '0';
    
    gsap.to(popupOverlay, {
      opacity: 1,
      duration: 0.5
    });
    
    gsap.to(popupContent, {
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      width: '80vw',
      height: '90vh',
      borderRadius: '20px',
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(closeButton, {
          opacity: 1,
          duration: 0.3
        });
        
        gsap.to(navControls, {
          opacity: 1,
          duration: 0.3
        });
      }
    });
    
    updateNavButtons();
    
    document.body.classList.add('overflow-hidden');
  }
  
  function navigatePrev() {
    if (currentCardIndex > 0) {
      cards[currentCardIndex].style.visibility = 'visible';
      
      currentCardIndex--;
      transitionToCard(currentCardIndex);
    }
  }
  
  function navigateNext() {
    if (currentCardIndex < cards.length - 1) {
      cards[currentCardIndex].style.visibility = 'visible';
      
      currentCardIndex++;
      transitionToCard(currentCardIndex);
    }
  }
  
  function transitionToCard(newIndex) {
    const newCard = cards[newIndex];
    const videoSrc = newCard.querySelector('video').getAttribute('src');
    
    const cardRect = newCard.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    activeCardData = {
      element: newCard,
      rect: cardRect,
      scrollTop: scrollTop
    };
    
    newCard.style.visibility = 'hidden';
    
    gsap.to(popupContent.querySelector('video'), {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        popupContent.innerHTML = `
          <video autoplay loop controls class="w-full h-full object-cover object-center opacity-0" src="${videoSrc}"></video>
        `;
        
        gsap.to(popupContent.querySelector('video'), {
          opacity: 1,
          duration: 0.3
        });
        
        updateNavButtons();
      }
    });
  }
  
  function updateNavButtons() {
    if (currentCardIndex === 0) {
      prevButton.classList.add('opacity-40', 'cursor-not-allowed');
    } else {
      prevButton.classList.remove('opacity-40', 'cursor-not-allowed');
    }
    
    if (currentCardIndex === cards.length - 1) {
      nextButton.classList.add('opacity-40', 'cursor-not-allowed');
    } else {
      nextButton.classList.remove('opacity-40', 'cursor-not-allowed');
    }
  }
  
  function closePopup() {
    document.querySelector('nav').style.display = 'flex';
    
    if (!activeCardData) return;
    
    const card = activeCardData.element;
    const cardRect = activeCardData.rect;
    
    gsap.to([navControls, closeButton], {
      opacity: 0,
      duration: 0.3
    });
    
    gsap.to(popupContent, {
      top: `${cardRect.top + activeCardData.scrollTop}px`,
      left: `${cardRect.left}px`,
      xPercent: 0,
      yPercent: 0,
      width: `${cardRect.width}px`,
      height: `${cardRect.height}px`,
      borderRadius: '51px',
      duration: 0.5,
      ease: "power2.in"
    });
    
    gsap.to(popupOverlay, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        popupOverlay.classList.add('hidden');
        card.style.visibility = 'visible';
        
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
  
  cardLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPopup(index);
    });
  });
  
  prevButton.addEventListener('click', navigatePrev);
  nextButton.addEventListener('click', navigateNext);
  closeButton.addEventListener('click', closePopup);
  
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay || e.target.closest('.close-btn')) {
      closePopup();
    }
  });
  
  
  document.addEventListener('keydown', (e) => {
    if (popupOverlay.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') {
      closePopup();
    } else if (e.key === 'ArrowLeft') {
      navigatePrev();
    } else if (e.key === 'ArrowRight') {
      navigateNext();
    }
  });
});



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
