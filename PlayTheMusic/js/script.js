"use strict";

//scripts to include HTML pages
//Include Header link
$("#headerLink").load("pages/header.html");
$("#footerLink").load("pages/footer.html");


//Conteudo da musica a ser guardado
$("#musica").click(function (e) {
    // e.preventDefault();
    var musica = $('#main-text').text();

    if (document.title == 'Last-FM PT: Top Musicas PORTUGAL') {

        //faz o corte do artista e musica nas strigns do array predefinido das musicas
        var artist_track = musica;
        var artist_trackA = new Array();
        artist_trackA = artist_track.split(' | ');
        musica = artist_trackA[1];
    }
    //if (localStorage.getItem('musicStorage') == musica)
    //     localStorage.clear();


    var album = $('#main-image').attr('src');
    localStorage.setItem('musicStorage', musica);
    localStorage.setItem('albumStorage', album);
    console.log("track name: " + localStorage.getItem('musicStorage'));
});
