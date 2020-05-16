<?php

$cfg	= array(
	'sar'	=> array(
		'blocks'	=> array(
			// Blocs to ignore
			'ignore'		=> array( 'TTY', 'rawch/s', 'iCPU' ),
		),
		'columns'	=> array(
			// Columns with duplicates
			'duplicates'	=> array( 'alloc', 'fail', 'ov' ),
		),
		'os'		=> array(
			// OS 
			// First column -> category (CPU/DISK/MEM/NET/SYS/TASKS) / multiple same hours (0/1) / limit
			'AIX'		=> array(
				'iget/s'	=> array(
					'category'	=> 'DISK',
					'multiple'	=> 0,
				),
				'bread/s'	=> array(
					'category'	=> 'DISK',
					'multiple'	=> 0,
				),
				'scall/s'	=> array(
					'category'	=> 'SYS',
					'multiple'	=> 0,
				),
				'device'	=> array(
					'category'	=> 'DISK',
					'multiple'	=> 1,
				),
				'ksched/s'	=> array(
					'category'	=> 'SYS',
					'multiple'	=> 0,
				),
				'msg/s'	=> array(
					'category'	=> 'CPU',
					'multiple'	=> 0,
				),
				'runq-sz'	=> array(
					'category'	=> 'SYS',
					'multiple'	=> 0,
				),
				'slots'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'%usr'	=> array(
					'category'	=> 'CPU',
					'multiple'	=> 0,
				),
				'proc-sz'	=> array(
					'category'	=> 'TASKS',
					'multiple'	=> 0,
				),
				'cswch/s'	=> array(
					'category'	=> 'TASKS',
					'multiple'	=> 0,
				),
			),
			'Linux'		=> array(
				'proc/s'	=> array(
					'category'	=> 'TASKS',
					'multiple'	=> 0,
				),
				'cswch/s'	=> array(
					'category'	=> 'TASKS',
					'multiple'	=> 0,
				),
				'CPU'	=> array(
					'category'	=> 'CPU',
					'multiple'	=> 1,
					'limit'		=> 'all',
				),
				'INTR'	=> array(
					'category'	=> 'SYS',
					'multiple'	=> 1,
					'limit'		=> 'sum',
				),
				'iCPU'	=> array(
					'category'	=> 'CPU',
					'multiple'	=> 1,
				),
				'pswpin/s'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'tps'	=> array(
					'category'	=> 'DISK',
					'multiple'	=> 0,
				),
				'frmpg/s'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'IFACE-ERRS'	=> array(
					'category'	=> 'NET',
					'multiple'	=> 1,
				),
				'IFACE-TRSF'	=> array(
					'category'	=> 'NET',
					'multiple'	=> 1,
				),
				'DEV'	=> array(
					'category'	=> 'DISK',
					'multiple'	=> 1,
				),
				'call/s'	=> array(
					'category'	=> 'NET',
					'multiple'	=> 0,
				),
				'scall/s'	=> array(
					'category'	=> 'NET',
					'multiple'	=> 0,
				),
				'pgpgin/s'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'kbmemfree'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'kbswpfree'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'kbhugfree'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'dentunusd'	=> array(
					'category'	=> 'SYS',
					'multiple'	=> 0,
				),
				'totsck'	=> array(
					'category'	=> 'NET',
					'multiple'	=> 0,
				),
				'tcp6sck'	=> array(
					'category'	=> 'NET',
					'multiple'	=> 0,
				),
				'runq-sz'	=> array(
					'category'	=> 'TASKS',
					'multiple'	=> 0,
				),
				'nCPU'	=> array(
					'category'	=> 'CPU',
					'multiple'	=> 1,
					'limit'		=> 'all',
				),
			),
			'Solaris'	=> array(
				'%usr'	=> array(
					'category'	=> 'CPU',
					'multiple'	=> 0,
				),
				'device'	=> array(
					'category'	=> 'DISK',
					'multiple'	=> 1,
				),
				'runq-sz'	=> array(
					'category'	=> 'TASKS',
					'multiple'	=> 0,
					),
				'bread/s'	=> array(
					'category'	=> 'DISK',
					'multiple'	=> 0,
				),
				'swpin/s'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'scall/s'	=> array(
					'category'	=> 'SYS',
					'multiple'	=> 0,
				),
				'iget/s'	=> array(
					'category'	=> 'DISK',
					'multiple'	=> 0,
				),
				'proc-sz'	=> array(
					'category'	=> 'SYS',
					'multiple'	=> 0,
				),
				'msg/s'	=> array(
					'category'	=> 'TASKS',
					'multiple'	=> 0,
				),
				'atch/s'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'pgout/s'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'freemem'	=> array(
					'category'	=> 'MEM',
					'multiple'	=> 0,
				),
				'sml_mem'	=> array(
					'category'	=> 'SYS',
					'multiple'	=> 0,
				),
			),
		),
	),
);

?>
