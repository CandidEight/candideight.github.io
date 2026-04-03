document.addEventListener('DOMContentLoaded', function() {
	const categoryLinks = document.querySelectorAll('.portfolio-nav__link');
	const categories = document.querySelectorAll('.portfolio-category');

	function showCategory(categoryId) {
		categories.forEach(cat => cat.classList.remove('is-active'));
		const activeCategory = document.getElementById(categoryId);
		if (activeCategory) activeCategory.classList.add('is-active');

		categoryLinks.forEach(link => link.classList.remove('is-active'));
		const activeLink = document.querySelector(`.portfolio-nav__link[data-category="${categoryId}"]`);
		if (activeLink) activeLink.classList.add('is-active');
	}

	categoryLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const categoryId = this.getAttribute('data-category');
			showCategory(categoryId);
			history.pushState(null, '', `#${categoryId}`);
		});
	});

	const hash = window.location.hash.substring(1);
	if (hash && document.getElementById(hash)) {
		showCategory(hash);
	}
});