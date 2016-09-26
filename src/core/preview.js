import { createElement } from 'src/utils/xml';

const DEFAULT_PREVIEW_OPTIONS = {
    type: '',
    url: '',
    stripOrder: 'LFRBUD'
};

export class Preview {
    /**
     *
     * @param {Object} options = { type, url, stripOrder }
     */
    constructor (options) {
        Object.assign(this, DEFAULT_PREVIEW_OPTIONS, options);
    }

    /**
     * to XML string: '<preview type="" url="test" striporder="LFRBUD" details="16"></preview>'
     * @returns {string}
     */
    toString () {
        let preview = createElement('preview', this);
        let xml = preview.outerHTML;
        preview = null;
        return xml;
    }
}

Preview.TYPE = {
    'SPHERE': 'SPHERE',
    'CYLINDER': 'CYLINDER',
    'CUBESTRIP': 'CUBESTRIP',

    grid (type, xSteps, ySteps, res, lineCol, bgCol, pntCol) {
        type || (type = 'CUBE');
        xSteps || (xSteps = 64);
        ySteps || (ySteps = 64);
        res || (res = 512);
        lineCol || (lineCol = '0x666666');
        bgCol || (bgCol = '0x222222');
        pntCol || (pntCol = lineCol);
        return 'grid(' + type + ',' + xSteps + ',' + ySteps + ',' + res + ',' + lineCol + ',' + bgCol + ',' + pntCol + ')';
    }
};

export default function (krShell) {
    krShell.Preview = Preview;
}