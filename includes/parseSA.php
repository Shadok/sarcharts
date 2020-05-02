<?php

require_once( dirname (__FILE__) . '/config.php' );

// Declare the output array
$out		= array();

// Do we have some reboot traces ?
$restart	= 0;
$restart_list	= array();

// Extracting and formatting sar date
function extract_date( $string )
{
	// YYYY-MM-DD or YYYY/MM/DD format
	if( preg_match( '/([0-9]{4})[\/\-](0[1-9]|1[0-2])[\/\-](0[1-9]|[1-2][0-9]|3[0-1])/', $string, $data ) )
	{
		$date	= $data[1] . '-' . $data[2] . '-' . $data[3];
	}
	// MM-DD-YYYY or MM/DD/YYYY format
	else if( preg_match( '/(0[1-9]|1[0-2])[\/\-](0[1-9]|[1-2][0-9]|3[0-1])[\/\-]([0-9]{4})/', $string, $data ) )
	{
		$date	= $data[3] . '-' . $data[1] . '-' . $data[2];
	}
	// MM-DD-YY or MM/DD/YY format
	else if( preg_match( '/(0[1-9]|1[0-2])[\/\-](0[1-9]|[1-2][0-9]|3[0-1])[\/\-]([0-9]{2})/', $string, $data ) )
	{
		$date	= '20' . $data[3] . '-' . $data[1] . '-' . $data[2];
	}
	// Any other format. Set it as an empty date
	else
	{
		$date	= 'unknown';
	}

	return $date;
}

function parse_sar_info( $data )
{
	global $out, $restart, $restart_list;

	// Data presentation
	$data	= preg_replace( "/(\r?\n){2,}/", "\n\n", $data );	// remove multiple empty lines by one
	$data   = trim( $data );					// remove empty lines at start and end of file

	// First line
	$header	= rtrim( strtok( $data, "\n" ) );

	// OS detection
	$os	= "Linux";
		// (Fucking) Solaris
	if( stripos( $header, "SunOS" ) !== false )
	{
		$os	= "Solaris";
	}
		// (Almost-as-fucking) AIX
	else if( stripos( $header, "AIX" ) !== false )
	{
		$os	= "AIX";
	}

	// Dealing with server informations
	$server	= preg_split( '/\s+/', $header );
	switch( $os )
	{
		case "AIX":
			$server_infos	= array(
				'os'		=> $os . ' ' . $server[3] . '.' . $server[2],
				'family'	=> $os,
				'kernel'	=> $server[4],
				'hostname'	=> $server[1]
			);
			break;
		case "Linux":
			$server_infos	= array(
				'os'		=> $os,
				'family'	=> $os,
				'kernel'	=> $server[1],
				'hostname'	=> trim( $server[2], '()' )
			);
			// Getting CPU arch if specified
			if( isset( $server[4] ) )
			{
				$server_infos['os']	.= ' ' . trim( $server[4], '_' );
			}
			break;
		case "Solaris":
			$server_infos	= array(
				'os'		=> $os . ' ' . $server[2] . ' ' . $server[4],
				'family'	=> $os,
				'kernel'	=> $server[3],
				'hostname'	=> $server[1]
			);
			break;
	}

	// Do we face a multiple days file ?
	$nbDays		= substr_count( $data, $server_infos['hostname'] );

	if( $nbDays > 1 )
	{
		// Getting all the dates from the multiple sar exports
		preg_match_all( "/.*" . $server_infos['hostname'] . ".*([0-9]{2,4}[\/\-][0-9]{2,4}[\/\-][0-9]{2,4}).*\n/", $data, $result );
		$dates	= $result[1];

		// Splitting sar exports from the data
		$split	= preg_split( "/.*" . $server_infos['hostname'] . ".*\n/", $data );
		array_shift( $split );

		unset( $result, $data );

		// Extracting and formatting sar dates
		foreach( $dates as $index => $date )
		{
			$dates[$index]	= extract_date( $date );
		}

		// Parsing data in ascending order
		asort( $dates );
		foreach( $dates as $index => $date )
		{
			parse_data( $split[$index], $os, $date );
		}

		$server_infos['date']	= implode( ', ', $dates );
		unset( $dates );
	}
	else
	{
		$server_infos['date']	= extract_date( $header );
		parse_data( $data, $os );
	}

	// Regrouping all restart times into a string
	$restart_list	= implode( ', ', $restart_list );

	return array( 'success' => 1, 'data' => $out, 'infos' => array( 'nb_days' => $nbDays, 'server' => $server_infos, 'restart' => $restart, 'restart_list' => $restart_list ) );
}

