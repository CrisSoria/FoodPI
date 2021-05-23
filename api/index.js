//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const typeModel = require("./src/controllers/type.js");
const { conn } = require("./src/db.js");

const initialTypes = [
  "lacto vegetarian",
  "ovo vegetarian",
  "vegan",
  "pescatarian",
  "paleo",
  "primal",
  "whole30",
];

const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log("%s listening at " + PORT); // eslint-disable-line no-console
    });
  })
  .then(() => {
    initialTypes.map((type) => {
      typeModel.add({ name: type });
    });
  });
