/*
 * =========================================
 * TRANG CHI TIẾT BẤT ĐỘNG SẢN
 * TUẤN NGUYÊN BĐS
 * =========================================
 */

document.addEventListener("DOMContentLoaded", function () {

    const container =
        document.getElementById("property-detail-app");

    if (
        !container ||
        typeof properties === "undefined"
    ) {
        return;
    }


    /*
     * =========================================
     * LẤY SLUG TỪ URL HIỆN TẠI
     * =========================================
     */

    const pathParts =
        window.location.pathname
            .split("/")
            .filter(Boolean);

    const params =
    new URLSearchParams(window.location.search);

const idFromQuery =
    params.get("id") || "";

const currentSlug =
    idFromQuery ||
    pathParts[pathParts.length - 1] ||
    "";


    /*
     * =========================================
     * LẤY SLUG TỪ URL TRONG PROPERTIES.JS
     * =========================================
     */

    function getPropertySlug(property) {

        if (!property.url) {
            return property.id || "";
        }

        const cleanUrl =
            property.url
                .split("?")[0]
                .split("#")[0]
                .replace(/\/+$/, "");

        const parts =
            cleanUrl
                .split("/")
                .filter(Boolean);

        return (
            parts[parts.length - 1] ||
            property.id ||
            ""
        );
    }


    /*
     * =========================================
     * TÌM SẢN PHẨM
     * =========================================
     */

    const property =
        properties.find(function (item) {

            return (
                item.id === currentSlug ||
                getPropertySlug(item) === currentSlug
            );

        });


    /*
     * =========================================
     * KHÔNG TÌM THẤY
     * =========================================
     */

    if (!property) {

        container.innerHTML = `
            <main class="article">

                <h1>
                    Không tìm thấy bất động sản
                </h1>

                <p>
                    Sản phẩm này hiện chưa có dữ liệu
                    hoặc đường dẫn chưa chính xác.
                </p>

                <a
                    class="button"
                    href="/tuannguyen-batdongsan/bat-dong-san/">
                    Xem bất động sản
                </a>

            </main>
        `;

        return;
    }


    /*
     * =========================================
     * HÀM HỖ TRỢ
     * =========================================
     */

    function valueOrDefault(value, fallback = "Liên hệ") {

        if (
            value === undefined ||
            value === null ||
            String(value).trim() === ""
        ) {
            return fallback;
        }

        return value;
    }


    function createInfoRow(icon, label, value) {

        if (
            value === undefined ||
            value === null ||
            String(value).trim() === ""
        ) {
            return "";
        }

        return `
            <p>
                ${icon} ${label}:
                <strong>${value}</strong>
            </p>
        `;
    }


    /*
     * =========================================
     * ẢNH
     * =========================================
     */

    let images = [];

    if (
        Array.isArray(property.images) &&
        property.images.length > 0
    ) {

        images = property.images;

    } else if (property.image) {

        images = [property.image];

    }


    const imagesHtml =
        images
            .map(function (image, index) {

                return `
                    <img
                        class="article-image"
                        src="${image}"
                        alt="${property.title} - hình ${index + 1}"
                        loading="lazy">

                    <div class="image-caption">
                        Hình ảnh thực tế ${property.title}
                    </div>
                `;

            })
            .join("");


    /*
     * =========================================
     * VIDEO
     * =========================================
     */

    let videoHtml = "";

    if (
        property.videoId &&
        String(property.videoId).trim() !== ""
    ) {

        videoHtml = `
            <div class="property-video">

                <h2>
                    Video thực tế bất động sản
                </h2>

                <div class="video-wrapper">

                    <iframe
                        src="https://www.youtube.com/embed/${property.videoId}"
                        title="Video thực tế ${property.title}"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>

                </div>

            </div>
        `;
    }


    /*
     * =========================================
     * NỘI DUNG
     * =========================================
     */

    const summary =
        valueOrDefault(
            property.summary,
            property.description
        );

    const content =
        valueOrDefault(
            property.content,
            property.description
        );

    const highlights =
        valueOrDefault(
            property.highlights,
            ""
        );


    const highlightsHtml =
        highlights
            ? `
                <h2>Ưu điểm nổi bật</h2>

                <p>
                    ${highlights}
                </p>
            `
            : "";


    /*
     * =========================================
     * THÔNG TIN CHO THUÊ
     * =========================================
     */

    let rentalInfoHtml = "";

    if (property.type === "cho-thue") {

        rentalInfoHtml = `
            ${createInfoRow(
                "💰",
                "Đặt cọc",
                property.deposit
            )}

            ${createInfoRow(
                "📅",
                "Thời hạn thuê",
                property.leaseTerm
            )}

            ${createInfoRow(
                "🛋",
                "Nội thất",
                property.furniture
            )}
        `;
    }


    /*
     * =========================================
     * RENDER TRANG CHI TIẾT
     * =========================================
     */

    container.innerHTML = `

        <div class="breadcrumb">

            <a href="/tuannguyen-batdongsan/">
                Trang chủ
            </a>

            &gt;

            <a href="/tuannguyen-batdongsan/bat-dong-san/">
                Bất động sản
            </a>

            &gt;

            <a href="/tuannguyen-batdongsan/bat-dong-san/${property.type}/">
                ${property.typeName}
            </a>

            &gt;

            <span>
                ${property.title}
            </span>

        </div>


        <div class="content-layout">


            <main class="article">

                <h1>
                    ${property.title}
                </h1>

                <div class="article-meta">
                    Tuấn Nguyên BĐS
                </div>


                <p class="article-summary">
                    ${summary}
                </p>


                ${imagesHtml}


                <h2>
                    Thông tin bất động sản
                </h2>

                <p>
                    Loại hình:
                    ${property.typeName}<br>

                    Khu vực:
                    ${property.locationName}<br>

                    Giá:
                    ${property.price}
                </p>


                <h2>
                    Mô tả
                </h2>

                <p>
                    ${content}
                </p>


                ${highlightsHtml}


                ${videoHtml}


                <h2 id="lien-he">
                    Liên hệ xem bất động sản
                </h2>

                <p>
                    Khách hàng quan tâm vui lòng liên hệ
                    Tuấn Nguyên Bất Động Sản để nhận thêm
                    thông tin và hẹn xem bất động sản thực tế.
                </p>

                <div class="contact-buttons">

                    <a
                        class="button"
                        href="tel:0843156768">
                        📞 Gọi 084 315 67 68
                    </a>

                    <a
                        class="button zalo-button"
                        href="https://zalo.me/0843156768"
                        target="_blank"
                        rel="noopener">
                        💬 Zalo
                    </a>

                </div>

            </main>


            <aside class="sidebar">

                <div class="sidebar-box property-info">

                    <h3>
                        THÔNG TIN BẤT ĐỘNG SẢN
                    </h3>

                    ${createInfoRow(
                        "📍",
                        "Khu vực",
                        property.locationName
                    )}

                    ${createInfoRow(
                        "📐",
                        "Diện tích",
                        property.area
                    )}

                    ${createInfoRow(
                        "🏡",
                        "Thổ cư",
                        property.residentialArea
                    )}

                    ${createInfoRow(
                        "↔",
                        "Mặt tiền",
                        property.frontage
                    )}

                    ${createInfoRow(
                        "🧭",
                        "Hướng",
                        property.direction
                    )}

                    ${createInfoRow(
                        "🛣",
                        "Đường",
                        property.road
                    )}

                    ${createInfoRow(
                        "📕",
                        "Pháp lý",
                        property.legal
                    )}

                    ${rentalInfoHtml}


                    <div class="property-price">
                        ${valueOrDefault(
                            property.price
                        )}
                    </div>


                    <div class="sidebar-contact">

                        <a
                            class="button"
                            href="tel:0843156768">
                            📞 Gọi ngay
                        </a>

                        <a
                            class="button zalo-button"
                            href="https://zalo.me/0843156768"
                            target="_blank"
                            rel="noopener">
                            💬 Zalo
                        </a>

                    </div>

                </div>

            </aside>


        </div>
    `;

});
