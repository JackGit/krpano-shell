export default function (krShell) {
    var krpano = krShell.krpano;
    var resolve = krShell.resolve;

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
            this.__eventHandlers = this.__eventHandlers.filter(function (h) {
                return handler !== h;
            });
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

    krShell.addHotspot = function (name, options) {
        let hotspot = krpano.addhotspot(name);

        return hotspot;
    };

    krShell.removeHotspot = function (name) {
        krpano.removehotspot(name);
    };
}

