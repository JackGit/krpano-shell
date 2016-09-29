import 'src/polyfill/object-assign';
import globalAPI from 'src/global-api';
import Scene from 'src/core/scene';
import Preview from 'src/core/preview';
import View from 'src/core/view';
import { CubeImage, CubeStripImage, SphereImage, CylinderImage, FishEyeImage } from 'src/core/image';
import Layer from 'src/core/layer';
import Hotspot from 'src/core/hotspot';


global.krShell = {

    krpano: null,
    resolve: null,

    init: function (krpanoInterfaceObj, resolve) {

        this.krpano = krpanoInterfaceObj;
        this.resolve = resolve;

        globalAPI(krShell);

        krShell.Scene = Scene;
        krShell.Preview = Preview;
        krShell.View = View;
        krShell.CubeImage = CubeImage;
        krShell.CubeStripImage = CubeStripImage;
        krShell.SphereImage = SphereImage;
        krShell.CylinderImage = CylinderImage;
        krShell.FishEyeImage = FishEyeImage;
        krShell.Layer = Layer;
        krShell.Hotspot = Hotspot;
    },

    destroy: function () {
        console.log('krShell.destroy()');
    }
};

export default krShell;