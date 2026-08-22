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
         * KIỂM TRA LOẠI BẤT ĐỘNG SẢN
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
         * HIỂN THỊ SẢN PHẨM
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
