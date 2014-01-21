/**
 *  DEMO-PAGE-ONLY . JS
 *
 *  Description:
 *      Operate the proejct demo page for Metreaux Tables add-on
 *
 *  Use:
 *      This script contains code to support the demo page and style changes.
 *      (It's not an essential part of the Metreaux-table project and can be ignored.)
 *      This is what it does:
 *          
 *      1) Load data to table (this is for demo only)
 *      2) Call the Metreaux table decorator (this is for demo only)
 *      3) Do a little row-wise decoration on data (this is for demo only
 *      4) Allow application of a few different color-sets (this is for demo only) *    
 *
 *  Project Code:
 *      The essential code is stored in the global variable MetreauxTable. 
 *      This is really bad javascript coding practice, but its the simplest to use
 *      for the demo. You are expected to revise things to meet whatever JS code
 *      organizing model you prefer.
 *
 *  Versions:
 *      0.1 -- 12-December-2013
 */
$().ready( function() {
    // VARs
     
    // Stores a reference to the datatables object for a table;
    // The name is arbitrary.
    var MyMetreauxTable;

    // Get a local copy of the global for convenience
    var MT = MetreauxTable;

    // Convenience elements for pagination display
    var _pagingTwoButtons = "two_button";
    var _pagingFullNumbers = "full_numbers";
    var MyPagination = _pagingTwoButtons;

    /**
     *  FUNCTIONS 
     *  
     *  The functions herein are just for the demo page. You don't
     *  need this to use Metreaux Table on your tables.
     *
     *  DEMO_applyTheme: 
     *      operates on the UI to change the colors
     *
     *  DEMO_armThemes: 
     *      sets events listeners for end-user selection of theme
     *
     *  DEMO_armToggle:
     *      sets event to handle end-user requests to toggle the table pagination mode
     *      
     *  DEMO_decorate: 
     *      operates on the data in the table to emphasize some rows
     *
     *  DEMO_getTheme: 
     *      fetches a themed CSS file and applies to the document
     *
     *  DEMO_hide:
     *      Hides the demo page content
     *
     *  DEMO_makeTable:
     *      Enacts the Jquery plugin, DataTables, onto an HTML table
     *      using static data for demo display.
     *
     *  DEMO_show:
     *      Shows the demo page content
     *
     *  DEMO_togglePagination:
     *      Flips the pagination method control string from one variety
     *      to the other
     *  
     */    

    var DEMO_applyTheme = function( e ) {
        // DEMO page only
        // Apply the selected theme
        DEMO_hide();

        // Set the active slection in the UI
        $('.features li').removeClass('selected');
        $(e.currentTarget).parent('li').addClass('selected');

        // Get the theme name from the UI content and inject 
        // hyphens for any spaces       
        var theme = $(e.currentTarget).prop('rel');
        theme = theme.toLowerCase();        
        theme = theme.replace(/\s+/g, "-");

        // Go get the theme file and attach it.        
        DEMO_getTheme( theme );

        DEMO_show( 1000 );
    };

    var DEMO_armThemes = function() {
        // DEMO page only
        // Arm events for end-user iniitiated theme changes
        $('.features li a').on( 'click', function ( e ) {
            e.preventDefault();            
            DEMO_applyTheme( e );            
        });
    };

    var DEMO_armToggle = function() {
        // DEMO page only
        // Arm event for toggling the pagination model
        $('#js-toggle').on( 'click', function ( e ) {
            e.preventDefault();            
            if ( MyMetreauxTable ) {

                // Close the curtain
                DEMO_hide();

                // Toggle the pagination controller
                DEMO_togglePagination();

                // Eliminate the table (but retain it int he DOM in native HTML form)
                MyMetreauxTable.fnDestroy();                

                // Re-instance the table
                DEMO_makeTable();
                // Bang the table width
                $('#js-table').css( 'width', '100%');

                // Re-decorate the data
                DEMO_decorate();

                // Re-decorate the table
                MT.init("#js-table");

                // Open the curtain
                DEMO_show( 750 );
            };            
        });
    };

    var DEMO_decorate = function() {
        // DEMO page only
        // Display division winners in bold face, themed font
        
        // Get all TDs in the Games Back column
        var gamesBack = $('td.games');
        // Grep the array returning only the division winners
        var divWinners = $.grep( gamesBack, function( games, i ){
           return $(games).text() == "-";
        });
        // decorate all the columns of a division winners' row
        $(divWinners).parent().children().addClass('winner');
    };

    var DEMO_getTheme = function( theme ) {
        // DEMO page only
        // Retrieve and apply a themed CSS file using pure JS
        var fileref = document.createElement("link");
            fileref.rel = "stylesheet";
            fileref.type = "text/css";
            fileref.href = "css/" + theme + ".css";
            document.getElementsByTagName("head")[0].appendChild(fileref)
    };

    var DEMO_hide = function( duration ) {
        var d = duration || 100;
        $('.page').fadeOut( d );
    };

    var DEMO_show = function( duration ) {
        var d = duration || 100;
        $('.page').fadeIn( d );
    };

    var DEMO_togglePagination = function() {
        // Swap the pagination control property's value
        if ( MyPagination == _pagingTwoButtons ) {

            MyPagination  =  _pagingFullNumbers;
        } else {

            MyPagination  =  _pagingTwoButtons;
        };
    };

    /**
     *  This code serves as the data source for the demo table. 
     *  The variable name 'MyMetreauxTable' is arbitrary, it isn't used for
     *  later references to the table.  
     *  
     *  The table's ID is also arbitrary, but is essential to dataTables and
     *  this script.
     *    
     */
    
    var DEMO_makeTable = function() {
        // Make a dataTables table        
        MyMetreauxTable = $('#js-table').dataTable( {
            "aaData": [
                ["Atlanta Braves", "NL", "East", 96, 66, ".593", "-"],
                ["Washington Nationals", "NL", "East", 86, 76, ".531", "10"],
                ["New York Mets", "NL", "East", 74, 86, ".457", "22"],
                ["Philadelphia Phillies", "NL", "East", 73, 89, ".451", "23"],
                ["Miami Marlins", "NL", "East", 62, 100, ".383", "34"],
                ["St. Louis Cardinals", "NL", "Central", 97, 65, ".599", "-"],
                ["Pittsburgh Pirates", "NL", "Central", 94, 68, ".580", "3"],
                ["Cincinnati Reds", "NL", "Central", 90, 72, ".556", "7"],
                ["Milwaukee Brewers", "NL", "Central", 74, 88, ".457", "23"],
                ["Chicago Cubs", "NL", "Central", 66, 96, ".407", "31"],
                ["Los Angeles Dodgers", "NL", "West", 92, 70, ".568", "-"],
                ["Arizona Diamondbacks", "NL", "West", 81, 81, ".500", "11"],
                ["San Francisco Giants", "NL", "West", 76, 86, ".469", "16"],
                ["San Diego Padres", "NL", "West", 76, 86, ".469", "16"],
                ["Colorado Rockies", "NL", "West", 74, 88, ".457", "18"],

            ],
            "aoColumns": [
                { "sTitle": "Team", "sClass": "width team" },
                { "sTitle": "League", "sClass": "align-text center" },
                { "sTitle": "Division", "sClass": "align-text center width division" },
                { "sTitle": "Wins", "sClass": "align-text right width record" },
                { "sTitle": "Losses", "sClass": "align-text right width record" },
                { "sTitle": "Percentage", "sClass": "align-text right" },
                { "sTitle": "Games Back", "sClass": "align-text right games" },
            ],
            "aaSorting": [
                [ 6, "asc" ],
                [ 3, "desc" ]
            ],
            "sPaginationType": MyPagination  // Pagination model; you ought not use a global :)
        } );
    };

    // INVOCATIONs

    // Now actually make the table
    DEMO_makeTable();    

    // Decorate data in tables: 
    //  Adds bold face the baseball winning teams
    DEMO_decorate();

    // Arm the Change Theme events: 
    //  allow the end user to select a theme to apply to the demo table
    DEMO_armThemes();

    // Arm the Toggle Pagination event: 
    //  allow the end user to switch to the other pagination model
    DEMO_armToggle();

    // Call the Metreaux Table decorator for a specific table
    MT.init("#js-table");
    
    // NOTE:
    // For additional tables, just apply the DataTables plugin to them (not shown)
    // and then apply the Metreaux Table decorator as shown below:
    // MT.init('#my-second-table'); 
});
    