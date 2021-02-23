let apikeyy = "35cfc478b958ad286f645acb4faf0c15";

$.ajax({
  url:
    "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
    apikeyy +
    "&language=en-US&page=1",
  success: function (result) {
    let nowplayingMoviess = result.results;

    let arr = [];
    let arr2 = [];
    let arr3 = [];
    for (let i = 0; i < 5; i++) {
      let data = nowplayingMoviess[i];

      console.log(data);
      for (let b = 0; b < 1; b++) {
        let newdata = Object.values(data);
        console.log(newdata);
        let bgimgs = newdata[1];
        let titles_or = newdata[5];
        let rating_or = newdata[12];
        arr.push(bgimgs);

        arr2.push(titles_or);

        arr3.push(rating_or);
      }
    }

    let backydrops = arr.slice(0, 5);

    let ori_titles = arr2.slice(0, 5);
    let rating_or = arr3.slice(0, 5);

    alert(rating_or);
    let poster = document.getElementById("movie-poster");
    $(".banner").addClass("animate__animated animate__fadeInRight");

    let imageUrll = "https://image.tmdb.org/t/p/original/";

    let rand = Math.floor(Math.random() * 5);
    let rand_pic = backydrops[rand];

    poster.src = imageUrll + rand_pic;

    let titles = document.querySelector(".title");

    titles.innerHTML = ori_titles[rand];

    setInterval(function () {
      let backydrops = arr.slice(0, 5);

      let ori_titles = arr2.slice(0, 5);

      let Movie_ratings = arr3.slice(0, 5);
      let poster = document.getElementById("movie-poster");
      $(".banner").addClass("animate__animated animate__fadeInRight");

      let imageUrll = "https://image.tmdb.org/t/p/original/";

      let rand = Math.floor(Math.random() * 5);
      let rand_pic = backydrops[rand];

      $(".bannerbtn").click(function () {
        console.log(ori_titles[rand]);
      });

      $("#movie-poster").attr("src", imageUrll + rand_pic);

      let titles = document.querySelector(".title");

      titles.innerHTML = ori_titles[rand];
      $(".rate").text(rating_or[rand]);
    }, 7000);

    // console.log(nowplayingMovies[items])
  },
});
