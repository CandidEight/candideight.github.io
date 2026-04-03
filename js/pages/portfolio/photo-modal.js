document.addEventListener('DOMContentLoaded', function() {
	const modal = document.getElementById('photoModal');
	const modalImg = modal.querySelector('.photo-modal__image');
	const modalCaption = modal.querySelector('.photo-modal__caption');
	const closeBtn = modal.querySelector('.photo-modal__close');
	const overlay = modal.querySelector('.photo-modal__overlay');
	const prevBtn = modal.querySelector('.photo-modal__nav--prev');
	const nextBtn = modal.querySelector('.photo-modal__nav--next');

	let currentImages = [];
	let currentCaptions = [];
	let currentIndex = 0;

	function openModal(index, images, captions) {
		currentImages = images;
		currentCaptions = captions;
		currentIndex = index;
		modalImg.src = currentImages[currentIndex];
		modalCaption.textContent = currentCaptions[currentIndex];
		modal.classList.add('is-visible');
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		modal.classList.remove('is-visible');
		document.body.style.overflow = '';
		currentImages = [];
		currentCaptions = [];
	}

	function navigate(direction) {
		if (!currentImages.length) return;
		currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
		modalImg.src = currentImages[currentIndex];
		modalCaption.textContent = currentCaptions[currentIndex];
	}

	document.querySelectorAll('.carousel-image').forEach(img => {
		img.addEventListener('click', function() {
			const carousel = this.closest('.project-carousel');
			if (!carousel) return;

			const slides = carousel.querySelectorAll('.carousel-image');
			const captions = carousel.querySelectorAll('.carousel-caption');
			const images = Array.from(slides).map(slide => slide.src);
			const captionsText = Array.from(captions).map(cap => cap.textContent);
			const index = Array.from(slides).indexOf(this);

			openModal(index, images, captionsText);
		});
	});

	if (closeBtn) closeBtn.addEventListener('click', closeModal);
	if (overlay) overlay.addEventListener('click', closeModal);
	if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
	if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

	document.addEventListener('keydown', function(e) {
		if (!modal.classList.contains('is-visible')) return;
		if (e.key === 'Escape') closeModal();
		if (e.key === 'ArrowLeft') navigate(-1);
		if (e.key === 'ArrowRight') navigate(1);
	});
});