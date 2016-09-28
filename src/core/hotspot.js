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

    // polygon
    fillcolor: 'fillColor',
    fillalpha: 'fillAlpha',
    borderwidth: 'borderWidth',
    bordercolor: 'borderColor',
    borderalpha: 'borderAlpha',
    polyline: 'polyline'
};

export class Hotspot {
    constructor (name, options) {
        this._h = krShell.addHotspot(name);
        Object.keys(options).forEach(key => {
           this._h[key.toLowerCase()] = options[key];
        });
        this._init();
    }

    _init () {
        this._addPointsProperty();
        this._proxyData();

        if (!this.url && this._h.points && this._h.points.length > 0) {
            this.points = this._h.points;
        }
    }

    _proxyData () {
        Object.keys(KEY_MAPPING).forEach(key => {
            Object.defineProperty(this, KEY_MAPPING[key], {
                configurable: true,
                enumerable: true,
                get: () => {
                    return this._h[key]
                },
                set: (val) => {
                    this._h[key] = val;
                }
            })
        });
    }

    _addPointsProperty () {
        let h = this._h;

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
            let index = this._h.point.count;
            let p = this._h.point.createItem('point[' + index + ']');
            p.ath = point.ath;
            p.atv = point.atv;
        }
    }

    on () {

    }

    off () {

    }
}

export default function (krShell) {
    var krpano = krShell.krpano;
    var resolve = krShell.resolve;

    krShell.Hotspot = Hotspot;

    extendHotspot();

    function extendHotspot () {
        let hotspot = krpano.addhotspot('__temp_hotspot');
        let prototype = hotspot.constructor.prototype;
        krpano.removehotspot('__temp_hotspot');

        prototype.__invokeEventHandlers = function (event, mouse) {
            (this.__eventHandlers[event] || []).forEach((handler) => {
                handler.bind(this)(mouse);
            });
        };

        prototype.on = function (event, handler) {
            let handlers = this.__eventHandlers;

            if (!handlers) {
                handlers = this.__eventHandlers = {};
            }

            if (handlers[event]) {
                handlers[event].push(handler);
            } else {
                handlers[event] = [handler];
            }

            this['on' + event] = 'jscall(krpano.get("hotspot[' + this.name + ']").__invokeEventHandlers("' + event + '", krShell.resolve("mouse")))';
        };

        prototype.off = function (event, handler) {
            if (this.__eventHandlers[event]) {
                this.__eventHandlers[event] = this.__eventHandlers[event].filter(function (h) {
                    return handler !== h;
                });
            }
        };

        prototype.addPoint = function (point) {
            if (!!point) {
                let index = this.point.count;
                let p = this.point.createItem('point[' + index + ']');
                p.ath = point.ath;
                p.atv = point.atv;
            }
        };

        prototype.setPoint = function (points) {
            this.point.count = 0;

            (points || []).forEach((point) => {
                this.addPoint(point);
            });
        };

        prototype.getPoint = function (index) {
            if (index === null || index === undefined) {
                return this.point.getArray();
            } else {
                return this.point.getItem(index);
            }
        };
    }

    krShell.addHotspot = function (name) {
        let hotspot = krpano.addhotspot(name);
        return hotspot;
    };

    krShell.removeHotspot = function (name) {
        krpano.removehotspot(name);
    };
}

