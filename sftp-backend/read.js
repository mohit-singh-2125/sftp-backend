let express = require("express");
let router = express.Router();
var browseDir = require("browse-directory");
let Moment = require("moment");
var tree1 = browseDir.browse("node_modules");
var tree2 = browseDir.browseFiles("node_modules");
var tree3 = browseDir.browseDirs("node_modules");
const dirTree = require("directory-tree");
const tree = dirTree("../../Learning/wedding-invite");
// console.log("asdasdsasasad", JSON.stringify(tree));
// console.log("asdasdsasasad", tree.children[1].children[5].children);
// console.log("saddsaadssad1", browseDir.showTree(tree1));
// console.log("saddsaadssad2", tree2);
// console.log("saddsaadssad3", tree3);
let paths = [];
const processChildren = (array) => {
  for (let i = 0; i < array.length; i++) {
    paths.push(array[i].path);
    if (array[i].children !== undefined) {
      if (array[i].children.length !== 0) {
        processChildren(array[i].children);
      }
    }
  }
};
const removeDuplicatePaths = (pathArr) => {
  let rr = [];
  for (let i = 0; i < pathArr.length; i++) {
    for (let j = 0; j < pathArr.length; j++) {
      // console.log("ASDadsdasdasdasdasdas",pathArr[j].search(pathArr[i]))
      if (pathArr[j].search(pathArr[i]) == -1) {

        if (pathArr[j].length > pathArr[i].length) {
          rr.push(pathArr[j]);
        } else {
          rr.push(pathArr[i]);
        }
      }
    }
  }
  return rr
};

const listDirectory = (req, res) => {
  let resp = [];
  for (let i = 0; i < tree2.length; i++) {
    resp.push({
      key: tree2[i].src,
      modified: +Moment().subtract(1, "hours"),
      size: 1.5 * 1024 * 1024,
    });
  }
  let dirs = tree.children;
  processChildren(dirs);
  console.log("sdasadadsdas", paths);
  // console.log("asdasdsad",removeDuplicatePaths(paths))
  let rrrr= removeDuplicatePaths(paths)
  for (let i = 0; i < rrrr.length; i++) {
    // if (dirs[i].children.length !== 0) {
    //   processChildren(dirs)
    // }
    resp.push({
      key: rrrr[i].slice(5),
      modified: +Moment().subtract(1, "hours"),
      size: 1.5 * 1024 * 1024,
    });
  }

  return res.status(200).json({
    dirs: resp,
  });
};

router.get("/list", listDirectory);

module.exports = router;
