Shery.mouseFollower();
// Shery.makeMagnet(".magnet");
gsap.registerPlugin();

import { preloadImages } from './utils.js';

let lenis;

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.1, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};

// Function to trigger Flip animations when scrolling
const triggerFlipOnScroll = (galleryEl, options) => {
	// Default settings for Flip and ScrollTrigger
	let settings = {
		flip: {
			absoluteOnLeave: false,
			absolute: false,
			scale: true,
			simple: true,
			//...
		},
		scrollTrigger: {
			start: 'center center',
			end: '+=300%',
		},
		stagger: 0
	};

	// Merge default settings with options provided when calling the function
	settings = Object.assign({}, settings, options);

	// Select elements within the gallery that will be animated
	const galleryCaption = galleryEl.querySelector('.caption');
	const galleryItems = galleryEl.querySelectorAll('.gallery__item');
	const galleryItemsInner = [...galleryItems].map(item => item.children.length > 0 ? [...item.children] : []).flat();

	// Temporarily add the final class to capture the final state
	galleryEl.classList.add('gallery--switch');
	const flipstate = Flip.getState([galleryItems, galleryCaption], { props: 'filter, opacity' });

	// Remove the final class to revert to the initial state
	galleryEl.classList.remove('gallery--switch');

	// Create the Flip animation timeline
	const tl = Flip.to(flipstate, {
		ease: 'none',
		absoluteOnLeave: settings.flip.absoluteOnLeave,
		absolute: settings.flip.absolute,
		scale: settings.flip.scale,
		simple: settings.flip.simple,
		scrollTrigger: {
			trigger: galleryEl,
			start: settings.scrollTrigger.start,
			end: settings.scrollTrigger.end,
			pin: galleryEl.parentNode,
			scrub: true,
		},
		stagger: settings.stagger
	});

	// If there are inner elements in the gallery items, animate them too
	if (galleryItemsInner.length) {
		tl.fromTo(galleryItemsInner, {
			scale: 2
		}, {
			scale: 1,
			scrollTrigger: {
				trigger: galleryEl,
				start: settings.scrollTrigger.start,
				end: settings.scrollTrigger.end,
				scrub: true,
			},
		}, 0)
	}
};

// Function to apply scroll-triggered animations to various galleries
// Apply scroll-triggered animations to each gallery with specific settings
const scroll = () => {
	// Define the gallery IDs and their options
	const galleries = [
		// { id: '#gallery-1', options: { flip: { absoluteOnLeave: true, scale: false } } },
		// { id: '#gallery-2' },
		{ id: '#gallery-3', options: { flip: { absolute: true, scale: false }, scrollTrigger: { start: 'center center', end: '+=900%' }, stagger: 0.05 } },
		// { id: '#gallery-4' },
		// { id: '#gallery-5' },
		{ id: '#gallery-6' },
		// { id: '#gallery-7' },
		// { id: '#gallery-8', options: { flip: { scale: false } } },
		// { id: '#gallery-9' },
	];

	// Loop through the galleries and apply the scroll-triggered animations
	galleries.forEach(gallery => {
		const galleryElement = document.querySelector(gallery.id);
		triggerFlipOnScroll(galleryElement, gallery.options);
	});
}

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
preloadImages('.gallery__item').then(() => {
	initSmoothScrolling();
	scroll();
	document.body.classList.remove('loading');
});

document.addEventListener('DOMContentLoaded', function () {
	var tl = gsap.timeline({
		paused: "true"
	});
	tl.to(".menu", {
		duration: 1,
		x: "0%",
		ease: Expo.easeInOut
	});
	tl.fromTo(".li", {
		y: "-100%",
		opacity: 0
	}, {
		duration: .5,
		opacity: 1,
		y: "0%",
		stagger: 0.25
	});
	tl.fromTo(".social-li", {
		y: "-50%",
		opacity: 0
	}, {
		duration: 0.3,
		opacity: 1,
		stagger: 0.25,
		ease: Expo.easeOut
	},
		"-=0.5");

	function toggle() {
		tl.play();
	}

	function togglec() {
		tl.reverse();
	}

	const menuButton = document.getElementById('menuButton');
	const closeButton = document.getElementById('closeButton');

	if (menuButton) {
		menuButton.addEventListener('click', toggle);
	}
	if (closeButton) {
		closeButton.addEventListener('click', togglec);
	}
});


