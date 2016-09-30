import 'src/polyfill/object-assign';
import globalAPI from 'src/global-api';
import Pano from 'src/core/pano';
import Scene from 'src/core/scene';
import Preview from 'src/core/preview';
import View from 'src/core/view';
import { CubeImage, CubeStripImage, SphereImage, CylinderImage, FishEyeImage } from 'src/core/image';
import Layer from 'src/core/layer';
import Hotspot from 'src/core/hotspot';

let panos = {};
let panoReadyHandlers = {};

global.krShell = {

    Pano: Pano,
    Scene: Scene,
    Preview: Preview,
    View: View,
    CubeImage: CubeImage,
    CubeStripImage: CubeStripImage,
    SphereImage: SphereImage,
    CylinderImage: CylinderImage,
    FishEyeImage: FishEyeImage,
    Layer: Layer,
    Hotspot: Hotspot,

    init: function (options) {
        let pano = new Pano(options);
        let panoName = pano.name;

        panos[panoName] = pano;
        panoReadyHandlers[panoName] && panoReadyHandlers[panoName]();
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