document.addEventListener('DOMContentLoaded', function() {
	function createProjectCard(project) {
		const card = document.createElement('article');
		card.className = 'project-card';
		card.setAttribute('data-aos', 'fade-up');
		card.setAttribute('data-project-id', project.id);
		
		const imagesHtml = project.details.images.map(img => 
			`<div class="project-carousel__slide">
				<img src="${img.src}" alt="" loading="lazy" class="carousel-image">
				<div class="carousel-caption">${img.caption}</div>
			</div>`
		).join('');
		
		card.innerHTML = `
			<div class="project-card__media">
				<img src="${project.mainImage}" alt="${project.title}" class="project-card__image" loading="lazy">
			</div>
			<div class="project-card__content">
				<h4 class="project-card__title">${project.title}</h4>
				<p class="project-card__description">${project.shortDesc}</p>
				<button type="button" class="project-card__btn" data-project-id="${project.id}">
					<span class="btn-text">Подробнее</span>
					<svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
			</div>
			<div class="project-card__details" id="project-details-${project.id}" hidden>
				<div class="details__inner">
					<h5 class="details__title">Описание работ</h5>
					<p class="details__text">${project.details.fullDesc}</p>
					
					<div class="project-carousel" data-carousel="${project.id}">
						<div class="project-carousel__track">
							${imagesHtml}
						</div>
						<button class="project-carousel__btn project-carousel__btn--prev" aria-label="Предыдущее фото">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
								<polyline points="15 18 9 12 15 6"></polyline>
							</svg>
						</button>
						<button class="project-carousel__btn project-carousel__btn--next" aria-label="Следующее фото">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
								<polyline points="9 18 15 12 9 6"></polyline>
							</svg>
						</button>
						<div class="project-carousel__dots"></div>
					</div>
					
					<div class="details__meta">
						<span class="meta-item">📍 ${project.details.location}</span>
						<span class="meta-item">📏 Площадь: ${project.details.area}</span>
						<span class="meta-item">⏱ Срок: ${project.details.time}</span>
					</div>
				</div>
			</div>
		`;
		
		return card;
	}

	const projectsByCategory = {
		standard: projectsData.filter(p => p.category === 'standard'),
		econom: projectsData.filter(p => p.category === 'econom'),
		finish: projectsData.filter(p => p.category === 'finish'),
		hard: projectsData.filter(p => p.category === 'hard')
	};

	for (const [category, projects] of Object.entries(projectsByCategory)) {
		const container = document.querySelector(`#${category} .portfolio-grid`);
		if (!container) continue;
		
		projects.forEach(project => {
			const card = createProjectCard(project);
			container.appendChild(card);
		});
	}

	if (typeof initCarousels === 'function') {
		setTimeout(initCarousels, 100);
	}
});