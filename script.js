document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       DATA FEATURES
    ========================================== */

    const featureGrid = document.getElementById("featureGrid");

    const features = [
        {
            title: "Smart Tasks",
            description:
                "Break big goals into simple, actionable tasks and stay on top of what matters.",
            icon: "✓",
            color: "purple",
            graphic: true
        },
        {
            title: "Focus Mode",
            description:
                "Block distractions and create dedicated sessions for deep, uninterrupted work.",
            icon: "◉",
            color: "pink",
            graphic: false
        },
        {
            title: "Team Sync",
            description:
                "Keep your entire team aligned with shared projects, updates and conversations.",
            icon: "⌁",
            color: "blue",
            graphic: false
        },
        {
            title: "Visual Projects",
            description:
                "See the bigger picture with beautiful project boards and flexible workflows.",
            icon: "▦",
            color: "orange",
            graphic: true
        },
        {
            title: "Quick Notes",
            description:
                "Capture ideas instantly before they disappear. Organize them whenever you're ready.",
            icon: "✎",
            color: "cyan",
            graphic: false
        },
        {
            title: "Progress Insights",
            description:
                "Understand where your time goes and discover patterns that improve your workflow.",
            icon: "↗",
            color: "purple",
            graphic: true
        }
    ];


    function renderFeatures() {

        if (!featureGrid) return;

        featureGrid.innerHTML = "";

        features.forEach((feature, index) => {

            const card = document.createElement("article");

            card.className = "feature-card";

            if (index === 0 || index === 3) {
                card.classList.add("wide");
            }

            card.innerHTML = `
                <div class="feature-icon ${feature.color}">
                    ${feature.icon}
                </div>

                <h3>${feature.title}</h3>

                <p>
                    ${feature.description}
                </p>

                ${
                    feature.graphic
                        ? `
                        <div class="feature-graphic">
                            <span class="feature-bar"></span>
                            <span class="feature-bar"></span>
                            <span class="feature-bar"></span>
                        </div>
                        `
                        : ""
                }
            `;

            featureGrid.appendChild(card);

        });

    }

    renderFeatures();


    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("show");

            menuBtn.textContent =
                mobileMenu.classList.contains("show")
                    ? "×"
                    : "☰";

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("show");

                menuBtn.textContent = "☰";

            });

        });

    }


    /* ==========================================
       DEMO MODAL
    ========================================== */

    const demoBtn = document.getElementById("demoBtn");
    const demoModal = document.getElementById("demoModal");
    const modalClose = document.getElementById("modalClose");
    const modalStart = document.getElementById("modalStart");


    function openModal() {

        demoModal.classList.add("show");

        document.body.classList.add("modal-open");

    }


    function closeModal() {

        demoModal.classList.remove("show");

        document.body.classList.remove("modal-open");

    }


    if (demoBtn) {

        demoBtn.addEventListener(
            "click",
            openModal
        );

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (demoModal) {

        demoModal.addEventListener(
            "click",
            event => {

                if (event.target === demoModal) {
                    closeModal();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* ==========================================
       CTA INTERACTION
    ========================================== */

    const pricingBtn =
        document.getElementById("pricingBtn");

    const modalStartBtn =
        document.getElementById("modalStart");


    function showSuccess(button) {

        const originalText =
            button.textContent;

        button.textContent =
            "✓ Workspace created!";

        button.style.background =
            "linear-gradient(90deg,#35c994,#36b9a9)";

        setTimeout(() => {

            button.textContent =
                originalText;

            button.style.background = "";

        }, 2500);

    }


    if (pricingBtn) {

        pricingBtn.addEventListener(
            "click",
            () => showSuccess(pricingBtn)
        );

    }


    if (modalStartBtn) {

        modalStartBtn.addEventListener(
            "click",
            () => {

                closeModal();

                setTimeout(() => {

                    if (pricingBtn) {
                        showSuccess(pricingBtn);
                    }

                }, 300);

            }
        );

    }


    /* ==========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener(
        "scroll",
        () => {

            if (!navbar) return;

            if (window.scrollY > 30) {

                navbar.style.background =
                    "rgba(7,7,17,.92)";

            } else {

                navbar.style.background =
                    "rgba(7,7,17,.75)";

            }

        }
    );


    /* ==========================================
       REVEAL ANIMATION
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .review-card, .stat-card, .notes-window"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity .6s ease, transform .6s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ==========================================
       JSON PRODUCT DATA
    ========================================== */

    /*
       products.json digunakan sebagai sumber
       data produk.

       Jika halaman dijalankan menggunakan Live Server,
       data akan dimuat otomatis.
    */

    fetch("products.json")
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "products.json tidak ditemukan"
                );
            }

            return response.json();

        })
        .then(data => {

            console.log(
                "Product data loaded:",
                data
            );

        })
        .catch(error => {

            console.info(
                "Product JSON belum dimuat:",
                error.message
            );

        });

});