document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const blogCardList = document.getElementById("blog-card-list");
  if (!searchInput || !blogCardList) return;

  const cards = Array.from(blogCardList.querySelectorAll(".blog-card"));

  const noResultsMsg = document.createElement("p");
  noResultsMsg.textContent = "Nothing here..";
  noResultsMsg.className = "no-results";
  noResultsMsg.style.display = "none";
  noResultsMsg.style.textAlign = "center";
  noResultsMsg.style.marginTop = "2rem";
  noResultsMsg.style.fontSize = "1.2rem";
  noResultsMsg.style.color = "#00e0ff";
  noResultsMsg.style.textShadow = "0 0 10px #00e0ffaa";
  blogCardList.parentNode.insertBefore(noResultsMsg, blogCardList);

  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    const firstRects = new Map();
    cards.forEach((card) => firstRects.set(card, card.getBoundingClientRect()));

    let matchCount = 0;
    cards.forEach((card) => {
      const title = card.dataset.title.toLowerCase();
      const tags = card.dataset.tags.toLowerCase();
      const difficulty = card.dataset.difficulty.toLowerCase();
      const os = card.dataset.os.toLowerCase();
      const skills = card.dataset.skills.toLowerCase();

      const match =
        title.includes(query) ||
        tags.includes(query) ||
        difficulty.includes(query) ||
        skills.includes(query)||
        os.includes(query);

      if (query === "" || match) {
        card.classList.remove("hide");
        matchCount++;
      } else {
        card.classList.add("hide");
      }
    });

    // Mostrar mensaje de “sin resultados” solo una vez
    if (matchCount === 0 && query) {
      noResultsMsg.style.display = "block";
      noResultsMsg.classList.add("visible");
      shownOnce = true; // <-- marcamos que ya se mostró
    } else if (matchCount > 0) {
      noResultsMsg.style.display = "none";
      noResultsMsg.classList.remove("visible");
    }

    const matched = cards.filter((c) => !c.classList.contains("hide"));
    const unmatched = cards.filter((c) => c.classList.contains("hide"));
    [...matched, ...unmatched].forEach((card) =>
      blogCardList.appendChild(card)
    );

    const lastRects = new Map();
    cards.forEach((card) => lastRects.set(card, card.getBoundingClientRect()));

    cards.forEach((card) => {
      const first = firstRects.get(card);
      const last = lastRects.get(card);
      const invertY = first.top - last.top;

      if (invertY !== 0) {
        card.style.transform = `translateY(${invertY}px)`;
        card.style.transition = "none";

        requestAnimationFrame(() => {
          card.style.transform = "translateY(0)";
          card.style.transition = "transform 0.4s ease";
        });
      }
    });
  });
});
