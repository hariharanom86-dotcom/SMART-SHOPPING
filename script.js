/* SMART SHOPPING - SHARED JAVASCRIPT FOR ALL COLLECTION PAGES */

document.addEventListener("DOMContentLoaded", () => {

    const CART_KEY = "smartShoppingCartCount";
    const WISHLIST_KEY = "smartShoppingWishlist";

    // Product Elements

    const productGrid =
        document.getElementById("productGrid") ||
        document.querySelector(".product-grid");

    const products = productGrid
        ? Array.from(productGrid.querySelectorAll(".product-card"))
        : [];

    const originalOrder = [...products];

    // Common Elements

    const notification =
        document.getElementById("notification-popup");

    const closeNotification =
        document.getElementById("closeNotification");

    const shopMenu =
        document.querySelector(".shop-menu");

    const shopToggle =
        document.getElementById("shopToggle");

    const searchInput =
        document.getElementById("searchInput");

    const sortSelect =
        document.getElementById("sortSelect");

    const priceRange =
        document.getElementById("priceRange");

    const priceValue =
        document.getElementById("priceValue");

    const clearFilters =
        document.getElementById("clearFilters");

    const productCount =
        document.getElementById("productCount");

    const noProducts =
        document.getElementById("noProducts");

    const cartCount =
        document.getElementById("cartCount");

    const wishlistCount =
        document.getElementById("wishlistCount");

    // Filter Elements

    const categoryFilters =
        Array.from(
            document.querySelectorAll(".category-filter")
        );

    const colorFilters =
        Array.from(
            document.querySelectorAll(
                ".color-filter, .colour-filter"
            )
        );

    const sizeFilters =
        Array.from(
            document.querySelectorAll(".size-filter")
        );

    // Cart Storage

    let cartItems = Number(
        localStorage.getItem(CART_KEY) || 0
    );

    if (!Number.isFinite(cartItems) || cartItems < 0) {
        cartItems = 0;
    }

    // Wishlist Storage

    let savedWishlist = [];

    try {

        savedWishlist = JSON.parse(
            localStorage.getItem(WISHLIST_KEY) || "[]"
        );

        if (!Array.isArray(savedWishlist)) {
            savedWishlist = [];
        }

    } catch (error) {

        savedWishlist = [];

    }

    let toastTimer;

    /* ==============================
       TOAST MESSAGE
       ============================== */

    function showToast(message) {

        let toast =
            document.querySelector(".shop-toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "shop-toast";

            toast.setAttribute("role", "status");

            toast.setAttribute("aria-live", "polite");

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        window.clearTimeout(toastTimer);

        toastTimer = window.setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);

    }

    /* ==============================
       CART COUNTER
       ============================== */

    function updateCartCounter() {

        if (cartCount) {

            cartCount.textContent =
                String(cartItems);

        }

        localStorage.setItem(
            CART_KEY,
            String(cartItems)
        );

    }

    /* ==============================
       PRODUCT KEY
       ============================== */

    function productKey(card) {

        const name =
            card.dataset.name ||
            card.querySelector("h3")?.textContent ||
            "product";

        return `${card.dataset.category || "item"}-${name}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

    }

    /* ==============================
       WISHLIST COUNTER
       ============================== */

    function updateWishlistCounter() {

        if (wishlistCount) {

            wishlistCount.textContent =
                String(savedWishlist.length);

        }

        localStorage.setItem(
            WISHLIST_KEY,
            JSON.stringify(savedWishlist)
        );

    }

    /* ==============================
       FILTER VALUES
       ============================== */

    function selectedValues(inputs) {

        return inputs

            .filter((input) => input.checked)

            .map((input) =>
                input.value.trim().toLowerCase()
            );

    }

    /* ==============================
       PRODUCT NAME
       ============================== */

    function getProductName(card) {

        return (

            card.dataset.name ||

            card.querySelector("h3")?.textContent ||

            ""

        )
            .trim()
            .toLowerCase();

    }

    /* ==============================
       PRODUCT COUNT
       ============================== */

    function updateProductCount(visibleCount) {

        if (!productCount) return;

        productCount.innerHTML = `
            Showing
            <span class="count-number">
                ${visibleCount}
            </span>
            of ${products.length} products
        `;

    }

    /* ==============================
       APPLY FILTERS
       ============================== */

    function applyFilters() {

        if (!productGrid) return;

        const categories =
            selectedValues(categoryFilters);

        const colors =
            selectedValues(colorFilters);

        const sizes =
            selectedValues(sizeFilters);

        const maximumPrice = priceRange
            ? Number(priceRange.value)
            : Infinity;

        const searchText = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const visibleProducts = [];

        products.forEach((card) => {

            const category =
                (card.dataset.category || "").toLowerCase();

            const color =
                (
                    card.dataset.color ||
                    card.dataset.colour ||
                    ""
                ).toLowerCase();

            const productSizes =
                (card.dataset.size || "")

                    .split(",")

                    .map((size) =>
                        size.trim().toLowerCase()
                    );

            const price =
                Number(card.dataset.price || 0);

            const searchableText = [

                getProductName(card),

                category.replace(/-/g, " "),

                card.querySelector(".product-category")
                    ?.textContent || ""

            ]
                .join(" ")
                .toLowerCase();

            // Category Matching

            const matchesCategory =
                categories.length === 0 ||
                categories.includes(category);

            // Colour Matching

            const matchesColor =
                colors.length === 0 ||
                colors.includes(color);

            // Size Matching

            const matchesSize =
                sizes.length === 0 ||
                sizes.some((size) =>
                    productSizes.includes(size)
                );

            // Price Matching

            const matchesPrice =
                price <= maximumPrice;

            // Search Matching

            const matchesSearch =
                searchableText.includes(searchText);

            // Final Result

            const isMatch =
                matchesCategory &&
                matchesColor &&
                matchesSize &&
                matchesPrice &&
                matchesSearch;

            card.hidden = !isMatch;

            if (isMatch) {

                visibleProducts.push(card);

            }

        });

        /* SORT PRODUCTS */

        const sortValue = sortSelect
            ? sortSelect.value
            : "default";

        if (sortValue === "low-high") {

            visibleProducts.sort((a, b) => {

                return Number(a.dataset.price) -
                    Number(b.dataset.price);

            });

        } else if (sortValue === "high-low") {

            visibleProducts.sort((a, b) => {

                return Number(b.dataset.price) -
                    Number(a.dataset.price);

            });

        } else if (sortValue === "name") {

            visibleProducts.sort((a, b) => {

                return getProductName(a).localeCompare(
                    getProductName(b)
                );

            });

        } else {

            visibleProducts.sort((a, b) => {

                return originalOrder.indexOf(a) -
                    originalOrder.indexOf(b);

            });

        }

        // Reorder Visible Products

        visibleProducts.forEach((card) => {

            productGrid.appendChild(card);

        });

        // Update Product Count

        updateProductCount(
            visibleProducts.length
        );

        // No Products Message

        if (noProducts) {

            noProducts.style.display =
                visibleProducts.length === 0
                    ? "block"
                    : "none";

        }

    }

    /* ==============================
       NOTIFICATION CLOSE
       ============================== */

    if (notification && closeNotification) {

        closeNotification.addEventListener(
            "click",
            () => {

                notification.hidden = true;

            }
        );

    }

    /* ==============================
       SHOP DROPDOWN
       ============================== */

    function closeShopMenu() {

        if (!shopMenu || !shopToggle) return;

        shopMenu.classList.remove("is-open");

        shopToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    if (shopMenu && shopToggle) {

        shopToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const isOpen =
                    shopMenu.classList.toggle("is-open");

                shopToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

        // Close When Clicking Outside

        document.addEventListener(
            "click",
            (event) => {

                if (!shopMenu.contains(event.target)) {

                    closeShopMenu();

                }

            }
        );

        // Close With Escape Key

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    closeShopMenu();

                }

            }
        );

    }

    /* ==============================
       FILTER EVENT LISTENERS
       ============================== */

    categoryFilters.forEach((input) => {

        input.addEventListener(
            "change",
            applyFilters
        );

    });

    colorFilters.forEach((input) => {

        input.addEventListener(
            "change",
            applyFilters
        );

    });

    sizeFilters.forEach((input) => {

        input.addEventListener(
            "change",
            applyFilters
        );

    });

    /* ==============================
       PRICE RANGE
       ============================== */

    if (priceRange) {

        if (priceValue) {

            priceValue.textContent =
                priceRange.value;

        }

        priceRange.addEventListener(
            "input",
            () => {

                if (priceValue) {

                    priceValue.textContent =
                        priceRange.value;

                }

                applyFilters();

            }
        );

    }

    /* ==============================
       SEARCH
       ============================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }

    /* ==============================
       SORTING
       ============================== */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            applyFilters
        );

    }

    /* ==============================
       CLEAR ALL FILTERS
       ============================== */

    if (clearFilters) {

        clearFilters.addEventListener(
            "click",
            () => {

                // Uncheck All Filters

                [
                    ...categoryFilters,
                    ...colorFilters,
                    ...sizeFilters
                ].forEach((input) => {

                    input.checked = false;

                });

                // Reset Price

                if (priceRange) {

                    priceRange.value =
                        priceRange.max;

                    if (priceValue) {

                        priceValue.textContent =
                            priceRange.value;

                    }

                }

                // Clear Search

                if (searchInput) {

                    searchInput.value = "";

                }

                // Reset Sorting

                if (sortSelect) {

                    sortSelect.value = "default";

                }

                applyFilters();

            }
        );

    }

    /* ==============================
       RESTORE WISHLIST
       ============================== */

    products.forEach((card) => {

        const button =
            card.querySelector(".wishlist-btn");

        if (!button) return;

        const isSaved =
            savedWishlist.includes(productKey(card));

        const icon =
            button.querySelector("i");

        button.classList.toggle(
            "active",
            isSaved
        );

        button.setAttribute(
            "aria-pressed",
            String(isSaved)
        );

        if (icon) {

            icon.classList.toggle(
                "fa-solid",
                isSaved
            );

            icon.classList.toggle(
                "fa-regular",
                !isSaved
            );

        }

    });

    /* UPDATE COUNTERS */

    updateCartCounter();

    updateWishlistCounter();

    /* ==============================
       PRODUCT BUTTON ACTIONS
       ============================== */

    if (productGrid) {

        productGrid.addEventListener(
            "click",
            (event) => {

                const addButton =
                    event.target.closest(
                        ".add-cart, .add-to-cart"
                    );

                const buyButton =
                    event.target.closest(".buy-now");

                const wishlistButton =
                    event.target.closest(".wishlist-btn");

                /* ADD TO CART */

                if (addButton) {

                    cartItems += 1;

                    updateCartCounter();

                    const oldText =
                        addButton.textContent;

                    addButton.textContent =
                        "Added!";

                    addButton.disabled = true;

                    window.setTimeout(() => {

                        addButton.textContent =
                            oldText;

                        addButton.disabled = false;

                    }, 900);

                    showToast(
                        "Product added to your cart."
                    );

                }

                /* BUY NOW */

                if (buyButton) {

                    const card =
                        buyButton.closest(".product-card");

                    if (!card) return;

                    const productName =
                        card.dataset.name ||
                        card.querySelector("h3")
                            ?.textContent.trim() ||
                        "Product";

                    const productPrice =
                        Number(card.dataset.price || 0);

                    const orderItem = {
                        name: productName,
                        price: productPrice
                    };

                    localStorage.setItem(
                        "orderItem",
                        JSON.stringify(orderItem)
                    );

                    window.location.href = "order.html";

                }

                /* WISHLIST */

                if (wishlistButton) {

                    const card =
                        wishlistButton.closest(".product-card");

                    if (!card) return;

                    const key =
                        productKey(card);

                    const isSaved =
                        savedWishlist.includes(key);

                    const icon =
                        wishlistButton.querySelector("i");

                    if (isSaved) {

                        savedWishlist =
                            savedWishlist.filter(
                                (item) => item !== key
                            );

                    } else {

                        savedWishlist.push(key);

                    }

                    wishlistButton.classList.toggle(
                        "active",
                        !isSaved
                    );

                    wishlistButton.setAttribute(
                        "aria-pressed",
                        String(!isSaved)
                    );

                    if (icon) {

                        icon.classList.toggle(
                            "fa-solid",
                            !isSaved
                        );

                        icon.classList.toggle(
                            "fa-regular",
                            isSaved
                        );

                    }

                    updateWishlistCounter();

                    showToast(
                        isSaved
                            ? "Removed from wishlist."
                            : "Added to wishlist."
                    );

                }

            }
        );

    }

    /* ==============================
       PRODUCT IMAGE ERROR HANDLING
       ============================== */

    document.querySelectorAll(
        ".product-image img"
    ).forEach((img) => {

        img.addEventListener(
            "error",
            () => {

                img.hidden = true;

                const wrapper =
                    img.closest(".product-image");

                if (
                    wrapper &&
                    !wrapper.querySelector(".image-fallback")
                ) {

                    const fallback =
                        document.createElement("div");

                    fallback.className =
                        "image-fallback";

                    fallback.textContent =
                        img.alt ||
                        "Product image unavailable";

                    wrapper.prepend(fallback);

                }

            },
            { once: true }
        );

    });

    /* INITIAL FILTER LOAD */

    applyFilters();

});