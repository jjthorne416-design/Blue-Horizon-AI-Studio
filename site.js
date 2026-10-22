(() => {
  const byId = (id) => document.getElementById(id);
  byId("current-year").textContent = new Date().getFullYear();
  const menu = byId("mobile-menu");
  const nav = byId("nav-links");
  menu?.addEventListener("click", () => {
    const expanded = nav.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", String(expanded));
    menu.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menu?.setAttribute("aria-expanded", "false");
  }));
  document.querySelectorAll(".plan-contact").forEach((link) => link.addEventListener("click", () => {
    const planCard = link.closest(".price-card");
    const planName = planCard?.querySelector("h3")?.textContent || "a plan";
    setTimeout(() => {
      const topic = byId("contact-topic");
      const message = byId("contact-message");
      if (topic && message) {
        topic.value = "Feature suggestion";
        message.value = `I'm interested in the proposed ${planName} plan. I'd like to share what I would need from it.\n\n`;
      }
    }, 180);
  }));
  byId("contact-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const status = byId("contact-status");
    const name = byId("contact-name").value.trim();
    const email = byId("contact-email").value.trim();
    const topic = byId("contact-topic").value;
    const message = byId("contact-message").value.trim();
    await window.submitBlueHorizonContact({
      name,
      email,
      subject: `Blue Horizon AI Studio — ${topic}`,
      message: `Topic: ${topic}\n\n${message}`,
      status
    });
  });

  // If a user arrived from a one-time service card, pre-fill the enquiry.
  const params = new URLSearchParams(window.location.search);
  const serviceNames = {
    "image-text": "Image Text Asset Pack",
    "document-starter": "Branded Document Starter Pack",
    "business-content": "Small Business Content Pack"
  };
  const requestedService = params.get("service");
  if (requestedService && serviceNames[requestedService]) {
    const topic = byId("contact-topic");
    const message = byId("contact-message");
    if (topic) topic.value = "Business inquiry";
    if (message) message.value = `I'm interested in the ${serviceNames[requestedService]}. Please confirm scope, delivery timing, file formats, revisions, and payment before starting.\n\n`;
  }

  // One-time service links remain enquiry links until the owner adds real Stripe Payment Links.
  const cfg = window.BLUE_HORIZON_CONFIG || {};
  const serviceLinks = {
    "image-text": cfg.servicePaymentLinks?.imageTextPack,
    "document-starter": cfg.servicePaymentLinks?.documentStarterPack,
    "business-content": cfg.servicePaymentLinks?.businessContentPack
  };
  document.querySelectorAll("[data-service-checkout]").forEach((link) => {
    const serviceKey = link.dataset.serviceCheckout;
    const checkout = serviceLinks[serviceKey];
    if (checkout && /^https:\/\/(buy\.stripe\.com|checkout\.stripe\.com)\//i.test(checkout)) {
      link.href = checkout;
      link.textContent = "Order securely — one-time";
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("target", "_blank");
    } else {
      link.href = `index.html?service=${encodeURIComponent(serviceKey)}#contact`;
      link.textContent = "Request this package";
    }
  });
})();
