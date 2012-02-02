$(document).ready(function() {
    console.log("start app.js");

    var proxy = new Porthole.WindowProxy('/'),
        pusher = new Pusher('0000000000000'),
        channel = pusher.subscribe('photo_share_channel'),
        photo_list_template,
        opts = {},
        send_command = function (cmd) {
            if (opts['v'] === '0.01') {
                proxy.postMessage({cmd : cmd, v:opts['v']});
            } else {
                proxy.postMessage("get_photo");
            }
        };

    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };
    photo_list_template = _.template($("#photo-list-template").text());

    if (window.location.hash !== "") {
        var s = window.location.hash.substr(1);

        _.each(s.split('&'), function(opt) {
            var a = opt.split('=');
            opts[a[0]] = a[1];
        });
    }

    $("#get_photo_btn").click(function () {
        console.log("push get_photo_btn");
        send_command("get_photo");
    });

    proxy.addEventListener(function (e) {
        $("#send_photo_image").attr("src", e.data);
        $("#photo_send_panel,#photo_get_panel").toggle();
    });

    $("#send_photo_btn").click(function () {
        var image_data = $("#send_photo_image").attr("src"),
            message = $("#send_photo_message").val();

        $.post("/upload_data", {image_data: image_data, message: message});

        $("#photo_send_panel,#photo_get_panel").toggle();
        $("#send_photo_message").val("");
    });

    $("#cancel_photo_btn").click(function () {
        $("#photo_send_panel,#photo_get_panel").toggle();
    });

    channel.bind('new', function(json) {
        $(photo_list_template({json:json})).prependTo($("#list"));
    });
});
