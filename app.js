r = require('rethinkdb')


if (process.argv[2] == 'watch') {
  r.connect({
    host: 'localhost',
    port: 28015
  }, function(err, conn) {
    r.table('tv_shows').changes().run(conn, function(err, cursor) {
      cursor.each(console.log);
    })
  })
}

if (process.argv[2] == 'insert') {
  r.connect({
    host: 'localhost',
    port: 28015
  }, function(err, conn) {
    r.table('tv_shows').changes().run(conn, function(err, cursor) {
          r.table('tv_shows').insert({ name: process.argv[3] }).run(conn, function(err, res)
          {
            if(err) throw err;
            console.log(res);
          });
    })
  })
}
