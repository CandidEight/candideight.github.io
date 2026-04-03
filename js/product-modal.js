document.addEventListener('DOMContentLoaded', function() {
	const modal = document.getElementById('productModal');
	const closeBtn = document.getElementById('closeModal');
	
	const productsData = {
		knauf: {
			image: '/images/materials/sipuchiernauf.jpg',
			brand: 'KNAUF',
			title: 'Сухая засыпка',
			description: 'Кнауф засыпка керамзитовая сухая улучшает характеристики прочности супер-пола «Кнауф», предохраняя его от проседания, деформации.',
			advantages: [
				'натуральный материал',
				'высокие изоляционные показатели',
				'не дает усадки'
			],
			specs: [
				{ label: 'Вес', value: '22.5 кг' },
				{ label: 'Объем', value: '40 л' },
				{ label: 'Материал', value: 'Глина' },
				{ label: 'Марка', value: 'KNAUF' },
				{ label: 'Страна', value: 'Россия' }
			]
		},
		akz: {
			image: '/images/materials/sipuchieakz.jpg',
			brand: 'AKZ',
			title: 'Сухая засыпка',
			description: 'Сухая засыпка применяется в устройстве сухой стяжки, выполняет роль выравнивающего слоя. Состав отвечает требованиям ГОСТ 32497-2013.',
			specs: [
				{ label: 'Объем', value: '40 л' },
				{ label: 'Масса', value: '24-25 кг' },
				{ label: 'Фракция', value: '0-5 мм' },
				{ label: 'Производитель', value: 'АКЗ' },
				{ label: 'Насыпная плотность', value: 'М-600' }
			],
			applications: 'Жилые помещения, офисы, магазины, киоски'
		},
		kushva: {
			image: '/images/materials/sipuchiekushva.jpg',
			brand: 'КУШВА',
			title: 'Керамзит',
			description: 'Сухая засыпка или керамзит мелкой фракции. Зерновой состав соответствует ГОСТ №32496-2013. Засыпка применяется для устройства сухой стяжки по технологии Knauf.',
			specs: [
				{ label: 'Объем', value: '50 л' },
				{ label: 'Насыпная плотность', value: '560-600 кг/м³' },
				{ label: 'Прочность', value: '2.5-3.2 МПа' },
				{ label: 'Фракция', value: '0-5 мм' }
			]
		},
		kompevit: {
			image: '/images/materials/sipuchiekompevit.jpg',
			brand: 'KOMPEVIT',
			title: 'Сухая засыпка',
			description: 'Сухая засыпка Компэвит на основе керамзитового песка для устройства сборных полов ГВЛ/ГСП. Разработана в соответствии с требованиями СНиП 3.04.01-87.',
			advantages: [
				'без пыли',
				'нет посторонних включений',
				'определенный гранулометрический состав',
				'исключает осадку'
			],
			specs: [
				{ label: 'Объем', value: '40 л' },
				{ label: 'Насыпная плотность', value: '500-600 кг/м³' },
				{ label: 'Прочность', value: '2.5-3.3 МПа' },
				{ label: 'Влажность', value: 'менее 0.5%' }
			]
		},
		tagil: {
			image: '/images/materials/sipuchietagil.jpg',
			brand: 'Н. ТАГИЛ',
			title: 'Сухая засыпка',
			description: 'Гранулированная сухая засыпка (керамзит мелкой фракции) ГОСТ № 32496-2013. Природные радионуклиды не превышают лимит использования для строительства жилых и общественных зданий.',
			specs: [
				{ label: 'Объем', value: '40 л' },
				{ label: 'Масса', value: '23-25 кг' },
				{ label: 'Фракция', value: '0-5 мм' }
			]
		},
		'element-20': {
			image: '/images/materials/list.jpg',
			brand: 'KNAUF',
			title: 'Элемент пола',
			description: 'Гипсоволокнистый лист с влагостойкой пропиткой для сборных полов по технологии Кнауф. Два слоя толщиной 1 см, склеенных со смещением 5 см, образуют замок (фальц). Не расслаивается, не боится влаги, соответствует ГОСТ Р 51829-2001.',
			advantages: [
				'влагостойкая пропитка',
				'замковое соединение',
				'не расслаивается',
				'соответствует ГОСТ'
			],
			specs: [
				{ label: 'Размер', value: '1200x600x20 мм' },
				{ label: 'Масса', value: '18-19 кг' },
				{ label: 'Площадь', value: '0.72 м²' },
				{ label: 'Теплопроводность', value: '0,22-0,36 Вт/м' },
				{ label: 'Твердость', value: 'не менее 20 МПа' },
				{ label: 'Влагопоглощение', value: '≤ 1,0 кг/м²' },
				{ label: 'Паропроницаемость', value: '0,12 Мг/м•ч•Па' }
			]
		},
		'gvlv-10': {
			image: '//images/materials/list2.jpg',
			brand: 'KNAUF',
			title: 'Суперлист ГВЛВ 10мм',
			description: 'Влагостойкий гипсоволокнистый лист. Прессованная смесь гипса и целлюлозных волокон. Обработан гидрофобизатором, отшлифован. Экологичный, дышащий материал для жилых помещений.',
			advantages: [
				'влаго- и огнестойкий',
				'экологичный',
				'регулирует микроклимат',
				'без токсинов',
				'ГОСТ Р 51829-2001'
			],
			specs: [
				{ label: 'Размер', value: '1250x1200x10 мм' },
				{ label: 'Масса', value: '17 кг' },
				{ label: 'Площадь', value: '1.5 м²' },
				{ label: 'Влагостойкий', value: 'Да' },
				{ label: 'Огнестойкий', value: 'Да' },
				{ label: 'Страна', value: 'Россия' }
			]
		},
		'gvlv-12': {
			image: '//images/materials/list3.jpg',
			brand: 'KNAUF',
			title: 'Суперлист ГВЛВ 12мм',
			description: 'Влагостойкий гипсоволокнистый лист. Прессованная смесь гипса и целлюлозных волокон. Обработан гидрофобизатором, отшлифован. Экологичный, дышащий материал для жилых помещений.',
			advantages: [
				'влаго- и огнестойкий',
				'экологичный',
				'регулирует микроклимат',
				'без токсинов',
				'ГОСТ Р 51829-2001'
			],
			specs: [
				{ label: 'Размер', value: '1250x1200x12 мм' },
				{ label: 'Масса', value: '19 кг' },
				{ label: 'Площадь', value: '1.5 м²' },
				{ label: 'Влагостойкий', value: 'Да' },
				{ label: 'Огнестойкий', value: 'Да' },
				{ label: 'Страна', value: 'Россия' }
			]
		}
	};
	
	document.querySelectorAll('.product-card').forEach(card => {
		card.addEventListener('click', function(e) {
			e.preventDefault();
			const productId = this.dataset.product;
			const product = productsData[productId];
			
			if (product) {
				document.getElementById('modalImage').src = product.image;
				document.getElementById('modalBrand').textContent = product.brand;
				document.getElementById('modalTitle').textContent = product.title;
				document.getElementById('modalDescription').textContent = product.description;
				
				if (product.advantages) {
					document.getElementById('modalAdvantages').style.display = 'block';
					const list = document.getElementById('modalAdvantagesList');
					list.innerHTML = '';
					product.advantages.forEach(adv => {
						const li = document.createElement('li');
						li.textContent = adv;
						list.appendChild(li);
					});
				} else {
					document.getElementById('modalAdvantages').style.display = 'none';
				}
				
				const specsContainer = document.getElementById('modalSpecs');
				specsContainer.innerHTML = '';
				product.specs.forEach(spec => {
					const item = document.createElement('div');
					item.className = 'product-modal__spec-item';
					item.innerHTML = `
						<span class="product-modal__spec-label">${spec.label}</span>
						<span class="product-modal__spec-value">${spec.value}</span>
					`;
					specsContainer.appendChild(item);
				});
				
				if (product.applications) {
					document.getElementById('modalApplications').style.display = 'block';
					document.getElementById('modalApplicationsText').textContent = product.applications;
				} else {
					document.getElementById('modalApplications').style.display = 'none';
				}
				
				modal.classList.add('active');
				document.body.style.overflow = 'hidden';
			}
		});
	});
	
	function closeModal() {
		modal.classList.remove('active');
		document.body.style.overflow = '';
	}
	
	if (closeBtn) {
		closeBtn.addEventListener('click', closeModal);
	}
	
	modal.addEventListener('click', function(e) {
		if (e.target === modal) {
			closeModal();
		}
	});
	
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' && modal.classList.contains('active')) {
			closeModal();
		}
	});
});