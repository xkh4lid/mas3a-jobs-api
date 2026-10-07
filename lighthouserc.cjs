module.exports = {
  ci: {
    collect: {
      url: [
        "https://mas3a.pages.dev/",
        "https://mas3a.pages.dev/jobs/fresh-graduates",
        "https://mas3a.pages.dev/companies/spimaco"
      ],
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
      }
    },
    assert: {
      assertions: {
        "categories:seo": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["warn", { minScore: 0.8 }],
        "categories:best-practices": ["warn", { minScore: 0.8 }],
        "categories:performance": ["warn", { minScore: 0.6 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./lighthouse-results"
    }
  }
};
