
document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".card")];
  const filters = [...document.querySelectorAll("[data-filter]")];

  let currentFilter = "all";

  // Поиск товаров
  const search = document.querySelector("#search");

  function updateCards() {
    const query = search
      ? search.value.trim().toLowerCase()
      : "";

    cards.forEach(card => {
      const matchesFilter =
        currentFilter === "all" ||
        card.dataset.type === currentFilter;

      const matchesSearch =
        card.textContent.toLowerCase().includes(query);

      card.style.display =
        matchesFilter && matchesSearch ? "" : "none";
    });
  }

  // Фильтры: все, подарки, NFT, скины
  filters.forEach(button => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter || "all";

      filters.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      updateCards();
    });
  });

  // Поле поиска должно иметь id="search"
  if (search) {
    search.addEventListener("input", updateCards);
  }

  // Избранное
  cards.forEach(card => {
    const title =
      card.querySelector("h3")?.textContent || "Предмет";

    const key = "kukicha-favorite-" + title;

    const button = document.createElement("button");
    button.className = "favorite-button";
    button.style.cssText = "width:100%;margin-top:8px;";
    
    let saved = localStorage.getItem(key) === "true";

    function updateButton() {
      button.textContent = saved
        ? "♥ В избранном"
        : "♡ В избранное";
    }

    updateButton();

    button.addEventListener("click", () => {
      saved = !saved;
      localStorage.setItem(key, String(saved));
      updateButton();
    });

    card.appendChild(button);
  });

  // Информация о товаре
  window.showInfo = function(name) {
    alert(
      name +
      "\n\nNFT MARKET KUKICHA" +
      "\nДемонстрационный предмет." +
      "\nРеальные покупки пока не подключены."
    );
  };

  updateCards();

  console.log("NFT MARKET KUKICHA загружен!");
});
    
