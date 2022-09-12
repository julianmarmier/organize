export type Coordinates = {
    x: number,
    y: number
}

/**
 * Returns a - b
 * @param a the first set of coordinates.
 * @param b the second set of coordinates.
 * @returns a - b
 */
const difference = (a: Coordinates, b: Coordinates): Coordinates => ({
    x: b.x - a.x,
    y: b.y - a.y
})

export default {
    difference
}