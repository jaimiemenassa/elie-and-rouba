/*
  WEDDING WEBSITE SETTINGS
  1) Replace the sample names, date, venue and photo paths below.
  2) Add your Supabase Project URL and anon/publishable key.
  Never put a Supabase service_role key in browser JavaScript.
*/

const wedding = {
  groom: "Elie",
  bride: "Rouba",
  // Local wedding time. Use ISO format with the correct local offset if known.
  dateISO: "2027-07-04T18:00:00+03:00",
  dateLabel: "Sunday · July 4, 2027",
  fullDate: "Sunday, July 4, 2027",
  time: "At 6:00 PM",
  location: "Beirut, Lebanon",
  venue: "Venue name",
  address: "Venue address, Lebanon",
  mapUrl: "https://maps.google.com/",
  rsvpDeadline: "June 1, 2027",
  heroImage: "images/couple-main.jpg",
  galleryImages: ["images/couple-1.jpg", "images/couple-2.jpg", "images/couple-3.jpg"]
};

// Paste values from Supabase → Project Settings → API.
// Use the publishable/anon key only. Never use service_role here.
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY";

const $ = (selector) => document.querySelector(selector);

function applyWeddingDetails() {
  document.querySelectorAll("[data-groom]").forEach(el => el.textContent = wedding.groom);
  document.querySelectorAll("[data-bride]").forEach(el => el.textContent = wedding.bride);
  $("[data-date]").textContent = wedding.dateLabel;
  $("[data-full-date]").textContent = wedding.fullDate;
  $("[data-time]").textContent = wedding.time;
  $("[data-location]").textContent = wedding.location;
  $("[data-venue]").textContent = wedding.venue;
  $("[data-address]").textContent = wedding.address;
  $("[data-rsvp-deadline]").textContent = wedding.rsvpDeadline;
  $("[data-year]").textContent = new Date(wedding.dateISO).getFullYear();
  $("#mapLink").href = wedding.mapUrl;

  setPhoto($("#heroPhoto"), wedding.heroImage, true);
  document.querySelectorAll(".gallery-photo").forEach((el, index) => {
    setPhoto(el, wedding.galleryImages[index], false);
  });
}

function setPhoto(element, path, isHero) {
  if (!path) return;
  const img = new Image();
  img.onload = () => {
    element.style.backgroundImage = `url("${path}")`;
    element.classList.add("has-image");
    const hint = element.querySelector(".photo-hint");
    if (hint) hint.remove();
    const label = element.querySelector("span");
    if (label && !isHero) label.remove();
  };
  img.onerror = () => console.warn(`Could not load image: ${path}`);
  img.src = path;
}

function updateCountdown() {
  const target = new Date(wedding.dateISO).getTime();
  const remaining = target - Date.now();
  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => $("#" + id).textContent = "0");
    return;
  }
  const day = 86400000, hour = 3600000, minute = 60000;
  $("#days").textContent = Math.floor(remaining / day);
  $("#hours").textContent = Math.floor((remaining % day) / hour);
  $("#minutes").textContent = Math.floor((remaining % hour) / minute);
  $("#seconds").textContent = Math.floor((remaining % minute) / 1000);
}

function openInvitation() {
  $("#cover").classList.add("hidden");
  $("#siteContent").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function getSupabaseClient() {
  const configured = SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR_") &&
    SUPABASE_ANON_KEY.length > 20 &&
    !SUPABASE_ANON_KEY.includes("YOUR_");
  if (!configured || !window.supabase) return null;
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function setAttendanceFields() {
  const attending = $("#attendance").value === "yes";
  $("#guestCountWrap").classList.toggle("hidden", !attending);
}

async function submitRsvp(event) {
  event.preventDefault();
  const message = $("#formMessage");
  const button = $("#submitRsvp");
  const client = getSupabaseClient();

  if (!client) {
    message.textContent = "The RSVP database is not connected yet. Please ask the couple to finish setting it up.";
    return;
  }

  const attendance = $("#attendance").value;
  const payload = {
    guest_name: $("#guestName").value.trim(),
    attending: attendance === "yes",
    guest_count: attendance === "yes" ? Number($("#guestCount").value) : 0,
    message: $("#message").value.trim() || null
  };

  if (!payload.guest_name) {
    message.textContent = "Please enter your name.";
    return;
  }

  button.disabled = true;
  button.textContent = "Sending...";
  message.textContent = "";

  const { error } = await client.from("wedding_rsvps").insert(payload);

  button.disabled = false;
  button.innerHTML = 'Send RSVP <span>♡</span>';

  if (error) {
    console.error("RSVP error:", error);
    message.textContent = "Sorry, we couldn't save your RSVP. Please try again.";
    return;
  }

  message.textContent = "Thank you! Your RSVP has been received. ♡";
  $("#rsvpForm").reset();
  setAttendanceFields();
}

document.addEventListener("DOMContentLoaded", () => {
  applyWeddingDetails();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
  $("#openInvitation").addEventListener("click", openInvitation);
  $("#attendance").addEventListener("change", setAttendanceFields);
  $("#rsvpForm").addEventListener("submit", submitRsvp);
  setAttendanceFields();
});
