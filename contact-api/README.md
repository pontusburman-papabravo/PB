# papabravo contact API

Node service that accepts `POST /api/contact` and sends mail via [Resend](https://resend.com).

Caddy on the VPS reverse-proxies `/api/contact` to this process. The static Astro site posts JSON from the contact form; secrets never leave the VPS (or GitHub secrets if you choose to store a deploy copy there).

## One-time VPS setup

1. Verify `papabravo.se` (or the From address domain) in the Resend dashboard, and create an API key.
2. Install the unit and env file (paths match `deploy/papabravo-contact.service`):

```bash
sudo install -d -o papabravo -g papabravo /var/lib/papabravo-contact
install -d ~/apps/papabravo-contact
rsync -a --delete /path/to/PB/contact-api/ ~/apps/papabravo-contact/
# EnvironmentFile — mode 600, owned by the site user:
cat > ~/apps/papabravo-contact.env <<'ENV'
RESEND_API_KEY=re_...
CONTACT_TO=pontus.burman@papabravo.se
CONTACT_FROM=Papa Bravo <noreply@papabravo.se>
CONTACT_PORT=8791
ENV
chmod 600 ~/apps/papabravo-contact.env
sudo cp deploy/papabravo-contact.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now papabravo-contact
```

3. The unit listens on `172.18.0.1:8791` (deploy_default bridge) so the Caddy container can reach it. papabravo-net-isolate and ufw allow only that port from the bridge.
4. Allow publish.sh to restart the unit (only that command):

```
papabravo ALL=(root) NOPASSWD: /bin/systemctl restart papabravo-contact
```

5. Add the `handle /api/contact*` reverse_proxy block from `deploy/Caddyfile` to the **live** Caddy site block, then reload Caddy with the same helper you already use for papabravo (do not use a helper that rolls back Körpasset cert policy).

`deploy/publish.sh` will refresh `~/apps/papabravo-contact` from the published commit and restart the unit when the unit is already enabled. It does **not** create the env file or change Caddy.

## Local

```bash
cd contact-api
RESEND_API_KEY= npm test
CONTACT_PORT=8791 RESEND_API_KEY=re_... node server.mjs
```
