import { createElement } from 'src/utils/xml';
import { LIMIT_VIEW_TYPE, FOV_TYPE } from 'src/constants'

const DEFAULT_VIEW_OPTIONS = {
    hLookAt: .0,
    vLookAt: .0,
    camRoll: .0,
    fovType: FOV_TYPE.VFOV,
    fov: 90.0,
    fovMin: 1.0,
    fovMax: 179.0,
    maxPixelZoom: '',
    mFovRatio: 1.33333,
    distortion: .0,
    distortionFovLink: .5,
    stereoGraphic: true,
    pannini: .0,
    architectural: .0,
    architecturalOnlyMiddle: true,
    limitView: LIMIT_VIEW_TYPE.AUTO,
    hLookAtMin: '',
    hLookAtMax: '',
    vLookAtMin: '',
    vLookAtMax: ''
};

export default class View {

    constructor (pano, options) {
        this.pano = pano;
        this._proxy();
        Object.assign(this, DEFAULT_VIEW_OPTIONS, options);
    }

    _proxy () {
        Object.keys(DEFAULT_VIEW_OPTIONS).forEach(key => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return pano.krpano.view[key.toLowerCase()]
                },
                set: (val) => {
                    pano.krpano.view[key.toLowerCase()] = val;
                }
            });
        });
    }

    toString () {
        let view = createElement('view', this, Object.keys(DEFAULT_VIEW_OPTIONS));
        let xml = view.outerHTML;
        view = null;
        return xml;
    }
}