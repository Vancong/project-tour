//sile
const tourImage = document.querySelector('.tour-image');
if (tourImage) {
    console.log(tourImage);
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