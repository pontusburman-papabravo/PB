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
  const submit = form.querySelector('button[type="submit"]');

  const showStatus = (text) => {
    if (!status) return;
    status.hidden = !text;
    status.textContent = text || '';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      website: String(data.get('website') ?? '').trim(),
      locale: form.getAttribute('data-locale') || 'en',
    };

    const sending = form.getAttribute('data-sending') || 'Sending…';
    const success = form.getAttribute('data-success') || '';
    const errorMsg = form.getAttribute('data-error') || '';
    const endpoint = form.getAttribute('action') || '/api/contact';

    if (submit) submit.disabled = true;
    showStatus(sending);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      let body = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }
      if (res.ok && body && body.ok) {
        showStatus(success);
        form.reset();
      } else {
        showStatus(errorMsg);
      }
    } catch {
      showStatus(errorMsg);
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}

setupNav();
setupContactForm();
