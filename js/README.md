# `main.js` — Line-by-Line Explanation
### RideXpress Project — JavaScript Walkthrough for Presentation

This document explains every part of `main.js`, what it does, and which JavaScript language feature or Web API it demonstrates. It's organized in the same order as the file itself: **Data → Application Logic**.

---

## 1. File-level structure

The file is split into two conceptual halves:

1. **Data (Variables)** — constants and arrays of objects that hold the "database" of the app (drivers, timeline rides, gallery items).
2. **Application Logic** — wrapped in an **IIFE** (Immediately Invoked Function Expression) that contains all the functions which read that data and update the page.

```js
(function () {
    "use strict";
    ...
})();
```

- **IIFE**: a function that is defined and executed immediately. It creates a private scope so none of the helper functions or variables (`animationFrameId`, `taxiDots`, etc.) leak into the global `window` object. This is the classic **Module Pattern** for organizing vanilla JS.
- **`"use strict"`**: enables Strict Mode, which catches common bugs (e.g., accidental global variables, silent failures) and disallows some unsafe syntax.

---

## 2. Data section

### 2.1 Simple constants

```js
const BRAND_NAME = "RideXpress";
const SUPPORT_PHONE = "+98-916-293-23-29";
const AVG_PICKUP_MINUTES = (3 + 4 + 5) / 3;
```

- **`const`**: declares a block-scoped variable that cannot be reassigned. Used for values that never change.
- `AVG_PICKUP_MINUTES` is computed once, at load time, from a simple **arithmetic expression** — a demonstration that JS evaluates expressions on the right-hand side before assignment (result: `4`).

### 2.2 `drivers` — an array of objects

```js
const drivers = [
    { id: "RX-2041", name: "Reza Ahmadi", phone: "0916-123-4567", car: "BMW 320i",
      photo: "pic/cars.jpg", status: "available", rating: 4.9, plate: "..." },
    ...
];
```

- **Array literal (`[]`)** containing **object literals (`{}`)**. This is the standard way to model a small in-memory dataset in JavaScript (like rows in a table).
- Each object has consistent **keys** (`id`, `name`, `phone`, `car`, `photo`, `status`, `rating`, `plate`) — an implicit "schema" even though JS objects don't enforce one.
- `status` values (`"available"`, `"busy"`, `"returning"`, `"scheduled"`) act as an informal **enum**, later interpreted by helper functions.

### 2.3 `timelineRides` and `galleryItems`

```js
const timelineRides = [
    { time: "14:32", taxiId: "RX-2041", detail: "...", status: "moving" },
    ...
];

const galleryItems = [
    { image: "pic/cars.jpg", title: "BMW", text: "..." },
    ...
];
```

Same pattern: **arrays of objects** used as static data sources that get turned into HTML dynamically later.

---

## 3. Application logic (inside the IIFE)

### 3.1 Module-level (private) state

```js
let animationFrameId = null;
let taxiDots = [];
const canvasTaxiCount = 5;
const peakHourStart = 17;
const peakHourEnd = 20;
```

