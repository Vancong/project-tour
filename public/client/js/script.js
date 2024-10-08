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
const cart = localStorage.getItem("cart");
if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
}
const formCart = document.querySelector('[form-add-to-cart]');
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
        }
    })
}


//end cart