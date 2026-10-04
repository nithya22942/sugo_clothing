/* =========================================
   SU​​GO CLOTHING WEBSITE
   JAVASCRIPT
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const header = document.getElementById("header");

const menuBtn = document.getElementById("menuBtn");

const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-link");

const searchBtn = document.getElementById("searchBtn");

const searchBox = document.getElementById("searchBox");

const searchInput = document.getElementById("searchInput");

const closeSearch = document.getElementById("closeSearch");

const cartBtn = document.getElementById("cartBtn");

const cartModal = document.getElementById("cartModal");

const closeCart = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

const backTop = document.getElementById("backTop");

const currentYear = document.getElementById("currentYear");


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");

    if (navbar.classList.contains("open")) {

        menuBtn.textContent = "✕";

    } else {

        menuBtn.textContent = "☰";

    }

});


/* Close mobile menu when clicking a link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});


/* =========================================
   HEADER SCROLL
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   SEARCH
========================================= */

searchBtn.addEventListener("click", () => {

    searchBox.classList.add("open");

    setTimeout(() => {

        searchInput.focus();

    }, 300);

});


closeSearch.addEventListener("click", () => {

    searchBox.classList.remove("open");

    searchInput.value = "";

});


/* Search products */

searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName =
            product.querySelector("h3").textContent.toLowerCase();

        if (
            searchValue === "" ||
            productName.includes(searchValue)
        ) {

            product.classList.remove("hidden");

        } else {

            product.classList.add("hidden");

        }

    });

});


/* =========================================
   PRODUCT FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const products =
    document.querySelectorAll(".product-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        products.forEach(product => {

            const category =
                product.getAttribute("data-category");

            if (
                filter === "all" ||
                category === filter
            ) {

                product.classList.remove("hidden");

            } else {

                product.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   SHOPPING CART
========================================= */

let cart = [];


/* Add product to cart */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName =
            button.getAttribute("data-product");

        const productCard =
            button.closest(".product-card");

        const priceText =
            productCard.querySelector(
                ".product-bottom strong"
            ).textContent;

        const price =
            parseInt(
                priceText.replace(/[₹,]/g, ""),
                10
            );

        const existingProduct =
            cart.find(item =>
                item.name === productName
            );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                name: productName,
                price: price,
                quantity: 1
            });

        }


        updateCart();

        showToast(`${productName} added to your bag`);

    });

});


/* Update cart */

function updateCart() {

    cartCount.textContent =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                Your bag is currently empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;

    }


    cartItemsContainer.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}">

                Remove

            </button>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;


    /* Remove product */

    document.querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(
                        button.getAttribute("data-index")
                    );

                cart.splice(index, 1);

                updateCart();

            });

        });

}


/* =========================================
   OPEN CART
========================================= */

cartBtn.addEventListener("click", () => {

    cartModal.classList.add("open");

    document.body.classList.add("no-scroll");

});


/* =========================================
   CLOSE CART
========================================= */

closeCart.addEventListener("click", closeCartModal);


cartModal.addEventListener("click", event => {

    if (event.target === cartModal) {

        closeCartModal();

    }

});


function closeCartModal() {

    cartModal.classList.remove("open");

    document.body.classList.remove("no-scroll");

}


/* =========================================
   CHECKOUT
========================================= */

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Your bag is empty");

        return;

    }

    showToast(
        "Checkout system will be connected to your payment gateway."
    );

});


/* =========================================
   HEART / WISHLIST
========================================= */

const heartButtons =
    document.querySelectorAll(".heart-btn");


heartButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {

            button.textContent = "♥";

            showToast("Added to wishlist");

        } else {

            button.textContent = "♡";

            showToast("Removed from wishlist");

        }

    });

});


/* =========================================
   TOAST MESSAGE
========================================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        email === "" ||
        subject === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Please fill in all fields.";

        formMessage.style.color = "#a06d67";

        return;

    }


    formMessage.textContent =
        `Thank you, ${name}! Your message has been received.`;

    formMessage.style.color = "#536b58";


    contactForm.reset();


    showToast("Message sent successfully");

});


/* =========================================
   NEWSLETTER
========================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();


    const email =
        document.getElementById("newsletterEmail").value.trim();


    if (email === "") {

        showToast("Please enter your email");

        return;

    }


    showToast(
        "Welcome to the Sugo circle!"
    );


    newsletterForm.reset();

});


/* =========================================
   ANIMATED STATISTICS
========================================= */

const stats =
    document.querySelectorAll(".stat strong");


let statsAnimated = false;


function animateStats() {

    if (statsAnimated) return;


    const statsSection =
        document.querySelector(".stats-section");


    const sectionPosition =
        statsSection.getBoundingClientRect().top;


    const screenHeight =
        window.innerHeight;


    if (sectionPosition < screenHeight - 100) {

        statsAnimated = true;


        stats.forEach(stat => {

            const target =
                Number(
                    stat.getAttribute("data-target")
                );


            let current = 0;


            const increment =
                Math.max(1, Math.ceil(target / 40));


            const timer =
                setInterval(() => {

                    current += increment;


                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }


                    stat.textContent = current;

                }, 40);

        });

    }

}


window.addEventListener("scroll", animateStats);

animateStats();


/* =========================================
   BACK TO TOP
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("main section[id]");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navbar.classList.remove("open");

        menuBtn.textContent = "☰";

        searchBox.classList.remove("open");

        closeCartModal();

    }

});


/* =========================================
   CURRENT YEAR
========================================= */

currentYear.textContent =
    new Date().getFullYear();


/* =========================================
   INITIALIZE
========================================= */

updateCart();

console.log(
    "Sugo Clothing website loaded successfully."
);