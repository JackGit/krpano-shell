import { createElement } from 'src/utils/xml';
import { hasVal } from 'src/utils/lang';

/**
 *
 * CUBE, SPHERE and CYLINDER can be multires
 * FISHEYE and CUBESTRIP can'be multires
 * FLAT is a special CYLINDER with hFov = 1.0
 *
 * features:
 *      different image types
 *      multires support
 *      stereo support
 */

const DEFAULT_IMAGE_OPTIONS = {
    type: '',
    multires: false,
    preAlign: '',
    stereo: false
};

const DEFAULT_STEREO_OPTIONS = {
    stereo: true,
    stereoLabels: '1|2',
    stereoFormat: 'TB'
};

const DEFAULT_MULTIRES_OPTIONS = {
    multires: true,
    multiresThreshold: .025,
    tileSize: '',
    baseIndex: 1,
    progressive: false
    // levels: [] // {tiledImageWidth, tiledImageHeight, tileSize, asPreview, url}
};

const DEFAULT_CUBE_OPTIONS = {
    type: 'CUBE',
    url: '',
    cubeLabels: 'l|f|r|b|u|d',
    preAlign: ''
};

const DEFAULT_CUBESTRIP_OPTIONS = {
    type: 'CUBESTRIP',
    url: ''
};

const DEFAULT_SPHERE_OPTIONS = {
    type: 'SPHERE',
    hFov: '360',
    vFov: '',
    vOffset: 0,
    preAlign: '',
    url: '',
    mapping: '',
    mJpegStream: ''
};

const DEFAULT_CYLINDER_OPTIONS = {
    type: 'CYLINDER',
    hFov: 360,
    vFov: '',
    vOffset: 0,
    preAlign: '',
    url: '',
    mJpegStream: ''
};

const DEFAULT_FLAT_OPTIONS = {
    type: 'CYLINDER',
    hFov: 1.0,
    preAlign: '',
    url: '',
    mJpegStream: ''
};

const DEFAULT_FISHEYE_OPTIONS = {
    url: '',
    fov: 180.0,
    align: 'yaw|pitch|roll',
    crop: 'left|right|top|bottom',
    lenScp: 'a|b|c|d|e',
    mJpegStream: ''
};

const IMAGE_TYPE = {
    CUBE: 'CUBE',
    CUBESTRIP: 'CUBESTRIP',
    SPHERE: 'SPHERE',
    CYLINDER: 'CYLINDER',
    FISHEYE: 'FISHEYE',
    FLAT: 'FLAT'
};

const defs = {
    /* cube definition */
    cube: {
        setParams () {
            let options = this._options;
            let mergeItems = [this, DEFAULT_IMAGE_OPTIONS, DEFAULT_CUBE_OPTIONS];

            if (options.multires) {
                mergeItems.push(DEFAULT_MULTIRES_OPTIONS);
            }

            mergeItems.push(options);
            Object.assign.apply(Object, mergeItems);
        },

        createCube (url) {
            return createElement('cube', {url: url});
        },

        toString () {
            let image = this.createImage();

            if (this.multires && this.levels) {
                this.levels.forEach(levelAttrs => {
                    let level = this.createLevel(levelAttrs);
                    let cube = this.createCube(levelAttrs.url);
                    level.appendChild(cube);
                    image.appendChild(level);
                });
            } else {
                let cube = this.createCube(this.url);
                image.appendChild(cube);
            }

            return image.outerHTML;
        }
    },

    /* cubestrip definition */
    cubestrip: {
        setParams () {
            let options = this._options;
            Object.assign(this, DEFAULT_IMAGE_OPTIONS, DEFAULT_CUBESTRIP_OPTIONS, options);
        },

        createCubeStrip (url) {
            return createElement('cubestrip', {url: url});
        },

        toString () {
            let image = this.createImage();
            let cubeStrip = this.createCubeStrip(this.url);

            image.appendChild(cubeStrip);
            return image.outerHTML;
        }
    },

    /* sphere definition */
    sphere: {
        setParams () {
            let options = this._options;
            let mergeItems = [this, DEFAULT_IMAGE_OPTIONS, DEFAULT_SPHERE_OPTIONS];

            if (options.multires) {
                mergeItems.push(DEFAULT_MULTIRES_OPTIONS);
            }

            mergeItems.push(options);
            Object.assign.apply(Object, mergeItems);
        },

        createSphere (url) {
            return createElement('sphere', {url: url});
        },

        toString () {
            let image = this.createImage();

            if (this.multires && this.levels) {
                this.levels.forEach(levelAttrs => {
                    let level = this.createLevel(levelAttrs);
                    let sphere = this.createSphere(levelAttrs.url);
                    level.appendChild(sphere);
                    image.appendChild(level);
                });
            } else {
                let sphere = this.createSphere(this.url);
                image.appendChild(sphere);
            }

            return image.outerHTML;
        }
    },
    cylinder: {},
    fisheye: {},
    flat: {}
};


export class Image {

    constructor (options) {
        this._options = options;
        this._imageAttrs = [DEFAULT_IMAGE_OPTIONS];

        Object.assign(this, defs[options.type.toLowerCase()]);

        // set image attrs
        if (this.stereo) {
            this._imageAttrs.push(DEFAULT_STEREO_OPTIONS);
        }
        if (this.multires) {
            this._imageAttrs.push(DEFAULT_MULTIRES_OPTIONS);
        }

        this.setParams();
    }

    createImage () {
        let imageAttrs = {};
        let imageOptions = [DEFAULT_IMAGE_OPTIONS];

        if (this.stereo) {
            imageOptions.push(DEFAULT_STEREO_OPTIONS);
        }
        if (this.multires) {
            imageOptions.push(DEFAULT_MULTIRES_OPTIONS);
        }

        imageOptions = Object.assign.apply(Object, imageOptions);
        Object.keys(imageOptions).forEach(attr => {
            imageAttrs[attr] = this[attr];
        });

        return createElement('image', imageAttrs);
    }

    createLevel (options) {
        let levelAttrs = {};
        let level;

        ['tiledImageWidth', 'tiledImageHeight', 'tileSize', 'asPreview'].forEach(attr => {
            levelAttrs[attr] = options[attr];
        });

        level = createElement('level', levelAttrs);
        return level;
    }
}


// image.type
// cubstrip.url
export class CubeStrip {

}

// image.type
// image.hFov
// image.vFov
// image.vOffset
// image.preAlign
// sphere.url
// sphere.mapping
// sphere.mJpegStream

// mul
// same as Cube
export class Sphere {

}

// image.type
// image.hFov
// image.vFov
// image.vOffset
// image.preAlign
// cylinder.url
// cylinder.mJpegStream

// mul
// same as Cube
export class Cylinder { /* Flat */

}

// fishEye.url
// fishEye.fov
// fishEye.align
// fishEye.crop
// fishEye.lenScp
// fishEye.mJpegStream
export class FishEye {

}

// tiledImageWidth
// tiledImageHeight
// tileSize
// asPreview
export class Level {

}

export default function (krShell) {
    krShell.Image = Image;
}