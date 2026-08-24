/*
 * =========================================
 * TÌM KIẾM BẤT ĐỘNG SẢN
 * =========================================
 */

function searchProperty() {

    const typeElement =
        document.getElementById("propertyType");

    const locationElement =
        document.getElementById("propertyLocation");

    const keywordElement =
        document.getElementById("propertyKeyword");

    if (
        !typeElement ||
        !locationElement ||
        !keywordElement
    ) {
        return;
    }

    const type =
        typeElement.value;

    const location =
        locationElement.value;

    const keyword =
        keywordElement.value
        .toLowerCase()
        .trim();

    const products =
        document.querySelectorAll(".product");

    let found = 0;

    products.forEach(function(product) {

        const productType =
            product.dataset.type || "";

        const productLocation =
            product.dataset.location || "";

        const productText =
            product.innerText.toLowerCase();

        const matchType =
            type === "" ||
            productType === type;

        const matchLocation =
            location === "" ||
            productLocation === location;

        const matchKeyword =
            keyword === "" ||
            productText.includes(keyword);

        if (
            matchType &&
            matchLocation &&
            matchKeyword
        ) {

            product.style.display = "";

            found++;

        } else {

            product.style.display = "none";

        }

    });

    if (found === 0) {

        alert(
            "Không tìm thấy bất động sản phù hợp. Vui lòng thử lại."
        );

    }

}


/*
 * =========================================
 * HIỂN THỊ SẢN PHẨM
 * =========================================
 */

function renderProperties() {

    const container =
        document.querySelector(".products");

    if (
        !container ||
        typeof properties === "undefined"
    ) {

        return;

    }

    const path =
        window.location.pathname;

    let currentType = "";

    if (
        path.includes("/bat-dong-san/nha/")
    ) {

        currentType = "nha";

    }

    else if (
        path.includes("/bat-dong-san/dat/")
    ) {

        currentType = "dat";

    }

    else if (
        path.includes("/bat-dong-san/villa/")
    ) {

        currentType = "villa";

    }

    else if (
        path.includes("/bat-dong-san/khach-san/")
    ) {

        currentType = "khach-san";

    }

    else if (
        path.includes("/bat-dong-san/can-ho/")
    ) {

        currentType = "can-ho";

    }

    else if (
        path.includes("/bat-dong-san/homestay/")
    ) {

        currentType = "homestay";

    }


    container.innerHTML = "";


    properties.forEach(function(property) {

        if (
            currentType !== "" &&
            property.type !== currentType
        ) {

            return;

        }

        const article =
            document.createElement("article");

        article.className = "product";

        article.dataset.type =
            property.type;

        article.dataset.location =
            property.location;


        /*
         * URL CHI TIẾT
         */

       let productUrl =
    property.url || "#";

        article.innerHTML = `

            <img
                src="${property.image}"
                alt="${property.title}"
                loading="lazy"
            >

            <div class="product-content">

                <div class="product-tag">
                    ${property.typeName}
                </div>

                <h3>
                    ${property.title}
                </h3>

                <div class="price">
                    ${property.price}
                </div>

                <div class="location">
                    📍 ${property.locationName} – Lâm Đồng
                </div>

                <p>
                    ${property.description}
                </p>

                <a
                    class="product-button"
                    href="${productUrl}">

                    Xem chi tiết →

                </a>

            </div>

        `;

        container.appendChild(article);

    });

}


/*
 * =========================================
 * CHẠY KHI TRANG ĐÃ TẢI
 * =========================================
 */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderProperties();

    }
);
