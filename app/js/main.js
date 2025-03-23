import Lenis from 'lenis'

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

import Shery from "sheryjs/dist/Shery.js";

import anime from 'animejs/lib/anime.es.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {

const windowInnerHeight = document.documentElement.clientHeight;
const windowInnerWidth = document.documentElement.clientWidth;

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis({
    duration: 3,
    smooth: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});
// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin

document.querySelectorAll('#href-target').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Отменить стандартное поведение ссылки
        const targetId = link.getAttribute('href'); // Получить ID якоря
        const targetElement = document.querySelector(targetId); // Найти элемент

        if (targetElement) {
            lenis.scrollTo(targetElement, { // Прокрутка до элемента
                duration: 1.5, // Длительность прокрутки
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавность,
                offset: -100
            });
        }
    });
});


const mobile_nav = document.querySelector('.mobile-nav');
const mobile_nav__block = document.querySelector('.mobile-nav__block');
const mobile_nav__image = document.querySelector('.mobile-image');
const mobile_nav__li = document.querySelectorAll('.mobile-li a');

let intervalId = null;
let i = 1;

mobile_nav.addEventListener('click', (e) => {
    e.preventDefault();
    mobile_nav__block.classList.toggle('active');
    mobile_nav__li.forEach((el) => {
        el.addEventListener('click', () => {
            mobile_nav__block.style.cssText = 'transform: translateY(-100%)';
            mobile_nav__block.classList.remove('active');
        })
    });
    if(mobile_nav__block.classList.contains('active')) {        
        mobile_nav__block.style.cssText = 'transform: translateY(0%)';
        if(!intervalId){
            intervalId = setInterval(() => {
                i = i > 360 ? 1 : i + 1; // Сбрасываем i, если оно превышает 360
                mobile_nav__image.style.cssText = `transform: rotate(${i}deg)`;
            }, 10);
        }
    }
    else{
        mobile_nav__block.style.cssText = 'transform: translateY(-100%)';
    }

})


// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick


function fontSizeMath(fontSize) {
    let resultFontSize = (windowInnerWidth / 100) * fontSize;
    return resultFontSize;
}

function procentMathHeight (fontSize, procent) {
    let resultProcent = ((windowInnerHeight - fontSizeMath(fontSize)) * procent) / 100;;
    return resultProcent;
}

function procentMathWidth (procent) {
    let resultProcent = (windowInnerWidth  * procent) / 100;
    return resultProcent;
}


let progress = 0;
const progressBar = document.querySelector("#progress-bar::after");
const progressText = document.querySelector("#progress-text");

const interval = setInterval(() => {
    progress += 1;
    if (windowInnerWidth > 1024) {
        if(progress > 30) {
            gsap.to(progressText, {
                y: procentMathHeight(12, 30),
                duration: 1
            })
        }
    
        if(progress > 50) {
            gsap.to(progressText, {
                y: procentMathHeight(12, 50),
                duration: 1
            })
        }
    
        if(progress > 80) {
            gsap.to(progressText, {
                y: procentMathHeight(12, 95),
                duration: 1
            })
        }
    } else {
        if(progress > 30) {
            gsap.to(progressText, {
                y: procentMathHeight(30, 30),
                duration: 1
            })
        }
    
        if(progress > 50) {
            gsap.to(progressText, {
                y: procentMathHeight(30, 50),
                duration: 1
            })
        }
    
        if(progress > 80) {
            gsap.to(progressText, {
                y: procentMathHeight(30, 95),
                duration: 1
            })
        }
    }

    if (progress > 100) {
        clearInterval(interval);
        // Скрыть лоадер после завершения
        gsap.to("#loader", {
            width: '0%',
            duration: 1.5,
            onComplete: () => {
                startAnimate();
                document.getElementById("loader").style.display = "none";
            }
        });
    } else {
        // Обновить текст и полосу прогресса
        progressText.textContent = `${progress}%`;
        gsap.to(progressBar, {
            width: `${progress}%`,
            duration: 0.1,
            ease: "none"
        });
    }
}, 60); // Интервал обновления (в миллисекундах)


