import Preview from './preview';
import View from './view';

export default class Scene {

    constructor (name, options) {
        this.name = name;
        this.pano = null;
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

        Object.assign(this, {
            preview: new Preview({type: Preview.TYPE.grid()}),
            view: new View(),
            image: null
        }, options);
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