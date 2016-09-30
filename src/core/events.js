import { extendEventAbility } from 'src/utils/event';

export default function (pano) {
    let krpano = pano.krpano;

    extendEventAbility(krpano.events.constructor.prototype, function () {
        return 'events';
    });

    krpano.on = krpano.events.on.bind(krpano.events);
    krpano.off = krpano.events.off.bind(krpano.events);
}