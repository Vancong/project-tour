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



const cart = localStorage.getItem("cart");
if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
}
//hien thi so luong tour trong cart
const showMiniCart = () => {
    const miniCart = document.querySelector("[mini-cart]");
    if (miniCart) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        miniCart.innerHTML = cart.length;

    }
}
showMiniCart();

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

//gui data cart len backend
const tableCart = document.querySelector("[table-cart]");
if (tableCart) {

    fetch("/cart/list-json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: localStorage.getItem("cart")
        })
        .then(res => res.json())
        .then(data => {
            const htmlArray = data.tours.map((item, index) =>
                `<tr>
                <td>${index + 1}</td>
                <td>
                  <img src="${item.image}" alt="${item.title}" width="80px" />
                </td>
                <td>
                  <a href="/tours/detail/${item.slug}">${item.title}</a>
                </td>
                <td>
                  ${item.price.toLocaleString()}đ
                </td>
                <td>
                  <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px;" />
                </td>
                <td>
                  ${item.total.toLocaleString()}đ
                </td>
                <td>
                  <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
                </td>
              </tr>
            `);

            const tbody = tableCart.querySelector("tbody");
            tbody.innerHTML = htmlArray.join("");

            const totalPrice = document.querySelector("[total-price]");
            totalPrice.innerHTML = data.total.toLocaleString();
        })
}