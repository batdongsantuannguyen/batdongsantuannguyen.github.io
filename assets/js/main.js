document.addEventListener("DOMContentLoaded", function () {

    // Tìm kiếm bất động sản
    const searchButton = document.querySelector(".search-button");

    if (searchButton) {

        searchButton.addEventListener("click", function () {

            const type = document.querySelector("#property-type")?.value || "";
            const location = document.querySelector("#property-location")?.value || "";
            const keyword = document.querySelector("#keyword")?.value.toLowerCase() || "";

            const products = document.querySelectorAll(".product");

            products.forEach(function (product) {

                const productText = product.innerText.toLowerCase();

                let show = true;

                if (type && type !== "all") {
                    if (!productText.includes(type.toLowerCase())) {
                        show = false;
                    }
                }

                if (location && location !== "all") {
                    if (!productText.includes(location.toLowerCase())) {
                        show = false;
                    }
                }

                if (keyword) {
                    if (!productText.includes(keyword)) {
                        show = false;
                    }
                }

                product.style.display = show ? "" : "none";

            });

        });

    }


    // Nút gọi điện
    const phoneButtons = document.querySelectorAll(".phone-button");

    phoneButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "tel:0843156768";

        });

    });


    // Hiệu ứng khi cuộn trang
    window.addEventListener("scroll", function () {

        const header = document.querySelector("header");

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

});
