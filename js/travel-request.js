/* ============================================================
   RideXpress — Travel Request page
   Driver / Passenger form switching | validation | card rendering
   sorting | tab filtering | localStorage persistence
   ============================================================ */

(function () {
    "use strict";

    const STORAGE_KEY = "rx_travel_announcements";
    const PHONE_PATTERN = /^09\d{9}$/;

    let announcements = [];

    /* ===== Seed data (only used the first time, when storage is empty) ===== */
    const seedAnnouncements = [
        {
            id: "seed-1",
            type: "driver",
            name: "Reza Ahmadi",
            phone: "09161234567",
            origin: "Valiasr Sq",
            destination: "Imam Khomeini Airport",
            date: nextDateString(1),
            time: "07:30",
            vehicleType: "Sedan",
            vehicleColor: "White",
            plate: "64 / 514 ب 48",
            totalSeats: 3,
            seatsWomen: 1,
            seatsMen: 2
        },
        {
            id: "seed-2",
            type: "passenger",
            name: "Narges Karimi",
            phone: "09121234567",
            origin: "Tajrish Station",
            destination: "Azadi Tower",
            date: nextDateString(1),
            time: "08:15",
            gender: "female",
            passengerCount: 2,
            maleCount: 0,
            femaleCount: 2,
            luggage: true,
            privateRide: false
        },
        {
            id: "seed-3",
            type: "passenger",
            name: "Hamed Rostami",
            phone: "09351234567",
            origin: "Enghelab Sq",
            destination: "Isfahan Terminal",
            date: nextDateString(2),
            time: "17:00",
            gender: "male",
            passengerCount: 1,
            maleCount: 1,
            femaleCount: 0,
            luggage: false,
            privateRide: true
        }
    ];

    function nextDateString(daysFromNow) {
        const d = new Date();
        d.setDate(d.getDate() + daysFromNow);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return year + "-" + month + "-" + day;
    }

    /* ===== Storage ===== */

    function loadAnnouncements() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                announcements = JSON.parse(raw);
                return;
            }
        } catch (err) {
            announcements = [];
        }
        announcements = seedAnnouncements.slice();
        saveAnnouncements();
    }

    function saveAnnouncements() {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
        } catch (err) {
            /* Storage unavailable (private browsing, quota, etc.) — fail silently */
        }
    }

    /* ===== Mode switch (Driver / Passenger) ===== */

    function setupModeSwitch() {
        const modeButtons = document.querySelectorAll(".mode-btn");
        const driverForm = document.getElementById("driver-form");
        const passengerForm = document.getElementById("passenger-form");

        if (!driverForm || !passengerForm) return;

        for (let i = 0; i < modeButtons.length; i++) {
            modeButtons[i].addEventListener("click", function () {
                const mode = this.getAttribute("data-mode");

                for (let j = 0; j < modeButtons.length; j++) {
                    modeButtons[j].classList.remove("active");
                    modeButtons[j].setAttribute("aria-selected", "false");
                }
                this.classList.add("active");
                this.setAttribute("aria-selected", "true");

                if (mode === "driver") {
                    driverForm.classList.remove("d-none");
                    passengerForm.classList.add("d-none");
                } else {
                    passengerForm.classList.remove("d-none");
                    driverForm.classList.add("d-none");
                }
            });
        }
    }

    /* ===== Shared validation helpers ===== */

    function showFeedback(el, isError, message) {
        el.className = "alert " + (isError ? "alert-danger" : "alert-success");
        el.textContent = message;
        el.classList.remove("d-none");
    }

    function isNonNegativeNumber(value) {
        const num = Number(value);
        return value !== "" && !isNaN(num) && num >= 0;
    }

    function makeId() {
        return "rx-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    }

    /* ===== Driver form ===== */

    function setupDriverForm() {
        const form = document.getElementById("driver-form");
        const feedback = document.getElementById("driver-feedback");
        if (!form || !feedback) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("driver-name").value.trim();
            const phone = document.getElementById("driver-phone").value.trim().replace(/\s/g, "");
            const plate = document.getElementById("driver-plate").value.trim();
            const vehicleType = document.getElementById("driver-vehicle-type").value;
            const vehicleColor = document.getElementById("driver-vehicle-color").value;
            const origin = document.getElementById("driver-origin").value.trim();
            const destination = document.getElementById("driver-destination").value.trim();
            const date = document.getElementById("driver-departure-date").value;
            const time = document.getElementById("driver-departure-time").value;
            const totalSeats = document.getElementById("driver-total-seats").value;
            const seatsWomen = document.getElementById("driver-seats-women").value;
            const seatsMen = document.getElementById("driver-seats-men").value;

            if (name.length < 2) {
                showFeedback(feedback, true, "Please enter the driver's full name.");
                return;
            }
            if (!PHONE_PATTERN.test(phone)) {
                showFeedback(feedback, true, "Phone must start with 09 and be 11 digits.");
                return;
            }
            if (plate.length < 2) {
                showFeedback(feedback, true, "Please enter the license plate number.");
                return;
            }
            if (!vehicleType || !vehicleColor) {
                showFeedback(feedback, true, "Please choose a vehicle type and color.");
                return;
            }
            if (!origin || !destination) {
                showFeedback(feedback, true, "Please enter both origin and destination.");
                return;
            }
            if (!date || !time) {
                showFeedback(feedback, true, "Please choose a departure date and time.");
                return;
            }
            if (!isNonNegativeNumber(totalSeats) || !isNonNegativeNumber(seatsWomen) || !isNonNegativeNumber(seatsMen)) {
                showFeedback(feedback, true, "Seat counts cannot be negative.");
                return;
            }
            if (Number(seatsWomen) + Number(seatsMen) > Number(totalSeats)) {
                showFeedback(feedback, true, "Reserved seats cannot exceed the total available seats.");
                return;
            }

            announcements.push({
                id: makeId(),
                type: "driver",
                name: name,
                phone: phone,
                origin: origin,
                destination: destination,
                date: date,
                time: time,
                vehicleType: vehicleType,
                vehicleColor: vehicleColor,
                plate: plate,
                totalSeats: Number(totalSeats),
                seatsWomen: Number(seatsWomen),
                seatsMen: Number(seatsMen)
            });

            saveAnnouncements();
            renderAllPanels();
            showFeedback(feedback, false, "Driver announcement posted successfully.");
            form.reset();
        });
    }

    /* ===== Passenger form ===== */

    function setupPassengerForm() {
        const form = document.getElementById("passenger-form");
        const feedback = document.getElementById("passenger-feedback");
        if (!form || !feedback) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("passenger-name").value.trim();
            const phone = document.getElementById("passenger-phone").value.trim().replace(/\s/g, "");
            const origin = document.getElementById("passenger-origin").value.trim();
            const destination = document.getElementById("passenger-destination").value.trim();
            const date = document.getElementById("passenger-date").value;
            const time = document.getElementById("passenger-time").value;
            const genderInput = form.querySelector('input[name="passenger-gender"]:checked');
            const gender = genderInput ? genderInput.value : "";
            const passengerCount = document.getElementById("passenger-count").value;
            const maleCount = document.getElementById("passenger-count-male").value;
            const femaleCount = document.getElementById("passenger-count-female").value;
            const luggage = document.getElementById("passenger-luggage").checked;
            const privateRide = document.getElementById("passenger-private").checked;

            if (name.length < 2) {
                showFeedback(feedback, true, "Please enter the passenger's full name.");
                return;
            }
            if (!PHONE_PATTERN.test(phone)) {
                showFeedback(feedback, true, "Phone must start with 09 and be 11 digits.");
                return;
            }
            if (!origin || !destination) {
                showFeedback(feedback, true, "Please enter both origin and destination.");
                return;
            }
            if (!date || !time) {
                showFeedback(feedback, true, "Please choose a travel date and departure time.");
                return;
            }
            if (!isNonNegativeNumber(passengerCount) || !isNonNegativeNumber(maleCount) || !isNonNegativeNumber(femaleCount)) {
                showFeedback(feedback, true, "Passenger counts cannot be negative.");
                return;
            }
            if (Number(maleCount) + Number(femaleCount) !== Number(passengerCount)) {
                showFeedback(feedback, true, "Male + female passengers must add up to the total passenger count.");
                return;
            }

            announcements.push({
                id: makeId(),
                type: "passenger",
                name: name,
                phone: phone,
                origin: origin,
                destination: destination,
                date: date,
                time: time,
                gender: gender,
                passengerCount: Number(passengerCount),
                maleCount: Number(maleCount),
                femaleCount: Number(femaleCount),
                luggage: luggage,
                privateRide: privateRide
            });

            saveAnnouncements();
            renderAllPanels();
            showFeedback(feedback, false, "Passenger request posted successfully.");
            form.reset();
        });
    }

    /* ===== Sorting ===== */

    function sortByDateThenTime(list) {
        return list.slice().sort(function (a, b) {
            if (a.date !== b.date) {
                return a.date < b.date ? -1 : 1;
            }
            if (a.time !== b.time) {
                return a.time < b.time ? -1 : 1;
            }
            return 0;
        });
    }

    /* ===== Card rendering ===== */

    function formatDate(dateString) {
        if (!dateString) return "—";
        const parts = dateString.split("-");
        if (parts.length !== 3) return dateString;
        return parts[2] + "/" + parts[1] + "/" + parts[0];
    }

    function buildCard(entry) {
        const isDriver = entry.type === "driver";
        const badgeClass = isDriver ? "travel-badge--driver" : "travel-badge--passenger";
        const badgeIcon = isDriver ? "bi-steering-wheel" : "bi-person-walking";
        const badgeLabel = isDriver ? "Driver" : "Passenger";
        const phoneLink = "tel:" + entry.phone;

        let detailsHtml = "";

        if (isDriver) {
            detailsHtml =
                '<div class="travel-meta">' +
                    '<span><i class="bi bi-car-front"></i> ' + entry.vehicleColor + " " + entry.vehicleType + '</span>' +
                    '<span><i class="bi bi-credit-card-2-front"></i> ' + entry.plate + '</span>' +
                '</div>' +
                '<div class="travel-meta">' +
                    '<span><i class="bi bi-person-badge"></i> ' + entry.totalSeats + ' seat(s) total</span>' +
                    '<span><i class="bi bi-gender-female"></i> ' + entry.seatsWomen + ' for women</span>' +
                    '<span><i class="bi bi-gender-male"></i> ' + entry.seatsMen + ' for men</span>' +
                '</div>';
        } else {
            const genderLabel = entry.gender === "female" ? "Female" : "Male";
            detailsHtml =
                '<div class="travel-meta">' +
                    '<span><i class="bi bi-people"></i> ' + entry.passengerCount + ' passenger(s)</span>' +
                    '<span><i class="bi bi-person"></i> ' + genderLabel + '</span>' +
                '</div>' +
                '<div class="travel-meta">' +
                    '<span><i class="bi bi-gender-male"></i> ' + entry.maleCount + ' male</span>' +
                    '<span><i class="bi bi-gender-female"></i> ' + entry.femaleCount + ' female</span>' +
                '</div>' +
                '<div class="travel-tags">' +
                    '<span class="travel-tag' + (entry.luggage ? " travel-tag--on" : "") + '"><i class="bi bi-briefcase"></i> ' + (entry.luggage ? "Extra luggage" : "No extra luggage") + '</span>' +
                    '<span class="travel-tag' + (entry.privateRide ? " travel-tag--on" : "") + '"><i class="bi bi-shield-lock"></i> ' + (entry.privateRide ? "Private ride" : "Shared ride") + '</span>' +
                '</div>';
        }

        return (
            '<div class="col-sm-6 col-lg-4">' +
                '<div class="travel-card h-100">' +
                    '<div class="travel-card-body">' +
                        '<div class="travel-card-top">' +
                            '<h3 class="travel-card-name">' + entry.name + '</h3>' +
                            '<span class="travel-badge ' + badgeClass + '"><i class="bi ' + badgeIcon + '"></i> ' + badgeLabel + '</span>' +
                        '</div>' +
                        '<div class="travel-route"><i class="bi bi-geo-alt-fill"></i> ' + entry.origin + ' <i class="bi bi-arrow-right"></i> ' + entry.destination + '</div>' +
                        '<div class="travel-meta">' +
                            '<span><i class="bi bi-calendar-event"></i> ' + formatDate(entry.date) + '</span>' +
                            '<span><i class="bi bi-clock"></i> ' + entry.time + '</span>' +
                        '</div>' +
                        detailsHtml +
                        '<a href="' + phoneLink + '" class="travel-call-btn"><i class="bi bi-telephone-fill"></i> Call ' + entry.name.split(" ")[0] + '</a>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }

    function renderPanel(panelId, list) {
        const panel = document.getElementById(panelId);
        if (!panel) return;

        if (list.length === 0) {
            panel.innerHTML = '<div class="col-12"><p class="empty-state"><i class="bi bi-inbox"></i> No announcements yet.</p></div>';
            return;
        }

        let html = "";
        for (let i = 0; i < list.length; i++) {
            html = html + buildCard(list[i]);
        }
        panel.innerHTML = html;
    }

    function renderAllPanels() {
        const passengers = sortByDateThenTime(announcements.filter(function (a) { return a.type === "passenger"; }));
        const drivers = sortByDateThenTime(announcements.filter(function (a) { return a.type === "driver"; }));
        const privateRides = sortByDateThenTime(announcements.filter(function (a) { return a.type === "passenger" && a.privateRide; }));

        renderPanel("passengers-panel", passengers);
        renderPanel("drivers-panel", drivers);
        renderPanel("private-panel", privateRides);

        updateActiveCountLabel(passengers, drivers, privateRides);
    }

    let activeTab = "passengers";

    function updateActiveCountLabel(passengers, drivers, privateRides) {
        const countLabel = document.getElementById("travel-count");
        if (!countLabel) return;

        let count = passengers.length;
        if (activeTab === "drivers") count = drivers.length;
        if (activeTab === "private") count = privateRides.length;

        countLabel.textContent = String(count) + " announcement(s) shown";
    }

    /* ===== Tabs ===== */

    function setupTabs() {
        const tabButtons = document.querySelectorAll(".travel-tab-btn");
        const panels = {
            passengers: document.getElementById("passengers-panel"),
            drivers: document.getElementById("drivers-panel"),
            private: document.getElementById("private-panel")
        };

        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].addEventListener("click", function () {
                const tab = this.getAttribute("data-tab");
                activeTab = tab;

                for (let j = 0; j < tabButtons.length; j++) {
                    tabButtons[j].classList.remove("active");
                    tabButtons[j].setAttribute("aria-selected", "false");
                }
                this.classList.add("active");
                this.setAttribute("aria-selected", "true");

                for (const key in panels) {
                    if (panels[key]) {
                        panels[key].classList.toggle("d-none", key !== tab);
                    }
                }

                renderAllPanels();
            });
        }
    }

    /* ===== Init ===== */

    function initTravelRequestPage() {
        if (document.body.dataset.page !== "travel-request") return;

        loadAnnouncements();
        setupModeSwitch();
        setupDriverForm();
        setupPassengerForm();
        setupTabs();
        renderAllPanels();
    }

    document.addEventListener("DOMContentLoaded", initTravelRequestPage);
})();
