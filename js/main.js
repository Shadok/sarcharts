var charts	= [];
var infos	= {};
var lineColors	= ['#c0392b', '#e74c3c', '#9b59b6', '#8e44ad', '#2980b9', '#3498db', '#1abc9c', '#16a085', '#27ae60', '#2ecc71', '#f1c40f', '#f39c12', '#e67e22', '#d35400', '#bdc3c7', '#95a5a6', '#7f8c8d', '#34495e', '#2c3e50'];
var menuActive	= 'start';

// Add alert on top of the page (warning, danger, success, info)
function addAlert( type, message )
{
	var html = "<div class=\"alert alert-dismissible alert-" + type + "\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" + message + "</div>";
	$('#alert').html( html );
	$('#alert').removeClass('d-none');
	$("html, body").animate( { scrollTop: 0 }, 1500);
}

// Add an entry in a menu
function addMenuEntry( title, menu, id )
{
	$('#menu-' + menu).next('div.dropdown-menu').append( "<a class=\"dropdown-item\" data-anchor=\"a-" + id + "\">" + title + "</a>" );
}

// Display server informations
function displayInformations()
{
	// Did the server restarted during the day ?
	if( infos.restart )
	{
		infos.restart	= "Please note, the server has restarted at " + infos.restart_time + " !";
	}
	else
	{
		infos.restart	= '';
	}

	$('#infos').html( "SAR for the " + infos.server.os + " server " + infos.server.hostname + " (" + infos.server.kernel + ") from the " + infos.server.date + ". " + infos.restart );
}

// Extract data from sar json
function extractSarData( sar, idColumn, group, multiple)
{
	var group	= group || '';
	var multiple	= multiple || 0;

	var data	= {
		labels: [],
		values: {},
	};

	if( group.length == 0 && multiple == 0 )
	{
		data.values	= [];
	}

	$.each( sar, function( hour, value ) {
		data.labels.push( hour );

		if( group.length == 0 )
		{
			if( multiple == 1 )
			{
				$.each( value, function( cat, subvalue ) {
					if( !(cat in data.values) )
					{
						data.values[cat]	= [];
					}
					data.values[cat].push( subvalue[idColumn] );
				});
			}
			else
			{
				data.values.push( value[idColumn] );
			}
		}
		else
		{
			if( !(group in data.values ) )
			{
				data.values[group]	= [];
			}
			data.values[group].push( value[group][idColumn] );
		}
	});

	return data;
}

