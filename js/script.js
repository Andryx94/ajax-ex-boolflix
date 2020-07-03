$(document).ready(
  function() {
    //avvio funzione al click del tasto ricerca
    $(".search-button").click(function(){
      boolflix();
    });

    //avvio funzione a pressione tasto invio
    $(".search-input").keyup(function() {
      //se viene premuto il tasto invio (13)
      if ( event.which == 13 ) {
        boolflix();
      }
    });
  }
);

//FUNZIONE Boolflix
function boolflix(){
  var ricercaUtente = $(".search-input").val();

  // se input ricerca non è vuoto
  if (ricercaUtente != ""){
    $(".mycontainer .movie-list").text("");
    addMovieTv(ricercaUtente, "https://api.themoviedb.org/3/search/movie"); //ricerca film
    addMovieTv(ricercaUtente, "https://api.themoviedb.org/3/search/tv"); //ricerca serie tv
  }
}

//FUNZIONE aggiunta film o Serie TV
function addMovieTv(name, url){
  $.ajax(
    {
      url: url,
      method: "GET",
      data: {
        api_key: "65ed57e84173ef501a3f48cc27087d06",
        language: "it-IT",
        query: name,
      },
      success: function (data) {
        var risultati = data.results;

        //avvio funzione print ad ogni risultato della chiamata ajax
        for (var i = 0; i < risultati.length; i++){
          printData(
            risultati[i].poster_path,
            risultati[i].title || risultati[i].name, //FILM: "title" - SERIE TV: "name"
            risultati[i].original_title || risultati[i].original_name, //FILM: "original_title" - SERIE TV: "original_name"
            risultati[i].original_language,
            risultati[i].vote_average,
            risultati[i].overview
          );
        }
      },
      error: function () {
        alert("E' avvenuto un errore. ");
      }
    }
  );
}

//FUNZIONE stampa film
function printData(poster, titolo, titolo_originale, lingua, voto, overview){
  //inizializzo Handlebars con il template
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  //gestione cover
  var cover = "";
  if (poster == null){
    cover = "img/covernull.jpg"
  }
  else {
    cover = "https://image.tmdb.org/t/p/w342" + poster;
  }

  //gestione stelle
  var voto5 = Math.ceil(voto / 2)
  var star = [];
  var i = 0;

  for (var i = 0; i < 5; i++){
    if (i < voto5){
      star += '<i class="fas fa-star"></i>';
    }
    else {
      star += '<i class="far fa-star"></i>';
    }
  }

  //dati oggetto Handlebars
  var dati = {
    cover: cover,
    title: titolo,
    original_title: titolo_originale,
    language: lingua,
    rating: star,
    overview: overview
  };

  //appendo il template nel movie-list
  var html = template(dati);
  $(".mycontainer .movie-list").append(html);
}
