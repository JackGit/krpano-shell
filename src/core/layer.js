import { extendEventAbility } from 'src/utils/event';
import { proxy } from 'src/utils/lang';

const KEY_MAPPING = {
    name: 'name',
    url: 'url',
    type: 'type',
    keep: 'keep',
    parent: 'parent',
    visible: 'visible',
    enabled: 'enabled',
    handcursor: 'handCursor',
    maskchildren: 'maskChildren',
    zorder: 'zOrder',
    // style: 'style',
    align: 'align',
    edge: 'edge',
    x: 'x',
    y: 'y',
    rotate: 'rotate',
    width: 'width',
    height: 'height',
    scale: 'scale',
    alpha: 'alpha',
    crop: 'crop',
    bgcolor: 'bgColor',
    bgborder: 'bgBorder',
    bgroundedge: 'bgRoundEdge',
    bgshadow: 'bgShadow',
    bgcapture: 'bgCapture'
};

let prototypeExtended = false;

export default class Layer {

    constructor (name, options) {
        this._layer = null;
        this.pano = null;
        this.options = options;
        this.name = name;
    }

    _init () {
        if (!prototypeExtended) {
            extendEventAbility(this.pano.name, this._layer.constructor.prototype, function () {
                return 'layer[' + this.name + ']';
            });
            prototypeExtended = true;
        }

        this._proxyData();
    }

    _proxyData () {
        proxy(this, this._layer, KEY_MAPPING);
    }

    attach (pano) {
        let options = this.options;
        this.pano = pano;
        this._layer = pano.krpano.addlayer(this.name);

        Object.keys(options || {}).forEach(key => {
            this._layer[key.toLowerCase()] = options[key];
        });

        this._init();
    }

    remove () {
        this.pano.krpano.removelayer(this.name);
        this.pano = null;
    }

    on () {
        this._layer.on.apply(this._layer, arguments);
    }

    off () {
        this._layer.off.apply(this._layer, arguments);
    }
}