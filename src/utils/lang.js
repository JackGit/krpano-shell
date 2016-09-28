const toString = Object.prototype.toString;
const OBJECT_STRING = '[object Object]';

export function isPlainObject (obj) {
    return toString.call(obj) === OBJECT_STRING;
}

export function hasVal (val) {
    return val !== null && val !== undefined && val !== '';
}

export function proxy (object, from, keys) {
    if (isPlainObject(keys)) { // keys mapping
        Object.keys(keys).forEach(key => {
            Object.defineProperty(object, keys[key], {
                configurable: true,
                enumerable: true,
                get: () => {
                    return from[key];
                },
                set: (val) => {
                    from[key] = val;
                }
            })
        });
    }

    if (Array.isArray(keys)) { // keys
        keys.forEach(key => {
            Object.defineProperty(object, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return from[key];
                },
                set: (val) => {
                    from[key] = val;
                }
            })
        });
    }
}
