let express = require("express");
let router = express.Router();
var browseDir = require("browse-directory");
var tree1 = browseDir.browse("node_modules");
var tree2 = browseDir.browseFiles("node_modules");
var tree3 = browseDir.browseDirs("node_modules");

console.log("saddsaadssad1", browseDir.showTree(tree1));
console.log("saddsaadssad2", tree2);
console.log("saddsaadssad3", tree3);

const listDirectory = (req, res) => {
    let resp=[]
    for (let i = 0; i < tree2.length; i++) {
        resp.push({
            key: tree2[i].src,
            modified: "",
            size: 1.5 * 1024 * 1024,
        })
        
    }
  let sample = {
    key: "photos/mohit/cat in a hat.png",
    // modified: +Moment().subtract(1, "hours"),
    size: 1.5 * 1024 * 1024,
  };

  return res.status(200).json({
    dirs: resp,
  });
};

router.get("/list", listDirectory);

module.exports = router;
