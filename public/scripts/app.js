console.log("Sanity Check: JS is working!");

$(document).ready(function(){

    $('#getAllPlayers').on('click', function(){
        $.ajax({
            url: "test.html",
            cache: false,
            success: function(html){
              $("#results").append(html);
            }
          });
    });

});