function dom2() {

    const sections = document.querySelectorAll('.section');

    gsap.utils.toArray(sections).forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            toggleClass: 'active',
            markers: false,
        });
    });

    const canvas = document.querySelector("#home2>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    })

    function files(index) {
        var data = `https://arvr.google.com/static/images/frames/hero/small/00002.png
        https://arvr.google.com/static/images/frames/hero/small/00004.png
        https://arvr.google.com/static/images/frames/hero/small/00006.png
        https://arvr.google.com/static/images/frames/hero/small/00008.png
        https://arvr.google.com/static/images/frames/hero/small/00010.png
        https://arvr.google.com/static/images/frames/hero/small/00012.png
        https://arvr.google.com/static/images/frames/hero/small/00014.png
        https://arvr.google.com/static/images/frames/hero/small/00016.png
        https://arvr.google.com/static/images/frames/hero/small/00018.png
        https://arvr.google.com/static/images/frames/hero/small/00020.png
        https://arvr.google.com/static/images/frames/hero/small/00022.png
        https://arvr.google.com/static/images/frames/hero/small/00024.png
        https://arvr.google.com/static/images/frames/hero/small/00026.png
        https://arvr.google.com/static/images/frames/hero/small/00028.png
        https://arvr.google.com/static/images/frames/hero/small/00030.png
        https://arvr.google.com/static/images/frames/hero/small/00032.png
        https://arvr.google.com/static/images/frames/hero/small/00034.png
        https://arvr.google.com/static/images/frames/hero/small/00036.png
        https://arvr.google.com/static/images/frames/hero/small/00038.png
        https://arvr.google.com/static/images/frames/hero/small/00040.png
        https://arvr.google.com/static/images/frames/hero/small/00042.png
        https://arvr.google.com/static/images/frames/hero/small/00044.png
        https://arvr.google.com/static/images/frames/hero/small/00046.png
        https://arvr.google.com/static/images/frames/hero/small/00048.png
        https://arvr.google.com/static/images/frames/hero/small/00050.png
        https://arvr.google.com/static/images/frames/hero/small/00052.png
        https://arvr.google.com/static/images/frames/hero/small/00054.png
        https://arvr.google.com/static/images/frames/hero/small/00056.png
        https://arvr.google.com/static/images/frames/hero/small/00058.png
        https://arvr.google.com/static/images/frames/hero/small/00060.png
        https://arvr.google.com/static/images/frames/hero/small/00062.png
        https://arvr.google.com/static/images/frames/hero/small/00064.png
        https://arvr.google.com/static/images/frames/hero/small/00066.png
        https://arvr.google.com/static/images/frames/hero/small/00068.png
        https://arvr.google.com/static/images/frames/hero/small/00070.png
        https://arvr.google.com/static/images/frames/hero/small/00072.png
        https://arvr.google.com/static/images/frames/hero/small/00074.png
        https://arvr.google.com/static/images/frames/hero/small/00076.png
        https://arvr.google.com/static/images/frames/hero/small/00078.png
        https://arvr.google.com/static/images/frames/hero/small/00080.png
        https://arvr.google.com/static/images/frames/hero/small/00082.png
        https://arvr.google.com/static/images/frames/hero/small/00084.png
        https://arvr.google.com/static/images/frames/hero/small/00086.png
        https://arvr.google.com/static/images/frames/hero/small/00088.png
        https://arvr.google.com/static/images/frames/hero/small/00090.png
        https://arvr.google.com/static/images/frames/hero/small/00092.png
        https://arvr.google.com/static/images/frames/hero/small/00094.png
        https://arvr.google.com/static/images/frames/hero/small/00096.png
        https://arvr.google.com/static/images/frames/hero/small/00098.png
        https://arvr.google.com/static/images/frames/hero/small/00100.png
        https://arvr.google.com/static/images/frames/hero/small/00102.png
        https://arvr.google.com/static/images/frames/hero/small/00104.png
        https://arvr.google.com/static/images/frames/hero/small/00106.png
        https://arvr.google.com/static/images/frames/hero/small/00108.png
        https://arvr.google.com/static/images/frames/hero/small/00110.png
        https://arvr.google.com/static/images/frames/hero/small/00112.png
        https://arvr.google.com/static/images/frames/hero/small/00114.png
        https://arvr.google.com/static/images/frames/hero/small/00116.png
        https://arvr.google.com/static/images/frames/hero/small/00118.png
        https://arvr.google.com/static/images/frames/hero/small/00120.png
        https://arvr.google.com/static/images/frames/hero/small/00122.png
        https://arvr.google.com/static/images/frames/hero/small/00124.png
        https://arvr.google.com/static/images/frames/hero/small/00126.png
        https://arvr.google.com/static/images/frames/hero/small/00128.png
        https://arvr.google.com/static/images/frames/hero/small/00130.png
        https://arvr.google.com/static/images/frames/hero/small/00132.png
        https://arvr.google.com/static/images/frames/hero/small/00134.png
        https://arvr.google.com/static/images/frames/hero/small/00136.png
        https://arvr.google.com/static/images/frames/hero/small/00138.png
        https://arvr.google.com/static/images/frames/hero/small/00140.png
        https://arvr.google.com/static/images/frames/hero/small/00142.png
        https://arvr.google.com/static/images/frames/hero/small/00144.png
        https://arvr.google.com/static/images/frames/hero/small/00146.png
        https://arvr.google.com/static/images/frames/hero/small/00148.png
        https://arvr.google.com/static/images/frames/hero/small/00150.png
        https://arvr.google.com/static/images/frames/hero/small/00152.png
        https://arvr.google.com/static/images/frames/hero/small/00154.png
        https://arvr.google.com/static/images/frames/hero/small/00156.png
        https://arvr.google.com/static/images/frames/hero/small/00158.png
        https://arvr.google.com/static/images/frames/hero/small/00160.png
        https://arvr.google.com/static/images/frames/hero/small/00162.png
        https://arvr.google.com/static/images/frames/hero/small/00164.png
        https://arvr.google.com/static/images/frames/hero/small/00166.png
        https://arvr.google.com/static/images/frames/hero/small/00168.png
        https://arvr.google.com/static/images/frames/hero/small/00170.png
        https://arvr.google.com/static/images/frames/hero/small/00172.png
        https://arvr.google.com/static/images/frames/hero/small/00174.png
        https://arvr.google.com/static/images/frames/hero/small/00176.png
        https://arvr.google.com/static/images/frames/hero/small/00178.png
        https://arvr.google.com/static/images/frames/hero/small/00180.png
        https://arvr.google.com/static/images/frames/hero/small/00182.png
        https://arvr.google.com/static/images/frames/hero/small/00184.png
        https://arvr.google.com/static/images/frames/hero/small/00186.png
        https://arvr.google.com/static/images/frames/hero/small/00188.png
        https://arvr.google.com/static/images/frames/hero/small/00190.png
        https://arvr.google.com/static/images/frames/hero/small/00192.png
        https://arvr.google.com/static/images/frames/hero/small/00194.png
        https://arvr.google.com/static/images/frames/hero/small/00196.png
        https://arvr.google.com/static/images/frames/hero/small/00198.png
        https://arvr.google.com/static/images/frames/hero/small/00200.png
        https://arvr.google.com/static/images/frames/hero/small/00202.png
        https://arvr.google.com/static/images/frames/hero/small/00204.png
        https://arvr.google.com/static/images/frames/hero/small/00206.png
        https://arvr.google.com/static/images/frames/hero/small/00208.png
        https://arvr.google.com/static/images/frames/hero/small/00210.png
        https://arvr.google.com/static/images/frames/hero/small/00212.png
        https://arvr.google.com/static/images/frames/hero/small/00214.png
        https://arvr.google.com/static/images/frames/hero/small/00216.png
        https://arvr.google.com/static/images/frames/hero/small/00218.png
        https://arvr.google.com/static/images/frames/hero/small/00220.png
        https://arvr.google.com/static/images/frames/hero/small/00222.png
        https://arvr.google.com/static/images/frames/hero/small/00224.png
        https://arvr.google.com/static/images/frames/hero/small/00226.png
        https://arvr.google.com/static/images/frames/hero/small/00228.png
        https://arvr.google.com/static/images/frames/hero/small/00230.png
        https://arvr.google.com/static/images/frames/hero/small/00232.png
        https://arvr.google.com/static/images/frames/hero/small/00234.png
        https://arvr.google.com/static/images/frames/hero/small/00236.png
        https://arvr.google.com/static/images/frames/hero/small/00238.png
        https://arvr.google.com/static/images/frames/hero/small/00240.png
        https://arvr.google.com/static/images/frames/hero/small/00242.png
        https://arvr.google.com/static/images/frames/hero/small/00244.png
        https://arvr.google.com/static/images/frames/hero/small/00246.png
        https://arvr.google.com/static/images/frames/hero/small/00248.png
        https://arvr.google.com/static/images/frames/hero/small/00250.png
        https://arvr.google.com/static/images/frames/hero/small/00252.png
        https://arvr.google.com/static/images/frames/hero/small/00254.png
        https://arvr.google.com/static/images/frames/hero/small/00256.png
        https://arvr.google.com/static/images/frames/hero/small/00258.png
        https://arvr.google.com/static/images/frames/hero/small/00260.png
        https://arvr.google.com/static/images/frames/hero/small/00262.png
        https://arvr.google.com/static/images/frames/hero/small/00264.png
        https://arvr.google.com/static/images/frames/hero/small/00266.png
        https://arvr.google.com/static/images/frames/hero/small/00268.png
https://arvr.google.com/static/images/frames/hero/small/00270.png
https://arvr.google.com/static/images/frames/hero/small/00272.png
https://arvr.google.com/static/images/frames/hero/small/00274.png
https://arvr.google.com/static/images/frames/hero/small/00276.png
https://arvr.google.com/static/images/frames/hero/small/00278.png
https://arvr.google.com/static/images/frames/hero/small/00280.png
https://arvr.google.com/static/images/frames/hero/small/00282.png
https://arvr.google.com/static/images/frames/hero/small/00284.png
https://arvr.google.com/static/images/frames/hero/small/00286.png
https://arvr.google.com/static/images/frames/hero/small/00288.png
https://arvr.google.com/static/images/frames/hero/small/00290.png
https://arvr.google.com/static/images/frames/hero/small/00292.png
https://arvr.google.com/static/images/frames/hero/small/00294.png
https://arvr.google.com/static/images/frames/hero/small/00296.png
https://arvr.google.com/static/images/frames/hero/small/00298.png
https://arvr.google.com/static/images/frames/hero/small/00300.png
https://arvr.google.com/static/images/frames/hero/small/00302.png
https://arvr.google.com/static/images/frames/hero/small/00304.png
https://arvr.google.com/static/images/frames/hero/small/00306.png
https://arvr.google.com/static/images/frames/hero/small/00308.png
https://arvr.google.com/static/images/frames/hero/small/00310.png
https://arvr.google.com/static/images/frames/hero/small/00312.png
https://arvr.google.com/static/images/frames/hero/small/00314.png
https://arvr.google.com/static/images/frames/hero/small/00316.png
https://arvr.google.com/static/images/frames/hero/small/00318.png
https://arvr.google.com/static/images/frames/hero/small/00320.png
https://arvr.google.com/static/images/frames/hero/small/00322.png
https://arvr.google.com/static/images/frames/hero/small/00324.png
https://arvr.google.com/static/images/frames/hero/small/00326.png
https://arvr.google.com/static/images/frames/hero/small/00328.png
https://arvr.google.com/static/images/frames/hero/small/00330.png
https://arvr.google.com/static/images/frames/hero/small/00332.png
https://arvr.google.com/static/images/frames/hero/small/00334.png
https://arvr.google.com/static/images/frames/hero/small/00336.png
https://arvr.google.com/static/images/frames/hero/small/00338.png
https://arvr.google.com/static/images/frames/hero/small/00340.png
https://arvr.google.com/static/images/frames/hero/small/00342.png
https://arvr.google.com/static/images/frames/hero/small/00344.png
https://arvr.google.com/static/images/frames/hero/small/00346.png
https://arvr.google.com/static/images/frames/hero/small/00348.png
https://arvr.google.com/static/images/frames/hero/small/00350.png
https://arvr.google.com/static/images/frames/hero/small/00352.png
https://arvr.google.com/static/images/frames/hero/small/00354.png
https://arvr.google.com/static/images/frames/hero/small/00356.png
https://arvr.google.com/static/images/frames/hero/small/00358.png
https://arvr.google.com/static/images/frames/hero/small/00360.png
https://arvr.google.com/static/images/frames/hero/small/00362.png
https://arvr.google.com/static/images/frames/hero/small/00364.png
https://arvr.google.com/static/images/frames/hero/small/00366.png
https://arvr.google.com/static/images/frames/hero/small/00368.png
https://arvr.google.com/static/images/frames/hero/small/00370.png
https://arvr.google.com/static/images/frames/hero/small/00372.png
https://arvr.google.com/static/images/frames/hero/small/00374.png
https://arvr.google.com/static/images/frames/hero/small/00376.png
https://arvr.google.com/static/images/frames/hero/small/00378.png
https://arvr.google.com/static/images/frames/hero/small/00380.png
https://arvr.google.com/static/images/frames/hero/small/00382.png
https://arvr.google.com/static/images/frames/hero/small/00384.png
https://arvr.google.com/static/images/frames/hero/small/00386.png
https://arvr.google.com/static/images/frames/hero/small/00388.png
https://arvr.google.com/static/images/frames/hero/small/00390.png
https://arvr.google.com/static/images/frames/hero/small/00392.png
https://arvr.google.com/static/images/frames/hero/small/00394.png
https://arvr.google.com/static/images/frames/hero/small/00396.png
https://arvr.google.com/static/images/frames/hero/small/00398.png
https://arvr.google.com/static/images/frames/hero/small/00400.png
https://arvr.google.com/static/images/frames/hero/small/00402.png
https://arvr.google.com/static/images/frames/hero/small/00404.png
https://arvr.google.com/static/images/frames/hero/small/00406.png
https://arvr.google.com/static/images/frames/hero/small/00408.png
https://arvr.google.com/static/images/frames/hero/small/00410.png
https://arvr.google.com/static/images/frames/hero/small/00412.png
https://arvr.google.com/static/images/frames/hero/small/00414.png
https://arvr.google.com/static/images/frames/hero/small/00416.png
https://arvr.google.com/static/images/frames/hero/small/00418.png
https://arvr.google.com/static/images/frames/hero/small/00420.png
https://arvr.google.com/static/images/frames/hero/small/00422.png
https://arvr.google.com/static/images/frames/hero/small/00424.png
https://arvr.google.com/static/images/frames/hero/small/00426.png
https://arvr.google.com/static/images/frames/hero/small/00428.png
https://arvr.google.com/static/images/frames/hero/small/00430.png
https://arvr.google.com/static/images/frames/hero/small/00432.png
https://arvr.google.com/static/images/frames/hero/small/00434.png
https://arvr.google.com/static/images/frames/hero/small/00436.png
https://arvr.google.com/static/images/frames/hero/small/00438.png
https://arvr.google.com/static/images/frames/hero/small/00440.png
https://arvr.google.com/static/images/frames/hero/small/00442.png
https://arvr.google.com/static/images/frames/hero/small/00444.png
https://arvr.google.com/static/images/frames/hero/small/00446.png
https://arvr.google.com/static/images/frames/hero/small/00448.png
https://arvr.google.com/static/images/frames/hero/small/00450.png
https://arvr.google.com/static/images/frames/hero/small/00452.png
https://arvr.google.com/static/images/frames/hero/small/00454.png
https://arvr.google.com/static/images/frames/hero/small/00456.png
https://arvr.google.com/static/images/frames/hero/small/00458.png
https://arvr.google.com/static/images/frames/hero/small/00460.png
https://arvr.google.com/static/images/frames/hero/small/00462.png
https://arvr.google.com/static/images/frames/hero/small/00464.png
https://arvr.google.com/static/images/frames/hero/small/00466.png
    `;
        return data.split("\n")[index];
    }

    const frameCount = 200;

    const images = [];
    const imageSeq = {
        frame: 0
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            // markers: true,
            scrub: 1,
            trigger: "#home2",
            start: "top 0%",
            ease: "none"
        },
        onUpdate: render
    });

    images[0].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

    const video = document.querySelector("#video video");

    // Set initial video scale
    gsap.set(video, { scale: 0.2 });

    // Scroll-triggered animation for video scaling
    gsap.to(video, {
        scale: 1,
        scrollTrigger: {
            scrub: 0.4,
            trigger: "#home2",
            start: "bottom 10%",
            end: "bottom 120%",
            ease: "none"
        },
    });

    // Scroll-triggered animation for video positioning
    gsap.to(video, {
        yPercent: -30,
        scrollTrigger: {
            scrub: 0.4,
            trigger: "#home2",
            start: "bottom 10%",
            end: "bottom 120%",
            ease: "none"
        },
    });

    // Scroll-triggered animation for page two scaling
    gsap.to("#home2 canvas", {
        scale: 0.4,
        scrollTrigger: {
            scrub: 0.4,
            trigger: "#home2",
            start: "bottom 2%",
            // markers: true,
            end: "bottom 30%",
            ease: "none"
        },
    });

    gsap.to("#home2 canvas", {
        display: "none",
        scrollTrigger: {
            scrub: 1,
            // markers: true,
            trigger: "#home2",
            start: "top 60%",
            end: "bottom 12%",
            ease: "none",
            onToggle: (self) => {
                if (self.isActive) {
                    // Hide canvas when transitioning to video
                    canvas.style.display = "none";
                } else {
                    // Show canvas when transitioning back from video
                    canvas.style.display = "";
                }
            },
        },
    });
    ScrollTrigger.create({
        trigger: "#home2",
        pin: true,
        start: "bottom 100%",
    });
}
dom2()

