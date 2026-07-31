module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("login.html");

  eleventyConfig.addCollection("recipes", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/recipes/*.md").sort((a, b) =>
      a.data.title.localeCompare(b.data.title)
    );
  });

  eleventyConfig.addCollection("recentRecipes", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/recipes/*.md")
      .sort((a, b) => new Date(b.data.dateAdded) - new Date(a.data.dateAdded))
      .slice(0, 4);
  });

  eleventyConfig.addCollection("featuredRecipe", function (collectionApi) {
    const featured = collectionApi
      .getFilteredByGlob("content/recipes/*.md")
      .filter((item) => item.data.featured)
      .sort((a, b) => new Date(b.data.dateAdded) - new Date(a.data.dateAdded));
    return featured.length ? [featured[0]] : [];
  });

  eleventyConfig.addFilter("calorieBand", function (calories) {
    if (calories == null) return "unknown";
    if (calories < 300) return "under-300";
    if (calories < 500) return "300-500";
    if (calories < 700) return "500-700";
    return "700-plus";
  });

  eleventyConfig.addFilter("calorieBandLabel", function (band) {
    const labels = {
      "under-300": "Under 300 kcal",
      "300-500": "300–500 kcal",
      "500-700": "500–700 kcal",
      "700-plus": "700+ kcal",
    };
    return labels[band] || "";
  });

  eleventyConfig.addFilter("titleCase", function (str) {
    if (!str) return "";
    return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  });

  eleventyConfig.addFilter("json", function (obj) {
    return JSON.stringify(obj);
  });

  eleventyConfig.addFilter("recipeIndex", function (collection) {
    return (collection || []).map((item) => ({
      slug: item.data.slug,
      title: item.data.title,
      url: item.url,
      calories: item.data.calories,
      protein: item.data.protein,
      ingredients: item.data.ingredients || [],
    }));
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
