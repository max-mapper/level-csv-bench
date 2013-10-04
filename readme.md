a couple of benchmarks for figuring out the fastest way to bulk load a very large CSV into leveldb

download `1994.csv.bz2` from http://stat-computing.org/dataexpo/2009/the-data.html and `bzip2 -d` into this directory as `1994.csv`

first benchmark is `raw.js`, which only parses csv rows, not cells, and stores each cell as a value in leveldb

second benchmark is `multibuffer.js`, which uses `multibuffer` to pack the csv cells into a single buffer and stores that

to run them:

```
npm install
time node raw.js
rm -rf test.db
time node multibuffer.js
```
