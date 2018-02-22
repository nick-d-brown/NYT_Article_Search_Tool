$(document).ready(function () {
    
    // Group NYT API Key: a94e5a9da3d2416d8a09a8e37b7ea40a

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    queryURL + searchTerm + '&begin_date=' + beginDate + '&end_date=' + endDate + '&api-key=a94e5a9da3d2416d8a09a8e37b7ea40a'
    
$("#submitButton").on("click", function() {
    console.log($("#searhTerm"));
    var searchTerm = $("#searhTerm").val();
    // var articleQuantity = $("#searhTerm").val();
    var beginDate = $("#startYear").val();
    var endDate = $("#endDate").val();

    $.ajax({
        url: queryURL,
        method: "Get"
    })
    .then(function(response){
        var results = response.data;

    })



});






});