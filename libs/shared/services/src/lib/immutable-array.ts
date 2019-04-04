
/**
 * Immutable way of splicing array
 *
 * @export
 * @param {*} arr
 * @param {*} start
 * @param {*} deleteCount
 * @param {*} items
 * @returns
 */
export function Splice(arr, start, deleteCount, ...items) {
   return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)];
}

/**
 * immutable way of pushing 
 *
 * @export
 * @param {*} arr
 * @param {*} newEntry
 * @returns
 */
export function Push(arr, newEntry) {
   return [...arr, newEntry];
}

/**
 * Immutable way to pop
 *
 * @export
 * @param {*} arr
 * @returns
 */
export function Pop(arr) {
   return arr.slice(0, -1)
}

/**
 * Immutable Shift
 *
 * @export
 * @param {*} arr
 * @returns
 */
export function Shift(arr) {
   return arr.slice(1)
}

/**
 * Immutable Unshift
 *
 * @export
 * @param {*} arr
 * @param {*} newEntry
 * @returns
 */
export function Unshift(arr, newEntry) {
   return [].concat(newEntry, arr)
}

/**
 * Immutable Sort
 *
 * @export
 * @param {*} arr
 * @param {*} compareFunction
 * @returns
 */
export function Sort(arr, compareFunction) {
   return arr.concat().sort(compareFunction)
}

/**
 * Immutable Delete
 *
 * @export
 * @param {*} arr
 * @param {*} index
 * @returns
 */
export function Delete(arr, index) {
   return arr.slice(0, index).concat(arr.slice(index + 1))
}
