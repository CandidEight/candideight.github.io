document.addEventListener('DOMContentLoaded', function() {
	const viewBtns = document.querySelectorAll('.view-btn');
	const productsGrid = document.querySelector('.products-grid');
	
	if (!viewBtns.length || !productsGrid) return;
	
	viewBtns.forEach(btn => {
		btn.addEventListener('click', function() {
			viewBtns.forEach(b => b.classList.remove('active'));
			this.classList.add('active');
			
			const view = this.dataset.view;
			if (view === 'grid') {
				productsGrid.classList.remove('list-view');
			} else {
				productsGrid.classList.add('list-view');
			}
		});
	});
});