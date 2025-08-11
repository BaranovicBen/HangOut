// utils/findWindows.js
/**
 * Sliding-window search of contiguous 1s in a slice of the eligible array.
 * Returns windows as slot index ranges [startIdx, endIdxExclusive).
 *
 * @param {Uint8Array} eligible
 * @param {number} startIdx  inclusive
 * @param {number} endIdx    exclusive
 * @param {number} k         required contiguous slots (e.g., 2 for 60 min at 30-min slots)
 */
export function findWindowsInSlice(eligible, startIdx, endIdx, k) {
  const wins = [];
  if (k <= 0) return wins;
  let sum = 0;
  let left = startIdx;

  for (let i = startIdx; i < endIdx; i++) {
    sum += eligible[i];
    // maintain window size <= k
    if (i - left + 1 > k) {
      sum -= eligible[left];
      left++;
    }
    if (i - left + 1 === k && sum === k) {
      // contiguous block [left, i] length k
      wins.push([left, i + 1]);
      // move window forward by 1 to find next
      sum -= eligible[left];
      left++;
    }
  }
  return wins;
}