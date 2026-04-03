// Калькулятор для премиального блока
document.addEventListener('DOMContentLoaded', function() {
	// Основной слайдер толщины
	const thicknessSlider = document.getElementById('premium-thickness');
	if (!thicknessSlider) return;
	
	const thicknessDisplay = document.getElementById('current-thickness');
	const maxThicknessDisplay = document.getElementById('max-thickness-display'); // 👈 добавил
	const priceStandard = document.getElementById('price-standard');
	const pricePremium = document.getElementById('price-premium');
	const priceEconom = document.getElementById('price-econom');
	const priceWork = document.getElementById('price-work');
	
	// Базовые цены
	const basePrices = {
		standard: 2400,
		premium: 3200,
		econom: 2100,
		work: 700
	};
	
	function updatePrices() {
		const thickness = parseInt(thicknessSlider.value);
		const extraCm = Math.max(0, thickness - 6);
		const extraCost = extraCm * 100;
		
		thicknessDisplay.textContent = thickness;
		maxThicknessDisplay.textContent = thickness + ' см'; // 👈 вот это меняет правую цифру
		
		priceStandard.textContent = (basePrices.standard + extraCost).toLocaleString();
		pricePremium.textContent = (basePrices.premium + extraCost).toLocaleString();
		priceEconom.textContent = (basePrices.econom + extraCost).toLocaleString();
		priceWork.textContent = (basePrices.work + extraCost).toLocaleString();
	}
	
	thicknessSlider.addEventListener('input', updatePrices);
	updatePrices(); // инициализация
});