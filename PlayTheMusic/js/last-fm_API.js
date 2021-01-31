"use strict";

$(document).ready(function () {
    if (document.title == 'Last-FM PT: Homepage')
        topDefault();
    if (document.title == 'Last-FM PT: Top Musicas PORTUGAL')
        topPortugal();
    if (document.title == 'Last-FM PT: Detalhes')
        detalhesMusic();
    if (document.title == 'Last-FM PT: Favoritos')
        favoritosMusic();
    if (document.title == 'Last-FM PT: Resultados')
        resultsPage();

    $('#addFav').click(function () {
        addFav();
    });
    $('#searchbar').on('input keypress', function() {
        searchMusic();
    });

});

//Pagina Homepage
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
                console.log(data);
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

        //verifica se ja existe nos favoritos
        var musica = $('#main-text').text();
        var favMusics = JSON.parse(localStorage.getItem("favoritos"));

        if (favMusics.includes(musica))
            $("#addFav").html('Adicionar aos Favs🌟');
        else
            $("#addFav").html('Adicionar aos Favs');

    });

    $('#btnRight').click(function () {
        index++;
        index %= trackImg.length;

        if (index < 0)
            index = trackImg.length - 1;

        theImage.src = trackImg[index];
        $('#main-text').text(trackArtist[index] + " - " + trackName[index]);


        //verifica se ja existe nos favoritos
        var musica = $('#main-text').text();
        var favMusics = JSON.parse(localStorage.getItem("favoritos"));

        if (favMusics.includes(musica))
            $("#addFav").html('Adicionar aos Favs🌟');
        else
            $("#addFav").html('Adicionar aos Favs');

    });
}

//Pagina TOP 10 Portugal
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
        "Rank: " + (index + 1) + " | " + musicArray[index].artist.name + " - " + musicArray[index].name
    ));

    $('#btnLeft').click(function () {
        index--;

        if (index < 0)
            index = trackImg.length - 1;

        theImage.src = trackImg[index]["#text"];

        $('#main-text').text((
            "Rank: " + (index + 1) + " | " + musicArray[index].artist.name + " - " + musicArray[index].name
        ));


        //verifica se ja existe nos favoritos
        var musica = $('#main-text').text();
        var favMusics = JSON.parse(localStorage.getItem("favoritos"));

        //faz o corte do artista e musica nas strigns do array predefinido das musicas
        var artist_track = musica;
        var artist_trackA = new Array();
        artist_trackA = artist_track.split(' | ');
        musica = artist_trackA[1];

        if (favMusics.includes(musica))
            $("#addFav").html('Adicionar aos Favs🌟');
        else
            $("#addFav").html('Adicionar aos Favs');

    });

    $('#btnRight').click(function () {
        index++;
        index %= trackImg.length;

        if (index < 0)
            index = trackImg.length - 1;

        theImage.src = trackImg[index]["#text"];

        $('#main-text').text((
            "Rank: " + (index + 1) + " | " + musicArray[index].artist.name + " - " + musicArray[index].name
        ));

        //verifica se ja existe nos favoritos
        var musica = $('#main-text').text();
        var favMusics = JSON.parse(localStorage.getItem("favoritos"));

        //faz o corte do artista e musica nas strigns do array predefinido das musicas
        var artist_track = musica;
        var artist_trackA = new Array();
        artist_trackA = artist_track.split(' | ');
        musica = artist_trackA[1];

        console.log(musica);
        if (favMusics.includes(musica))
            $("#addFav").html('Adicionar aos Favs🌟');
        else
            $("#addFav").html('Adicionar aos Favs');

    });
}

