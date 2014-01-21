# Metreaux Tables


![Metreaux table sample](http://www.cssian.com/metreaux/tables/sample_reduced.png "Metreaux Table sample")


## Contents
1. What is this project?
1. What is [DataTables.net]?
1. How is the project implemented?
1. What are the component files?
1. What is with the dumb name?

[DataTables.net]:http://datatables.net/


## What is this project?
**Metreaux Tables** adds style rules and (optionally) behavior to HTML tables enhanced by the Jquery plugin, Datatables, to give the tables a look and feel similar to the ~~Metro~~, ~~Modern~~, Windows 8 UI style. 

The project is implemented as an "add on" to Datatables; it is _not_ a plugin nor is it a fork or replacement.  In other words you add Datatables to your project, and then you add Metreaux Tables.

#### Version
1.0

#### License
MIT

## What is Datatables?
[DataTables.net] may be the richest, most flexible Jquery-based HTML table enhancer out there. There are, of course, hundred of others and _your mileage may indeed vary_.  But I find myself coming back to the plugin again and again, with ever increasing needs for design control, options, performance, etc. and am always impressed with it.  It's quite simple for novices to use, and contains all of the options and features demanded by experts. Check it out.

## Features and Implementation
This project consists of a small collection of CSS files and an optional JS file.

### The CSS
95% of the project's value is implemented in the CSS files; they (re)style the elements and classes already used by the plugin to result in a flat design style similar to Windows 8.

I say *restyle* because in most cases, the Metreaux Tables CSS is designed to **overwrite** the native CSS of the plugin. Therefore, it's crucial to follow the loading order requirements described below. (In brief, be sure to load Datatables' native CSS before the CSS from this project.)

The CSS is delivered in a series of files, as follows:
* layout.css - this is used by the project demo page (You don't need this)
* metreaux.css - a general container of Metreaux styles; required
* metreaux-table - a collection of crucial, non-visual style rules; required
* metreaux-table-theme-* - a series of different 'theme' files; one is required

Theme files show how to style the visual elements of Datatables to bring about the colors, hues and pallette that you need. Smush them altogether for production.

*Note*: the project uses the [LESS] preprocessor. Each CSS file has a corresponding LESS "source" file.

[LESS]:http://less.github.io/

### The JavaScript

A little extra sugar is provided by the optional JS file, *metreaux-table.js*.  Using this script brings the following to your tables:

* A visual element adjacent to the Search/Filter input box to clear the current search string (if any)
* Some alignment to the Metreaux style page numbers when DataTables' "full_numbers" pagination is used

## Dependencies
The requirements for other software are as follows:
* DataTables - doh! I hope this one is obvious; required
* JQuery - a dependency of DataTables so this shouldn't be a problem; required
* [Modernizr] - this script is used to detect browser support for SVG images; optional

####Notes
1. This version requires DataTables version **1.9x**.
1. Any build of Modernizr that includes the SVG feature test will be adequate.

[Modernizr]:http://modernizr.com/

### SVG Images
The project includes SVG images for the few visual elements used in a table's overall scaffolding. Fallback to plain-old-PNGs is provided for in the CSS.

The force the use of PNGs, simply assing the class "dont-use-svg" on a higher level containing element relative to your table. Something like a containg DIV or SECTION of even the BODY tag will work just fine.


## How to Implement
Implementation is easy. Follow these steps:

###CSS

In the HEAD of your html file, implement the DataTables CSS file, followed by the CSS file(s) from this project, like so:


* link rel="stylesheet" href="css/jquery.dataTables.css"
* link rel="stylesheet" href="css/metreaux.css"
* link rel="stylesheet" href="css/metreaux-table.css"
* link rel="stylesheet" href="css/metreaux-table-theme-default.css"

Remember to put all Metreaux CSS file **after** the DataTables CSS file.

If all you are interested in is styling, then stop here : You're *done!*

###Javascript

If you want to implement the optional JS-enabled behavior on your table, do the following:

* Initialize the table (per the instructions given by the DataTables plugin):
```
var MyCoolTable = $('#my-table-id').dataTable( {/ options go here / });
```

* Apply the Metreaux Table JS to the table:
```
MT.init('#my-table-id');
```

That's it....

#### Multiple Tables per Page

For pages with multiple tables, repeat the process shown above for each table.

(Note that you can initialize multiple tables as DataTables in one call, but this project doesn't suppor that. You have to apply the Metreaux Table js to each table separately.)

## About the Demo Index Page
The **index.html** file in this project demonstrates how to implement both DataTables and Metreaux Tables.

It also makes use of an additional script file that implements some JS functionality **used only** by the demo page. (For 
example, it handles the skin-changing feature and toggles the table pagination from simple to full numbers.)

You can ignore the demo index page and its script. 
  
