$(function() {
  var apiKey = "AIzaSyCcRUuwGqWrCWFziK8PVMFcC3-Ap7mVeNM";
  var apiYoutude = "https://www.googleapis.com/youtube/v3/search"

  $('#search-form').submit( function(e) {
    e.preventDefault(); // 전송을 막음

    var query = $("#query").val();

    search(query);
  })

  function search(query) {
    $.get(
      apiYoutude,
      {
        part : "snippet",
        q : query,
        type : "video",
        maxResults : 10,
        key : apiKey
      },
      // success routin
      function(data) {

        $('#results').empty();

        $.each(data.items, function(index, item) {
          var newItem = buildItem(item);
          $('#results').append(newItem);
        })
      },
    );
  }

  var buildItem = function(item) {
    var videoId = item.id.videoId;
    var thumbnail = item.snippet.thumbnails.default.url;
    var title = item.snippet.title;
    var description = item.snippet.description;

    var newItem = `
      <li class="item">
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
              <h3>${title}</h3>
              <div class="image-wrapper">
                  <img src="${thumbnail}" alt="">
              </div>
              <div class="discription">
                  <p>${description}</p>
              </div>
          </a>
      </li>
    `;

    return newItem;

  }
});
