// Mobile navigation and the contact form.
// Do not add analytics or third-party calls here.
// A future provider belongs in src/lib/analytics.ts, with the privacy page
// and Content-Security-Policy updated in the same change.

function setupNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('#site-nav');
  const label = toggle?.querySelector('[data-nav-label]');
  if (!toggle || !panel || !label) return;

  const closedLabel = toggle.getAttribute('data-label-menu') || 'Menu';
  const openLabel = toggle.getAttribute('data-label-close') || 'Close';

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.classList.toggle('is-open', open);
    label.textContent = open ? openLabel : closedLabel;
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
    const recipient = form.getAttribute('data-email') || '';
    const subjectLead = form.getAttribute('data-subject-lead') || 'Assignment enquiry from';
    const labelName = form.getAttribute('data-label-name') || 'Name';
    const labelCompany = form.getAttribute('data-label-company') || 'Company';
    const labelEmail = form.getAttribute('data-label-email') || 'Email';
    const subject = `${subjectLead} ${name}${company ? `, ${company}` : ''}`;
    const body = [
      `${labelName}: ${name}`,
      `${labelCompany}: ${company || '—'}`,
      `${labelEmail}: ${email}`,
      '',
      message,
    ].join('\n');
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.hidden = false;
      status.textContent = form.getAttribute('data-status') || '';
    }
  });
}

setupNav();
setupContactForm();
