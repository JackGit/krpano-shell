import actions from 'src/core/actions';
import events from 'src/core/events';
import Scene from './Scene';
import Hotspot from './hotspot';
import Layer from './Layer';

let pid = 0;

export default class Pano {

    constructor (options) {
        this._pid = pid ++;
        this.name = options.name;
        this.krpano = options.krpano;
        this.resolve = options.resolve;

        this.scenes = [];
        this.hotspots = [];
        this.layers = [];
        this.contextMenu = null;
        this.currentScene = null;

        this._init();
    }

    _init () {
        actions(this);
        events(this);
    }

    loadScene () {
        let sceneName = arguments[0];
        let params = Array.prototype.slice.call(arguments, 1);

        for (let i = 0; i < this.scenes.length; i ++) {
            if (this.scenes[i].name === sceneName) {
                this.currentScene = this.scenes[i];
                this.currentScene.attach(this);
                this.currentScene.load.apply(this.currentScene, params);
                break;
            }
        }
    }

    addScene (scene) {
        if (scene instanceof Scene) {
            scene.attach(this);
            this.scenes.push(scene);
        } else {
            console.warn('Pano.addScene() can only add instance of Scene class');
        }
    }

    removeScene (name) {
        this.scenes = this.scenes.filter(scene => {
            if (scene.name === name) {
                scene.remove();
            }
            return scene.name !== name;
        });
    }

    addHotspot (hotspot) {
        if (hotspot instanceof Hotspot) {
            hotspot.attach(this);
            this.hotspots.push(hotspot);
        } else {
            console.warn('Pano.addHotspot() can only add instance of Hotspot class');
        }
    }

    removeHotspot (name) {
        this.hotspots = this.hotspots.filter(hotspot => {
            if (hotspot.name === name) {
                hotspot.remove();
            }
            return hotspot.name !== name;
        });
    }

    addLayer (layer) {
        if (layer instanceof Layer) {
            layer.attach(this);
            this.layers.push(layer);
        } else {
            console.warn('Pano.addLayer() can only add instance of Layer class');
        }
    }

    removeLayer (name) {
        this.layers = this.layers.filter(layer => {
            if (layer.name === name) {
                layer.remove();
            }
            return layer.name !== name;
        });
    }

    destroy () {
        this.scenes = [];
        this.hotspots = [];
        this.layers = [];
        this.contextMenu = null;
        this.currentScene = null;
    }
}