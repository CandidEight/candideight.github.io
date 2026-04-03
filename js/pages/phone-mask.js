document.addEventListener('DOMContentLoaded', function() {
	const phoneInputs = document.querySelectorAll('.phone-mask');
	
	phoneInputs.forEach(input => {
		input.addEventListener('input', function(e) {
			let value = this.value.replace(/\D/g, '');
			
			if (value.length > 0) {
				if (value.startsWith('7')) {
					value = value.substring(1);
				}
				
				value = value.substring(0, 10);
				
				let formatted = '+7 ';
				
				if (value.length > 0) {
					formatted += '(' + value.substring(0, 3);
				}
				
				if (value.length >= 4) {
					formatted += ') ' + value.substring(3, 6);
				}
				
				if (value.length >= 7) {
					formatted += '-' + value.substring(6, 8);
				}
				
				if (value.length >= 9) {
					formatted += '-' + value.substring(8, 10);
				}
				
				this.value = formatted;
			} else {
				this.value = '+7 ';
			}
		});
		
		input.addEventListener('keydown', function(e) {
			if (e.key === 'Backspace' && this.value === '+7 ') {
				e.preventDefault();
			}
		});
		
		if (!input.value) {
			input.value = '+7 ';
		}
	});
});