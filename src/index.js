import hotspot from './core/hotspot.js';
import actions from './actions/actions.js';
import scene from './core/scene.js';

window.krShell.init = function () {
    actions(krShell);
    scene(krShell);
    hotspot(krShell);
    console.log('init')
};