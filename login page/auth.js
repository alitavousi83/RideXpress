/* ==========================================================================
   RideXpress — shared authentication module
   Single source of truth for session storage and sign-in, exposed as a
   global `RideXpressAuth` so every page (login, dashboards, register)
   uses the same logic and storage keys.
   ========================================================================== */

(function (global) {
  "use strict";

  /** Storage key for the authenticated session. */
  const SESSION_KEY = "ridexpress.session";

  /** Storage key for the demo user directory (stands in for a backend DB). */
  const USERS_KEY = "ridexpress.users";

  /** Where each role lands after signing in. */
  const DASHBOARDS = {
    driver: "driver-dashboard.html",
    passenger: "passenger-dashboard.html",
  };

  /**
   * Demo accounts seeded on first load so the app is usable without a
   * backend. Replace `login()` with a real API call to go live.
   */
  const DEMO_USERS = [
    { name: "Dana Driver", phone: "+15551230001", password: "driver123", role: "driver" },
    { name: "Paula Passenger", phone: "+15551230002", password: "pass123", role: "passenger" },
  ];

  /** Normalize a phone number for comparison: keep digits and leading "+". */
  function normalizePhone(phone) {
    const trimmed = String(phone).trim();
    const digits = trimmed.replace(/[^\d]/g, "");
    return trimmed.startsWith("+") ? "+" + digits : digits;
  }

  /**
   * Loose international phone check: optional "+", 7–15 digits, with
   * spaces/dashes/parentheses allowed as separators.
   */
  function isValidPhone(phone) {
    const cleaned = String(phone).trim();
    if (!/^\+?[\d\s\-()]+$/.test(cleaned)) return false;
    const digits = cleaned.replace(/[^\d]/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }

  /** Read the registered users, seeding the demo accounts on first run. */
  function getUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      /* corrupted storage — fall through and reseed */
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS));
    return DEMO_USERS.slice();
  }

  /**
   * Authenticate a user.
   * Simulates network latency so the UI's loading states are exercised;
   * swap the body for a fetch() call when a backend exists.
   *
   * @param {{phone: string, password: string, role: "driver"|"passenger"}} credentials
   * @returns {Promise<object>} the authenticated user (without password)
   */
  function login(credentials) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        const phone = normalizePhone(credentials.phone);
        const user = getUsers().find(function (u) {
          return normalizePhone(u.phone) === phone && u.role === credentials.role;
        });

        if (!user) {
          reject(new Error("No " + credentials.role + " account found for this phone number."));
          return;
        }
        if (user.password !== credentials.password) {
          reject(new Error("Incorrect password. Please try again."));
          return;
        }

        resolve({ name: user.name, phone: user.phone, role: user.role });
      }, 900);
    });
  }

  /**
   * Persist the authenticated session.
   * "Remember me" keeps the session in localStorage (survives the browser
   * closing); otherwise sessionStorage scopes it to the current tab.
   */
  function saveSession(user, remember) {
    const payload = JSON.stringify({ user: user, loginAt: new Date().toISOString() });
    // Clear both stores first so stale sessions never linger in the other one.
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, payload);
  }

  /** @returns {object|null} the current session, checking both stores. */
  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  /** End the session and return to the login page. */
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    global.location.href = "login.html";
  }

  /** @returns {string} the dashboard URL for a role (defaults to passenger). */
  function dashboardFor(role) {
    return DASHBOARDS[role] || DASHBOARDS.passenger;
  }

  /**
   * Guard for protected pages: call at the top of a dashboard with the
   * required role; redirects to login when there is no matching session.
   */
  function requireRole(role) {
    const session = getSession();
    if (!session || session.user.role !== role) {
      global.location.href = "login.html";
      return null;
    }
    return session.user;
  }

  /* Public API */
  global.RideXpressAuth = {
    login: login,
    saveSession: saveSession,
    getSession: getSession,
    logout: logout,
    dashboardFor: dashboardFor,
    requireRole: requireRole,
    isValidPhone: isValidPhone,
  };
})(window);
