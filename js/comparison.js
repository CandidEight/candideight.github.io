document.addEventListener('DOMContentLoaded', function() {
	const comparisonRows = document.querySelectorAll('.comparison-table__row:not(.comparison-table__header)');
	const comparisonTable = document.querySelector('.comparison-table');
	
	if (!comparisonRows.length || !comparisonTable) return;
	
	function isMobile() {
		return window.innerWidth <= 768;
	}
	
	const toggleAllBtn = document.createElement('button');
	toggleAllBtn.className = 'comparison-toggle-all';
	toggleAllBtn.innerHTML = '<span>Показать все параметры</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"/></svg>';
	
	const headerRow = document.querySelector('.comparison-table__header');
	if (headerRow) {
		headerRow.appendChild(toggleAllBtn);
	}
	
	let allExpanded = false;
	
	function toggleAllRows() {
		allExpanded = !allExpanded;
		
		comparisonRows.forEach(row => {
			if (allExpanded) {
				row.classList.add('active');
			} else {
				row.classList.remove('active');
			}
		});
		
		toggleAllBtn.innerHTML = allExpanded 
			? '<span>Скрыть параметры</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="2"/></svg>'
			: '<span>Показать все параметры</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"/></svg>';
	}
	
	toggleAllBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		toggleAllRows();
	});
	
	comparisonRows.forEach(row => {
		const param = row.querySelector('.comparison-table__parameter');
		if (param) {
			param.style.cursor = 'pointer';
			
			param.addEventListener('click', function() {
				if (!isMobile()) return;
				row.classList.toggle('active');
			});
		}
	});
	
	let resizeTimer;
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			if (!isMobile()) {
				comparisonRows.forEach(row => {
					row.classList.add('active');
				});
				toggleAllBtn.style.display = 'none';
			} else {
				comparisonRows.forEach(row => {
					row.classList.remove('active');
				});
				toggleAllBtn.style.display = 'flex';
				allExpanded = false;
				toggleAllBtn.innerHTML = '<span>Показать все параметры</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"/></svg>';
			}
		}, 100);
	});
	
	if (!isMobile()) {
		comparisonRows.forEach(row => {
			row.classList.add('active');
		});
		toggleAllBtn.style.display = 'none';
	}
});