// Generate a pdf with all the graphs
function generatePDF()
{
	var doc = new jsPDF( { compress: true, putOnlyUsedFonts: true, unit: 'px' } );
	doc.setProperties({
		title: "SAR graphs of " + infos.server.hostname + " for the " + infos.server.date ,
		subject: "SAR for the " + infos.server.os + " server " + infos.server.hostname + " (" + infos.server.kernel + ") from the " + infos.server.date + ". " + infos.restart,
		author: 'SAR Charts : https://github.com/Shadok/sarcharts',
		keywords: '',
		creator: 'Shadok'
	});

	var pageWidth	= doc.internal.pageSize.width;
	var pageHeight	= doc.internal.pageSize.height;
	var maxWidth	= (pageWidth - 50);
	var maxHeight	= (pageHeight - 50);
	var margin		= 15;

	doc.setFontType( "bold" );
	doc.setFontSize( 16 );
	doc.text( "SAR Charts", 25, 25 );

	doc.setFontSize( 22 );
	doc.text( "SAR graphs for " + infos.server.hostname, (pageWidth / 2), (pageHeight / 2 - 33), {align: 'center'} );
	doc.setFontSize( 20 );
	doc.text( infos.server.os + " - " + infos.server.kernel + " - " + infos.server.date, (pageWidth / 2), (pageHeight / 2 + 33), {align: 'center'} );

	doc.setFontSize( 16 );
	doc.text( "https://github.com/Shadok/sarcharts", (pageWidth - 25), (pageHeight - 25), {align: 'right'} );

	doc.setFontSize( 22 );
	doc.addPage();
	
	var pdfctxX	= 25;
	var pdfctxY	= 25;
	
	// For each selected graph
	$('img.selected').each( function( index, element ) {
		var canvas		= $(this).next( 'canvas' );
		var cid			= canvas.attr( 'id' );

		// Get the chart height/width
		var canvasHeight	= canvas.innerHeight();
		var canvasWidth		= canvas.innerWidth();

		if( canvasWidth > maxWidth )
		{
			var ratio	= (maxWidth / canvasWidth);
			canvasWidth	= (canvasWidth * ratio);
			canvasHeight	= (canvasHeight * ratio );
		}

		if( (pdfctxY + canvasHeight) > (maxHeight + 25 ) )
		{
			doc.addPage();
			pdfctxY	= 25;
		}

		canvas			= document.querySelector( '#' + cid );
		var canvas_img		= canvas.toDataURL( 'image/png',1.0 );

		// Draw the chart into the new canvas
		if( canvas_img.length > 10 )
		{
			doc.addImage( canvas_img, 'PNG', pdfctxX, pdfctxY, canvasWidth, canvasHeight );
			pdfctxY	+= canvasHeight + margin;
		}
	});

	doc.setFontType( "normal" );
	doc.setFontSize( 10 );
	var pageCount	= doc.internal.getNumberOfPages();
	for( i = 2; i <= pageCount; i++ )
	{ 
		doc.setPage( i ); 
		doc.text( (pageWidth-30),(pageHeight-10), doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount );
	}

	doc.output( 'dataurlnewwindow' );
}

// Get some data to graph
// os / sar data / limited columns to show / forced menu block destination
function getGraphData( os, sar, limitColumns, destination )
{
	var limitColumns	= limitColumns || [];
	var destination		= destination || '';

	if( typeof sar === 'undefined' )
	{
		return false;
	}

	var group	= '';
	// We may limit what to show when data has subcategories (ex: with cpu we limit to all insteand of showing a graph for each core)
	if( sar.config && sar.config.limit )
	{
		group	= sar.config.limit;
	}

	var category	= sar.config.category.toLowerCase();
	if( destination.length == 0 )
	{
		destination	= category;
	}

	var data	= '';
	if( limitColumns.length > 0 )
	{
		$.each( limitColumns, function( idLimit, nameLimit ) {
			$.each( sar.columns, function ( idColumn, nameColumn ) {
				if( nameLimit == nameColumn )
				{
					title	= lang.titles[category][os][nameColumn];
					data	= extractSarData( sar.data, idColumn, group, sar.config.multiple );
					graphData( nameColumn, data, title, destination, sar.config.multiple );
				}
			});
		});
	}
	else
	{
		$.each( sar.columns, function ( idColumn, nameColumn ) {
			title	= lang.titles[category][os][nameColumn];
			data	= extractSarData( sar.data, idColumn, group, sar.config.multiple );
			graphData( nameColumn, data, title, destination, sar.config.multiple );
		});
	}

	return data;
}

