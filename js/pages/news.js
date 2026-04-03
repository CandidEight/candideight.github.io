console.log('news.js загружен!');

function loadNews() {
	console.log('loadNews() вызвана');
	
	const newsContainer = document.getElementById('news-container');
	console.log('News container:', newsContainer);

	if (!newsContainer) {
		console.log('News container не найден');
		return;
	}

	const currentPath = window.location.pathname;
	console.log('Current path:', currentPath);
	
	if (currentPath.includes('materials') || currentPath.includes('services')) {
		console.log('Загружаем новости...');
		
		fetch('/skoropol/templates/news.html')
			.then(response => {
				console.log('Ответ от сервера:', response);
				console.log('Статус:', response.status);
				console.log('OK?', response.ok);
				
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.text();
			})
			.then(html => {
				console.log('HTML загружен, длина:', html.length);
				console.log('Первые 100 символов:', html.substring(0, 100));
				
				newsContainer.innerHTML = html;
				console.log('HTML вставлен в контейнер');
				
				// ПОКАЗЫВАЕМ БЛОК
				const headerNews = document.querySelector('.header-news');
				if (headerNews) {
					headerNews.classList.add('show');
					console.log('Добавлен класс show');
				}
				
				const newsBlock = document.querySelector('.news-block');
				console.log('News block найден:', newsBlock);
				
				if (newsBlock) {
					if (currentPath.includes('materials')) {
						newsBlock.classList.add('materials-news');
						console.log('Добавлен класс materials-news');
					} else if (currentPath.includes('services')) {
						newsBlock.classList.add('services-news');
						console.log('Добавлен класс services-news');
					}
				}
				
				setTimeout(() => {
					console.log('Инициализация слайдера...');
					const track = document.getElementById('newsSliderTrack');
					const dots = document.querySelectorAll('#newsSliderDots .dot');
					
					console.log('Track найден:', track);
					console.log('Dots найдено:', dots.length);
					
					if (track && dots.length > 0) {
						let currentSlide = 0;
						const slides = track.children.length;
						console.log('Количество слайдов:', slides);
						
						function updateSlider(index) {
							if (index < 0) index = slides - 1;
							if (index >= slides) index = 0;
							
							track.style.transform = `translateX(-${index * 100}%)`;
							
							dots.forEach((dot, i) => {
								dot.classList.toggle('active', i === index);
							});
							
							currentSlide = index;
						}
						
						setInterval(() => {
							updateSlider(currentSlide + 1);
						}, 10000);
						
						dots.forEach((dot, index) => {
							dot.addEventListener('click', (e) => {
								e.stopPropagation();
								updateSlider(index);
							});
						});
						
						console.log('Слайдер инициализирован');
					}
				}, 100);
			})
			.catch(error => {
				console.error('Ошибка загрузки новостей:', error);
			});
	} else {
		console.log('Новости не нужны на этой странице');
	}
}

console.log('Регистрируем загрузку новостей');
if (document.readyState === 'loading') {
	console.log('Документ еще грузится, добавляем обработчик DOMContentLoaded');
	document.addEventListener('DOMContentLoaded', loadNews);
} else {
	console.log('Документ уже загружен, вызываем loadNews()');
	loadNews();
}