function parse_data( $data, $os, $date = '' )
{
	global $cfg, $out, $restart, $restart_list;

	// IFACE blocks
	$nbIfaceBlocks	= 0;

	// Did we have a reboot trace in that file ?
	$local_restart	= false;
	if( preg_match( "#([0-9]{2}:[0-9]{2}:[0-9]{2} ?[AP]?M?).*RESTART.*#i", $data, $matches ) !== false && isset( $matches[1] ))
	{
		$local_restart	= true;
		$restart++;
		$restart_list[]	= $date . " " . date( "H:i:s", strtotime( $matches[1] ) );
	}

	// (Fucking) Solaris
	if( $os == "Solaris" )
	{
		$data	= preg_replace("/(\r?\n){2,}([0-9]{2}:[1-9][0-9]:[0-9]{2})/", "\n$2", $data );
		$data	= preg_replace("/(\r?\n){2,}([0-9][1-9]:[0-9]{2}:[0-9]{2})/", "\n$2", $data );
		$data	= preg_replace("/(\r?\n){2,}([1-9]0:[0-9]{2}:[0-9]{2})/", "\n$2", $data );
		$data	= preg_replace("/(\r?\n){2,}(00:0[1-9]:[0-9]{2})/", "\n$2", $data );
	}
	// (Almost-as-fucking) AIX
	else if( $os == "AIX" )
	{
		$data	= preg_replace("/(\r?\n){2,}([0-9]{2}:[1-9][0-9]:[0-9]{2})/", "\n$2", $data );
		$data	= preg_replace("/(\r?\n){2,}([0-9][1-9]:[0-9]{2}:[0-9]{2})/", "\n$2", $data );
		$data	= preg_replace("/(\r?\n){2,}([1-9]0:[0-9]{2}:[0-9]{2})/", "\n$2", $data );
		$data	= preg_replace("/(\r?\n){2,}(00:0[1-9]:[0-9]{2})/", "\n$2", $data );

		$data	= preg_replace( "/[\n\r].*System configuration.*[\n\r]/i", "", $data );	// remove System configuration lines
	}
	// Linux
	else
	{
		// Special trick since we have 2 CPU blocks, we rename the one about CPU interruptions
		$data	= str_replace( 'CPU  i000/s', 'iCPU  i000/s', $data );
		// And here's a third on sysstat 11+, about CPU and network
		$data	= str_replace( 'CPU   total/s', 'nCPU   total/s', $data );
	}

	// Separate data groups using empty lines
	$groups	= preg_split( "#\n\s*\n#Uis", $data );
	unset( $data );

	// If we face a single sar file, first group is the server informations
	if( empty( $date ) )
	{
		unset( $groups[0] );
	}

	// For each data groups
	foreach( $groups as $index => $data )
	{
		// Ignoring Average blocks
		if( substr( $data, 0, 7 ) == "Average" )
		{
			continue;
		}

		// Divide output by lines and refill the array
		$data	= explode( "\n", $data );

		// We ignore blocks of only one line
		if( count( $data ) < 2 )
		{
			unset( $groups[$index] );
			continue;
		}

		// Loop throw data array, remove all spaces between columns and avoid splitting time string
		foreach ($data as $key => $item)
		{
			$item		= preg_replace( '/\s([AP])M/', '_$1M', $item );
			$item		= preg_replace( array('/\s{2,}/', '/[\t\n]/'), ' ', $item );
			$item		= rtrim( $item );
			$data[$key] 	= explode( " ", $item );
		}

		$block		= '';
		$firstLine	= false;

		// Loop throw data array to filter non-data values and send data values to output array
		foreach( $data as $key_row => $row_array )
		{
			// Ignoring empty or Average lines
			if( (count( $row_array ) == 1 && empty( $row_array[0] )) || stripos( $row_array[0], 'Average' ) !== false )
			{
				continue;
			}

			// Storing line hour for column index, if we have one (damned Solaris again ...)
			if( !empty( $row_array[0] ) )
			{
				$hour	= str_replace( '_', ' ', $row_array[0] );

				// Convert time to universal format
				$hour	= date( "H:i", strtotime( $hour ) );
			}

			// If we start a new block
			if( $hour == '00:00' || !$firstLine )
			{
				$firstLine	= true;
				$block		= $row_array[1];

				// In case we have data post midnight at the end of a block
				if( !isset( $cfg['sar']['os'][$os][$block] ) )
				{
					$firstLine	= false;
					continue;
				}

				// Blocks to ignore
				if( in_array( $block, $cfg['sar']['blocks']['ignore'] ) )
				{
					continue;
				}

				// Special renaming for IFACE block since we need both
				if( $block == 'IFACE' )
				{
					// As we can have multiple IFACE blocks with the same columns (in case of one or more reboots), we need to count the IFACE blocks we faced to determine which suffix it belongs to
					if( $nbIfaceBlocks %2 == 0 )
					{
						$block	.= '-TRSF';
					}
					else
					{
						$block	.= '-ERRS';
					}
					$nbIfaceBlocks++;
				}

				// Use block to define the type of data we are facing
				if( empty( $out[$block]['config'] ) )
				{
					$out[$block]['config']	= $cfg['sar']['os'][$os][$block];
				}

				// Parsing all columns to get their title
				if( !empty( $out[$block]['columns'] ) )
				{
					continue;
				}
				else if( !empty( $out[$block]['config']['multiple'] ) )
				{
					for( $i = 2; $i < count( $row_array ); $i++ )
					{
						// We store the previous parsed column in case the current one exists multiple times
						if( in_array( $row_array[$i], $cfg['sar']['columns']['duplicates'] ) )
						{
							$row_array[$i]	.=	'-' . $previousColumn;
						}

						$out[$block]['columns'][($i-2)]	= $row_array[$i];
						$previousColumn	= $row_array[$i];
					}
				}
				else
				{
					for( $i = 1; $i < count( $row_array ); $i++ )
					{
						// Sometimes, a block can be splitted in more than one, so we try to detect that to avoid declaring twice some columns
						if( empty( $out[$block]['columns'] ) || !$local_restart || !in_array( $row_array[$i], $out[$block]['columns'] ) )
						{
							// We store the previous parsed column in case the current one exists multiple times
							if( in_array( $row_array[$i], $cfg['sar']['columns']['duplicates'] ) )
							{
								$row_array[$i]	.= '-' . $previousColumn;
							}
							// Special case for the tps block to avoid duplicate column names 
							else if( $block == 'tps' )
							{
								$row_array[$i]	.= '-all';
							}

							if( $block == 'tps' && isset( $out[$block]['columns'] ) && in_array( $row_array[$i], $out[$block]['columns'] ) )
							{
								break;
							}
							else
							{
								$out[$block]['columns'][]	= $row_array[$i];
								$previousColumn = $row_array[$i];
							}
						}
					}
				}

				continue;
			}

			// Blocks to ignore
			if( in_array( $block, $cfg['sar']['blocks']['ignore'] ) )
			{
				continue;
			}

			// If it's a repeat of the block headers, we ignore the line
			if( isset( $row_array[1] ) && $row_array[1] === $block )
			{
				continue;
			}

			// If we're running a block with multiple lines with the same hour
			if( !empty( $out[$block]['config']['multiple'] ) )
			{
				$subblock	= $row_array[1];
				// Loop throw each key in a row. Second level
				for( $i = 2; $i < count( $row_array ); $i++ )
				{
					$out[$block]['data'][$date . ' ' . $hour][$subblock][]	= $row_array[$i];
				}
			}
			else
			{
				// Loop throw each key in a row. Second level
				for( $i = 1; $i < count( $row_array ); $i++ )
				{
					$out[$block]['data'][$date . ' ' . $hour][]	= $row_array[$i];
				}
			}
		}
	}
}

?>
