/*
 * =========================================
 * TẢI DỮ LIỆU TỪ properties.json
 * =========================================
 */

async function loadProperties() {

    const response = await fetch(
        "/assets/data/properties.json",
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
 * TÊN LOẠI BẤT ĐỘNG SẢN
 * =========================================
 */

function getTypeName(property) {

    if (
        property.typeName &&
        String(property.typeName).trim() !== ""
    ) {
        return property.typeName;
    }

    const typeNames = {
        "nha": "Nhà",
        "dat": "Đất",
        "villa": "Biệt thự",
        "khach-san": "Khách sạn",
        "can-ho": "Căn hộ",
        "homestay": "Homestay",
        "cho-thue": "Cho thuê"
    };

    return (
        typeNames[property.type] ||
        "Bất động sản"
    );
}


/*
 * =========================================
 * TÊN KHU VỰC
 * =========================================
 */

function getLocationName(property) {

    if (
        property.locationName &&
        String(property.locationName).trim() !== ""
    ) {
        return property.locationName;
    }

    const locationNames = {
        "da-lat": "Đà Lạt",
        "duc-trong": "Đức Trọng",
        "bao-loc": "Bảo Lộc",
        "lac-duong": "Lạc Dương",
        "don-duong": "Đơn Dương",
        "xuan-tho-xuan-truong":
            "Xuân Thọ – Xuân Trường",
        "lam-ha": "Lâm Hà"
    };

    return (
        locationNames[property.location] ||
        property.location ||
        ""
    );
}


/*
 * =========================================
 * URL CHI TIẾT SẢN PHẨM
 * =========================================
 */

function getPropertyUrl(property) {

    /*
     * Các sản phẩm Cho thuê cũ
     * nếu đã có URL riêng thì giữ nguyên
     */

    if (
        property.type === "cho-thue" &&
        property.url &&
        String(property.url).trim() !== ""
    ) {

        if (
            property.url.startsWith("http")
        ) {
            return property.url;
        }

        return new URL(
            property.url,
            window.location.origin + "/"
        ).href;
    }


    /*
     * Tất cả sản phẩm mới:
     * tự tạo URL từ ID
     */

    return (
    
        "/bat-dong-san/chi-tiet/?id=" +
        encodeURIComponent(property.id)
    );
}


/*
 * =========================================
 * TÌM KIẾM BẤT ĐỘNG SẢN
 * =========================================
 */

function searchProperty() {

    const typeElement =
        document.getElementById(
            "propertyType"
        );

    const locationElement =
        document.getElementById(
            "propertyLocation"
        );

    const keywordElement =
        document.getElementById(
            "propertyKeyword"
        );

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
        document.querySelectorAll(
            ".product"
        );

    let found = 0;

    products.forEach(
        function (product) {

            const productType =
                product.dataset.type || "";

            const productLocation =
                product.dataset.location || "";

            const productText =
                product.innerText
                    .toLowerCase();

            const matchType =
                type === "" ||
                productType === type;

            const matchLocation =
                location === "" ||
                productLocation === location;

            const matchKeyword =
                keyword === "" ||
                productText.includes(
                    keyword
                );

            if (
                matchType &&
                matchLocation &&
                matchKeyword
            ) {

                product.style.display = "";

                found++;

            } else {

                product.style.display =
                    "none";

            }

        }
    );

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

async function renderProperties() {

    const container =
        document.querySelector(
            ".products"
        );

    if (!container) {
        return;
    }


    let properties = [];

    try {

        properties =
            await loadProperties();

    } catch (error) {

        console.error(
            "Lỗi tải dữ liệu:",
            error
        );

        return;
    }


    const path =
        window.location.pathname;

    let currentType = "";


    if (
        path.includes(
            "/bat-dong-san/nha/"
        )
    ) {

        currentType = "nha";

    }

    else if (
        path.includes(
            "/bat-dong-san/dat/"
        )
    ) {

        currentType = "dat";

    }

    else if (
        path.includes(
            "/bat-dong-san/villa/"
        )
    ) {

        currentType = "villa";

    }

    else if (
        path.includes(
            "/bat-dong-san/khach-san/"
        )
    ) {

        currentType = "khach-san";

    }

    else if (
        path.includes(
            "/bat-dong-san/can-ho/"
        )
    ) {

        currentType = "can-ho";

    }

    else if (
        path.includes(
            "/bat-dong-san/homestay/"
        )
    ) {

        currentType = "homestay";

    }

    else if (
        path.includes(
            "/bat-dong-san/cho-thue/"
        )
    ) {

        currentType = "cho-thue";

    }


    container.innerHTML = "";
const isHomePage =
    path === "/" ||
    path.endsWith("/index.html");

const propertiesToShow =
    isHomePage
        ? properties.slice(0, 8)
        : properties;

    propertiesToShow.forEach(
        function (property) {

            if (
                currentType !== "" &&
                property.type !== currentType
            ) {
                return;
            }


            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "product";


            article.dataset.type =
                property.type || "";


            article.dataset.location =
                property.location || "";


            const typeName =
                getTypeName(property);


            const locationName =
                getLocationName(property);


            const productUrl =
                getPropertyUrl(property);


            article.innerHTML = `

                <img
                    src="${property.image || ""}"
                    alt="${property.title || ""}"
                    loading="lazy"
                >

                <div class="product-content">

                    <div class="product-tag">
                        ${typeName}
                    </div>

                    <h3>
                        ${property.title || ""}
                    </h3>

                    <div class="price">
                        ${property.price || "Liên hệ"}
                    </div>

                    <div class="location">
                        📍 ${locationName}
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

article.style.cursor = "pointer";

article.addEventListener("click", function (event) {

    if (event.target.closest("a")) {
        return;
    }

    window.location.href = productUrl;

});
            container.appendChild(
                article
            );

        }
    );
}


/*
 * =========================================
 * CHẠY KHI TRANG ĐÃ TẢI
 * =========================================
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderProperties();

    }
);
