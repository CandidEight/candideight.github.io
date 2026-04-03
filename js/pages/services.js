document.addEventListener('DOMContentLoaded', function() {
	const categoryItems = document.querySelectorAll('.category-item');
	const categoryContents = document.querySelectorAll('.category-content');
	
	if (categoryItems.length) {
		categoryItems.forEach(item => {
			item.addEventListener('click', function() {
				categoryItems.forEach(cat => cat.classList.remove('active'));
				this.classList.add('active');
				
				const categoryId = this.dataset.category;
				
				categoryContents.forEach(content => content.classList.remove('active'));
				document.getElementById(categoryId).classList.add('active');
				
				const mobileDropdownItems = document.querySelectorAll('.dropdown-item');
				if (mobileDropdownItems.length) {
					mobileDropdownItems.forEach(item => {
						if (item.dataset.category === categoryId) {
							item.classList.add('active');
							const selectedSpan = document.querySelector('.selected-category span');
							if (selectedSpan) {
								selectedSpan.textContent = item.querySelector('span').textContent;
							}
						} else {
							item.classList.remove('active');
						}
					});
				}
			});
		});
	}
	
	const mobileSelector = document.querySelector('.mobile-category-selector');
	if (mobileSelector) {
		const selectedBtn = mobileSelector.querySelector('.selected-category');
		const dropdownMenu = mobileSelector.querySelector('.dropdown-menu');
		const dropdownItems = mobileSelector.querySelectorAll('.dropdown-item');
		
		selectedBtn.addEventListener('click', function(e) {
			e.stopPropagation();
			this.classList.toggle('active');
			dropdownMenu.classList.toggle('active');
		});
		
		dropdownItems.forEach(item => {
			item.addEventListener('click', function() {
				const categoryId = this.dataset.category;
				
				dropdownItems.forEach(i => i.classList.remove('active'));
				this.classList.add('active');
				
				const selectedText = this.querySelector('span').textContent;
				selectedBtn.querySelector('span').textContent = selectedText;
				
				selectedBtn.classList.remove('active');
				dropdownMenu.classList.remove('active');
				
				document.querySelectorAll('.category-item').forEach(cat => cat.classList.remove('active'));
				document.querySelectorAll('.category-content').forEach(content => content.classList.remove('active'));
				
				const desktopCategory = document.querySelector(`.category-item[data-category="${categoryId}"]`);
				if (desktopCategory) {
					desktopCategory.classList.add('active');
				}
				document.getElementById(categoryId).classList.add('active');
			});
		});
		
		document.addEventListener('click', function(e) {
			if (!mobileSelector.contains(e.target)) {
				selectedBtn.classList.remove('active');
				dropdownMenu.classList.remove('active');
			}
		});
	}
});