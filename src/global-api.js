export default function (krShell) {
    var krpano = krShell.krpano;

    krShell.asyncLoop = function (conditionFn, loopFn, doneFn) {
        function loop () {
            if (conditionFn()) {
                loopFn && loopFn();
                requestAnimationFrame(loop);
            } else {
                doneFn && doneFn();
            }
        }

        loop();
    };

    krShell.sphereToScreen = krpano.spheretoscreen;

    krShell.screenToSphere = krpano.screentosphere;

    krShell.screenToLayer = krpano.actions.screentolayer;

    krShell.layerToScreen = krpano.actions.layertoscreen;

    krShell.updateObject = krpano.actions.updateobject;

    krShell.updateScreen = krpano.actions.uploadscreen;

    krShell.invalidateScreen = krpano.actions.invalidatescreen;

    krShell.loadPano = krpano.actions.loadpano;

    krShell.loadPanoScene = krpano.actions.loadpanoscene;

    krShell.loadXml = krpano.actions.loadxml;

    krShell.loadScene = krpano.actions.loadscene;

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

    krShell.createHotspot = function (name) {
        return krpano.hotspot.createItem(name);
    };

    krShell.getHotspot = function (indexOrName) {
        if (indexOrName) {
            return krpano.hotspot.getItem(indexOrName);
        } else {
            return krpano.hotspot.getArray();
        }
    };

    krShell.removeHotspot = krpano.removehotspot;

    krShell.removeLayer = krpano.removelayer;

    krShell.lookAt = krpano.actions.lookat;

    krShell.lookTo = krpano.actions.lookto;

    krShell.lookToHotspot = krpano.actions.looktohotspot;

    krShell.moveTo = krpano.actions.moveto;

    krShell.zoomTo = krpano.actions.zoomto;

    krShell.adjustHLookAt = krpano.actions.adjusthlookat;

    krShell.getLookToDistance = krpano.actions.getlooktodistance;

    krShell.stopLookTo = krpano.actions.stoplookto;

    krShell.stopMovements = krpano.actions.stopmovements;

    krShell.tween = krpano.actions.tween;

    (function proxyAutorotate () {
        krShell.autorotate = Object.create(krpano.autorotate);
        ['isRotating', 'isPaused', 'interruptionEvents', 'toFov', 'waitTime'].forEach(key => {
            Object.defineProperty(krShell.autorotate, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return krpano.autorotate[key.toLowerCase()];
                },
                set: (val) => {
                    krpano.autorotate[key.toLowerCase()] = val;
                }
            });
        });
    })();

    krShell.cursors = krpano.cursors;

    krShell.area = krpano.area;

    (function proxyDisplay () {
        krShell.display = Object.create(krpano.display);
        [
            'stereo', 'stereoOverlap', 'hardwareLimit', 'useDesktopImage', 'mipMapping',
            'loadWhileMoving', 'frameBufferScale', 'currentFPS', 'frame'
        ].forEach(key => {
            Object.defineProperty(krShell.display, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return krpano.display[key.toLowerCase()];
                },
                set: (val) => {
                    krpano.display[key.toLowerCase()] = val;
                }
            });
        });
    })();

    (function proxyControl () {
        krShell.control = Object.create(krpano.control);
        [
            'userControl', 'mouse', 'mouseFovChange', 'touch', 'touchZoom',
            'dragRelative', 'dragInertia', 'dragFriction',
            'moveToRelative', 'moveToAccelerate', 'moveToSpeed', 'moveToFriction', 'moveToYFriction',
            'keybAccelerate', 'keybSpeed', 'keybFriction', 'keybInvert', 'keybFovChange',
            'fovSpeed', 'fovFriction', 'zoomToCursor', 'zoomOutCursor',
            'keyCodesLeft', 'keyCodesRight', 'keyCodesUp', 'keyCodesDown', 'keyCodesIn', 'keyCodesOut',
            'keyDownRepeat', 'bouncingLimits'
        ].forEach(key => {
            Object.defineProperty(krShell.control, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return krpano.control[key.toLowerCase()];
                },
                set: (val) => {
                    krpano.control[key.toLowerCase()] = val;
                }
            });
        });
    })();

}