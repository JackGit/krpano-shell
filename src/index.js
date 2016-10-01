import 'src/polyfill/object-assign';
import globalAPI from 'src/global-api';
import Pano from 'src/core/pano';
import Scene from 'src/core/scene';
import Layer from 'src/core/layer';
import Hotspot from 'src/core/hotspot';
import {
    PREVIEW_TYPE,
    LIMIT_VIEW_TYPE,
    FOV_TYPE,
    IMAGE_TYPE
} from 'src/constants'

let panos = {};
let panoReadyHandlers = {};

global.krShell = {

    Pano: Pano,
    Scene: Scene,
    Layer: Layer,
    Hotspot: Hotspot,

    PREVIEW_TYPE: PREVIEW_TYPE,
    LIMIT_VIEW_TYPE: LIMIT_VIEW_TYPE,
    FOV_TYPE: FOV_TYPE,
    IMAGE_TYPE: IMAGE_TYPE,

    init: function (options) {
        let pano = new Pano(options);
        let panoName = pano.name;

        panos[panoName] = pano;
        panoReadyHandlers[panoName] && panoReadyHandlers[panoName](pano);
    },

    pano: function (name) {
        return panos[name];
    },

    ready: function (panoName, callback) {
        panoReadyHandlers[panoName] = callback;
    }
};

globalAPI(krShell);

export default krShell;