document.addEventListener('DOMContentLoaded', function() {
	const filterBtns = document.querySelectorAll('.filter-btn');
	const galleryItems = document.querySelectorAll('.gallery-item');
	const modal = document.getElementById('galleryModal');
	const modalImage = document.getElementById('modalImage');
	const closeBtn = document.querySelector('.gallery-modal__close');
	const prevBtn = document.querySelector('.gallery-modal__prev');
	const nextBtn = document.querySelector('.gallery-modal__next');
	
	let currentIndex = 0;
	let currentImages = [];
	
	function showCategory(category) {
		galleryItems.forEach(item => {
			if (item.dataset.category === category) {
				item.style.display = 'block';
			} else {
				item.style.display = 'none';
			}
		});
	}
	
	// При загрузке показываем только ОБЪЕКТЫ
	showCategory('object');
	
	filterBtns.forEach(btn => {
		btn.addEventListener('click', function() {
			filterBtns.forEach(b => b.classList.remove('active'));
			this.classList.add('active');
			
			const category = this.dataset.filter;
			showCategory(category);
		});
	});
	
	function getVisibleItems() {
		return Array.from(galleryItems).filter(item => {
			return item.style.display === 'block';
		});
	}
	
	function openModal(index) {
		const visibleItems = getVisibleItems();
		const images = visibleItems.map(item => item.querySelector('img').src);
		
		if (images.length === 0) return;
		
		currentImages = images;
		currentIndex = index;
		modalImage.src = currentImages[currentIndex];
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
	
	function closeModal() {
		modal.classList.remove('active');
		document.body.style.overflow = '';
	}
	
	function nextImage() {
		if (currentImages.length === 0) return;
		currentIndex = (currentIndex + 1) % currentImages.length;
		modalImage.src = currentImages[currentIndex];
	}
	
	function prevImage() {
		if (currentImages.length === 0) return;
		currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
		modalImage.src = currentImages[currentIndex];
	}
	
	galleryItems.forEach(item => {
		item.addEventListener('click', function() {
			const visibleItems = getVisibleItems();
			const itemIndex = visibleItems.indexOf(this);
			if (itemIndex !== -1) openModal(itemIndex);
		});
	});
	
	if (closeBtn) closeBtn.addEventListener('click', closeModal);
	if (prevBtn) prevBtn.addEventListener('click', prevImage);
	if (nextBtn) nextBtn.addEventListener('click', nextImage);
	
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal();
	});
	
	document.addEventListener('keydown', (e) => {
		if (!modal.classList.contains('active')) return;
		
		if (e.key === 'Escape') closeModal();
		if (e.key === 'ArrowLeft') prevImage();
		if (e.key === 'ArrowRight') nextImage();
	});
});