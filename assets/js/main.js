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
 * ĐỌC DỮ LIỆU TỪ properties.json
 * =========================================
 */

async function loadProperties() {

    const response = await fetch(
        "/tuannguyen-batdongsan/assets/data/properties.json",
        {
            cache: "no-store"
        }
    );

    if (!response.ok) {

        throw new Error(
            "Không thể tải properties.json"
        );

    }

    return await response.json();

}


/*
 * =========================================
 * HIỂN THỊ SẢN PHẨM
 * =========================================
 */

async function renderProperties() {

    const container =
        document.querySelector(".products");

    if (!container) {

        return;

    }

    let properties = [];

    try {

        properties =
            await loadProperties();

    } catch (error) {

        console.error(
            "Lỗi tải dữ liệu bất động sản:",
            error
        );

        container.innerHTML = `
            <p>
                Không thể tải dữ liệu bất động sản.
            </p>
        `;

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

    else if (
        path.includes("/bat-dong-san/cho-thue/")
    ) {

        currentType = "cho-thue";

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

        article.className =
            "product";

        article.dataset.type =
            property.type || "";

        article.dataset.location =
            property.location || "";


        /*
         * =========================================
         * URL CHI TIẾT SẢN PHẨM
         * =========================================
         */

        let productUrl = "#";


        /*
         * CHO THUÊ:
         * Tạm giữ URL hiện tại
         * để không làm thay đổi trang đang chạy.
         */

        if (
            property.type === "cho-thue"
        ) {

            productUrl =
                property.url || "#";

            if (
                productUrl !== "#" &&
                !productUrl.startsWith("http")
            ) {

                productUrl =
                    new URL(
                        productUrl,
                        window.location.origin +
                        "/tuannguyen-batdongsan/"
                    ).href;

            }

        }

        /*
         * CÁC DANH MỤC CÒN LẠI:
         * Dùng trang chi tiết tự động
         */

        else {

            productUrl =
                "/tuannguyen-batdongsan/" +
                "bat-dong-san/chi-tiet/?id=" +
                encodeURIComponent(
                    property.id
                );

        }


        article.innerHTML = `

            <img
                src="${property.image || ""}"
                alt="${property.title || ""}"
                loading="lazy"
            >

            <div class="product-content">

                <div class="product-tag">
                    ${property.typeName || ""}
                </div>

                <h3>
                    ${property.title || ""}
                </h3>

                <div class="price">
                    ${property.price || "Liên hệ"}
                </div>

                <div class="location">
                    📍 ${property.locationName || ""}
                </div>

                <p>
                    ${property.description || ""}
                </p>

                <a
                    class="product-button"
                    href="${productUrl}"
                >
                    Xem chi tiết →
                </a>

            </div>

        `;


        container.appendChild(
            article
        );

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
