document.addEventListener('DOMContentLoaded', function() {
	const accordionItems = document.querySelectorAll('.process-accordion__item');
	const toggleAllBtn = document.getElementById('toggleAllBtn');
	const toggleAllText = document.querySelector('.toggle-all-text');
	let allOpen = false;

	accordionItems.forEach(item => {
		const header = item.querySelector('.process-accordion__header');
		const content = item.querySelector('.process-accordion__content');

		header.setAttribute('aria-expanded', 'false');
		content.hidden = true;
		content.style.maxHeight = '0px';

		header.addEventListener('click', () => {
			const isExpanded = header.getAttribute('aria-expanded') === 'true';

			if (isExpanded) {
				closeAccordionItem(item);
			} else {
				openAccordionItem(item);
			}
		});
	});

	if (toggleAllBtn) {
		toggleAllBtn.addEventListener('click', () => {
			allOpen = !allOpen;

			accordionItems.forEach(item => {
				if (allOpen) {
					openAccordionItem(item);
				} else {
					closeAccordionItem(item);
				}
			});

			toggleAllText.textContent = allOpen ? 'Скрыть все' : 'Раскрыть все';
			toggleAllBtn.classList.toggle('all-open', allOpen);
		});
	}

	function openAccordionItem(item) {
		const header = item.querySelector('.process-accordion__header');
		const content = item.querySelector('.process-accordion__content');

		header.setAttribute('aria-expanded', 'true');
		content.hidden = false;
		content.style.maxHeight = content.scrollHeight + 'px';
		item.classList.add('active');
	}

	function closeAccordionItem(item) {
		const header = item.querySelector('.process-accordion__header');
		const content = item.querySelector('.process-accordion__content');

		header.setAttribute('aria-expanded', 'false');
		content.style.maxHeight = '0px';
		item.classList.remove('active');

		setTimeout(() => {
			content.hidden = true;
		}, 300);
	}

	window.addEventListener('resize', () => {
		accordionItems.forEach(item => {
			const header = item.querySelector('.process-accordion__header');
			const content = item.querySelector('.process-accordion__content');

			if (header.getAttribute('aria-expanded') === 'true') {
				content.style.maxHeight = content.scrollHeight + 'px';
			}
		});
	});
});