/* Blue Horizon AI Studio contact helper.
   Web3Forms is optional; when no access key is configured, the helper prepares a mailto draft instead.
   A Web3Forms access key is public by design, unlike payment secrets and AI provider keys.
*/
(() => {
  const config = window.BLUE_HORIZON_CONFIG || {};
  const clean = value => String(value || "").trim();
  const usableEmail = () => {
    const address = clean(config.contactEmail || window.HORIZON_CONTACT_EMAIL);
    return address.includes("@") && !address.includes("REPLACE_WITH") ? address : "";
  };
  const usableWeb3FormsKey = () => {
    const key = clean(config.web3formsAccessKey);
    return key && !key.includes("REPLACE_WITH") ? key : "";
  };
  const openMailDraft = ({ name, email, subject, message, status }) => {
    const address = usableEmail();
    if (!address) {
      if (status) status.textContent = "Contact setup is incomplete. The site owner must set contactEmail in config.js before this form can be used.";
      return false;
    }
    const body = `Name: ${name}
Reply email: ${email}

${message}

Sent from Blue Horizon AI Studio.`;
    if (status) status.textContent = "Your email application should open. Review the recipient and message, then press Send. Nothing is sent until you send it.";
    window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return true;
  };
  window.submitBlueHorizonContact = async function ({ name, email, subject, message, status }) {
    const payload = { name: clean(name), email: clean(email), subject: clean(subject), message: clean(message) };
    const accessKey = usableWeb3FormsKey();
    if (!accessKey) return openMailDraft({ ...payload, status });
    if (status) status.textContent = "Sending your message securely through the configured contact service…";
    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("subject", payload.subject);
    formData.append("from_name", payload.name);
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("message", payload.message);
    formData.append("botcheck", "");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "The contact service did not accept the message.");
      if (status) status.textContent = "Message submitted. Thank you for contacting Blue Horizon AI Studio.";
      return true;
    } catch (error) {
      if (status) status.textContent = "The web contact service did not send your message. We will try opening your email application instead.";
      return openMailDraft({ ...payload, status });
    }
  };
})();
