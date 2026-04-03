function loadTemplates() {
	console.log('Загрузка шаблонов...');
	
	const headerContainer = document.getElementById('header-container');
	if (headerContainer) {
		fetch('/skoropol/templates/header.html')
			.then(response => response.text())
			.then(html => {
				headerContainer.innerHTML = html;
				
				setTimeout(() => {
					const burger = document.getElementById('burgerBtn');
					const nav = document.getElementById('navContainer');
					
					if (burger && nav) {
						burger.onclick = function(e) {
							e.preventDefault();
							this.classList.toggle('active');
							nav.classList.toggle('active');
							document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
						};
						
						document.querySelectorAll('.nav__link, .mobile-contacts .phone-link').forEach(link => {
							link.onclick = function(e) {
								e.preventDefault();
								burger.classList.remove('active');
								nav.classList.remove('active');
								document.body.style.overflow = '';
								if (this.href && !this.href.startsWith('#')) {
									window.location.href = this.href;
								}
							};
						});
						
						document.onkeydown = function(e) {
							if (e.key === 'Escape' && nav.classList.contains('active')) {
								burger.classList.remove('active');
								nav.classList.remove('active');
								document.body.style.overflow = '';
							}
						};
					}
					
					const menuItems = document.querySelectorAll('.nav__item');
					const highlight = document.querySelector('.nav__highlight');
					
					if (menuItems.length > 0 && highlight) {
						function moveHighlight(element) {
							const itemRect = element.getBoundingClientRect();
							const navRect = element.closest('.nav__list').getBoundingClientRect();
							const left = itemRect.left - navRect.left;
							const width = itemRect.width;

							highlight.style.left = `${left}px`;
							highlight.style.width = `${width}px`;
							highlight.style.opacity = '1';
						}

						menuItems.forEach(item => {
							item.onmouseenter = () => moveHighlight(item);
							item.onmouseleave = () => {
								highlight.style.opacity = '0';
								highlight.style.width = '0';
							};
						});

						moveHighlight(menuItems[0]);
						setTimeout(() => highlight.style.opacity = '0', 1000);
					}
					
					const currentPath = window.location.pathname;
					const homeMenuItem = document.querySelector('.nav__item--home');
					
					if (homeMenuItem) {
						if (currentPath === '/' || currentPath === '/index.html') {
							homeMenuItem.style.display = 'none';
						} else {
							homeMenuItem.style.display = 'block';
						}
					}
					
					document.querySelectorAll('.nav__item--has-dropdown').forEach(item => {
						const btn = item.querySelector('.nav__dropdown-arrow');
						if (btn) {
							btn.onclick = function(e) {
								e.preventDefault();
								e.stopPropagation();
								if (window.innerWidth <= 768) {
									item.classList.toggle('open');
								}
							};
						}
					});
					
					let lastScrollTop = 0;
					const header = document.querySelector('.header');
					const scrollThreshold = 50;

					window.addEventListener('scroll', function() {
						if (!header) return;
						
						const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						
						if (scrollTop > scrollThreshold) {
							header.classList.add('header--scrolled');
						} else {
							header.classList.remove('header--scrolled');
						}
						
						if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
							header.classList.add('header--hidden');
						} else {
							header.classList.remove('header--hidden');
						}
						
						lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
					});
					
					if (window.initPopup) setTimeout(window.initPopup, 50);
					if (window.initSlider) setTimeout(window.initSlider, 100);
					if (window.initAccordion) setTimeout(window.initAccordion, 100);
					if (window.initComparison) setTimeout(window.initComparison, 100);
					
				}, 50);
			})
			.catch(error => console.error('Ошибка загрузки хедера:', error));
	}
	
	const footerContainer = document.getElementById('footer-container');
	if (footerContainer) {
		fetch('/skoropol/templates/footer.html')
			.then(response => response.text())
			.then(html => {
				footerContainer.innerHTML = html;
				
				setTimeout(() => {
					const yearElement = document.getElementById('currentYear');
					if (yearElement) yearElement.textContent = new Date().getFullYear();
					if (window.initPhoneRipple) window.initPhoneRipple();
				}, 50);
			})
			.catch(error => console.error('Ошибка загрузки футера:', error));
	}
}

document.addEventListener('DOMContentLoaded', loadTemplates);