import { createElement } from 'src/utils/xml';

const DEFAULT_PREVIEW_OPTIONS = {
    type: '',
    url: '',
    stripOrder: 'LFRBUD'
};

export default class Preview {
    /**
     *
     * @param {Object} options = { type, url, stripOrder }
     */
    constructor (scene, options) {
        this.scene = scene;
        Object.assign(this, DEFAULT_PREVIEW_OPTIONS, options);
    }

    /**
     * to XML string: '<preview type="" url="test" striporder="LFRBUD" details="16"></preview>'
     * @returns {string}
     */
    toString () {
        let preview = createElement('preview', this, Object.keys(DEFAULT_PREVIEW_OPTIONS));
        let xml = preview.outerHTML;
        preview = null;
        return xml;
    }
}