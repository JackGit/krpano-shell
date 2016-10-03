import Preview from './internal/preview';
import View from './internal/view';
import { IMAGE_TYPE } from 'src/constants';
import {
    CubeImage,
    CubeStripImage,
    SphereImage,
    CylinderImage,
    FishEyeImage
} from './internal/image';

function createImage (options) {
    let image = null;
    switch (options.type) {
        case IMAGE_TYPE.CUBE:
            image = new CubeImage(options);
            break;
        case IMAGE_TYPE.CUBESTRIP:
            image = new CubeStripImage(options);
            break;
        case IMAGE_TYPE.SPHERE:
            image = new SphereImage(options);
            break;
        case IMAGE_TYPE.CYLINDER:
            image = new CylinderImage(options);
            break;
        case IMAGE_TYPE.FISHEYE:
            image = new FishEyeImage(options);
            break;
    }
    return image;
}

export default class Scene {

    constructor (name, options) {
        this.name = name;
        this.pano = null;

        this.view = new View(this, options.view);
        this.preview = new Preview(this, options.preview);
        this.image = createImage(options.image || {});
    }

    _setContent () {
        this.sceneElement.content = '';

        ['preview', 'view', 'image'].forEach(attr => {
            if (this[attr]) {
                this.sceneElement.content += this[attr].toString();
            }
        });
    }

    attach (pano) {
        this.pano = pano;
        this.sceneElement = this.pano.krpano.scene.createItem(this.name);
    }

    isActive () {
        return this.pano.currentScene === this;
    }

    load () {
        let params = Array.prototype.slice.call(arguments);
        params.unshift(this.name);
        this._setContent();
        this.pano.krpano.actions.loadscene.apply(null, params);
    }

    remove () {
        this.pano = null;
        this.preview = null;
        this.view = null;
        this.image = null;
        this.sceneElement = null;
    }
}