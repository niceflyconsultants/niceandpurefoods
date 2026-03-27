"use strict";

/* ===================== */
/* SELECTORS */
/* ===================== */

const hero = document.querySelector(".hero");
const mint = document.querySelectorAll(".mint");

const menuIcon = document.getElementById("menuIcon");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll(".menu a");

const form = document.getElementById("contactForm");
const animatedElements = document.querySelectorAll("[data-animate]");

/* ===================== */
/* MOBILE MENU */
/* ===================== */

if (menuIcon && menu) {
  menuIcon.addEventListener("click", () => {
    menu.classList.toggle("show");
    menuIcon.classList.toggle("active");
  });

  // Close menu on link click
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      menuIcon.classList.remove("active");
    });
  });
}

/* ===================== */
/* PARALLAX ANIMATION */
/* ===================== */

if (hero && mint.length > 0) {
  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    mint.forEach((leaf, index) => {
      const speed = (index + 1) * 40;

      const moveX = (x - 0.5) * speed;
      const moveY = (y - 0.5) * speed;

      leaf.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

/* ===================== */
/* SCROLL ANIMATION */
/* ===================== */

if (animatedElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // ✅ performance boost
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  animatedElements.forEach(el => observer.observe(el));
}

/* ===================== */
/* ACTIVE MENU ON SCROLL */
/* ===================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href")?.includes(current)) {
      link.classList.add("active");
    }
  });
});

/* ===================== */
/* CONTACT FORM */
/* ===================== */

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("[name='name']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const phone = form.querySelector("[name='phone']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();

    // ✅ VALIDATION
    if (name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter a valid email");
      return;
    }

    if (!/^[0-9]{10,15}$/.test(phone)) {
      alert("Enter a valid phone number");
      return;
    }

    if (message.length < 5) {
      alert("Message must be at least 5 characters");
      return;
    }

    const whatsappNumber = "923004117716";

    const text = encodeURIComponent(
`Hello, I want to contact you:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`
    );

    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(url, "_blank");

    form.reset();
  });
}