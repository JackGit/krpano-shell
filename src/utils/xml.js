import { hasVal } from 'src/utils/lang';

export function createElement (name, attrs = {}) {
    let xmlString = '<' + name + '></' + name + '>';
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    let element = xmlDoc.childNodes[0];

    Object.keys(attrs).forEach(attr => {
        if (hasVal(attrs[attr])) {
            element.setAttribute(attr.toLowerCase(), attrs[attr]);
        }
    });

    return element;
}