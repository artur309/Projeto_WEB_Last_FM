
$(document).ready(function () {

    $.ajax({

        type: 'POST',
        url: 'http://ws.audioscrobbler.com/2.0/',
        data: 'method=artist.getinfo&' +
            'artist=Russian+Circles&' +
            'api_key=97dd7464b0a13ef1d8ffa1562a6546eb&' +
            'format=json',
        dataType: 'jsonp',

        success: function (data) {
            //console.log(data);
        },
        error: function (code, message) {
            // Handle error here
        }
    }).done(function (data) {
        console.log('Texto do JSON');
        console.log(msg);

    })
});
