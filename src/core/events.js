import { extendEventAbility } from 'src/utils/event';

export default function (pano) {
    let krpano = pano.krpano;

    extendEventAbility(pano.name, krpano.events.constructor.prototype, function () {
        return 'events';
    });

    pano.on = krpano.events.on.bind(krpano.events);
    pano.off = krpano.events.off.bind(krpano.events);
}