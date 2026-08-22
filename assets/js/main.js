function searchProperty() {

    const type = document.getElementById("propertyType").value;
    const location = document.getElementById("propertyLocation").value;
    const keyword = document.getElementById("propertyKeyword").value.toLowerCase();

    const products = document.querySelectorAll(".product");

    products.forEach(function(product) {

        const text = product.innerText.toLowerCase();

        let show = true;

        // Lọc loại bất động sản
        if (type !== "" && !text.includes(type)) {
            show = false;
        }

        // Lọc khu vực
        if (location !== "" && !text.includes(location)) {
            show = false;
        }

        // Lọc từ khóa
        if (keyword !== "" && !text.includes(keyword)) {
            show = false;
        }

        if (show) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

}
