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
---
---

## ترجمه بخش ۱

# `main.js` — توضیح خط‌به‌خط

### پروژه RideXpress — آموزش کامل کد JavaScript برای ارائه

این سند، تمام بخش‌های فایل `main.js` را توضیح می‌دهد؛ اینکه هر قسمت چه کاری انجام می‌دهد و از کدام قابلیت زبان **JavaScript** یا **Web API** استفاده می‌کند.

ترتیب توضیحات دقیقاً مطابق ترتیب خود فایل است:

**داده‌ها (Data) → منطق برنامه (Application Logic)**

---

# ۱. ساختار کلی فایل (File-level Structure)

این فایل از نظر مفهومی به دو بخش اصلی تقسیم شده است:

1. **بخش داده‌ها (Data / Variables)**

   شامل ثابت‌ها (`const`) و آرایه‌هایی از آبجکت‌ها است که نقش پایگاه داده‌ی کوچک برنامه را دارند. اطلاعاتی مانند:

   * راننده‌ها (Drivers)
   * سفرهای تایم‌لاین (Timeline Rides)
   * تصاویر و اطلاعات گالری (Gallery Items)

   همگی در این قسمت نگهداری می‌شوند.

2. **بخش منطق برنامه (Application Logic)**

   تمام توابع برنامه داخل یک **IIFE** (Immediately Invoked Function Expression) قرار گرفته‌اند.

   این توابع اطلاعات بخش داده‌ها را می‌خوانند و بر اساس آن صفحه‌ی وب را به‌روزرسانی می‌کنند.

---

### کد

```javascript
(function () {
    "use strict";
    ...
})();
```

---

## IIFE چیست؟

**IIFE** مخفف عبارت

> **Immediately Invoked Function Expression**

است.

یعنی:

یک تابع که **همان لحظه‌ای که تعریف می‌شود، فوراً اجرا نیز می‌شود.**

هدف اصلی آن ایجاد یک **محدوده‌ی خصوصی (Private Scope)** است.

در نتیجه متغیرها و توابع داخلی مانند:

* `animationFrameId`
* `taxiDots`
* و سایر توابع کمکی

وارد فضای سراسری مرورگر (**Global Scope**) نمی‌شوند و داخل شیء `window` قرار نمی‌گیرند.

این الگو یکی از روش‌های کلاسیک سازمان‌دهی پروژه‌های **Vanilla JavaScript** است و به آن **Module Pattern** نیز گفته می‌شود.

---

### توضیح بیشتر (برای امتحان)

اگر IIFE وجود نداشته باشد، تمام متغیرهای فایل مستقیماً داخل `window` قرار می‌گیرند.

مثلاً:

```javascript
let number = 5;
```

در فایل‌های معمولی ممکن است بعداً به صورت زیر قابل دسترسی باشد:

```javascript
window.number
```

اما وقتی همان متغیر داخل IIFE تعریف شود، فقط خود فایل به آن دسترسی دارد و هیچ فایل JavaScript دیگری نمی‌تواند مستقیماً از آن استفاده کند.

این موضوع باعث می‌شود:

* احتمال تداخل نام متغیرها کاهش پیدا کند.
* امنیت کد بیشتر شود.
* ساختار پروژه منظم‌تر باشد.

---

## `"use strict"` چیست؟

عبارت

```javascript
"use strict";
```

حالت **Strict Mode** را فعال می‌کند.

Strict Mode باعث می‌شود جاوااسکریپت سخت‌گیرانه‌تر رفتار کند و بسیاری از اشتباهات برنامه‌نویس را همان ابتدا گزارش دهد.

به عنوان مثال:

اگر بنویسیم:

```javascript
name = "Ali";
```

در حالت معمولی، جاوااسکریپت خودش یک متغیر سراسری ایجاد می‌کند.

اما در حالت Strict Mode همین کد خطا تولید می‌کند، چون متغیر قبلاً تعریف نشده است.

---

### مزایای Strict Mode

* جلوگیری از ایجاد متغیرهای سراسری ناخواسته
* جلوگیری از برخی خطاهای خاموش (Silent Errors)
* افزایش امنیت کد
* کمک به موتور JavaScript برای بهینه‌تر اجرا کردن برنامه
* جلوگیری از استفاده از برخی دستورات قدیمی و ناامن زبان

---

### نکته امتحانی

اگر از شما پرسیده شد:

**چرا کل پروژه داخل IIFE قرار گرفته است؟**

پاسخ کامل این است:

> برای ایجاد یک محدوده‌ی خصوصی (Private Scope)، جلوگیری از ورود متغیرها و توابع به فضای سراسری (`window`)، جلوگیری از تداخل نام‌ها و پیاده‌سازی الگوی Module Pattern در پروژه‌های Vanilla JavaScript.

اگر پرسیده شد:

**چرا از `"use strict"` استفاده شده است؟**

پاسخ:

> برای فعال کردن حالت Strict Mode تا خطاهای رایج جاوااسکریپت زودتر شناسایی شوند، از ایجاد متغیرهای ناخواسته جلوگیری شود و امنیت و کیفیت کد افزایش پیدا کند.



---
---
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

---
---
---

# بخش ۲ — قسمت داده‌ها (Data Section)

در ابتدای فایل `main.js`، داده‌های اصلی برنامه تعریف شده‌اند.

این داده‌ها نقش یک **پایگاه داده‌ی کوچک (In-Memory Database)** را دارند؛ یعنی اطلاعات مستقیماً داخل خود فایل JavaScript ذخیره شده‌اند و از سرور یا دیتابیس دریافت نمی‌شوند.

---

# 2.1 ثابت‌های ساده (Simple Constants)

```javascript
const BRAND_NAME = "RideXpress";
const SUPPORT_PHONE = "+98-916-293-23-29";
const AVG_PICKUP_MINUTES = (3 + 4 + 5) / 3;
```

در این قسمت سه ثابت تعریف شده‌اند.

---

## `const`

کلمه‌ی کلیدی **`const`** برای تعریف متغیرهایی استفاده می‌شود که قرار نیست مقدارشان بعداً تغییر کند.

برخلاف `let`، پس از مقداردهی اولیه دیگر نمی‌توان مقدار یک `const` را دوباره تغییر داد.

مثال:

```javascript
const name = "Ali";
```

این صحیح است.

اما:

```javascript
name = "Reza";
```

باعث ایجاد خطا می‌شود.

---

### چرا اینجا از `const` استفاده شده است؟

چون:

* نام برند همیشه ثابت است.
* شماره تماس پشتیبانی ثابت است.
* میانگین زمان رسیدن راننده نیز فقط یک بار محاسبه می‌شود و دیگر تغییر نمی‌کند.

بنابراین بهترین انتخاب استفاده از `const` است.

---

# BRAND_NAME

```javascript
const BRAND_NAME = "RideXpress";
```

نام برند پروژه را نگهداری می‌کند.

بعداً در بخش‌های مختلف برنامه از همین متغیر استفاده می‌شود.

مثلاً روی Canvas نوشته می‌شود:

```
RideXpress — Live Map
```

به جای اینکه چندین بار رشته‌ی `"RideXpress"` نوشته شود، فقط یک بار تعریف شده است.

---

### مزیت

اگر روزی نام پروژه تغییر کند:

```javascript
RideXpress
```

به

```javascript
TaxiGo
```

فقط کافی است همین یک خط تغییر کند و کل پروژه به‌روزرسانی می‌شود.

---

# SUPPORT_PHONE

```javascript
const SUPPORT_PHONE = "+98-916-293-23-29";
```

شماره تماس پشتیبانی پروژه را نگهداری می‌کند.

مزیت این کار این است که اگر شماره تماس تغییر کند، فقط همین متغیر تغییر داده می‌شود و نیازی به جستجو در کل پروژه نیست.

---

# AVG_PICKUP_MINUTES

```javascript
const AVG_PICKUP_MINUTES = (3 + 4 + 5) / 3;
```

این متغیر میانگین زمان رسیدن راننده را محاسبه می‌کند.

نکته مهم این است که مقدار به صورت مستقیم نوشته نشده است.

مثلاً ننوشته:

```javascript
const AVG_PICKUP_MINUTES = 4;
```

بلکه یک عبارت ریاضی نوشته شده است.

---

## JavaScript ابتدا عبارت را محاسبه می‌کند

مراحل اجرا:

```
3 + 4 + 5
```

برابر است با

```
12
```

سپس:

```
12 / 3
```

برابر می‌شود با

```
4
```

در نهایت مقدار ذخیره شده داخل متغیر برابر است با:

```javascript
4
```

---

## این قسمت چه چیزی را آموزش می‌دهد؟

این خط نشان می‌دهد که JavaScript قبل از ذخیره کردن مقدار داخل متغیر، ابتدا **سمت راست علامت مساوی (`=`)** را کاملاً محاسبه می‌کند.

یعنی:

```javascript
const x = 2 + 5 * 10;
```

ابتدا:

```
5 × 10 = 50
```

سپس:

```
50 + 2 = 52
```

و در نهایت:

```javascript
x = 52
```

ذخیره می‌شود.

---

## نکته آموزشی

این ویژگی یکی از مهم‌ترین مفاهیم زبان JavaScript است.

سمت راست عملگر انتساب (`=`) می‌تواند شامل موارد زیر باشد:

* محاسبات ریاضی
* فراخوانی توابع
* عملیات منطقی
* دسترسی به متغیرها
* یا ترکیبی از همه‌ی آن‌ها

JavaScript همیشه ابتدا نتیجه‌ی عبارت را محاسبه می‌کند و سپس آن را داخل متغیر قرار می‌دهد.

---

## نکته امتحانی

اگر پرسیده شد:

**چرا مقدار `AVG_PICKUP_MINUTES` به صورت `(3 + 4 + 5) / 3` نوشته شده است و مستقیماً عدد 4 قرار نگرفته است؟**

پاسخ:

> برای نشان دادن اینکه JavaScript قبل از انتساب مقدار، عبارت سمت راست را محاسبه می‌کند. این موضوع مفهوم **Expression Evaluation** (ارزیابی عبارت) را نشان می‌دهد و ثابت می‌کند که مقدار متغیر می‌تواند نتیجه‌ی یک محاسبه باشد، نه فقط یک عدد ثابت.


---
---
---

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
---
---

# 2.2 آرایه `drivers` — آرایه‌ای از آبجکت‌ها (Array of Objects)

```javascript
const drivers = [
    {
        id: "RX-2041",
        name: "Reza Ahmadi",
        phone: "0916-123-4567",
        car: "BMW 320i",
        photo: "pic/cars.jpg",
        status: "available",
        rating: 4.9,
        plate: "..."
    },
    ...
];
```

در این قسمت، اطلاعات تمام راننده‌های برنامه داخل متغیری به نام `drivers` ذخیره شده است.

این داده‌ها نقش **پایگاه داده‌ی برنامه** را دارند و در ادامه فایل، برای ساخت کارت راننده‌ها، شمارش راننده‌های آنلاین و فیلتر کردن راننده‌ها استفاده می‌شوند.

---

# آرایه (Array)

`drivers` یک **آرایه (Array)** است.

آرایه ساختاری در JavaScript است که می‌تواند چندین مقدار را پشت سر هم نگهداری کند.

آرایه‌ها با براکت (`[]`) ساخته می‌شوند.

مثال:

```javascript
const numbers = [10, 20, 30];
```

در این مثال سه عدد داخل یک آرایه قرار گرفته‌اند.

اما در پروژه RideXpress، اعضای آرایه عدد نیستند؛ بلکه هر عضو یک **آبجکت (Object)** است.

---

# آبجکت (Object)

هر راننده یک آبجکت مستقل است.

آبجکت‌ها با آکولاد (`{}`) ساخته می‌شوند.

هر آبجکت از چندین **ویژگی (Property)** تشکیل شده است.

مثلاً:

```javascript
{
    id: "RX-2041",
    name: "Reza Ahmadi",
    phone: "0916-123-4567"
}
```

در این آبجکت:

| ویژگی | مقدار         |
| ----- | ------------- |
| id    | RX-2041       |
| name  | Reza Ahmadi   |
| phone | 0916-123-4567 |

هر ویژگی از دو بخش تشکیل شده است:

```
کلید (Key) : مقدار (Value)
```

مثلاً:

```javascript
name: "Reza Ahmadi"
```

در اینجا:

* Key → `name`
* Value → `"Reza Ahmadi"`

---

# آرایه‌ای از آبجکت‌ها (Array of Objects)

چون داخل آرایه، آبجکت قرار گرفته است، به این ساختار گفته می‌شود:

> **Array of Objects**

این یکی از رایج‌ترین روش‌های نگهداری داده در JavaScript است.

تقریباً تمام برنامه‌های وب از همین الگو استفاده می‌کنند.

مثلاً اگر اطلاعات کاربران را داشته باشیم:

```javascript
const users = [
    {
        name: "Ali",
        age: 22
    },
    {
        name: "Sara",
        age: 25
    }
];
```

هر عضو آرایه یک کاربر است.

در پروژه RideXpress نیز هر عضو آرایه یک راننده است.

---

# دسترسی به اطلاعات راننده

برای دسترسی به یک راننده، ابتدا شماره‌ی خانه‌ی آرایه (Index) مشخص می‌شود.

مثلاً:

```javascript
drivers[0]
```

اولین راننده را برمی‌گرداند.

سپس می‌توان به ویژگی‌های آن دسترسی داشت.

مثلاً:

```javascript
drivers[0].name
```

خروجی:

```text
Reza Ahmadi
```

یا:

```javascript
drivers[0].car
```

خروجی:

```text
BMW 320i
```

در اینجا از **Dot Notation (دسترسی با نقطه)** استفاده شده است.

---

# چرا همه‌ی راننده‌ها ویژگی‌های یکسان دارند؟

تمام راننده‌ها دارای این ویژگی‌ها هستند:

```text
id
name
phone
car
photo
status
rating
plate
```

به این مجموعه‌ی ثابت از ویژگی‌ها، **Schema (شِما)** گفته می‌شود.

جاوااسکریپت به‌صورت پیش‌فرض Schema را اجباری نمی‌کند؛ یعنی می‌توانید آبجکت‌هایی با ویژگی‌های متفاوت نیز بسازید.

اما در این پروژه، برنامه‌نویس به‌صورت قراردادی برای تمام راننده‌ها ساختار یکسانی در نظر گرفته است.

این کار باعث می‌شود نوشتن کد بسیار ساده‌تر شود.

مثلاً در هر جای برنامه می‌توان بدون نگرانی نوشت:

```javascript
driver.name
driver.phone
driver.status
```

چون مطمئن هستیم همه‌ی راننده‌ها این ویژگی‌ها را دارند.

---

# ویژگی `status`

یکی از مهم‌ترین ویژگی‌ها، `status` است.

مقادیر آن عبارت‌اند از:

```text
available
busy
returning
scheduled
```

هر مقدار، وضعیت فعلی راننده را مشخص می‌کند.

| مقدار     | معنی                         |
| --------- | ---------------------------- |
| available | راننده آزاد است.             |
| busy      | راننده در حال انجام سفر است. |
| returning | راننده در حال بازگشت است.    |
| scheduled | برای سفر آینده رزرو شده است. |

---

## Enum غیررسمی (Informal Enum)

در زبان‌هایی مانند Java یا C# معمولاً برای چنین حالت‌هایی از **Enum** استفاده می‌شود.

اما در JavaScript ساده (Vanilla JavaScript)، این مقادیر فقط رشته (String) هستند.

با این حال، چون برنامه فقط همین چهار مقدار را معتبر می‌داند، این رشته‌ها نقش یک **Enum غیررسمی (Informal Enum)** را بازی می‌کنند.

بعداً توابعی مانند:

```javascript
getStatusBadgeClass()

getStatusLabel()
```

همین رشته‌ها را دریافت می‌کنند و بر اساس آن‌ها رنگ Badge یا متن وضعیت راننده را تعیین می‌کنند.

---

# مزیت استفاده از آرایه‌ی آبجکت‌ها

این ساختار چند مزیت مهم دارد:

* نگهداری اطلاعات مرتبط هر راننده در یک محل
* دسترسی آسان به اطلاعات با استفاده از اندیس آرایه و نام ویژگی
* امکان پیمایش ساده با حلقه‌ها (`for`)
* قابلیت ساخت خودکار کارت‌های HTML بدون تکرار کد
* اضافه کردن راننده‌ی جدید فقط با افزودن یک آبجکت جدید به آرایه، بدون تغییر در منطق برنامه

---

## نکته امتحانی

اگر از شما پرسیده شد:

**چرا از آرایه‌ای از آبجکت‌ها استفاده شده است؟**

پاسخ کامل:

> چون هر راننده دارای چندین ویژگی (مانند نام، خودرو، شماره تماس، وضعیت و امتیاز) است. استفاده از آرایه‌ی آبجکت‌ها باعث می‌شود اطلاعات هر راننده به‌صورت منظم نگهداری شود، بتوان با حلقه روی همه‌ی راننده‌ها پیمایش انجام داد و رابط کاربری به‌صورت پویا (Dynamic) بر اساس همین داده‌ها ساخته شود.

---

# 2.3 آرایه‌های `timelineRides` و `galleryItems`

```javascript
const timelineRides = [
    { time: "14:32", taxiId: "RX-2041", detail: "...", status: "moving" },
    ...
];

const galleryItems = [
    { image: "pic/cars.jpg", title: "BMW", text: "..." },
    ...
];
```

این دو متغیر نیز دقیقاً از همان الگوی **Array of Objects** استفاده می‌کنند.

تنها تفاوت این است که هر آرایه نوع متفاوتی از داده را نگهداری می‌کند.

---

## `timelineRides`

این آرایه اطلاعات مربوط به سفرهای انجام‌شده یا در حال انجام را ذخیره می‌کند.

هر عضو شامل اطلاعاتی مانند:

* زمان سفر (`time`)
* شناسه تاکسی (`taxiId`)
* توضیحات سفر (`detail`)
* وضعیت سفر (`status`)

است.

بعداً تابع `renderTimeline()` این اطلاعات را خوانده و به‌صورت خودکار آیتم‌های تایم‌لاین را در صفحه ایجاد می‌کند.

---

## `galleryItems`

این آرایه اطلاعات گالری تصاویر را نگهداری می‌کند.

هر آبجکت شامل:

* مسیر تصویر (`image`)
* عنوان (`title`)
* متن توضیح (`text`)

است.

در ادامه، تابع `renderGallery()` این داده‌ها را به عناصر HTML تبدیل می‌کند و کارت‌های گالری را به‌صورت پویا روی صفحه نمایش می‌دهد.

---

## نکته مهم

در این پروژه، هیچ‌کدام از این داده‌ها به‌صورت مستقیم داخل فایل HTML نوشته نشده‌اند.

تمام اطلاعات ابتدا داخل آرایه‌های JavaScript ذخیره شده‌اند و سپس هنگام اجرای برنامه، به‌صورت **پویا (Dynamic)** به HTML تبدیل می‌شوند.

این روش باعث می‌شود:

* تغییر اطلاعات بسیار آسان‌تر باشد.
* از تکرار کد HTML جلوگیری شود.
* افزودن آیتم جدید فقط با اضافه کردن یک آبجکت به آرایه انجام شود.
* رابط کاربری همیشه از روی داده‌ها ساخته شود، نه برعکس.

---

## نکته امتحانی

اگر پرسیده شد:

**چرا `timelineRides` و `galleryItems` نیز مانند `drivers` به‌صورت آرایه‌ای از آبجکت‌ها تعریف شده‌اند؟**

پاسخ:

> زیرا هر آیتم دارای چند ویژگی مرتبط است و این ساختار امکان ذخیره‌سازی منظم داده‌ها، پیمایش با حلقه‌ها و تولید خودکار عناصر HTML را فراهم می‌کند. این الگو یکی از رایج‌ترین روش‌های مدیریت داده در برنامه‌های JavaScript است.


---
---
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
---
---

# بخش ۳ — منطق برنامه (Application Logic)

بعد از بخش داده‌ها، وارد مهم‌ترین قسمت فایل می‌شویم.

از اینجا به بعد تقریباً تمام رفتارهای برنامه توسط توابع مختلف کنترل می‌شود.

تمام این توابع داخل یک **IIFE** قرار گرفته‌اند؛ بنابراین هیچ‌کدام وارد فضای سراسری (`window`) نمی‌شوند.

---

# 3.1 وضعیت خصوصی ماژول (Module-level Private State)

```javascript
let animationFrameId = null;
let taxiDots = [];
const canvasTaxiCount = 5;
const peakHourStart = 17;
const peakHourEnd = 20;
```

این متغیرها خارج از تمام توابع قرار دارند، اما همچنان داخل IIFE هستند.

بنابراین فقط توابع همین فایل به آن‌ها دسترسی دارند.

---

# animationFrameId

```javascript
let animationFrameId = null;
```

این متغیر شناسه‌ی آخرین Animation Frame را نگهداری می‌کند.

بعداً وقتی تابع

```javascript
requestAnimationFrame()
```

اجرا می‌شود، مرورگر یک عدد برمی‌گرداند.

مثلاً:

```javascript
animationFrameId = requestAnimationFrame(drawFrame);
```

این عدد داخل متغیر ذخیره می‌شود.

بعداً هنگام خروج از صفحه از همین شناسه استفاده می‌شود تا انیمیشن متوقف شود.

مثلاً:

```javascript
cancelAnimationFrame(animationFrameId);
```

---

## چرا مقدار اولیه `null` است؟

در ابتدای اجرای برنامه هنوز هیچ انیمیشنی وجود ندارد.

بنابراین مقدار متغیر برابر است با:

```javascript
null
```

یعنی:

> هنوز هیچ Animation Frame ایجاد نشده است.

---

# taxiDots

```javascript
let taxiDots = [];
```

این متغیر یک آرایه است.

داخل آن اطلاعات تمام نقطه‌های متحرک روی Canvas ذخیره می‌شود.

هر نقطه بعداً چنین ساختاری خواهد داشت:

```javascript
{
    x: 120,
    y: 90,
    speed: 0.8,
    direction: 1
}
```

هر آبجکت نماینده‌ی یک تاکسی روی نقشه است.

---

## چرا `let`؟

در ابتدای برنامه آرایه خالی است.

بعداً داخل تابع

```javascript
initTaxiCanvas()
```

چندین بار مقدار آن تغییر می‌کند.

