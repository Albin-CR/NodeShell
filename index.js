import cluster from 'cluster'
import express from 'express'

if (cluster.isMaster) {
	cluster.fork();
	cluster.on('disconnect', function(worker) {
		console.error('disconnect!');
		cluster.fork();
		port=parseInt(process.argv[2]||80)
	});
}else{
	require('./server')
}
