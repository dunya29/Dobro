const header = document.querySelector(".header")
const iconMenu = document.querySelector('.header__menu--btn');
const fixedBlocks = document.querySelectorAll(".fixed-block")
const modal = document.querySelectorAll(".modal")
const feedbackModal = document.querySelector(".feedback-modal")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
const customSelect = document.querySelectorAll(".custom-select")
let tablet = 991.98
let mob = 767.98
let mm = gsap.matchMedia()
//pageYOffset on scroll
function scrollPos() {
  return window.pageYOffset || document.documentElement.scrollTop
}
//enable scroll
function enableScroll() {
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}
// header fixed on scroll
function fixedHeader() {
  if (scrollPos() > 0) {
    header.classList.add("fixed")
  } else {
    header.classList.remove("fixed")
  }
}
window.addEventListener("scroll", fixedHeader)
window.addEventListener("resize", fixedHeader)
//accordion
$(".accordion__header").on("click", function () {
  $(this).toggleClass("active")
      .siblings(".accordion__body")
      .slideToggle()
      .parents(".accordion")
      .siblings(".accordion")
      .find(".accordion__header")
      .removeClass("active")
      .siblings(".accordion__body")
      .slideUp();
})
//swiper 4
const swiper4 = document.querySelectorAll(".swiper-4")
if (swiper4) {
  swiper4.forEach(item => {
    const itemSwiper = new Swiper(item, {
      slidesPerView: 1.2,
      spaceBetween: 8,
      observe: true,
      observeParents: true,
      speed: 800,
      breakpoints: {
        1200.98: {
          slidesPerView: 3.65,
          spaceBetween: 24
        },
        991.98: {
          slidesPerView: 3.65,
          spaceBetween: 16
        },
        767.98: {
          slidesPerView: 2.9,
          spaceBetween: 16
        },
        575.98: {
          slidesPerView: 2.3,
          spaceBetween: 8
        },
        369.98: {
          slidesPerView: 1.54,
          spaceBetween: 8
        }
      }
    })
  });
}
//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.setAttribute("aria-expanded", true);
  document.addEventListener("click", function clickOutside(e) {
    if (!select.contains(e.target)) {
      closeSelectCustom(select)
      document.removeEventListener('click', clickOutside);
    }
  });
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  select.setAttribute("aria-expanded", false);
}
//open/close select-custom
if (customSelect) {
  customSelect.forEach(select => {
    select.querySelector(".custom-select__selected").addEventListener("click", () => {
      if (!select.classList.contains("open")) {
        openSelectCustom(select)
      } else {
        closeSelectCustom(select)
      }
    })
  })
}
//menu
iconMenu.addEventListener("click", () => {
  if (window.innerWidth <= 991.98 && !header.classList.contains("show-menu")) {
    disableScroll()
    header.classList.add("show-menu")
  } else if (window.innerWidth <= 991.98 && header.classList.contains("show-menu")) {
    enableScroll()
    header.classList.remove("show-menu")
  }
})
window.addEventListener("resize", () => {
  if (window.innerWidth > 991.98 && header.classList.contains("show-menu")) {
    enableScroll()
    header.classList.remove("show-menu")
  }
})
//set price
function setRub() {
  const rub = document.querySelectorAll(".rub")
  if (rub) {
    rub.forEach(item => {
      let newPrice = String(Math.trunc(String(item.textContent).replace(/[^0-9,\.]/g,""))).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
      item.textContent = newPrice
    })
  }
}
setRub()
// item-help progress bar
const itemHelp = document.querySelectorAll(".item-help")
if (itemHelp) {
  itemHelp.forEach(item => {
    item.querySelector(".item-help__progress span").style.width = +item.getAttribute("data-coll") / +item.getAttribute("data-aim") * 100 + "%"
  })
}
//main-about
const mainAbout = document.querySelector(".main-about")
const aboutPath = document.querySelector(".main-about__path")
if (mainAbout) {
  const aboutSwiper = new Swiper(mainAbout.querySelector(".swiper"), {
    slidesPerView: 1,
    spaceBetween: 16,
    observe: true,
    observeParents: true,
    allowTouchMove: true,
    speed: 800,
    pagination: {
      el: mainAbout.querySelector(".swiper-pagination"),
      type: 'bullets'
    },
    breakpoints: {
      991.98: {
        slidesPerView: 2,
        allowTouchMove: false,
        spaceBetween: 0,
      }
    }
  })
  let slideCount = mainAbout.querySelectorAll(".swiper-slide").length
  let pathLength = aboutPath.querySelector("path").getTotalLength()
  aboutPath.style.strokeDasharray = pathLength + "px";
  aboutPath.style.strokeDashoffset = pathLength  
  let drawLength = 0
  mm.add("(min-width: 991.98px)", () => {
    gsap.to(".main-about .swiper-wrapper", {
      xPercent: -50 * (slideCount - 2),
      ease: "none",
      scrollTrigger: {
        trigger: ".main-about",
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => {
          "+=" + document.querySelector(".main-about .swiper-wrapper").offsetWidth
        },
        onEnter: ()=> {
          mainAbout.querySelector(".svg-path").style.opacity = 0
        },
        onLeaveBack: ()=> {
          mainAbout.querySelector(".svg-path").style.opacity = 1
        },
        onUpdate: (self) => {
          drawLength = pathLength * self.progress; 
           aboutPath.querySelector("path").style.strokeDashoffset = pathLength - drawLength;
          if (self.progress == 1) {
            aboutPath.style.opacity = 0
          } else {
            aboutPath.style.opacity = 1
          }
          aboutPath.style.transform = `translate3d(${-self.progress * 40 + "%"}, 0, 0)`
        },
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    })
  });
}
//main-info
const mainInfo = document.querySelector(".main-info")
let infoInit = false
let infoSwiper

if (mainInfo) {
  window.addEventListener("scroll", () => {
    if (window.innerWidth > mob) {
      let mainInfoTop = mainInfo.getBoundingClientRect().top
      if (mainInfoTop - window.innerHeight / 2 <= 0 && !mainInfo.classList.contains("show")) {
        mainInfo.classList.add("show")
      }
      if ((mainInfoTop - window.innerHeight / 1.2 > 0 || document.querySelector(".main-info__content").getBoundingClientRect().bottom < 0) && mainInfo.classList.contains("show")) {
        mainInfo.classList.remove("show")
      }
    }
  })
  mm.add("(min-width: 767.98px)", () => {
    gsap.to(".main-info .swiper", {
      //yPercent: -50 * (slideCount - 2),
      y: -window.innerHeight - document.querySelector(".main-info .swiper-wrapper").offsetHeight,
      ease: "none",
      scrollTrigger: {
        trigger: ".main-info",
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + document.querySelector(".main-info .swiper-wrapper").offsetHeight ,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    })
  })
  function initInfoSwiper() {
    if (window.innerWidth <= mob && !infoInit) {
      infoInit = true
      infoSwiper = new Swiper(mainInfo.querySelector(".swiper"), {
        spaceBetween: 20,
        observe: true,
        observeParents: true,
        speed: 800,
        pagination: {
          el: mainInfo.querySelector(".swiper-pagination"),
          type: 'bullets'
        },
      })
    } else if (window.innerWidth > mob && infoInit) {
      infoInit = false
      infoSwiper.destroy()
    }
  }
  initInfoSwiper()
  window.addEventListener("resize", initInfoSwiper)
}
// ambassadors swiper
const ambass = document.querySelector(".ambassadors")
if (ambass) {
  let slideCount = ambass.querySelectorAll(".ambassadors__mainswiper .swiper-slide").length
  const ambassThumbs = new Swiper(document.querySelector(".ambassadors__thumbswiper"),{
    slidesPerView: 'auto',
    observe: true,
    observeParents: true,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
  })
  const ambassSwiper = new Swiper(document.querySelector(".ambassadors__mainswiper"),{
    observe: true,
    observeParents: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    loopedSlides: slideCount,
     autoplay: {
      delay: 10000,
    },
  })
  ambassSwiper.controller.control = ambassThumbs;
  ambassThumbs.controller.control = ambassSwiper;
  let svgCircle = ambass.querySelectorAll(".ambassadors__svg-circle")
  let svgProgress = ambass.querySelectorAll(".ambassadors__svg-progress")
  let svgPath = svgCircle[0].getTotalLength()
  svgCircle.forEach(item => {
    item.style.strokeDasharray = svgPath + "px"
    item.style.strokeDashoffset = svgPath + "px"
  })
  svgProgress.forEach(item => {
    item.style.strokeDasharray = svgPath + 10 + "px"
    item.style.strokeDashoffset = svgPath + 10 + "px"
  })
}
const svgPath = document.querySelectorAll(".svg-path")
if (svgPath) {
  svgPath.forEach(item => {
    let path = item.querySelector("path")
    let pathLength = path.getTotalLength()
    path.style.strokeDasharray = pathLength + "px";
    path.style.strokeDashoffset = pathLength 
    let enter = false
    let drawLength
    setTimeout(() => {
      gsap.to(item, {
        ease: "none",
        scrollTrigger: {
          trigger: item.parentNode,
          start: "top bottom 100px",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          //once: true,
          onEnter: () => {
            enter = true
          },
          onLeave: () => {
            enter = false
          },
          onUpdate: (self) => {
            if (enter) {
              drawLength = pathLength * self.progress; 
              path.style.strokeDashoffset = pathLength - drawLength;
            }
          },
        }
      })
    }, 100);

  })
}