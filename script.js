$(document).ready(function () {
    $('#search-term').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#query').val() + " cover";
        getRequest(searchTerm);
    });


function getRequest(searchTerm) {
    url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: 'AIzaSyDRtV5IsFbHB_vFls8PvqJhzQNJFCpepm8',
        q: searchTerm
    };
  
    $.getJSON(url, params, function (searchTerm) {
        showResults(searchTerm);
    });
}

function showResults(results) {
    var song = "";
    var thumbnail = "";
    var title = "";

    var entries = results.items;

    var str = "";
    var bool = true;
    
    $.each(entries, function (index, value) {
        
        //var link = JSON.stringify(value);
        var link = value.id.videoId;


        if(bool){
            song = link;
            title = value.snippet.title;
            thumbnail = value.snippet.thumbnails.default.url;
            bool = false;
        }

       
        // var duration = value.duration;

      
        // html += '<p>' + link + '</p>';
        // html += '<p>' + duration + '</p>';
        // html += '<img src="' + thumbnail + '">';


    }); 
    
    $('#search-results').html(song);

    writeNewSong($("#party").html(), song, title, thumbnail);

}

    function writeNewSong(name_, song_, title_, thumbnail_) {
      firebase.database().ref('parties/' + name_ + "/").push().set({
        song: song_,
        title: title_,
        thumbnail: thumbnail_
      });
    }
});

