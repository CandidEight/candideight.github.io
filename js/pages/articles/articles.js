document.addEventListener('DOMContentLoaded', function() {
	const btns = document.querySelectorAll('.articles__nav-btn');
	const tabs = document.querySelectorAll('.articles__tab');

	function switchTab(tabId) {
		tabs.forEach(tab => tab.classList.remove('is-active'));
		const activeTab = document.getElementById(tabId);
		if (activeTab) activeTab.classList.add('is-active');

		btns.forEach(btn => btn.classList.remove('is-active'));
		const activeBtn = Array.from(btns).find(btn => btn.dataset.tab === tabId);
		if (activeBtn) activeBtn.classList.add('is-active');
	}

	btns.forEach(btn => {
		btn.addEventListener('click', function(e) {
			const tabId = this.dataset.tab;
			switchTab(tabId);
			history.pushState(null, null, `#${tabId}`);
		});
	});

	if (window.location.hash) {
		const hash = window.location.hash.substring(1);
		if (document.getElementById(hash)) {
			switchTab(hash);
		}
	}
});