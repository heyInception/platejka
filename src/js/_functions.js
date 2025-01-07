
// Реализация бургер-меню
import { burger } from './functions/burger';
// Реализация табов
import GraphTabs from 'graph-tabs';
const tabs = new GraphTabs('spec');
try {
  const selectElement = document.querySelector('#specialization'); // ID вашего select элемента

  selectElement.addEventListener('change', function () {
    const selectedValue = this.value;
    const index = Array.from(this.options).findIndex(option => option.value === selectedValue);

    if (index > -1) {
      const selectedTab = document.querySelector(`#spec${index + 1}`);
      const currentTab = document.querySelector('.tabs__nav-btn--active');

      if (selectedTab !== currentTab) {
        tabs.switchTabs(selectedTab, currentTab);
      }
    }
  });
} catch (error) {

}

// Подключение свайпера
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs, Scrollbar } from 'swiper/modules';

let swiperSlider = new Swiper(".slider__start", {
  modules: [Navigation, Pagination],
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.slider__button_next',
    prevEl: '.slider__button_prev',
  },
  centeredSlides: false,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    1230: {
      slidesPerView: 1,
      spaceBetween: 30
    },
    // when window width is >= 640px
    1231: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

let swiperClients = new Swiper(".slider__clients", {
  modules: [Navigation, Pagination],
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.slider__button_clients-next',
    prevEl: '.slider__button_clients-prev',
  },
  centeredSlides: false,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    1230: {
      slidesPerView: 1,
      spaceBetween: 30
    },
    // when window width is >= 640px
    1231: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

let swiperVslider = new Swiper(".v-slider__start", {
  modules: [Navigation, Pagination],
  // Navigation arrows
  navigation: {
    nextEl: '.v-slider__next',
    prevEl: '.v-slider__prev',
  },
  centeredSlides: false,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: '1.3',
      spaceBetween: 20
    },
    // when window width is >= 480px
    1230: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    1231: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

var swiper = new Swiper(".compare__slider", {
  modules: [Navigation, Pagination, Thumbs, Scrollbar],
  spaceBetween: 10,
  slidesPerView: 1,
  watchSlidesProgress: true,
  allowTouchMove: false,
});

var swiper2 = new Swiper(".compare__thumbs", {
  modules: [Navigation, Pagination, Thumbs, Scrollbar],
  spaceBetween: 10,
  lidesPerView: 1,
  navigation: {
    nextEl: ".compare__button-next",
    prevEl: ".compare__button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.v-slider__start .swiper-slide');

  images.forEach((img, index) => {
    if ((index + 1) % 4 === 0) {
      img.style.transform = 'rotate(6deg)'; // Каждый 4-й элемент
    } else if ((index + 1) % 2 === 0) {
      img.style.transform = 'rotate(-6deg)'; // Каждый 2-й элемент
    }
  });
});

// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

// import { validateForms } from './functions/validate-forms';
// const rules1 = [...];

// const afterForm = () => {
//   console.log('Произошла отправка, тут можно писать любые действия');
// };

// validateForms('.form-1', rules1, afterForm);
document.addEventListener("DOMContentLoaded", () => {
  const buttons = {
    usd: document.querySelector('.calc__button_usd'),
    eur: document.querySelector('.calc__button_uer'),
    cny: document.querySelector('.calc__button_cn')
  };
  const amountInput = document.getElementById("amount");
  const commissionDisplay = document.getElementById("commission");
  const totalWithCommissionDisplay = document.getElementById("totalWithCommission");
  const totalDisplay = document.getElementById("total");
  const currencyDisplay = document.getElementById("currency");

  let selectedCurrency = 'USD'; // Default currency

  // Button Click Event Listeners
  buttons.usd.addEventListener('click', () => setCurrency('USD'));
  buttons.eur.addEventListener('click', () => setCurrency('EUR'));
  buttons.cny.addEventListener('click', () => setCurrency('CNY'));

  function setCurrency(currency) {
    selectedCurrency = currency;

    // Обновляем отображение валюты
    currencyDisplay.innerText = currency; // Изменяем текст в элементе currency

    // Сбрасываем все кнопки до неактивного состояния
    Object.values(buttons).forEach(btn => {
      if (btn) {
        btn.classList.remove('calc__button_active');
      }
    });

    // Устанавливаем выбранную кнопку в активное состояние
    if (buttons[currency.toLowerCase()]) {
      buttons[currency.toLowerCase()].classList.add('calc__button_active');
    }

    calculate();
  }

  amountInput.addEventListener('input', calculate);

  async function calculate() {
    const amount = parseFloat(amountInput.value);
    if (!amount || isNaN(amount)) return;

    let results;
    switch (selectedCurrency) {
      case 'USD':
        results = await calcUsdToRub(amount);
        break;
      case 'EUR':
        results = await calcEurToRub(amount);
        break;
      case 'CNY':
        results = await calcCnyToRub(amount);
        break;
    }

    displayResults(results);

  }
  document.querySelector('.calc__button_main').addEventListener('click', async () => {
    const amount = parseFloat(amountInput.value);
    if (!amount || isNaN(amount)) return;

    const button = document.querySelector('.calc__button_main');
    button.textContent = 'Загрузка...'; // Изменение текста кнопки
    button.disabled = true; // Отключение кнопки

    let results;
    switch (selectedCurrency) {
      case 'USD':
        results = await calcUsdToRub(amount);
        break;
      case 'EUR':
        results = await calcEurToRub(amount);
        break;
      case 'CNY':
        results = await calcCnyToRub(amount);
        break;
    }

    displayResults(results);

    // Отправка данных в Telegram
    const message = `Выбранная валюта: ${selectedCurrency}\nСумма: ${amount} ${selectedCurrency}\nКомиссия платежного агента: ${results.com5X} ₽\nОсновной платеж: ${results.com95X.toFixed(2)} ₽\nК переводу с комиссией: ${results.finalAmount} ₽`;
    const encodedMessage = encodeURIComponent(message);
    // Перенаправление в Telegram через 3 секунды
    setTimeout(() => {
      // Здесь можно заменить URL на нужный вам
      window.location.href = `https://t.me/Inceptiontest_bot?text=${encodedMessage}`; // Замена на ваш канал или бот
      button.textContent = 'Начать перевод'; // Изменение текста кнопки
      button.disabled = false; // Включение кнопки
    }, 2000);
  });
  function displayResults(results) {
    commissionDisplay.innerText = `${results.com5X} ₽`;
    totalWithCommissionDisplay.innerText = `${results.com95X.toFixed(2)} ₽`;
    totalDisplay.innerText = `${results.finalAmount} ₽`;
  }
});

async function calcEurToRub(x) {
  const com_5 = (x / 100) * 5;
  const com = x + com_5;
  x += com_5;

  const response1 = await fetch('http://80.90.188.45/eur_to_usd.txt');
  const c1 = parseFloat(await response1.text());
  const usd = x * c1;
  x *= c1;

  const response2 = await fetch('http://80.90.188.45/usdt_to_rub.txt');
  const h = parseFloat(await response2.text());
  const h_1 = (h / 100) * 1;
  const c2 = parseFloat((h + h_1).toFixed(4));

  x *= c2;

  return {
    finalAmount: parseFloat(x.toFixed(2)),
    com5: parseFloat(com_5.toFixed(2)),
    com: com,
    c1: c1,
    usd: usd,
    h: h,
    h1: parseFloat(h_1.toFixed(2)),
    hTotal: parseFloat((h + h_1).toFixed(2)),
    com5X: parseFloat((x / 100 * 5).toFixed(2)),
    com95X: parseFloat((x / 100 * 95).toFixed(2))
  };
}

async function calcCnyToRub(x) {
  const com_5 = (x / 100) * 5;
  const com = x + com_5;
  x += com_5;

  const response1 = await fetch('http://80.90.188.45/cny_to_usd.txt');
  const c1 = parseFloat(await response1.text());
  const usd = x * c1;
  x *= c1;

  const response2 = await fetch('http://80.90.188.45/usdt_to_rub.txt');
  const h = parseFloat(await response2.text());
  const h_1 = (h / 100) * 1;
  const c2 = parseFloat((h + h_1).toFixed(4));

  x *= c2;

  return {
    finalAmount: parseFloat(x.toFixed(2)),
    com5: parseFloat(com_5.toFixed(2)),
    com: com,
    c1: c1,
    usd: usd,
    h: h,
    h1: parseFloat(h_1.toFixed(2)),
    hTotal: parseFloat((h + h_1).toFixed(2)),
    com5X: parseFloat((x / 100 * 5).toFixed(2)),
    com95X: parseFloat((x / 100 * 95).toFixed(2))
  };
}

async function calcUsdToRub(x) {
  const com_5 = (x / 100) * 5;
  const com = x + com_5;
  x += com_5;

  const response = await fetch('http://80.90.188.45/usdt_to_rub.txt');
  const h = parseFloat(await response.text());
  const h_1 = (h / 100) * 1;
  const c2 = parseFloat((h + h_1).toFixed(4));

  x *= c2;

  return {
    finalAmount: parseFloat(x.toFixed(2)),
    com5: parseFloat(com_5.toFixed(2)),
    com: com,
    h: h,
    h1: parseFloat(h_1.toFixed(2)),
    hTotal: parseFloat((h + h_1).toFixed(2)),
    com5X: parseFloat((x / 100 * 5).toFixed(2)),
    com95X: parseFloat((x / 100 * 95).toFixed(2))
  };
}
jQuery(document).ready(function() {
  jQuery('.faq__item').click(function() {
      jQuery(this).toggleClass('faq__item_active');
      jQuery(this).find('.faq__text').toggleClass('faq__text_active')
  })
});
try {
  jQuery(document).ready(function ($) {
    $(document).ready(function () {
      const countries = {
        'usa': $('.v-service__country-name_usa'),
        'ger': $('.v-service__country-name_ger'),
        'ch': $('.v-service__country-name_ch'),
        'tur': $('.v-service__country-name_tur'),
        'kz': $('.v-service__country-name_kz'),
        'est': $('.v-service__country-name_est'),
        'ru': $('.v-service__country-name_ru'),
        'gk': $('.v-service__country-name_gk'),
        'vet': $('.v-service__country-name_vet'),
        'kir': $('.v-service__country-name_kir'),
        'sing': $('.v-service__country-name_sing'),
      };

      const lines = [];
      let animated = false; // Флаг для предотвращения множественной анимации

      // Проверка ширины окна
      if ($(window).width() > 1230) {
        // Создаем линии между странами и глобусом и скрываем их
        $.each(countries, function (key, country) {
          if (country.length) {
            const line = new LeaderLine(
              country[0],
              $(`.v-service__globe-${key}`)[0],
              {
                color: '#343433',  // Цвет линии
                size: 1,           // Размер линии
                endPlug: 'behind', // Конец линии
                startPlug: 'behind', // Начало линии
                path: 'straight',    // Тип линии
                hide: true           // Скрываем линию при создании
              }
            );

            lines.push(line); // Сохраняем линии в массив
          }
        });

        // Функция проверки видимости элемента
        function checkVisibility() {
          const offset = $('.v-service__column').offset().top; // Получаем верхнюю позицию элемента
          const windowHeight = $(window).height();

          if ($(window).scrollTop() + windowHeight > offset && !animated) {
            animated = true; // Устанавливаем флаг анимации
            $.each(lines, function (index, line) {
              setTimeout(() => {
                line.show('draw', {
                  duration: 1500,  // Длительность анимации
                  timing: [0.58, 0, 0.42, 1] // Настройки временной функции
                });
              }, 500);
            });
          }
        }

        // Запускаем проверку при прокрутке
        $(window).on('scroll', checkVisibility);

        // Выполняем сразу для проверки, если элемент уже в видимости
        checkVisibility();
      }
    });
  });
} catch (error) {
  console.log(error)
}