function shrinkVideoOnScroll() {
    const video = document.querySelector("#video video");

    const getScale = () => {
        return window.innerWidth >= 768 ? 0.3 : 0.4; // Adjust the threshold as needed
    };

    // Initial setup
    gsap.set(video, { scale: 1 });

    // Scroll-triggered animation for video scaling
    gsap.to(video, {
        scale: getScale(),
        scrollTrigger: {
            scrub: 0.4,
            // markers: true,
            trigger: "#page3",
            start: "top 10%",
            end: "bottom 20%",
            ease: "none",
            pin: true,
        },
    });
}
shrinkVideoOnScroll();

function setupPage3Animations() {
    const leftImages = ["#image1", "#image2"];
    const rightImages = ["#image3", "#image4"];

    gsap.set([leftImages, rightImages], { scale: 0.2, transformOrigin: "center center" });


    // Scroll-triggered animation for zooming and rotating left images
    gsap.to(leftImages, {
        scale: 1,
        rotation: 360,
        x: "-50%", // Left images
        y: "-50%",
        scrollTrigger: {
            scrub: 0.4,
            trigger: "#page3",
            start: "top 40%",
            end: "bottom 20%",
            ease: "none",
        },
    });

    // Scroll-triggered animation for zooming and rotating right images
    gsap.to(rightImages, {
        scale: 1,
        rotation: -360,
        x: "50%", // Right images
        y: "-50%",
        scrollTrigger: {
            scrub: 0.4,
            trigger: "#page3",
            start: "top 40%",
            end: "bottom 20%",
            ease: "none",
        },
    });
}

setupPage3Animations();

// const horizontalSection = gsap.utils.toArray(".containers section");
// const mask = document.querySelector(".mask");

// let scrollTween = gsap.to(horizontalSection, {
//   xPercent: -100 * (horizontalSection.length - 1),
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".container",
//     pin: true,
//     scrub: 1,
//     end: "+=3000",
//     //snap: 1 / (horizontalSection.length - 1),
//     markers: true
//   }
// });

// console.log(1 / (horizontalSection.length - 1));

// //Progress bar animation

// gsap.to(mask, {
//   width: "100%",
//   scrollTrigger: {
//     trigger: ".wrapper",
//     start: "top left",
//     scrub: 1
//   }
// });

// // whizz around the sections
// horizontalSection.forEach((section) => {
//   // grab the scoped text
//   let text = section.querySelectorAll(".anim");

//   // bump out if there's no items to animate
//   if (text.length === 0) return;

//   // do a little stagger
//   gsap.from(text, {
//     y: -130,
//     opacity: 0,
//     duration: 2,
//     ease: "elastic",
//     stagger: 0.1,
//     scrollTrigger: {
//       trigger: section,
//       containerAnimation: scrollTween,
//       start: "left center",
//       markers: true
//     }
//   });
// });

