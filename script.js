const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const filters = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !visible);
    });
  });
});

const revealItems = document.querySelectorAll(
  ".skill-block, .project-card, .cert-grid article, .timeline article, .profile-card, .journey-panel"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