مثلاً:

```javascript
taxiDots = [];
```

یا

```javascript
taxiDots.push(...)
```

به همین دلیل نمی‌توان از `const` استفاده کرد.

---

# canvasTaxiCount

```javascript
const canvasTaxiCount = 5;
```

تعداد تاکسی‌هایی که روی Canvas رسم می‌شوند.

بعداً در حلقه‌ی

```javascript
do...while
```

از همین مقدار استفاده می‌شود.

اگر مقدار را تغییر دهیم:

```javascript
const canvasTaxiCount = 10;
```

ده تاکسی روی نقشه رسم خواهد شد.

---

# peakHourStart

```javascript
const peakHourStart = 17;
```

شروع ساعت شلوغی شهر.

یعنی:

```text
17:00
```

---

# peakHourEnd

```javascript
const peakHourEnd = 20;
```

پایان ساعت شلوغی.

یعنی:

```text
20:00
```

بعداً تابع

```javascript
getTrafficMessage()
```

بررسی می‌کند که ساعت فعلی بین این دو مقدار هست یا خیر.

---

# چرا بعضی متغیرها `let` و بعضی `const` هستند؟

```javascript
let animationFrameId
let taxiDots
```

در طول اجرای برنامه تغییر می‌کنند.

پس باید از `let` استفاده شود.

اما:

```javascript
const canvasTaxiCount
const peakHourStart
const peakHourEnd
```

هیچ‌وقت تغییر نمی‌کنند.

بنابراین `const` انتخاب مناسبی است.

---

# مفهوم Closure

نویسنده‌ی اصلی فایل به نکته‌ی مهمی اشاره کرده است.

این متغیرها فقط متغیر معمولی نیستند.

آن‌ها توسط توابع داخلی استفاده می‌شوند.

مثلاً:

```javascript
function drawFrame() {
    ...
}
```

به متغیر

```javascript
taxiDots
```

دسترسی دارد.

با اینکه این متغیر خارج از تابع تعریف شده است.

---

## Closure چیست؟

Closure یکی از مهم‌ترین مفاهیم JavaScript است.

هر تابع علاوه بر کد خودش، به متغیرهای محیط اطرافش نیز دسترسی دارد.

مثلاً:

```javascript
function outer(){

    let count = 0;

    function inner(){
        count++;
    }

}
```

تابع

```javascript
inner()
```

می‌تواند به متغیر

```javascript
count
```

دسترسی داشته باشد.

در حالی که خودش آن را تعریف نکرده است.

این ویژگی را **Closure** می‌گویند.

---

## چرا Closure مهم است؟

به لطف Closure، تابع

```javascript
drawFrame()
```

در هر بار اجرای خود می‌تواند اطلاعات قبلی تاکسی‌ها را حفظ کند.

اگر Closure وجود نداشت،

هر بار اجرای تابع همه چیز از ابتدا ساخته می‌شد و انیمیشن حرکت تاکسی‌ها امکان‌پذیر نبود.

---

## نکته آموزشی

Closure باعث می‌شود:

* داده‌ها بین اجرای توابع حفظ شوند.
* متغیرها خصوصی باقی بمانند.
* بدون استفاده از متغیرهای Global بتوان اطلاعات را مدیریت کرد.

به همین دلیل Closure یکی از پایه‌ای‌ترین مفاهیم JavaScript محسوب می‌شود.

---

## نکته امتحانی

اگر پرسیده شد:

**چرا `animationFrameId` و `taxiDots` با `let` تعریف شده‌اند اما بقیه با `const`؟**

پاسخ:

> چون مقدار `animationFrameId` و `taxiDots` در طول اجرای برنامه تغییر می‌کند، بنابراین باید از `let` استفاده شود. اما مقادیر `canvasTaxiCount`، `peakHourStart` و `peakHourEnd` ثابت هستند و هرگز تغییر نمی‌کنند؛ به همین دلیل با `const` تعریف شده‌اند.

---

اگر پرسیده شد:

**Closure در این قسمت چه کاربردی دارد؟**

پاسخ:

> توابع داخلی مانند `drawFrame()` به متغیرهای تعریف‌شده در محدوده‌ی بیرونی (مانند `taxiDots` و `animationFrameId`) دسترسی دارند و حتی پس از پایان اجرای تابع بیرونی نیز این متغیرها را حفظ می‌کنند. این ویژگی JavaScript را **Closure** می‌نامند و باعث حفظ وضعیت (State) برنامه و اجرای صحیح انیمیشن‌ها می‌شود.


---
---
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
---
---

# 3.2 تابع `getCurrentPage()`

```javascript
function getCurrentPage() {
    return document.body.dataset.page || "";
}
```

این تابع یکی از ساده‌ترین اما مهم‌ترین توابع پروژه است.

وظیفه‌ی آن تشخیص این است که **در حال حاضر کدام صفحه‌ی سایت باز شده است.**

بعداً تابع `initPage()` بر اساس خروجی همین تابع تصمیم می‌گیرد کدام بخش از برنامه اجرا شود.

---

# ساختار تابع

```javascript
function getCurrentPage() {
```

این یک **Named Function Declaration** است.

یعنی تابعی که نام دارد و می‌توان در هر جای فایل آن را فراخوانی کرد.

نام تابع:

```text
getCurrentPage
```

از روی نام آن نیز مشخص است:

> «صفحه‌ی فعلی را به دست بیاور.»

---

## دستور return

داخل تابع فقط یک خط وجود دارد:

```javascript
return document.body.dataset.page || "";
```

کلمه‌ی کلیدی

```javascript
return
```

باعث می‌شود نتیجه‌ی تابع به محل فراخوانی برگردانده شود.

مثلاً:

```javascript
const page = getCurrentPage();
```

اگر خروجی تابع

```text
home
```

باشد،

متغیر `page` نیز برابر خواهد بود با

```text
home
```

---

# document چیست؟

```javascript
document
```

یکی از مهم‌ترین اشیای **DOM API** است.

این شیء نماینده‌ی کل صفحه‌ی HTML است.

به کمک آن می‌توان:

* عناصر HTML را پیدا کرد.
* متن آن‌ها را تغییر داد.
* عنصر جدید ایجاد کرد.
* رویدادها را مدیریت کرد.
* و بسیاری کارهای دیگر انجام داد.

تقریباً تمام پروژه‌های JavaScript با `document` سروکار دارند.

---

# document.body

```javascript
document.body
```

به عنصر

```html
<body>
```

صفحه اشاره می‌کند.

مثلاً اگر HTML چنین باشد:

```html
<body data-page="home">
```

آنگاه:

```javascript
document.body
```

به همین عنصر اشاره خواهد کرد.

---

# data-* Attribute

در HTML می‌توان ویژگی‌های دلخواه تعریف کرد.

مثلاً:

```html
<body data-page="home">
```

یا

```html
<div data-id="15">
```

یا

```html
<button data-status="busy">
```

ویژگی‌هایی که با

```text
data-
```

شروع می‌شوند،

ویژگی‌های سفارشی HTML5 هستند.

به آن‌ها می‌گویند:

> **Custom Data Attributes**

---

# dataset چیست؟

مرورگر تمام ویژگی‌های

```text
data-*
```

را داخل شیئی به نام

```javascript
dataset
```

قرار می‌دهد.

بنابراین:

```html
<body data-page="home">
```

در JavaScript تبدیل می‌شود به:

```javascript
document.body.dataset.page
```

یعنی:

```text
home
```

---

### مثال دیگر

اگر HTML باشد:

```html
<div
    data-name="Ali"
    data-age="22"
    data-city="Tehran">
</div>
```

در JavaScript خواهیم داشت:

```javascript
element.dataset.name
```

خروجی:

```text
Ali
```

و:

```javascript
element.dataset.age
```

خروجی:

```text
22
```

و:

```javascript
element.dataset.city
```

خروجی:

```text
Tehran
```

---

# چرا از dataset استفاده شده است؟

به جای اینکه داخل JavaScript نام صفحه را به صورت دستی مشخص کنیم،

هر صفحه خودش اعلام می‌کند که چه صفحه‌ای است.

مثلاً:

صفحه اصلی:

```html
<body data-page="home">
```

صفحه راننده‌ها:

```html
<body data-page="contact">
```

صفحه Timeline:

```html
<body data-page="timeline">
```

صفحه Gallery:

```html
<body data-page="gallery">
```

در نتیجه همان فایل `main.js`

روی تمام صفحات استفاده می‌شود.

اما رفتارش بر اساس مقدار

```javascript
dataset.page
```

تغییر می‌کند.

این یکی از مزیت‌های مهم استفاده از یک فایل JavaScript مشترک برای چندین صفحه است.

---

# عملگر `||`

قسمت آخر دستور:

```javascript
document.body.dataset.page || ""
```

از عملگر

```javascript
||
```

استفاده می‌کند.

این عملگر همان **Logical OR** است.

اما در JavaScript کاربرد بسیار مهم دیگری هم دارد:

استفاده به عنوان **مقدار پیش‌فرض (Default Value)**.

---

## مثال

```javascript
const name = undefined || "Unknown";
```

خروجی:

```text
Unknown
```

زیرا مقدار سمت چپ وجود ندارد.

---

مثال دیگر:

```javascript
const city = "Tehran" || "Unknown";
```

خروجی:

```text
Tehran
```

چون مقدار سمت چپ معتبر است.

---

# چرا اینجا از `|| ""` استفاده شده است؟

فرض کنیم برنامه‌نویس فراموش کرده باشد این را بنویسد:

```html
<body data-page="home">
```

در این صورت:

```javascript
document.body.dataset.page
```

برابر خواهد بود با:

```javascript
undefined
```

اما وجود مقدار

```javascript
|| ""
```

باعث می‌شود خروجی تابع به جای `undefined` برابر رشته‌ی خالی باشد:

```text
""
```

در نتیجه برنامه دچار خطا نمی‌شود.

---

# این تکنیک چه نام دارد؟

به این روش می‌گویند:

> **Fallback Value** یا **Default Value Pattern**

یکی از رایج‌ترین الگوهای JavaScript برای جلوگیری از خطاهای ناشی از مقادیر `undefined` یا `null` است.

---

# چرا این تابع مهم است؟

در انتهای فایل، تابع `initPage()` از این تابع استفاده می‌کند:

```javascript
const page = getCurrentPage();
```

و سپس تصمیم می‌گیرد:

```javascript
if(page === "home"){
    ...
}
else if(page === "timeline"){
    ...
}
```

بنابراین این تابع نقش یک **تشخیص‌دهنده‌ی صفحه (Page Detector)** را دارد.

---

# نکته آموزشی

این تابع نمونه‌ای بسیار خوب از چند مفهوم مهم JavaScript است:

* تعریف تابع (Function Declaration)
* استفاده از DOM API
* استفاده از `document.body`
* استفاده از `dataset`
* استفاده از ویژگی‌های سفارشی HTML5 (`data-*`)
* استفاده از عملگر `||` برای تعیین مقدار پیش‌فرض
* جلوگیری از بروز خطا با استفاده از Fallback Value

---

# نکته امتحانی

اگر پرسیده شد:

**وظیفه‌ی تابع `getCurrentPage()` چیست؟**

پاسخ:

> این تابع مقدار ویژگی `data-page` عنصر `<body>` را از طریق `document.body.dataset.page` می‌خواند و نام صفحه‌ی فعلی را برمی‌گرداند. اگر این ویژگی وجود نداشته باشد، با استفاده از عملگر `||` یک رشته‌ی خالی (`""`) را به عنوان مقدار پیش‌فرض برمی‌گرداند تا از بروز خطا جلوگیری شود.

---

اگر پرسیده شد:

**چرا از `dataset` استفاده شده است؟**

پاسخ:

> زیرا `dataset` راه استاندارد DOM برای دسترسی به ویژگی‌های سفارشی HTML5 (`data-*`) است. این روش باعث می‌شود اطلاعاتی مانند نام صفحه بدون نیاز به متغیرهای سراسری یا کدنویسی تکراری، مستقیماً از HTML در اختیار JavaScript قرار گیرد.


---
---
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
---
---

# 3.3 تابع `countAvailableDrivers()`

```javascript
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

این تابع تعداد راننده‌هایی را که در وضعیت **آزاد (Available)** هستند، محاسبه می‌کند.

در واقع هر بار که این تابع اجرا شود، کل آرایه‌ی `drivers` را بررسی می‌کند و فقط راننده‌هایی را که وضعیتشان `"available"` است می‌شمارد.

در انتها، تعداد راننده‌های آزاد را برمی‌گرداند.

---

# مراحل اجرای تابع

فرض کنید آرایه‌ی `drivers` شامل ۵ راننده باشد.

اجرای تابع به این ترتیب انجام می‌شود:

1. متغیر `count` برابر صفر می‌شود.
2. حلقه از اولین راننده شروع می‌شود.
3. وضعیت هر راننده بررسی می‌شود.
4. اگر وضعیت راننده `"available"` باشد، مقدار `count` یک واحد افزایش پیدا می‌کند.
5. این روند تا آخرین راننده ادامه پیدا می‌کند.
6. در پایان مقدار `count` برگردانده می‌شود.

---

# متغیر `count`

```javascript
let count = 0;
```

این متغیر نقش **شمارنده (Counter)** را دارد.

ابتدا مقدار آن صفر است زیرا هنوز هیچ راننده‌ای بررسی نشده است.

هر بار که یک راننده‌ی آزاد پیدا شود:

```javascript
count = count + 1;
```

اجرا می‌شود.

مثلاً:

```
ابتدا:

count = 0

اولین راننده آزاد:

count = 1

دومین راننده آزاد:

count = 2

سومین راننده آزاد:

count = 3
```

در پایان اگر سه راننده آزاد باشند، خروجی تابع برابر خواهد بود با:

```javascript
3
```

---

# چرا از `let` استفاده شده است؟

متغیر `count` در طول اجرای تابع مرتب تغییر می‌کند.

ابتدا:

```javascript
0
```

بعد:

```javascript
1
```

بعد:

```javascript
2
```

و ...

به همین دلیل نمی‌توان از `const` استفاده کرد.

---

# حلقه `for`

```javascript
for (let i = 0; i < drivers.length; i++)
```

این یک **Classic For Loop** است.

حلقه‌ی `for` سه بخش دارد:

```javascript
for (
    مقدار اولیه;
    شرط;
    افزایش
)
```

در اینجا:

### مقدار اولیه

```javascript
let i = 0;
```

یعنی حلقه از اولین عضو آرایه شروع می‌کند.

---

### شرط

```javascript
i < drivers.length
```

تا زمانی که شماره‌ی خانه‌ی آرایه از تعداد اعضا کمتر باشد، حلقه ادامه پیدا می‌کند.

فرض کنید:

```javascript
drivers.length = 5
```

پس مقادیر `i` خواهند بود:

```
0
1
2
3
4
```

وقتی:

```
i = 5
```

شرط برقرار نیست و حلقه متوقف می‌شود.

---

### افزایش

```javascript
i++
```

یعنی بعد از پایان هر دور حلقه:

```
i = i + 1
```

---

# `drivers.length`

```javascript
drivers.length
```

ویژگی `length` تعداد اعضای آرایه را برمی‌گرداند.

مثلاً:

```javascript
const numbers = [10,20,30];
```

اگر بنویسیم:

```javascript
numbers.length
```

خروجی:

```
3
```

در پروژه نیز:

```javascript
drivers.length
```

تعداد راننده‌ها را برمی‌گرداند.

مزیت استفاده از `length` این است که اگر بعداً راننده‌ی جدید اضافه شود، حلقه به صورت خودکار تعداد بیشتری را بررسی خواهد کرد و نیازی به تغییر کد نیست.

---

# دسترسی به عضو آرایه

```javascript
drivers[i]
```

این عبارت یعنی:

> عضو شماره‌ی `i` از آرایه‌ی `drivers`

مثلاً اگر:

```
i = 2
```

باشد:

```javascript
drivers[2]
```

یعنی سومین راننده‌ی آرایه.

---

# دسترسی به ویژگی آبجکت

```javascript
drivers[i].status
```

ابتدا عضو آرایه انتخاب می‌شود.

سپس با استفاده از **Dot Notation** به ویژگی `status` آن دسترسی پیدا می‌کنیم.

مثلاً:

```javascript
drivers[2].status
```

ممکن است مقدار زیر را برگرداند:

```javascript
"available"
```

یا:

```javascript
"busy"
```

---

# عملگر `===`

```javascript
drivers[i].status === "available"
```

اینجا از عملگر

```javascript
===
```

استفاده شده است.

به آن می‌گویند:

> **Strict Equality Operator**

این عملگر هم **نوع داده** و هم **مقدار** را مقایسه می‌کند.

---

## تفاوت `==` و `===`

```javascript
5 == "5"
```

خروجی:

```javascript
true
```

زیرا JavaScript نوع داده را تبدیل می‌کند.

اما:

```javascript
5 === "5"
```

خروجی:

```javascript
false
```

زیرا یکی عدد است و دیگری رشته.

به همین دلیل تقریباً همیشه توصیه می‌شود از `===` استفاده شود.

---

# دستور `if`

```javascript
if (drivers[i].status === "available")
```

اگر وضعیت راننده برابر `"available"` باشد،

دستور داخل بلوک اجرا می‌شود.

در غیر این صورت، برنامه از آن عبور می‌کند.

---

# افزایش شمارنده

```javascript
count = count + 1;
```

یعنی:

```
مقدار فعلی count

+

1
```

سپس دوباره داخل `count` ذخیره می‌شود.

همین دستور را می‌توان به شکل کوتاه‌تر نیز نوشت:

```javascript
count++;
```

یا:

```javascript
count += 1;
```

اما نویسنده‌ی پروژه عمداً شکل کامل را نوشته است تا برای افراد تازه‌کار قابل فهم‌تر باشد.

---

# دستور `return`

در انتهای تابع داریم:

```javascript
return count;
```

پس از پایان حلقه، مقدار نهایی شمارنده به محل فراخوانی تابع برگردانده می‌شود.

مثلاً:

```javascript
const onlineDrivers = countAvailableDrivers();
```

اگر سه راننده آزاد باشند:

```javascript
onlineDrivers
```

برابر خواهد بود با:

```javascript
3
```

---

# چرا از `filter()` استفاده نشده است؟

می‌توانستیم این تابع را به شکل زیر نیز بنویسیم:

```javascript
const count = drivers.filter(driver => driver.status === "available").length;
```

اما نویسنده عمداً از حلقه‌ی `for` استفاده کرده است.

دلیل آن آموزشی است.

این روش مفاهیم پایه‌ای زیر را بهتر نشان می‌دهد:

* حلقه‌ی `for`
* اندیس آرایه
* دسترسی به اعضای آرایه
* شرط `if`
* شمارنده (Counter Pattern)

بنابراین برای آموزش، این روش مناسب‌تر است.

---

# الگوی Counter Pattern

این تابع یکی از معروف‌ترین الگوهای برنامه‌نویسی را پیاده‌سازی می‌کند.

به آن می‌گویند:

> **Counter Pattern**

مراحل این الگو همیشه یکسان است:

1. تعریف شمارنده با مقدار صفر.
2. پیمایش عناصر.
3. بررسی شرط.
4. افزایش شمارنده در صورت برقرار بودن شرط.
5. بازگرداندن مقدار نهایی.

این الگو در بسیاری از زبان‌های برنامه‌نویسی استفاده می‌شود.

---

# نکات آموزشی

این تابع مفاهیم زیر را آموزش می‌دهد:

* تعریف تابع (Function Declaration)
* متغیر قابل تغییر (`let`)
* الگوی شمارنده (Counter Pattern)
* حلقه‌ی `for`
* ویژگی `length`
* اندیس‌گذاری آرایه (`Array Indexing`)
* دسترسی به ویژگی‌های آبجکت با Dot Notation
* عملگر مقایسه‌ی سخت‌گیرانه (`===`)
* دستور شرطی `if`
* بازگرداندن مقدار با `return`

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `countAvailableDrivers()` چیست؟**

پاسخ:

> این تابع تمام عناصر آرایه‌ی `drivers` را با استفاده از یک حلقه‌ی `for` پیمایش می‌کند، وضعیت هر راننده را بررسی می‌کند و در صورت برابر بودن مقدار `status` با `"available"`، شمارنده را یک واحد افزایش می‌دهد. در پایان نیز تعداد راننده‌های آزاد را با استفاده از `return` برمی‌گرداند.

---

**اگر پرسیده شد:**

**چرا از `===` استفاده شده است؟**

پاسخ:

> چون `===` علاوه بر مقدار، نوع داده را نیز مقایسه می‌کند و از تبدیل خودکار نوع داده (Type Coercion) جلوگیری می‌کند؛ بنابراین نسبت به `==` دقیق‌تر و ایمن‌تر است و در برنامه‌های حرفه‌ای استفاده از آن توصیه می‌شود.



---
---
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
---
---

# 3.4 توابع `getStatusBadgeClass(status)` و `getStatusLabel(status)`

```javascript
function getStatusBadgeClass(status) {

    if (status === "available" || status === "free") {
        return "bg-success";
    }

    else if (status === "busy" || status === "moving") {
        return "bg-warning text-dark";
    }

    else if (status === "scheduled") {
        return "bg-primary";
    }

    else if (status === "returning") {
        return "bg-secondary";
    }

    return "bg-dark";
}
```

این تابع وضعیت راننده را دریافت می‌کند و بر اساس آن **کلاس CSS مربوط به Badge** را برمی‌گرداند.

به زبان ساده:

ورودی:

```text
available
```

خروجی:

```text
bg-success
```

یا

ورودی:

```text
busy
```

خروجی:

```text
bg-warning text-dark
```

این تابع خودش هیچ چیزی روی صفحه رسم نمی‌کند.

فقط تصمیم می‌گیرد که برای هر وضعیت، چه رنگی استفاده شود.

بعداً تابع

```javascript
renderDriverCards()
```

از خروجی این تابع استفاده می‌کند.

---

# ورودی تابع (Parameter)

```javascript
function getStatusBadgeClass(status)
```

متغیر

```javascript
status
```

یک **پارامتر (Parameter)** است.

وقتی تابع فراخوانی می‌شود:

```javascript
getStatusBadgeClass(driver.status);
```

مقدار وضعیت راننده داخل متغیر

```javascript
status
```

قرار می‌گیرد.

مثلاً:

```javascript
status = "available";
```

یا:

```javascript
status = "busy";
```

---

# زنجیره‌ی if / else if

داخل تابع از ساختار زیر استفاده شده است:

```javascript
if (...)

