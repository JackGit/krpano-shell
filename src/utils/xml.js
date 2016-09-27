import { hasVal } from 'src/utils/lang';

export function createElement (name, options = {}, availableKeys = []) {
    let xmlString = '<' + name + '></' + name + '>';
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    let element = xmlDoc.childNodes[0];
    let modifiedOptions;

    if (availableKeys.length > 0) {
        modifiedOptions = {};

        availableKeys.forEach(key => {
            modifiedOptions[key] = options[key];
        });

        options = modifiedOptions;
    }

    Object.keys(options).forEach(key => {
        if (hasVal(options[key])) {
            element.setAttribute(key.toLowerCase(), options[key]);
        }
    });

    return element;
}