// Graph some data
function graphData( column, data, title, destination, multiple)
{
	var multiple	= multiple || 0;
	var cid		= destination + "-" + column.replace( /[&\/\\#,+()$~%.'":*?<>{}]/g, '_' );

	$('#graph-' + destination).append( "<div class=\"graph\" id=\"a-" + cid + "\"><img class=\"icon-pdf unselected\" src=\"./images/pdf_unselected.png\"><canvas id=\"" + cid + "\" class=\"rounded\"></canvas></div>" );
	addMenuEntry( column, destination, cid );

	var ratio	= 3;

	var datasets	= [];
	if( multiple == 0 )
	{
		var lineColor	= lineColors[Math.floor(Math.random()*lineColors.length)];

		datasets	= [{
			label: column,
			data: data.values,
			fill: false,
			borderColor: lineColor,
		}];
	}
	else
	{
		$.each( data.values, function( name, dataset ) {
			var lineColor	= lineColors[Math.floor(Math.random()*lineColors.length)];

			datasets.push( {
				label: name,
				data: dataset,
				fill: false,
				borderColor: lineColor,
			});
		}); 

		ratio	= 3 - (datasets.length/100);
		if( ratio < 0.8 ) ratio = 0.8;
	}

	var timeFormat	= 'HH:mm';
	var dragOptions = {
		animationDuration: 1000,
		 borderColor: 'rgba(255,255,255,0.3)',
		 borderWidth: 5,
		 backgroundColor: 'rgb(255,255,255)'
	};

	var chart	= new Chart( $('#' + cid), {
		data: {
			labels: data.labels,
			datasets: datasets,
		},
		options: {
			aspectRatio: ratio,
			plugins: {
				zoom: {
					zoom: {
						enabled: true,
						drag: dragOptions,
						mode: 'x',
						speed: 0.05,
						onZoom: function ( chart ) { updateAllCharts( chart.chart.options.scales.xAxes[0].ticks.min, chart.chart.options.scales.xAxes[0].ticks.max ) }
					},
					pan: {
						enabled: true,
						mode: 'x',
						onPan: function ( chart ) { updateAllCharts( chart.chart.options.scales.xAxes[0].ticks.min, chart.chart.options.scales.xAxes[0].ticks.max ) }
					}

				}
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: column
					}
				}],
				xAxes: [{
					type: 'time',
					time: {
						parser: timeFormat,
						tooltipFormat: timeFormat,
						displayFormats: {
							second: timeFormat,
							minute: timeFormat,
							hour: timeFormat
						}
					},
					scaleLabel: {
						display: true,
						labelString: 'Heure'
					},
					ticks: {
						autoSkip: true,
						autoSkipPadding: 50
					}
				}],
			},
			title: {
				display: true,
				text: title
			},
		},
		type: 'line',
	});

	charts.push( chart );
}

// Graph a resume
function graphResume( sar, os )
{
	switch( os )
	{
		case 'AIX':
			getGraphData( os, sar['%usr'], ['%usr','%sys','%wio'], 'resume' );
			getGraphData( os, sar['slots'], ['slots','odio/s'], 'resume' );
			break;
		case 'Linux':
			getGraphData( os, sar['runq-sz'], ['ldavg-1','ldavg-5','ldavg-15'], 'resume' );
			getGraphData( os, sar['CPU'], ['%user', '%usr', '%nice', '%iowait'], 'resume' );
			getGraphData( os, sar['kbmemfree'], ['%memused', '%swpused'], 'resume' );
			getGraphData( os, sar['DEV'], ['%util'], 'resume' );
			break;
		case 'Solaris':
			getGraphData( os, sar['%usr'], ['%usr','%sys','%wio'], 'resume' );
			getGraphData( os, sar['freemem'], ['freemem', 'freeswap'], 'resume' );
			break;
	}
}

// Initiate graphing process
function initGraph( data )
{
	$('.nav-graph').removeClass('d-none');
	$('.nav-pdf').removeClass('d-none');
	$('#start').addClass('d-none');

	$('#menu-start').parent().removeClass('active');
	$('#menu-resume').parent().addClass('active');
	$('#graph-resume').removeClass('d-none');
	menuActive	= 'resume';

	infos		= data.infos;
	var os		= infos.server.family;
	displayInformations();
	
	// Put the more important data on the resume section
	graphResume( data.data, os );

	// Graph all we have on the other menus entries
	$.each( data.data, function( name, block ) {
		getGraphData( os, block );
	});

	// Remove empty blocks menu (e.g. Solaris and AIX don't report network data in sar)
	$('div.dropdown-menu').each( function( index, element ) {
		if( $(this).html().length < 10 )
		{
			$(this).parent('li.nav-graph').addClass('d-none');
		}
	});
}

// Remove alert on top of the page (warning, danger, success, info)
function removeAlert()
{
	$('#alert').addClass('d-none');
}

