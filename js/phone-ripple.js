function initPhoneRipple() {
	const phoneIcon = document.querySelector('.contact-icon--phone');
	const rippleCircles = document.querySelectorAll('.ripple-circle');

	if (!phoneIcon || rippleCircles.length === 0) return false;

	let isAnimating = false;
	let rafId = null;
	let isHovered = false;

	function startAnimationsSmoothly() {
		if (isAnimating) return;
		
		isAnimating = true;
		let startTime = null;
		
		function animateStep(timestamp) {
			if (!startTime) startTime = timestamp;
			const progress = timestamp - startTime;
			
			rippleCircles.forEach((circle, index) => {
				if (progress > index * 200) {
					circle.style.animationPlayState = 'running';
					circle.style.opacity = '0.8';
				}
			});
			
			if (progress >= rippleCircles.length * 200) {
				isAnimating = false;
				cancelAnimationFrame(rafId);
			} else {
				rafId = requestAnimationFrame(animateStep);
			}
		}
		
		rafId = requestAnimationFrame(animateStep);
	}

	function handleHover(isEnter) {
		isHovered = isEnter;
		
		let startTime = null;
		const targetOpacity = isEnter ? 0.2 : 0.8;
		
		function fadeStep(timestamp) {
			if (!startTime) startTime = timestamp;
			const progress = timestamp - startTime;
			const duration = 150;
			
			if (progress < duration) {
				const ratio = progress / duration;
				const currentOpacity = isEnter 
					? 0.8 - (0.6 * ratio) 
					: 0.2 + (0.6 * ratio);
				
				rippleCircles.forEach(circle => {
					if (!isHovered !== isEnter) return;
					circle.style.opacity = currentOpacity.toString();
				});
				
				requestAnimationFrame(fadeStep);
			} else {
				rippleCircles.forEach(circle => {
					circle.style.opacity = targetOpacity.toString();
				});
			}
		}
		
		requestAnimationFrame(fadeStep);
	}

	phoneIcon.addEventListener('mouseenter', function() {
		handleHover(true);
	});

	phoneIcon.addEventListener('mouseleave', function() {
		handleHover(false);
	});

	setTimeout(() => {
		startAnimationsSmoothly();
	}, 300);

	let resizeTimeout;
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			const wasHovered = isHovered;
			
			rippleCircles.forEach(circle => {
				circle.style.animationPlayState = 'paused';
			});
			
			requestAnimationFrame(() => {
				rippleCircles.forEach(circle => {
					const animation = circle.style.animation;
					circle.style.animation = 'none';
					
					requestAnimationFrame(() => {
						circle.style.animation = animation;
						circle.style.animationPlayState = 'running';
						
						if (wasHovered) {
							circle.style.opacity = '0.2';
						}
					});
				});
			});
		}, 100);
	});

	return true;
}

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(() => {
		if (!initPhoneRipple()) {
			const checkInterval = setInterval(() => {
				if (initPhoneRipple()) {
					clearInterval(checkInterval);
				}
			}, 100);
		}
	}, 100);
});

window.phoneRippleInit = initPhoneRipple;

document.addEventListener('footerLoaded', function() {
	initPhoneRipple();
});