else if (...)

else if (...)

else if (...)

return ...
```

به این ساختار می‌گویند:

> **If / Else If Chain**

یعنی برنامه شرط‌ها را از بالا به پایین بررسی می‌کند.

به محض اینکه یکی از شرط‌ها برقرار شود،

دستور

```javascript
return
```

اجرا شده و تابع فوراً تمام می‌شود.

شرط‌های بعدی دیگر بررسی نمی‌شوند.

---

## شرط اول

```javascript
if (status === "available" || status === "free")
```

اگر وضعیت یکی از این دو مقدار باشد:

```text
available
free
```

تابع این مقدار را برمی‌گرداند:

```javascript
return "bg-success";
```

---

### `bg-success`

این کلاس مربوط به Bootstrap است.

رنگ آن معمولاً سبز است.

سبز در رابط کاربری معمولاً به معنی:

* وضعیت مناسب
* آماده بودن
* موفقیت

است.

به همین دلیل راننده‌ی آزاد با رنگ سبز نمایش داده می‌شود.

---

# عملگر `||`

داخل همان شرط داریم:

```javascript
status === "available" || status === "free"
```

علامت

```text
||
```

به معنی:

> **Logical OR**

است.

اگر یکی از دو شرط برقرار باشد،

کل شرط برقرار خواهد بود.

مثلاً:

```javascript
status = "available";
```

شرط برقرار است.

یا:

```javascript
status = "free";
```

باز هم شرط برقرار است.

---

# شرط دوم

```javascript
else if (status === "busy" || status === "moving")
```

اگر راننده:

```text
busy
```

یا

```text
moving
```

باشد،

تابع برمی‌گرداند:

```javascript
return "bg-warning text-dark";
```

---

### چرا دو کلاس CSS؟

```text
bg-warning
text-dark
```

در Bootstrap می‌توان چند کلاس را همزمان استفاده کرد.

اینجا:

```text
bg-warning
```

پس‌زمینه را زرد می‌کند.

و

```text
text-dark
```

رنگ متن را مشکی می‌کند.

اگر متن مشکی نباشد،

روی زمینه‌ی زرد خوانایی خوبی نخواهد داشت.

---

# شرط سوم

```javascript
else if (status === "scheduled")
```

اگر راننده برای سفر آینده رزرو شده باشد،

خروجی خواهد بود:

```javascript
return "bg-primary";
```

---

### `bg-primary`

در Bootstrap معمولاً آبی است.

آبی معمولاً نشان‌دهنده‌ی:

* اطلاعات
* وضعیت برنامه‌ریزی‌شده
* عملیات آینده

است.

---

# شرط چهارم

```javascript
else if (status === "returning")
```

اگر راننده در حال بازگشت باشد،

خروجی:

```javascript
return "bg-secondary";
```

---

### `bg-secondary`

در Bootstrap معمولاً خاکستری است.

چون راننده نه آزاد است،

نه مشغول سرویس‌دهی،

بلکه در حال بازگشت است.

---

# حالت پیش‌فرض (Default Case)

در انتهای تابع نوشته شده است:

```javascript
return "bg-dark";
```

اگر هیچ‌کدام از شرط‌ها برقرار نباشد،

این مقدار برگردانده می‌شود.

مثلاً اگر اشتباهاً مقدار زیر وارد شود:

```javascript
status = "offline";
```

هیچ شرطی برقرار نیست.

در نتیجه:

```javascript
bg-dark
```

برگردانده می‌شود.

---

## چرا Default Case مهم است؟

فرض کنید این قسمت وجود نداشت.

اگر مقدار ناشناخته‌ای وارد می‌شد،

تابع مقدار

```javascript
undefined
```

برمی‌گرداند.

در نتیجه هنگام ساخت کارت راننده،

کلاس CSS وجود نداشت و ظاهر صفحه به هم می‌ریخت.

وجود مقدار پیش‌فرض باعث می‌شود برنامه همیشه یک خروجی معتبر داشته باشد.

---

# Mapping Function

این تابع یک نمونه‌ی کلاسیک از

> **Mapping Function**

است.

یعنی:

یک مقدار را گرفته

و آن را به مقدار دیگری تبدیل می‌کند.

مثلاً:

| ورودی         | خروجی                |
| ------------- | -------------------- |
| available     | bg-success           |
| free          | bg-success           |
| busy          | bg-warning text-dark |
| moving        | bg-warning text-dark |
| scheduled     | bg-primary           |
| returning     | bg-secondary         |
| هر مقدار دیگر | bg-dark              |

---

# تابع `getStatusLabel(status)`

در ادامه فایل تابع دیگری وجود دارد:

```javascript
function getStatusLabel(status)
```

این تابع تقریباً همان منطق قبلی را دارد.

اما به جای کلاس CSS،

متن مناسب وضعیت را برمی‌گرداند.

مثلاً:

```text
available
```

تبدیل می‌شود به:

```text
Available
```

یا نسخه‌ی فارسی آن (اگر پروژه فارسی باشد):

```text
آزاد
```

---

## تفاوت دو تابع

`getStatusBadgeClass()`

خروجی:

```text
کلاس CSS
```

مثلاً:

```text
bg-success
```

---

`getStatusLabel()`

خروجی:

```text
متن وضعیت
```

مثلاً:

```text
Available
```

---

# تفاوت نحوه‌ی نوشتن

نویسنده‌ی اصلی فایل اشاره کرده است که

`getStatusLabel()`

از نظر منطقی همان کار را انجام می‌دهد،

اما ساختارش کمی متفاوت است.

مثلاً ممکن است این‌گونه نوشته شده باشد:

```javascript
if (...) return "...";

if (...) return "...";

if (...) return "...";

return "...";
```

در حالی که تابع قبلی از

```javascript
if
else if
else if
```

استفاده کرده است.

هر دو روش کاملاً صحیح هستند.

فقط سبک نوشتن آن‌ها متفاوت است.

---

# نکات آموزشی

این دو تابع مفاهیم زیر را آموزش می‌دهند:

* Function Parameter
* If / Else If Chain
* Logical OR (`||`)
* Strict Equality (`===`)
* Return
* Mapping Function
* Default Case
* استفاده از Bootstrap Utility Classes

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `getStatusBadgeClass()` چیست؟**

پاسخ:

> این تابع وضعیت راننده را به عنوان ورودی دریافت می‌کند و با استفاده از یک زنجیره‌ی `if / else if`، کلاس CSS مناسب Bootstrap را بر اساس آن وضعیت برمی‌گرداند. در صورتی که وضعیت شناخته‌شده نباشد، کلاس `bg-dark` به عنوان مقدار پیش‌فرض بازگردانده می‌شود.

---

**اگر پرسیده شد:**

**چرا در انتهای تابع `return "bg-dark"` قرار داده شده است؟**

پاسخ:

> این مقدار نقش **Default Case** را دارد و باعث می‌شود اگر وضعیت ناشناخته‌ای به تابع ارسال شد، تابع همچنان یک خروجی معتبر تولید کند و از بازگرداندن `undefined` و ایجاد مشکل در رابط کاربری جلوگیری شود.

---

**اگر پرسیده شد:**

**چرا از عملگر `||` استفاده شده است؟**

پاسخ:

> زیرا برخی وضعیت‌ها باید نتیجه‌ی یکسانی داشته باشند. برای مثال `available` و `free` هر دو باید کلاس `bg-success` را برگردانند، بنابراین با استفاده از عملگر منطقی `||` هر دو حالت در یک شرط بررسی شده‌اند.


---
---
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
---
---


# 3.5 تابع `getTrafficMessage()`

```javascript
function getTrafficMessage() {

    const currentHour = new Date().getHours();

    if (
        currentHour >= peakHourStart &&
        currentHour < peakHourEnd
    ) {
        return "High traffic expected during peak hours.";
    }

    return "Traffic is currently normal.";
}
```

این تابع وضعیت ترافیک را بر اساس **ساعت فعلی سیستم** تعیین می‌کند.

نکته مهم این است که این تابع هیچ داده‌ای از اینترنت یا نقشه دریافت نمی‌کند.

بلکه فقط ساعت کامپیوتر یا گوشی کاربر را می‌خواند و بر اساس آن یک پیام مناسب نمایش می‌دهد.

---

# هدف تابع

ورودی:

```text
هیچ ورودی ندارد.
```

خروجی:

```text
یک رشته (String)
```

مثلاً:

```text
High traffic expected during peak hours.
```

یا

```text
Traffic is currently normal.
```

---

# ساخت شیء Date

اولین خط تابع:

```javascript
const currentHour = new Date().getHours();
```

یکی از مهم‌ترین کلاس‌های JavaScript یعنی

```text
Date
```

را استفاده می‌کند.

---

# کلاس Date

```javascript
new Date()
```

یک شیء از نوع تاریخ و زمان ایجاد می‌کند.

داخل این شیء اطلاعاتی مانند:

* سال
* ماه
* روز
* ساعت
* دقیقه
* ثانیه

وجود دارد.

مثلاً اگر اکنون ساعت

```text
18:42
```

باشد،

```javascript
new Date()
```

نماینده همین تاریخ و ساعت خواهد بود.

---

# کلمه کلیدی `new`

در JavaScript وقتی بخواهیم از یک کلاس شیء جدید بسازیم،

از

```javascript
new
```

استفاده می‌کنیم.

مثلاً:

```javascript
const date = new Date();
```

یا:

```javascript
const array = new Array();
```

یا:

```javascript
const person = new Person();
```

به این عمل

> **Object Instantiation**

(ساخت نمونه از یک کلاس)

گفته می‌شود.

---

# متد `getHours()`

بعد از ساخت شیء Date نوشته شده است:

```javascript
.getHours()
```

این متد فقط **ساعت** را برمی‌گرداند.

مقدار خروجی همیشه عددی بین:

```text
0
```

تا

```text
23
```

است.

مثلاً:

| ساعت واقعی | خروجی |
| ---------- | ----- |
| 08:15      | 8     |
| 14:30      | 14    |
| 19:55      | 19    |
| 23:10      | 23    |

---

# چرا فقط ساعت؟

برای تشخیص ساعت شلوغی،

دقیقه و ثانیه اهمیت ندارند.

برنامه فقط بررسی می‌کند که اکنون داخل بازه

```text
17
```

تا

```text
20
```

قرار داریم یا خیر.

---

# متغیر `currentHour`

نتیجه‌ی

```javascript
getHours()
```

داخل متغیر

```javascript
currentHour
```

ذخیره می‌شود.

مثلاً:

```javascript
currentHour = 18;
```

---

# شرط اصلی

```javascript
if (

    currentHour >= peakHourStart &&

    currentHour < peakHourEnd

)
```

اینجا مهم‌ترین قسمت تابع است.

این شرط بررسی می‌کند:

آیا ساعت فعلی داخل بازه‌ی شلوغی قرار دارد؟

---

# عملگر `>=`

```javascript
currentHour >= peakHourStart
```

یعنی:

آیا ساعت فعلی

**بزرگ‌تر یا مساوی**

ساعت شروع است؟

اگر:

```text
currentHour = 18
```

و

```text
peakHourStart = 17
```

باشد،

نتیجه:

```text
true
```

است.

---

# عملگر `<`

قسمت دوم شرط:

```javascript
currentHour < peakHourEnd
```

یعنی:

آیا ساعت فعلی

**کوچک‌تر از**

پایان ساعت شلوغی است؟

اگر:

```text
currentHour = 18
```

و

```text
peakHourEnd = 20
```

باشد،

نتیجه:

```text
true
```

است.

---

# عملگر `&&`

بین دو شرط داریم:

```javascript
&&
```

این عملگر به معنی:

> **Logical AND**

است.

برای اینکه کل شرط برقرار باشد،

هر دو قسمت باید

```text
true
```

باشند.

---

## مثال

فرض کنید:

```text
currentHour = 18
```

آنگاه:

قسمت اول:

```text
18 >= 17

true
```

قسمت دوم:

```text
18 < 20

true
```

در نتیجه:

```text
true && true

↓

true
```

پس پیام ساعت شلوغی نمایش داده می‌شود.

---

اگر ساعت:

```text
22
```

باشد:

```text
22 >= 17

↓

true
```

اما:

```text
22 < 20

↓

false
```

پس:

```text
true && false

↓

false
```

در نتیجه وارد بخش `if` نمی‌شود.

---

# مقدار بازگشتی در ساعت شلوغی

اگر شرط برقرار باشد:

```javascript
return "High traffic expected during peak hours.";
```

اجرا می‌شود.

پس تابع همان لحظه تمام می‌شود.

---

# مقدار بازگشتی پیش‌فرض

اگر شرط برقرار نباشد:

```javascript
return "Traffic is currently normal.";
```

اجرا می‌شود.

این همان **Default Return** تابع است.

---

# چرا از متغیرهای `peakHourStart` و `peakHourEnd` استفاده شده است؟

می‌توانستیم بنویسیم:

```javascript
if(currentHour >= 17 && currentHour < 20)
```

اما نویسنده این کار را نکرده است.

به جای آن از:

```javascript
peakHourStart

peakHourEnd
```

استفاده کرده است.

---

## مزیت این روش

اگر بعداً ساعت شلوغی تغییر کند:

مثلاً:

```text
16
```

تا

```text
21
```

فقط کافی است:

```javascript
const peakHourStart = 16;

const peakHourEnd = 21;
```

را تغییر دهیم.

نیازی به تغییر خود تابع نیست.

به این روش می‌گویند:

> **Avoiding Magic Numbers**

---

# Magic Number چیست؟

اگر عددی بدون توضیح مستقیم داخل کد نوشته شود،

به آن

> **Magic Number**

می‌گویند.

مثلاً:

```javascript
if(currentHour >= 17 && currentHour < 20)
```

کسی که کد را می‌خواند،

نمی‌داند چرا دقیقاً ۱۷ و ۲۰ انتخاب شده‌اند.

اما وقتی بنویسیم:

```javascript
peakHourStart

peakHourEnd
```

هدف کد کاملاً مشخص می‌شود.

به همین دلیل در پروژه‌های حرفه‌ای استفاده از ثابت‌های نام‌دار توصیه می‌شود.

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* ساخت شیء با `new`
* کلاس `Date`
* متد `getHours()`
* مقایسه‌ی عددی
* عملگرهای `>=` و `<`
* عملگر منطقی `&&`
* بازگرداندن مقدار با `return`
* استفاده از ثابت‌ها به جای Magic Number
* تصمیم‌گیری بر اساس زمان سیستم

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `getTrafficMessage()` چیست؟**

پاسخ:

> این تابع با استفاده از کلاس `Date` و متد `getHours()` ساعت فعلی سیستم را دریافت می‌کند و بررسی می‌کند که آیا زمان فعلی بین `peakHourStart` و `peakHourEnd` قرار دارد یا خیر. اگر داخل این بازه باشد، پیام مربوط به ترافیک سنگین را برمی‌گرداند و در غیر این صورت پیام عادی بودن وضعیت ترافیک را بازمی‌گرداند.

---

**اگر پرسیده شد:**

**چرا از `peakHourStart` و `peakHourEnd` به جای اعداد 17 و 20 استفاده شده است؟**

پاسخ:

> برای جلوگیری از استفاده از **Magic Number** و افزایش خوانایی و قابلیت نگهداری کد. با این روش، در صورت تغییر ساعات شلوغی، فقط مقدار ثابت‌ها تغییر می‌کند و نیازی به تغییر منطق تابع نیست.


---
---
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
---
---

# 3.6 تابع `setFooterYear()`

```javascript
function setFooterYear() {

    const yearElement = document.getElementById("current-year");

    if (!yearElement) {
        return;
    }

    yearElement.textContent = new Date().getFullYear();
}
```

این تابع وظیفه دارد **سال جاری را به صورت خودکار داخل فوتر سایت نمایش دهد.**

به جای اینکه هر سال برنامه‌نویس عدد سال را دستی تغییر دهد، JavaScript هر بار هنگام اجرای صفحه، سال فعلی سیستم را خوانده و در محل مناسب قرار می‌دهد.

---

# هدف تابع

قبل از اجرای تابع ممکن است HTML به این صورت باشد:

```html
<footer>

    © <span id="current-year"></span>

    RideXpress

</footer>
```

بعد از اجرای تابع، اگر سال جاری ۲۰۲۶ باشد، HTML به شکل زیر در می‌آید:

```html
<footer>

    © <span id="current-year">2026</span>

    RideXpress

</footer>
```

در نتیجه کاربر همیشه سال صحیح را مشاهده می‌کند.

---

# پیدا کردن عنصر HTML

اولین دستور:

```javascript
const yearElement = document.getElementById("current-year");
```

از متد

```javascript
document.getElementById()
```

استفاده می‌کند.

این متد یکی از پرکاربردترین متدهای DOM است.

وظیفه‌ی آن پیدا کردن عنصری است که شناسه (ID) مشخصی دارد.

---

## getElementById()

اگر HTML چنین باشد:

```html
<span id="current-year"></span>
```

دستور:

```javascript
document.getElementById("current-year")
```

دقیقاً به همین عنصر اشاره می‌کند.

---

## مقدار بازگشتی

این متد دو حالت دارد.

اگر عنصر پیدا شود:

```javascript
HTMLSpanElement
```

برگردانده می‌شود.

اگر عنصر وجود نداشته باشد:

```javascript
null
```

برگردانده می‌شود.

---

# چرا نتیجه داخل متغیر ذخیره شده است؟

```javascript
const yearElement = ...
```

چون در ادامه چندین بار از همین عنصر استفاده می‌شود.

اگر هر بار بنویسیم:

```javascript
document.getElementById("current-year")
```

کد طولانی‌تر و کمی کندتر خواهد شد.

به همین دلیل نتیجه فقط یک بار ذخیره شده است.

---

# بررسی وجود عنصر

قسمت بعدی:

```javascript
if (!yearElement) {
    return;
}
```

یکی از رایج‌ترین الگوهای JavaScript است.

به آن می‌گویند:

> **Guard Clause**

---

# عملگر `!`

علامت

```javascript
!
```

به معنی:

> **Logical NOT**

است.

اگر:

```javascript
yearElement
```

وجود داشته باشد،

عبارت:

```javascript
!yearElement
```

برابر خواهد بود با:

```text
false
```

اما اگر:

```javascript
yearElement = null
```

باشد،

نتیجه:

```text
true
```

خواهد بود.

---

## چرا این شرط لازم است؟

فرض کنید برنامه روی صفحه‌ای اجرا شود که این عنصر را ندارد.

مثلاً:

```html
<span id="footer-year"></span>
```

در این صورت:

```javascript
document.getElementById("current-year")
```

برابر خواهد شد با:

```javascript
null
```

اگر مستقیماً بنویسیم:

```javascript
yearElement.textContent = ...
```

مرورگر خطای زیر را تولید می‌کند:

```text
Cannot read properties of null
```

زیرا مقدار `null` هیچ ویژگی‌ای ندارد.

---

# Guard Clause چیست؟

به جای اینکه کل کد داخل یک `if` بزرگ قرار بگیرد،

ابتدا شرایط غیرعادی بررسی می‌شود.

اگر مشکلی وجود داشته باشد:

```javascript
return;
```

اجرا می‌شود و تابع همان‌جا پایان می‌یابد.

این روش باعث می‌شود:

* کد کوتاه‌تر شود.
* خوانایی افزایش پیدا کند.
* تو در تو شدن شرط‌ها کاهش یابد.

---

# دستور `return;`

اینجا برخلاف توابع قبلی:

```javascript
return;
```

هیچ مقداری برنمی‌گرداند.

فقط اجرای تابع را متوقف می‌کند.

به این نوع دستور می‌گویند:

> **Early Return**

---

# تغییر متن عنصر

اگر عنصر پیدا شده باشد،

این دستور اجرا می‌شود:

```javascript
yearElement.textContent = new Date().getFullYear();
```

---

# ویژگی `textContent`

هر عنصر HTML ویژگی‌ای به نام

```javascript
textContent
```

دارد.

این ویژگی متن داخل عنصر را مشخص می‌کند.

مثلاً:

قبل از اجرا:

```html
<span></span>
```

بعد از:

```javascript
element.textContent = "Hello";
```

خواهیم داشت:

```html
<span>Hello</span>
```

---

# تفاوت `textContent` و `innerHTML`

اگر بنویسیم:

```javascript
element.textContent = "<b>Hello</b>";
```

خروجی صفحه خواهد بود:

```text
<b>Hello</b>
```

یعنی مرورگر آن را **به عنوان متن ساده** نمایش می‌دهد.

اما اگر بنویسیم:

```javascript
element.innerHTML = "<b>Hello</b>";
```

خروجی:

**Hello**

خواهد بود؛ زیرا HTML تفسیر می‌شود.

---

## چرا اینجا `textContent` استفاده شده است؟

چون فقط یک عدد (سال) قرار است نمایش داده شود و هیچ نیازی به تفسیر HTML وجود ندارد.

همچنین `textContent` از نظر امنیتی بهتر است، زیرا از اجرای ناخواسته‌ی کد HTML یا JavaScript جلوگیری می‌کند.

---

# متد `getFullYear()`

این قسمت:

```javascript
new Date().getFullYear()
```

سال فعلی سیستم را برمی‌گرداند.

مثلاً:

| تاریخ سیستم | خروجی |
| ----------- | ----- |
| 2024        | 2024  |
| 2025        | 2025  |
| 2026        | 2026  |

---

# چرا سال به صورت دستی نوشته نشده است؟

اگر می‌نوشتیم:

```javascript
yearElement.textContent = 2025;
```

سال همیشه ۲۰۲۵ باقی می‌ماند.

اما با استفاده از:

```javascript
getFullYear()
```

هر سال مقدار به صورت خودکار به‌روز می‌شود.

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* `document.getElementById()`
* انتخاب عنصر از DOM
* بررسی مقدار `null`
* عملگر `!`
* Guard Clause
* Early Return
* ویژگی `textContent`
* کلاس `Date`
* متد `getFullYear()`
* تغییر محتوای عناصر HTML

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `setFooterYear()` چیست؟**

پاسخ:

> این تابع عنصر دارای شناسه‌ی `current-year` را پیدا می‌کند. اگر عنصر وجود داشته باشد، سال جاری سیستم را با استفاده از `new Date().getFullYear()` دریافت کرده و در ویژگی `textContent` آن قرار می‌دهد تا سال فوتر به صورت خودکار به‌روزرسانی شود.

---

**اگر پرسیده شد:**

**چرا قبل از استفاده از `yearElement` بررسی شده که عنصر وجود دارد یا نه؟**

پاسخ:

> زیرا ممکن است این عنصر در برخی صفحات وجود نداشته باشد. با استفاده از **Guard Clause** و `return` زودهنگام، از ایجاد خطای `Cannot read properties of null` جلوگیری می‌شود و تابع فقط در صورت وجود عنصر ادامه‌ی اجرا پیدا می‌کند.


---
---
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
---
---

# 3.7 تابع `setSupportPhone()`

```javascript id="w1qk8m"
function setSupportPhone() {

    const phoneElements = document.querySelectorAll("[data-support-phone]");

    phoneElements.forEach(function (element) {

        element.textContent = SUPPORT_PHONE;

        if (element.tagName === "A") {
            element.href = "tel:" + SUPPORT_PHONE;
        }

    });

}
```

این تابع وظیفه دارد **شماره تماس پشتیبانی را به صورت خودکار در تمام قسمت‌های سایت قرار دهد.**

به جای اینکه شماره تلفن در چندین قسمت HTML به صورت دستی نوشته شود، فقط یک بار داخل ثابت

```javascript id="v8o7ye"
SUPPORT_PHONE
```

تعریف شده است.

سپس این تابع همان مقدار را در تمام عناصر موردنظر قرار می‌دهد.

---

# هدف تابع

فرض کنید در HTML چند جای مختلف چنین عناصری داشته باشیم:

```html id="f1h3m6"
<span data-support-phone></span>

