(function () {
  var search = document.getElementById("search");
  var grid = document.getElementById("recipe-grid");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".recipe-card"));
  var noResults = document.getElementById("no-results");
  var resultsMeta = document.getElementById("results-meta");
  var chipGroups = Array.prototype.slice.call(document.querySelectorAll("[data-filter-group]"));

  var active = { meal: new Set(), diet: new Set(), band: new Set() };

  chipGroups.forEach(function (group) {
    var groupName = group.getAttribute("data-filter-group");
    group.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var val = chip.getAttribute("data-value");
        if (active[groupName].has(val)) {
          active[groupName].delete(val);
          chip.classList.remove("active");
        } else {
          active[groupName].add(val);
          chip.classList.add("active");
        }
        applyFilters();
      });
    });
  });

  search.addEventListener("input", applyFilters);

  function matches(card) {
    var title = card.getAttribute("data-title") || "";
    var meal = (card.getAttribute("data-meal") || "").split(" ");
    var diet = (card.getAttribute("data-diet") || "").split(" ");
    var band = card.getAttribute("data-band") || "";
    var q = search.value.trim().toLowerCase();

    if (q && title.indexOf(q) === -1) return false;
    if (active.meal.size && !meal.some(function (m) { return active.meal.has(m); })) return false;
    if (active.diet.size && !diet.some(function (d) { return active.diet.has(d); })) return false;
    if (active.band.size && !active.band.has(band)) return false;
    return true;
  }

  function applyFilters() {
    var shown = 0;
    cards.forEach(function (card) {
      var ok = matches(card);
      card.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    noResults.style.display = shown === 0 ? "block" : "none";
    var totalActive = active.meal.size + active.diet.size + active.band.size;
    var q = search.value.trim();
    if (shown === cards.length && !totalActive && !q) {
      resultsMeta.textContent = cards.length + " recipes";
    } else {
      resultsMeta.innerHTML = shown + " of " + cards.length + " recipes" +
        (totalActive || q ? ' <span class="clear-filters" id="clear-filters">Clear filters</span>' : "");
      var clearBtn = document.getElementById("clear-filters");
      if (clearBtn) {
        clearBtn.addEventListener("click", function () {
          active.meal.clear(); active.diet.clear(); active.band.clear();
          search.value = "";
          document.querySelectorAll(".chip.active").forEach(function (c) { c.classList.remove("active"); });
          applyFilters();
        });
      }
    }
  }

  applyFilters();
})();
