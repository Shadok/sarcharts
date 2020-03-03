var lang	= {};
lang.titles	= {
	'cpu':
	{
		'AIX':
		{
			'msg/s': "Number of IPC message primitives",
			'sema/s': "Number of IPC semaphore primitives",

			'%usr': ["Percentage of CPU utilization that occurred while executing at the user level (application).","Note that this field does NOT include time spent running virtual processors"],
			'%sys': ["Percentage of CPU utilization that occurred while executing at the system level (kernel). Note that this field does NOT include time spent servicing hardware and software interrupts"],
			'%wio': "Percentage of time that the CPU or CPUs were idle during which the system had an outstanding disk I/O request",
			'%idle': "Percentage of time that the CPU or CPUs were idle and the system did not have an outstanding disk I/O request",
			'physc': ["Reports the number of physical processors consumed.","This data will be reported if the partition is dedicated and enabled for donation, or is running with shared processors or simultaneous multithreading enabled"],
			'%entc': ["Reports the percentage of entitled capacity consumed. This will be reported only if the partition is running with shared processors.","Because the time base over which this data is computed can vary, the entitled capacity percentage can sometimes exceed 100%. This excess is noticeable only with small sampling intervals"],
		},
		'Linux':
		{
			'%usr': ["Percentage of CPU utilization that occurred while executing at the user level (application).","Note that this field does NOT include time spent running virtual processors"],
			'%user': ["Percentage of CPU utilization that occurred while executing at the user level (application).","Note that this field includes time spent running virtual processors"],
			'%nice': "Percentage of CPU utilization that occurred while executing at the user level with nice priority",
			'%sys': ["Percentage of CPU utilization that occurred while executing at the system level (kernel).","Note that this field does NOT include time spent servicing hardware and software interrupts"],
			'%system': ["Percentage of CPU utilization that occurred while executing at the system level (kernel).","Note that this field includes time spent servicing hardware and software interrupts"],
			'%iowait': "Percentage of time that the CPU or CPUs were idle during which the system had an outstanding disk I/O request",
			'%steal': "Percentage of time spent in involuntary wait by the virtual CPU or CPUs while the hypervisor was servicing another virtual processor",
			'%irq': "Percentage of time spent by the CPU or CPUs to service hardware interrupts",
			'%soft': "Percentage of time spent by the CPU or CPUs to service software interrupts",
			'%guest': "Percentage of time spent by the CPU or CPUs to run a virtual processor",
			'%gnice': "Percentage of time spent by the CPU or CPUs to run a niced guest",
			'%idle': "Percentage of time that the CPU or CPUs were idle and the system did not have an outstanding disk I/O request",

			'total/s': "The total number of network frames processed per second",
			'dropd/s': "The total number of network frames dropped per second because there was no room on the processing queue",
			'squeezd/s': "The number of times the softirq handler function terminated per second because its budget was consumed or the time limit was reached, but more work could have been done",
			'rx_rps/s': "The number of times the CPU has been woken up per second to process packets via an inter-processor interrupt",
			'flw_lim/s': ["The number of times the flow limit has been reached per second.","Flow limiting is an optional RPS feature that can be used to limit the number of packets queued to the backlog for each flow to a certain amount.","This can help ensure that smaller flows are processed even though much larger flows are pushing packets in"],
		},
		'Solaris':
		{
			'%usr': "Lists the percentage of time that the processor is in user mode",
			'%sys': "Lists the percentage of time that the processor is in system mode",
			'%wio': "Lists the percentage of time that the processor is idle and waiting for I/O completion",
			'%idle': "Lists the percentage of time that the processor is idle and not waiting for I/O",
		}
	},
	'disk':
	{
		'AIX':
		{
			'iget/s': ["Calls to any of several i-node lookup routines that support multiple file system types.","The iget routines return a pointer to the i-node structure of a file or device"],
			'lookuppn/s': "Calls to the directory search routine that finds the address of a v-node given a path name",
			'dirblk/s': "Number of 512-byte blocks read by the directory search routine to locate a directory entry for a specific file",

			'bread/s': "Number of read block I/O operations",
			'lread/s': "Number of read logical I/O requests",
			'%rcache': "Cache hit percentage for reading operations",
			'bwrit/s': "Number of write block I/O operations",
			'lwrit/s': "Number of write logical I/O requests",
			'%wcache': "Cache hit percentage for writing operations",
			'pread/s': "Number of I/O read operations on raw devices",
			'pwrit/s': "Number of I/O write operations on raw devices",

			'%busy': "Portion of time the device was busy servicing a transfer request",
			'avque': "Average number of requests waiting to be sent to disk",
			'r+w/s': "Read-write transfers from a device in kilobytes/second",
			'Kbs/s': "Read-write transfers to a device in kilobytes/second",
			'avwait': "Average wait time per request in milliseconds",
			'avserv': "Average service time per request in milliseconds",
		},
		'Linux':
		{
			'tps-all': ["Total number of transfers per second that were issued to physical devices.","A transfer is an I/O request to a physical device. Multiple logical requests can be combined into a single I/O request to the device.","A transfer is of indeterminate size"],
			'rtps-all': "Total number of read requests per second issued to physical devices",
			'wtps-all': "Total number of write requests per second issued to physical devices",
			'bread/s-all': ["Total amount of data read from the devices in blocks per second.","Blocks are equivalent to sectors and therefore have a size of 512 bytes"],
			'bwrtn/s-all': "Total amount of data written to devices in blocks per second",

			'tps': ["Total number of transfers per second that were issued to physical devices.","A transfer is an I/O request to a physical device. Multiple logical requests can be combined into a single I/O request to the device.","A transfer is of indeterminate size"],
			'rd_sec/s': "The number of sectors (kilobytes, megabytes) read from the device per second",
			'wr_sec/s': "The number of sectors (kilobytes, megabytes) written to the device per second",
			'avgrq-sz': "The average size (in sectors) of the requests that were issued to the device",
			'avgqu-sz': "The average queue length of the requests that were issued to the device",
			'rkB/s': "Number of kilobytes read from the device per second",
			'wkB/s': "Number of kilobytes written to the device per second",
			'areq-sz': ["The average size (in kilobytes) of the I/O requests that were issued to the device.","Note: In previous versions, this field was known as avgrq-sz and was expressed in sectors"],
			'aqu-sz': ["The average queue length of the requests that were issued to the device.","Note: In previous versions, this field was known as avgqu-sz"],
			'await': ["The average time (in milliseconds) for I/O requests issued to the device to be served.","This includes the time spent by the requests in queue and the time spent servicing them. "],
			'svctm': "The average service time (in milliseconds) for I/O requests that were issued to the device",
			'%util': ["Percentage of elapsed time during which I/O requests were issued to the device (bandwidth utilization for the device).","Device saturation occurs when this value is close to 100% for devices serving requests serially.","But for devices serving requests in parallel, such as RAID arrays and modern SSDs, this number does not reflect their performance limits."],
		},
		'Solaris':
		{
			'device': "Name of the disk device that is being monitored",
			'%busy': "Portion of time the device was busy servicing a transfer request",
			'avque': "Average number of requests during the time the device was busy servicing a transfer request",
			'r+w/s': "Number of read-and-write transfers to the device, per second",
			'blks/s': "Number of 512-byte blocks that are transferred to the device, per second",
			'avwait': ["Average time, in milliseconds, that transfer requests wait idly in the queue.","This time is measured only when the queue is occupied"],
			'avserv': ["Average time, in milliseconds, for a transfer request to be completed by the device.","For disks, this value includes seek times, rotational latency times, and data transfer times"],

			'bread/s': "Average number of reads per second that are submitted to the buffer cache from the disk",
			'lread/s': "Average number of logical reads per second from the buffer cache",
			'%rcache': "Fraction of logical reads that are found in the buffer cache (100 % minus the ratio of bread/s to lread/s)",
			'bwrit/s': "Average number of physical blocks (512 bytes) that are written from the buffer cache to disk, per second",
			'lwrit/s': "Average number of logical writes to the buffer cache, per second",
			'%wcache': "Fraction of logical writes that are found in the buffer cache (100 % minus the ratio of bwrit/s to lwrit/s)",
			'pread/s': "Average number of physical reads, per second, that use character device interfaces",
			'pwrit/s': "Average number of physical write requests, per second, that use character device interfaces",

			'iget/s': "The number of requests made for inodes that were not in the directory name look-up cache (DNLC)",
			'namei/s': ["The number of file system path searches per second.","If namei does not find a directory name in the DNLC, it calls iget to get the inode for either a file or directory. Hence, most igets are the result of DNLC misses"],
			'dirbk/s': "The number of directory block reads issued per second",
		}
	},
	'mem':
	{
		'AIX':
		{
			'slots': "Number of free pages on the paging spaces",
			'cycle/s': "Number of page replacement cycles per second",
			'fault/s': ["Number of page faults per second.","This is not a count of page faults that generate I/O, because some page faults can be resolved without I/O"],
			'odio/s': "Number of non paging disk I/Os per second",
		},
		'Linux':
		{
			'pswpin/s':	"Total number of swap pages the system brought in per second",
			'pswpout/s': "Total number of swap pages the system brought out per second",

			'pgpgin/s': "Total number of kilobytes the system paged in from disk per second",
			'pgpgout/s': "Total number of kilobytes the system paged out to disk per second",
			'fault/s': ["Number of page  faults (major + minor) made by the system per second.","This is not a count of page faults that generate I/O, because some page faults can be resolved without I/O"],
			'majflt/s': "Number of major faults the system has made per second, those which have required loading a memory page from disk",
			'pgfree/s': "Number of pages placed on the free list by the system per second",
			'pgscank/s': "Number of pages scanned by the kswapd daemon per second",
			'pgscand/s': "Number of pages scanned directly per second",
			'pgsteal/s': "Number of pages the system has reclaimed from cache (pagecache and swapcache) per second to satisfy its memory demands.",
			'%vmeff': ["Calculated as pgsteal / pgscan, this is a metric of the efficiency of page reclaim.","If it is near 100% then almost every page coming off the tail of the inactive list is being reaped.","If it gets too low (e.g. less than 30%) then the virtual memory is having some difficulty.","This field is displayed as zero if no pages have been scanned during the interval of time"],

			'frmpg/s': ["Number of memory pages freed by the system per second.","A negative value represents a number of pages allocated by the system. Note that a page has a size of 4 kB or 8 kB according to the machine architecture."],
			'bufpg/s': ["Number of additional memory pages used as buffers by the system per second.","A negative value means fewer pages used as buffers by the system."],
			'campg/s': ["Number of additional memory pages cached by the system per second.","A negative value means fewer pages in the cache."],

			'kbmemfree': "Amount of free memory available in kilobytes",
			'kbavail': ["Estimate of how much memory in kilobytes is available for starting new applications, without swapping.","The estimate takes into account that the system needs some page cache to function well, and that not all reclaimable slab will be reclaimable, due to items being in use.","The impact of those factors will vary from system to system"],
			'kbmemused': ["Amount of used memory in kilobytes","(calculated as total installed memory - kbmemfree - kbbuffers - kbcached - kbslab)"],
			'%memused': "Percentage of used memory",
			'kbbuffers': "Amount of memory used as buffers by the kernel in kilobytes",
			'kbcached': "Amount of memory used to cache data by the kernel in kilobytes",
			'kbcommit': ["Amount of memory in kilobytes needed for current workload.","This is an estimate of how much RAM/swap is needed to guarantee that there never is out of memory"],
			'%commit': ["Percentage of memory needed for current workload in relation to the total amount of memory (RAM+swap).","This number may be greater than 100% because the kernel usually overcommits memory"],
			'kbactive': "Amount of active memory in kilobytes (memory that has been used more recently and usually not reclaimed unless absolutely necessary)",
			'kbinact': "Amount of inactive memory in kilobytes (memory which has been less recently used. It is more eligible to be reclaimed for other  purposes)",
			'kbdirty': "Amount of memory in kilobytes waiting to get written back to the disk",
			'kbanonpg': "Amount of non-file backed pages in kilobytes mapped into userspace page tables",
			'kbslab': "Amount of memory in kilobytes used by the kernel to cache data structures for its own use",
			'kbkstack': "Amount of memory in kilobytes used for kernel stack space",
			'kbpgtbl': "Amount of memory in kilobytes dedicated to the lowest level of page tables",
			'kbvmused': "Amount of memory in kilobytes of used virtual address space",

			'kbswpfree': "Amount of free swap space in kilobytes",
			'kbswpused': "Amount of used swap space in kilobytes",
			'%swpused': "Percentage of used swap space",
			'kbswpcad': ["Amount of cached swap memory in kilobytes.","This is memory that once was swapped out, is swapped back in but still also is in the swap area","(if memory is needed it doesn't need to be swapped out again because it is already in the swap area. This saves I/O)"],
			'%swpcad': "Percentage of cached swap memory in relation to the amount of used swap space",

			'kbhugfree': "Amount of hugepages memory in kilobytes that is not yet allocated",
			'kbhugused': "Amount of hugepages memory in kilobytes that has been allocated",
			'%hugused': "Percentage of total hugepages memory that has been allocated",
		},
		'Solaris':
		{
			'swpin/s': "The number of LWP transfers into memory per second",
			'bswin/s': "The number of blocks transferred for swap-ins per second",
			'swpot/s': ["The average number of processes that are swapped out of memory per second.","If the number is greater than 1, you might need to increase memory"],
			'bswot/s': "The number of blocks that are transferred for swap-outs per second",
			'pswch/s': "The number of kernel thread switches, per second",

			'atch/s': ["The number of page faults, per second, that are satisfied by reclaiming a page currently in memory (attaches per second).","Instances include reclaiming an invalid page from the free list and sharing a page of text that is currently being used by another process.","An example is two or more processes that are accessing the same program text"],
			'pgin/s': "The number of times, per second, that file systems receive page-in requests",
			'ppgin/s': ["The number of pages paged in, per second.","A single page-in request, such as a soft-lock request (see slock/s) or a large block size, might involve paging-in multiple pages"],
			'pflt/s': ["The number of page faults from protection errors.","Instances of protection faults indicate illegal access to a page and \"copy-on-writes\". Generally, this number consists primarily of \"copy-on-writes\""],
			'vflt/s': ["The number of address translation page faults, per second.","These faults are known as validity faults. Validity faults occur when a valid process table entry does not exist for a given virtual address"],
			'slock/s': ["The number of faults, per second, caused by software lock requests that require physical I/O.","An example of the occurrence of a soft-lock request is the transfer of data from a disk to memory."," The system locks the page that is to receive the data so that the page cannot be claimed and used by another process"],

			'pgout/s': "The number of page-out requests per second",
			'ppgout/s': ["The actual number of pages that are paged-out, per second.","A single page-out request might involve paging-out multiple pages"],
			'pgfree/s': "The number of pages, per second, that are placed on the free list",
			'pgscan/s': ["The number of pages, per second, that are scanned by the page daemon.","If this value is high, the page daemon is spending a lot of time checking for free memory. This situation implies that more memory might be needed."],
			'%ufs_ipf': ["The percentage of ufs inodes taken off the free list by iget that had reusable pages that are associated with them. These pages are flushed and cannot be reclaimed by processes.","Thus, this field represents the percentage of igets with page flushes. A high value indicates that the free list of inodes is page-bound, and that the number of ufs inodes might need to be increased"],

			'freemem': ["The average number of memory pages that are available to user processes over the intervals sampled by the command.","Page size is machine-dependent"],
			'freeswap': "The number of 512-byte disk blocks that are available for page swapping",
		}
	},
	'net':
	{
		'AIX':
		{
		},
		'Linux':
		{
			'rxpck/s': "Total number of packets received per second",
			'txpck/s': "Total number of packets transmitted per second",
			'rxkB/s': "Total number of kilobytes received per second",
			'txkB/s': "Total number of kilobytes transmitted per second",
			'rxbyt/s': "Total number of kilobytes received per second",
			'txbyt/s': "Total number of kilobytes transmitted per second",
			'rxcmp/s': "Number of compressed packets received per second",
			'txcmp/s': "Number of compressed packets transmitted per second",
			'rxmcst/s': "Number of multicast packets received per second",
			'%ifutil': ["Utilization percentage of the network interface.","For half-duplex interfaces, utilization is calculated using the sum of rxkB/s and txkB/s as a percentage of the interface speed.","For full-duplex, this is the greater of rxkB/S or txkB/s"],

			'rxerr/s': "Total number of bad packets received per second",
			'txerr/s': "Total number of errors that happened per second while transmitting packets",
			'coll/s': "Number of collisions that happened per second while transmitting packets",
			'rxdrop/s': "Number of received packets dropped per second because of a lack of space in linux buffers",
			'txdrop/s': "Number of transmitted packets dropped per second because of a lack of space in linux buffers",
			'txcarr/s': "Number of carrier-errors that happened per second while transmitting packets",
			'rxfram/s': "Number of frame alignment errors that happened per second on received packets",
			'rxfifo/s': "Number of FIFO overrun errors that happened per second on received packets",
			'txfifo/s': "Number of FIFO overrun errors that happened per second on transmitted packets",

			'call/s': "Number of RPC requests made per second",
			'retrans/s': "Number of RPC requests per second, those which needed to be retransmitted (for example because of a server timeout)",
			'read/s': "Number of 'read' RPC calls made per second",
			'write/s': "Number of 'write' RPC calls made per second",
			'access/s': "Number of 'access' RPC calls made per second",
			'getatt/s': "Number of 'getattr' RPC calls made per second",

			'scall/s': "Number of RPC requests received per second",
			'badcall/s': "Number of bad RPC requests received per second, those whose processing generated an error",
			'packet/s': "Number of network packets received per second",
			'udp/s': "Number of UDP packets received per second",
			'tcp/s': "Number of TCP packets received per second",
			'hit/s': "Number of reply cache hits per second",
			'miss/s': "Number of reply cache misses per second",
			'sread/s': "Number of 'read' RPC calls received per second",
			'swrite/s': "Number of 'write' RPC calls received per second",
			'saccess/s': "Number of 'access' RPC calls received per second",
			'sgetatt/s': "Number of 'getattr' RPC calls received per second",

			'totsck': "Total number of sockets used by the system",
			'tcpsck': "Number of TCP sockets currently in use",
			'udpsck': "Number of UDP sockets currently in use",
			'rawsck': "Number of RAW sockets currently in use",
			'ip-frag': "Number of IP fragments currently in use",
			'tcp-tw': "Number of TCP sockets in TIME_WAIT state",
		},
		'Solaris':
		{
		}
	},
	'sys':
	{
		'AIX':
		{
			'scall/s': "Total number of system calls",
			'sread/s': "Total number of read system calls",
			'swrit/s': "Total number of write system calls",
			'fork/s': "Total number of fork system calls",
			'exec/s': "Total number of exec system calls",
			'rchar/s': "Total number of characters transferred by read system calls",
			'wchar/s': "Total number of characters transferred by write system calls",

			'ksched/s': "Number of kernel processes assigned to tasks per second",
			'kproc-ov': "Number of times kernel processes could not be created because of enforcement of process threshold limit",
			'kexit/s': "Number of kernel processes terminating per second",

			'runq-sz': "Average number of kernel threads in the run queue",
			'%runocc': "Percentage of the time the run queue is occupied",
			'swpq-sz': "Average number of kernel threads that are waiting in the virtual memory manager queue for resource, input, or output",
			'%swpocc': "Percentage of the time the swap queue is occupied",
		},
		'Linux':
		{
			'intr/s': "Show the total number of interrupts received per second by the CPU or CPUs",

			'dentunusd': "Number of unused cache entries in the directory cache",
			'file-nr': "Number of file handles used by the system",
			'file-sz': "Number of file handles used by the system",
			'inode-nr': "Number of inode handlers used by the system",
			'inode-sz': "Number of inode handlers used by the system",
			'pty-nr': "Number of pseudo-terminals used by the system",
			'super-sz': "Number of pseudo-terminals used by the system",
			'%super-sz': "Percentage of allocated super block handlers with regard to the maximum number of super block handlers that Linux can allocate",
			'dquot-sz': "Number of allocated disk quota entries",
			'%dquot-sz': "Percentage of allocated disk quota entries with regard to the maximum number of cached disk quota entries that can be allocated",
			'rtsig-sz': "Number of queued RT signals",
			'%rtsig-sz': "Percentage of queued RT signals with regard to the maximum number of RT signals that can be queued",
		},
		'Solaris':
		{
			'scall/s': "The number of all types of system calls per second, which is generally about 30 per second on a system with 4 to 6 users",
			'sread/s': "The number of read system calls per second",
			'swrit/s': "The number of write system calls per second",
			'fork/s': ["The number of fork system calls per second, which is about 0.5 per second on a system with 4 to 6 users.","This number increases if shell scripts are running"],
			'exec/s': "The number of exec system calls per second. If exec/s divided by fork/s is greater than 3, look for inefficient PATH variables",
			'rchar/s': "The number of characters (bytes) transferred by read system calls per second",
			'wchar/s': "The number of characters (bytes) transferred by write system calls per second",

			'proc-sz': "The number of process entries (proc structures) that are currently being used, or allocated, in the kernel",
			'ov-proc-sz': "The overflows that occur between sampling points for the process table",
			'inod-sz': "The total number of inodes in memory compared to the maximum number of inodes that are allocated in the kernel. This number is not a strict high watermark. The number can overflow",
			'ov-inod-sz': "The overflows that occur between sampling points for the inodes table",
			'file-sz': "The size of the open system file table. The sz is given as 0, because space is allocated dynamically for the file table",
			'ov-file-sz': "The overflows that occur between sampling points for the open system file table",
			'lock-sz': "The number of shared memory record table entries that are currently being used, or allocated, in the kernel. The sz is given as 0 because space is allocated dynamically for the shared memory record table",

			'sml_mem': ["The amount of memory, in bytes, that the KMA has available in the small memory request pool.","In this pool, here a small request is less than 256 bytes."],
			'alloc-sml_mem': "The amount of memory, in bytes, that the KMA has allocated from its small memory request pool to small memory requests",
			'fail-alloc-sml_mem': "The number of requests for small amounts of memory that failed",
			'lg_mem': ["The amount of memory, in bytes, that the KMA has available in the large memory request pool.","In this pool, a large request is from 512 bytes to 4 Kbytes."],
			'alloc-lg_mem': "The amount of memory, in bytes, that the KMA has allocated from its large memory request pool to large memory requests",
			'fail-alloc-lg_mem': "The number of failed requests for large amounts of memory",
			'ovsz_alloc': ["The amount of memory that is allocated for oversized requests, which are requests that are greater than 4 Kbytes.","These requests are satisfied by the page allocator. Thus, there is no pool."],
			'fail-ovsz_alloc': "The number of failed requests for oversized amounts of memory",
		}
	},
	'tasks':
	{
		'AIX':
		{
			'proc-sz': "Number of entries in use in the process table",
			'inod-sz': "Number of entries in use in the inode table",
			'file-sz': "Number of entries in use in the file table",
			'thrd-sz': "Number of entries in use in the kernel-thread table",

			'cswch/s': "Total number of context switches per second",
		},
		'Linux':
		{
			'proc/s': "Total number of tasks created per second",
			'cswch/s': "Total number of context switches per second",

			'runq-sz': "Run queue length (number of tasks waiting for run time)",
			'plist-sz': "Number of tasks in the process list",
			'ldavg-1': ["System load average for the last minute.","The load average is calculated as the average number of runnable or running tasks (R state),","and the number of tasks in uninterruptible sleep (D state) over the specified interval"],
			'ldavg-5': "System load average for the past 5 minutes",
			'ldavg-15': "System load average for the past 15 minutes",
			'blocked': "Number of tasks currently blocked, waiting for I/O to complete",
		},
		'Solaris':
		{
			'runq-sz': ["The number of kernel threads in memory that are waiting for a CPU to run.","Typically, this value should be less than 2. Consistently higher values mean that the system might be CPU-bound"],
			'%runocc': "The percentage of time that the dispatch queues are occupied",
			'swpq-sz': "The average number of swapped out processes",
			'%swpocc': "The percentage of time in which the processes are swapped out",

			'msg/s': "The number of message operations (sends and receives) per second",
			'sema/s': "The number of semaphore operations per second",
		}
	},
};
