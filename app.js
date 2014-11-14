var cluster = require('cluster'),
    AWS = require('aws-sdk');
    AWS.config.loadFromPath('./aws-credentials.json');

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
  var compression = require("compression"),
      express = require("express"),
      app = express(),
      fs = require('fs');

  app.use(compression());
  app.all('*', function(req, res){
//console.log(req);

 function resizeImage() {
      var gm = require('gm');

      if (c != 1) {
        var writeStream = fs.createWriteStream(cachedPath);
      }

      gm(originalFile).resize(w).quality(q).stream(streamType, function (err, s$
        stdout.pipe(res);
        if (c != 1) {
          stdout.pipe(writeStream);
        }
      });
    }

     var filePath = req.path.substr(1),
        f = filePath;
        f = f.replace(/([1,9]\d[0,9]\d|\d{3,})+(\.js)$/g,"js"),
        f = f.replace(/([1,9]\d[0,9]\d|\d{3,})+(\.css)$/g,"css"),
        f = f.replace(/(\+resize\.jpg)/g, ".jpg"),
        w = req.param("w"),
        c = req.param("c") || 0,
        q = req.param("q") || 100,
        fileName = f.split('/').join('|'),
        cachedPath = 'cache/' + fileName + '-' + w + '-' + q,
        originalFile = 's3/' + fileName,
        fileType = f.split('.'),
        // fileType = fileType[1],
        fileType = fileType[fileType.length - 1],
        resizeTheImage = false,
        contentType;


 if (filePath.indexOf('+resize') > 0) {
      resizeTheImage = true;
    }


    // Script files
    if (fileType ==  'css') {
      contentType = "text/css";
    }

    if (fileType ==  'js') {
      contentType = "application/javascript";
    }

    if (fileType ==  'svg') {
      contentType = "image/svg+xml";
    }

 if (fileType ==  'json') {
      contentType = "application/json";
    }

    // Fonts
    if (fileType ==  'woff') {
      contentType = "application/font-woff";
    }

    if (fileType ==  'eot') {
      contentType = "application/vnd.ms-fontobject";
    }

    if (fileType ==  'ttf') {
      contentType = "application/x-font-ttf";
    }

     // Image files
    if (fileType == 'jpg' || fileType == 'jpeg') {
      var contentType = "image/jpeg",
          streamType = 'jpg';
    }

    if (fileType == 'png') {
      var contentType = "image/png",
          streamType = 'png';
    }

    if (fileType == 'gif') {
      var contentType = "image/gif",
          streamType = 'gif';
    }

 res.set({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": contentType
    });

    if (f.indexOf('staging') == -1) {
      // Cache the file
      res.set({
        "Cache-Control": "public, max-age=31536000",
        "Expires": new Date(Date.now() + 31536000000).toUTCString()
      });
    } else {
      // Don't cache if it's in the staging directory
      res.set({
        "Cache-Control": "no-store, no-cache"
      })
    }

if (!resizeTheImage) {

      var s3 = new AWS.S3(),
          params = {Bucket: 'xxxx', Key: f};

      s3.getObject(params, function(error, data) {
        if (error != null) {
          res.send(404, '404');
          console.log(error.statusCode + ": " + f);
          console.log(error);
          res.end();
        } else {
          console.log("200: " + f);
          res.set({
            "ETag": data.ETag,
            "Content-Length": data.ContentLength,
            "Last-Modified": data.LastModified
          });
          res.write(data.Body);
          res.end();
        }
      });

    } else {
      fs.readFile(originalFile, function(err,data) {
        if (!err) {
          resizeImage();
        } else {
          // Get from S3, then resize
          var s3 = new AWS.S3(),
              s3Params = {Bucket: 'xxxx', Key: f},
              s3LocalFile = fs.createWriteStream(originalFile),
              saveS3File = s3.getObject(s3Params).createReadStream().pipe(s3Loc$

          saveS3File.on('close', function(response) {
            resizeImage();
          });

        }
      });
    }
  });

  app.listen(8080);
}
