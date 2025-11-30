export function formatSpellName(spellName) {
  return spellName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function parseListLine(line) {
  const index = line.indexOf(" ");
  const spell = formatSpellName(line.slice(index + 1));
  const count = parseInt(line.slice(0, index));
  return [spell, count];
}

export function filterNonSpells(line) {
  // first character is a number and line is not empty
  return line.trim() && !isNaN(line[0]);
}
