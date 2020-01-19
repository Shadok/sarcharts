<?php

header( "Content-Type: application/json;charset=utf-8" );

if( empty( $_FILES ) )
{
	echo json_encode( array( 'success' => 0, 'error' => "No file was uploaded" ) );
	exit( 1 );
}
else if ( 0 < $_FILES['file']['error'] )
{
	switch( $_FILES['file']['error'] )
	{
		case UPLOAD_ERR_INI_SIZE:
			$_FILES['file']['error']	= "The uploaded file exceeds the server limitation (" . (int)(ini_get('upload_max_filesize')) . " Mb max.)";
			break;
		case UPLOAD_ERR_PARTIAL:
			$_FILES['file']['error']	= "The uploaded file was only partially uploaded";
			break;
		case UPLOAD_ERR_NO_FILE:
			$_FILES['file']['error']	= "No file was uploaded";
			break;
		case UPLOAD_ERR_NO_TMP_DIR:
			$_FILES['file']['error']	= "Missing a temporary folder";
			break;
		case UPLOAD_ERR_CANT_WRITE:
			$_FILES['file']['error']	= "Failed to write file to disk";
			break;
		case UPLOAD_ERR_EXTENSION:
			$_FILES['file']['error']	= "Forbidden file type, it has to be a text file ending with .txt";
			break;
		default:
			$_FILES['file']['error']	= "Unknown upload error";
			break;
	}

	echo json_encode( array( 'success' => 0, 'error' => $_FILES['file']['error'] ) );
	exit( 1 );
}
else
{
	$sar_file	= dirname (__FILE__) . '/../uploads/' . $_FILES['file']['name'];
	move_uploaded_file( $_FILES['file']['tmp_name'], $sar_file );
	$sar		= file_get_contents( $sar_file );
	unlink( $sar_file );

	require_once( dirname (__FILE__) . '/../includes/parseSA.php' );
	$result		= parse_sar_info( $sar );

	echo json_encode( $result );
}

?>
