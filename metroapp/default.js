$(document).ready(function () {
    var proxy = new Porthole.WindowProxy('/', 'main');

    proxy.addEventListener(function (messageEvent) {
        var dialog = new Windows.Media.Capture.CameraCaptureUI();
        dialog.photoSettings.croppedAspectRatio = { width: 16, height: 9 };
        dialog.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (file) {
            var img;

            if (file) {
                img = new Image();

                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext("2d").drawImage(img, 0, 0);

                    proxy.postMessage(canvas.toDataURL(file.contentType));
                };

                img.src = URL.createObjectURL(file);
            }
        });
    });
});
