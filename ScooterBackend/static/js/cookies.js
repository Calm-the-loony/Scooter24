function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}
function saveFavorites(favorites) {
    setCookie('userFavorites', JSON.stringify(favorites), 7);
}

function loadFavorites() {
    const savedFavorites = getCookie('userFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
}

function saveCart(cart) {
    setCookie('userCart', JSON.stringify(cart), 7);
}

function loadCart() {
    const savedCart = getCookie('userCart');
    return savedCart ? JSON.parse(savedCart) : [];
}
