document.addEventListener('DOMContentLoaded', function() {
	setTimeout(() => {
		if (typeof AOS !== 'undefined') {
			AOS.init({
				duration: 800,
				once: true,
				offset: 100,
				easing: 'ease-out-cubic',
				disable: function() {
					return window.innerWidth < 992;
				}
			});
		}
	}, 500);
});