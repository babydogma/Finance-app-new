const screens = {
  onboarding: document.querySelector("#screen-onboarding"),
  home: document.querySelector("#screen-home"),
  goal: document.querySelector("#screen-goal"),
  subscriptions: document.querySelector("#screen-subscriptions")
};

const bottomNav = document.querySelector(".bottom-nav");
const navButtons = document.querySelectorAll(".nav-btn");
const addSheet = document.querySelector("#addSheet");
const amountInput = document.querySelector("#amountInput");
const typeInput = document.querySelector("#typeInput");
const categoryInput = document.querySelector("#categoryInput");
const freeMoney = document.querySelector("#freeMoney");

let balance = 42350;

function formatRub(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

function openScreen(name) {
  const screen = screens[name];

  if (!screen) return;

  Object.values(screens).forEach((item) => {
    item.classList.remove("is-active");
  });

  screen.classList.add("is-active");

  if (name === "onboarding") {
    bottomNav.style.display = "none";
  } else {
    bottomNav.style.display = "grid";
  }

  navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.go === name);
  });
}

function openSheet() {
  addSheet.classList.add("is-open");
  addSheet.setAttribute("aria-hidden", "false");
  setTimeout(() => amountInput.focus(), 120);
}

function closeSheet() {
  addSheet.classList.remove("is-open");
  addSheet.setAttribute("aria-hidden", "true");
  amountInput.value = "";
  categoryInput.value = "";
  typeInput.value = "expense";
}

function saveOperation() {
  const amount = Number(amountInput.value);

  if (!amount || amount <= 0) {
    amountInput.focus();
    amountInput.placeholder = "Сначала введи нормальную сумму";
    return;
  }

  if (typeInput.value === "income") {
    balance += amount;
  } else {
    balance -= amount;
  }

  freeMoney.textContent = formatRub(balance);
  closeSheet();
  openScreen("home");
}

document.addEventListener("click", (event) => {
  const goButton = event.target.closest("[data-go]");
  const actionButton = event.target.closest("[data-action]");

  if (goButton) {
    openScreen(goButton.dataset.go);
    return;
  }

  if (!actionButton) return;

  const action = actionButton.dataset.action;

  if (action === "add") {
    openSheet();
  }

  if (action === "close") {
    closeSheet();
  }

  if (action === "save") {
    saveOperation();
  }
});

addSheet.addEventListener("click", (event) => {
  if (event.target === addSheet) {
    closeSheet();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSheet();
  }
});

openScreen("onboarding");
