/* ============================================================
   RideXpress — تمام کدهای JavaScript پروژه
   متغیرها | عبارت‌ها | شرطی | حلقه | حلقه شرطی | DOM | Canvas
   ============================================================ */

/* ===== داده‌ها (Variables) ===== */

const BRAND_NAME = "RideXpress";
const SUPPORT_PHONE = "+98-916-293-23-29";
const AVG_PICKUP_MINUTES = (3 + 4 + 5) / 3;

const drivers = [
    {
        id: "RX-2041",
        name: "Ali Tavousi",
        phone: "0916-293-2329",
        car: "BMW 320i",
        photo: "pic/BMW 320i.jpg",
        status: "available",
        rating: 4.9,
        plate: "ایران 64 /  514  ب 48 "
    },
    {
        id: "RX-1187",
        name: "Amir Karimi",
        phone: "0930-363-3435",
        car: "Toyota RAV4 (SUV)",
        photo: "pic/Toyota RAV4 (SUV).jpg",
        status: "busy",
        rating: 4.8,
        plate: "ایران 43 /  214  ب 12 "
    },
    {
        id: "RX-3309",
        name: "Ali Hosseini",
        phone: "0913-462-6123",
        car: "Hyundai Sonata",
        photo: "pic/Hyundai Sonata.jpg",
        status: "available",
        rating: 4.7,
        plate: "ایران 67 /  214  ب 10 "
    },
    {
        id: "RX-0922",
        name: "Hassan Moradi",
        phone: "0913-899-8421",
        car: "BMW X5 (SUV)",
        photo: "pic/BMW X5 (SUV).jpg",
        status: "returning",
        rating: 4.9,
        plate: "ایران 09 /  317  ب 21 "
    },
    {
        id: "RX-5510",
        name: "Amir Sadat",
        phone: "0913-658-0564",
        car: "Peugeot 405",
        photo: "pic/Peugeot 405.jpg",
        status: "scheduled",
        rating: 4.6,
        plate: "ایران 81 /  416  ب 61 "
    },
    {
        id: "RX-7720",
        name: "Ahmad Nazeri",
        phone: "0938-614-8421",
        car: "Kia Cerato",
        photo: "pic/Kia Cerato.jpg",
        status: "available",
        rating: 5.0,
        plate: "ایران 12 /  515  ب 21 "
    }
];

const timelineRides = [
    { time: "14:32", taxiId: "RX-2041", detail: "NikAbad to Isfahan — ETA 3 min", status: "moving" },
    { time: "14:28", taxiId: "RX-1187", detail: "Passenger picked up — heading to Airport", status: "busy" },
    { time: "14:25", taxiId: "RX-3309", detail: "Waiting at Mohammad Abad — available now", status: "free" },
    { time: "14:19", taxiId: "RX-0922", detail: "Completed ride — returning to NasrAbad", status: "returning" },
    { time: "14:10", taxiId: "RX-5510", detail: "Scheduled pickup at 14:45 — SaadatAbad", status: "scheduled" }
];

const galleryItems = [
    { image: "pic/cars.jpg", title: "BMW", text: "Perfect for daily commutes — up to 4 passengers, AC, clean interior." },
    { image: "pic/express.jpg", title: "City Routes", text: "We operate across downtown, airports, and major transit hubs 24/7." },
    { image: "pic/women get in car .png", title: "Professional Drivers", text: "Uniformed, trained, and rated by passengers after every trip." },
    { image: "pic/cars get in people .png", title: "Family SUV", text: "Extra space for luggage and groups of up to 6 — ideal for airport runs." }
];

/* ===== منطق برنامه ===== */

