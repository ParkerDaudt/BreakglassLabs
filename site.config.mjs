// One place for everything that changes when the domain and accounts are set up.
// Edit these values, then rebuild. Nothing else in the site needs to change.
export const SITE = {
  name: 'Breakglass Labs',
  legalName: 'Breakglass Labs, LLC',
  location: 'United States',

  // Your domain, with https:// and no trailing slash. Used for canonical links,
  // the sitemap, RSS and security.txt.
  url: 'https://breakglasslabs.example',

  email: 'hello@breakglasslabs.example',
  securityEmail: 'security@breakglasslabs.example',

  // Scheduling link for scoping calls (Cal.com, Calendly, Google booking page).
  // Leave empty and every "Book a scoping call" button goes to the contact page.
  bookingUrl: '',

  // Company page URL, or leave empty to hide the LinkedIn link.
  linkedin: 'https://www.linkedin.com/company/breakglasslabs/',

  // Path to a headshot in /public, for example '/images/parker-daudt.jpg'.
  // Leave empty to show the brand mark instead.
  headshot: '',

  description:
    'Breakglass Labs tests AI agents, LLM applications and MCP servers the way attackers do, and leaves you a regression suite so fixed issues stay fixed.',
  pilotSeason: 'winter 2027',
};

export const bookingHref = SITE.bookingUrl || '/contact/';
