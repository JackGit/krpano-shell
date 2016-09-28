export function extendEventAbility (prototype, getPath) {

    prototype.__invokeEventHandlers = function (event, mouse) {
        (this.__eventHandlers[event] || []).forEach(handler => {
            handler.bind(this)(mouse);
        });
    };

    prototype.on = function (event, handler) {
        let handlers = this.__eventHandlers;
        let path = getPath.call(this); // "hotspot[test]"

        if (!handlers) {
            handlers = this.__eventHandlers = {};
        }

        if (handlers[event]) {
            handlers[event].push(handler);
        } else {
            handlers[event] = [handler];
        }

        this['on' + event] = 'jscall(krpano.get("' + path + '").__invokeEventHandlers("' + event + '", krShell.resolve("mouse")))';
    };

    prototype.off = function (event, handler) {
        if (this.__eventHandlers[event]) {
            this.__eventHandlers[event] = this.__eventHandlers[event].filter(function (h) {
                return handler !== h;
            });
        }
    };
}