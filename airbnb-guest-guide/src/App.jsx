import React, { useMemo, useState } from "react";

const HOUSE_NAME = "Welcome to EJ's Home";
const HOUSE_SUBTITLE = "Scan-friendly guide for Wi-Fi, how-to videos, checkout, and local tips.";

const WIFI = {
  network: "<EJ_WIFI_NAME>",
  password: "<EJ_WIFI_PASSWORD>",
  notes: "How to reset wifi, wifi doesn't work in x room, etc.",
};

const CONTACTS = [
  { label: "Host", value: "EJ (555) 555-5555" },
  { label: "Co-host", value: "Cindy (555) 555-5555" },
];

const HOW_TO_ITEMS = [
  {
    title: "TV & Streaming",
    description: "(Eexample) Use the Roku remote. Press Home → open Netflix/Hulu.",
    youtubeId: "dQw4w9WgXcQ", // replace
  },
  {
    title: "Thermostat",
    description: "Add your description here, link to your youtube video",
    youtubeId: "dQw4w9WgXcQ", // replace
  },
  {
    title: "Coffee Maker",
    description: "Add your description here, link to your youtube video",
    youtubeId: "dQw4w9WgXcQ", // replace
  },
];

const CHECKOUT = [
  "Start the dishwasher (tabs under sink)",
  "Place used towels in the bathroom hamper",
  "Take trash to the outside bin (left side of house)",
  "Set thermostat to 70°F (or 68°F in winter)",
  "Lock the door behind you",
];

const LOCAL_FAVORITES = [
  { name: "Breakfast: Sunny Cafe", detail: "Best pancakes. 8 min drive.", map: "https://maps.google.com/?q=Sunny+Cafe" },
  { name: "Dinner: River Grill", detail: "Great views at sunset.", map: "https://maps.google.com/?q=River+Grill" },
  { name: "Day Trip: Scenic Overlook", detail: "Easy hike, awesome photos.", map: "https://maps.google.com/?q=Scenic+Overlook" },
];

const SAFETY = {
  emergency: "Call 911 for emergencies.",
  address: "123 Sample St, Wakefield, Michigan",
  notes: [
    "Fire extinguisher: under the kitchen sink",
    "First-aid kit: hallway closet top shelf",
    "Smoke/CO alarms are installed throughout the home",
  ],
};

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function copyToClipboard(text) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

function Section({ id, title, children, icon }) {
  return (
    <section id={id} className="section">
      <div className="sectionDivider" />
      <div className="sectionHeader">
        <div className="sectionTitleRow">
          <span className="sectionIcon" aria-hidden="true">{icon}</span>
          <h2 className="sectionTitle">{title}</h2>
        </div>
      </div>
      <div className="sectionBody">{children}</div>
    </section>
  );
}

function BigButton({ icon, title, subtitle, onClick }) {
  return (
    <button className="bigBtn" onClick={onClick}>
      <div className="bigBtnIcon" aria-hidden="true">{icon}</div>
      <div className="bigBtnText">
        <div className="bigBtnTitle">{title}</div>
        <div className="bigBtnSubtitle">{subtitle}</div>
      </div>
      <div className="bigBtnChevron" aria-hidden="true">›</div>
    </button>
  );
}

