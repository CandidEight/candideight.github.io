window.initSlider = function() {
	const sliderContainer = document.querySelector('.slider-container');
	if (!sliderContainer) return;
	
	const track = sliderContainer.querySelector('.slider-track');
	const slides = sliderContainer.querySelectorAll('.slider-slide');
	const prevBtn = sliderContainer.querySelector('.slider-prev');
	const nextBtn = sliderContainer.querySelector('.slider-next');
	const dots = sliderContainer.querySelectorAll('.slider-dot');
	
	if (!track || !slides.length) return;
	
	let currentIndex = 0;
	
	function updateSlider(index) {
		if (index < 0) index = slides.length - 1;
		if (index >= slides.length) index = 0;
		
		track.style.transform = `translateX(-${index * 100}%)`;
		
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index);
		});
		
		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === index);
		});
		
		currentIndex = index;
	}
	
	if (prevBtn) {
		prevBtn.onclick = function(e) {
			e.preventDefault();
			updateSlider(currentIndex - 1);
		};
	}
	
	if (nextBtn) {
		nextBtn.onclick = function(e) {
			e.preventDefault();
			updateSlider(currentIndex + 1);
		};
	}
	
	dots.forEach((dot, index) => {
		dot.onclick = function(e) {
			e.preventDefault();
			updateSlider(index);
		};
	});
	
	updateSlider(0);
};