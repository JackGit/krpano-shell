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
}