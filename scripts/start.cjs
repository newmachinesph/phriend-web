// `npm start` on Hostinger. The account's process limit (shared by every site on it) counts threads, and a Node process
// starts 4 libuv and 4 V8 worker threads by default, far more than this site needs. libuv reads UV_THREADPOOL_SIZE when
// its pool first starts, so it is set here before Next loads (CommonJS, so nothing has touched the pool yet); the V8
// pool size is the --v8-pool-size flag on the node command in package.json. An env var set on the host still wins.
process.env.UV_THREADPOOL_SIZE ??= "2";
console.log(`start: UV_THREADPOOL_SIZE=${process.env.UV_THREADPOOL_SIZE} node ${process.execArgv.join(" ")}`);
// eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS on purpose (see above)
require("next/dist/bin/next");
