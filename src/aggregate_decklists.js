/**
 * MTG Decklist Aggregation Tool
 *
 * This script aggregates Magic: The Gathering decklists from a specified day's data
 * and outputs card frequencies sorted by popularity (most frequent cards first).
 *
 * Usage: node aggregate-decklists.js <day_folder>
 * Example: node aggregate-decklists.js day_1
 */

import fs from "fs";
import path from "path";
import { filterNonSpells, parseListLine } from "./utils.js";

// Get the day folder from command line arguments
const day = process.argv[2];
if (!day) {
  console.error("Usage: node aggregate-decklists.js <day_folder>");
  process.exit(1);
}

const directoryPath = path.join("data", day);

// Object to store aggregated card counts across all decklists
const aggregateCardCounts = {};

try {
  // Read all files in the specified day directory
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const listPath = path.join(directoryPath, file);
    const decklistContent = fs.readFileSync(listPath, "utf-8");

    // Parse the decklist file:
    // 1. Split into lines
    // 2. Filter out non-spell cards (lands, etc.)
    // 3. Parse each line into [cardName, quantity] tuples
    const parsedCards = decklistContent
      .split(/\r?\n/)
      .filter(filterNonSpells)
      .map(parseListLine);

    // Add cards from this decklist to the aggregate count
    parsedCards.forEach(([cardName, quantity]) => {
      if (aggregateCardCounts[cardName]) {
        aggregateCardCounts[cardName] += quantity;
      } else {
        aggregateCardCounts[cardName] = quantity;
      }
    });
  });

  Object.entries(aggregateCardCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
    .forEach(([cardName, totalCount]) => {
      console.log(`${totalCount} ${cardName}`);
    });
} catch (err) {
  console.error("Error processing decklists:", err);
  process.exit(1);
}
