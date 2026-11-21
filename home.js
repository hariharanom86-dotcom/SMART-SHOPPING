document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar Badge Counters (Heart = 0, Bag = 1)
    const badges = document.querySelectorAll(".icon-btn .badge");
    const wishlistBadge = badges[0];
    const cartBadge = badges[1];

    let wishlistCount = 0;
    let cartCount = 0;

    // 2. Wishlist Heart Toggle
    const wishlistBtns = document.querySelectorAll(".wishlist-btn");
    wishlistBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const icon = btn.querySelector("i");
            if (icon.classList.contains("fa-regular")) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
                icon.style.color = "#E63946";
                wishlistCount++;
            } else {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
                icon.style.color = "";
                wishlistCount--;
            }
            if (wishlistBadge) wishlistBadge.textContent = wishlistCount;
        });
    });

    // 3. Save for Later Button
    const saveBtns = document.querySelectorAll(".btn-save");
    saveBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.textContent === "Save for Later") {
                btn.textContent = "Saved ✓";
                btn.style.backgroundColor = "#212529";
                btn.style.color = "#D4AF37";
            } else {
                btn.textContent = "Save for Later";
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }
        });
    });

    // 4. Buy Now Button 
const buyBtns = document.querySelectorAll(".btn-buy");
buyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");
        const productName = card.querySelector("h4").textContent.trim();
        const price = card.querySelector(".current-price").textContent.replace(/[₹,\s]/g, "");

        localStorage.setItem("orderItem", JSON.stringify({
            name: productName,
            price: price
        }));

        cartCount++;
        if (cartBadge) cartBadge.textContent = cartCount;

        window.location.href = "order.html";
    });
    
});

    // 5. Live Search Bar Filtering
    const searchInput = document.querySelector(".search-box input");
    const productCards = document.querySelectorAll(".product-card");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();

            productCards.forEach((card) => {
                const title = card.querySelector("h4").textContent.toLowerCase();
                const category = card.querySelector(".category-tag").textContent.toLowerCase();

                if (title.includes(query) || category.includes(query)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // 6. Live Hero Banner Auto-Slider
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (dots[i]) dots[i].classList.remove("active");
        });
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
        if (dots[currentSlide]) dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    if (slides.length > 0) {
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                resetTimer();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlide();
                resetTimer();
            });
        }

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                showSlide(parseInt(dot.dataset.index));
                resetTimer();
            });
        });

        startAutoSlide();
    }
});