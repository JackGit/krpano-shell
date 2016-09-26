import { createElement } from 'src/utils/xml';
import { Preview } from './preview';
import { View } from './view';
import { Image } from './image';

const DEFAULT_SCENE_OPTIONS = {
    preview: new Preview({type: Preview.TYPE.grid()}),
    view: new View(),
    image: null
};

class Scene {

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

export default function (krShell) {

    var krpano = krShell.krpano;

    krShell.Scene = Scene;

    krShell.loadScene = function () {
        krpano.actions.loadscene.apply(krpano, arguments);
    };

    krShell.createScene = function (name) {
        return krpano.scene.createItem(name);
    };

    krShell.getScene = function (indexOrName) {
        if (indexOrName) {
            return krpano.scene.getItem(indexOrName);
        } else {
            return krpano.scene.getArray();
        }
    };
}