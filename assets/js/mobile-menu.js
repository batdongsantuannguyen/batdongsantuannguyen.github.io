/*
 * =========================================
 * MENU MOBILE
 * =========================================
 */

function setupMobileMenu() {

    const header =
        document.querySelector("header");

    const headerContainer =
        document.querySelector(
            ".header-container"
        );

    const nav =
        headerContainer
            ? headerContainer.querySelector("nav")
            : null;

    if (
        !header ||
        !headerContainer ||
        !nav
    ) {
        return;
    }

    let toggle =
        headerContainer.querySelector(
            ".mobile-menu-toggle"
        );

    if (!toggle) {

        toggle =
            document.createElement("button");

        toggle.className =
            "mobile-menu-toggle";

        toggle.type =
            "button";

        toggle.setAttribute(
            "aria-label",
            "Mở menu"
        );

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        toggle.innerHTML =
            "<span></span><span></span><span></span>";

        headerContainer.appendChild(
            toggle
        );
    }

    toggle.addEventListener(
        "click",
        function () {

            const isOpen =
                header.classList.toggle(
                    "mobile-menu-open"
                );

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            toggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Đóng menu"
                    : "Mở menu"
            );
        }
    );

    nav.addEventListener(
        "click",
        function (event) {

            if (
                event.target.closest("a") &&
                window.innerWidth <= 900
            ) {
                header.classList.remove(
                    "mobile-menu-open"
                );

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    );

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 900) {

                header.classList.remove(
                    "mobile-menu-open"
                );

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    );
}
document.addEventListener(
    "DOMContentLoaded",
    function () {
        setupMobileMenu();
    }
);
