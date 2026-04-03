document.addEventListener('DOMContentLoaded', function() {
	setTimeout(function() {
		document.querySelectorAll('.project-card').forEach(function(card) {
			const btn = card.querySelector('.project-card__btn');
			const details = card.querySelector('.project-card__details');
			if (!btn || !details) return;

			btn.addEventListener('click', function(e) {
				e.preventDefault();
				if (details.hidden) {
					details.hidden = false;
					btn.querySelector('.btn-text').textContent = 'Скрыть';
				} else {
					details.hidden = true;
					btn.querySelector('.btn-text').textContent = 'Подробнее';
				}
			});

			const carousel = card.querySelector('.project-carousel');
			if (!carousel) return;

			const track = carousel.querySelector('.project-carousel__track');
			const slides = carousel.querySelectorAll('.project-carousel__slide');
			const prevBtn = carousel.querySelector('.project-carousel__btn--prev');
			const nextBtn = carousel.querySelector('.project-carousel__btn--next');
			const dotsContainer = carousel.querySelector('.project-carousel__dots');

			if (!track || slides.length === 0) return;

			let currentIndex = 0;

			function updateDots() {
				dotsContainer.innerHTML = '';
				slides.forEach(function(_, i) {
					const dot = document.createElement('button');
					dot.className = 'carousel-dot';
					if (i === currentIndex) dot.classList.add('is-active');
					dot.addEventListener('click', function() {
						goToSlide(i);
					});
					dotsContainer.appendChild(dot);
				});
			}

			function goToSlide(index) {
				if (index < 0) index = slides.length - 1;
				if (index >= slides.length) index = 0;
				currentIndex = index;
				track.style.transform = `translateX(-${currentIndex * 100}%)`;
				updateDots();
			}

			if (prevBtn) {
				prevBtn.addEventListener('click', function(e) {
					e.preventDefault();
					goToSlide(currentIndex - 1);
				});
			}

			if (nextBtn) {
				nextBtn.addEventListener('click', function(e) {
					e.preventDefault();
					goToSlide(currentIndex + 1);
				});
			}

			goToSlide(0);
		});
	}, 300);
});