(function () {
    "use strict";

    let animationFrameId = null;
    let taxiDots = [];
    const canvasTaxiCount = 5;
    const peakHourStart = 17;
    const peakHourEnd = 20;

    function getCurrentPage() {
        return document.body.dataset.page || "";
    }

    function countAvailableDrivers() {
        let count = 0;
        for (let i = 0; i < drivers.length; i++) {
            if (drivers[i].status === "available") {
                count = count + 1;
            }
        }
        return count;
    }

    function getStatusBadgeClass(status) {
        if (status === "available" || status === "free") {
            return "bg-success";
        } else if (status === "busy" || status === "moving") {
            return "bg-warning text-dark";
        } else if (status === "scheduled") {
            return "bg-primary";
        } else if (status === "returning") {
            return "bg-secondary";
        }
        return "bg-dark";
    }

    function getStatusLabel(status) {
        if (status === "available") return "Available";
        if (status === "busy") return "On Trip";
        if (status === "free") return "Available";
        if (status === "moving") return "Moving";
        if (status === "scheduled") return "Scheduled";
        if (status === "returning") return "Returning";
        return "Unknown";
    }

    function getTrafficMessage() {
        const hour = new Date().getHours();
        const isPeak = hour >= peakHourStart && hour < peakHourEnd;

        if (isPeak) {
            return "Heavy traffic downtown until 8 PM — expect +5 min wait times on main routes.";
        } else if (hour >= 6 && hour < 10) {
            return "Morning rush active — average pickup is about 6 minutes.";
        }
        return "Roads are clear — average pickup is about 4 minutes across the city.";
    }

    function highlightActiveNavigation() {
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".nav-link, .bottom-nav-item");

        for (let linkIndex = 0; linkIndex < navLinks.length; linkIndex++) {
            const link = navLinks[linkIndex];
            const href = link.getAttribute("href");

            if (href === currentFile) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    }

    function updateTrafficAlert() {
        const alertText = document.querySelector(".news-text");
        if (alertText) {
            alertText.innerHTML =
                '<i class="bi bi-exclamation-triangle-fill"></i> ' + getTrafficMessage();
        }
    }

    function updateHeroStats() {
        const pickupEl = document.querySelector("[data-live-pickup]");
        const driversEl = document.querySelector("[data-live-drivers]");
        const roundedPickup = Math.round(AVG_PICKUP_MINUTES);
        const availableCount = countAvailableDrivers();

        if (pickupEl) {
            pickupEl.textContent = "~" + roundedPickup + " min pickup";
        }

        if (driversEl) {
            driversEl.textContent = availableCount + " drivers online";
        }
    }

    function renderDriverCards(filterStatus) {
        const container = document.getElementById("driver-cards");
        if (!container) return;

        container.innerHTML = "";
        let cardIndex = 0;

        for (let i = 0; i < drivers.length; i++) {
            const driver = drivers[i];
            const showCard = !filterStatus || filterStatus === "all" || driver.status === filterStatus;

            if (!showCard) {
                continue;
            }

            cardIndex = cardIndex + 1;
            const badgeClass = getStatusBadgeClass(driver.status);
            const statusLabel = getStatusLabel(driver.status);
            const phoneLink = "tel:" + driver.phone.replace(/-/g, "");

            const col = document.createElement("div");
            col.className = "col-sm-6 col-lg-4";

            col.innerHTML =
                '<div class="card driver-card h-100 shadow-sm">' +
                    '<img src="' + driver.photo + '" class="card-img-top driver-photo" alt="' + driver.name + '">' +
                    '<div class="card-body d-flex flex-column">' +
                        '<div class="d-flex justify-content-between align-items-start mb-2">' +
                            '<h5 class="card-title mb-0">' + driver.name + '</h5>' +
                            '<span class="badge ' + badgeClass + '">' + statusLabel + '</span>' +
                        '</div>' +
                        '<p class="card-text text-muted mb-1"><i class="bi bi-car-front"></i> ' + driver.car + '</p>' +
                        '<p class="card-text mb-1"><i class="bi bi-star-fill text-warning"></i> ' + driver.rating + ' / 5</p>' +
                        '<div class="iran-plate" dir="ltr"><span class="iran-plate-label">پلاک</span> ' + driver.plate + '</div>' +
                        '<a href="' + phoneLink + '" class="btn btn-primary mt-auto">' +
                            '<i class="bi bi-telephone-fill"></i> ' + driver.phone +
                        '</a>' +
                    '</div>' +
                '</div>';

            container.appendChild(col);
        }

        const countLabel = document.getElementById("driver-count");
        if (countLabel) {
            countLabel.textContent = String(cardIndex) + " driver(s) shown";
        }
    }

    function setupDriverFilters() {
        const filterButtons = document.querySelectorAll("[data-driver-filter]");

        for (let b = 0; b < filterButtons.length; b++) {
            filterButtons[b].addEventListener("click", function () {
                const filter = this.getAttribute("data-driver-filter");

                for (let j = 0; j < filterButtons.length; j++) {
                    filterButtons[j].classList.remove("active");
                }
                this.classList.add("active");
                renderDriverCards(filter);
            });
        }
    }

    function renderTimeline() {
        const list = document.getElementById("timeline-list");
        if (!list) return;

        list.innerHTML = "";

        for (let t = 0; t < timelineRides.length; t++) {
            const ride = timelineRides[t];
            const item = document.createElement("li");
            let itemClass = "timeline-item";
            let badgeExtra = "";

            if (t === 0) {
                itemClass = itemClass + " timeline-item--active";
            }

            if (ride.status === "busy") badgeExtra = " timeline-badge--busy";
            else if (ride.status === "free") badgeExtra = " timeline-badge--free";
            else if (ride.status === "scheduled") badgeExtra = " timeline-badge--scheduled";

            item.className = itemClass;
            item.innerHTML =
                '<span class="timeline-time">' + ride.time + '</span>' +
                '<div class="timeline-body">' +
                    '<strong>Taxi #' + ride.taxiId + '</strong>' +
                    '<span>' + ride.detail + '</span>' +
                '</div>' +
                '<span class="timeline-badge' + badgeExtra + '">' + getStatusLabel(ride.status) + '</span>';

            list.appendChild(item);
        }
    }

    function renderGallery() {
        const main = document.querySelector(".page-grid--gallery");
        if (!main) return;

        const areaClasses = ["pics", "article1", "article2", "shortcut1"];
        const oldCards = main.querySelectorAll(".gallery-card-dynamic");

        for (let r = 0; r < oldCards.length; r++) {
            oldCards[r].remove();
        }

        for (let g = 0; g < galleryItems.length; g++) {
            const item = galleryItems[g];
            const section = document.createElement("section");
            const areaClass = areaClasses[g] || "pics";

            section.className = areaClass + " card-section gallery-card gallery-card-dynamic";
            section.innerHTML =
                '<div class="gallery-image-wrap">' +
                    '<img src="' + item.image + '" alt="' + item.title + '">' +
                '</div>' +
                '<h3>' + item.title + '</h3>' +
                '<p>' + item.text + '</p>';

            main.appendChild(section);
        }
    }

    function setupContactForm() {
        const form = document.querySelector(".contact-form");
        const feedback = document.getElementById("form-feedback");

        if (!form || !feedback) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();
            const phonePattern = /^09\d{9}$/;

            if (name.length < 2) {
                feedback.className = "alert alert-danger";
                feedback.textContent = "Please enter your full name.";
            } else if (!phonePattern.test(phone.replace(/\s/g, ""))) {
                feedback.className = "alert alert-danger";
                feedback.textContent = "Phone must start with 09 and be 11 digits.";
            } else if (message.length < 10) {
                feedback.className = "alert alert-danger";
                feedback.textContent = "Message should be at least 10 characters.";
            } else {
                feedback.className = "alert alert-success";
                feedback.textContent = "Message sent! We will call you at " + phone + " soon.";
                form.reset();
            }

            feedback.classList.remove("d-none");
        });
    }

    function initTaxiCanvas() {
        const canvas = document.getElementById("taxi-map");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;

        canvas.width = width;
        canvas.height = height;

        taxiDots = [];
        let dotIndex = 0;

        do {
            taxiDots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 0.6 + dotIndex * 0.15,
                direction: dotIndex % 2 === 0 ? 1 : -1
            });
            dotIndex = dotIndex + 1;
        } while (dotIndex < canvasTaxiCount);

        function drawRoadPattern() {
            const gridSize = 40;
            let row = 0;

            while (row * gridSize < height) {
                let col = 0;
                while (col * gridSize < width) {
                    if ((row + col) % 2 === 0) {
                        ctx.fillStyle = "rgba(11, 61, 110, 0.06)";
                        ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
                    }
                    col = col + 1;
                }
                row = row + 1;
            }
        }

        function drawFrame() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#eef2f6";
            ctx.fillRect(0, 0, width, height);

            drawRoadPattern();

            ctx.strokeStyle = "rgba(11, 61, 110, 0.2)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, height * 0.5);
            ctx.lineTo(width, height * 0.5);
            ctx.stroke();

            for (let d = 0; d < taxiDots.length; d++) {
                const dot = taxiDots[d];
                dot.x = dot.x + dot.speed * dot.direction;

                if (dot.x > width + 10) {
                    dot.x = -10;
                } else if (dot.x < -10) {
                    dot.x = width + 10;
                }

                ctx.fillStyle = d % 2 === 0 ? "#f5b800" : "#0b3d6e";
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.fillStyle = "#0f172a";
            ctx.font = "12px system-ui, sans-serif";
            ctx.fillText(BRAND_NAME + " — Live map", 10, 18);

            animationFrameId = requestAnimationFrame(drawFrame);
        }

        drawFrame();

        window.addEventListener("resize", function () {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        });
    }

    function initTimelineCanvas() {
        const canvas = document.getElementById("timeline-canvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const w = canvas.width;
        const h = canvas.height;
        let progress = 0;

        function drawRoute() {
            ctx.clearRect(0, 0, w, h);

            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(30, h - 30);
            ctx.lineTo(w * 0.35, h * 0.6);
            ctx.lineTo(w * 0.65, h * 0.35);
            ctx.lineTo(w - 30, 40);
            ctx.stroke();

            const px = 30 + (w - 60) * progress;
            const py = (h - 30) + (40 - (h - 30)) * progress;

            ctx.fillStyle = "#f5b800";
            ctx.beginPath();
            ctx.arc(px, py, 10, 0, Math.PI * 2);
            ctx.fill();

            progress = progress + 0.003;
            if (progress > 1) {
                progress = 0;
            }

            requestAnimationFrame(drawRoute);
        }

        drawRoute();
    }

    function initPage() {
        const page = getCurrentPage();

        highlightActiveNavigation();
        updateTrafficAlert();
        updateHeroStats();

        if (page === "home") {
            initTaxiCanvas();
        } else if (page === "contact") {
            renderDriverCards("all");
            setupDriverFilters();
        } else if (page === "timeline") {
            renderTimeline();
            initTimelineCanvas();
        } else if (page === "gallery") {
            renderGallery();
        } else if (page === "contact-form") {
            setupContactForm();
        }
    }

    document.addEventListener("DOMContentLoaded", initPage);

    window.addEventListener("beforeunload", function () {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
        }
    });
})();
