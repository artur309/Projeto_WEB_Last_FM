"use strict";

$(document).ready(function () {

    var musicArray = ["Radiohead - Creep", "Epica - The Phantom Angony", "Calvin Harris - Promises", "Kendrick Lamar - ELEMENT.", "Red Hot Chili Peppers - Suck my Kiss", "Grandson - Blood in the water", "Bullet for my valentine - betrayed", "Kaytranada - GO Dj", "999999999 - LOVE 4 RAVE", "Epica - cry for the moon"]

    for (var i = 0; i < musicArray.length; i++) {

        var artist_track = musicArray[i];
        var artist_trackA = new Array();
        artist_trackA = artist_track.split(' - ');

        var artist = artist_trackA[0];
        var track = artist_trackA[1];

        $.ajax({

            type: 'POST',
            url: 'http://ws.audioscrobbler.com/2.0/',
            data:
                'method=track.getInfo&' +
                'api_key=97dd7464b0a13ef1d8ffa1562a6546eb&' +
                'artist=' + artist + '&' +
                'track=' + track + '&' +
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
            console.log(data);
            $('#musica').append('<a href="' + data.track.url + '">' + data.track.artist.name + ' - ' + data.track.name + '</a>');
            $('#musica').append("<br>");


        })

    }

});
