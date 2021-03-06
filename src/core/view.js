import { createElement } from 'src/utils/xml';

const LIMIT_VIEW_TYPE = {
    OFF: 'off',
    AUTO: 'auto',
    LOOK_AT: 'lookat',
    RANGE: 'range',
    FULL_RANGE: 'fullrange',
    OFF_RANGE: 'offrange'
};

const FOV_TYPE = {
    VFOV: 'VFOV',
    HFOV: 'HFOV',
    DFOV: 'DFOV',
    MFOV: 'MFOV'
};

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

    constructor (options) {
        Object.assign(this, DEFAULT_VIEW_OPTIONS, options);
    }

    toString () {
        let view = createElement('view', this);
        let xml = view.outerHTML;
        view = null;
        return xml;
    }
}

View.LIMIT_VIEW_TYPE = LIMIT_VIEW_TYPE;
View.FOV_TYPE = FOV_TYPE;