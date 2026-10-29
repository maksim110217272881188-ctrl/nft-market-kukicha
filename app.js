
document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".card")];
  const filterButtons = [
    ...document.querySelectorAll("[data-filter]")
  ];
  const searchInput = document.querySelector("#search");
  const openMarketButton = document.querySelector("#open-market");

  let currentFilter = "all";

  // Открыть маркетплейс
  openMarketButton?.addEventListener("click", () => {
    document.querySelector("#market")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // Поиск и фильтры
  function updateCards() {
    const query = searchInput
      ? searchInput.value.trim().toLowerCase()
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

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter || "all";

      filterButtons.forEach(item => {
        item.classList.toggle("active", item === button);
      });

      updateCards();
    });
  });

  searchInput?.addEventListener("input", updateCards);

  // Избранное с сохранением в браузере
  cards.forEach(card => {
    const name =
      card.querySelector("h3")?.textContent.trim() || "Предмет";

    const storageKey = "kukicha-favorite-" + name;
    let isFavorite = localStorage.getItem(storageKey) === "true";

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.className = "favorite-button";
    favoriteButton.style.cssText =
      "width:100%;margin-top:8px;background:#252016;color:#f5c451;";

    function updateFavoriteButton() {
      favoriteButton.textContent = isFavorite
        ? "♥ В избранном"
        : "♡ В избранное";

      favoriteButton.setAttribute(
        "aria-pressed",
        String(isFavorite)
      );
    }

    updateFavoriteButton();

    favoriteButton.addEventListener("click", () => {
      isFavorite = !isFavorite;

      try {
        localStorage.setItem(storageKey, String(isFavorite));
      } catch (error) {
        console.warn("Не удалось сохранить избранное", error);
      }

      updateFavoriteButton();
    });

    card.appendChild(favoriteButton);
  });

  // Информация о товаре
  document.querySelectorAll(".details-button").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name || "Предмет";

      const card = button.closest(".card");
      const description =
        card?.querySelector("p")?.textContent || "";

      const price =
        card?.querySelector(".price")?.textContent || "";

      alert(
        name +
        "\n" + description +
        "\n" + price +
        "\n\nЭто демонстрационный предмет." +
        "\nРеальная покупка пока недоступна."
      );
    });
  });

  // Первоначальное отображение
  updateCards();

  console.log("NFT MARKET KUKICHA загружен!");
});
