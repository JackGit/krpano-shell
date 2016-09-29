import Preview from './preview';
import View from './view';

const DEFAULT_SCENE_OPTIONS = {
    preview: new Preview({type: Preview.TYPE.grid()}),
    view: new View(),
    image: null
};

export default class Scene {

    constructor (name, options) {
        this.name = name;

        Object.assign(this, DEFAULT_SCENE_OPTIONS, options);

        this.sceneElement = krShell.createScene(name);
    }

    _setContent () {
        this.sceneElement.content = '';
        ['preview', 'view', 'image'].forEach(attr => {
            if (this[attr]) {
                this.sceneElement.content += this[attr].toString();
            }
        });
    }

    load () {
        this._setContent();
        krShell.loadScene(this.name);
    }
}