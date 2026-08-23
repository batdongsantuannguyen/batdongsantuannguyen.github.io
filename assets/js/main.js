/*
 * =========================================
 * TÌM KIẾM BẤT ĐỘNG SẢN
 * =========================================
 */

function searchProperty() {

    const type =
        document.getElementById("propertyType").value;

    const location =
        document.getElementById("propertyLocation").value;

    const keyword =
        document.getElementById("propertyKeyword").value
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


        let matchType = true;
        let matchLocation = true;
        let matchKeyword = true;


        /*
         * KIỂM TRA LOẠI
         */

        if (type !== "") {

            matchType =
                productType === type;

        }


        /*
         * KIỂM TRA KHU VỰC
         */

        if (location !== "") {

            matchLocation =
                productLocation === location;

        }


        /*
         * KIỂM TRA TỪ KHÓA
         */

        if (keyword !== "") {

            matchKeyword =
                productText.includes(keyword);

        }


        /*
         * HIỂN THỊ
         */

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


    /*
     * KHÔNG TÌM THẤY
     */

    if (found === 0) {

        alert(
            "Không tìm thấy bất động sản phù hợp. Vui lòng thử lại."
        );

    }

}


/*
 * =========================================
 * HIỂN THỊ SẢN PHẨM
 * LẤY TỪ properties.js
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


    /*
     * XÁC ĐỊNH TRANG HIỆN TẠI
     */

    const path =
        window.location.pathname;


    let currentType = "";


    /*
     * TRANG NHÀ
     */

    if (
        path.includes("/bat-dong-san/nha/")
    ) {

        currentType = "nha";

    }


    /*
     * TRANG ĐẤT
     */

    else if (
        path.includes("/bat-dong-san/dat/")
    ) {

        currentType = "dat";

    }


    /*
     * TRANG VILLA
     */

    else if (
        path.includes("/bat-dong-san/villa/")
    ) {

        currentType = "villa";

    }


    /*
     * TRANG KHÁCH SẠN
     */

    else if (
        path.includes("/bat-dong-san/khach-san/")
    ) {

        currentType = "khach-san";

    }


    /*
     * XÓA SẢN PHẨM CŨ
     */

    container.innerHTML = "";


    /*
     * LẤY SẢN PHẨM TỪ KHO DỮ LIỆU
     */

    properties.forEach(function(property) {


        /*
         * NẾU ĐANG Ở TRANG DANH MỤC
         * CHỈ HIỂN THỊ ĐÚNG LOẠI
         */

        if (
            currentType !== "" &&
            property.type !== currentType
        ) {

            return;

        }


        /*
         * TẠO THẺ SẢN PHẨM
         */

        const article =
            document.createElement("article");

        article.className = "product";


        /*
         * DỮ LIỆU CHO BỘ LỌC
         */

        article.dataset.type =
            property.type;

        article.dataset.location =
            property.location;


        /*
         * NỘI DUNG SẢN PHẨM
         */

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
                    href="${property.url}">

                    Xem chi tiết →

                </a>

            </div>

        `;


        /*
         * ĐƯA SẢN PHẨM VÀO TRANG
         */

        container.appendChild(article);

    });

}


/*
 * =========================================
 * CHẠY KHI TRANG ĐÃ TẢI XONG
 * =========================================
 */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderProperties();

    }
);
