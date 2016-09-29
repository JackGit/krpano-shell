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
        this._layer = krShell.krpano.addlayer(name);

        Object.keys(options || {}).forEach(key => {
            this._layer[key.toLowerCase()] = options[key];
        });

        this._init();
    }

    _init () {
        if (!prototypeExtended) {
            extendEventAbility(this._layer.constructor.prototype, function () {
                return 'layer[' + this.name + ']';
            });
            prototypeExtended = true;
        }

        this._proxyData();
    }

    _proxyData () {
        proxy(this, this._layer, KEY_MAPPING);
    }

    remove () {
        krShell.krpano.removelayer(this.name);
    }

    on () {
        this._layer.on.apply(this._layer, arguments);
    }

    off () {
        this._layer.off.apply(this._layer, arguments);
    }
}