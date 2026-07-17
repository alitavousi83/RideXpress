/* ==========================================================================
   RideXpress — Login page controller
   Handles the Driver/Passenger selector, client-side validation, the
   show/hide password toggle, and the sign-in flow. All authentication and
   session logic is delegated to the shared RideXpressAuth module (auth.js).
   ========================================================================== */

(function () {
  "use strict";

  const Auth = window.RideXpressAuth;

  /* ------------------------------ Elements ------------------------------ */

  const form = document.getElementById("login-form");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const rememberInput = document.getElementById("remember-me");
  const loginBtn = document.getElementById("login-btn");
  const btnSpinner = loginBtn.querySelector(".btn-spinner");
  const btnLabel = loginBtn.querySelector(".btn-label");
  const formMessage = document.getElementById("form-message");
  const passwordToggle = document.getElementById("password-toggle");
  const roleOptions = Array.from(document.querySelectorAll(".role-option"));

  /** Currently selected account type; the Passenger tab is active in the markup. */
  let selectedRole = "passenger";

  /* Already signed in? Skip the form and go straight to the right dashboard. */
  const existing = Auth.getSession();
  if (existing) {
    window.location.replace(Auth.dashboardFor(existing.user.role));
    return;
  }

  /* -------------------------- Role selection ---------------------------- */

  roleOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      selectedRole = option.dataset.role;
      roleOptions.forEach(function (btn) {
        const active = btn === option;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", String(active));
      });
      hideFormMessage(); // a stale error may not apply to the new role
    });
  });

  /* ----------------------- Show / hide password ------------------------- */

  passwordToggle.addEventListener("click", function () {
    const show = passwordInput.type === "password";
    passwordInput.type = show ? "text" : "password";
    passwordToggle.setAttribute("aria-pressed", String(show));
    passwordToggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
    passwordToggle.querySelector(".icon-eye").hidden = show;
    passwordToggle.querySelector(".icon-eye-off").hidden = !show;
    passwordInput.focus();
  });

  /* ------------------------- Validation helpers ------------------------- */

  /** Show a validation message under a field and mark the input invalid. */
  function setFieldError(input, message) {
    const errorEl = document.getElementById(input.id + "-error");
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  /** Clear a field's validation state. */
  function clearFieldError(input) {
    const errorEl = document.getElementById(input.id + "-error");
    input.removeAttribute("aria-invalid");
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  /**
   * Validate the form. Returns the first invalid input (so the caller can
   * focus it) or null when everything passes.
   */
  function validateForm() {
    let firstInvalid = null;

    const phone = phoneInput.value.trim();
    if (!phone) {
      setFieldError(phoneInput, "Phone number is required.");
      firstInvalid = firstInvalid || phoneInput;
    } else if (!Auth.isValidPhone(phone)) {
      setFieldError(phoneInput, "Please enter a valid phone number (7–15 digits).");
      firstInvalid = firstInvalid || phoneInput;
    } else {
      clearFieldError(phoneInput);
    }

    if (!passwordInput.value) {
      setFieldError(passwordInput, "Password cannot be empty.");
      firstInvalid = firstInvalid || passwordInput;
    } else {
      clearFieldError(passwordInput);
    }

    return firstInvalid;
  }

  /* Re-validate a field as soon as the user edits it, for instant feedback. */
  [phoneInput, passwordInput].forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") clearFieldError(input);
    });
  });

  /* ------------------------- Form-level messages ------------------------ */

  function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message is-" + type;
    formMessage.hidden = false;
  }

  function hideFormMessage() {
    formMessage.hidden = true;
    formMessage.textContent = "";
  }

  /* --------------------------- Loading state ---------------------------- */

  /** Disable the button and show the spinner while a request is in flight. */
  function setLoading(loading) {
    loginBtn.disabled = loading;
    btnSpinner.hidden = !loading;
    btnLabel.textContent = loading ? "Signing in…" : "Sign In";
  }

  /* ------------------------------- Submit ------------------------------- */

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideFormMessage();

    const firstInvalid = validateForm();
    if (firstInvalid) {
      firstInvalid.focus(); // move the user straight to the problem
      return;
    }

    setLoading(true);

    Auth.login({
      phone: phoneInput.value,
      password: passwordInput.value,
      role: selectedRole,
    })
      .then(function (user) {
        Auth.saveSession(user, rememberInput.checked);
        showFormMessage("Welcome back, " + user.name + "! Redirecting…", "success");
        // Brief pause so the success message is visible before navigating.
        setTimeout(function () {
          window.location.href = Auth.dashboardFor(user.role);
        }, 800);
      })
      .catch(function (err) {
        setLoading(false);
        showFormMessage(err.message || "Something went wrong. Please try again.", "error");
        passwordInput.focus();
      });
  });
})();
