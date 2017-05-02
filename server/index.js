"use strict";

import cluster from "cluster";
import core from "os";

if (cluster.isMaster) {
  for (var i = 0; i < core.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log("worker " + worker.process.pid + " died");
  });
} else {
  require("./server");
}
