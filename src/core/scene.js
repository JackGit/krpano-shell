/**
 * scene = {
 *  name: 'scene1',
 *  preview: {
 *      type: '',
 *      url: '',
 *      stripOrder: '',
 *      details: ''
 *  },
 *  view: {
 *      lookAtH: '',
 *      lookAtV: '',
 *      fov: '',
 *      fovMin: '',
 *      fovMax: '',
 *      maxPixelZoom: ''
 *  },
 *  image: {}
 * };
 * @param krShell
 */

const PREVIEW_TYPE = {
    'SPHERE': 'SPHERE',
    'CYLINDER': 'CYLINDER',
    'CUBESTRIP': 'CUBESTRIP'
};

export default function (krShell) {

    var krpano = krShell.krpano;

    krShell.loadScene = function () {
        krpano.actions.loadscene.apply(krpano, arguments);
    };

    krShell.createScene = function (name) {
        return krpano.scene.createItem(name);
    };
}