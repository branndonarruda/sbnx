/**
 * Flats nested objects into one level
 *
 * @export
 * @param {*} object
 * @returns {*}
 */
export function FlattenObject(object: any): object {
   return Object.assign(
      {},
      ...function _flatten(o) {
         return [].concat(...Object.keys(o)
            .map(k =>
               typeof o[k] === 'object' ?
                  _flatten(o[k]) :
                  ({ [k]: o[k] })
            )
         );
      }(object)
   );
}

/**
 * Filters the Object properties. Removing unwanted properties in the object
 *
 * @export
 * @param {*} object
 * @param {(value, obj) => any} callback - the filter callback
 * @returns {*}
 */
export function FilterObject(object: any, callback: (element, object) => any): object {
   let filtered = Object.keys(object)
      .filter(x => callback(x, object))
      .reduce((obj, key) => {
         obj[key] = object[key];
         return obj;
      }, {});

   return filtered;
}

export function ArrayToObjectEntity(array, keyField): any {
   return Object.assign({}, ...array.map(item => ({ [item[keyField]]: item })));
}