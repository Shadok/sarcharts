# SAR Charts
SAR Charts is a web interface to display the data, provided by SAR (System Activity Report, from sysstat package) on Linux and Unix servers, with charts.

Freely inspired from https://sarchart.dotsuresh.com/

As i am not a developer, there is much room for improvments in the code.

## Dependancies
* [Bootstrap](https://getbootstrap.com/ "Bootstrap homepage")
* [Bootswatch](https://bootswatch.com/ "Bootswatch homepage") and its free [Slate](https://bootswatch.com/slate/ "Slate theme homepage") theme
* [Chart.js](https://www.chartjs.org/ "Chart.js homepage") and its plugin [chartjs-plugin-zoom](https://github.com/chartjs/chartjs-plugin-zoom "chartjs-plugin-zoom repository")
* [Hammer.js](https://hammerjs.github.io/ "Hammer.js homepage")
* [JQuery](https://jquery.com/ "JQuery homepage")
* [JQueryUI](https://jqueryui.com/ "JQueryUI homepage")
* [jsPDF](https://github.com/MrRio/jsPDF "jsPDF repository")

## SAR compatibility
The only broken thing you will see, if you use a sar file from a more recent sysstat package than i have tested and implemented, is some graphs with "undefined" as a title or data not graphed.
I have tested SAR Charts with these OS and sysstat versions :
* AIX 6.1
* RHEL 3 to 7.6
* Solaris 5.8 to 5.11
* Ubuntu 12.04 to 18.04
* Sysstat 5.0.5 to 11.6.1

## How it works ?
SAR exported text file parsing is done by parseSA.php and config.php.
Each SAR data block is named with it's first data column name and classed into a category, according to config.php.
As we can have some duplicates in the columns names, the code do some renaming in known cases.
config help structuring the data, and can restrict data when we are in a block with multiple lines with the same hour (e.g.: the CPU main block with a line for each core - and one for all of them - for each time entry).

Then, the object is grabbed in json format by the main.min.js file which display the graphs, grouped by categories (as the exception of the "Resume" category, which i define in the javascript.

## Configuration
You need a webserver with PHP enabled (works with 5.5 and superior) to serve this web interface.
uploads folder needs to be writable by the web server user.

## License
SAR Charts is available under the [GNU GPL v3 license](https://www.gnu.org/licenses/gpl-3.0.en.html "GNU GPL v3 license").
