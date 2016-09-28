import 'src/polyfill/object-assign';
import actions from 'src/actions/actions.js';
import scene from 'src/core/scene.js';
import preview from 'src/core/preview.js';
import view from 'src/core/view';
import image from 'src/core/image';
import hotspot from 'src/core/hotspot.js';

global.krShell = {

    krpano: null,
    resolve: null,

    init: function (krpanoInterfaceObj, resolve) {

        this.krpano = krpanoInterfaceObj;
        this.resolve = resolve;

        actions(krShell);
        scene(krShell);
        view(krShell);
        preview(krShell);
        image(krShell);
        hotspot(krShell);
    },

    destroy: function () {
        console.log('krShell.destroy()');
    }
};

export default krShell;