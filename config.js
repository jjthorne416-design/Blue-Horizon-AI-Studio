/* Blue Horizon AI Studio public-site configuration.
   Safe to include in the browser. Do NOT add Stripe secret keys, AI API keys, passwords, or private credentials here.

   1) Replace contactEmail with an inbox you control.
   2) Optional: create a Web3Forms access key for a working browser contact form.
   3) Optional later: paste Stripe Payment Link URLs for the manually fulfilled one-time services on services.html.
   Leave subscription checkout disabled until the real account/AI/credit backend is implemented.
*/
window.BLUE_HORIZON_CONFIG = {
  contactEmail: "bluehorizonaistudio@gmail.com",
  web3formsAccessKey: "REPLACE_WITH_WEB3FORMS_ACCESS_KEY",
  servicePaymentLinks: {
    imageTextPack: "",
    documentStarterPack: "",
    businessContentPack: ""
  },
  subscriptionsEnabled: false
};
// Temporary compatibility for the two original contact handlers.
window.HORIZON_CONTACT_EMAIL = window.BLUE_HORIZON_CONFIG.contactEmail;
