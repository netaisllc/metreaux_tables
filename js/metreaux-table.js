/**
 *  METREAUX-TABLE . JS
 *
 *  Description:
 *      Add some Windows 8 style and a small amount of behavior to an HTML
 *      table formed by the jQuery plugin, dataTables.net.
 *
 *      ==>  CSS files do most of ther work, the JS script adds some nice
 *      decoration and behavior.  <==
 *
 *  Requires:
 *      Jquery 1.10+ or 2.x+
 *      Datatables.net, a plugin for Jquery and HTML tables
 *
 *  Use:
 *      Example:
 *          CSS: Apply the CSS after the plugin's CSS file...
 *              <link rel="stylesheet" href="css/jquery.dataTables.css" />   
 *              <link rel="stylesheet" href="css/metreaux-table.css" />
 *              
 *          JS: Include the script tag on the HTML page
 *              <script type="text/javascript" src="js/metreaux-table.js"></script>
 *
 *          JS: Call the decorator function on a specific table
 *              MT.init("#js-my-table");
 *              
 *  Code:
 *      The essential code is stored in a global variable which is really, really
 *      bad JS coding practice. But it's nice and simple for a demo. You are
 *      expected to revise things to merge the code into whatever JS organizing
 *      system works for you.
 *
 *      These functions provided additional features to your table(s), including:
 *          1) A decorated Filter element
 *          2) Events related to clearing the Filter element
 *          3) Over-writing content injected by the DataTables.net script when using
 *              'full-numbers' pagination mode.
 *
 *  Versions:
 *      0.1 -- 12-December-2013
 */

var MetreauxTable = {

    // Define strings
     
    _cancelSearch           :  "-cancel-search",
    _dataTables_wrapper     :  "_wrapper",
    _filterInput            :  "_filter.dataTables_filter label input",
    _filterLabel            :  "_filter.dataTables_filter label",
    _cancelSearchMarkupPre  :  '<div class="cancel-search" id ="',
    _cancelSearchMarkupPost :  '"></div>',
    
    // Define behaviors

    appendCancelSearch: function(id) {
        // Inject a Cancel Search element        
        var el = id + this._filterLabel;
        // Make a version of the ID without the pound sign (#)
        var _id = id.split('#');
        $(el).append(this._cancelSearchMarkupPre + _id[1] + this._cancelSearch + this._cancelSearchMarkupPost);
    },

    armCancelSearch: function(id) {
        // Define the cancel Search event and specify its handler
        var el = id + this._cancelSearch;
        // Get the dataTables object for the table; since the table already
        // exists, this just returns the object
        var table = $(id).dataTable();

        var self = this;
        $(el).on( 'click', function (e) {
            // Invoke the callback
            self.cancelSearch(table, id);
        });
    },

    cancelSearch : function(table, tableId) {
        // Cancel the active search by emptying the filter input element and
        // refiltering the table.
        // @table : an object that was instantiated by DataTables when creating the table
        
        // Make a selector specific to this table
        var sel = tableId + this._filterInput;

        // Empty the search input element
        $(sel).val('');

        // Check the table object
        if ( !(table) ) {
            throw new Error('CancelSearch() expected a table object and received:', table);
            return false;
        };

        // Refilter the table with null to cancel any currently active filter
        this.filterTable(table, "");
    },

    filterTable: function(table, filterstring) {
        // Refilter the table
        
        // Check the table object
        if ( !(table) ) {
            throw new Error('FilterTable() expected a table object and received:', table);
            return false;
        };
        // Apply filter using Datatables.net method on table object
        table.fnFilter(filterstring);
    },

    fixInfoMargin: function(table) {
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
    },    

    init: function(_id) {
        // Given an ID of a table, apply extra Metreaux goodness
        var id = _id || "";
        var _f = id + this._dataTables_wrapper;
        
        // If such a table exists, annotate it
        if ( $(_f).length > 0 ) {
            this.injectPlaceholder( id );
            this.appendCancelSearch( id );
            this.armCancelSearch( id );
            this.fixInfoMargin( id );
        };
        // Handle the pagination
        this.paginate(); 
    },

    injectPlaceholder:function(id) {
        // Inject a placeholder element into the search input element
        var el = id + this._filterInput;
        $(el).attr('placeholder', 'Type a search term');
    },

    paginate: function() {
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
    }
};
    