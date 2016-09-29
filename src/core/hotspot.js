import { extendEventAbility } from 'src/utils/event';
import { proxy } from 'src/utils/lang';

const KEY_MAPPING = {
    name: 'name',
    type: 'type',
    url: 'url',
    keep: 'keep',
    renderer: 'renderer',
    visible: 'visible',
    enabled: 'enabled',
    handcursor: 'handCursor',
    maskchildren: 'maskChildren',
    zorder: 'zOrder',
    zorder2: 'zOrder2',
    capture: 'capture',
    children: 'children',
    // blendmode: 'blendMode', // flash only
    style: 'style',
    ath: 'ath',
    atv: 'atv',
    edge: 'edge',
    ox: 'ox',
    oy: 'oy',
    zoom: 'zoom',
    distorted: 'distorted',
    rx: 'rx',
    ry: 'ry',
    rz: 'rz',
    // details: 'details',
    inverserotation: 'inverseRotation',
    flying: 'flying',
    width: 'width',
    height: 'height',
    scale: 'scale',
    rotate: 'rotate',
    // pixelhittest: 'pixelHitTest', // flash only
    smoothing: 'smoothing',
    accuracy: 'accuracy',
    alpha: 'alpha',
    autoalpha: 'autoAlpha',
    // usecontentsize: 'useContentSize', // flash only
    scale9grid: 'scale9grid',
    stereo: 'stereo',
    crop: 'crop',
    scalechildren: 'scaleChildren',
    // mask: 'mask', // flash only
    // effect: 'effect', // flash only

    // polygon fields
    fillcolor: 'fillColor',
    fillalpha: 'fillAlpha',
    borderwidth: 'borderWidth',
    bordercolor: 'borderColor',
    borderalpha: 'borderAlpha',
    polyline: 'polyline',

    // status fields
    loading: 'loading',
    loaded: 'loaded',
    loadedurl: 'loadedUrl',
    hovering: 'hovering',
    pressed: 'pressed',
    loader: 'loader',
    sprite: 'sprite'
};

let prototypeExtended = false;

export default class Hotspot {

    constructor (name, options) {
        this._hotspot = krShell.krpano.addhotspot(name);

        Object.keys(options || {}).forEach(key => {
           this._hotspot[key.toLowerCase()] = options[key];
        });

        this._init();
    }

    _init () {
        if (!prototypeExtended) {
            extendEventAbility(this._hotspot.constructor.prototype, function () {
                return 'hotspot[' + this.name + ']';
            });
            prototypeExtended = true;
        }

        this._addPointsProperty();
        this._proxyData();

        if (!this.url && this._hotspot.points && this._hotspot.points.length > 0) {
            this.points = this._hotspot.points;
        }
    }

    _proxyData () {
        proxy(this, this._hotspot, KEY_MAPPING);
    }

    _addPointsProperty () {
        let h = this._hotspot;

        Object.defineProperty(this, 'points', {
            enumerable: true,
            configurable: true,
            get: () => {
                return h.point.getArray();
            },
            set: (newVal) => {
                if (Array.isArray(newVal)) {
                    h.point.count = 0;

                    newVal.forEach((point) => {
                        this.addPoint(point);
                    });
                }
            }
        });
    }

    addPoint (point) {
        if (!!point) {
            let index = this._hotspot.point.count;
            let p = this._hotspot.point.createItem('point[' + index + ']');
            p.ath = point.ath;
            p.atv = point.atv;
        }
    }

    remove () {
        krShell.krpano.removehotspot(this.name);
    }

    on () {
        this._hotspot.on.apply(this._hotspot, arguments);
    }

    off () {
        this._hotspot.off.apply(this._hotspot, arguments);
    }

    lookTo () {
        krShell.lookToHotspot(this.name);
    }
}

