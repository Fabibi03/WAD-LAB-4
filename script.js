function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

document.getElementById("regForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const first = document.getElementById("first").value.trim();
  const last = document.getElementById("last").value.trim();
  const email = document.getElementById("email").value.trim();
  const prog = document.getElementById("prog").value.trim();
  const year = document.querySelector("input[name='year']:checked");
  const interests = document.getElementById("interests").value.trim();
  const photo = document.getElementById("photo").value.trim();

  // Clear errors
  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  if (!first) {
    document.getElementById("err-first").textContent = "First name required.";
    valid = false;
  }
  if (!last) {
    document.getElementById("err-last").textContent = "Last name required.";
    valid = false;
  }
  if (!email || !validateEmail(email)) {
    document.getElementById("err-email").textContent = "Valid email required.";
    valid = false;
  }
  if (!prog) {
    document.getElementById("err-prog").textContent = "Programme required.";
    valid = false;
  }
  if (!year) {
    document.getElementById("err-year").textContent = "Select a year.";
    valid = false;
  }

  if (!valid) {
    document.getElementById("live").textContent = "Fix errors before submitting.";
    return;
  }

  const data = {
    first,
    last,
    email,
    prog,
    year: year.value,
    interests: interests ? interests.split(",").map(i => i.trim()) : [],
    photo: photo || "https://placehold.co/128"
  };

  addEntry(data);

  // Reset form
  e.target.reset();
  document.getElementById("live").textContent = "Profile added successfully.";
});

function addEntry(data) {
  // Card
  const card = document.createElement("div");
  card.className = "card-person";
  card.innerHTML = `
    <img src="${data.photo}" alt="">
    <h3>${data.first} ${data.last}</h3>
    <p><span class="badge">${data.prog}</span> <span class="badge">Year ${data.year}</span></p>
    <p>${data.interests.join(", ")}</p>
    <button class="remove-btn">Remove</button>
  `;
  document.getElementById("cards").prepend(card);

  // Table
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${data.first} ${data.last}</td>
    <td>${data.prog}</td>
    <td>${data.year}</td>
    <td>${data.interests.join(", ")}</td>
    <td><button class="remove-btn">Remove</button></td>
  `;
  document.querySelector("#summary tbody").prepend(tr);

  // Remove handlers
  card.querySelector(".remove-btn").addEventListener("click", () => {
    card.remove();
    tr.remove();
  });
  tr.querySelector(".remove-btn").addEventListener("click", () => {
    card.remove();
    tr.remove();
  });
}

// Floating Action Button
document.getElementById("fab").addEventListener("click", () => {
  document.getElementById("regForm").scrollIntoView({ behavior: "smooth" });
});