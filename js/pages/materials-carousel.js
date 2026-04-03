document.addEventListener('DOMContentLoaded', function() {
	const track = document.querySelector('.brands-track');
	if (!track) return;
	
	const logos = track.querySelectorAll('.brand-logo');
	const totalWidth = Array.from(logos).reduce((sum, logo) => {
		return sum + logo.offsetWidth + 60;
	}, 0);
	
	track.style.width = `${totalWidth}px`;
	
	function pauseAnimation() {
		track.style.animationPlayState = 'paused';
	}
	
	function resumeAnimation() {
		track.style.animationPlayState = 'running';
	}
	
	track.addEventListener('mouseenter', pauseAnimation);
	track.addEventListener('mouseleave', resumeAnimation);
	
	track.addEventListener('touchstart', pauseAnimation);
	track.addEventListener('touchend', resumeAnimation);
});