function AccordionItem({ title, description, youtubeId }) {
  const [open, setOpen] = useState(false);

  const videoUrl = useMemo(() => {
    if (!youtubeId) return null;
    return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
  }, [youtubeId]);

  return (
    <div className="accordionItem">
      <button className="accordionToggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <div className="accordionTitle">{title}</div>
        <div className="accordionChevron" aria-hidden="true">{open ? "–" : "+"}</div>
      </button>

      {open && (
        <div className="accordionContent">
          <p className="muted">{description}</p>
          {videoUrl ? (
            <div className="videoWrap">
              <iframe
                className="video"
                src={videoUrl}
                title={`${title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="hint">Add a YouTube video ID to embed a tutorial here.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="heroInner">
          <div className="badge">Guest Guide</div>
          <h1 className="heroTitle">{HOUSE_NAME}</h1>
          <p className="heroSubtitle">{HOUSE_SUBTITLE}</p>

          <div className="grid">
            <BigButton
              icon="📶"
              title="Wi-Fi"
              subtitle="Network name + password"
              onClick={() => scrollToId("wifi")}
            />
            <BigButton
              icon="🔧"
              title="How Things Work"
              subtitle="Short videos for house features"
              onClick={() => scrollToId("howto")}
            />
            <BigButton
              icon="✅"
              title="Checkout"
              subtitle="Quick checklist"
              onClick={() => scrollToId("checkout")}
            />
            <BigButton
              icon="📍"
              title="Local Favorites"
              subtitle="Food, coffee, day trips"
              onClick={() => scrollToId("local")}
            />
            <BigButton
              icon="🚨"
              title="Safety"
              subtitle="Emergency info + supplies"
              onClick={() => scrollToId("safety")}
            />
          </div>

          <div className="miniRow">
            <button className="miniBtn" onClick={() => scrollToId("contacts")}>Contact</button>
            <button className="miniBtn" onClick={() => scrollToId("links")}>Listing Links</button>
          </div>
        </div>
      </header>

      <main className="content">
        <Section id="wifi" title="Wi-Fi" icon="📶">
          <div className="card">
            <div className="kv">
              <div className="k">Network</div>
              <div className="v">
                <span className="mono">{WIFI.network}</span>
                <button className="copyBtn" onClick={() => copyToClipboard(WIFI.network)}>Copy</button>
              </div>
            </div>
            <div className="kv">
              <div className="k">Password</div>
              <div className="v">
                <span className="mono">{WIFI.password}</span>
                <button className="copyBtn" onClick={() => copyToClipboard(WIFI.password)}>Copy</button>
              </div>
            </div>
            {WIFI.notes ? <p className="muted">{WIFI.notes}</p> : null}
          </div>
        </Section>

        <Section id="howto" title="How Things Work" icon="🔧">
          <div className="card">
            <p className="muted">
              Short how-to videos will be added here.
              You can also view all videos on our YouTube channel.
            </p>
            <a
              href="https://www.youtube.com/@VernaWallySwedeCottage"
              target="_blank"
              rel="noreferrer"
              className="channelLink"
            >
              View YouTube Channel  
            </a>
            <p className="muted">
              Tap an item to expand. We can add videos preview here, or just link to your YouTube.
            </p>
            <div className="accordion">
              {HOW_TO_ITEMS.map((item) => (
                <AccordionItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </Section>

        <Section id="checkout" title="Checkout" icon="✅">
          <div className="card">
            <ul className="list">
              {CHECKOUT.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="hint">
              Add more infor or images here (e.g., Checkout is 11:00 AM, photo of where to leave keys)
            </div>
          </div>
        </Section>

        <Section id="local" title="Local Favorites" icon="📍">
          <div className="card">
            <div className="tiles">
              {LOCAL_FAVORITES.map((p) => (
                <a className="tile" href={p.map} key={p.name} target="_blank" rel="noreferrer">
                  <div className="tileTitle">{p.name}</div>
                  <div className="tileSub">{p.detail}</div>
                  <div className="tileLink">Open in Maps →</div>
                </a>
              ))}
            </div>
            <div className="hint">
              Add more categories/favorites (groceries, pharmacies, kid-friendly, rainy-day options)
            </div>
          </div>
        </Section>

        <Section id="safety" title="Safety" icon="🚨">
          <div className="card">
            <p><strong>{SAFETY.emergency}</strong></p>
            <p className="muted"><strong>Address:</strong> {SAFETY.address}</p>
            <ul className="list">
              {SAFETY.notes.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </Section>

        <Section id="contacts" title="Contact" icon="☎️">
          <div className="card">
            <ul className="list">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <strong>{c.label}:</strong> {c.value}
                </li>
              ))}
            </ul>
            <div className="hint">
              Call if x happens (power outage, locked out, etc.)
            </div>
          </div>
        </Section>

        <Section id="links" title="Listing Links" icon="🔗">
          <div className="card">
            <div className="tiles">
              <a className="tile" href="https://www.airbnb.com/rooms/1523938911683580036?check_in=2026-02-06&check_out=2026-02-08&guests=1&adults=1&s=67&unique_share_id=99220db1-70e3-4f45-b2ef-a2ab1861cc6a" target="_blank" rel="noreferrer">
                <div className="tileTitle">Airbnb Listing</div>
                <div className="tileSub">Scandinavian cottage near skiing + dog-friendly</div>
                <div className="tileLink">Open →</div>
              </a>
              <a className="tile" href="https://www.vrbo.com/" target="_blank" rel="noreferrer">
                <div className="tileTitle">VRBO Listing</div>
                <div className="tileSub">If listed on VRBO too, add listing URL</div>
                <div className="tileLink">Open →</div>
              </a>
            </div>
          </div>
        </Section>

        <footer className="footer">
          <button className="miniBtn" onClick={() => scrollToId("top")}>Back to top ↑</button>
          <div className="footerText">Enjoy your stay.</div>
        </footer>
      </main>
    </div>
  );
}
