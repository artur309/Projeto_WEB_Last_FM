"use strict";

//scripts to include HTML pages
//Include Header link
$("#headerLink").load("pages/header.html");
$("#footerLink").load("pages/footer.html");

//Conteudo da musica a ser guardado
$("#musica").click(function () {
    var musica = $('#main-text').text();

    var album = $('#main-image').attr('src');
    localStorage.setItem('musicStorage', musica);
    localStorage.setItem('albumStorage', album);