//Pagina Detalhes Musica
function detalhesMusic() {
    $('#main-text').html(localStorage.getItem('musicStorage'));
    $("#imgTrack").attr("src", localStorage.getItem('albumStorage'));

    console.log("storage music:" + localStorage.getItem('musicStorage'));

    //faz o corte do artista e musica nas strigns do array predefinido das musicas
    var artist_track = localStorage.getItem('musicStorage');
    console.log("track aa" + artist_track);
    var artist_trackA = new Array();
    artist_trackA = artist_track.split(' - ');

    var artist = artist_trackA[0];
    var track = artist_trackA[1];

    // call da API
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
            console.log(data);
            $("#letraWiki").html(data.track.wiki.summary);
            $("#albumSpan").html(data.track.album.title);
        },
    })
}

//Pagina Favoritos
function favoritosMusic() {
    var listaFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    console.log(listaFavoritos);
    listaFavoritos.forEach(element => {
        $('#listFav').append('<a id="#musica" class="listaFavLink">' + element + '<br></a>');
        //href="detalhes.html"
    });
    $('#listFav > a').click(function (e) {
        var musica = $('#musica').text();
        alert(musica);
    });
}

//Adiciona (remove tambem) Musica favoritos
function addFav() {

    var musica = $('#main-text').text();
    //localStorage.clear();

    //verifica se ja tem ou nao uma lista de favs
    if (localStorage.getItem("favoritos") === null)
        var favMusics = [];
    else
        var favMusics = JSON.parse(localStorage.getItem("favoritos"));

    var cont = favMusics.length;
    //faz o corte do artista e musica nas strigns do array predefinido das musicas
    if (document.title == 'Last-FM PT: Top Musicas PORTUGAL') {
        var artist_track = musica;
        var artist_trackA = new Array();
        artist_trackA = artist_track.split(' | ');
        musica = artist_trackA[1];
    }

    console.log(musica);

    //verifica se ja tem ou a musica | ADICIONA -|- REMOVE

    if (!favMusics.includes(musica)) {
        favMusics[cont++] = musica;
        $("#addFav").html('Adicionar aos Favs🌟');
    }
    else {
        favMusics.splice($.inArray(musica, favMusics), 1);
        $("#addFav").html('Adicionar aos Favs');
    }

    //guarda o array favoritos na memoria local 
    localStorage.setItem("favoritos", JSON.stringify(favMusics));

}

function searchMusic() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();

    var musicName = [];
    var artistName = [];
    var imageRef = [];
    var musicData = [];

    $.ajax({
        type: 'POST',
        url: 'http://ws.audioscrobbler.com/2.0/',
        data:
            'method=track.search&' +
            'api_key=97dd7464b0a13ef1d8ffa1562a6546eb&' +
            'track=' + input + "&" +
            'format=json',
        dataType: 'json',
        async: false, // Só continua o código quando o ajax completa, em vez de fazer em background
        success: function (data) {
            musicData.push(data.results.trackmatches.track);
        },
    })

    //console.log(musicData);
    musicData = Object.assign({}, musicData);
    //console.log(musicData);
        for (var i = 0; i < 30; i++) {
            musicName.push(musicData[0][i].name);
            artistName.push(musicData[0][i].artist);
        }

    //if (localStorage.getItem('musicStorage') == musica)
    //     localStorage.clear();

    localStorage.setItem("musicName", JSON.stringify(musicName));
    localStorage.setItem("artistName", JSON.stringify(artistName));
    //localStorage.setItem('albumStorage', album);
    console.log("artist name: " + localStorage.getItem('artistName'));
    //localStorage.setItem("favoritos", JSON.stringify(favMusics));
    //var listaFavoritos = JSON.parse(localStorage.getItem("favoritos"));
}

function resultsPage() {
    var musicName = JSON.parse(localStorage.getItem("musicName"));
    var musicArtist = JSON.parse(localStorage.getItem("artistName"));
    var c = 0;
    musicName.forEach(element => {
        c++;
        $('#divNome').append('<a id="musica" href="Detalhes.html" target="_blank">' + element + '</a><br>');
    });
    musicArtist.forEach(element => {
        c++;
        $('#divArtist').append('<a href="Detalhes.html">' + element + '</a><br>');
    });
}
