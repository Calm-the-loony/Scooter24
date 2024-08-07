//поиск
var lastResFind = ""; // последний удачный результат
var copy_page = ""; // копия страницы в исходном виде

function TrimStr(s) {
    s = s.replace(/^\s+/g, '');
    return s.replace(/\s+$/g, '');
}

function FindOnPage(inputId) { //ищет текст на странице, в параметр передается ID поля для ввода
    var obj = window.document.getElementById(inputId);
    var textToFind;

    if (obj) {
        textToFind = TrimStr(obj.value); //обрезаем пробелы
    } else {
        alert("Введенная фраза не найдена");
        return;
    }
    if (textToFind == "") {
        alert("Вы ничего не ввели");
        return;
    }

    var pattern = new RegExp(textToFind, "gi");

    if (!pattern.test(document.body.innerHTML)) {
        alert("Ничего не найдено, проверьте правильность ввода!");
        return;
    }

    if (copy_page.length > 0) {
        document.body.innerHTML = copy_page;
    } else {
        copy_page = document.body.innerHTML;
    }

    document.body.innerHTML = document.body.innerHTML.replace(eval("/name=" + lastResFind + "/gi"), " "); //стираем предыдущие якори для скрола
    document.body.innerHTML = document.body.innerHTML.replace(pattern, "<a class='highlighted' name=" + textToFind + ">" + textToFind + "</a>"); //Заменяем найденный текст ссылками с якорем;
    lastResFind = textToFind; // сохраняем фразу для поиска, чтобы в дальнейшем по ней стереть все ссылки

    // Найти элемент с именем, соответствующим найденному тексту, и прокрутить его в видимую область
    var targetElement = document.querySelector("[name='" + textToFind + "']");
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


  //меню
  function toggleMenu() {
    var submenu = document.querySelector('.submenu');
    submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
}

//избранное на карточке
function toggleFavorite(button) {
  button.classList.toggle('favorited');
}

//карусель
$(document).ready(function(){
    $('.carousel').slick({
      infinite: true,
      slidesToShow: 4, // Количество отображаемых слайдов
      slidesToScroll: 2, // Количество прокручиваемых слайдов
    });
  });
  
//кнопка View more
let isHidden = true; 

function hideCards() {
  const productCards = document.querySelectorAll('.product-card');
  for (let i = 16; i < productCards.length; i++) {
    if (isHidden) {
      productCards[i].classList.add('hidden');
    } else {
      productCards[i].classList.remove('hidden');
    }
  }
}

function toggleVisibility() {
  isHidden = !isHidden; // Изменяем состояние флага
  hideCards(); // функция скрытия/отображения карточек
}

// Вызываем функцию hideCards() при загрузке страницы, чтобы скрыть лишние карточки
hideCards();

//кнопка "View more"
const viewMoreButton = document.querySelector('.view-more');

// обрабовпитчик клика на кнопку "View more"
viewMoreButton.addEventListener('click', toggleVisibility);


//баннер
// Отображение модального окна
function showModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
  const modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Переадресация на WhatsApp
function redirectToWhatsApp() {
  window.location.href = 'https://wa.me/номер_WhatsApp';
}
function redirectToTelegram() {
  window.location.href = 'https://t.me/Calm_the_loony';
}

// Инициирование звонка
function makePhoneCall() {
  window.location.href = 'tel:+9614277510';
}


//шапка сворачивается при отпределенном количестве прокрутки, позже доделать
let prevScrollPos = window.pageYOffset;
let isMenuOpen = false; // Флаг для отслеживания состояния меню

function scrollHandler(event) {
    const currentScrollPos = window.pageYOffset;
    const header = document.getElementById("header");
    const actionContainer = document.querySelector(".action-container");
    const submenu = document.querySelector('.submenu');

    if (currentScrollPos < 100) {
        // Если мы находимся в верхней части страницы
        header.style.height = "100px"; /* Показываем шапку */
        actionContainer.style.marginLeft = "0"; // Вернуть обычный margin-left
        if (isMenuOpen) {
            submenu.style.display = 'block'; // Показ подменю
            setTimeout(() => submenu.style.opacity = "1", 0); // Показать текст
        }
    } else {
        header.style.height = "50px"; /* Скрываем верхнюю часть шапки при прокрутке вниз */
        submenu.style.opacity = '0'; // Скрыть текст
        setTimeout(() => submenu.style.display = 'none', 500); // Скрыть подменю после плавного перехода
        actionContainer.style.marginLeft = "-7px"; 
        isMenuOpen = false; // Сбрасываем флаг меню
    }
    
    prevScrollPos = currentScrollPos;
}

function toggleMenu() {
    const header = document.querySelector('.header');
    const submenu = document.querySelector('.submenu');
    const logoText = document.querySelector('.logo-text');

    // Если шапка свернута, развернуть её
    if (!isMenuOpen && window.pageYOffset < 100) {
        header.style.height = '100px'; // Вернуть обычную высоту
        submenu.style.display = 'block'; // Показ подменю
        setTimeout(() => submenu.style.opacity = "1", 0); // Показать текст
        isMenuOpen = true;
    } else {
        // Иначе, свернуть шапку и скрыть подменю
        header.style.height = '50px';
        submenu.style.opacity = '0'; // Скрыть текст
        setTimeout(() => submenu.style.display = 'none', 500); // Скрыть подменю после плавного перехода
        isMenuOpen = false;
    }
}

// Добавляем обработчики событий
window.addEventListener('scroll', scrollHandler);
// document.getElementById('menu-toggle-button').addEventListener('click', toggleMenu);


//открытие карточки товара


//избранное
// let favorites = [];
// const favoriteButton = document.getElementById('favorite-button');
// const favoriteCount = document.getElementById('favorite-count');
// const favoriteList = document.querySelector('#favorite-list tbody');
// const favoritesModal = document.getElementById('favorites-modal');
// const favoritesClose = document.getElementById('favorites-close');

// function toggleFavorite(button) {
//     const productCard = button.closest('.product-card');
//     const productId = productCard.getAttribute('data-id');
//     const product = {
//         id: productId,
//         discount: productCard.querySelector('.discount')?.innerText,
//         image: productCard.querySelector('img').src,
//         category: productCard.querySelector('.category').innerText,
//         name: productCard.querySelector('.name').innerText,
//         price: productCard.querySelector('.discounted-price')?.innerText ||
//                productCard.querySelector('.original-price')?.innerText ||
//                productCard.querySelector('.original-prices')?.innerText,
//         stock: productCard.getAttribute('data-stock')
//     };

//     const index = favorites.findIndex(item => item.id === productId);

//     if (index > -1) {
//         favorites.splice(index, 1);
//         button.querySelector('i').classList.remove('active');
//     } else {
//         favorites.push(product);
//         button.querySelector('i').classList.add('active');
//     }

//     favoriteCount.innerText = favorites.length;
//     updateFavoriteList();
// }

// function updateFavoriteList() {
//     favoriteList.innerHTML = '';
//     favorites.forEach(product => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td><img src="${product.image}" alt="${product.name}" class="favorite-product-image"></td>
//             <td>${product.name}</td>
//             <td>${product.price}</td>
//             <td>${product.stock}</td>
//             <td>
//                 <button class="add-to-cart">Добавить в корзину</button>
//                 <button class="remove-from-favorites" onclick="removeFromFavorites('${product.id}')">Удалить</button>
//             </td>
//         `;
//         favoriteList.appendChild(tr);
//     });
// }

// function removeFromFavorites(productId) {
//     favorites = favorites.filter(item => item.id !== productId);
//     document.querySelector(`.product-card[data-id="${productId}"] .add-to-favorites i`).classList.remove('active');
//     favoriteCount.innerText = favorites.length;
//     updateFavoriteList();
// }

// function toggleModal() {
//     favoritesModal.style.display = favoritesModal.style.display === 'block' ? 'none' : 'block';
// }

// favoriteButton.addEventListener('click', toggleModal);
// favoritesClose.addEventListener('click', toggleModal);

// window.addEventListener('click', function(event) {
//     if (event.target === favoritesModal) {
//         toggleModal();
//     }
// });


//корзина
// document.addEventListener('DOMContentLoaded', (event) => {
//   let cart = [];
//   const cartButton = document.getElementById('cart-button');
//   const cartCount = document.getElementById('cart-count');
//   const cartList = document.querySelector('#cart-list tbody');
//   const cartModal = document.getElementById('cart-modal');
//   const cartClose = document.querySelector('.close');

//   function toggleCart(button) {
//       const productCard = button.closest('.product-card');
//       const productId = productCard.getAttribute('data-id');
//       const product = {
//           id: productId,
//           discount: productCard.querySelector('.discount')?.innerText,
//           image: productCard.querySelector('img').src,
//           category: productCard.querySelector('.category').innerText,
//           name: productCard.querySelector('.name').innerText,
//           price: productCard.querySelector('.discounted-price')?.innerText ||
//                  productCard.querySelector('.original-price')?.innerText,
//           quantity: 1
//       };

//       const index = cart.findIndex(item => item.id === productId);

//       if (index > -1) {
//           cart[index].quantity += 1;
//       } else {
//           cart.push(product);
//       }

//       cartCount.innerText = cart.length;
//       updateCartList();
//   }

//   function updateCartList() {
//       cartList.innerHTML = '';
//       cart.forEach(product => {
//           const tr = document.createElement('tr');
//           tr.innerHTML = `
//               <td><img src="${product.image}" alt="${product.name}" class="cart-product-image"></td>
//               <td>${product.name}</td>
//               <td>${product.price}</td>
//               <td>${product.quantity}</td>
//               <td>
//                   <button class="remove-from-cart" onclick="removeFromCart('${product.id}')">Удалить</button>
//               </td>
//           `;
//           cartList.appendChild(tr);
//       });
//   }

//   function removeFromCart(productId) {
//       const index = cart.findIndex(item => item.id === productId);
//       if (index > -1) {
//           cart.splice(index, 1);
//           cartCount.innerText = cart.length;
//           updateCartList();
//       }
//   }

//   function toggleCartModal() {
//       cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
//   }

//   if (cartButton) {
//       cartButton.addEventListener('click', toggleCartModal);
//   }

//   if (cartClose) {
//       cartClose.addEventListener('click', toggleCartModal);
//   }

//   window.addEventListener('click', function(event) {
//       if (event.target === cartModal) {
//           toggleCartModal();
//       }
//   });

//   window.toggleCart = toggleCart;
// });

//избранное и корзина
// Отладочные сообщения
//избранное и корзина
// Отладочные сообщения
console.log('Script is loaded');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Получение элементов
const favoriteButton = document.getElementById('favorite-button');
const favoriteCount = document.getElementById('favorite-count');
const favoriteList = document.querySelector('#favorite-list tbody');
const favoritesModal = document.getElementById('favorites-modal');
const favoritesClose = document.getElementById('favorites-close');

const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const cartList = document.querySelector('#cart-list tbody');
const cartModal = document.getElementById('cart-modal');
const cartClose = document.getElementById('cart-close');

// Функции для работы с localStorage
function saveFavorites() {
    console.log('Saving favorites:', favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function saveCart() {
    console.log('Saving cart:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функции для обновления списка избранного
function updateFavoriteList() {
    console.log('Updating favorite list:', favorites);
    if (favoriteList) {
        favoriteList.innerHTML = '';
        favorites.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" class="favorite-product-image"></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="add-to-cart" onclick="addToCartFromFavorites('${product.id}')">Добавить в корзину</button>
                    <button class="remove-from-favorites" onclick="removeFromFavorites('${product.id}')">Удалить</button>
                </td>
            `;
            favoriteList.appendChild(tr);
        });
    }
}

// Функции для обновления списка корзины
function updateCartList() {
    console.log('Updating cart list:', cart);
    if (cartList) {
        cartList.innerHTML = '';
        cart.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" class="cart-product-image"></td>
                <td>${product.name}</td>
                <td class="cart-item-price">${product.price}</td>
                <td>
                    <button class="quantity-change" onclick="changeQuantity('${product.id}', -1)">-</button>
                    <span class="cart-item-quantity">${product.quantity}</span>
                    <button class="quantity-change" onclick="changeQuantity('${product.id}', 1)">+</button>
                </td>
                <td>
                    <button class="remove-from-cart" onclick="removeFromCart('${product.id}')">Удалить</button>
                </td>
            `;
            cartList.appendChild(tr);
        });
        updateTotalPrice();
    }
}

// Функция для обновления общей цены корзины
function updateTotalPrice() {
    let totalPrice = 0;
    cart.forEach(product => {
        const price = parseFloat(product.price.replace('руб.', '').replace('₽', '').replace(',', '.'));
        totalPrice += price * product.quantity;
    });
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = totalPrice.toFixed(2) + ' ₽';
    }
}

// Функция для обработки клика по кнопке "Избранное"
function toggleFavorite(button) {
    const productCard = button.closest('.product-card');
    const productId = productCard.getAttribute('data-id');
    const product = {
        id: productId,
        discount: productCard.querySelector('.discount')?.innerText,
        image: productCard.querySelector('img').src,
        category: productCard.querySelector('.category').innerText,
        name: productCard.querySelector('.name').innerText,
        price: productCard.querySelector('.discounted-price')?.innerText ||
               productCard.querySelector('.original-price')?.innerText ||
               productCard.querySelector('.original-prices')?.innerText,
        stock: productCard.getAttribute('data-stock')
    };

    const index = favorites.findIndex(item => item.id === productId);

    if (index > -1) {
        favorites.splice(index, 1);
        button.querySelector('i').classList.remove('active');
    } else {
        favorites.push(product);
        button.querySelector('i').classList.add('active');
    }

    if (favoriteCount) {
        favoriteCount.innerText = favorites.length;
    }
    updateFavoriteList();
    saveFavorites();
}

// Функция для удаления товара из избранного
function removeFromFavorites(productId) {
    favorites = favorites.filter(item => item.id !== productId);
    const productCard = document.querySelector(`.product-card[data-id="${productId}"] .add-to-favorites i`);
    if (productCard) {
        productCard.classList.remove('active');
    }
    if (favoriteCount) {
        favoriteCount.innerText = favorites.length;
    }
    updateFavoriteList();
    saveFavorites();
}

// Функция для обработки клика по кнопке "Корзина"
function toggleCart(button) {
    const productCard = button.closest('.product-card');
    const productId = productCard.getAttribute('data-id');
    const product = {
        id: productId,
        image: productCard.querySelector('img').src,
        name: productCard.querySelector('.name').innerText,
        price: productCard.querySelector('.discounted-price')?.innerText ||
               productCard.querySelector('.original-price')?.innerText ||
               productCard.querySelector('.original-prices')?.innerText,
        quantity: 1
    };

    const index = cart.findIndex(item => item.id === productId);

    if (index > -1) {
        cart[index].quantity += 1;
    } else {
        cart.push(product);
    }

    if (cartCount) {
        cartCount.innerText = cart.length;
    }
    updateCartList();
    saveCart();
}

// Функция для добавления товара из избранного в корзину
function addToCartFromFavorites(productId) {
    console.log('Adding to cart from favorites:', productId);
    const product = favorites.find(item => item.id === productId);
    if (product) {
        toggleCart(document.querySelector(`.product-card[data-id="${productId}"] .add-to-cart`));
    } else {
        console.error('Product not found in favorites:', productId);
    }
}

// Функция для изменения количества товара в корзине
function changeQuantity(productId, delta) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    updateCartList();
    saveCart();
    updateTotalPrice();
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
    updateCartList();
    saveCart();
    updateTotalPrice();
}

// Функция для покупки товаров
function buyItems() {
    alert('Оплата произведена, теперь у вас нет денег и нет товара 🤡');
    cart = [];
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
    updateCartList();
    saveCart();
    updateTotalPrice();
    toggleCartModal();
}

// Функция для переключения видимости модального окна
function toggleModal(modal) {
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Инициализация модальных окон
function initializeModals() {
    if (favoriteButton) {
        favoriteButton.addEventListener('click', () => toggleModal(favoritesModal));
    }
    if (favoritesClose) {
        favoritesClose.addEventListener('click', () => toggleModal(favoritesModal));
    }
    if (cartButton) {
        cartButton.addEventListener('click', () => toggleModal(cartModal));
    }
    if (cartClose) {
        cartClose.addEventListener('click', () => toggleModal(cartModal));
    }

    window.addEventListener('click', function(event) {
        if (event.target === favoritesModal) {
            toggleModal(favoritesModal);
        }
        if (event.target === cartModal) {
            toggleModal(cartModal);
        }
    });
}

// Инициализация страницы
function initializePage() {
    if (favoriteCount) {
        favoriteCount.innerText = favorites.length;
    }
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
    updateFavoriteList();
    updateCartList();
    updateTotalPrice();

    // Обновление состояния кнопок на карточках товаров при загрузке страницы
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = card.getAttribute('data-id');
        if (favorites.find(item => item.id === productId)) {
            card.querySelector('.add-to-favorites i').classList.add('active');
        }
        // Убедитесь, что вы добавили необходимые изменения для корзины, если это необходимо
    });
}

// Событие DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initializePage();
    initializeModals();
});




//карточка
// var productsData = [
//     {
//         title: "Product 1",
//         price: "$99.99",
//         availability: "In Stock",
//         image: "product1.jpg",
//         description: "Description for Product 1"
//     },
//     {
//         title: "Product 2",
//         price: "$149.99",
//         availability: "Out of Stock",
//         image: "product2.jpg",
//         description: "Description for Product 2"
//     }
// ];

// function showProductDetails(productId) {
//     var product = productsData[productId];
//     document.querySelector(".product-title").innerText = product.title;
//     document.querySelector(".product-price").innerText = "Price: " + product.price;
//     document.querySelector(".availability").innerText = product.availability;
//     document.querySelector(".product-image img").src = product.image;
//     document.querySelector(".product-description").innerText = product.description;
// }

// document.querySelectorAll(".product-card").forEach(function(card, index) {
//     card.addEventListener("click", function() {
//         showProductDetails(index);
//     });
// });




