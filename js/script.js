$(document).ready(
  function() {
    var userResearchPlaceholder = "Star Wars";
    boolflix(userResearchPlaceholder);

    //avvio funzione al click del tasto ricerca
    $(".search-button").click(function(){
      var userResearch = $(".search-input").val();
      boolflix(userResearch);
    });

    //avvio funzione a pressione tasto invio
    $(".search-input").keyup(function() {
      //se viene premuto il tasto invio (13)
      if ( event.which == 13 ) {
        var userResearch = $(".search-input").val();
        boolflix(userResearch);
      }
    });

    //avvio funzione a click su logo Boolflix
    $(".logo").click(function(){
      location.reload();
    });

    //avvio funzione a click su icona lente d'ingradimento
    $(".search-icon").click(function(){
      $(".search-input").toggleClass("hide");
      $(".search-input").val("");
      $(".search-button").toggleClass("hide");
    });
  }
);

//FUNZIONE Boolflix
function boolflix(userResearch){
  // se input ricerca non è vuoto
  if (userResearch != ""){
    $(".mycontainer .movie-list").text("");
    addMovieTv(userResearch, "movie"); //ricerca film
    addMovieTv(userResearch, "tv"); //ricerca serie tv
  }
}

//FUNZIONE aggiunta film o Serie TV
function addMovieTv(name, category){
  //analizzo se è un film o una serie tv e cambio le variabili
  if (category == "movie") {
    var url = "https://api.themoviedb.org/3/search/movie";
  }

  else {
    var url = "https://api.themoviedb.org/3/search/tv";
  }

  //chiamata AJAX
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
        var results = data.results;

        //avvio funzione print ad ogni risultato della chiamata ajax
        for (var i = 0; i < results.length; i++){
          printData(
            results[i].poster_path,
            results[i].title || results[i].name, //FILM: "title" - SERIE TV: "name"
            results[i].original_title || results[i].original_name, //FILM: "original_title" - SERIE TV: "original_name"
            results[i].original_language,
            results[i].vote_average,
            results[i].overview
          );
        }

        //stampo il numero di film/serie della ricerca
        if (category == "movie"){
          $("#movie-number").text(results.length);
        }

        else {
          $("#tv-number").text(results.length)
        }
      },
      error: function () {
        alert("E' avvenuto un errore. ");
      }
    }
  );
}

//FUNZIONE stampa film
function printData(poster, title, original_title, language, rating, overview){
  //inizializzo Handlebars con il template
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  //gestione cover
  var cover = "";
  if (poster == null){
    cover = "img/covernull.jpg";
    var coverNull = "null";
  }
  else {
    cover = "https://image.tmdb.org/t/p/w342" + poster;
  }

  //gestione stelle
  var rating5 = Math.ceil(rating / 2)
  var star = [];
  var i = 0;

  for (var i = 0; i < 5; i++){
    if (i < rating5){
      star += '<i class="fas fa-star"></i>';
    }
    else {
      star += '<i class="far fa-star"></i>';
    }
  }

  //dati oggetto Handlebars
  var data = {
    cover: cover,
    coverNull: coverNull,
    title: title,
    original_title: original_title,
    language: language,
    rating: star,
    overview: overview
  };

  //appendo il template nel movie-list
  var html = template(data);
  $(".movie-list").append(html);
}
