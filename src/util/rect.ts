/**
 * DOMRect geometry functions
 */

/**
 * Returns true if a and be are overlapping, false otherwise.
 * @param a The first element
 * @param b The second element
 * @returns true if a and be are overlapping, false otherwise.
 */
export const checkIntersection = (a: Element, b: Element) => {
  const r1 = a.getBoundingClientRect(),
    r2 = b.getBoundingClientRect();

  return !(
    r1.top > r2.bottom ||
    r1.right < r2.left ||
    r1.bottom < r2.top ||
    r1.left > r2.right
  );
};

/**
 * Gets the fraction of a's area that is overlapping with b.
 * @param a The element of which we are calculating the area fraction
 * @param b The element that is overlapping with a
 * @returns A fraction between 0 and 1.
 */
export const areaOccupiedFraction = (a: Element, b: Element) =>
area(getIntersection(a, b)) / area(a.getBoundingClientRect());

const area = (rect: DOMRect) => rect.width * rect.height;

const getIntersection = (a: Element, b: Element) => {
  const r1 = a.getBoundingClientRect(),
    r2 = b.getBoundingClientRect();

  const [top, bottom, left, right] = [
    Math.max(r1.top, r2.top),
    Math.min(r1.bottom, r2.bottom),
    Math.max(r1.left, r2.left),
    Math.min(r1.right, r2.right),
  ];

  return new DOMRect(top, left, right - left, bottom - top);
};
