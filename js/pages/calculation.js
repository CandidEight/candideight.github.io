document.addEventListener('DOMContentLoaded', function() {

	// значения полей со страницы -->
	const squareMeterInput = document.getElementById('square-Meter-input');         // поле ввода: Площадь помещения
	const dismantlingCheckbox = document.getElementById('dismantling-checkbox');    // усановка флага в коробке: Демонтаж старого пола
	const backfillSelect = document.getElementById('backfill-select');              // Выпадающий список: Выберите засыпку
	const layerHardeningSelect = document.getElementById('layer-Hardening-select'); // Выпадающий список: Выберите слой жесткости
	const gVLWSelect = document.getElementById('gVLW-select');                      // Выпадающий список: Выберите Кнауф ГВЛВ
	// значения полей со страницы <--

	// Окна для вывода информации -->
	const squarePriceValue = document.getElementById('square-price');               // Поле для отображения стоимости: Площадь помещения
	const dismantPriceValue = document.getElementById('dismant-price');                 // Поле для отображения стоимости: Демонтаж старого пола
	const backfillPriceValue = document.getElementById('backfill-price');               // Поле для отображения стоимости: Выберите засыпку
	const layerHardeningPriceValue = document.getElementById('layerHardening-price');   // Поле для отображения стоимости: Выберите слой жесткости
	const gVLWPriceValue = document.getElementById('gVLW-price');                       // Поле для отображения стоимости: Выберите Кнауф ГВЛВ
	const totalAmountServices = document.getElementById('totalAmountServices');         // Поле для отображения общей стоимости работ
	// Окна для вывода информации <--

	// Переменные для расчетов -->
	const priceWorksPerSquareMeter = 440;   // Базовая цена работы за квадратный метр, без доп услуг и материалов
	var dismantling = 150;  // Базовая цена демонтожа за квадратный метр

	// Базовые цены за квадратный метр при выборе: Засыпки -->
	const backfill = {
			"Без засыпки": 0,
			"Фракционная": 350,
			"Дробленая": 290
	};
	// Базовые цены за квадратный метр при выборе: Засыпки <--

	// Базовые цены за квадратный метр при выборе: Слоя жесткости -->
	const layerHardening = {
			"Без жесткости": 0,
			"XPS 20 мм": 340,
			"XPS 30 мм": 404,
			"XPS 50 мм": 543
	};
	// Базовые цены за квадратный метр при выборе: Слоя жесткости <--

	// Базовые цены за квадратный метр при выборе: Кнауф ГВЛВ -->
	const gVLW = {
			"Без ГВЛВ": 0,
			"Кнауф элемент пола ГВЛВ": 722,
			"Кнауф лист 10 мм (в 2 слоя)": 600,
			"Кнауф лист 12 мм (в 2 слоя)": 750
	};
	// Базовые цены за квадратный метр при выборе: Кнауф ГВЛВ <--

	// Переменные для расчетов <--

	// Объявление переменные для хранения цен и их инициализация(присваивание значения) -->
	var costSquareMeterrice = calculPricePerSquareMeter(priceWorksPerSquareMeter); // Стоимость работ, без доп услуг
	var costDismantling = dismantlingPriceForSquareMeterrice(); // Стоимость Демонтожа
	var costBackfill = calculPricePerSquareMeter(backfill[backfillSelect.value] || 0);  // Стоимость Засыпки
	var costLayerHardening = calculPricePerSquareMeter(layerHardening[layerHardeningSelect.value] || 0);    // Стоимость Слоя жесткости
	var costGVLW = calculPricePerSquareMeter(gVLW[gVLWSelect.value] || 0);  // Стоимость Кнауф ГВЛВ
	// Объявление переменные для хранения цен и их инициализация(присваивание значения) <-- 

	// Метод для расчета стоимости 1 услуги: принимает в качестве аргумента цену за 1 квадратный метр любых работ -->
	function calculPricePerSquareMeter(pricePerSquareMeter) {
			let square = parseInt(squareMeterInput.value) || 0; // защита от NaN
			return pricePerSquareMeter * square;
	}
	// Метод для расчета стоимости 1 услуги: принимает в качестве аргумента цену за 1 квадратный метр любых работ <--

	// метод осуществляет проверку, установлена ли галочка в горобке: "Демонтожа" -->
	function dismantlingPriceForSquareMeterrice() {
			if(dismantlingCheckbox && dismantlingCheckbox.checked) {
					return calculPricePerSquareMeter(dismantling); // если галочка стоит то передаем в метод цену 150 и выходим из метода - прям с этой строчки
			}
			return 0;    // иначе возвращаем 0
	};
	// метод осуществляет проверку, установлена ли галочка в горобке: "Демонтожа" <--

	// Метод расчитывает общую стоимость услуг -->
	function updateTotalAmountServices() {
			// пересчитываем все значения
			costSquareMeterrice = calculPricePerSquareMeter(priceWorksPerSquareMeter);
			costDismantling = dismantlingPriceForSquareMeterrice();
			costBackfill = calculPricePerSquareMeter(backfill[backfillSelect.value] || 0);
			costLayerHardening = calculPricePerSquareMeter(layerHardening[layerHardeningSelect.value] || 0);
			costGVLW = calculPricePerSquareMeter(gVLW[gVLWSelect.value] || 0);
			
			// обновляем все поля с ценами
			squarePriceValue.textContent = costSquareMeterrice;
			dismantPriceValue.textContent = costDismantling;
			backfillPriceValue.textContent = costBackfill;
			layerHardeningPriceValue.textContent = costLayerHardening;
			gVLWPriceValue.textContent = costGVLW;
			
			var amount = costSquareMeterrice + costDismantling + costBackfill + costLayerHardening + costGVLW;
			totalAmountServices.textContent = amount; // записываем результат сложения всех видов услуг в поле для отображения общей стоимости работ
	};
	// Метод расчитывает обущю стоимость услуг <--

	// Вешаем обработчики событий -->
	
	// Метод запустится, если в html страницы, произошли изменения в поле: Площадь помещения-->
	squareMeterInput.addEventListener('input', () => {  // change меняем на input для мгновенного обновления
			updateTotalAmountServices();    // Вызываем метод для расчита общей стоимости услуг
	});
	// Метод запустится, если в html страницы, произошли изменения в поле: Площадь помещения<--

	// Метод запустится, если в html страницы, произошли изменения в поле: Демонтож-->
	dismantlingCheckbox.addEventListener('change', () => {
			updateTotalAmountServices();    // Вызываем метод для расчита общей стоимости услуг
	});
	// Метод запустится, если в html страницы, произошли изменения в поле: Демонтож<--

	// Метод запустится, если в html страницы, произошли изменения в поле: Засыпка-->
	backfillSelect.addEventListener('change', () => {
			updateTotalAmountServices();    // Вызываем метод для расчита общей стоимости услуг
	});
	// Метод запустится, если в html страницы, произошли изменения в поле: Засыпка<--

	// Метод запустится, если в html страницы, произошли изменения в поле: Слоя жесткости-->
	layerHardeningSelect.addEventListener('change', () => {
			updateTotalAmountServices();    // Вызываем метод для расчита общей стоимости услуг
	});
	// Метод запустится, если в html страницы, произошли изменения в поле: Слоя жесткости<--

	// Метод запустится, если в html страницы, произошли изменения в поле: Кнауф ГВЛВ-->
	gVLWSelect.addEventListener('change', () => {
			updateTotalAmountServices();    // Вызываем метод для расчита общей стоимости услуг
	});
	// Метод запустится, если в html страницы, произошли изменения в поле: Кнауф ГВЛВ<--
	
	// Вешаем обработчики событий <--

	updateTotalAmountServices(); // методвызовится 1 раз в момент загрузки цены, что позволит отобразить начальное значение расчета, а именно 10 кв.м. * 440 цена за квадрат
});