$(document).ready(function() {
    console.log("start main.js");
    var proxy = new Porthole.WindowProxy('/', 'mainframe');

    proxy.addEventListener(function (e) {
        console.log("call getPicture");
        navigator.camera.getPicture(
            function (imageData) {
                proxy.postMessage("data:image/jpeg;base64," + imageData);
            },
            function (message) {
            }
        );
    });
});
