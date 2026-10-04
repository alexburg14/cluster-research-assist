export default {
  extends: "stylelint-config-standard",
  rules: {
    // it pairs selectors of unrelated components that never match one element
    "no-descending-specificity": null,
    // iOS Safari still needs -webkit-text-size-adjust, Safari before 18 -webkit-backdrop-filter
    "property-no-vendor-prefix": [
      true,
      { ignoreProperties: ["-webkit-text-size-adjust", "-webkit-backdrop-filter"] },
    ],
  },
};
