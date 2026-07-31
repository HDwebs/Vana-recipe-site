document.addEventListener("DOMContentLoaded", function () {
  var search = document.getElementById("search");
  var grid = document.getElementById("recipe-grid");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".recipe-card"));
  var noResults = document.getElementById("no-results");
  var resultsMeta = document.getElementById("results-meta");
  var chipGroups = Array.prototype.slice.call(document.querySelectorAll("[data-filter-group]"));
  var favouritesToggle = document.getElementById("favourites-toggle");
  var targetCalories = document.getElementById("target-calories");
  var targetTolerance = document.getElementById("target-tolerance");
  var targetProtein = document.getElementById("target-protein");

  var active = { meal: new Set(), diet: new Set(), band: new Set() };
  var favouritesOnly = false;

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

  if (favouritesToggle) {
    favouritesToggle.addEventListener("click", function () {
      favouritesOnly = !favouritesOnly;
      favouritesToggle.classList.toggle("active", favouritesOnly);
      applyFilters();
    });
  }

  search.addEventListener("input", applyFilters);
  if (targetCalories) targetCalories.addEventListener("input", applyFilters);
  if (targetTolerance) targetTolerance.addEventListener("input", applyFilters);
  if (targetProtein) targetProtein.addEventListener("input", applyFilters);

  function matches(card) {
    var title = card.getAttribute("data-title") || "";
    var meal = (card.getAttribute("data-meal") || "").split(" ");
    var diet = (card.getAttribute("data-diet") || "").split(" ");
    var band = card.getAttribute("data-band") || "";
    var slug = card.getAttribute("data-slug") || "";
    var calories = parseFloat(card.getAttribute("data-calories"));
    var protein = parseFloat(card.getAttribute("data-protein"));
    var q = search.value.trim().toLowerCase();

    if (q && title.indexOf(q) === -1) return false;
    if (active.meal.size && !meal.some(function (m) { return active.meal.has(m); })) return false;
    if (active.diet.size && !diet.some(function (d) { return active.diet.has(d); })) return false;
    if (active.band.size && !active.band.has(band)) return false;
    if (favouritesOnly && !(window.VanaLists && window.VanaLists.isFavourite(slug))) return false;

    var targetVal = targetCalories && targetCalories.value !== "" ? parseFloat(targetCalories.value) : null;
    if (targetVal !== null && !isNaN(targetVal) && !isNaN(calories)) {
      var tolerance = targetTolerance && targetTolerance.value !== "" ? parseFloat(targetTolerance.value) : 100;
      if (isNaN(tolerance)) tolerance = 100;
      if (Math.abs(calories - targetVal) > tolerance) return false;
    }

    var minProtein = targetProtein && targetProtein.value !== "" ? parseFloat(targetProtein.value) : null;
    if (minProtein !== null && !isNaN(minProtein) && !isNaN(protein) && protein < minProtein) return false;

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
    var hasTarget = (targetCalories && targetCalories.value !== "") || (targetProtein && targetProtein.value !== "");
    var anyActive = totalActive || q || favouritesOnly || hasTarget;
    if (shown === cards.length && !anyActive) {
      resultsMeta.textContent = cards.length + " recipes";
    } else {
      resultsMeta.innerHTML = shown + " of " + cards.length + " recipes" +
        (anyActive ? ' <span class="clear-filters" id="clear-filters">Clear filters</span>' : "");
      var clearBtn = document.getElementById("clear-filters");
      if (clearBtn) {
        clearBtn.addEventListener("click", function () {
          active.meal.clear(); active.diet.clear(); active.band.clear();
          search.value = "";
          favouritesOnly = false;
          if (favouritesToggle) favouritesToggle.classList.remove("active");
          if (targetCalories) targetCalories.value = "";
          if (targetTolerance) targetTolerance.value = "100";
          if (targetProtein) targetProtein.value = "";
          document.querySelectorAll(".chip.active").forEach(function (c) { c.classList.remove("active"); });
          applyFilters();
        });
      }
    }
  }

  window.onVanaFavouritesChange = function () {
    if (favouritesOnly) applyFilters();
  };

  applyFilters();
});