- **`let`**: used here instead of `const` because `animationFrameId` and `taxiDots` are reassigned later (`let` allows reassignment; `const` doesn't).
- These variables are **closures** — inner functions defined below (like `drawFrame`) can read and modify them even after the outer function scope has "returned," because JS functions retain references to their enclosing scope.

---

### 3.2 `getCurrentPage()`

```js
function getCurrentPage() {
    return document.body.dataset.page || "";
}
```

- **`document.body.dataset`**: reads the HTML5 `data-*` attributes (e.g., `data-page="home"` on `<body>`) via the **DOM `dataset` API**, which auto-converts `data-page` into `dataset.page`.
- **`||` (logical OR) fallback**: if `dataset.page` is `undefined` (falsy), the function returns `""` instead of `undefined`. This is a common JS idiom for default values.

---

### 3.3 `countAvailableDrivers()`

```js
function countAvailableDrivers() {
    let count = 0;
    for (let i = 0; i < drivers.length; i++) {
        if (drivers[i].status === "available") {
            count = count + 1;
        }
    }
    return count;
}
```

- **Classic `for` loop**: initializer (`let i = 0`), condition (`i < drivers.length`), increment (`i++`).
- **Strict equality (`===`)**: compares value *and* type, avoiding JS's type-coercion pitfalls (best practice vs. `==`).
- **Array indexing** (`drivers[i]`) and **dot notation property access** (`.status`).
- This function demonstrates manual iteration/counting, as opposed to using `Array.prototype.filter().length` — likely intentional for teaching loop fundamentals.

---

### 3.4 `getStatusBadgeClass(status)` / `getStatusLabel(status)`

```js
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
```

- **`if / else if` chain** acting as a mapping function: input status string → output Bootstrap CSS class.
- **Logical OR (`||`)** inside conditions to match multiple equivalent statuses.
- A fall-through `return "bg-dark";` at the end acts as the **default case**.
- `getStatusLabel` follows the identical pattern but with early `return` statements per condition instead of `else if` — showing two equally valid styles of branching in JS.

---

### 3.5 `getTrafficMessage()`

```js
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
```

- **`new Date()`**: creates a `Date` object representing the current moment; `.getHours()` extracts the local hour (0–23) — a built-in JS **Date API**.
- **Logical AND (`&&`)** combines two range checks into a boolean (`isPeak`).
- This is real-time/dynamic content generation based on the system clock, rather than the static text hardcoded in the HTML.

---

### 3.6 `highlightActiveNavigation()`

```js
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
```

- **`window.location.pathname`**: the current page's URL path (e.g., `/RideXpress/gallery.html`).
- **`String.prototype.split("/")`**: breaks the path into an array of segments at each `/`.
- **`Array.prototype.pop()`**: removes and returns the *last* array element — here, the filename itself (e.g., `"gallery.html"`).
- **`document.querySelectorAll(selector)`**: returns a `NodeList` of all elements matching the CSS selector (here, both desktop nav links and mobile bottom-nav items in one call, via a comma-separated selector).
- **`link.getAttribute("href")`**: reads the raw HTML attribute value.
- **`classList.add()` / `classList.remove()`**: modern DOM API for toggling CSS classes without manipulating the whole `className` string.
- Purpose: dynamically marks the correct nav link as `.active` based on which HTML file is currently loaded — this is why the same `main.js` can be shared across all pages.

---

### 3.7 `updateTrafficAlert()`

```js
function updateTrafficAlert() {
    const alertText = document.querySelector(".news-text");
    if (alertText) {
        alertText.innerHTML =
            '<i class="bi bi-exclamation-triangle-fill"></i> ' + getTrafficMessage();
    }
}
```

- **`document.querySelector()`**: returns the *first* matching element (or `null` if none found).
- **Guard clause (`if (alertText)`)**: prevents errors on pages that don't have a `.news-text` element (defensive programming).
- **`.innerHTML`**: injects an HTML string into the element, replacing its content — allows mixing an icon `<i>` tag with the dynamic text.
- **String concatenation (`+`)**: joins the icon markup with the return value of `getTrafficMessage()`.

---

### 3.8 `updateHeroStats()`

```js
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
```

- **Attribute selector** (`[data-live-pickup]`): CSS selector syntax used inside `querySelector` to find elements by a custom attribute, regardless of tag name.
- **`Math.round()`**: built-in `Math` object method, rounds to the nearest integer.
- **`.textContent`**: sets plain text (safer than `.innerHTML` when no markup is needed, and avoids XSS risk).
- Calls the previously defined `countAvailableDrivers()` — demonstrating **function composition/reuse**.

---

### 3.9 `renderDriverCards(filterStatus)` — the most complex function

```js
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
        ...
    }
}
```

- **`document.getElementById()`**: fast lookup of a single element by its unique `id`.
- **Early return (`if (!container) return;`)**: stops the function if this page has no `#driver-cards` element (i.e., not the Drivers page).
- **`container.innerHTML = ""`**: clears previously rendered cards before re-rendering (avoids duplicates on repeated filter clicks).
- **`showCard`** is a boolean built from three OR'd conditions — a common **filter predicate pattern**.
- **`continue`**: a loop-control keyword that skips the rest of the current iteration and jumps to the next one, without executing the DOM-building code below it for filtered-out drivers.

Continuing inside the loop:

```js
        cardIndex = cardIndex + 1;
        const badgeClass = getStatusBadgeClass(driver.status);
        const statusLabel = getStatusLabel(driver.status);
        const phoneLink = "tel:" + driver.phone.replace(/-/g, "");

        const col = document.createElement("div");
        col.className = "col-sm-6 col-lg-4";

        col.innerHTML =
            '<div class="card driver-card h-100 shadow-sm">' +
                '<img src="' + driver.photo + '" class="card-img-top driver-photo" alt="' + driver.name + '">' +
                ...
            '</div>';

        container.appendChild(col);
    }
```

- **`driver.phone.replace(/-/g, "")`**: uses a **regular expression** (`/-/g`) to strip all dashes from the phone number for a valid `tel:` link. The `g` flag means "global" — replace *every* match, not just the first.
- **`document.createElement("div")`**: programmatically creates a new, detached DOM node.
- **`.className`**: sets the CSS class(es) on the new element.
- **Building HTML via string concatenation**: the card's inner markup is assembled by concatenating literal HTML strings with data from the `driver` object — a manual (non-templating-library) approach to dynamic HTML generation.
- **`container.appendChild(col)`**: inserts the newly built card into the live DOM, making it visible on the page.

Finally:

```js
    const countLabel = document.getElementById("driver-count");
    if (countLabel) {
        countLabel.textContent = String(cardIndex) + " driver(s) shown";
    }
}
```

- **`String()`**: explicit **type conversion** of the number `cardIndex` into a string (technically unnecessary here since `+` with a string already coerces it, but it makes the conversion intentional and readable).

---

### 3.10 `setupDriverFilters()`

```js
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
```

- **`addEventListener("click", function () {...})`**: attaches a **click event handler** to each filter button.
- **Anonymous function expression** (not an arrow function) is used deliberately here so that **`this`** inside the handler refers to the button that was clicked (arrow functions don't bind their own `this`).
- Inside the handler: a nested loop clears the `.active` class from *all* buttons, then re-adds it only to the clicked one — a standard "single active toggle" UI pattern.
- Calls `renderDriverCards(filter)` again — demonstrating **event-driven re-rendering**: the UI updates in response to user interaction rather than only once at page load.

---

### 3.11 `renderTimeline()`

```js
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
```

- Same overall pattern as `renderDriverCards`: loop over data → build a DOM element → append to a container.
- **Single-line `if / else if` without braces**: valid JS syntax where a single statement doesn't require `{}` — a more compact style than used elsewhere in the file (shows JS's flexible statement syntax).
- `t === 0` marks the *first* item in the list as the "currently active" ride by conditionally appending a modifier class — a common **BEM-style CSS class composition** technique done in JS.

---

### 3.12 `renderGallery()`

```js
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
            '<div class="gallery-image-wrap"><img src="' + item.image + '" alt="' + item.title + '"></div>' +
            '<h3>' + item.title + '</h3>' +
            '<p>' + item.text + '</p>';

        main.appendChild(section);
    }
}
```

- **`element.remove()`**: modern DOM method to delete a node directly from the page (removes any previously rendered gallery cards before re-adding fresh ones — prevents duplication if this ever ran twice).
- **`areaClasses[g] || "pics"`**: uses array indexing with an OR fallback, so if there are more gallery items than named CSS grid areas, extras default to reusing `"pics"`.
- Ties each JS-rendered `<section>` to one of the named **CSS Grid areas** defined in `index.css` (`grid-template-areas`), linking the JS data layer to the CSS layout layer.

---

### 3.13 `setupContactForm()`

```js
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
```

- **`event.preventDefault()`**: stops the browser's default form submission (which would reload the page), enabling a **Single Page Application-style** validation flow instead.
- **`.value.trim()`**: reads an `<input>`'s current text and strips leading/trailing whitespace.
- **Regular expressions**:
  - `/^09\d{9}$/` — anchors (`^`/`$`) requiring the string to *start* with `09`, followed by exactly 9 digits (`\d{9}`), and nothing else — validates an 11-digit Iranian mobile format.
  - `.test(string)` — a `RegExp` method returning `true`/`false` for a match.
  - `/\s/g` — matches all whitespace characters (used to strip spaces from the phone number before testing).
- **Client-side form validation** via cascading `if / else if / else`, each branch setting an appropriate Bootstrap alert class and message.
- **`form.reset()`**: built-in `HTMLFormElement` method that clears all form fields after a successful "submission."
- **`classList.remove("d-none")`**: reveals the feedback box (previously hidden via Bootstrap's `d-none` utility class) once there's a message to show.

---

### 3.14 `initTaxiCanvas()` — Canvas animation

```js
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
    ...
```

- **`canvas.getContext("2d")`**: obtains the **2D rendering context** — the object with all drawing methods (`fillRect`, `arc`, etc.) from the **HTML5 Canvas API**.
- **`canvas.offsetWidth` / `offsetHeight`**: read the element's rendered pixel size from the DOM, used to size the canvas's drawing surface to match its CSS size (avoids blurry/stretched rendering).
- **`do...while` loop**: guarantees the loop body runs *at least once* before checking the condition — used here to push exactly `canvasTaxiCount` (5) random dot objects into `taxiDots`.
- **`Math.random()`**: returns a float between 0 (inclusive) and 1 (exclusive); multiplied by `width`/`height` to get a random pixel coordinate.
- **Ternary operator** (`dotIndex % 2 === 0 ? 1 : -1`): a compact conditional expression — even-indexed dots move right (`1`), odd-indexed dots move left (`-1`).
- **Modulo operator (`%`)**: used for the even/odd check.
- **`Array.prototype.push()`**: appends a new object to the `taxiDots` array.

```js
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
```

- **Nested `while` loops**: draw a checkerboard grid pattern across the canvas.
- **`ctx.fillStyle`**: sets the fill color, here using an **`rgba()`** value for a semi-transparent navy tint.
- **`ctx.fillRect(x, y, width, height)`**: draws a filled rectangle — one "checker" tile per iteration where `(row + col)` is even.
- This is a **nested function** — `drawRoadPattern` is defined *inside* `initTaxiCanvas`, forming a **closure** over `ctx`, `width`, and `height`.

```js
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
```

- **`ctx.clearRect()`**: wipes the entire canvas before redrawing the next frame — essential for animation (otherwise every frame would stack on the last).
- **Path-drawing API**: `beginPath()`, `moveTo()`, `lineTo()`, `stroke()` draw a straight horizontal line (the "road").
- **Per-dot animation loop**: each `dot`'s `x` position is updated by `speed * direction` every frame, producing continuous horizontal movement.
- **Screen-wrap logic** (`if (dot.x > width + 10) { dot.x = -10; }`): when a dot moves off one edge, it's teleported to the opposite edge — a simple wraparound effect.
- **`ctx.arc(x, y, radius, startAngle, endAngle)`**: draws a circle; `Math.PI * 2` is a full 360° in radians (used because Canvas angles are always in radians, not degrees).
- **`ctx.fillText(text, x, y)`**: draws text directly onto the canvas (used for the "RideXpress — Live map" label).
- **`requestAnimationFrame(drawFrame)`**: the browser API for smooth animation — schedules `drawFrame` to run again just before the next repaint (~60 times/second), and the returned ID is stored in `animationFrameId` so the animation can later be cancelled.
- This is **recursive scheduling**: `drawFrame` calls itself indirectly via `requestAnimationFrame`, creating an ongoing animation loop rather than a single draw.

```js
    drawFrame();

    window.addEventListener("resize", function () {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    });
}
```

- Calls `drawFrame()` once immediately to kick off the loop.
- **`window.addEventListener("resize", ...)`**: listens for browser window resizing and updates the canvas's internal pixel dimensions to match, preventing a stretched/distorted animation. Note this callback reassigns the outer `width`/`height` variables — another closure example.

---

### 3.15 `initTimelineCanvas()`

```js
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
```

- Draws a fixed **polyline "route"** (a zig-zag path using multiple `lineTo()` calls) representing a trip from pickup to destination.
- **Linear interpolation**: `px`/`py` calculate a point that moves proportionally between the start `(30, h-30)` and end `(w-30, 40)` coordinates based on `progress` (a value from 0 to 1).
- `progress` increases by a small fixed amount each frame (`0.003`) and **wraps back to 0** once it exceeds 1 — producing a looping "taxi moving along the route" animation, again driven by `requestAnimationFrame`.
- Unlike `initTaxiCanvas`, this function's `animationFrameId` isn't stored — a minor inconsistency worth noting if your professor asks about potential improvements (this loop can't be cancelled via the `beforeunload` cleanup below).

---

### 3.16 `initPage()` — the entry point / router

```js
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
```

- Reads the current page's identity via `getCurrentPage()` (which reads `data-page` from `<body>`).
- Runs three **universal** functions on every page (nav highlighting, traffic alert text, hero stats) regardless of which page loaded.
- Then uses an `if / else if` chain to act as a lightweight **client-side router**: since this single `main.js` file is shared by all five HTML pages, this dispatches to only the page-specific setup functions needed (e.g., only the Drivers page renders driver cards).

---

### 3.17 Bootstrapping and cleanup

```js
    document.addEventListener("DOMContentLoaded", initPage);

    window.addEventListener("beforeunload", function () {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
        }
    });
})();
```

- **`DOMContentLoaded`**: fires once the HTML has been fully parsed (but before images/stylesheets necessarily finish loading) — the standard, safe point to start running DOM-manipulating JS, ensuring all elements referenced by `getElementById`/`querySelector` already exist.
- **`beforeunload`**: fires just before the user navigates away from or closes the page.
- **`cancelAnimationFrame(id)`**: stops a pending animation frame request, preventing the animation loop from continuing to run (and wasting CPU/battery) after the page is being torn down — good practice for `requestAnimationFrame`-based animations.
- The closing `})();` invokes the IIFE that wraps the entire module, kicking off execution of everything inside it (though note: the top-level statements inside the IIFE, like the `addEventListener` calls, run immediately; `initPage` itself only runs once `DOMContentLoaded` fires).

---

## 4. Summary of JavaScript features demonstrated

| Category | Features used |
|---|---|
| **Scoping & declarations** | `const`, `let`, IIFE (module pattern), closures, `"use strict"` |
| **Data structures** | Arrays, array-of-objects, object literals |
| **Control flow** | `if/else if/else`, ternary operator, `for`, `while`, `do...while`, `continue` |
| **Functions** | Named function declarations, anonymous function expressions, nested functions, function composition/reuse |
| **Operators** | `===`, `&&`, `||`, `%` (modulo), string concatenation (`+`), compound assignment |
| **String methods** | `.trim()`, `.split()`, `.replace()`, `.pop()` (array), template-free concatenation |
| **Regular expressions** | Literal syntax (`/pattern/flags`), `.test()`, global flag `g`, anchors, character classes, quantifiers |
| **DOM API** | `getElementById`, `querySelector`, `querySelectorAll`, `createElement`, `appendChild`, `remove`, `classList.add/remove`, `dataset`, `innerHTML`, `textContent`, `getAttribute` |
| **Events** | `addEventListener` for `click`, `submit`, `DOMContentLoaded`, `resize`, `beforeunload`; `event.preventDefault()` |
| **Canvas API** | `getContext("2d")`, `fillRect`, `clearRect`, `beginPath/moveTo/lineTo/stroke`, `arc`, `fillText`, `fillStyle`, `strokeStyle` |
| **Browser/timing APIs** | `requestAnimationFrame`, `cancelAnimationFrame`, `Date`, `window.location` |
| **Built-in objects** | `Math.round`, `Math.random`, `Math.PI`, `String()` conversion |

---

*Prepared as a supporting reference document for the RideXpress project presentation.*