<a data-support-phone></a>

<div data-support-phone></div>
```

بعد از اجرای تابع، همه‌ی آن‌ها مقدار یکسانی خواهند داشت:

```html id="u5e7zr"
<span data-support-phone>+98-916-293-23-29</span>

<a data-support-phone href="tel:+98-916-293-23-29">
    +98-916-293-23-29
</a>

<div data-support-phone>
    +98-916-293-23-29
</div>
```

---

# `querySelectorAll()`

اولین دستور:

```javascript id="t0g8yx"
const phoneElements =
    document.querySelectorAll("[data-support-phone]");
```

از متد

```javascript id="i3f8pw"
querySelectorAll()
```

استفاده می‌کند.

این متد تمام عناصری را که با یک **CSS Selector** مطابقت داشته باشند پیدا می‌کند.

---

## CSS Selector

داخل پرانتز نوشته شده است:

```javascript id="s5k9dr"
"[data-support-phone]"
```

این یک **Attribute Selector** در CSS است.

یعنی:

> تمام عناصری را پیدا کن که ویژگی

```text id="n8m7zt"
data-support-phone
```

را دارند.

مهم نیست این عنصر:

* `span`
* `div`
* `a`
* `button`

یا هر عنصر دیگری باشد.

---

### مثال

اگر HTML چنین باشد:

```html id="g2v7qe"
<span data-support-phone></span>

<div></div>

<a data-support-phone></a>

