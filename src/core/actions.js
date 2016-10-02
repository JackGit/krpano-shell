import { extendEventAbility } from 'src/utils/event';
import { hasVal } from 'src/utils/lang';

export default function (pano) {
    let krpano = pano.krpano;

    pano.sphereToScreen = krpano.spheretoscreen;
    pano.screenToSphere = krpano.screentosphere;
    pano.screenToLayer = krpano.actions.screentolayer;
    pano.layerToScreen = krpano.actions.layertoscreen;
    pano.updateObject = krpano.actions.updateobject;
    pano.updateScreen = krpano.actions.uploadscreen;
    pano.invalidateScreen = krpano.actions.invalidatescreen;
    pano.lookAt = krpano.actions.lookat;
    pano.lookTo = krpano.actions.lookto;
    pano.lookToHotspot = krpano.actions.looktohotspot;
    pano.moveTo = krpano.actions.moveto;
    pano.zoomTo = krpano.actions.zoomto;
    pano.adjustHLookAt = krpano.actions.adjusthlookat;
    pano.getLookToDistance = krpano.actions.getlooktodistance;
    pano.stopLookTo = krpano.actions.stoplookto;
    pano.stopMovements = krpano.actions.stopmovements;
    pano.tween = krpano.actions.tween;
    pano.cursors = krpano.cursors;
    pano.area = krpano.area;

    (function proxyAutorotate () {
        pano.autorotate = Object.create(krpano.autorotate);
        ['isRotating', 'isPaused', 'interruptionEvents', 'toFov', 'waitTime'].forEach(key => {
            Object.defineProperty(pano.autorotate, key, {
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

    (function proxyDisplay () {
        pano.display = Object.create(krpano.display);
        [
            'stereo', 'stereoOverlap', 'hardwareLimit', 'useDesktopImage', 'mipMapping',
            'loadWhileMoving', 'frameBufferScale', 'currentFPS', 'frame'
        ].forEach(key => {
                Object.defineProperty(pano.display, key, {
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
        pano.control = Object.create(krpano.control);
        [
            'userControl', 'mouse', 'mouseFovChange', 'touch', 'touchZoom',
            'dragRelative', 'dragInertia', 'dragFriction',
            'moveToRelative', 'moveToAccelerate', 'moveToSpeed', 'moveToFriction', 'moveToYFriction',
            'keybAccelerate', 'keybSpeed', 'keybFriction', 'keybInvert', 'keybFovChange',
            'fovSpeed', 'fovFriction', 'zoomToCursor', 'zoomOutCursor',
            'keyCodesLeft', 'keyCodesRight', 'keyCodesUp', 'keyCodesDown', 'keyCodesIn', 'keyCodesOut',
            'keyDownRepeat', 'bouncingLimits'
        ].forEach(key => {
                Object.defineProperty(pano.control, key, {
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

    (function proxyKrpano () {
        ['bgColor', 'idleTime', 'logKey', 'showErrors', 'debugMode'].forEach(key => {
            Object.defineProperty(krpano, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return krpano[key.toLowerCase()];
                },
                set: (val) => {
                    krpano[key.toLowerCase()] = val;
                }
            });
        });
    })();

    (function proxyContextMenu () {
        pano.contextMenu = krpano.contextmenu;
        ['versionInfo', 'customStyle', 'enterFS', 'exitFS'].forEach(key => {
            Object.defineProperty(krpano.contextmenu, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return krpano.contextmenu[key.toLowerCase()];
                },
                set: (val) => {
                    krpano.contextmenu[key.toLowerCase()] = val;
                }
            });
        });

        // extend menu item with on/off event ability
        let tempItem = krpano.contextmenu.item.createItem('__temp_item__');
        extendEventAbility(pano.name, tempItem.constructor.prototype, function () {
            return 'contextmenu.item[' + this.name + ']';
        });
        krpano.contextmenu.item.removeItem('__temp_item__');

        Object.defineProperty(pano.contextMenu, 'items', {
            configurable: true,
            enumerable: true,
            get: () => {
                return krpano.contextmenu.item.getArray();
            },
            set: (val) => {
                if (!Array.isArray(val)) {
                    return;
                }

                let menuItem;

                krpano.contextmenu.item.count = 0;
                val.forEach((item, index) => {
                    menuItem = krpano.contextmenu.item.createItem(item.name || 'n' + index);

                    Object.defineProperty(menuItem, 'onclick', {
                        configurable: true,
                        enumerable: true,
                        get: () => {
                            return item.onclick;
                        },
                        set: (val) => {
                            menuItem.off('click');
                            menuItem.on('click', val);
                        }
                    });

                    menuItem.caption = item.caption || '';
                    menuItem.enabled = hasVal(item.enabled) ? item.enabled : true;
                    menuItem.visible = hasVal(item.visible) ? item.visible : true;
                    menuItem.separator = hasVal(item.separator) ? item.separator : false;
                });
            }
        });
    })();
}