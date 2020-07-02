$(document).ready(
  function() {
    //avvio funzione al click del tasto ricerca
    $(".search").click(function(){
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
    $(".container .movie-list").text("");
    addMovie(ricercaUtente);
    addTv(ricercaUtente);
  }
}

//FUNZIONE aggiunta film
function addMovie(movieName){
  $.ajax(
    {
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "65ed57e84173ef501a3f48cc27087d06",
        language: "it-IT",
        query: movieName,
      },
      success: function (data) {
        var risultati = data.results;

        //avvio funzione print ad ogni risultato della chiamata ajax
        for (var i = 0; i < risultati.length; i++){
          var movie = dati(risultati[i].poster_path, risultati[i].title, risultati[i].original_title, risultati[i].original_language, risultati[i].vote_average);
          print(movie);
        }
      },
      error: function () {
        alert("E' avvenuto un errore. ");
      }
    }
  );
}

//FUNZIONE aggiunta film
function addTv(tvName){
  $.ajax(
    {
      url: "https://api.themoviedb.org/3/search/tv",
      method: "GET",
      data: {
        api_key: "65ed57e84173ef501a3f48cc27087d06",
        language: "it-IT",
        query: tvName,
      },
      success: function (data) {
        var risultati = data.results;

        //avvio funzione print ad ogni risultato della chiamata ajax
        for (var i = 0; i < risultati.length; i++){
          var tv = dati(risultati[i].poster_path, risultati[i].name, risultati[i].original_name, risultati[i].original_language, risultati[i].vote_average);
          print(tv);
        }
      },
      error: function () {
        alert("E' avvenuto un errore. ");
      }
    }
  );
}

//FUNZIONE riempimento dati
function dati(poster, titolo, titolo_originale, lingua, voto){
  //gestione cover
  var cover = "";
  if (poster != null){
    cover = "https://image.tmdb.org/t/p/w300" + poster;
  };

  //gestione stelle
  var voto5 = Math.ceil(voto / 2)
  var star = [];
  var i = 0;
  while (i < 5) {
    if (i < voto5){
      star += '<i class="fas fa-star"></i>';
      i++;
    }
    else {
      star += '<i class="far fa-star"></i>';
      i++;
    }
  }

  //gestione bandiere

  var dati = {
    cover: cover,
    title: titolo,
    original_title: titolo_originale,
    language: lingua,
    rating: star,
  };
  return dati
}

//FUNZIONE stampa film
function print(title){
  //inizializzo Handlebars con il template
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  //appendo il template nel movie-list
  var html = template(title);
  $(".container .movie-list").append(html);
}
