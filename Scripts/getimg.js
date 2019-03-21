$(document).ready(function () {

    //1. На клик SEARCH
    $("#btn-search").click(function () {
        getResult();
        $("#btn-search").blur();
    });


    //2. На клик ЕНТЕР keypress
    $(document).keypress(function(event) {
        if (event.keyCode == 13) {
            $("#btn-search").click();
        }
    });


    //3. Среди барање и оди во AJAX
    function getResult() {
		
        //Зема текст input и празно место заменува со знак '+'
        var imgSearch = $("#txt-search").val().replace(/ /g, "+");

        //API JSON и Query
        var searchURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBhl8HEyfNWyrELRGJxA--4yxHCKClY4f0&cx=015839596369991773278:ayvixgdemz8&searchType=image&q=" + imgSearch;
        console.log('Search URL: '+ searchURL);

        //Избриши ако има слики од претходно пребарување
        $("#content-img").empty();

        //Оди во функција за принтање на екран
        printData(searchURL);
    };

 
    function printData(searchURL) {
        $.ajax({
            type: 'GET',
            url: searchURL,
            data: { get_param: 'value' },
            dataType: 'json',
            success: function (data) {
                $.each(data.items, function (index, element) {
                    $('#content-img').append($('<li><a href="' + element.link +'"><img src="' + element.image.thumbnailLink+'"/></li></a>'));
                });
            }
        });
    };
});