// Reset charts zoom and pan
function resetAllCharts()
{
	charts.forEach( function callback( chart ) {
		chart.chart.options.scales.xAxes[0].ticks.min	= null;
		chart.chart.options.scales.xAxes[0].ticks.max	= null;
		chart.update();
	});
}

// Apply pan/zoom on all charts
function updateAllCharts( min, max )
{
	charts.forEach( function callback( chart ) {
		chart.chart.options.scales.xAxes[0].ticks.min	= min;
		chart.chart.options.scales.xAxes[0].ticks.max	= max;
		chart.update();
	});
}

$(document).ready(function() {
	// Manual mode
	$('#submit-manual').click( function( event ) {
		event.preventDefault();
		removeAlert();
		$('#sarfile-manual-loading').removeClass('d-none');

		// Upload file and parse it
		var file_data	= $('#sarfile-upload').prop('files')[0];   
		var form_data	= new FormData();                  
		form_data.append( 'file', file_data );

		$.ajax({
			url: "/sarcharts/lib/uploadSA.php",
			dataType: 'json',
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,
			type: 'POST'
		})
		.fail( function() {
			$('#sarfile-manual-loading').addClass('d-none');
			addAlert( 'danger', "Unable to load the given text file!" );
		})
		.done( function( data ) {
			if( data.success == 0 )
			{
				$('#sarfile-manual-loading').addClass('d-none');
				addAlert( 'danger', data.error );
			}
			else
			{
				// Let's graph baby !
				initGraph( data );

				$('#sarfile-manual-loading').addClass('d-none');
			}
		});
	});

	// Main menu buttons click
	$('.nav-link[id]').click( function( event ) {
		event.preventDefault();
		menuId	= $(this).attr('id');
		if( menuId == 'menu-pdf' )
		{
			if( $('img.selected').length > 0 )
			{
				removeAlert();
				generatePDF();
			}
			else
			{
				addAlert( 'warning', "Please select at least one graph to export in PDF!" );
			}
		}
		else
		{
				$('#menu-' + menuActive).parent().removeClass('active');
				$(this).parent().addClass('active');
				$('#graph-' + menuActive).addClass('d-none');
				menuActive	= menuId.replace('menu-', '');

				if( menuActive != 'start' )
				{
					$("html, body").animate( { scrollTop: 0 }, 1500);
					$('#graph-' + menuActive).removeClass('d-none');
				}
				else
				{
					// Reset display
					$('.nav-graph').addClass('d-none');
					$('.nav-pdf').addClass('d-none');
					$('div.dropdown-menu').empty();
					$('#start').removeClass('d-none');			
					$('[id^=graph-]').html('');
					$('#infos').html( "You can zoom on the graphs by selecting an area of one of them, then unzoom with a double-click." );
					charts	= [];
				}
		}
	});

	// Submenu buttons click
	$("body").on('click', '.dropdown-item', function ( event ) {
		event.preventDefault();
		var anchor	= $(this).attr( 'data-anchor' );
		var menuParent	= $(this).parent( 'div.dropdown-menu' ).attr( 'aria-labelledby' ).replace( 'menu-', '' );
		$('#menu-' + menuActive).parent().removeClass('active');
		$('#menu-' + menuParent).parent().addClass('active');
		$('#graph-' + menuActive).addClass('d-none');
		menuActive	= menuParent;
		$('#graph-' + menuActive).removeClass('d-none');
		$("html, body").animate( { scrollTop: $('#' + anchor).offset().top }, 1500);
	});

	// Double-click on canvas
	$('[id^=graph-]').dblclick(function() {
		resetAllCharts();
	});

	// PDF selection
	$("body").on('click', 'img.unselected', function ( event ) {
		$(this).removeClass('unselected');
		$(this).addClass('selected');
		$(this).attr( 'src', './images/pdf_selected.png' );
	});

	$("body").on('click', 'img.selected', function ( event ) {
		$(this).removeClass('selected');
		$(this).addClass('unselected');
		$(this).attr( 'src', './images/pdf_unselected.png' );
	});
});
