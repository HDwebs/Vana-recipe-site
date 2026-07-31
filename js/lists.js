(function () {
  var FAV_KEY = "vana_favourites";
  var LIST_KEY = "vana_shopping_list";

  function loadSet(key) {
    try {
      var raw = window.localStorage.getItem(key);
      var arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) {
      return new Set();
    }
  }

  function saveSet(key, set) {
    try {
      window.localStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (e) {
      /* localStorage unavailable — favourites/list just won't persist */
    }
  }

  var favourites = loadSet(FAV_KEY);
  var shoppingList = loadSet(LIST_KEY);

  function isFavourite(slug) { return favourites.has(slug); }
  function isInList(slug) { return shoppingList.has(slug); }

  function toggleFavourite(slug) {
    if (favourites.has(slug)) { favourites.delete(slug); } else { favourites.add(slug); }
    saveSet(FAV_KEY, favourites);
    refreshButtons();
    if (typeof window.onVanaFavouritesChange === "function") window.onVanaFavouritesChange();
  }

  function toggleList(slug) {
    if (shoppingList.has(slug)) { shoppingList.delete(slug); } else { shoppingList.add(slug); }
    saveSet(LIST_KEY, shoppingList);
    refreshButtons();
    renderShoppingList();
  }

  function refreshButtons() {
    document.querySelectorAll("[data-fav-toggle]").forEach(function (btn) {
      var slug = btn.getAttribute("data-slug");
      btn.classList.toggle("is-active", isFavourite(slug));
    });
    document.querySelectorAll("[data-cart-toggle]").forEach(function (btn) {
      var slug = btn.getAttribute("data-slug");
      btn.classList.toggle("is-active", isInList(slug));
    });
    var countEl = document.getElementById("shopping-list-count");
    if (countEl) countEl.textContent = shoppingList.size;
  }

  function findRecipe(slug) {
    var all = window.VANA_RECIPES || [];
    for (var i = 0; i < all.length; i++) {
      if (all[i].slug === slug) return all[i];
    }
    return null;
  }

  function renderShoppingList() {
    var body = document.getElementById("shopping-list-body");
    if (!body) return;
    var slugs = Array.from(shoppingList);
    if (!slugs.length) {
      body.innerHTML = '<p class="slide-panel-empty">Your shopping list is empty. Tap the cart icon on any recipe to add its ingredients here.</p>';
      return;
    }
    var html = "";
    slugs.forEach(function (slug) {
      var recipe = findRecipe(slug);
      if (!recipe) return;
      html += '<div class="list-group">';
      html += '<div class="list-group-head"><a href="' + recipe.url + '">' + recipe.title + '</a>' +
        '<button type="button" class="list-group-remove" data-remove-slug="' + slug + '">Remove</button></div>';
      html += '<ul class="list-group-items">';
      recipe.ingredients.forEach(function (item) {
        html += "<li>" + item + "</li>";
      });
      html += "</ul></div>";
    });
    body.innerHTML = html;
    body.querySelectorAll("[data-remove-slug]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        toggleList(btn.getAttribute("data-remove-slug"));
      });
    });
  }

  function plainTextList() {
    var slugs = Array.from(shoppingList);
    var lines = ["VANA Shopping List", ""];
    slugs.forEach(function (slug) {
      var recipe = findRecipe(slug);
      if (!recipe) return;
      lines.push(recipe.title + ":");
      recipe.ingredients.forEach(function (item) { lines.push("- " + item); });
      lines.push("");
    });
    return lines.join("\n");
  }

  document.addEventListener("DOMContentLoaded", function () {
    refreshButtons();
    renderShoppingList();

    document.body.addEventListener("click", function (e) {
      var favBtn = e.target.closest("[data-fav-toggle]");
      if (favBtn) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavourite(favBtn.getAttribute("data-slug"));
        return;
      }
      var cartBtn = e.target.closest("[data-cart-toggle]");
      if (cartBtn) {
        e.preventDefault();
        e.stopPropagation();
        toggleList(cartBtn.getAttribute("data-slug"));
        return;
      }
    });

    var toggle = document.getElementById("shopping-list-toggle");
    var overlay = document.getElementById("shopping-list-overlay");
    var panel = document.getElementById("shopping-list-panel");
    var closeBtn = document.getElementById("shopping-list-close");

    function openPanel() {
      renderShoppingList();
      overlay.hidden = false;
      panel.hidden = false;
      requestAnimationFrame(function () { panel.classList.add("is-open"); overlay.classList.add("is-open"); });
    }
    function closePanel() {
      panel.classList.remove("is-open");
      overlay.classList.remove("is-open");
      setTimeout(function () { panel.hidden = true; overlay.hidden = true; }, 200);
    }

    if (toggle) toggle.addEventListener("click", openPanel);
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    if (overlay) overlay.addEventListener("click", closePanel);

    var copyBtn = document.getElementById("shopping-list-copy");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var text = plainTextList();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            copyBtn.textContent = "Copied!";
            setTimeout(function () { copyBtn.textContent = "Copy List"; }, 1500);
          });
        }
      });
    }

    var printBtn = document.getElementById("shopping-list-print");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

    var clearBtn = document.getElementById("shopping-list-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        shoppingList.clear();
        saveSet(LIST_KEY, shoppingList);
        refreshButtons();
        renderShoppingList();
      });
    }
  });

  window.VanaLists = {
    isFavourite: isFavourite,
    isInList: isInList,
    getFavourites: function () { return Array.from(favourites); },
    getList: function () { return Array.from(shoppingList); },
  };
})();
