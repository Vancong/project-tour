//sile
const tourImage = document.querySelector('.tour-image');
if (tourImage) {

    const swiper = new Swiper(".tour-image", {
        cssMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
    });
}

//cart

//alert
const alertAddCart = () => {
    const alert = document.querySelector('[alert-add-cart-susscess]');
    if (alert) {
        alert.classList.remove("alert-hidden");
        setTimeout(() => {
            alert.classList.add("alert-hidden");
        }, 3000)
    }
};

//hien thi so luong tour trong cart
const showMiniCart = () => {
    const miniCart = document.querySelector("[mini-cart]");
    if (miniCart) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        miniCart.innerHTML = cart.length;

    }
}
showMiniCart();

const cart = localStorage.getItem("cart");
if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
}
const formCart = document.querySelector("[form-add-to-cart]");
if (formCart) {
    formCart.addEventListener("submit", (event) => {
        event.preventDefault();

        const tourId = parseInt(formCart.getAttribute("tour-id"));
        const quantity = parseInt(formCart.quantity.value);
        if (tourId && quantity > 0) {
            const cart = JSON.parse(localStorage.getItem("cart"));
            const existTour = cart.find(item => item.tourId == tourId);
            if (existTour) {
                existTour.quantity = quantity + existTour.quantity;
            } else {
                cart.push({
                    tourId: tourId,
                    quantity: quantity
                })
            }


            localStorage.setItem("cart", JSON.stringify(cart));
            alertAddCart();
            showMiniCart();
        }
    })
}

//end cart