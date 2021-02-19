$(window).on("load", function () {
  setTimeout(removeLoader, 1000); //wait for page load PLUS two seconds.
});

function removeLoader() {
  $(".loader").fadeOut(300, function () {
    // fadeOut complete. Remove the loading div
    $(".loader").remove(); //makes page more lightweight
  });
}

$(window).on("load", function () {
  setTimeout(function () {
    $(".grid").addClass("animate__animated animate__fadeInRight");
  }, 1100); //wait for page load PLUS two seconds.
});

var selected = localStorage.getItem("selected");

console.log(selected);
let apikey = "35cfc478b958ad286f645acb4faf0c15";

$.ajax({
  url:
    "https://api.themoviedb.org/3/search/movie?query=" +
    selected +
    "&api_key=" +
    apikey +
    "&language=en-US&page=1&include_adult=false",
  success: function (result) {
    console.log(result);

    result.results.forEach(function (movie) {
      let imageUrl = "https://image.tmdb.org/t/p/original/";

      var html =
        '<div class="movie">' +
        '<div class="search-vote">' +
        movie.vote_average +
        '<i class="rating_star fa fa-star" aria-hidden="true"></i>' +
        "</div>" +
        "<img src=" +
        '"' +
        imageUrl +
        movie.poster_path +
        '"' +
        ">" +
        "<br>" +
        "<p>" +
        movie.title +
        "</p></div>";
      ("</div>");

      $(".grid").append(html);
    });
  },
});

$(".back").click(function () {
  window.location.href = "./index.html";
});

$(".searchbtn").click(function () {
  let searchInput = $(".searchinput").val();

  if (searchInput == "") {
    console.log("search input empty");
  } else if (searchInput != "") {
    $.ajax({
      url:
        "https://api.themoviedb.org/3/search/movie?query=" +
        searchInput +
        "&api_key=" +
        apikey +
        "&language=en-US&page=1&include_adult=false",
      success: function (result) {
        console.log(result);

        result.results.forEach(function (movie) {
          let imageUrl = "https://image.tmdb.org/t/p/original/";

          var html =
            '<div class="movie">' +
            '<div class="search-vote">' +
            movie.vote_average +
            '<i class="rating_star fa fa-star" aria-hidden="true"></i>' +
            "</div>" +
            "<img src=" +
            '"' +
            imageUrl +
            movie.poster_path +
            '"' +
            ">" +
            "<br>" +
            "<p>" +
            movie.title +
            "</p></div>";
          ("</div>");

          $(".grid").append(html);
        });
      },
    });
  }
});

setTimeout(function () {
  let movies = document.querySelectorAll(".movie");
  let imageUrl = "https://image.tmdb.org/t/p/original/";

  movies.forEach(function (flix) {
    flix.addEventListener("click", function () {
      $(".summary")
        .toggleClass("hidden")
        .addClass("animate__animated animate__fadeInRight");

      let movie_title = flix.childNodes[3].innerHTML;

      console.log(movie_title);

      $.ajax({
        url:
          "https://api.themoviedb.org/3/search/movie?query=" +
          movie_title +
          "&api_key=" +
          apikey +
          "&append_to_response=videos&language=en-US&page=1&include_adult=false",
        success: function (result) {
          let flim = result.results[0];

          console.log(flim);

          var summary =
            '<div class="backdrop">' +
            "<img src=" +
            '"' +
            imageUrl +
            flim.backdrop_path +
            '"' +
            ">" +
            "<h1>" +
            flim.original_title +
            "</h1>" +
            "<h2> Summary </h2>" +
            "<p>" +
            flim.overview +
            "<p>" +
            '<div class="vote">' +
            "<h1>" +
            flim.vote_average +
            "/10 " +
            " " +
            '<i class="fa fa-star" aria-hidden="true"></i>';
          ("</h1>");
          ("</div>");
          ("</div>");

          let id = flim.id;

          $.ajax({
            url:
              "https://api.themoviedb.org/3/movie/" +
              id +
              "/reviews?api_key=" +
              apikey +
              "&language=en-US",
            success: function (result) {
              let reviews = result.results;

              for (let i = 0; i < 3; i++) {
                let posts = reviews[i].content;
                let authors = reviews[i].author;

                let blog =
                  '<div class="blog"' +
                  "<p>" +
                  posts +
                  "<p>" +
                  "<br>" +
                  '<p class="author"> ' +
                  "- " +
                  authors +
                  "<p>" +
                  "</div>";

                $(".review").append(blog);
              }
            },
          });

          $.ajax({
            url:
              "https://api.themoviedb.org/3/movie/" +
              id +
              "/videos?api_key=" +
              apikey +
              "&language=en-US",
            success: function (result) {
              let youtube = "https://www.youtube.com/embed/";
              let key = result.results[0].key;

              let trailer =
                '<iframe width="920" height="515"' +
                'src="' +
                youtube +
                key +
                '">' +
                "</iframe>";

              $(".summary").append(trailer);
            },
          });

          $(".summary").append(summary);
        },
      });
    });
  });
}, 2000);

$(".backy").click(function () {
  location.href = "search.html";
});
