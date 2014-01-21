/**
 *  METREAUX-TABLE . JS
 *
 *  Loader:
 *      This version is suitable for asynch loading with Require.js
 *      / AMD-style /
 *
 *  Description:
 *      Add some Windows 8 style and a small amount of behavior to an HTML
 *      table formed by the jQuery plugin, dataTables.net.
 *
 *  Requires:
 *      Jquery 1.10+ or 2.x+
 *      Datatables.net, a plugin for Jquery and HTML tables
 *
 *  Example:
 *      init("#js-mytable");
 *
 *  Versions:
 *      0.1 -- 06-December-2013
 *      0.2 -- 14-January-2104
 */

define(
  [ "jquery", "datatables" ],
    function ( $, dataTable ) {

    // Define strings
     
    var _cancelSearch           =  "-cancel-search";
    var _dataTables_wrapper     =  "_wrapper";
    var _filterInput            =  "_filter.dataTables_filter label input";
    var _filterLabel            =  "_filter.dataTables_filter label"; 
    var _cancelSearchMarkupPre  =  '<div class="cancel-search" id ="'; 
    var _cancelSearchMarkupPost =  '"></div>';  
        
    // Define behaviors

    var appendCancelSearch = function(id) {
        // Inject a Cancel Search element        
        var el = id + _filterLabel;
        // Make a version of the ID without the pound sign (#)
        var _id = id.split('#');
        $(el).append(_cancelSearchMarkupPre + _id[1] + _cancelSearch + _cancelSearchMarkupPost);
    };

    var armCancelSearch = function(id) {
        // Define the cancel Search event and specify its handler
        var el = id + _cancelSearch;
        // Get the dataTables object for the table; since the table already
        // exists, this just returns the object
        var table = $(id).dataTable();

        $(el).on( 'click', function (e) {
            // Invoke the callback
            cancelSearch(table, id);
        });
    };

    var cancelSearch  = function(table, tableId) {
        // Cancel the active search by emptying the filter input element and
        // refiltering the table.
        // @table : an object that was instantiated by DataTables when creating the table
        
        // Make a selector specific to this table
        var sel = tableId + _filterInput;

        // Empty the search input element
        $(sel).val('');

        // Check the table object
        if ( !(table) ) {
            throw new Error('CancelSearch() expected a table object and received:', table);
            return false;
        };

        // Refilter the table
        filterTable(table, "");
    };

    var filterTable = function(table, filterstring) {
        // Filter the table rows using the filterstring
        
        // Check the table object
        if ( !(table) ) {
            throw new Error('FilterTable() expected a table object and received:', table);
            return false;
        };
        // Apply filter using Datatables.net method on table object
        table.fnFilter(filterstring);
    };

    var fixInfoMargin = function(table) {
        // Tweak CSS for optimal alignment:
        //  If two button pagination is used, revise the margin on the info block.
        //  [ Only necessary because we don't own the table maker plugin
        //    so we have to hack on it. ]            //      
        var el = table + "_paginate";
        var twoButtonPaging = $(el).hasClass('paging_two_button');
        
        if ( twoButtonPaging ) {

            var el = table + "_info";
            $(el).css({ "margin-top": "1em" });
        };
    }; 

    init = function(_id) {
        // Given an ID of a table, apply extra Metreaux goodness        
        var id = _id || "";
        var _f = id + _dataTables_wrapper;
        
        // If such a table exists, annotate it
        if ( $(_f).length > 0 ) {
            injectPlaceholder( id );
            appendCancelSearch( id );
            armCancelSearch( id );
            fixInfoMargin( id );
        };
        // Handle the pagination
        paginate(); 
    };

    var injectPlaceholder = function(id) {
        // Inject a placeholder element into the search input element
        var el = id + _filterInput;
        $(el).attr('placeholder', 'Type a search term');
    };

    var paginate = function() {
        // Do some brutal editing to the default pagination UI.
        // NOTE: we do not mean to be brutal ourselves, but the goal was to make
        // this project a worry-free drop-in to use WITH the original Jquery plugin,
        // and not a fork/replacement to it.  Thus, we are forced to deal with 
        // the plugin's somewhat uninspired handling of the pagination elements.
        
        // See if two button pagination has been elected
        var _p = $('.dataTables_paginate.paging_two_button a');
        // Remove Next/Previous text
        if ( _p.length ) {
            $(_p).text("");
        };

        // See if full number pagination has been elected
        var _p = $('.dataTables_paginate.paging_full_numbers');
        // Remove Next/Previous text
        if ( _p.length ) {
            // Reselect to get only anchors without spans which hold page numbers
            // That is, we want only First, Previous, Next and Last. 
            $('.dataTables_paginate.paging_full_numbers > a').text("");
        };
    };
  
    // Export public methods
        return {
            "init":    init
        };
    }
);
    