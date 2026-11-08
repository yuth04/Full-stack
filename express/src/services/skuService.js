
const crypto = require("crypto");

/**
 * Generate a unique product SKU.
 * Example: CAT-3-A81F92C4D71B
 *
 * @param {number|string} categoryId
 * @returns {string}
 */
const generateSku = (categoryId) => {
  const categoryPrefix = categoryId
    ? `CAT-${categoryId}`
    : "PRD";

  const uniqueCode = crypto
    .randomBytes(6)
    .toString("hex")
    .toUpperCase();

  return `${categoryPrefix}-${uniqueCode}`;
};

module.exports = { generateSku };