function startAnimate(){

if(windowInnerWidth > 1024){
    Shery.mouseFollower({
        //Parameters are optional.
        duration: .1,
    });

    Shery.makeMagnet(".magnet-target" /* Element to target.*/, {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: .5,
});
}

let textWrapper = document.querySelector("#footer__inner-text");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

gsap.to(textWrapper, {
    scrollTrigger: { 
        trigger: textWrapper,
        start: 'bottom bottom',
        onEnter: () => {
            anime.timeline({ loop: false })
                .add({
                    targets: ".letter",
                    opacity: [0, 1],
                    translateY: [-150, 0], // Появление сверху
                    easing: "easeOutExpo",
                    duration: 2000,
                    delay: (el, i) => 200 * i
                });

            // Удаляем ScrollTrigger после первого срабатывания
            ScrollTrigger.getById("textAnimation")?.kill();
        },
        once: true, // Анимация запускается только один раз
        id: "textAnimation"
    }
});


const tl = gsap.timeline({
    scrollTrigger:{
        trigger: '.start__inner-text-bottom-left-text', // Общий триггер для Timeline
        start: '10% bottom', // Начало анимации
    }
  });

const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: '.sports__inner-bottom-img-div',
        start: 'bottom 80%',
    }
});

const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: '.news__inner-items',
        start: 'top bottom'
    }
})

gsap.to('#star', {
    rotate: '+=360',
    scrollTrigger: {    
        trigger: '#teacher',
        start: 'top bottom', // Анимация начнётся, когда верх элемента будет на 80% от верха окна
        scrub: true, // Плавная анимация при скролле
    }
})

gsap.to('#star_big', {
    rotate: '+=360',
    scrollTrigger: {    
        trigger: '.bottom-text',
        start: 'top bottom', // Анимация начнётся, когда верх элемента будет на 80% от верха окна
        scrub: true, // Плавная анимация при скролле
    }
})

tl.to(['#span-i', '#span-c-one', '#span-c-two','#span-douth'], {
    x: procentMathWidth(-15),
    duration: 3,
    stagger: .5, // Небольшая задержка между анимациями
}).to('#span-i', {
    y: procentMathHeight(18, -10),
    duration: .7
}).to('#span-i', {
    y: 0,
    duration: .5,
})

gsap.from('#important-one', {
    y: procentMathWidth(-20),
    scrollTrigger: {
        trigger: '#important-one',
        start: '-100% 20%',
        end: 'bottom 30%',
        scrub: true,
    }
})

gsap.from('#important-two', {
    y: procentMathWidth(-20),
    scrollTrigger: {
        trigger: '#important-two',
        start: '-50% 20%',
        end: 'bottom 30%',
        scrub: true,
    }
})


gsap.from('#important-three', {
    y: procentMathWidth(-20),
    scrollTrigger: {
        trigger: '#important-three',
        start: '-50% 20%',
        end: 'bottom 30%',
        scrub: true,
        
    }
})


gsap.from('#important-four', {
    y: procentMathWidth(-20),
    scrollTrigger: {
        trigger: '#important-four',
        start: '-50% 20%',
        end: 'bottom 30%',
        scrub: true,
        
    }
})

if(windowInnerWidth > 820){
    tl2.fromTo('.sports__inner-bottom-img-div', {
        y: procentMathWidth(-30),
        duration: 3
    },{
        y: procentMathWidth(15),
    duration: 1 
    }).to('.sports__inner-bottom-img-div',{
        zIndex: 3,
    }).to('.sports__inner-bottom-img-div',{
        y: 0,
        duration: 1
    }, '-=.3')
}
else if (windowInnerWidth <= 540) {
    tl2.fromTo('.sports__inner-bottom-img-div', {
        y: procentMathWidth(-30),
        duration: 3
    },{
        y: procentMathWidth(20),
    duration: 1 
    }).to('.sports__inner-bottom-img-div',{
        zIndex: 3,
    }).to('.sports__inner-bottom-img-div',{
        y: 0,
        duration: 1
    }, '-=.3')
}
else {
    tl2.fromTo('.sports__inner-bottom-img-div', {
        y: procentMathWidth(-30),
        duration: 3
    },{
        y: procentMathWidth(15),
       duration: 1 
    }).to('.sports__inner-bottom-img-div',{
        zIndex: 3,
    }).to('.sports__inner-bottom-img-div',{
        y: procentMathWidth(2),
        duration: 1
    }, '-=.3')
}

tl3.to('#news__inner-item-n', {
    y: procentMathHeight(12,-10),
    duration: .5
}).to('#news__inner-item-n', {
    y: 0,
    duration: .5
}).to('#news__inner-item-e', {
    y: procentMathHeight(12,-10),
    duration: .5
}).to('#news__inner-item-e', {
    y: 0,
    duration: .5
}).to('#news__inner-item-w', {
    y: procentMathHeight(12,-10),
    duration: .5
}).to('#news__inner-item-w', {
    y: 0,
    duration: .5
}).to('#news__inner-item-s', {
    y: procentMathHeight(12,-10),
    duration: .5
}).to('#news__inner-item-s', {
    y: 0,
    duration: .5
})

}

})