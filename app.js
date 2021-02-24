$(document).ready(function () {
  $(window).on("load", function () {
    setTimeout(removeLoader, 1000); //wait for page load PLUS two seconds.
  });

  function removeLoader() {
    $(".loader").fadeOut(200, function () {
      // fadeOut complete. Remove the loading div
      $(".loader").remove(); //makes page more lightweight
    });
  }

  //api request stuff
  $.ajax({
    url:
      "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
      apikey +
      "&language=en-US&page=1",
    success: function (result) {
      let nowplayingMovies = result.results;

      // console.log(nowplayingMovies[items])

      let imageUrl = "https://image.tmdb.org/t/p/original/";

      nowplayingMovies.forEach(function (movie) {
        let rating = Math.floor(Math.random() * 10 + 2);
        let point = Math.floor(Math.random() * 9);

        rating = rating + "." + point;
        var html =
          '<div class="movie">' +
          '<div class="rating">' +
          rating +
          '<i class="rating_star fa fa-star" aria-hidden="true"></i>' +
          "</div>" +
          "<img src=" +
          '"' +
          imageUrl +
          movie.poster_path +
          '"' +
          ">" +
          "<p>" +
          movie.title +
          "</div>";
        ("</div>");

        $(".cara1").append(html);
      });

      let movies = document.querySelectorAll(".movie");

      movies.forEach(function (flick) {
        flick.addEventListener("click", function () {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          $(".summary")
            .toggleClass("hidden")
            .addClass("animate__animated animate__fadeInRight");

          let movie_title = flick.children[2].innerHTML;

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

              let info_img = $(".backdrop img");

              console.log(info_img);

              $(".titles").text("Sorry No Reviews Found For This Flim :/");

              $.ajax({
                url:
                  "https://api.themoviedb.org/3/movie/" +
                  id +
                  "/reviews?api_key=" +
                  apikey +
                  "&language=en-US",
                success: function (result, textStatus, XMLHttpRequest) {
                  let reviews = result.results;

                  for (let i = 0; i < 3; i++) {
                    let posts = reviews[i].content;
                    let authors = reviews[i].author;

                    console.log(reviews[i].content);

                    if (reviews[i].content) {
                      $(".titles").text("Reviews");
                    }
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
                error: function (xhr, ajaxOptions, thrownError) {
                  alert(xhr.status);
                  alert(xhr.statusText);
                  alert(xhr.responseText);
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

      $(".cara1").slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 10,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
        prevArrow:
          "<i class=' before arrows fas fa-arrow-circle-left custom-carousel-control slick-prev slick-arrow'></i>",
        nextArrow:
          "<i class=' next arrows fas fa-arrow-circle-right custom-carousel-control slick-next slick-arrow'></i>",
      });
    },
  });

  //coming soon

  window.addEventListener("scroll", (event) => {
    let navigationLinks = document.querySelectorAll("nav ul li a");

    navigationLinks.forEach(function (link) {
      let height = link.getBoundingClientRect();
      let fromTop = window.scrollY;

      if (height < fromTop) {
        alert("hello");
      }
    });
  });
});

// javascript slide show

//search movie code

let apikey = "35cfc478b958ad286f645acb4faf0c15";

$(".top button").click(function () {
  let User_input = $("input").val();

  if (User_input == "") {
    console.log("nothing typed");
  } else if (User_input != "") {
    window.location.href = "./search.html";

    let SearchInput = $("input").val();

    localStorage.setItem("selected", SearchInput);

    console.log(SearchInput);
  }
});

$.ajax({
  url:
    "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
    apikey +
    "&language=en-US&page=1",
  success: function (result) {
    let nowplayingMovies = result.results;

    // console.log(nowplayingMovies[items])

    let imageUrl = "https://image.tmdb.org/t/p/original/";

    nowplayingMovies.forEach(function (movie) {
      let rating = Math.floor(Math.random() * 10 + 2);
      let point = Math.floor(Math.random() * 9);

      rating = rating + "." + point;
      var html =
        '<div class="movie">' +
        '<div class="rating">' +
        rating +
        '<i class="rating_star fa fa-star" aria-hidden="true"></i>' +
        "</div>" +
        "<img src=" +
        '"' +
        imageUrl +
        movie.poster_path +
        '"' +
        ">" +
        "<p>" +
        movie.title +
        "</div>";
      ("</div>");

      $(".cara2").append(html);
    });

    $(".cara2").slick({
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 10,
      speed: 500,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
      prevArrow:
        "<i class=' before arrows fas fa-arrow-circle-left custom-carousel-control slick-prev slick-arrow'></i>",
      nextArrow:
        "<i class=' next arrows fas fa-arrow-circle-right custom-carousel-control slick-next slick-arrow'></i>",
    });
  },
});

// cara 3 code

$.ajax({
  url:
    "https://api.themoviedb.org/3/trending/all/day?api_key=" +
    apikey +
    "&language=en-US&page=1",
  success: function (result) {
    let nowplayingMovies = result.results;

    // console.log(nowplayingMovies[items])

    let imageUrl = "https://image.tmdb.org/t/p/original/";

    nowplayingMovies.forEach(function (movie) {
      let rating = Math.floor(Math.random() * 10 + 2);
      let point = Math.floor(Math.random() * 9);

      rating = rating + "." + point;
      var html =
        '<div class="movie">' +
        '<div class="rating">' +
        rating +
        '<i class="rating_star fa fa-star" aria-hidden="true"></i>' +
        "</div>" +
        "<img src=" +
        '"' +
        imageUrl +
        movie.poster_path +
        '"' +
        ">" +
        "<p>" +
        movie.title +
        "</div>";
      ("</div>");

      $(".cara3").append(html);

      let imgs = imageUrl + movie.backdrop_path;
    });

    $(".cara3").slick({
      slidesToShow: 6,
      slidesToScroll: 10,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
      speed: 500,

      prevArrow:
        "<i class=' before arrows fas fa-arrow-circle-left custom-carousel-control slick-prev slick-arrow'></i>",
      nextArrow:
        "<i class=' next arrows fas fa-arrow-circle-right custom-carousel-control slick-next slick-arrow'></i>",
    });
  },
});

// cara 4 code

$.ajax({
  url:
    "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
    apikey +
    "&language=en-US&page=1",
  success: function (result) {
    let nowplayingMovies = result.results;

    // console.log(nowplayingMovies[items])

    let imageUrl = "https://image.tmdb.org/t/p/original/";

    nowplayingMovies.forEach(function (movie) {
      let rating = Math.floor(Math.random() * 10 + 2);
      let point = Math.floor(Math.random() * 9);

      rating = rating + "." + point;
      var html =
        '<div class="movie">' +
        '<div class="rating">' +
        rating +
        '<i class="rating_star fa fa-star" aria-hidden="true"></i>' +
        "</div>" +
        "<img src=" +
        '"' +
        imageUrl +
        movie.poster_path +
        '"' +
        ">" +
        "<p>" +
        movie.title +
        "</div>";
      ("</div>");

      $(".cara4").append(html);
    });

    $(".cara4").slick({
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 10,
      speed: 500,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
      prevArrow:
        "<i class=' before arrows fas fa-arrow-circle-left custom-carousel-control slick-prev slick-arrow'></i>",
      nextArrow:
        "<i class=' next arrows fas fa-arrow-circle-right custom-carousel-control slick-next slick-arrow'></i>",
    });
  },
});

$(".backy").click(function () {
  location.href = "index.html";
});

document.addEventListener("scroll", function () {
  let scroll_position = window.scrollY;
  let np = document.getElementById("li-ns");
  let uc = document.getElementById("li-c");
  let trending = document.getElementById("li-tr");
  let toprated = document.getElementById("li-to");

  console.log(scroll_position);

  if (scroll_position > 896 && scroll_position < 1386) {
    np.classList.add("active");
  } else {
    np.classList.remove("active");
  }

  if (scroll_position > 1386 && scroll_position < 1880) {
    uc.classList.add("active");
  } else {
    uc.classList.remove("active");
  }

  if (scroll_position > 1880 && scroll_position < 2129) {
    trending.classList.add("active");
  } else {
    trending.classList.remove("active");
  }

  if (scroll_position >= 2129) {
    toprated.classList.add("active");
  } else {
    toprated.classList.remove("active");
  }
});



$('.search_draw').slideToggle();

$('.search_draw').hide();
$('.toggle').click(function(){
  $('.top').toggleClass('on');
  $('.search_draw').slide();
  $('.search-section').slideToggle();
 
})