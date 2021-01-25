"use strict";

$(document).ready(function () {
    if (document.title == 'Last-FM PT: Homepage')
        topDefault();
    if (document.title == 'Last-FM PT: Top Musicas PORTUGAL')
        topPortugal();
});

function topDefault() {
    var musicArray =
        [
            "Radiohead - The Tourist",
            "Kendrick Lamar - ELEMENT.",
            "Red Hot Chili Peppers - Suck my Kiss",
            "Radiohead - Nude",
            "Pink Floyd - Money",
            "Primus - my name is mud",
            "Radiohead - Creep",
            "Kendrick Lamar - u",
            "Radiohead - Pyramid Song",
            "Radiohead - Burn the Witch"
        ];

    //ARRAYS para guardar os valores das musicas 
    var trackImg = [];
    var trackUrl = [];
    var trackName = [];
    var trackArtist = [];

    for (var i = 0; i < musicArray.length; i++) {
        //faz o corte do artista e musica nas strigns do array predefinido das musicas
        var artist_track = musicArray[i];
        var artist_trackA = new Array();
        artist_trackA = artist_track.split(' - ');

        var artist = artist_trackA[0];
        var track = artist_trackA[1];

        //call da API
        $.ajax({
            type: 'POST',
            url: 'http://ws.audioscrobbler.com/2.0/',
            data:
                'method=track.getInfo&' +
                'api_key=97dd7464b0a13ef1d8ffa1562a6546eb&' +
                'artist=' + artist + '&' +
                'track=' + track + '&' +
                'format=json',
            dataType: 'json',
            async: false, // Só continua o código quando o ajax completa, em vez de fazer em background

            success: function (data) {
                //guardar os valores nos arrays
                trackUrl.push(data.track.url);
                trackArtist.push(data.track.artist.name);
                trackName.push(data.track.name);
                trackImg.push(data.track.album.image[3]["#text"]);
            },
            error: function (code, message, error) {
                console.log(JSON.stringify(error));
            },
        })
    }

    //slideshow
    var index = 0;
    var theImage = document.getElementById("main-image");
    theImage.src = trackImg[0];
    $('#main-text').text(trackArtist[index] + " - " + trackName[index]);

    $('#btnLeft').click(function () {
        index--;

        if (index < 0)
            index = trackImg.length - 1;

        theImage.src = trackImg[index];
        $('#main-text').text(trackArtist[index] + " - " + trackName[index]);
    });

    $('#btnRight').click(function () {
        index++;
        index %= trackImg.length;

        if (index < 0)
            index = trackImg.length - 1;

        theImage.src = trackImg[index];
        $('#main-text').text(trackArtist[index] + " - " + trackName[index]);
    });
}

function topPortugal() {
    // ARRAYS para guardar os valores das musicas 
    var musicArray = [];
    var trackImg = [];

    //call da API
    $.ajax({
        type: 'POST',
        url: 'http://ws.audioscrobbler.com/2.0/',
        data:
            'method=tag.gettoptracks&' +
            'api_key=97dd7464b0a13ef1d8ffa1562a6546eb&' +
            'tag=portugal&' +
            'format=json',
        dataType: 'json',
        async: false, // Só continua o código quando o ajax completa, em vez de fazer em background
        success: function (data) {
            musicArray = data.tracks.track;
        },
    })

    console.log(musicArray);
    musicArray = Object.assign({}, musicArray);
    for (var i = 0; i < 10; i++) {
        console.log(musicArray[i]);
        trackImg.push(musicArray[i].image[3]);
    }

    //slideshow 

    var index = 0;
    var theImage = document.getElementById("main-image");

    theImage.src = trackImg[0]["#text"];

    $('#main-text').text((
        "Rank: " + index + " | " + musicArray[index].artist.name + " - " + musicArray[index].name
    ));

    $('#btnLeft').click(function () {
        index--;

        if (index < 0)
            index = trackImg.length - 1;

        theImage.src = trackImg[index]["#text"];

        $('#main-text').text((
            "Rank: " + index + " | " + musicArray[index].artist.name + " - " + musicArray[index].name
        ));
    });

    $('#btnRight').click(function () {
        index++;
        index %= trackImg.length;

        if (index < 0)
            index = trackImg.length - 1;

        theImage.src = trackImg[index]["#text"];

        $('#main-text').text((
            "Rank: " + index + " | " + musicArray[index].artist.name + " - " + musicArray[index].name
        ));
    });
}
