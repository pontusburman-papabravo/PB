// Mobile navigation and the contact form.
// Do not add analytics or third-party calls here.
// A future provider belongs in src/lib/analytics.ts, with the privacy page
// and Content-Security-Policy updated in the same change.

function setupNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('#site-nav');
  const label = toggle?.querySelector('[data-nav-label]');
  if (!toggle || !panel || !label) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.classList.toggle('is-open', open);
    label.textContent = open ? 'Close' : 'Menu';
    if (open) {
      const first = panel.querySelector('a');
      if (first) first.focus();
    }
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
    if (open) toggle.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = document.querySelector('#form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = `Assignment enquiry from ${name}${company ? `, ${company}` : ''}`;
    const body = [`Name: ${name}`, `Company: ${company || '—'}`, `Email: ${email}`, '', message].join('\n');
    window.location.href = `mailto:pontus.burman@papabravo.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.hidden = false;
      status.textContent =
        'Your email app should open with this message ready to send. If it does not, write directly to pontus.burman@papabravo.se.';
    }
  });
}

setupNav();
setupContactForm();
