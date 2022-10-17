const products = [
    {
        id: 1,
        title: 'Lenovo Yoga',
        price: 3000,
    },
    {
        id: 2,
        title: 'Acer Aspire',
        price: 1800,
    },
    {
        id: 3,
        title: 'Dell Vostro',
        price: 3400
    },
];

let order = [];

function addToBasket(productId) {
    // TODO: добавить проверку наличия товара в заказе (при наличии выдать alert, что товар уже в корзине)
    if (order.includes(products[productId - 1])) {
        alert(`Товар: ${products[productId - 1].title} уже есть в корзине!`);
    }
    // TODO: если товар еще не в корзине, добавить его из массива products
    else {
        // В видео выговорили что попытаться сделать не через пуш (возможно я что-то понял не так но придумал это)
        order = [...order, products[productId - 1]] 
        //order.push(products[productId - 1]);
    }
    
    // Эти строчки не трогаем, они отвечают за переотрисовку страницы
    renderCart();
    rerenderTotalPrice();
}

function removeFromBasket(productId) {
    // TODO: описать логику удаления товара из корзины
    order.splice(order.findIndex(elem => elem.id === productId), 1);

    // Эти строчки не трогаем, они отвечают за переотрисовку страницы
    renderCart();
    rerenderTotalPrice();
}


function rerenderTotalPrice() {
    // TODO: опишите функционал подсчета общей стоимости заказа
    let totalPrice =  order.reduce((prev, elem) => (prev + elem.price), price = 0);

    // Не меняйте эту строчку
    document.getElementById('total').innerText = totalPrice;
}

// Этот метод остается без изменений
function renderCart() {
    const cart = document.getElementById('basket-items');

    cart.innerHTML = '';
    order.forEach(item => {
        const el = document.createElement('li');
        el.innerText = item.title;
        el.onclick = () => removeFromBasket(item.id);
        cart.appendChild(el);
    })
}