import Preview from './preview';
import View from './view';

export default class Scene {

    constructor (name, options) {
        this.name = name;
        this.pano = null;
        this.options = options;

        this.preview = null;
        this.view = null;
        this.image = null;
    }

    _setContent () {
        this.preview = new Preview(this.options.preview);
        this.view = new View(this.options.view);
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

    load () {
        let params = Array.prototype.slice.call(arguments);
        params.unshift(this.name);
        this._setContent();
        krShell.loadScene.apply(null, params);
    }

    remove () {
        this.pano = null;
        this.preview = null;
        this.view = null;
        this.image = null;
        this.sceneElement = null;
    }
}