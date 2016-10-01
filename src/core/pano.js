import actions from 'src/core/actions';
import events from 'src/core/events';

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
        this.view = null;

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
                this.currentScene.load.apply(this.currentScene, params);
                break;
            }
        }
    }

    addScene (scene) {
        scene.attach(this);
        this.scenes.push(scene);
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
        hotspot.attach(this);
        this.hotspots.push(hotspot);
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
        layer.attach(this);
        this.layers.push(layer);
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