function initPopup() {
	const popupOverlay = document.getElementById('popupOverlay');
	const closeBtn = document.getElementById('closeBtn');
	
	if (!popupOverlay) return;
	
	function openPopup() {
		popupOverlay.classList.add('active');
		document.body.classList.add('no-scroll');
	}
	
	function closePopup() {
		popupOverlay.classList.remove('active');
		document.body.classList.remove('no-scroll');
	}
	
	const consultButtons = document.querySelectorAll('.consult-btn');
	consultButtons.forEach(button => {
		button.addEventListener('click', function(event) {
			event.preventDefault();
			openPopup();
		});
	});
	
	if (closeBtn) {
		closeBtn.addEventListener('click', closePopup);
	}
	
	popupOverlay.addEventListener('click', function(event) {
		if (event.target === popupOverlay) {
			closePopup();
		}
	});
	
	document.addEventListener('keydown', function(event) {
		if (event.key === 'Escape' && popupOverlay.classList.contains('active')) {
			closePopup();
		}
	});
	
	const consultForm = document.getElementById('consultForm');
	if (consultForm) {
		consultForm.addEventListener('submit', function(event) {
			event.preventDefault();
			
			const nameInput = this.querySelector('input[type="text"]');
			const phoneInput = this.querySelector('input[type="tel"]');
			const checkbox = this.querySelector('input[type="checkbox"]');
			
			let valid = true;
			
			if (!nameInput.value.trim()) {
				nameInput.style.borderColor = 'red';
				valid = false;
			} else {
				nameInput.style.borderColor = '';
			}
			
			const phoneDigits = phoneInput.value.replace(/\D/g, '');
			if (phoneDigits.length < 11) {
				phoneInput.style.borderColor = 'red';
				valid = false;
			} else {
				phoneInput.style.borderColor = '';
			}
			
			if (!checkbox.checked) {
				alert('Необходимо согласие с политикой конфиденциальности');
				valid = false;
			}
			
			if (valid) {
				alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
				consultForm.reset();
				closePopup();
			}
		});
		
		const phoneInput = consultForm.querySelector('input[type="tel"]');
		if (phoneInput) {
			phoneInput.addEventListener('input', function() {
				let value = this.value.replace(/\D/g, '');
				if (value.startsWith('7')) value = value.substring(1);
				value = value.substring(0, 10);
				
				let formatted = '+7 ';
				if (value.length > 0) formatted += '(' + value.substring(0, 3);
				if (value.length >= 4) formatted += ') ' + value.substring(3, 6);
				if (value.length >= 7) formatted += '-' + value.substring(6, 8);
				if (value.length >= 9) formatted += '-' + value.substring(8, 10);
				
				this.value = formatted;
			});
		}
	}
}
