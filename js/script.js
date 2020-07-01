$(document).ready(
  function() {
    //avvio funzione al click del tasto ricerca
    $(".search").click(function(){
      var ricercaUtente = $(".search-input").val();

      // se input ricerca non è vuoto
      if (ricercaUtente != ""){
        $(".container .movie-list").text("");
        addMovie(ricercaUtente);
      }
    });

    //avvio funzione a pressione tasto invio
    $(".search-input").keyup(function() {
      //se viene premuto il tasto invio (13)
      if ( event.which == 13 ) {
        var ricercaUtente = $(".search-input").val();

        // se input ricerca non è vuoto
        if (ricercaUtente != ""){
          $(".container .movie-list").text("");
          addMovie(ricercaUtente);
        }
      }
    });
  }
);

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

        //avvio funzione printMovie ad ogni risultato della chiamata ajax
        for (var i = 0; i < risultati.length; i++){
          var cover = "";
          if (risultati[i].poster_path != null){
            cover = "https://image.tmdb.org/t/p/w1280" + risultati[i].poster_path;
          };

          var movie = {
            cover: cover,
            title: risultati[i].title,
            original_title: risultati[i].original_title,
            language: risultati[i].original_language,
            rating: risultati[i].vote_average,
          };

          printMovie(movie);
        }
      },
      error: function () {
        alert("E' avvenuto un errore. ");
      }
    }
  );
}

//FUNZIONE stampa film
function printMovie(movie){
  //inizializzo Handlebars con il template
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  //appendo il template nel movie-list
  var html = template(movie);
  $(".container .movie-list").append(html);
}
