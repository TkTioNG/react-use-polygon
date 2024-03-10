/**
 * Convert angle form degree to radiant.
 * @param {number} angle Angle in degree
 * @returns {number} Angle in radiant
 */
export function degToRad(angle: number) {
  return (angle * Math.PI) / 180;
}

/**
 * Normalize angle in between 0 to 2π.
 * @param {number} angle Angle in radiant
 * @returns {number} Normalized angle
 */
export function normalizeRadAngle(angle: number) {
  // Normalize angle
  const n0 = angle % (Math.PI * 2);
  const n1 = n0 < 0 ? n0 + Math.PI * 2 : n0;

  // Perfect circle will return to its origin, and svg path will not be shown
  // Hence, purposefully shorten the path a bit
  const isZeroAngle = angle === 0;
  return !isZeroAngle && n1 === 0 ? Math.PI * 1.9999 : n1;
}

/**
 * Normalize angle from degree to radiant in between 0 to 2π.
 * @param {number} angle Angle in degree
 * @returns {number} Normalized angle
 */
export function normalizeDegAngle(angle: number) {
  return normalizeRadAngle(degToRad(angle));
}
