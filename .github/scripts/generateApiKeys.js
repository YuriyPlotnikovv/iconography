const fs = require('fs');
const path = require('path');

const filePath = path.join(process.env.GITHUB_WORKSPACE, '.env');
const cockpitApiUrl = process.env.COCKPIT_URL;
const cockpitApiKey = process.env.COCKPIT_API_KEY;
const captchaPublicApiKey = process.env.CAPTCHA_PUBLIC_API_KEY;
const captchaPrivateApiKey = process.env.CAPTCHA_PRIVATE_API_KEY;

if (!cockpitApiUrl || !cockpitApiKey || !captchaPublicApiKey || !captchaPrivateApiKey) {
  console.error('API keys are not set.');
  process.exit(1);
}

const content = `NEXT_PUBLIC_CAPTCHA_PUBLIC_API_KEY = "${captchaPublicApiKey}"\nNEXT_PUBLIC_CAPTCHA_PRIVATE_API_KEY = "${captchaPrivateApiKey}"\nNEXT_PUBLIC_COCKPIT_URL = "${cockpitApiUrl}"\nNEXT_PUBLIC_COCKPIT_API_KEY = "${cockpitApiKey}"\n\n`;

fs.writeFileSync(filePath, content, 'utf8');
console.log('API keys have been generated.');
