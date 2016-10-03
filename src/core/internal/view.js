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

    constructor (scene, options) {
        this.scene = scene;
        this.options = Object.assign(DEFAULT_VIEW_OPTIONS, options);
        this._proxy();
    }

    _proxy () {
        Object.keys(DEFAULT_VIEW_OPTIONS).forEach(key => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    if (this.scene.isActive()) {
                        return this.scene.pano.krpano.view[key.toLowerCase()]
                    } else {
                        return this.options[key];
                    }
                },
                set: (val) => {
                    this.options[key] = val;
                    if (this.scene.isActive()) {
                        this.scene.pano.krpano.view[key.toLowerCase()] = val;
                    }
                }
            });
        });
    }

    toString () {
        let view = null;
        let xml = '';

        if (this.scene.isActive()) {
            view = createElement('view', this.scene.pano.krpano.view, Object.keys(DEFAULT_VIEW_OPTIONS).map(k => {return k.toLowerCase()}));
        } else {
            createElement('view', this.options, Object.keys(DEFAULT_VIEW_OPTIONS));
        }

        xml = view.outerHTML;
        view = null;

        return xml;
    }
}