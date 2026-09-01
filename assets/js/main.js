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
     * Nếu sản phẩm đã có URL tĩnh SEO
     * thì ưu tiên sử dụng URL đó.
     */

    if (
        property.url &&
        String(property.url).trim() !== "" &&
        !String(property.url).includes("/chi-tiet/")
    ) {

        return property.url;

    }


    /*
     * Tạo slug SEO từ ID.
     */

    const slug = String(
        property.id ||
        property.title ||
        "bat-dong-san"
    )
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-+/g, "-");


    const allowedTypes = [
        "nha",
        "dat",
        "villa",
        "khach-san",
        "can-ho",
        "homestay",
        "cho-thue"
    ];


    const type =
        allowedTypes.includes(property.type)
            ? property.type
            : "bat-dong-san";


    return (
        "/bat-dong-san/" +
        type +
        "/" +
        slug +
        "/"
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
    const params =
        new URLSearchParams(
            window.location.search
        );

const currentTag =
    (
        params.get("tag") || ""
    )
        .toLowerCase()
        .trim();
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

/*
 * =========================================
 * XÁC ĐỊNH TRANG CHỦ
 * =========================================
 */

const isHomePage =
    path === "/" ||
    path === "/index.html";

/*
 * Trang chủ:
 * chỉ hiển thị tối đa 8 sản phẩm.
 *
 * Các trang danh mục:
 * giữ toàn bộ dữ liệu để currentType
 * lọc đúng Nhà, Đất, Villa...
 */

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
                if (currentTag !== "") {
    
                const tags =
                    Array.isArray(property.tags)
                        ? property.tags
                        : [];
    
                const normalizedTags =
                    tags.map(tag =>
                        String(tag)
                            .toLowerCase()
                            .trim()
                    );
    
                const searchableText = [
                    property.title,
                    property.description,
                    property.locationName,
                    property.address,
                    ...normalizedTags
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
    
                if (
                    !normalizedTags.includes(currentTag) &&
                    !searchableText.includes(currentTag)
                ) {
                    return;
                }
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