<p></p>
```

فقط دو عنصر اول و سوم انتخاب می‌شوند.

---

# تفاوت `querySelector()` و `querySelectorAll()`

اگر بنویسیم:

```javascript id="m4d8xy"
document.querySelector(...)
```

فقط **اولین عنصر** پیدا می‌شود.

اما:

```javascript id="n2z6jc"
document.querySelectorAll(...)
```

تمام عناصر مطابق Selector را برمی‌گرداند.

---

# NodeList

خروجی

```javascript id="q7e5tf"
querySelectorAll()
```

یک آرایه‌ی واقعی نیست.

بلکه شیئی به نام

> **NodeList**

است.

رفتارش بسیار شبیه آرایه است.

مثلاً می‌توان روی آن

```javascript id="x8n2pb"
forEach()
```

اجرا کرد.

---

# `forEach()`

بعد از انتخاب عناصر داریم:

```javascript id="l4t9hd"
phoneElements.forEach(function(element){
```

متد

```javascript id="v6y1ra"
forEach()
```

روی تمام اعضای NodeList حرکت می‌کند.

هر بار یکی از عناصر را داخل متغیر

```javascript id="c3r5zs"
element
```

قرار می‌دهد.

---

### مثال

فرض کنید سه عنصر پیدا شده‌اند.

اجرای حلقه به این صورت خواهد بود:

دور اول:

```text id="j8s2vm"
element

↓

اولین عنصر
```

دور دوم:

```text id="r1f4wn"
element

↓

دومین عنصر
```

دور سوم:

```text id="h6x9po"
element

↓

سومین عنصر
```

---

# Anonymous Function

داخل `forEach()` نوشته شده است:

```javascript id="p0v3bd"
function(element){

}
```

این تابع نام ندارد.

به آن می‌گویند:

> **Anonymous Function**

این تابع فقط توسط `forEach()` فراخوانی می‌شود.

---

# تغییر متن عنصر

اولین دستور داخل حلقه:

```javascript id="k5n8ur"
element.textContent = SUPPORT_PHONE;
```

یعنی:

متن داخل عنصر برابر شماره تماس شود.

مثلاً:

قبل:

```html id="w2y4mj"
<span data-support-phone></span>
```

بعد:

```html id="b9u7ck"
<span data-support-phone>
+98-916-293-23-29
</span>
```

---

# استفاده از ثابت `SUPPORT_PHONE`

دقت کنید که شماره تلفن به صورت مستقیم نوشته نشده است.

بلکه از:

```javascript id="z7x4ep"
SUPPORT_PHONE
```

استفاده شده است.

این همان اصل

> **Single Source of Truth**

است.

یعنی اطلاعات فقط در یک محل نگهداری می‌شود.

اگر شماره تغییر کند، فقط مقدار این ثابت تغییر می‌کند و همه‌ی قسمت‌های سایت به‌روزرسانی می‌شوند.

---

# بررسی نوع عنصر

قسمت بعدی:

```javascript id="m1p6qs"
if (element.tagName === "A")
```

بررسی می‌کند که آیا عنصر فعلی از نوع

```html id="t3n9hw"
<a>
```

است یا خیر.

---

# `tagName`

هر عنصر HTML ویژگی‌ای به نام

```javascript id="u6k2fx"
tagName
```

دارد.

مثلاً:

| عنصر       | tagName |
| ---------- | ------- |
| `<div>`    | DIV     |
| `<span>`   | SPAN    |
| `<a>`      | A       |
| `<button>` | BUTTON  |

نکته مهم این است که `tagName` معمولاً با **حروف بزرگ (Uppercase)** برگردانده می‌شود.

به همین دلیل مقایسه با `"A"` انجام شده است، نه `"a"`.

---

# چرا فقط لینک‌ها بررسی می‌شوند؟

اگر عنصر از نوع `span` باشد،

ویژگی

```javascript id="d4y9la"
href
```

ندارد.

اما عنصر

```html id="f7p3vb"
<a>
```

دارای ویژگی `href` است.

پس فقط در این حالت باید لینک تنظیم شود.

---

# ساخت لینک تلفن

داخل شرط نوشته شده است:

```javascript id="q9e4ut"
element.href =
    "tel:" + SUPPORT_PHONE;
```

اینجا از عملگر

```javascript id="g5m1zx"
+
```

برای اتصال رشته‌ها (**String Concatenation**) استفاده شده است.

اگر مقدار ثابت برابر باشد با:

```text id="v2s8fn"
+98-916-293-23-29
```

نتیجه خواهد شد:

```text id="n4x7qw"
tel:+98-916-293-23-29
```

---

# پروتکل `tel:`

عبارت

```text id="c7r5ke"
tel:
```

یک **URL Scheme** استاندارد است.

وقتی کاربر روی چنین لینکی کلیک کند:

```html id="a6u3pw"
<a href="tel:+989162932329">
```

مرورگر یا سیستم‌عامل برنامه‌ی تماس تلفنی را باز می‌کند.

در موبایل معمولاً صفحه‌ی شماره‌گیری (Dialer) باز می‌شود.

در برخی کامپیوترها نیز برنامه‌هایی مانند Skype یا Teams ممکن است باز شوند.

---

# چرا شماره تلفن دوبار استفاده شده است؟

شماره تلفن در این تابع دو کاربرد دارد:

1. نمایش به کاربر:

```javascript id="y8w2cq"
textContent
```

2. ساخت لینک قابل کلیک:

```javascript id="n1v5dz"
href
```

اگر فقط متن نمایش داده شود، کاربر باید شماره را دستی وارد کند.

اما با `href="tel:..."` فقط با یک کلیک تماس برقرار می‌شود.

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* `querySelectorAll()`
* CSS Attribute Selector
* NodeList
* `forEach()`
* Anonymous Function
* `textContent`
* ویژگی `tagName`
* شرط `if`
* String Concatenation (`+`)
* پروتکل `tel:`
* اصل **Single Source of Truth**

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `setSupportPhone()` چیست؟**

پاسخ:

> این تابع تمام عناصر دارای ویژگی `data-support-phone` را با استفاده از `querySelectorAll()` پیدا می‌کند و با پیمایش آن‌ها توسط `forEach()`، شماره تماس موجود در ثابت `SUPPORT_PHONE` را داخل `textContent` هر عنصر قرار می‌دهد. اگر عنصر از نوع `<a>` باشد، ویژگی `href` آن نیز به صورت `tel:شماره` تنظیم می‌شود تا امکان برقراری تماس با یک کلیک فراهم شود.

---

**اگر پرسیده شد:**

**چرا از `querySelectorAll()` استفاده شده است و نه `getElementById()`؟**

پاسخ:

> زیرا ممکن است شماره تماس در چندین قسمت مختلف سایت نمایش داده شود. `getElementById()` فقط یک عنصر را پیدا می‌کند، اما `querySelectorAll()` تمام عناصر دارای ویژگی `data-support-phone` را انتخاب کرده و امکان به‌روزرسانی هم‌زمان همه‌ی آن‌ها را فراهم می‌کند.


---
---
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
---
---

# 3.8 تابع `setPickupEstimate()`

```javascript
function setPickupEstimate() {

    const estimateElements =
        document.querySelectorAll("[data-pickup-estimate]");

    estimateElements.forEach(function (element) {

        element.textContent =
            AVG_PICKUP_MINUTES + " min";

    });

}
```

این تابع وظیفه دارد **میانگین زمان رسیدن راننده (Estimated Pickup Time)** را در تمام قسمت‌های سایت نمایش دهد.

این مقدار قبلاً در ابتدای فایل داخل ثابت

```javascript
AVG_PICKUP_MINUTES
```

محاسبه شده بود.

حالا این تابع همان مقدار را داخل عناصر HTML قرار می‌دهد.

---

# هدف تابع

فرض کنید HTML به شکل زیر باشد:

```html
<span data-pickup-estimate></span>

<div data-pickup-estimate></div>
```

بعد از اجرای تابع، اگر مقدار

```javascript
AVG_PICKUP_MINUTES
```

برابر 4 باشد، نتیجه چنین خواهد بود:

```html
<span data-pickup-estimate>
4 min
</span>

<div data-pickup-estimate>
4 min
</div>
```

---

# پیدا کردن عناصر

```javascript
const estimateElements =
    document.querySelectorAll("[data-pickup-estimate]");
```

دقیقاً مشابه تابع قبلی (`setSupportPhone()`)، از

```javascript
querySelectorAll()
```

استفاده شده است.

این بار تمام عناصری انتخاب می‌شوند که ویژگی

```text
data-pickup-estimate
```

را داشته باشند.

---

## چرا از Attribute Selector استفاده شده است؟

به جای اینکه برای هر عنصر یک `id` جداگانه تعریف شود، فقط کافی است ویژگی زیر وجود داشته باشد:

```html
data-pickup-estimate
```

هر تعداد عنصر که این ویژگی را داشته باشند، توسط این تابع پیدا خواهند شد.

این روش باعث می‌شود:

* HTML ساده‌تر شود.
* کد JavaScript دوباره قابل استفاده باشد.
* اضافه کردن عناصر جدید بدون تغییر JavaScript امکان‌پذیر باشد.

---

# پیمایش عناصر

```javascript
estimateElements.forEach(function (element) {
```

همانند تابع قبلی، روی تمام عناصر پیدا شده حرکت می‌شود.

اگر پنج عنصر وجود داشته باشد،

تابع پنج بار اجرا خواهد شد.

---

# مقداردهی متن

```javascript
element.textContent =
    AVG_PICKUP_MINUTES + " min";
```

این مهم‌ترین قسمت تابع است.

متن داخل عنصر برابر می‌شود با:

```
عدد میانگین
+
عبارت " min"
```

---

# اتصال رشته‌ها (String Concatenation)

فرض کنیم:

```javascript
AVG_PICKUP_MINUTES = 4;
```

JavaScript ابتدا مقدار عددی را به رشته تبدیل می‌کند.

سپس:

```javascript
4 + " min"
```

را به صورت زیر ترکیب می‌کند:

```text
4 min
```

---

## تبدیل خودکار نوع داده (Type Coercion)

در اینجا اتفاق جالبی رخ می‌دهد.

سمت چپ:

```javascript
4
```

یک **Number** است.

اما سمت راست:

```javascript
" min"
```

یک **String** است.

وقتی یکی از عملوندهای `+` رشته باشد،

JavaScript عدد را نیز به رشته تبدیل می‌کند.

یعنی:

```javascript
4
```

تبدیل می‌شود به:

```text
"4"
```

و سپس:

```text
"4" + " min"
```

خواهد شد:

```text
"4 min"
```

به این فرآیند می‌گویند:

> **Implicit Type Coercion** (تبدیل خودکار نوع داده)

---

# چرا از Template Literal استفاده نشده است؟

می‌توانستیم این کد را به صورت زیر نیز بنویسیم:

```javascript
element.textContent =
    `${AVG_PICKUP_MINUTES} min`;
```

اما نویسنده از روش قدیمی‌تر استفاده کرده است:

```javascript
AVG_PICKUP_MINUTES + " min"
```

احتمالاً دلیل آن آموزشی بودن پروژه و آشناتر بودن این روش برای دانشجویان مبتدی است.

هر دو روش خروجی یکسانی تولید می‌کنند.

---

# چرا مقدار ثابت استفاده شده است؟

عدد ۴ مستقیماً داخل تابع نوشته نشده است.

بلکه از:

```javascript
AVG_PICKUP_MINUTES
```

استفاده شده است.

این همان اصل

> **Single Source of Truth**

است.

اگر میانگین زمان رسیدن تغییر کند، فقط کافی است مقدار این ثابت تغییر داده شود و همه‌ی قسمت‌های سایت به صورت خودکار مقدار جدید را نمایش خواهند داد.

---

# مزیت استفاده از این تابع

اگر در آینده ۱۰ محل مختلف در سایت زمان رسیدن راننده را نمایش دهند،

فقط کافی است:

```javascript
setPickupEstimate();
```

اجرا شود.

تمام آن ۱۰ محل هم‌زمان به‌روزرسانی می‌شوند.

این باعث می‌شود:

* از تکرار کد جلوگیری شود.
* احتمال خطا کاهش پیدا کند.
* نگهداری پروژه ساده‌تر شود.

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* `querySelectorAll()`
* CSS Attribute Selector
* NodeList
* `forEach()`
* Anonymous Function
* `textContent`
* String Concatenation
* Implicit Type Coercion
* Single Source of Truth
* استفاده مجدد از داده‌های ثابت (Constants)

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `setPickupEstimate()` چیست؟**

پاسخ:

> این تابع تمام عناصر دارای ویژگی `data-pickup-estimate` را با استفاده از `querySelectorAll()` پیدا می‌کند و با پیمایش آن‌ها توسط `forEach()`، مقدار ثابت `AVG_PICKUP_MINUTES` را به همراه عبارت `" min"` داخل ویژگی `textContent` هر عنصر قرار می‌دهد تا زمان تقریبی رسیدن راننده در تمام بخش‌های سایت نمایش داده شود.

---

**اگر پرسیده شد:**

**چرا در عبارت `AVG_PICKUP_MINUTES + " min"` از عملگر `+` استفاده شده است؟**

پاسخ:

> عملگر `+` در اینجا برای **اتصال رشته‌ها (String Concatenation)** استفاده شده است. از آنجا که یکی از عملوندها رشته (`" min"`) است، JavaScript عدد `AVG_PICKUP_MINUTES` را به‌صورت خودکار به رشته تبدیل کرده و در نهایت عبارتی مانند `"4 min"` تولید می‌کند. این رفتار نمونه‌ای از **Implicit Type Coercion** در JavaScript است.


---
---
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
---
---

# 3.9 تابع `updateHomeMetrics()`

```javascript
function updateHomeMetrics() {

    const availableDrivers = countAvailableDrivers();

    const availableElement =
        document.getElementById("available-drivers");

    if (availableElement) {
        availableElement.textContent = availableDrivers;
    }

    const pickupElement =
        document.getElementById("pickup-estimate");

    if (pickupElement) {
        pickupElement.textContent =
            AVG_PICKUP_MINUTES + " min";
    }

    const trafficElement =
        document.getElementById("traffic-status");

    if (trafficElement) {
        trafficElement.textContent =
            getTrafficMessage();
    }

}
```

این تابع مسئول **به‌روزرسانی اطلاعات داشبورد صفحه‌ی اصلی (Home Dashboard)** است.

به زبان ساده:

هر بار که این تابع اجرا شود، سه بخش مهم صفحه‌ی اصلی را به‌روز می‌کند:

* تعداد راننده‌های آزاد
* میانگین زمان رسیدن راننده
* وضعیت ترافیک

به همین دلیل نام آن **updateHomeMetrics** انتخاب شده است.

---

# وظیفه کلی تابع

این تابع اطلاعات را خودش تولید نمی‌کند.

بلکه اطلاعات را از توابع دیگر می‌گیرد و داخل عناصر HTML قرار می‌دهد.

در واقع نقش آن:

> **هماهنگ‌کننده (Coordinator)**

است.

---

# مرحله اول

```javascript
const availableDrivers =
    countAvailableDrivers();
```

اولین کاری که انجام می‌شود،

فراخوانی تابع

```javascript
countAvailableDrivers()
```

است.

این همان تابعی است که در بخش قبل بررسی کردیم.

---

## خروجی تابع

فرض کنیم آرایه‌ی راننده‌ها چنین باشد:

```javascript
[
    {status:"available"},
    {status:"busy"},
    {status:"available"},
    {status:"moving"},
    {status:"available"}
]
```

تابع

```javascript
countAvailableDrivers()
```

عدد زیر را برمی‌گرداند:

```text
3
```

این مقدار داخل متغیر

```javascript
availableDrivers
```

ذخیره می‌شود.

---

# چرا مقدار داخل متغیر ذخیره شده است؟

می‌توانست نویسنده بنویسد:

```javascript
document.getElementById(...)
.textContent =
countAvailableDrivers();
```

اما این کار را نکرده است.

زیرا:

* خوانایی بیشتر می‌شود.
* اگر بعداً چند بار به این مقدار نیاز باشد،
  تابع دوباره اجرا نمی‌شود.

---

# پیدا کردن عنصر راننده‌ها

سپس:

```javascript
const availableElement =
document.getElementById("available-drivers");
```

عنصر HTML مربوط به نمایش تعداد راننده‌های آزاد پیدا می‌شود.

مثلاً:

```html
<span id="available-drivers"></span>
```

---

# بررسی وجود عنصر

بعد از آن:

```javascript
if (availableElement) {
```

بررسی می‌شود که عنصر پیدا شده است یا خیر.

اگر عنصر وجود نداشته باشد،

هیچ کاری انجام نمی‌شود.

---

# تغییر متن

اگر عنصر پیدا شده باشد:

```javascript
availableElement.textContent =
availableDrivers;
```

اجرا می‌شود.

مثلاً:

قبل:

```html
<span id="available-drivers"></span>
```

بعد:

```html
<span id="available-drivers">
3
</span>
```

---

# قسمت دوم

اکنون نوبت نمایش زمان تقریبی رسیدن راننده است.

```javascript
const pickupElement =
document.getElementById("pickup-estimate");
```

عنصر مربوطه پیدا می‌شود.

---

اگر وجود داشته باشد:

```javascript
pickupElement.textContent =
AVG_PICKUP_MINUTES + " min";
```

اجرا می‌شود.

فرض کنیم:

```javascript
AVG_PICKUP_MINUTES = 4;
```

نتیجه:

```text
4 min
```

خواهد بود.

---

# چرا دوباره از ثابت استفاده شده است؟

دقت کنید که تابع قبلی

```javascript
setPickupEstimate()
```

هم همین کار را انجام می‌داد.

اما آن تابع روی تمام عناصر دارای

```text
data-pickup-estimate
```

کار می‌کرد.

در حالی که این تابع فقط عنصر دارای شناسه

```text
pickup-estimate
```

را تغییر می‌دهد.

احتمالاً این عنصر مخصوص صفحه‌ی اصلی است.

---

# قسمت سوم

اکنون وضعیت ترافیک به‌روزرسانی می‌شود.

```javascript
const trafficElement =
document.getElementById("traffic-status");
```

---

اگر عنصر وجود داشته باشد:

```javascript
trafficElement.textContent =
getTrafficMessage();
```

اجرا می‌شود.

---

# فراخوانی تابع داخل دستور

دقت کنید که اینجا مستقیماً نوشته شده است:

```javascript
getTrafficMessage()
```

خروجی این تابع ممکن است یکی از این دو مقدار باشد:

```text
High traffic expected during peak hours.
```

یا

```text
Traffic is currently normal.
```

سپس همان متن داخل عنصر HTML قرار می‌گیرد.

---

# چرا سه بار از `if` استفاده شده است؟

ممکن است صفحه‌ی فعلی فقط یکی از این عناصر را داشته باشد.

مثلاً:

```html
<div id="traffic-status"></div>
```

اما دو عنصر دیگر وجود نداشته باشند.

اگر بررسی انجام نشود،

خطا تولید خواهد شد.

به همین دلیل هر عنصر جداگانه بررسی می‌شود.

این روش باعث می‌شود تابع روی صفحات مختلف نیز بدون مشکل اجرا شود.

---

# الگوی DOM Update

این تابع نمونه‌ی بسیار خوبی از الگوی زیر است:

```text
Data

↓

Process

↓

DOM Update
```

ابتدا داده تهیه می‌شود:

```javascript
countAvailableDrivers()

getTrafficMessage()

AVG_PICKUP_MINUTES
```

سپس:

```javascript
textContent
```

به‌روزرسانی می‌شود.

در پروژه‌های Front-end این یکی از رایج‌ترین الگوهاست.

---

# چرا این تابع خودش چیزی محاسبه نمی‌کند؟

اگر داخل این تابع دوباره منطق شمارش راننده‌ها نوشته می‌شد،

کد تکراری (Duplicate Code) ایجاد می‌شد.

در عوض نویسنده از توابع آماده استفاده کرده است:

```javascript
countAvailableDrivers()

getTrafficMessage()
```

به این اصل می‌گویند:

> **Code Reuse (استفاده‌ی مجدد از کد)**

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* فراخوانی توابع دیگر (Function Composition)
* استفاده از خروجی توابع
* `getElementById()`
* بررسی مقدار `null`
* تغییر `textContent`
* استفاده از ثابت‌ها (Constants)
* به‌روزرسانی DOM
* اصل **Code Reuse**
* جداسازی منطق (Logic) از رابط کاربری (UI)

---

# نکته آموزشی

این تابع نمونه‌ای از **جداسازی مسئولیت‌ها (Separation of Concerns)** است.

توابع دیگر فقط داده تولید می‌کنند:

* `countAvailableDrivers()` → تعداد راننده‌ها
* `getTrafficMessage()` → پیام ترافیک

اما این تابع فقط مسئول **نمایش این داده‌ها در صفحه** است.

این جداسازی باعث می‌شود کد خواناتر، قابل نگهداری‌تر و توسعه‌پذیرتر باشد.

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `updateHomeMetrics()` چیست؟**

پاسخ:

> این تابع اطلاعات صفحه‌ی اصلی را به‌روزرسانی می‌کند. ابتدا تعداد راننده‌های آزاد را با استفاده از `countAvailableDrivers()` محاسبه می‌کند، سپس مقدار `AVG_PICKUP_MINUTES` و پیام تولیدشده توسط `getTrafficMessage()` را دریافت کرده و در صورت وجود عناصر مربوطه، مقادیر را در ویژگی `textContent` آن‌ها قرار می‌دهد.

---

**اگر پرسیده شد:**

**چرا این تابع از توابع `countAvailableDrivers()` و `getTrafficMessage()` استفاده می‌کند و خودش محاسبات را انجام نمی‌دهد؟**

پاسخ:

> برای جلوگیری از تکرار کد (**Code Reuse**) و رعایت اصل **Separation of Concerns**. هر تابع فقط یک مسئولیت مشخص دارد؛ توابع دیگر داده را تولید می‌کنند و `updateHomeMetrics()` فقط مسئول نمایش آن داده‌ها در رابط کاربری (DOM) است.


---
---
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
---
---

# 3.10 تابع `renderDriverCards()`

```javascript
function renderDriverCards() {

    const container =
        document.getElementById("driver-list");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    for (let i = 0; i < drivers.length; i++) {

        const driver = drivers[i];

        const badgeClass =
            getStatusBadgeClass(driver.status);

        const statusLabel =
            getStatusLabel(driver.status);

        container.innerHTML += `
            ...
        `;

    }

}
```

این یکی از مهم‌ترین توابع کل پروژه است.

تقریباً تمام اطلاعات مربوط به راننده‌ها توسط همین تابع روی صفحه نمایش داده می‌شود.

به زبان ساده:

این تابع آرایه‌ی `drivers` را می‌خواند و برای هر راننده یک **کارت (Card)** می‌سازد و داخل صفحه قرار می‌دهد.

---

# هدف تابع

فرض کنید آرایه‌ی راننده‌ها چنین باشد:

```javascript
[
    {
        name:"Ali",
        car:"Toyota",
        status:"available"
    },

    {
        name:"Sara",
        car:"Hyundai",
        status:"busy"
    }
]
```

بعد از اجرای تابع، HTML تقریباً به این شکل خواهد شد:

```html
<div class="card">

    Ali

    Toyota

    Available

</div>

<div class="card">

    Sara

    Hyundai

    Busy

</div>
```

یعنی:

هر عضو آرایه → یک کارت روی صفحه

---

# پیدا کردن Container

اولین دستور:

```javascript
const container =
document.getElementById("driver-list");
```

این قسمت عنصر اصلی را پیدا می‌کند.

مثلاً:

```html
<div id="driver-list"></div>
```

تمام کارت‌ها داخل همین عنصر قرار خواهند گرفت.

به این عنصر معمولاً می‌گویند:

> **Container**

---

# Guard Clause

بعد از آن:

```javascript
if(!container){
    return;
}
```

اگر عنصر پیدا نشود،

تابع فوراً متوقف می‌شود.

دلیل آن جلوگیری از خطای:

```text
Cannot read properties of null
```

است.

این همان الگوی معروف

> **Guard Clause**

است که در توابع قبلی نیز دیدیم.

---

# پاک کردن محتوای قبلی

سپس:

```javascript
container.innerHTML = "";
```

اجرا می‌شود.

---

## چرا ابتدا پاک می‌شود؟

فرض کنید قبلاً سه کارت داخل صفحه وجود داشته باشد.

اگر دوباره تابع اجرا شود،

بدون این دستور خروجی چنین خواهد شد:

```text
اجرای اول

3 کارت

↓

اجرای دوم

6 کارت

↓

اجرای سوم

9 کارت
```

یعنی کارت‌ها مرتب تکرار می‌شوند.

اما با:

```javascript
container.innerHTML = "";
```

ابتدا همه کارت‌های قبلی حذف می‌شوند.

سپس کارت‌های جدید ساخته می‌شوند.

---

# innerHTML

ویژگی

```javascript
innerHTML
```

کل محتوای HTML داخل عنصر را مشخص می‌کند.

مثلاً:

قبل:

```html
<div>

Hello

</div>
```

اگر بنویسیم:

```javascript
element.innerHTML = "";
```

خروجی:

```html
<div>

</div>
```

تمام محتوای داخل عنصر حذف خواهد شد.

---

# شروع حلقه

بعد از پاک شدن محتوا:

```javascript
for(

let i=0;

i<drivers.length;

i++

)
```

اجرا می‌شود.

حلقه روی تمام راننده‌ها حرکت می‌کند.

اگر:

```javascript
drivers.length = 5;
```

باشد،

حلقه پنج بار اجرا خواهد شد.

---

# گرفتن راننده فعلی

داخل حلقه:

```javascript
const driver =
drivers[i];
```

این دستور یکی از مهم‌ترین تکنیک‌های برنامه‌نویسی است.

به جای اینکه مرتب بنویسیم:

```javascript
drivers[i].status

drivers[i].name

drivers[i].car
```

یک متغیر کوتاه ساخته شده است.

---

مثلاً اگر:

```javascript
i = 2;
```

باشد،

آنگاه:

```javascript
driver
```

همان:

```javascript
drivers[2]
```

است.

---

# چرا از const استفاده شده است؟

مقدار

```javascript
driver
```

در هر دور حلقه تغییر نمی‌کند.

فقط هنگام شروع دور بعدی حلقه،

متغیر جدید ساخته می‌شود.

پس استفاده از

```javascript
const
```

کاملاً صحیح است.

---

# گرفتن کلاس Badge

سپس:

```javascript
const badgeClass =
getStatusBadgeClass(driver.status);
```

اجرا می‌شود.

این همان تابعی است که قبلاً بررسی کردیم.

مثلاً:

ورودی:

```text
available
```

خروجی:

```text
bg-success
```

---

# گرفتن متن وضعیت

بعد از آن:

```javascript
const statusLabel =
getStatusLabel(driver.status);
```

نیز اجرا می‌شود.

مثلاً:

ورودی:

```text
available
```

خروجی:

```text
Available
```

یا نسخه فارسی آن.

---

# چرا این دو تابع جدا هستند؟

نویسنده می‌توانست همه چیز را داخل همین تابع بنویسد.

اما این کار را نکرده است.

دلیل:

**اصل تقسیم مسئولیت (Separation of Concerns)**

است.

---

این تابع فقط کارت می‌سازد.

اما:

```javascript
getStatusBadgeClass()
```

مسئول انتخاب رنگ است.

و:

```javascript
getStatusLabel()
```

مسئول انتخاب متن.

این باعث می‌شود هر تابع فقط یک وظیفه داشته باشد.

---

# Template Literal

مهم‌ترین قسمت تابع:

```javascript
container.innerHTML += `
...
`;
```

اینجا از

> **Template Literal**

استفاده شده است.

Template Literal با بک‌تیک (` `) نوشته می‌شود، نه با کوتیشن (`"` یا `'`).

---

## مزیت Template Literal

بدون Template Literal باید بنویسیم:

```javascript
"<div>" +

driver.name +

"</div>"
```

که بسیار طولانی و ناخوانا می‌شود.

اما با Template Literal:

```javascript
`
<div>

${driver.name}

</div>
`
```

هم خواناتر است و هم امکان نوشتن HTML چندخطی را فراهم می‌کند.

---

# عملگر `+=`

دقت کنید:

```javascript
container.innerHTML +=
```

از

```javascript
+=
```

استفاده شده است.

این یعنی:

```javascript
container.innerHTML =
container.innerHTML
+
کارت جدید
```

بنابراین هر بار یک کارت جدید به کارت‌های قبلی اضافه می‌شود.

---

# روند اجرای حلقه

فرض کنید سه راننده وجود داشته باشند.

روند اجرا:

```text
ابتدا

Container خالی

↓

دور اول

کارت راننده اول

↓

دور دوم

کارت راننده دوم اضافه می‌شود

↓

دور سوم

کارت راننده سوم اضافه می‌شود
```

در پایان سه کارت داخل صفحه دیده می‌شوند.

---

# این تابع چه الگویی را پیاده‌سازی می‌کند؟

این تابع نمونه‌ای از الگوی معروف:

> **Render Pattern**

است.

یعنی:

```text
Data

↓

HTML

↓

DOM
```

ابتدا داده‌ها از آرایه خوانده می‌شوند.

سپس HTML ساخته می‌شود.

در نهایت HTML داخل صفحه قرار می‌گیرد.

تقریباً تمام Frameworkهای مدرن مانند:

* React
* Vue
* Angular

همین کار را انجام می‌دهند؛ فقط به صورت پیشرفته‌تر و بهینه‌تر.

---

# نکته آموزشی

این تابع چند مفهوم مهم JavaScript را به صورت هم‌زمان نشان می‌دهد:

* `getElementById()`
* Guard Clause
* `innerHTML`
* پاک کردن محتوای قبلی
* حلقه `for`
* دسترسی به اعضای آرایه
* استفاده از متغیر کمکی (`driver`)
* فراخوانی توابع دیگر
* Template Literal
* عملگر `+=`
* Render Pattern
* Separation of Concerns

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `renderDriverCards()` چیست؟**

پاسخ:

> این تابع ابتدا عنصر دارای شناسه `driver-list` را پیدا می‌کند و در صورت وجود، محتوای قبلی آن را با `innerHTML = ""` پاک می‌کند. سپس با پیمایش آرایه `drivers`، برای هر راننده کلاس وضعیت (`getStatusBadgeClass`) و متن وضعیت (`getStatusLabel`) را دریافت کرده و با استفاده از Template Literal یک کارت HTML می‌سازد و با `innerHTML +=` به عنصر اصلی اضافه می‌کند.

---

**اگر پرسیده شد:**

**چرا قبل از ساخت کارت‌ها از `container.innerHTML = ""` استفاده شده است؟**

پاسخ:

> برای جلوگیری از تکرار کارت‌ها. اگر محتوای قبلی پاک نشود، با هر بار اجرای تابع، کارت‌های جدید به کارت‌های قبلی اضافه می‌شوند و اطلاعات چندین بار در صفحه نمایش داده خواهد شد. این دستور باعث می‌شود هر بار صفحه از ابتدا و بر اساس داده‌های فعلی دوباره رندر (Render) شود.


---
---
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
---
---

# 3.11 تابع `setupDriverFilters()`

```javascript
function setupDriverFilters() {

    const filterButtons =
        document.querySelectorAll("[data-driver-filter]");

    for (let b = 0; b < filterButtons.length; b++) {

        filterButtons[b].addEventListener("click", function () {

            const filter =
                this.getAttribute("data-driver-filter");

            for (let j = 0; j < filterButtons.length; j++) {

                filterButtons[j].classList.remove("active");

            }

            this.classList.add("active");

            renderDriverCards(filter);

        });

    }

}
```

این تابع وظیفه دارد **دکمه‌های فیلتر رانندگان** را فعال کند.

به زبان ساده:

وقتی کاربر روی دکمه‌ای مانند:

* All
* Available
* Busy
* Scheduled

کلیک می‌کند،

این تابع تشخیص می‌دهد کدام دکمه انتخاب شده است، ظاهر دکمه‌ها را به‌روزرسانی می‌کند و دوباره کارت‌های رانندگان را فقط بر اساس همان فیلتر نمایش می‌دهد. 

---

# هدف تابع

فرض کنید صفحه چنین دکمه‌هایی داشته باشد:

```html
<button data-driver-filter="all">
All
</button>

<button data-driver-filter="available">
Available
</button>

<button data-driver-filter="busy">
Busy
</button>
```

بعد از اجرای این تابع،

هر دکمه قابلیت کلیک خواهد داشت.

با هر کلیک:

1. دکمه فعال تغییر می‌کند.
2. راننده‌های مناسب دوباره نمایش داده می‌شوند.

---

# پیدا کردن همه دکمه‌ها

```javascript
const filterButtons =
document.querySelectorAll("[data-driver-filter]");
```

از

```javascript
querySelectorAll()
```

استفاده شده است.

این متد تمام عناصری را پیدا می‌کند که ویژگی:

```text
data-driver-filter
```

را داشته باشند.

نتیجه یک

> **NodeList**

است که همه دکمه‌ها را در خود نگه می‌دارد.

---

# حلقه روی دکمه‌ها

```javascript
for (

let b = 0;

b < filterButtons.length;

b++

)
```

این حلقه روی تک‌تک دکمه‌ها حرکت می‌کند.

اگر چهار دکمه وجود داشته باشد،

حلقه چهار بار اجرا خواهد شد.

در هر بار اجرا یکی از دکمه‌ها انتخاب می‌شود.

---

# اضافه کردن Event

داخل حلقه:

```javascript
filterButtons[b].addEventListener(
    "click",
    function () {
```

اجرا می‌شود.

متد

```javascript
addEventListener()
```

برای ثبت رویدادها (Events) استفاده می‌شود.

در اینجا رویداد

```text
click
```

ثبت شده است.

یعنی:

هر زمان کاربر روی دکمه کلیک کند،

تابع داخل آن اجرا خواهد شد. 

---

# Anonymous Function

```javascript
function () {

}
```

تابعی که به `addEventListener()` داده شده است، نام ندارد.

به چنین تابعی می‌گویند:

> **Anonymous Function**

این تابع فقط زمانی اجرا می‌شود که کاربر کلیک کند.

---

# چرا از Arrow Function استفاده نشده است؟

نویسنده عمداً از:

```javascript
function () { }
```

استفاده کرده است،

نه:

```javascript
() => { }
```

دلیل آن استفاده از:

```javascript
this
```

داخل تابع است.

در توابع معمولی،

`this`

به همان عنصری اشاره می‌کند که رویداد روی آن اتفاق افتاده است.

اما Arrow Function مقدار `this` مخصوص خودش را ندارد و از محیط بیرونی به ارث می‌برد.

بنابراین اگر اینجا Arrow Function استفاده می‌شد،

`this` دیگر به دکمه‌ی کلیک‌شده اشاره نمی‌کرد. 

---

# دریافت فیلتر

```javascript
const filter =
this.getAttribute("data-driver-filter");
```

اینجا مقدار ویژگی HTML خوانده می‌شود.

مثلاً اگر دکمه چنین باشد:

```html
<button data-driver-filter="busy">
```

خروجی:

```javascript
filter = "busy";
```

خواهد بود.

---

# متد `getAttribute()`

این متد مقدار یک ویژگی HTML را برمی‌گرداند.

مثلاً:

```html
<button data-driver-filter="available">
```

اگر بنویسیم:

```javascript
element.getAttribute("data-driver-filter")
```

خروجی:

```text
available
```

خواهد بود.

---

# حذف کلاس Active از همه دکمه‌ها

سپس:

```javascript
for (

let j = 0;

j < filterButtons.length;

j++

)
```

اجرا می‌شود.

این حلقه دوباره روی همه دکمه‌ها حرکت می‌کند.

---

داخل آن:

```javascript
filterButtons[j]
.classList.remove("active");
```

اجرا می‌شود.

یعنی:

از تمام دکمه‌ها کلاس

```text
active
```

حذف می‌شود.

---

# `classList.remove()`

هر عنصر HTML ویژگی‌ای به نام:

```javascript
classList
```

دارد.

این ویژگی مجموعه کلاس‌های CSS عنصر را مدیریت می‌کند.

متد:

```javascript
remove()
```

یک کلاس را حذف می‌کند.

مثلاً:

قبل:

```html
<button class="btn active">
```

بعد از:

```javascript
classList.remove("active")
```

نتیجه:

```html
<button class="btn">
```

خواهد بود.

---

# فعال کردن دکمه کلیک‌شده

بعد از حذف کلاس از همه دکمه‌ها:

```javascript
this.classList.add("active");
```

اجرا می‌شود.

فقط دکمه‌ای که روی آن کلیک شده،

کلاس:

```text
active
```

را دریافت می‌کند.

---

# `classList.add()`

این متد کلاس جدیدی به عنصر اضافه می‌کند.

مثلاً:

قبل:

```html
<button class="btn">
```

بعد از:

```javascript
classList.add("active")
```

نتیجه:

```html
<button class="btn active">
```

خواهد بود.

---

# الگوی Single Active Toggle

ترتیب اجرای کد به این صورت است:

```text
حذف active از همه دکمه‌ها

↓

اضافه کردن active فقط به دکمه انتخاب‌شده
```

به این روش می‌گویند:

> **Single Active Toggle Pattern**

این الگو در تب‌ها (Tabs)، منوها، ناوبری‌ها و گروه دکمه‌ها بسیار رایج است. 

---

# رندر مجدد راننده‌ها

آخرین دستور:

```javascript
renderDriverCards(filter);
```

تابع `renderDriverCards()` را دوباره اجرا می‌کند.

اما این بار مقدار فیلتر نیز به آن ارسال می‌شود.

مثلاً:

```javascript
renderDriverCards("busy");
```

در نتیجه فقط راننده‌های مشغول نمایش داده می‌شوند.

---

# Event-driven Rendering

در این پروژه صفحه فقط یک بار هنگام بارگذاری ساخته نمی‌شود.

هر بار که کاربر روی دکمه‌ای کلیک می‌کند،

تابع دوباره اجرا شده و رابط کاربری به‌روزرسانی می‌شود.

به این روش می‌گویند:

> **Event-driven Rendering**

یعنی رابط کاربری در پاسخ به رویدادهای کاربر تغییر می‌کند، نه فقط هنگام بارگذاری اولیه صفحه. 

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* `querySelectorAll()`
* `addEventListener()`
* رویداد `click`
* Anonymous Function
* تفاوت Function و Arrow Function در `this`
* `getAttribute()`
* `classList.add()`
* `classList.remove()`
* حلقه‌های تو در تو (Nested Loops)
* Event-driven Programming
* Event-driven Rendering
* Single Active Toggle Pattern

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `setupDriverFilters()` چیست؟**

پاسخ:

> این تابع تمام دکمه‌های دارای ویژگی `data-driver-filter` را پیدا می‌کند و برای هرکدام یک رویداد `click` ثبت می‌کند. هنگام کلیک، ابتدا کلاس `active` از تمام دکمه‌ها حذف می‌شود، سپس به دکمه‌ی انتخاب‌شده اضافه می‌شود و در نهایت تابع `renderDriverCards(filter)` فراخوانی می‌شود تا لیست رانندگان بر اساس فیلتر انتخاب‌شده دوباره نمایش داده شود.

---

**اگر پرسیده شد:**

**چرا در `addEventListener()` از `function () {}` استفاده شده و نه Arrow Function؟**

پاسخ:

> زیرا در توابع معمولی، مقدار `this` به عنصری اشاره می‌کند که رویداد روی آن رخ داده است (دکمه‌ی کلیک‌شده). اما Arrow Function مقدار `this` مخصوص خود را ندارد و از محیط اطراف به ارث می‌برد؛ بنابراین در این کد استفاده از تابع معمولی برای دسترسی صحیح به `this` ضروری است. 


---
---
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
---
---

این بخش خیلی طولانی است و از سقف طول پاسخ بیشتر می‌شود. طبق همان روشی که تا الان پیش رفتیم، از **3.12** شروع می‌کنیم.

---

# 3.12 تابع `renderGallery()`

```javascript
function renderGallery() {

    const main =
        document.querySelector(".page-grid--gallery");

    if (!main) return;

    const areaClasses = [
        "pics",
        "article1",
        "article2",
        "shortcut1"
    ];

    const oldCards =
        main.querySelectorAll(".gallery-card-dynamic");

    for (let r = 0; r < oldCards.length; r++) {
        oldCards[r].remove();
    }

    for (let g = 0; g < galleryItems.length; g++) {

        const item = galleryItems[g];

        const section =
            document.createElement("section");

        const areaClass =
            areaClasses[g] || "pics";

        section.className =
            areaClass +
            " card-section gallery-card gallery-card-dynamic";

        section.innerHTML =
            '<div class="gallery-image-wrap"><img src="' +
            item.image +
            '" alt="' +
            item.title +
            '"></div>' +

            '<h3>' +
            item.title +
            '</h3>' +

            '<p>' +
            item.text +
            '</p>';

        main.appendChild(section);

    }

}
```

این تابع مسئول **ساخت گالری تصاویر به صورت پویا (Dynamic Gallery Rendering)** است.

به جای اینکه کارت‌های گالری به صورت دستی داخل فایل HTML نوشته شوند، اطلاعات هر کارت از آرایه‌ی

```javascript
galleryItems
```

خوانده شده و JavaScript آن‌ها را به عناصر HTML تبدیل می‌کند.

به بیان ساده:

```
Data

↓

HTML

↓

صفحه وب
```

---

# هدف تابع

فرض کنید آرایه‌ی زیر وجود داشته باشد:

```javascript
galleryItems = [

    {
        title: "Airport",
        image: "airport.jpg",
        text: "Airport transfer"
    },

    {
        title: "VIP Taxi",
        image: "vip.jpg",
        text: "Luxury service"
    }

];
```

بعد از اجرای تابع، HTML تقریباً به این شکل خواهد شد:

```html
<section>

    <img ...>

    <h3>Airport</h3>

    <p>Airport transfer</p>

</section>

<section>

    <img ...>

    <h3>VIP Taxi</h3>

    <p>Luxury service</p>

</section>
```

یعنی:

هر عضو آرایه

↓

یک کارت گالری

---

# پیدا کردن Container

اولین دستور:

```javascript
const main =
document.querySelector(".page-grid--gallery");
```

عنصر اصلی گالری را پیدا می‌کند.

مثلاً:

```html
<div class="page-grid--gallery">

</div>
```

تمام کارت‌ها داخل همین عنصر قرار می‌گیرند.

---

# Guard Clause

```javascript
if (!main) return;
```

اگر عنصر پیدا نشود،

تابع فوراً پایان پیدا می‌کند.

این همان الگوی

> **Guard Clause**

است که قبلاً نیز دیده‌ایم.

---

# آرایه `areaClasses`

سپس:

```javascript
const areaClasses = [

    "pics",

    "article1",

    "article2",

    "shortcut1"

];
```

تعریف شده است.

این آرایه نام نواحی (Grid Areas) مربوط به CSS Grid را نگهداری می‌کند.

هر کارت هنگام ساخته شدن یکی از این نام‌ها را دریافت می‌کند.

---

## ارتباط JavaScript با CSS Grid

فرض کنید در CSS نوشته شده باشد:

```css
grid-template-areas:

"pics article1"

"article2 shortcut1";
```

اگر کارت اول ساخته شود:

```javascript
areaClasses[0]
```

برابر است با:

```text
pics
```

در نتیجه همان کارت داخل ناحیه

```
pics
```

قرار می‌گیرد.

بنابراین این آرایه پل ارتباطی بین **JavaScript** و **CSS Layout** است.

---

# پیدا کردن کارت‌های قبلی

```javascript
const oldCards =
main.querySelectorAll(".gallery-card-dynamic");
```

این دستور تمام کارت‌هایی را که قبلاً توسط JavaScript ساخته شده‌اند پیدا می‌کند.

---

# چرا فقط `.gallery-card-dynamic`؟

کارت‌های اصلی HTML ممکن است ثابت باشند.

اما کارت‌هایی که JavaScript ساخته است،

کلاس:

```text
gallery-card-dynamic
```

را دارند.

در نتیجه فقط همان‌ها حذف می‌شوند.

---

# حذف کارت‌های قبلی

```javascript
for (

let r = 0;

r < oldCards.length;

r++

)
```

روی تمام کارت‌های قبلی حرکت می‌کند.

داخل حلقه:

```javascript
oldCards[r].remove();
```

اجرا می‌شود.

---

# متد `remove()`

این متد یکی از متدهای جدید DOM است.

وظیفه‌ی آن حذف مستقیم یک عنصر از صفحه است.

مثلاً:

قبل:

```html
<section>

Gallery

</section>
```

بعد از:

```javascript
element.remove();
```

آن عنصر کاملاً از DOM حذف می‌شود.

---

## چرا حذف انجام می‌شود؟

اگر این قسمت وجود نداشت،

هر بار اجرای تابع باعث می‌شد کارت‌های جدید به کارت‌های قبلی اضافه شوند.

مثلاً:

```
اجرای اول

4 کارت

↓

اجرای دوم

8 کارت

↓

اجرای سوم

12 کارت
```

به همین دلیل ابتدا همه کارت‌های پویا حذف می‌شوند.

سپس دوباره از ابتدا ساخته می‌شوند.

این دقیقاً همان کاری است که در تابع

```javascript
renderDriverCards()
```

با

```javascript
innerHTML = "";
```

انجام می‌شد.

---

# شروع ساخت کارت‌ها

اکنون حلقه اصلی اجرا می‌شود:

```javascript
for (

let g = 0;

g < galleryItems.length;

g++

)
```

این حلقه روی تمام آیتم‌های گالری حرکت می‌کند.

---

# گرفتن آیتم فعلی

```javascript
const item =
galleryItems[g];
```

اکنون متغیر

```javascript
item
```

به یکی از اعضای آرایه اشاره می‌کند.

مثلاً:

```javascript
item.title

item.image

item.text
```

---

# ساخت عنصر جدید

```javascript
const section =
document.createElement("section");
```

برخلاف توابع قبلی که از `innerHTML` استفاده می‌کردند،

اینجا ابتدا یک عنصر واقعی DOM ساخته می‌شود.

---

## `createElement()`

این متد یک عنصر HTML جدید ایجاد می‌کند.

مثلاً:

```javascript
document.createElement("section");
```

خروجی:

```html
<section>

</section>
```

است.

اما هنوز داخل صفحه قرار نگرفته است.

---

# تعیین Grid Area

```javascript
const areaClass =
areaClasses[g] || "pics";
```

این یکی از جالب‌ترین قسمت‌های تابع است.

---

## عملگر `||`

فرض کنید:

```javascript
areaClasses[2]
```

وجود داشته باشد.

خروجی:

```text
article2
```

خواهد بود.

اما اگر تعداد آیتم‌های گالری بیشتر از تعداد Grid Areaها باشد،

مثلاً:

```javascript
areaClasses[7]
```

وجود ندارد.

در این صورت مقدار:

```javascript
undefined
```

خواهد بود.

به همین دلیل:

```javascript
areaClasses[g] || "pics"
```

اجرا می‌شود.

اگر مقدار سمت چپ معتبر نباشد،

سمت راست انتخاب می‌شود.

یعنی:

```text
pics
```

---

به این روش می‌گویند:

> **Fallback Value**

یا

> **Default Value Using OR Operator**

---

# تعیین کلاس‌های CSS

```javascript
section.className =
areaClass +
" card-section gallery-card gallery-card-dynamic";
```

ویژگی:

```javascript
className
```

تمام کلاس‌های CSS عنصر را مشخص می‌کند.

در نهایت کلاس‌هایی مانند:

```text
pics

card-section

gallery-card

gallery-card-dynamic
```

همزمان روی عنصر قرار می‌گیرند.

---

# نکات آموزشی

این بخش مفاهیم زیر را آموزش می‌دهد:

* `querySelector()`
* `querySelectorAll()`
* Guard Clause
* `remove()`
* `createElement()`
* ساخت عناصر DOM
* حلقه `for`
* آرایه‌ها
* عملگر `||` به عنوان مقدار پیش‌فرض (Fallback)
* `className`
* ارتباط JavaScript با CSS Grid
* Dynamic Rendering

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `renderGallery()` چیست؟**

پاسخ:

> این تابع ابتدا عنصر گالری را پیدا می‌کند و کارت‌های پویای قبلی را حذف می‌کند. سپس با پیمایش آرایه `galleryItems`، برای هر آیتم یک عنصر `<section>` ایجاد کرده، کلاس مناسب CSS Grid را به آن اختصاص می‌دهد، محتوای HTML آن را می‌سازد و در نهایت با `appendChild()` به عنصر اصلی گالری اضافه می‌کند.

---

**اگر پرسیده شد:**

**چرا از `areaClasses[g] || "pics"` استفاده شده است؟**

پاسخ:

> زیرا ممکن است تعداد آیتم‌های گالری از تعداد نواحی تعریف‌شده در CSS Grid بیشتر باشد. در این حالت، اگر `areaClasses[g]` مقدار معتبری نداشته باشد (`undefined`)، عملگر `||` مقدار پیش‌فرض `"pics"` را انتخاب می‌کند تا برنامه بدون خطا اجرا شود.


---
---
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
---
---

# 3.13 تابع `setupContactForm()`

```javascript id="sj3d7k"
function setupContactForm() {

    const form =
        document.querySelector(".contact-form");

    const feedback =
        document.getElementById("form-feedback");

    if (!form || !feedback) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const phonePattern =
            /^09\d{9}$/;

        if (name.length < 2) {

            feedback.className =
                "alert alert-danger";

            feedback.textContent =
                "Please enter your full name.";

        }

        else if (
            !phonePattern.test(
                phone.replace(/\s/g, "")
            )
        ) {

            feedback.className =
                "alert alert-danger";

            feedback.textContent =
                "Phone must start with 09 and be 11 digits.";

        }

        else if (message.length < 10) {

            feedback.className =
                "alert alert-danger";

            feedback.textContent =
                "Message should be at least 10 characters.";

        }

        else {

            feedback.className =
                "alert alert-success";

            feedback.textContent =
                "Message sent! We will call you at " +
                phone +
                " soon.";

            form.reset();

        }

        feedback.classList.remove("d-none");

    });

}
```

این تابع مسئول **اعتبارسنجی فرم تماس (Contact Form Validation)** است.

به زبان ساده:

وقتی کاربر دکمه‌ی ارسال فرم را فشار می‌دهد، این تابع بررسی می‌کند:

* آیا نام معتبر است؟
* آیا شماره تلفن صحیح است؟
* آیا متن پیام به اندازه کافی طولانی است؟

اگر همه چیز درست باشد، پیام موفقیت نمایش داده می‌شود و فرم پاک می‌شود.

---

# هدف تابع

فرض کنید فرم HTML به این صورت باشد:

```html id="g7a4hs"
<form class="contact-form">

    <input id="name">

    <input id="phone">

    <textarea id="message"></textarea>

</form>
```

بعد از اجرای این تابع،

هر بار کاربر فرم را ارسال کند،

ابتدا اطلاعات بررسی می‌شوند و فقط در صورت معتبر بودن، عملیات ادامه پیدا می‌کند.

---

# پیدا کردن فرم

ابتدا:

```javascript id="v8b3ty"
const form =
document.querySelector(".contact-form");
```

فرم اصلی پیدا می‌شود.

---

# پیدا کردن قسمت نمایش پیام

سپس:

```javascript id="7nqfwi"
const feedback =
document.getElementById("form-feedback");
```

عنصری پیدا می‌شود که پیام‌های خطا یا موفقیت داخل آن نمایش داده خواهد شد.

مثلاً:

```html id="f31rjq"
<div id="form-feedback"></div>
```

---

# Guard Clause

```javascript id="y4gkox"
if (!form || !feedback)
    return;
```

اگر فرم یا بخش نمایش پیام وجود نداشته باشد،

تابع بلافاصله پایان پیدا می‌کند.

---

# ثبت رویداد Submit

```javascript id="j3kh8c"
form.addEventListener(
    "submit",
    function(event){
```

به جای رویداد `click`،

اینجا از رویداد:

```text id="w8x3jm"
submit
```

استفاده شده است.

این رویداد زمانی اجرا می‌شود که فرم ارسال شود.

مثلاً:

* کلیک روی دکمه Submit
* فشردن Enter داخل فرم

---

# شیء Event

تابع دارای پارامتر:

```javascript id="f9n0eu"
event
```

است.

این شیء اطلاعات مربوط به رویداد را در اختیار برنامه قرار می‌دهد.

---

# `event.preventDefault()`

اولین دستور داخل تابع:

```javascript id="u5o2ph"
event.preventDefault();
```

یکی از مهم‌ترین دستورات مربوط به فرم‌ها است.

---

## رفتار پیش‌فرض مرورگر

به طور عادی،

بعد از ارسال فرم،

مرورگر:

* فرم را ارسال می‌کند.
* صفحه را دوباره بارگذاری (Reload) می‌کند.

اما در این پروژه نمی‌خواهیم صفحه Reload شود.

پس می‌نویسیم:

```javascript id="tr8hvn"
preventDefault()
```

تا رفتار پیش‌فرض مرورگر متوقف شود.

---

### نتیجه

کاربر همان صفحه را می‌بیند و فقط پیام مناسب دریافت می‌کند.

به این نوع رفتار می‌گویند:

> **Single Page Application Style**

زیرا بدون بارگذاری مجدد صفحه، اعتبارسنجی انجام می‌شود.

---

# خواندن مقدار ورودی‌ها

```javascript id="l1d7vs"
const name =
document.getElementById("name")
.value
.trim();
```

همین کار برای:

```javascript id="6o4rxe"
phone
```

و

```javascript id="v2mx7k"
message
```

نیز انجام شده است.

---

# ویژگی `value`

تمام عناصر فرم مانند:

```html id="m9pk4t"
<input>

<textarea>
```

دارای ویژگی:

```javascript id="gm1uew"
value
```

هستند.

این ویژگی متن واردشده توسط کاربر را برمی‌گرداند.

---

# متد `trim()`

بعد از:

```javascript id="h6tz9n"
.value
```

متد:

```javascript id="v8c3lu"
trim()
```

اجرا شده است.

این متد فاصله‌های اضافی ابتدا و انتهای متن را حذف می‌کند.

---

## مثال

کاربر وارد کرده است:

```text id="i0nq8l"
      Ali
```

بعد از:

```javascript id="y7gfph"
trim()
```

خواهیم داشت:

```text id="dzx5fa"
Ali
```

---

# عبارت منظم (Regular Expression)

```javascript id="g9e3lv"
const phonePattern =
/^09\d{9}$/;
```

این قسمت یکی از مهم‌ترین مباحث JavaScript است.

به آن می‌گویند:

> **Regular Expression (RegExp)**

برای بررسی الگوی شماره تلفن استفاده شده است.

---

# معنی این الگو

```text id="z3k6rd"
^

09

\d{9}

$
```

اجزای آن:

---

## `^`

شروع رشته را مشخص می‌کند.

یعنی شماره باید دقیقاً از همینجا شروع شود.

---

## `09`

شماره باید با:

```text id="phm7jw"
09
```

شروع شود.

---

## `\d`

به معنی:

```text id="y6g2oq"
Digit
```

یا یک رقم عددی است.

---

## `{9}`

یعنی:

دقیقاً ۹ رقم بعد از 09 وجود داشته باشد.

---

## `$`

به معنی پایان رشته است.

یعنی بعد از آن هیچ کاراکتر اضافی وجود نداشته باشد.

---

# در مجموع

الگوی:

```javascript id="l5n2bt"
/^09\d{9}$/
```

فقط شماره‌هایی مانند:

```text id="nd1h0v"
09123456789
```

را قبول می‌کند.

اما:

```text id="t8k6gy"
9123456789

0912345678

091234567890
```

همگی رد خواهند شد.

---

# متد `test()`

در شرط دوم داریم:

```javascript id="q1fwru"
phonePattern.test(...)
```

این متد بررسی می‌کند:

آیا رشته با الگوی RegExp مطابقت دارد یا خیر.

خروجی همیشه یکی از این دو مقدار است:

```text id="x8a1zp"
true

false
```

---

# حذف فاصله‌های داخلی

قبل از بررسی شماره نوشته شده است:

```javascript id="s5o9mj"
phone.replace(/\s/g, "")
```

---

## `replace()`

این متد بخشی از متن را جایگزین می‌کند.

---

## الگوی `/\s/g`

این عبارت منظم یعنی:

تمام فاصله‌های سفید (Whitespace) را پیدا کن.

* Space
* Tab
* Enter

---

## `g`

حرف:

```text id="n7u5kr"
g
```

مخفف:

```text id="yl4m0x"
Global
```

است.

یعنی همه‌ی فاصله‌ها حذف شوند، نه فقط اولین مورد.

---

## مثال

اگر کاربر وارد کند:

```text id="u9b7ez"
0912 345 6789
```

بعد از:

```javascript id="u3q2yl"
replace(/\s/g,"")
```

خواهیم داشت:

```text id="o4v8tw"
09123456789
```

بنابراین شماره همچنان معتبر خواهد بود.

---

# اعتبارسنجی مرحله‌ای

سپس سه شرط پشت سر هم اجرا می‌شوند:

```text id="ij9s0m"
نام

↓

شماره تلفن

↓

پیام
```

به این روش می‌گویند:

> **Cascading Validation**

یعنی اگر اولین شرط رد شود، شرط‌های بعدی دیگر بررسی نمی‌شوند.

---

# نمایش خطا

اگر شرط برقرار نباشد:

```javascript id="bg5z2r"
feedback.className =
"alert alert-danger";
```

اجرا می‌شود.

این کلاس Bootstrap باعث می‌شود پیام با رنگ قرمز نمایش داده شود.

سپس متن خطا داخل:

```javascript id="v4l8cy"
textContent
```

قرار می‌گیرد.

---

# پیام موفقیت

اگر همه شرط‌ها برقرار باشند:

```javascript id="ux5eg4"
feedback.className =
"alert alert-success";
```

نمایش داده می‌شود.

رنگ آن سبز است.

---

# `form.reset()`

بعد از موفقیت:

```javascript id="ih9m6o"
form.reset();
```

اجرا می‌شود.

این متد داخلی فرم است.

تمام ورودی‌های فرم را به حالت اولیه برمی‌گرداند.

---

# نمایش باکس پیام

در پایان:

```javascript id="pk3rvj"
feedback.classList.remove("d-none");
```

اجرا می‌شود.

کلاس Bootstrap:

```text id="yz1o2a"
d-none
```

عنصر را مخفی می‌کند.

با حذف این کلاس،

باکس پیام روی صفحه ظاهر می‌شود.

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* `submit` Event
* شیء `Event`
* `preventDefault()`
* فرم‌های HTML
* ویژگی `value`
* متد `trim()`
* Regular Expression (RegExp)
* `test()`
* `replace()`
* الگوی `/\s/g`
* اعتبارسنجی سمت کاربر (Client-side Validation)
* `form.reset()`
* `classList.remove()`
* Bootstrap Alerts
* Single Page Application Style

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `setupContactForm()` چیست؟**

پاسخ:

> این تابع برای فرم تماس یک رویداد `submit` ثبت می‌کند. هنگام ارسال فرم، ابتدا با `event.preventDefault()` از ارسال پیش‌فرض و بارگذاری مجدد صفحه جلوگیری می‌کند، سپس نام، شماره تلفن و پیام را اعتبارسنجی می‌کند. در صورت وجود خطا، پیام مناسب با کلاس `alert-danger` نمایش داده می‌شود و در صورت معتبر بودن اطلاعات، پیام موفقیت با کلاس `alert-success` نمایش داده شده و فرم با استفاده از `form.reset()` پاک می‌شود.

---

**اگر پرسیده شد:**

**کاربرد `event.preventDefault()` در این تابع چیست؟**

پاسخ:

> این متد از رفتار پیش‌فرض مرورگر هنگام ارسال فرم جلوگیری می‌کند. در نتیجه صفحه دوباره بارگذاری نمی‌شود و اعتبارسنجی فرم و نمایش پیام‌های خطا یا موفقیت به صورت پویا و بدون Reload شدن صفحه انجام می‌شود.


---
---
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
---
---

# 3.14 تابع `initTaxiCanvas()` — انیمیشن Canvas

```javascript id="n3h5xw"
function initTaxiCanvas() {

    const canvas =
        document.getElementById("taxi-map");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    let width =
        canvas.offsetWidth;

    let height =
        canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    taxiDots = [];

    let dotIndex = 0;

    do {

        taxiDots.push({

            x: Math.random() * width,

            y: Math.random() * height,

            speed:
                0.6 + dotIndex * 0.15,

            direction:
                dotIndex % 2 === 0
                    ? 1
                    : -1

        });

        dotIndex =
            dotIndex + 1;

    }

    while (
        dotIndex < canvasTaxiCount
    );

    ...
```

این تابع مسئول **ساخت و اجرای انیمیشن نقشه تاکسی** با استفاده از **HTML5 Canvas** است.

به زبان ساده:

به جای استفاده از تصاویر آماده یا فایل GIF، تمام انیمیشن به صورت لحظه‌ای توسط JavaScript روی Canvas رسم می‌شود.

---

# Canvas چیست؟

Canvas یکی از قابلیت‌های HTML5 است.

برخلاف عناصر معمولی HTML که متن یا تصویر ثابت نمایش می‌دهند،

Canvas یک **سطح نقاشی (Drawing Surface)** در اختیار JavaScript قرار می‌دهد.

یعنی JavaScript می‌تواند:

* خط رسم کند.
* دایره رسم کند.
* مستطیل رسم کند.
* متن بنویسد.
* انیمیشن بسازد.

تمام این کارها به صورت برنامه‌نویسی انجام می‌شوند.

---

# پیدا کردن Canvas

```javascript id="gq71bh"
const canvas =
document.getElementById("taxi-map");
```

عنصر Canvas از HTML پیدا می‌شود.

مثلاً:

```html id="z7g2ua"
<canvas id="taxi-map"></canvas>
```

---

# Guard Clause

```javascript id="u8l4sm"
if (!canvas)
    return;
```

اگر Canvas در صفحه وجود نداشته باشد،

تابع فوراً متوقف می‌شود.

---

# گرفتن Context

```javascript id="z5k7mw"
const ctx =
canvas.getContext("2d");
```

این مهم‌ترین خط این تابع است.

---

## `getContext("2d")`

Canvas خودش چیزی رسم نمی‌کند.

ابتدا باید یک شیء رسم (Drawing Context) دریافت کنیم.

این شیء همان:

```javascript id="j4x0pe"
ctx
```

است.

تمام دستورات رسم مانند:

* `fillRect()`
* `arc()`
* `fillText()`
* `lineTo()`

از طریق همین شیء انجام می‌شوند.

به همین دلیل معمولاً نام آن را:

```text id="az8t1d"
ctx
```

(مخفف Context)

می‌گذارند.

---

# اندازه Canvas

```javascript id="b1f4qo"
let width =
canvas.offsetWidth;

let height =
canvas.offsetHeight;
```

---

## `offsetWidth`

عرض واقعی عنصر روی صفحه را برحسب پیکسل برمی‌گرداند.

---

## `offsetHeight`

ارتفاع واقعی عنصر را برحسب پیکسل برمی‌گرداند.

---

# چرا این مقدارها گرفته شده‌اند؟

اگر فقط در CSS اندازه Canvas تغییر کند،

اما اندازه داخلی Canvas تغییر نکند،

تصویر کشیده یا تار (Blurry) خواهد شد.

به همین دلیل بلافاصله نوشته شده است:

```javascript id="t3n9ky"
canvas.width =
width;

canvas.height =
height;
```

تا اندازه سطح رسم دقیقاً با اندازه‌ای که کاربر روی صفحه می‌بیند برابر شود.

---

# آرایه TaxiDots

```javascript id="d8m6vp"
taxiDots = [];
```

این آرایه محل نگهداری تمام نقطه‌های متحرک است.

هر نقطه در واقع نماینده یک تاکسی روی نقشه است.

---

# اندیس حلقه

```javascript id="m2r5ql"
let dotIndex = 0;
```

متغیر شمارنده حلقه تعریف شده است.

---

# حلقه `do...while`

```javascript id="c6v8ta"
do {

    ...

}

while (

dotIndex <
canvasTaxiCount

);
```

برخلاف حلقه `while`،

در حلقه `do...while` ابتدا بدنه اجرا می‌شود و سپس شرط بررسی می‌شود.

---

## تفاوت با `while`

حلقه `while`:

```javascript id="p5d1gw"
while(condition){

}
```

ممکن است حتی یک بار هم اجرا نشود.

اما:

```javascript id="u1f8jr"
do{

}
while(condition);
```

حداقل یک بار اجرا خواهد شد.

---

# ساخت نقطه جدید

داخل حلقه:

```javascript id="h9s3ze"
taxiDots.push({

...
});
```

هر بار یک شیء جدید ساخته شده و به آرایه اضافه می‌شود.

---

## `push()`

متد

```javascript id="v0y7rm"
push()
```

یک عضو جدید به انتهای آرایه اضافه می‌کند.

مثلاً:

قبل:

```javascript id="y6a2nx"
[]
```

بعد از:

```javascript id="l8e3cq"
push({x:10})
```

نتیجه:

```javascript id="n4j5zt"
[
 {x:10}
]
```

---

# مختصات تصادفی

```javascript id="r2w9bp"
x:
Math.random() * width
```

---

## `Math.random()`

این تابع عددی بین:

```text id="e7v1mk"
0

و

1
```

تولید می‌کند.

---

اگر:

```javascript id="x5c8ly"
width = 800;
```

باشد،

مثلاً خروجی:

```text id="w9g6ua"
0.72
```

خواهد بود.

پس:

```javascript id="u7m4ro"
0.72 × 800
```

برابر:

```text id="d3q8fs"
576
```

می‌شود.

در نتیجه نقطه در مختصات 576 پیکسلی قرار می‌گیرد.

---

همین کار برای محور:

```javascript id="c8z2hm"
y
```

نیز انجام شده است.

بنابراین هر تاکسی در محل تصادفی صفحه ظاهر می‌شود.

---

# سرعت حرکت

```javascript id="n5u4wp"
speed:

0.6 +

dotIndex * 0.15
```

سرعت هر تاکسی کمی با تاکسی قبلی متفاوت است.

مثلاً:

```text id="m4b9tx"
اولی

0.6

دومی

0.75

سومی

0.9

...
```

در نتیجه حرکت تاکسی‌ها طبیعی‌تر به نظر می‌رسد.

---

# جهت حرکت

```javascript id="k8d2vz"
direction:

dotIndex % 2 === 0

?

1

:

-1
```

اینجا از **عملگر سه‌تایی (Ternary Operator)** استفاده شده است.

---

## عملگر `%`

```javascript id="j1f5sq"
dotIndex % 2
```

باقیمانده تقسیم بر 2 را محاسبه می‌کند.

اگر نتیجه:

```text id="w2q9gc"
0
```

باشد،

عدد زوج است.

---

# نتیجه شرط

اگر شماره تاکسی زوج باشد:

```text id="u6z8fr"
direction = 1
```

اگر فرد باشد:

```text id="a4m3kh"
direction = -1
```

---

یعنی:

```text id="t7c5ln"
زوج‌ها

→

به سمت راست

فردها

→

به سمت چپ
```

حرکت می‌کنند.

---

# افزایش شمارنده

در پایان هر دور:

```javascript id="f3p7xr"
dotIndex =
dotIndex + 1;
```

اجرا می‌شود.

تا در نهایت تعداد تاکسی‌ها برابر شود با:

```javascript id="w1n6va"
canvasTaxiCount
```

---

# چرا از `do...while` استفاده شده است؟

زیرا نویسنده می‌خواهد **حداقل یک تاکسی** ساخته شود، حتی اگر مقدار `canvasTaxiCount` به دلایلی مقدار کوچکی داشته باشد.

همچنین این ساختار نشان می‌دهد که ابتدا عملیات ساخت انجام می‌شود و سپس شرط پایان حلقه بررسی می‌شود؛ این دقیقاً با منطق ایجاد مجموعه‌ای از نقاط اولیه سازگار است.

---

# این قسمت چه مفاهیمی را آموزش می‌دهد؟

* HTML5 Canvas
* `getContext("2d")`
* `offsetWidth`
* `offsetHeight`
* تنظیم اندازه Canvas
* آرایه‌ها
* `push()`
* `Math.random()`
* حلقه `do...while`
* عملگر `%`
* عملگر سه‌تایی (Ternary Operator)
* ساخت اشیاء (Object Creation)
* تولید موقعیت‌های تصادفی (Random Coordinates)

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی بخش ابتدایی تابع `initTaxiCanvas()` چیست؟**

پاسخ:

> این بخش ابتدا عنصر Canvas را پیدا کرده و Context دوبعدی آن را با `getContext("2d")` دریافت می‌کند. سپس اندازه داخلی Canvas را با `offsetWidth` و `offsetHeight` تنظیم می‌کند، آرایه `taxiDots` را مقداردهی اولیه کرده و با استفاده از حلقه `do...while` و متد `push()` تعدادی شیء شامل مختصات تصادفی، سرعت و جهت حرکت برای تاکسی‌ها ایجاد می‌کند تا در مراحل بعدی انیمیشن استفاده شوند.

---

**اگر پرسیده شد:**

**چرا از `Math.random()` و عملگر `%` در این قسمت استفاده شده است؟**

پاسخ:

> `Math.random()` برای تولید موقعیت تصادفی هر تاکسی روی Canvas استفاده شده است تا نقاط در مکان‌های مختلف ظاهر شوند. عملگر `%` نیز برای تشخیص زوج یا فرد بودن شماره هر تاکسی به کار رفته تا با استفاده از عملگر سه‌تایی (`?:`) جهت حرکت آن مشخص شود؛ تاکسی‌های با اندیس زوج به سمت راست و تاکسی‌های با اندیس فرد به سمت چپ حرکت می‌کنند.


---
---
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
---
---

# 3.15 تابع `initTimelineCanvas()`

```javascript id="m9q2xa"
function initTimelineCanvas() {

    const canvas =
        document.getElementById("timeline-canvas");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    canvas.width =
        canvas.offsetWidth;

    canvas.height =
        canvas.offsetHeight;

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

        const px =
            30 + (w - 60) * progress;

        const py =
            (h - 30) +
            (40 - (h - 30)) * progress;

        ctx.fillStyle = "#f5b800";

        ctx.beginPath();

        ctx.arc(
            px,
            py,
            10,
            0,
            Math.PI * 2
        );

        ctx.fill();

        progress =
            progress + 0.003;

        if (progress > 1) {
            progress = 0;
        }

        requestAnimationFrame(
            drawRoute
        );

    }

    drawRoute();

}
```

این تابع مسئول **نمایش انیمیشن مسیر حرکت تاکسی (Timeline Animation)** روی Canvas است.

برخلاف تابع `initTaxiCanvas()` که چندین نقطه‌ی متحرک را روی صفحه حرکت می‌داد، این تابع **یک مسیر مشخص** را رسم می‌کند و یک دایره زردرنگ (نماد تاکسی) را روی آن حرکت می‌دهد.

به بیان ساده:

```text
رسم مسیر

↓

رسم تاکسی

↓

حرکت تاکسی

↓

تکرار بی‌نهایت
```

---

# هدف تابع

این انیمیشن معمولاً برای نمایش روند سفر استفاده می‌شود.

مثلاً:

```text
مبدا

↓

حرکت تاکسی

↓

مقصد
```

کاربر احساس می‌کند تاکسی در حال طی کردن مسیر است.

---

# پیدا کردن Canvas

```javascript
const canvas =
document.getElementById("timeline-canvas");
```

عنصر Canvas مربوط به Timeline پیدا می‌شود.

---

# گرفتن Context

```javascript
const ctx =
canvas.getContext("2d");
```

همانند تابع قبلی، شیء رسم دوبعدی (2D Context) دریافت می‌شود.

تمام عملیات رسم از طریق همین شیء انجام می‌شود.

---

# تنظیم اندازه Canvas

```javascript
canvas.width =
canvas.offsetWidth;

canvas.height =
canvas.offsetHeight;
```

اندازه داخلی Canvas با اندازه واقعی عنصر هماهنگ می‌شود تا تصویر تار یا کشیده نشود.

---

# متغیرهای عرض و ارتفاع

```javascript
const w =
canvas.width;

const h =
canvas.height;
```

برای کوتاه‌تر شدن کد، عرض و ارتفاع در دو متغیر ذخیره شده‌اند.

---

# متغیر Progress

```javascript
let progress = 0;
```

این مهم‌ترین متغیر انیمیشن است.

مقدار آن همیشه بین:

```text
0

تا

1
```

قرار دارد.

---

## معنی Progress

اگر:

```text
progress = 0
```

باشد،

تاکسی در ابتدای مسیر قرار دارد.

اگر:

```text
progress = 0.5
```

باشد،

تقریباً وسط مسیر است.

اگر:

```text
progress = 1
```

باشد،

به انتهای مسیر رسیده است.

---

# تابع داخلی `drawRoute()`

```javascript
function drawRoute(){

...
}
```

این تابع داخل `initTimelineCanvas()` تعریف شده است.

به این نوع تابع می‌گویند:

> **Nested Function**

---

## Closure

از آنجایی که `drawRoute()` داخل `initTimelineCanvas()` تعریف شده است،

به متغیرهای بیرونی مانند:

```javascript
ctx

w

h

progress
```

دسترسی دارد.

به این ویژگی می‌گویند:

> **Closure**

---

# پاک کردن Canvas

اولین دستور:

```javascript
ctx.clearRect(
0,
0,
w,
h
);
```

کل Canvas را پاک می‌کند.

---

## چرا پاک می‌شود؟

اگر این دستور وجود نداشت،

هر فریم روی فریم قبلی رسم می‌شد.

نتیجه:

```text
●●●●●●●●●
```

و رد حرکت تاکسی باقی می‌ماند.

اما با پاک شدن Canvas،

هر بار فقط آخرین موقعیت تاکسی دیده می‌شود.

---

# تنظیم رنگ مسیر

```javascript
ctx.strokeStyle =
"#cbd5e1";
```

رنگ خطوط مسیر مشخص می‌شود.

---

# ضخامت خط

```javascript
ctx.lineWidth = 4;
```

ضخامت مسیر برابر ۴ پیکسل می‌شود.

---

# شروع مسیر

```javascript
ctx.beginPath();
```

مسیر جدید رسم آغاز می‌شود.

---

# رسم مسیر

```javascript
ctx.moveTo(
30,
h-30
);
```

نقطه شروع مسیر مشخص می‌شود.

---

سپس:

```javascript
ctx.lineTo(...)
```

چندین بار اجرا می‌شود.

---

## Polyline

چند دستور پشت سر هم:

```javascript
lineTo()

lineTo()

lineTo()
```

باعث ایجاد یک مسیر شکسته می‌شوند.

به این نوع مسیر می‌گویند:

> **Polyline**

در این پروژه این مسیر نماد مسیر سفر تاکسی است.

---

# رسم مسیر

```javascript
ctx.stroke();
```

بعد از تعیین تمام نقاط،

مسیر روی Canvas رسم می‌شود.

---

# محاسبه موقعیت تاکسی

```javascript
const px =
30 +
(w-60) *
progress;
```

و:

```javascript
const py =
(h-30)+
(
40-(h-30)
)
*
progress;
```

این قسمت یکی از مهم‌ترین مفاهیم گرافیک کامپیوتری است.

---

# درون‌یابی خطی (Linear Interpolation)

فرمول بالا باعث می‌شود موقعیت تاکسی به نسبت مقدار `progress` بین نقطه شروع و پایان تغییر کند.

اگر:

```text
progress = 0
```

مختصات برابر نقطه شروع خواهد بود.

اگر:

```text
progress = 1
```

مختصات برابر نقطه پایان خواهد بود.

اگر:

```text
progress = 0.5
```

مختصات تقریباً وسط مسیر خواهد بود.

به این تکنیک می‌گویند:

> **Linear Interpolation (Lerp)**

---

# رسم تاکسی

```javascript
ctx.fillStyle =
"#f5b800";
```

رنگ تاکسی زرد انتخاب شده است.

---

سپس:

```javascript
ctx.arc(
px,
py,
10,
0,
Math.PI*2
);
```

یک دایره رسم می‌شود.

---

## `Math.PI * 2`

زاویه‌ها در Canvas بر حسب **رادیان (Radians)** هستند.

عدد:

```javascript
Math.PI
```

برابر ۱۸۰ درجه است.

بنابراین:

```javascript
Math.PI * 2
```

برابر:

```text
360°
```

خواهد بود.

در نتیجه یک دایره کامل رسم می‌شود.

---

# افزایش Progress

```javascript
progress =
progress + 0.003;
```

در هر فریم،

مقدار پیشرفت کمی بیشتر می‌شود.

---

اگر حدود ۶۰ فریم در ثانیه رسم شوند،

تاکسی به آرامی حرکت خواهد کرد.

---

# بازگشت به ابتدا

```javascript
if(
progress > 1
){

progress = 0;

}
```

وقتی تاکسی به انتهای مسیر برسد،

دوباره از ابتدای مسیر شروع می‌کند.

به این رفتار می‌گویند:

> **Looping Animation**

---

# `requestAnimationFrame()`

در پایان تابع:

```javascript
requestAnimationFrame(
drawRoute
);
```

اجرا می‌شود.

این دستور به مرورگر می‌گوید:

```text
در فریم بعدی،

دوباره drawRoute را اجرا کن.
```

در نتیجه حلقه انیمیشن به وجود می‌آید.

---

# تفاوت با `setInterval()`

در گذشته برای انیمیشن از:

```javascript
setInterval()
```

استفاده می‌شد.

اما امروزه:

```javascript
requestAnimationFrame()
```

بهتر است زیرا:

* روان‌تر اجرا می‌شود.
* مصرف CPU کمتر است.
* با نرخ تازه‌سازی مانیتور هماهنگ می‌شود.
* هنگام مخفی بودن تب مرورگر متوقف می‌شود.

---

# یک نکته مهم درباره این تابع

برخلاف `initTaxiCanvas()`، شناسه‌ی بازگشتی `requestAnimationFrame()` در متغیر `animationFrameId` ذخیره نشده است.

یعنی اگر بخواهیم بعداً انیمیشن را متوقف کنیم، این تابع چنین امکانی را ندارد.

این یک **ناهماهنگی (Inconsistency)** کوچک در طراحی پروژه است و اگر استاد درباره‌ی بهبود کد سؤال کرد، می‌توانید به آن اشاره کنید.

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* HTML5 Canvas
* Nested Function
* Closure
* `clearRect()`
* `strokeStyle`
* `lineWidth`
* `beginPath()`
* `moveTo()`
* `lineTo()`
* `stroke()`
* Polyline
* `arc()`
* `fill()`
* Linear Interpolation (Lerp)
* `Math.PI`
* `requestAnimationFrame()`
* Looping Animation

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `initTimelineCanvas()` چیست؟**

پاسخ:

> این تابع یک مسیر شکسته (Polyline) روی Canvas رسم می‌کند و با استفاده از متغیر `progress` و تکنیک **Linear Interpolation**، موقعیت یک دایره زردرنگ را روی مسیر محاسبه می‌کند. سپس با استفاده از `requestAnimationFrame()`، تابع `drawRoute()` را به طور مداوم اجرا می‌کند تا انیمیشن حرکت تاکسی روی مسیر ایجاد شود.

---

**اگر پرسیده شد:**

**چرا در این تابع از `requestAnimationFrame()` استفاده شده است؟**

پاسخ:

> زیرا `requestAnimationFrame()` بهترین روش برای ایجاد انیمیشن در مرورگر است. این تابع اجرای فریم‌ها را با نرخ تازه‌سازی نمایشگر هماهنگ می‌کند، مصرف منابع سیستم را کاهش می‌دهد و نسبت به روش‌هایی مانند `setInterval()` انیمیشن روان‌تر و بهینه‌تری ایجاد می‌کند.


---
---
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
---
---

# 3.16 تابع `initPage()` — نقطه شروع برنامه (Entry Point) و مسیریاب (Router)

```javascript id="n7p2vx"
function initPage() {

    const page =
        getCurrentPage();

    highlightActiveNavigation();

    updateTrafficAlert();

    updateHeroStats();

    if (page === "home") {

        initTaxiCanvas();

    }

    else if (page === "contact") {

        renderDriverCards("all");

        setupDriverFilters();

    }

    else if (page === "timeline") {

        renderTimeline();

        initTimelineCanvas();

    }

    else if (page === "gallery") {

        renderGallery();

    }

    else if (page === "contact-form") {

        setupContactForm();

    }

}
```

این تابع مهم‌ترین تابع کل پروژه است.

می‌توان گفت **تمام پروژه از این تابع شروع می‌شود.**

به همین دلیل به آن می‌گویند:

> **Entry Point (نقطه ورود برنامه)**

همچنین این تابع تصمیم می‌گیرد که برای هر صفحه، چه بخش‌هایی اجرا شوند؛ بنابراین نقش یک **Router (مسیریاب)** ساده را نیز دارد.

---

# هدف تابع

فایل `main.js` در تمام صفحات سایت استفاده شده است.

مثلاً:

```text id="u0r5az"
index.html

drivers.html

gallery.html

timeline.html

contact.html
```

همه‌ی این صفحات فایل زیر را بارگذاری می‌کنند:

```text id="l6k1wp"
main.js
```

اما طبیعی است که همه‌ی توابع نباید در همه‌ی صفحات اجرا شوند.

مثلاً:

* صفحه گالری نیازی به فرم تماس ندارد.
* صفحه فرم تماس نیازی به Canvas تایم‌لاین ندارد.

پس این تابع تصمیم می‌گیرد که هر صفحه فقط کدهای موردنیاز خودش را اجرا کند.

---

# تشخیص صفحه فعلی

اولین دستور:

```javascript id="b3v9eh"
const page =
getCurrentPage();
```

تابع

```javascript id="z8w4ns"
getCurrentPage()
```

نام صفحه فعلی را برمی‌گرداند.

مثلاً:

```text id="m2y6cf"
home
```

یا:

```text id="j9x1ra"
gallery
```

یا:

```text id="e4q8tm"
timeline
```

---

# توابع عمومی

بعد از آن سه تابع بدون هیچ شرطی اجرا می‌شوند:

```javascript id="g7k3vo"
highlightActiveNavigation();

updateTrafficAlert();

updateHeroStats();
```

---

## چرا بدون شرط؟

زیرا این سه قابلیت تقریباً در تمام صفحات وجود دارند.

### ۱- `highlightActiveNavigation()`

منوی فعال را مشخص می‌کند.

مثلاً:

```text id="k8s0bu"
Home
```

با رنگ متفاوت نمایش داده می‌شود.

---

### ۲- `updateTrafficAlert()`

پیام وضعیت ترافیک را به‌روزرسانی می‌کند.

---

### ۳- `updateHeroStats()`

آمارهای بخش Hero را نمایش می‌دهد.

---

به این نوع توابع می‌گویند:

> **Universal Functions**

زیرا در همه صفحات اجرا می‌شوند.

---

# شروع بخش شرطی

بعد از اجرای توابع عمومی،

نوبت به تصمیم‌گیری برای هر صفحه می‌رسد.

---

# صفحه Home

```javascript id="v5h9lu"
if (

page === "home"

)
```

اگر صفحه Home باشد:

```javascript id="zz6bqe"
initTaxiCanvas();
```

اجرا می‌شود.

---

یعنی فقط صفحه Home انیمیشن تاکسی را نمایش می‌دهد.

---

# صفحه Contact

```javascript id="x1r4nm"
else if (

page === "contact"

)
```

اگر صفحه راننده‌ها باشد:

دو تابع اجرا می‌شوند.

---

## نمایش راننده‌ها

```javascript id="d2m8qs"
renderDriverCards("all");
```

همه راننده‌ها نمایش داده می‌شوند.

---

## فعال کردن فیلترها

```javascript id="p7t5kw"
setupDriverFilters();
```

دکمه‌های فیلتر فعال می‌شوند.

---

# صفحه Timeline

```javascript id="r6w3yn"
else if (

page === "timeline"

)
```

دو تابع اجرا می‌شوند.

---

```javascript id="s4n1hd"
renderTimeline();
```

ابتدا محتوای Timeline ساخته می‌شود.

---

سپس:

```javascript id="t8y2gc"
initTimelineCanvas();
```

انیمیشن مسیر اجرا می‌شود.

---

# صفحه Gallery

```javascript id="x5k9vp"
else if (

page === "gallery"

)
```

فقط:

```javascript id="u9q3eb"
renderGallery();
```

اجرا می‌شود.

---

# صفحه Contact Form

```javascript id="m4h7ax"
else if (

page ===

"contact-form"

)
```

فقط:

```javascript id="b6p2jr"
setupContactForm();
```

اجرا می‌شود.

---

# چرا از `if / else if` استفاده شده است؟

هر صفحه فقط یکی از این حالت‌ها را می‌تواند داشته باشد.

اگر:

```text id="g0w4ky"
page = home
```

باشد،

دیگر لازم نیست شرط‌های بعدی بررسی شوند.

به همین دلیل از:

```javascript id="q8e5lo"
if

↓

else if

↓

else if
```

استفاده شده است.

این باعث افزایش سرعت اجرای برنامه نیز می‌شود.

---

# این تابع Router است؟

بله.

البته Router بسیار ساده.

---

در Frameworkهایی مثل:

* React
* Vue
* Angular

Router بسیار پیشرفته است.

اما ایده دقیقاً همین است.

```text id="c7r2yi"
تشخیص صفحه

↓

اجرای کد مخصوص همان صفحه
```

---

# مزیت این طراحی

فرض کنید پروژه ۱۰ صفحه داشته باشد.

اگر چنین تابعی وجود نداشت،

تمام توابع در همه صفحات اجرا می‌شدند.

مثلاً:

```text id="n9v5sf"
صفحه Gallery

↓

اجرای فرم تماس

↓

اجرای Timeline

↓

اجرای Driver List

↓

اجرای Canvas
```

که کاملاً بیهوده بود.

اما این Router باعث می‌شود:

فقط کدهای موردنیاز اجرا شوند.

---

# الگوی Dispatcher

این تابع نمونه‌ای از الگوی معروف:

> **Dispatcher Pattern**

نیز هست.

یعنی:

```text id="d5y8qm"
تشخیص وضعیت

↓

ارسال کنترل

↓

اجرای تابع مناسب
```

---

# این تابع چه مفاهیمی را آموزش می‌دهد؟

* Entry Point
* Client-side Router
* Dispatcher Pattern
* Function Composition
* `if / else if`
* استفاده مجدد از توابع
* جداسازی مسئولیت صفحات
* اجرای شرطی توابع
* معماری ماژولار (Modular Architecture)

---

# نکته آموزشی

این پروژه با وجود اینکه از هیچ Frameworkی استفاده نمی‌کند، ایده‌ای مشابه معماری Frameworkهای مدرن را پیاده‌سازی کرده است.

یعنی:

* یک فایل JavaScript مشترک برای همه صفحات.
* یک تابع مرکزی برای کنترل اجرای برنامه.
* اجرای فقط بخش‌های موردنیاز هر صفحه.

این روش باعث می‌شود پروژه مقیاس‌پذیرتر، خواناتر و قابل نگهداری‌تر باشد.

---

# نکته امتحانی

**اگر پرسیده شد:**

**وظیفه‌ی تابع `initPage()` چیست؟**

پاسخ:

> تابع `initPage()` نقطه شروع اجرای برنامه است. ابتدا نام صفحه‌ی فعلی را با `getCurrentPage()` تشخیص می‌دهد، سپس توابع عمومی مانند `highlightActiveNavigation()`، `updateTrafficAlert()` و `updateHeroStats()` را اجرا می‌کند و در ادامه با استفاده از ساختار `if / else if` فقط توابع مخصوص همان صفحه را فراخوانی می‌کند؛ بنابراین نقش یک **Entry Point** و یک **Client-side Router** ساده را در پروژه بر عهده دارد.

---

**اگر پرسیده شد:**

**چرا از `initPage()` به عنوان Router یاد می‌شود؟**

پاسخ:

> زیرا این تابع بر اساس مقدار بازگشتی `getCurrentPage()` تشخیص می‌دهد که کاربر در کدام صفحه قرار دارد و فقط توابع مربوط به همان صفحه را اجرا می‌کند. به این ترتیب از اجرای غیرضروری کدها جلوگیری شده و ساختار پروژه به صورت ماژولار و سازمان‌یافته باقی می‌ماند.


---
---
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
---
---


# 3.17 راه‌اندازی اولیه (Bootstrapping) و پاک‌سازی (Cleanup)

```javascript id="t8w2mn"
document.addEventListener(
    "DOMContentLoaded",
    initPage
);

window.addEventListener(
    "beforeunload",
    function () {

        if (
            animationFrameId !== null
        ) {

            cancelAnimationFrame(
                animationFrameId
            );

        }

    }
);

})();
```

این قسمت آخرین بخش فایل `main.js` است.

در اینجا برنامه **راه‌اندازی (Bootstrapping)** می‌شود و قبل از بسته شدن صفحه نیز عملیات **پاک‌سازی (Cleanup)** انجام می‌شود.

---

# Bootstrapping یعنی چه؟

در برنامه‌نویسی، Bootstrapping یعنی:

> **شروع به کار برنامه و اجرای اولیه آن.**

در این پروژه، این کار با دستور زیر انجام می‌شود:

```javascript id="y7n4zk"
document.addEventListener(
    "DOMContentLoaded",
    initPage
);
```

یعنی:

وقتی صفحه آماده شد،

تابع

```javascript id="p3f6xs"
initPage()
```

اجرا شود.

---

# چرا مستقیماً `initPage()` اجرا نشده است؟

اگر بنویسیم:

```javascript id="f2d9vw"
initPage();
```

ممکن است JavaScript زودتر از HTML اجرا شود.

مثلاً:

```html id="k6u8mr"
<script src="main.js"></script>

<div id="hero"></div>
```

در این حالت ممکن است هنگام اجرای `main.js` عنصر `hero` هنوز ساخته نشده باشد.

در نتیجه:

```javascript id="n9h1qe"
document.getElementById(...)
```

مقدار

```text id="b8m2jc"
null
```

برگرداند.

---

# رویداد `DOMContentLoaded`

به همین دلیل از رویداد:

```text id="g4r7ly"
DOMContentLoaded
```

استفاده شده است.

---

## این رویداد چه زمانی اجرا می‌شود؟

وقتی:

* تمام HTML خوانده شود.
* تمام عناصر DOM ساخته شوند.

اما هنوز لازم نیست:

* تصاویر
* فونت‌ها
* فایل‌های CSS

کاملاً بارگذاری شده باشند.

---

به همین دلیل این رویداد سریع‌تر از رویداد:

```text id="w1k8af"
load
```

اجرا می‌شود.

---

# تفاوت `DOMContentLoaded` و `load`

### `DOMContentLoaded`

منتظر ساخته شدن DOM می‌ماند.

نیازی به بارگذاری کامل تصاویر ندارد.

---

### `load`

منتظر می‌ماند تا:

* HTML
* CSS
* تصاویر
* فونت‌ها
* فایل‌های خارجی

همگی کاملاً دانلود شوند.

بنابراین دیرتر اجرا می‌شود.

---

# چرا `DOMContentLoaded` انتخاب شده است؟

زیرا تمام کاری که `main.js` انجام می‌دهد، مربوط به عناصر DOM است.

مثلاً:

```javascript id="c5s4jx"
querySelector()

getElementById()

createElement()
```

پس فقط کافی است DOM آماده باشد.

---

# ثبت رویداد

```javascript id="m8e3vq"
document.addEventListener(
"DOMContentLoaded",
initPage
);
```

یعنی:

```text id="p0z7kd"
وقتی DOM آماده شد

↓

initPage اجرا شود.
```

---

# رویداد `beforeunload`

بعد از آن:

```javascript id="v7t5gh"
window.addEventListener(
"beforeunload",
...
);
```

ثبت شده است.

---

## این رویداد چه زمانی اجرا می‌شود؟

درست قبل از اینکه کاربر:

* صفحه را ببندد.
* صفحه را Refresh کند.
* وارد صفحه دیگری شود.

---

به این رویداد می‌گویند:

> **beforeunload**

---

# هدف این رویداد

قبل از خروج کاربر،

باید انیمیشن‌ها متوقف شوند.

به همین دلیل این کد نوشته شده است.

---

# بررسی Animation Frame

```javascript id="k2y6wr"
if (

animationFrameId

!==

null

)
```

اگر شناسه انیمیشن وجود داشته باشد،

یعنی هنوز انیمیشن در حال اجراست.

---

# عملگر `!==`

این عملگر یعنی:

> **Strict Not Equal**

یعنی:

هم مقدار

و هم نوع داده

بررسی می‌شود.

---

مثلاً:

```javascript id="z4x8bn"
5 !== "5"
```

برابر است با:

```text id="v3j9ps"
true
```

زیرا نوع داده‌ها متفاوت هستند.

---

# توقف انیمیشن

اگر انیمیشن فعال باشد،

دستور زیر اجرا می‌شود:

```javascript id="g6m2tx"
cancelAnimationFrame(
animationFrameId
);
```

---

# `cancelAnimationFrame()`

قبلاً دیدیم که:

```javascript id="m9w5pk"
requestAnimationFrame()
```

برای اجرای انیمیشن استفاده می‌شود.

اما اگر بخواهیم آن را متوقف کنیم،

از:

```javascript id="b4n7eh"
cancelAnimationFrame()
```

استفاده می‌کنیم.

---

## مثال

```javascript id="s1v8cr"
const id =
requestAnimationFrame(draw);
```

بعداً:

```javascript id="u5l9qa"
cancelAnimationFrame(id);
```

باعث توقف اجرای انیمیشن می‌شود.

---

# چرا این کار لازم است؟

فرض کنید کاربر صفحه را ببندد،

اما انیمیشن همچنان در حافظه مرورگر باقی بماند.

در نتیجه:

* مصرف CPU افزایش پیدا می‌کند.
* باتری لپ‌تاپ سریع‌تر خالی می‌شود.
* حافظه اشغال می‌شود.

به همین دلیل بهتر است قبل از خروج،

انیمیشن متوقف شود.

به این کار می‌گویند:

> **Cleanup**

---

# پایان IIFE

آخرین خط فایل:

```javascript id="d8r1kv"
})();
```

است.

---

## این دستور چیست؟

این همان:

> **Immediately Invoked Function Expression (IIFE)**

است.

ساختار کامل آن:

```javascript id="t6p4yc"
(function(){

    ...

})();
```

می‌باشد.

---

# چرا از IIFE استفاده شده است؟

هدف IIFE ایجاد یک **Scope خصوصی (Private Scope)** است.

تمام متغیرها و توابع داخل این بلوک قرار می‌گیرند و وارد فضای سراسری (Global Scope) نمی‌شوند.

مثلاً:

```javascript id="c9h7ez"
(function(){

let x = 10;

})();
```

بیرون از تابع:

```javascript id="y2q5mf"
console.log(x);
```

خطا می‌دهد.

زیرا `x` خصوصی است.

---

# آیا `initPage()` همان لحظه اجرا می‌شود؟

خیر.

اینجا یک نکته مهم وجود دارد.

---

وقتی IIFE اجرا می‌شود،

دستورات بالای فایل بلافاصله اجرا می‌شوند.

مثلاً:

```javascript id="w8m6rp"
addEventListener(...)
```

همان لحظه ثبت می‌شوند.

اما:

```javascript id="u1n3xs"
initPage
```

در همان لحظه اجرا نمی‌شود.

بلکه فقط به عنوان Callback ثبت می‌شود.

بعداً زمانی که رویداد:

```text id="k5g8au"
DOMContentLoaded
```

رخ دهد،

مرورگر آن را اجرا می‌کند.

---

# ترتیب اجرای برنامه

کل روند اجرای فایل به شکل زیر است:

```text id="a7e2lh"
اجرای IIFE

↓

ثبت Event Listenerها

↓

پایان اجرای اولیه فایل

↓

ساخته شدن کامل DOM

↓

اجرای initPage()

↓

تشخیص صفحه

↓

اجرای توابع مخصوص همان صفحه
```

---

# این بخش چه مفاهیمی را آموزش می‌دهد؟

* Bootstrapping
* `DOMContentLoaded`
* Event Listener
* Callback Function
* `beforeunload`
* `cancelAnimationFrame()`
* Cleanup
* مدیریت چرخه عمر صفحه (Page Lifecycle)
* IIFE
* Private Scope
* Global Scope
* `!==` (Strict Not Equal)

---

# نکته امتحانی

**اگر پرسیده شد:**

**چرا از `DOMContentLoaded` استفاده شده است؟**

پاسخ:

> رویداد `DOMContentLoaded` زمانی اجرا می‌شود که ساختار HTML (DOM) به طور کامل ایجاد شده باشد. از آنجا که توابع این پروژه با عناصر DOM مانند `getElementById()` و `querySelector()` کار می‌کنند، اجرای `initPage()` در این زمان باعث می‌شود تمام عناصر موردنیاز از قبل در صفحه وجود داشته باشند و از بروز خطا جلوگیری شود.

---

**اگر پرسیده شد:**

**هدف استفاده از `beforeunload` و `cancelAnimationFrame()` چیست؟**

پاسخ:

> هنگام خروج کاربر از صفحه، رویداد `beforeunload` اجرا می‌شود. اگر انیمیشنی با `requestAnimationFrame()` در حال اجرا باشد، با استفاده از `cancelAnimationFrame(animationFrameId)` متوقف می‌شود. این کار از ادامه اجرای حلقه انیمیشن پس از بسته شدن صفحه جلوگیری کرده و باعث کاهش مصرف پردازنده، حافظه و باتری می‌شود.

---

**اگر پرسیده شد:**

**نقش `})();` در انتهای فایل چیست؟**

پاسخ:

> `})();` پایان و اجرای یک تابع خوداجرا (Immediately Invoked Function Expression یا IIFE) است. این الگو باعث می‌شود تمام متغیرها و توابع داخل فایل در یک محدوده (Scope) خصوصی قرار گیرند و وارد فضای سراسری (Global Scope) نشوند، در نتیجه از تداخل نام‌ها و آلودگی فضای سراسری جلوگیری می‌شود.


---
---
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

---
---
---

# 4. خلاصه ویژگی‌های JavaScript استفاده‌شده در پروژه

این بخش، خلاصه‌ای از تمام مفاهیم JavaScript است که در پروژه **RideXpress** استفاده شده‌اند. اگر استاد از شما بپرسد که «در این پروژه از چه قابلیت‌های JavaScript استفاده کرده‌اید؟»، این جدول بهترین پاسخ خواهد بود.

---

# 1. محدوده متغیرها و اعلان‌ها (Scoping & Declarations)

در این پروژه از موارد زیر استفاده شده است:

### `const`

برای تعریف متغیرهایی که بعد از مقداردهی اولیه تغییر نمی‌کنند.

مثال:

```javascript
const BRAND_NAME = "RideXpress";
```

---

### `let`

برای متغیرهایی که مقدار آن‌ها در طول اجرای برنامه تغییر می‌کند.

مثال:

```javascript
let progress = 0;
```

---

### IIFE (Immediately Invoked Function Expression)

کل فایل `main.js` داخل یک تابع خوداجرا قرار گرفته است:

```javascript
(function () {

    ...

})();
```

هدف آن جلوگیری از ورود متغیرها و توابع به فضای سراسری (Global Scope) است.

---

### Closure

در توابعی مانند:

```javascript
initTaxiCanvas()

initTimelineCanvas()
```

توابع داخلی به متغیرهای تابع بیرونی دسترسی دارند.

به این ویژگی می‌گویند:

> **Closure**

---

### `"use strict"`

در ابتدای فایل نوشته شده است:

```javascript
"use strict";
```

این حالت باعث می‌شود JavaScript قوانین سخت‌گیرانه‌تری اعمال کند و از بسیاری از خطاهای رایج جلوگیری شود.

---

# 2. ساختمان داده‌ها (Data Structures)

در این پروژه از ساختارهای داده زیر استفاده شده است.

---

## Array (آرایه)

مانند:

```javascript
galleryItems
```

یا

```javascript
driverProfiles
```

---

## Array of Objects

آرایه‌ای که هر عضو آن یک شیء است.

مثلاً:

```javascript
[
    {
        name: "Ali",
        rating: 5
    },

    {
        name: "Sara",
        rating: 4
    }
]
```

---

## Object Literal

تعریف مستقیم یک شیء:

```javascript
{
    title: "Airport",

    image: "airport.jpg",

    text: "Airport transfer"
}
```

---

# 3. ساختارهای کنترلی (Control Flow)

برای کنترل روند اجرای برنامه از موارد زیر استفاده شده است.

---

## `if / else if / else`

برای تصمیم‌گیری.

مثلاً:

```javascript
if (page === "home") {

...
}
```

---

## Ternary Operator

عملگر سه‌تایی:

```javascript
condition ? value1 : value2
```

مثلاً:

```javascript
direction =
dotIndex % 2 === 0
?
1
:
-1;
```

---

## حلقه `for`

برای پیمایش آرایه‌ها.

---

## حلقه `while`

برای تکرار تا برقرار بودن شرط.

---

## حلقه `do...while`

برای اجرای حداقل یک‌بار حلقه.

---

## `continue`

برای رد کردن ادامه‌ی همان دور حلقه و رفتن به دور بعد.

---

# 4. توابع (Functions)

در پروژه از انواع مختلف تابع استفاده شده است.

---

## Named Function

مانند:

```javascript
function renderGallery(){

}
```

---

## Anonymous Function

مانند:

```javascript
addEventListener(
"click",

function(){

}
);
```

---

## Nested Function

تابعی که داخل تابع دیگری تعریف شده باشد.

مانند:

```javascript
drawFrame()

drawRoute()
```

---

## Function Composition

تابعی که چند تابع دیگر را پشت سر هم اجرا می‌کند.

نمونه‌ی اصلی:

```javascript
initPage()
```

---

# 5. عملگرها (Operators)

در پروژه از عملگرهای زیر استفاده شده است.

---

## `===`

مقایسه دقیق مقدار و نوع داده.

---

## `&&`

عملگر AND منطقی.

---

## `||`

عملگر OR منطقی.

همچنین برای مقدار پیش‌فرض نیز استفاده شده است.

---

## `%`

عملگر Modulo.

برای تشخیص زوج یا فرد بودن.

---

## `+`

برای اتصال رشته‌ها (String Concatenation).

مثلاً:

```javascript
"Hello " + name
```

---

## Compound Assignment

مانند:

```javascript
progress += 0.003;
```

یا

```javascript
count++;
```

---

# 6. متدهای رشته (String Methods)

در پروژه از متدهای زیر استفاده شده است.

---

## `trim()`

حذف فاصله ابتدا و انتهای متن.

---

## `split()`

تبدیل رشته به آرایه.

---

## `replace()`

جایگزینی بخشی از متن.

---

## `pop()`

حذف آخرین عضو آرایه.

(توجه کنید که `pop()` متد آرایه است، نه رشته.)

---

## String Concatenation

ساخت رشته بدون استفاده از Template Literal.

مثلاً:

```javascript
"Hi " + username
```

---

# 7. عبارت‌های منظم (Regular Expressions)

در پروژه از RegExp استفاده شده است.

---

## Literal Syntax

```javascript
/^09\d{9}$/
```

---

## `test()`

بررسی تطابق رشته با الگو.

---

## Flag `g`

جستجوی سراسری.

مثلاً:

```javascript
/\s/g
```

---

## Anchors

علامت‌های:

```text
^

$
```

برای مشخص کردن ابتدا و انتهای رشته.

---

## Character Classes

مانند:

```javascript
\d
```

که یعنی:

یک رقم.

---

## Quantifiers

مانند:

```javascript
{9}
```

یعنی:

دقیقاً ۹ بار.

---

# 8. DOM API

برای کار با عناصر HTML از API استاندارد DOM استفاده شده است.

---

استفاده شده است از:

* `getElementById()`
* `querySelector()`
* `querySelectorAll()`
* `createElement()`
* `appendChild()`
* `remove()`
* `classList.add()`
* `classList.remove()`
* `dataset`
* `innerHTML`
* `textContent`
* `getAttribute()`

این‌ها مهم‌ترین ابزارهای JavaScript برای تعامل با صفحه وب هستند.

---

# 9. رویدادها (Events)

در پروژه از Eventهای مختلف استفاده شده است.

---

### `click`

کلیک روی دکمه‌ها.

---

### `submit`

ارسال فرم.

---

### `DOMContentLoaded`

شروع اجرای برنامه پس از آماده شدن DOM.

---

### `resize`

تغییر اندازه پنجره مرورگر.

---

### `beforeunload`

قبل از خروج از صفحه.

---

### `preventDefault()`

جلوگیری از رفتار پیش‌فرض مرورگر.

---

# 10. Canvas API

برای رسم انیمیشن‌ها از Canvas استفاده شده است.

مهم‌ترین متدهای استفاده‌شده:

* `getContext("2d")`
* `fillRect()`
* `clearRect()`
* `beginPath()`
* `moveTo()`
* `lineTo()`
* `stroke()`
* `arc()`
* `fillText()`
* `fillStyle`
* `strokeStyle`

این API امکان رسم اشکال، متن و انیمیشن را روی Canvas فراهم می‌کند.

---

# 11. Browser & Timing APIs

برای مدیریت زمان و تعامل با مرورگر از موارد زیر استفاده شده است.

---

## `requestAnimationFrame()`

اجرای روان انیمیشن.

---

## `cancelAnimationFrame()`

توقف انیمیشن.

---

## `Date`

کار با تاریخ و زمان.

---

## `window.location`

دسترسی به آدرس فعلی صفحه.

---

# 12. اشیای داخلی JavaScript (Built-in Objects)

در پروژه از اشیای داخلی JavaScript استفاده شده است.

---

## `Math.round()`

گرد کردن اعداد.

---

## `Math.random()`

تولید عدد تصادفی.

---

## `Math.PI`

عدد π برای رسم دایره‌ها.

---

## `String()`

تبدیل مقدار به رشته.

---

# جمع‌بندی پروژه

این پروژه بدون استفاده از هیچ فریم‌ورک یا کتابخانه‌ای مانند React، Vue یا jQuery، تنها با **Vanilla JavaScript** و APIهای استاندارد مرورگر پیاده‌سازی شده است. در آن از مفاهیم پایه و پیشرفته JavaScript مانند **IIFE، Closure، آرایه‌ها و اشیاء، ساختارهای کنترلی، توابع تو در تو، رویدادها، Regular Expression، DOM API، Canvas API و Browser API** استفاده شده است.

---

# نکته امتحانی

**اگر استاد بپرسد: «در این پروژه از چه قابلیت‌های JavaScript استفاده شده است؟»**

پاسخ مناسب:

> در پروژه RideXpress از قابلیت‌های استاندارد JavaScript شامل `const` و `let`، الگوی IIFE، Closure، آرایه‌ها و اشیاء، ساختارهای کنترلی مانند `if`، `for`، `while` و `do...while`، توابع نام‌دار و ناشناس، عملگرهای منطقی و مقایسه‌ای، متدهای رشته، Regular Expressions، DOM API، مدیریت رویدادها، Canvas API، `requestAnimationFrame`، `cancelAnimationFrame` و اشیای داخلی مانند `Math` و `Date` استفاده شده است. کل پروژه با **Vanilla JavaScript** پیاده‌سازی شده و به هیچ فریم‌ورک یا کتابخانه خارجی وابسته نیست.


---
---
---