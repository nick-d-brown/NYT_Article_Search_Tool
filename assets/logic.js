$(document).ready(function () {
    
    // Group NYT API Key: a94e5a9da3d2416d8a09a8e37b7ea40a
    
    //Below is the group work that was completed prior to revisions
    // ---------------------------------------
/*    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
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
*/
//end group work
//--------------------------------------------------------


// Setup Variable
// ====================================

    var apiKey  = "a94e5a9da3d2416d8a09a8e37b7ea40a";
    var searchTerm = "";
    var numResults = 0;
    var startYear = 0;
    var endYear = 0;

    //URL Base
    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;

    // Variable to track number of articles
    var articlecounter = 0;


// Funcitons
// ====================================

function runQuery(numArticles, queryURL){

    //AJAX function
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .done (function(NYTData){ //possible to be .then???

        //Clears out our well section
        $("#wellSection").empty();


        for (i=0; i < numArticles ; i++) {
            
            //Start placing data into html elements
            var wellSection = $("<div>");
            wellSection.addClass("well");
            wellSection.attr("id", "articleWell-"+i);
            $("#wellSection").append(wellSection);

            
            console.log(queryURL);
            console.log(numArticles);
            console.log(NYTData);

            //Attatch the content to the appropriat well AND checks to see if it exists
            if (NYTData.response.docs[i].headline != "null" && NYTData.response.docs[i].headline.hasOwnProperty("main")) {
                $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
            } else {
                $("#articleWell-" + i).append("<h3> N/A </h3>");
            } 

            if (NYTData.response.docs[i].byline != "null" && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
            } else {
               $("#articleWell-" + i).append("<h3> N/A </h3>"); 
            }

            // $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
            // $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
            // $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");

            if (NYTData.response.docs[i].section_name != "null") {
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
            }

            
            if (NYTData.response.docs[i].pub_date != "null") {
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
            }

            if (NYTData.response.docs[i].web_url != "null") {
                $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
            }
            
            
            
            console.log(NYTData.response.docs[i].headline.main);
            console.log(NYTData.response.docs[i].section_name);
            console.log(NYTData.response.docs[i].pub_date);
            console.log(NYTData.response.docs[i].web_url);
            console.log(NYTData.response.docs[i].byline.original);
            
        }

        //Logging to the console
        console.log(queryURL);
        console.log(numArticles);
        console.log(NYTData);
    })

}

// Main Processes
// ====================================


$("#searchButton").on("click", function(){
    
    //Get search term
    searchTerm = $("#searchInput").val().trim();
    
    //add in the new search term
    var newURL = queryURLBase + "&q=" + searchTerm;

    // get the number of records 
    numResults = $("#articleAmount").val();

    //add in the values of the start year and the end year to their associated variables
    startYear = $("#startYearInput").val().trim()
    endYear = $("#endYearInput").val().trim()

    //Only if the value in the input for the year is a number

    if (parseInt(startYear)) {
        //Adds necessary fields
        startYear+= "0101";

        //add in the year to the API Query URL
        newURL = newURL + "&begin_date=" + startYear;
    }
    if (parseInt(endYear)) {
        //Adds necessary fields
        endYear += "0101";


        //add in the year to the API Query URL
        newURL = newURL + "&end_date=" + endYear;
    }



    runQuery(numResults, newURL);
    
    return false;
});

//1. Create Javascript to retriee the user inputs and convert to variables
//2. Use variables to runn an AJAX call to NYT
//3.Break down the NYT JSON Object into usable fields
//4. Dynamically generate html content

//5. Dealing with the "edge cases" -- bugs or issues with search fields




});