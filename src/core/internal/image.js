import { createElement } from 'src/utils/xml';
import { hasVal } from 'src/utils/lang';
import { IMAGE_TYPE } from 'src/constants';

// default values
const DEFAULT_IMAGE_OPTIONS = {
    type: '',
    preAlign: ''
};
const DEFAULT_STEREO_OPTIONS = {
    stereo: false,
    stereoLabels: '1|2',
    stereoFormat: 'TB'
};
const DEFAULT_MULTIRES_OPTIONS = {
    multires: false,
    multiresThreshold: .025,
    tileSize: '',
    baseIndex: 1,
    progressive: false
};
const DEFAULT_CUBE_OPTIONS = {
    type: IMAGE_TYPE.CUBE,
    url: '',
    cubeLabels: 'l|f|r|b|u|d'
};
const DEFAULT_CUBESTRIP_OPTIONS = {
    type: IMAGE_TYPE.CUBESTRIP,
    url: ''
};
const DEFAULT_SPHERE_OPTIONS = {
    type: IMAGE_TYPE.SPHERE,
    hFov: 360,
    vFov: '',
    vOffset: 0,
    url: '',
    mapping: '',
    mJpegStream: ''
};
const DEFAULT_CYLINDER_OPTIONS = {
    type: IMAGE_TYPE.CYLINDER,
    hFov: 360,
    vFov: '',
    vOffset: 0,
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

// available attributes
const AVAILABLE_IMAGE_ATTRS = [
    'type', 'preAlign',
    'multires', 'multiresThreshold', 'progressive', 'tileSize', 'baseIndex',
    'hFov', 'vFov', 'vOffset',
    'stereo', 'stereoLabels', 'stereoFormat',
    'cubeLabels'
];
const AVAILABLE_LEVEL_ATTRS = ['tiledImageWidth', 'tiledImageHeight', 'tileSize', 'asPreview'];
const AVAILABLE_CUBE_ATTRS = ['url'];
const AVAILABLE_CUESTRIP_ATTRS = ['url'];
const AVAILABLE_SPHERE_ATTRS = ['url', 'mJpegStream', 'mapping'];
const AVAILABLE_CYLINDER_ATTRS = ['url', 'mJpegStream'];
const AVAILABLE_FISHEYE_ATTRS = ['url', 'mJpegStream', 'fov', 'align', 'crop', 'lenScp'];

// different image classes
export class CubeImage {
    constructor (options) {
        Object.assign(
            this,
            DEFAULT_IMAGE_OPTIONS,
            options.multires ? DEFAULT_MULTIRES_OPTIONS : {},
            options.stereo ? DEFAULT_STEREO_OPTIONS : {},
            DEFAULT_CUBE_OPTIONS,
            options
        );
    }

    toString () {
        let image = createElement('image', this, AVAILABLE_IMAGE_ATTRS);

        if (this.multires && this.levels) {
            this.levels.forEach(levelOptions => {
                let level = createElement('level', levelOptions, AVAILABLE_LEVEL_ATTRS);
                let cube = createElement('cube', levelOptions, AVAILABLE_CUBE_ATTRS);
                level.appendChild(cube);
                image.appendChild(level);
            });
        } else {
            let cube = createElement('cube', this, AVAILABLE_CUBE_ATTRS);
            image.appendChild(cube);
        }

        return image.outerHTML;
    }
}

export class CubeStripImage {
    constructor (options) {
        Object.assign(
            this,
            DEFAULT_IMAGE_OPTIONS,
            // options.multires ? DEFAULT_MULTIRES_OPTIONS : {},
            options.stereo ? DEFAULT_STEREO_OPTIONS : {},
            DEFAULT_CUBESTRIP_OPTIONS,
            options
        );
    }

    toString () {
        let image = createElement('image', this, AVAILABLE_IMAGE_ATTRS);
        let cubestrip = createElement('cubestrip', this, AVAILABLE_CUESTRIP_ATTRS);
        image.appendChild(cubestrip);
        return image.outerHTML;
    }
}

export class SphereImage {
    constructor (options) {
        Object.assign(
            this,
            DEFAULT_IMAGE_OPTIONS,
            options.multires ? DEFAULT_MULTIRES_OPTIONS : {},
            options.stereo ? DEFAULT_STEREO_OPTIONS : {},
            DEFAULT_SPHERE_OPTIONS,
            options
        );
    }

    toString () {
        let image = createElement('image', this, AVAILABLE_IMAGE_ATTRS);

        if (this.multires && this.levels) {
            this.levels.forEach(levelOptions => {
                let level = createElement('level', levelOptions, AVAILABLE_LEVEL_ATTRS);
                let sphere = createElement('sphere', levelOptions, AVAILABLE_SPHERE_ATTRS);
                level.appendChild(sphere);
                image.appendChild(level);
            });
        } else {
            let sphere = createElement('sphere', this, AVAILABLE_SPHERE_ATTRS);
            image.appendChild(sphere);
        }

        return image.outerHTML;
    }
}

export class CylinderImage {
    constructor (options) {
        Object.assign(
            this,
            DEFAULT_IMAGE_OPTIONS,
            options.multires ? DEFAULT_MULTIRES_OPTIONS : {},
            options.stereo ? DEFAULT_STEREO_OPTIONS : {},
            DEFAULT_CYLINDER_OPTIONS,
            options
        );
    }

    toString () {
        let image = createElement('image', this, AVAILABLE_IMAGE_ATTRS);

        if (this.multires && this.levels) {
            this.levels.forEach(levelOptions => {
                let level = createElement('level', levelOptions, AVAILABLE_LEVEL_ATTRS);
                let cylinder = createElement('cylinder', levelOptions, AVAILABLE_CYLINDER_ATTRS);
                level.appendChild(cylinder);
                image.appendChild(level);
            });
        } else {
            let cylinder = createElement('cylinder', this, AVAILABLE_CYLINDER_ATTRS);
            image.appendChild(cylinder);
        }

        return image.outerHTML;
    }
}

export class FishEyeImage {
    constructor (options) {
        Object.assign(
            this,
            DEFAULT_IMAGE_OPTIONS,
            // options.multires ? DEFAULT_MULTIRES_OPTIONS : {},
            options.stereo ? DEFAULT_STEREO_OPTIONS : {},
            DEFAULT_FISHEYE_OPTIONS,
            options
        );
    }

    toString () {
        let image = createElement('image', this, AVAILABLE_IMAGE_ATTRS);
        let fisheye = createElement('fisheye', this, AVAILABLE_FISHEYE_ATTRS);
        image.appendChild(fisheye);
        return image.outerHTML;
    }
}

export class VideoImage {
    constructor () {

    }

    toString () {

    }
}