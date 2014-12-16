function load_navbar(){
    /*  Grab the HTML for the Dataverse.org navbar */
    //var navbar_url = 'http://127.0.0.1:8000/nav-only-json/?callback=?';    
    var navbar_url = 'http://beta.dataverse.org/nav-only-json/?callback=?';    
    //var navbar_url = 'http://dataverse.org/nav-only-json/?callback=?';    
    
    var jqxhr = $.getJSON( navbar_url, function(data) {
        console.log( "success" );
        $('#dv-bs-navbar-details').html(data.navbar_html);
        $("#dataverse-org-homepage-url").attr("href", data.dataverse_dot_org_homepage_url)
    })
    .fail(function() {
        console.log( "error" );
        $('#dv-bs-navbar-details').html('<!-- failed to retrieve navbar -->');
    })
}
