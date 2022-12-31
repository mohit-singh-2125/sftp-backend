let express = require("express");
var path = require('path');
let router = express.Router();
var browseDir = require("browse-directory");
let Moment = require("moment");
var tree1 = browseDir.browse("node_modules");
var tree2 = browseDir.browseFiles("node_modules");
var tree3 = browseDir.browseDirs("node_modules");
const dirTree = require("directory-tree");
const tree = dirTree("../../Learning/wedding-invite");

let paths = [];
let ext = ["\\.png", "\\.mp3", "\\.mp4"];
const processChildren = (array) => {
  for (let i = 0; i < array.length; i++) {
    ext.map((e) => {
      if (array[i].path.search(e) !== -1) {
        paths.push(array[i].path);
      }
    });

    if (array[i].children !== undefined) {
      if (array[i].children.length !== 0) {
        processChildren(array[i].children);
      }
    }
  }
};

const listDirectory = (req, res) => {
  let resp = [];
  let dirs = tree.children;
  processChildren(dirs);
  console.log("sdasadadsdas", paths);
  for (let i = 0; i < paths.length; i++) {
    resp.push({
      key: paths[i].slice(5),
      modified: +Moment().subtract(1, "hours"),
      size: 1.5 * 1024 * 1024,
    });
  }
  console.log("ssssss", paths);
  paths = [];
  return res.status(200).json({
    dirs: resp,
  });
};

const downloadFile = (req, res) => {
  console.log("sdsdsdsdasdasdasda", req.body);
  let options = {
    root: path.join("../../"),
  };
  return res.sendFile(path.resolve(`${req.body.filePath}`), options, function (err) {
    if (err) {
   console.log("err",err)
    } else {
      console.log("Sent:", 'app.js');
    }
  });

  // return res.status(200).json({
  //   message: "SUCCESS",
  // });
};

router.get("/list", listDirectory);
router.post("/download", downloadFile);

module.exports = router;
