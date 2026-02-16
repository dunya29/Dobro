const header = document.querySelector(".header")
const iconMenu = document.querySelector('.header__menu--btn');
const fixedBlocks = document.querySelectorAll(".fixed-block")
const modal = document.querySelectorAll(".modal")
const modalShowBtn = document.querySelectorAll(".modal-show-btn")
const modCloseBtn = document.querySelectorAll(".mod-close-btn")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
const customSelect = document.querySelectorAll(".custom-select")
const overlay = document.querySelector(".overlay")
let tablet = 991.98
let mob = 767.98
let mm = gsap.matchMedia()
let animSpd = 400
Fancybox.bind('[data-fancybox]', {
    Hash: false,
})
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
if (header) {
    fixedHeader()
    window.addEventListener("scroll", fixedHeader)
    window.addEventListener("resize", fixedHeader)
}
// tabSwitch
function tabSwitch(nav, block) {
    nav.forEach((item, idx) => {
        item.addEventListener("click", () => {
            let href = item.getAttribute("data-nav")
            nav.forEach(el => {
                el.classList.remove("active")
            })
            block.forEach(el => {
                el.classList.remove("active")
            })
            item.classList.add("active")
            block[idx].classList.add("active")
            item.style.opacity = "0"
            block[idx].style.opacity = "0"
            setTimeout(() => {
                item.style.opacity = "1"
                block[idx].style.opacity = "1"
            }, 0);
        })
    });
}
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
    switchBlock.forEach(item => {
        tabSwitch(item.querySelectorAll("[data-tab]"), item.querySelectorAll("[data-block]"))
    })
}
// formSuccess
function formSuccess(form, introTxt = false, text = false, btnTxt = false) {
    form.querySelectorAll("input").forEach(inp => {
        if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
            inp.value = ""
        }
        if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
            inp.checked = false
        }
    })
    if (form.querySelector("textarea")) {
        form.querySelector("textarea").value = ""
    }
    let modal = document.querySelector(".modal.open")
    successModal.querySelector("h3").textContent = introTxt ? introTxt : "Заявка успешно оформлена"
    successModal.querySelector(".modal__body p").textContent = text ? text : "Заявка успешно оформлена"
    successModal.querySelector(".modal__body .main-btn").textContent = btnTxt ? btnTxt : ""
    if (modal) {
        modal.classList.remove("open")
        if (modal.classList.contains(("recovery-modal"))) {
            document.querySelector(".recovery-success-modal").classList.add("open")
        } else if (modal.classList.contains(("password-modal"))) {
            document.querySelector(".password-success-modal").classList.add("open")
        } else if (modal.classList.contains(("reg-modal"))) {
            document.querySelector(".log-modal").classList.add("open")
        } else {
            successModal.classList.add("open")
        }
    } else {
        openModal(successModal)
    }
}// formError
function formError(introTxt = false, text = false, btnTxt = false) {
    errorModal.querySelector("h3").textContent = introTxt ? introTxt : "Что-то пошло не так"
    errorModal.querySelector(".modal__body p").textContent = text ? text : "Попробуйте снова"
    errorModal.querySelector(".modal__body .main-btn").textContent = btnTxt ? btnTxt : ""
    let modal = document.querySelector(".modal.open")
    if (modal) {
        modal.classList.remove("open")
        errorModal.classList.add("open")
    } else {
        openModal(errorModal)
    }
}
//open modal
function openModal(modal) {
    if (!header.classList.contains("show-menu") && !document.querySelector(".modal.open")) {
        disableScroll()
    } else if (document.querySelector(".modal.open")) {
        document.querySelector(".modal.open").classList.remove("open")
    }
    overlay.classList.add("show")
    modal.classList.add("open")
}
//close modal
function closeModal(modal) {
    modal.classList.remove("open")
    if (!modal.classList.contains("cropp-ava")) {
        overlay.classList.remove("show")
        setTimeout(() => {
            if (!header.classList.contains("show-menu")) {
                enableScroll()
            }
        }, animSpd);
    }
}
// modal click outside
modal.forEach(mod => {
    mod.addEventListener("click", e => {
        if (!mod.classList.contains("mod-page")) {
            if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".modal__close").contains(e.target)) {
                closeModal(mod)
            }
        }
    })
})
// modal button on click
modalShowBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()
        let href = btn.getAttribute("data-modal")
        if (href == "donate-unsub-modal") {
            var currentURL = window.location.href;
            var newURL = currentURL + '#unsub';
            window.location.href = newURL;
        }
        openModal(document.getElementById(href))
    })
})
modCloseBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()
        let href = btn.getAttribute("data-modal")
        closeModal(document.getElementById(href))
    })
})
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
                    slidesPerView: 2.8,
                    spaceBetween: 16
                },
                575.98: {
                    slidesPerView: 2.3,
                    spaceBetween: 8
                },
                369.98: {
                    slidesPerView: 1.44,
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
    if (select.querySelector("input[type=radio]")) {
        select.querySelectorAll("input[type=radio").forEach(inp => {
            inp.addEventListener("change", () => {
                select.querySelector(".custom-select__selected span").textContent = inp.nextElementSibling.textContent
            })
        })
    }
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
if (iconMenu) {
    iconMenu.addEventListener("click", () => {
        if (window.innerWidth <= 991.98 && !header.classList.contains("show-menu")) {
            disableScroll()
            header.classList.add("show-menu")
        } else if (window.innerWidth <= 991.98 && header.classList.contains("show-menu")) {
            enableScroll()
            header.classList.remove("show-menu")
        }
    })
}
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
            let newPrice = String(Math.trunc(String(item.textContent).replace(/[^0-9,\.]/g, ""))).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
            item.textContent = newPrice
        })
    }
}
setRub()
//custom cursor
let myCursor = document.querySelectorAll(".my-cursor")
let cursorImg = document.querySelector(".cursor-img")
function mousePos(e) {
    cursorImg.style.left = e.clientX + "px"
    cursorImg.style.top = e.clientY + "px"
}
if (myCursor) {
    myCursor.forEach(item => {
        item.addEventListener("mouseenter", e => {
            mousePos(e)
            cursorImg.style.opacity = 1
            item.addEventListener("mousemove", e => mousePos(e))
            item.addEventListener("pointermove", e => {
                if (window.innerWidth > 991.98) {
                    mousePos(e)
                }
            })
            item.addEventListener("mouseleave", () => {
                cursorImg.style.opacity = 0
            })
            item.addEventListener("click", () => cursorImg.style.opacity = 0)
        })
    })
}
// custom scroll FF
const customScroll = document.querySelectorAll(".custom-scroll")
let isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
    document.documentElement.style.scrollbarColor = "#41536D #E6ECFF"
}
if (isFirefox && customScroll) {
    customScroll.forEach(item => { item.style.scrollbarColor = "#ff9bbf transparent" })
}
function viewScroll() {
    customScroll.forEach((item => {
        item.scrollHeight - item.clientHeight - item.scrollTop > 30 ? item.parentNode.classList.add("extra") : item.parentNode.classList.remove("extra")
        item.addEventListener("scroll", () => {
            item.scrollHeight - item.clientHeight - item.scrollTop > 30 ? item.parentNode.classList.add("extra") : item.parentNode.classList.remove("extra")
        })
    }
    ));
}
if (customScroll) {
    viewScroll(),
        window.addEventListener("resize", viewScroll)
}
//trans-cards animation
const transCards = document.querySelector(".trans-cards")
function cardAnim() {
    const cardItems = transCards.querySelectorAll(".trans-cards__item")
    if (cardItems.length > 0) {
        cardItems.forEach(item => {
            item.style.opacity = 0
            item.style.minWidth = null
            item.style.maxWidth = null
        })
        let cardCount = cardItems.length
        let offsetW = []
        cardItems.forEach((item, idx) => offsetW.push(item.offsetWidth))
        let maxW = offsetW.reduce((a, b) => a > b ? a : b);
        transCards.style.minWidth = maxW/* cardItems[cardCount - 1].offsetWidth  + 2*/ + "px"
        transCards.style.maxWidth = +transCards.getAttribute("data-coll") / +transCards.getAttribute("data-aim") * 100 + "%"
        let space = Math.floor((transCards.querySelector(".trans-cards__items").offsetWidth - maxW/* cardItems[cardCount - 1].offsetWidth */) / cardCount)
        if (space < 0) {
            space = 0
        } else if (space > 30) {
            space = 30
        }
        cardItems.forEach((item, idx) => {
            let minW = transCards.offsetWidth - space * (cardCount - 1) - 2 > maxW ? transCards.offsetWidth - space * (cardCount - 1) - 2 : maxW//transCards.offsetWidth - space * (cardCount - 1) - 2
            //maxW = cardItems[cardCount - 1].offsetWidth
            if (idx == cardCount - 1) {
                item.style.minWidth = minW + "px"
                item.style.maxWidth = maxW + "px"
                //item.style.transform = `translate3d(${space * idx}px, 0, 0)`
                item.style.transform = `translate3d(-${space * (cardCount - 1 - idx)}px, 0, 0)`
            } else {
                item.style.minWidth = minW - 2 + "px"
                item.style.maxWidth = maxW - 2 + "px"
                //item.style.transform = `translate3d(${space * idx + 1}px, 0, 0)`
                item.style.transform = `translate3d(-${space * (cardCount - 1 - idx) + 1}px, 0, 0)`
            }
            item.style.opacity = 1
        })
    }
}
if (transCards) {
    if (transCards.querySelectorAll(".trans-cards__item").length > 10) {
        let overCards = transCards.querySelectorAll(".trans-cards__item").length - 10
        for (let i = 0; i < overCards; i++) {
            transCards.querySelectorAll(".trans-cards__item")[i].remove()
        }
    }
    cardAnim()
    window.addEventListener("resize", cardAnim)
}
// progress bar
function initProgress() {
    const progressBar = document.querySelectorAll(".progress-bar")
    if (progressBar) {
        progressBar.forEach(item => {
            item.querySelector("span").style.width = +item.getAttribute("data-coll") / +item.getAttribute("data-aim") * 100 + "%"
        })
    }
}
initProgress()
// help tab
const helpTab = document.querySelectorAll(".help__tab")
const helpBlock = document.querySelectorAll(".help__block")
if (helpTab && helpBlock) {
    tabSwitch(helpTab, helpBlock)
}
// gallery swiper
const gallery = document.querySelectorAll(".gallery")
if (gallery) {
    gallery.forEach(item => {
        const itemSwiper = new Swiper(item.querySelector(".swiper"), {
            slidesPerView: 1.05,
            spaceBetween: 8,
            observe: true,
            observeParents: true,
            speed: 800,
            breakpoints: {
                1700.98: {
                    slidesPerView: 2.39,
                    spaceBetween: 24
                },
                991.98: {
                    slidesPerView: 2.3,
                    spaceBetween: 16
                },
                767.98: {
                    slidesPerView: 1.9,
                    spaceBetween: 16
                },
                575.98: {
                    slidesPerView: 1.3,
                    spaceBetween: 8
                }
            }
        })
    })
}
//main-about--sticky
const mainAboutSticky = document.querySelector(".main-about--sticky")
const aboutPath = document.querySelector(".main-about__path")
if (mainAboutSticky) {
    const aboutSwiper = new Swiper(mainAboutSticky.querySelector(".swiper"), {
        slidesPerView: 1,
        spaceBetween: 16,
        observe: true,
        observeParents: true,
        allowTouchMove: true,
        speed: 800,
        pagination: {
            el: mainAboutSticky.querySelector(".swiper-pagination"),
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
    let slideCount = mainAboutSticky.querySelectorAll(".swiper-slide").length
    let pathLength = aboutPath.querySelector("path").getTotalLength()
    aboutPath.style.strokeDasharray = pathLength + "px";
    aboutPath.style.strokeDashoffset = pathLength
    let drawLength = 0
    mm.add("(min-width: 991.98px)", () => {
        gsap.to(".main-about--sticky .swiper-wrapper", {
            xPercent: -50 * (slideCount - 2),
            ease: "none",
            scrollTrigger: {
                trigger: ".main-about--sticky",
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => {
                    "+=" + document.querySelector(".main-about--sticky .swiper-wrapper").offsetWidth
                },
                onEnter: () => {
                    mainAboutSticky.querySelector(".svg-path").style.opacity = 0
                },
                onLeaveBack: () => {
                    mainAboutSticky.querySelector(".svg-path").style.opacity = 1
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
                end: () => "+=" + document.querySelector(".main-info .swiper-wrapper").offsetHeight,
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
    let slideCount = ambass.querySelectorAll(".ambassadors__mainswiper .swiper-slide").length
    const ambassThumbs = new Swiper(document.querySelector(".ambassadors__thumbswiper"), {
        slidesPerView: 'auto',
        observe: true,
        observeParents: true,
        centeredSlides: true,
        loop: true,
        slideToClickedSlide: true,
        autoplay: {
            delay: 10500,
            disableOnInteraction: false
        },
    })
    const ambassSwiper = new Swiper(document.querySelector(".ambassadors__mainswiper"), {
        observe: true,
        observeParents: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        loopedSlides: slideCount,
    })
    ambassSwiper.controller.control = ambassThumbs;
    ambassThumbs.controller.control = ambassSwiper;
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
// funds filter
function filterFunds() {
    const fundsTabs = document.querySelectorAll(".funds .tabs span")
    const fundsItem = document.querySelectorAll(".item-fund")
    fundsTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            fundsTabs.forEach(el => {
                el.classList.remove('active');
            });
            btn.classList.add('active');
            const activeTag = btn.dataset.tag;
            if (activeTag.toLowerCase() === 'all') {
                fundsItem.forEach(item => item.classList.remove("unshow"))
            } else {
                fundsItem.forEach(item => {
                    if (String(item.dataset.tag).split(",").filter(item => item === String(activeTag)).length > 0) {
                        item.classList.remove("unshow")
                    } else {
                        item.classList.add("unshow")
                    }
                })
            }
        });
    });
}
if (document.querySelector(".funds")) {
    filterFunds();
}
if (document.querySelector(".share-list")) {
    let url = encodeURIComponent(window.location.href)
    let title = encodeURIComponent(document.title)
    let linkMass = [
        {
            title: 'Телеграм',
            href: "https://t.me/share/url?url=" + url + '&text=' + title,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM24.3162 10.121L21.4744 23.6875C21.4401 23.8516 21.365 24.0044 21.2561 24.1319C21.1473 24.2594 21.0081 24.3575 20.8515 24.4172C20.6948 24.4769 20.5257 24.4963 20.3596 24.4735C20.1935 24.4508 20.0357 24.3867 19.9009 24.2871L15.7674 21.2332L13.2631 23.5958C13.2303 23.6267 13.1917 23.6508 13.1495 23.6666C13.1074 23.6824 13.0624 23.6897 13.0174 23.688C12.9724 23.6863 12.9281 23.6756 12.8873 23.6566C12.8464 23.6376 12.8097 23.6107 12.7794 23.5774L12.7256 23.5182L13.1607 19.3073L21.0034 12.1416C21.0422 12.1062 21.0663 12.0576 21.071 12.0053C21.0757 11.953 21.0607 11.9009 21.0288 11.8592C20.9969 11.8175 20.9506 11.7892 20.8989 11.78C20.8472 11.7707 20.794 11.7812 20.7496 11.8093L10.7197 18.1574L6.4 16.7067C6.28514 16.6681 6.18504 16.5949 6.11342 16.4972C6.0418 16.3995 6.00218 16.2819 5.99998 16.1608C5.99779 16.0397 6.03314 15.9208 6.10118 15.8205C6.16922 15.7203 6.26661 15.6435 6.38 15.6008L23.2812 9.234C23.4116 9.18494 23.5528 9.1718 23.69 9.19596C23.8272 9.22012 23.9553 9.28069 24.0611 9.37134C24.1669 9.462 24.2464 9.57939 24.2912 9.71127C24.3361 9.84314 24.3447 9.98465 24.3162 10.121Z"/>
      </svg>`
        },
        {
            title: 'Одноклассники',
            href: "https://connect.ok.ru/offer?url=" + url + "&title=" + title,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM11.781 10.8438C11.781 8.5 13.6873 6.625 15.9998 6.625C18.3123 6.625 20.2185 8.5 20.2185 10.8438C20.2185 13.1875 18.3435 15.0625 15.9998 15.0625C13.656 15.0625 11.781 13.1562 11.781 10.8438ZM14.5935 10.8438C14.5935 11.625 15.2185 12.25 15.9998 12.25C16.781 12.25 17.406 11.625 17.406 10.8438C17.406 10.0625 16.781 9.4375 15.9998 9.4375C15.2185 9.4375 14.5935 10.0625 14.5935 10.8438ZM17.8123 19.0938C18.9685 18.9062 20.1248 18.5 21.1873 17.9062C21.8435 17.5312 22.0935 16.7187 21.7498 16.0312C21.406 15.375 20.5623 15.125 19.906 15.5C17.4998 16.8125 14.531 16.8125 12.156 15.4687C11.4998 15.0937 10.656 15.3125 10.281 15.9687C9.90603 16.6562 10.1248 17.4688 10.781 17.8438C11.8123 18.4375 12.9685 18.8125 14.1248 19.0312L10.8748 23.0937C10.4998 23.5625 10.4685 24.3437 10.8123 24.8125C11.0935 25.1875 11.4998 25.375 11.906 25.375C12.3123 25.375 12.6873 25.2188 12.9685 24.875L15.9685 21.1562L18.9998 24.875C19.5623 25.5938 20.6873 25.5625 21.2185 24.75C21.5623 24.25 21.4685 23.5937 21.0935 23.125L17.8123 19.0938Z" />
      </svg>`
        },
        {
            title: 'VK',
            href: "https://vk.com/share.php?url=" + url + "&title=" + title,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM24.5227 21.4312H22.4924C22.2725 21.4315 22.0554 21.3822 21.8571 21.287C21.6589
      21.1917 21.4847 21.0531 21.3475 20.8813C20.7386 20.1168 19.5391 18.7614 18.2797 18.1792C18.2067 18.145 18.1264 18.1298 18.046 18.135C17.9656 18.1401 17.8878 18.1654 17.8198 18.2086C17.7518 18.2518 17.6958 18.3114 17.6569 18.3819C17.6181
      18.4524 17.5976 18.5316 17.5974 18.6122V20.6202C17.5975 20.7267 17.5765 20.8322 17.5358 20.9306C17.495 21.029 17.4353 21.1184 17.36 21.1937C17.2847 21.269 17.1953 21.3287 17.0969 21.3695C16.9985 21.4103 16.8931 21.4312 16.7866 21.4312H15.8477C14.6269 21.4312 11.9978
      20.6881 9.90281 17.6363C8.11781 15.0363 7.32213 13.0213 6.85813 11.3876C6.83115 11.2918 6.82673 11.1911 6.84522 11.0934C6.86371 10.9956 6.9046 10.9035 6.96468 10.8242C7.02477 10.7449 7.10241 10.6806 7.19152 10.6364C7.28062 10.5922 7.37877 10.5692 7.47825 10.5693H9.53213C9.73703
      10.5691 9.93653 10.635 10.1009 10.7573C10.2653 10.8796 10.3859 11.0518 10.4446 11.2481C10.8266 12.5255 11.8158 15.2812 13.5644 16.6534C13.6178 16.6955 13.6818 16.7216 13.7493 16.729C13.8168 16.7363 13.885 16.7245 13.9461 16.6949C14.0072 16.6653 14.0587 16.6191 14.0948 16.5616C14.1309
      16.5041 14.1501 16.4376 14.1501 16.3697V13.1531C14.1501 12.5174 13.8746 11.8814 13.4446 11.3843C13.3827 11.313 13.3425 11.2254 13.329 11.1319C13.3154 11.0385 13.329 10.9431 13.3682 10.8571C13.4074 10.7712 13.4705 10.6983 13.5499 10.6472C13.6293 10.5961 13.7218 10.5689 13.8162 10.5689H16.9829C17.1459
      10.5689 17.3023 10.6337 17.4176 10.749C17.5329 10.8643 17.5977 11.0207 17.5977 11.1838V15.5166C17.5978 15.5793 17.615 15.6408 17.6477 15.6944C17.6803 15.7479 17.7271 15.7915 17.7828 15.8202C17.8385 15.849 17.9011 15.8618 17.9637 15.8574C18.0262 15.853 18.0864 15.8314 18.1375 15.7951C18.7188 15.3813 19.2166 14.7701
      19.6744 14.083C20.2507 13.2188 20.9539 11.7901 21.3066 11.0487C21.3749 10.9051 21.4825 10.7837 21.617 10.6988C21.7514 10.6138 21.9072 10.5687 22.0662 10.5688H24.3062C24.3998 10.5687 24.4918 10.5926 24.5735 10.638C24.6553 10.6835 24.724 10.7491 24.7733 10.8286C24.8226 10.9081 24.8508 10.9989 24.8551 11.0923C24.8595
      11.1857 24.84 11.2787 24.7983 11.3625C24.2331 12.4963 23.1321 14.5761 22.0961 15.7964C21.9478 15.9719 21.8752 16.199 21.8942 16.428C21.9133 16.6569 22.0223 16.869 22.1976 17.0176C22.8729 17.5946 23.9271 18.6614 25.0637 20.4382C25.1265 20.5354 25.1618 20.6478 25.1661 20.7634C25.1703 20.8791 25.1434 20.9937 25.088 21.0953C25.0326 21.1969 24.9509 21.2818 24.8514 21.3409C24.752 21.4 24.6384 21.4312 24.5227 21.4312Z"/>
      </svg>`
        },
    ]
    document.querySelector(".share-list").insertAdjacentHTML('beforeend', `
    ${linkMass.map(item => `<a href="${item.href}" target="_blank" rel="nofollow noopener">
       ${item.icon}
    </a>`
    ).join("")}
`);
}
const team = document.querySelector(".team")
let teamInit = false
let teamSwiper
let maxW
let itemWwidth
function teamAction() {
    if (window.innerWidth > 991.98) {
        if (teamInit) {
            teamInit = false
            teamSwiper.destroy()
        }
        const teamItems = team.querySelectorAll(".swiper-slide")
        teamItems.forEach((item, idx) => {
            if (idx == 0) {
                item.style.width = maxW + "%"
                item.classList.add("active")
            } else {
                item.classList.remove("active")
                item.style.width = itemWwidth
            }
        })
    } else {
        if (!teamInit) {
            teamInit = true
            teamSwiper = new Swiper(team.querySelector(".swiper"), {
                slidesPerView: 1.16,
                spaceBetween: 16,
                observe: true,
                observeParents: true,
                speed: 800,
                breakpoints: {
                    767.98: {
                        slidesPerView: 2.4,
                        spaceBetween: 16
                    },
                    575.98: {
                        slidesPerView: 1.9,
                        spaceBetween: 16
                    },
                    480.98: {
                        slidesPerView: 1.6,
                        spaceBetween: 16
                    }
                },
                pagination: {
                    el: team.querySelector(".swiper-pagination"),
                    type: 'bullets'
                },
            })
        }
    }
}
if (team) {
    let overSlides = team.querySelectorAll(".swiper-slide").length
    if (overSlides > 5) {
        for (let i = 0; i < overSlides - 5; i++) {
            team.querySelectorAll(".swiper-slide")[i].remove()
        }
    }
    const teamItems = team.querySelectorAll(".swiper-slide")
    let count = teamItems.length
    maxW = 55.3
    itemWwidth = (100 - maxW) / (count - 1) + "%"
    teamItems.forEach((item, idx) => {
        item.addEventListener("mouseenter", e => {
            if (window.innerWidth > 991.98) {
                e.preventDefault()
                teamItems[0].style.width = itemWwidth
                teamItems[0].classList.remove("active")
                item.style.width = maxW + "%"
                item.classList.add("active")
            }
        })
        item.addEventListener("mouseleave", e => {
            if (window.innerWidth > 991.98) {
                e.preventDefault()
                item.style.width = itemWwidth
                item.classList.remove("active")
                teamItems[0].style.width = maxW + "%"
                teamItems[0].classList.add("active")
            }
        })
    })
    teamAction()
    window.addEventListener("resize", teamAction)
}
// help fixed btn
const introFixedBtn = document.querySelector(".fixed-btn")
const descBlock = document.querySelectorAll(".desc-block")[0]
if (introFixedBtn) {
    window.addEventListener("scroll", () => {
        let pos = descBlock ? descBlock.getBoundingClientRect().top : window.innerHeight
        if (pos < 120 || scrollPos() > window.innerHeight) {
            if (window.innerHeight - document.querySelector(".footer").getBoundingClientRect().top + 30 >= 0) {
                introFixedBtn.classList.remove("show")
            } else {
                introFixedBtn.classList.add("show")
            }
        } else {
            introFixedBtn.classList.remove("show")
        }
    })
}
//transaction table
const histTable = document.querySelectorAll(".transactions__table")
function histBeautify() {
    histTable.forEach(item => {
        item.querySelector("tbody").querySelectorAll("tr td:nth-child(3)").forEach((el, idx) => {
            el.textContent = String(Math.trunc(String(el.textContent).replace(/[^0-9,\.]/g, ""))).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim() + " ₽"
        })
    })
}
if (histTable) {
    setTimeout(histBeautify, 500)
}
// Cropp file ava

const cropAvaPopup = document.querySelector('#cropp-ava');
const croppieContainer = document.querySelector('#croppieContainer');
const cropBtn = document.querySelector('#cropBtn');
const cropDestroy = document.querySelector('#crop-destroy');
let croppieInstance
//addfile (validate)
function addFile(inputPhoto, imgWrap, avatarInput, file) {
    if (!/image*/.test(file.type)) {
        showMessages('error', 'Неверный формат файла');
        inputPhoto.value = '';
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        inputPhoto.value = '';
        showMessages('error', 'Неверный размер файла');
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const imgUrl = reader.result;
        const img = new Image;
        img.src = imgUrl;
        img.onload = function () {
            if (img.width > 2056 || img.height > 2056) {
                inputPhoto.value = '';
                showMessages('error', 'Размеры изображения больше разрешенных');
            } else {
                if (croppieInstance) {
                    croppieInstance.destroy();
                }
                cropAvaPopup.classList.add("open")
                croppieInstance = new Croppie(croppieContainer, {
                    url: imgUrl,
                    enableExif: true,
                    viewport: {
                        width: 200,
                        height: 200,
                        type: 'square'
                    },
                    boundary: {
                        width: 400,
                        height: 400
                    }
                });
            }
        }
    };
}
if (cropAvaPopup) {
    const uploadInput = document.querySelectorAll('.file-form__ava');
    uploadInput.forEach(item => {
        const inputPhoto = item.querySelector('.reg_file');
        const imgWrap = item.querySelector('.file-form__img');
        const avatarInput = item.querySelector('input[name="avatar"]');
        inputPhoto.addEventListener('change', event => {
            const file = event.target.files[0];
            addFile(inputPhoto, imgWrap, avatarInput, file)
        });
        item.addEventListener("dragenter", e => {
            e.preventDefault();
        })
        item.addEventListener("dragover", e => {
            e.preventDefault();
        })
        item.addEventListener("dragleave", e => {
            e.preventDefault();
        })
        item.addEventListener("drop", function (e) {
            e.preventDefault();
            let files = Array.from(e.dataTransfer.files);
            console.log(files)
            item.querySelector("input[type=file]").files = e.dataTransfer.files
            addFile(inputPhoto, imgWrap, avatarInput, files[0])
        });
        cropBtn.addEventListener('click', () => {
            croppieInstance.result({
                type: 'blob',
                size: {
                    width: 200,
                    height: 200
                },
                format: 'jpeg',
                quality: 1,
                circle: false
            }).then(blob => {
                const croppedFile = new File([blob], 'croppedFile.jpg', {
                    type: 'image/jpg',
                    lastModified: Date.now()
                });
                const imgUrl = URL.createObjectURL(croppedFile);
                imgWrap.style.backgroundImage = `url(${imgUrl})`;
                cropAvaPopup.classList.remove("open")
                const formData = new FormData();
                formData.append('cropped', croppedFile);
                formData.append('original', inputPhoto.files[0]);
                avatarInput.value = '';
                $.ajax({
                    // Hostname and port of the local server
                    url: "/files/upload/avatar",
                    // HTTP request type
                    type: "POST",
                    // Sending blob with our request
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    success: function (response) {
                        if (response.status) {
                            const imgUrl = URL.createObjectURL(croppedFile);
                            imgWrap.style.backgroundImage = `url(${imgUrl})`;
                            avatarInput.value = response.file;
                            showMessages('info', 'Файл загружен');
                            cropAvaPopup.classList.remove("open")
                        } else {
                            inputPhoto.value = '';
                            showMessages('error', 'Не удалось загрузить файл');
                            cropAvaPopup.classList.remove("open")
                        }
                    },
                    error: function (e) {
                        inputPhoto.value = '';
                        showMessages('error', 'Не удалось загрузить файл');
                        cropAvaPopup.classList.remove("open")
                    }
                });
            });
        });
        cropDestroy.addEventListener("click", () => cropAvaPopup.classList.remove("open"))
    })
}
//validator defaults
$.extend($.validator.messages, {
    required: "Это поле необходимо заполнить.",
    email: "Пожалуйста, введите корректный почтовый адрес.",
    url: "Введите корретную ссылку",
    equalTo: "Пароли должны совпадать",
    extension: "Недопустимое разрешение файла",
    maxlength: jQuery.validator.format("Введите не больше {0} символов."),

});
//showmessages
function showMessages(status = false, text) {
    document.body.insertAdjacentHTML("beforeend", `<div class="form-error">${text}</div`)
    setTimeout(() => {
        if (document.querySelector(".form-error")) {
            document.querySelector(".form-error").remove()
        }
    }, 6000);
}
// password-form
$("#password-form").validate({
    errorElement: "div",
    ignore: ":hidden",
    rules: {
        password: {
            required: true,
            minlength: 6
        },
        repeat_password: {
            required: true,
            equalTo: "#enter-pass"
        }
    },
    messages: {
        password: {
            minlength: "Пароли должны быть длиннее 6 символов"
        },
    },
    submitHandler: function (form) {
        formSuccess(form)
    }
});
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
        Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
    })
}
const itemForm = document.querySelectorAll(".item-form")
if (itemForm) {
    itemForm.forEach(item => {
        if (item.querySelector(".item-form__reset")) {
            item.querySelector("input").addEventListener("input", () => {
                if (item.querySelector("input").value.length > 0) {
                    item.classList.add("show-reset")
                } else {
                    item.classList.remove("show-reset")
                }
            })
            item.querySelector("input").addEventListener("change", () => {
                item.classList.remove("show-reset")
            })
            item.querySelector("input").addEventListener("focus", () => {
                if (item.querySelector("input").value.length > 0) {
                    item.classList.add("show-reset")
                }
            })
            item.querySelector(".item-form__reset").addEventListener("click", () => {
                item.querySelector("input").value = ""
                item.classList.remove("show-reset")
            })
        }
        if (item.querySelector(".item-form__eye")) {
            item.querySelector(".item-form__eye").addEventListener("click", () => {
                item.classList.toggle("show-password")
                if (item.classList.contains("show-password")) {
                    item.querySelector("input").type = "text"
                } else {
                    item.querySelector("input").type = "password"
                }
            })
        }
    })
}

const donateCheckboxMonth = document.querySelector('#donate-2');
if (donateCheckboxMonth) {
    const donateCheckboxes = document.querySelectorAll('.form-tabs--donate input[type=radio]');
    donateCheckboxes.forEach(donateCheckbox => {
        donateCheckbox.addEventListener('change', () => {
            if (donateCheckboxMonth.checked) {
                $('.donate-form__month').slideDown(300);
            } else {
                $('.donate-form__month').slideUp(300);
            }
        });
    });
}
const donateAmountCustom = document.querySelector('#other-amount');
if (donateAmountCustom) {
    const donateAmountCheckboxes = document.querySelectorAll('.form-tabs--amount input[type=radio]');
    donateAmountCheckboxes.forEach(donateAmountCheckbox => {
        donateAmountCheckbox.addEventListener('change', () => {
            if (donateAmountCustom.checked) {
                $('.other-amount').slideDown(300);
            } else {
                $('.other-amount').slideUp(300);
            }
        });
    });
}
if (window.location.href.indexOf('#unsub') != -1) {
    openModal(document.querySelector(".donate-unsub-modal"))
}
const loadingBtns = document.querySelectorAll(".btn.page-loading")
if (loadingBtns.length) {
    loadingBtns.forEach(item => item.classList.remove("page-loading"))
}

const mainStepsItems = document.querySelector('.main-steps__items')
const itemSteps = document.querySelectorAll(".item-step")
if (mainStepsItems && itemSteps.length) {
    const tl = gsap.timeline({
        defaults: {
            ease: "none"
        },
        scrollTrigger: {
            trigger: mainStepsItems,
            start: "top bottom-=30%",
            end: "bottom bottom",
            invalidateOnRefresh: true,
        },
    })
    itemSteps.forEach((item, idx) => {
        let path = item.querySelector(".item-step__path path")
        if (path) {
            let pathLength = path.getTotalLength()
            path.style.strokeDasharray = pathLength + "px";
            path.style.strokeDashoffset = pathLength
            tl.to(path, {
                strokeDashoffset: 0,
                duration: 1,
            }, ">-0.1");
        }
        const info = item.querySelector(".item-step__info")
        if (info) {
            info.style.opacity = 0
            tl.to(info, {
                opacity: 1,
                duration: 1,
            }, "<");
        }
    })
}