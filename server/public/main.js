$(document).ready(function() {
    var target = $("#target"),
        proxy = new Porthole.WindowProxy('/', 'mainframe');

    target.bind("drop", function (e) {
        var fr = new FileReader();

        fr.onload = function() {
            proxy.postMessage(this.result);
            target.hide();
        };
        fr.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
    })
    .bind("dragenter dragover", function (e) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    });

    proxy.addEventListener(function (messageEvent) {
        switch (messageEvent.data.cmd) {
           case 'get_photo':
              target.show();            
              break;
        }
    });
});
