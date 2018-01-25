
const fs = require('fs');

function Vue(obj){
  let regexp1 = new RegExp(`<(\\w+) id=(?:"${obj.el}"|'${obj.el}')>[\\S\\s]*</\\1>`, 'g');
  this.data = new Map();
  this.walk('', obj.data);
  this.replace(regexp1);
}
Vue.prototype = {
  walk(pre, data){
    for(let key in data){
      let url = pre === '' ? key : pre+'.'+key;

      if(typeof data[key] === 'object'){
        this.walk(url, data[key]);
      }

      this.data.set(url, data[key]);
    }
  },
  replace(reg1){

    fs.readFile(__dirname+'/test.html', 'utf8', (err, result)=>{
      if(err){ return console.log(err); }
      // console.log(result.match(reg1));
      this.data.forEach(function(value, key, map){
        result = result.replace(`{{${key}}}`, value);
      });
      console.log(result);
    });
  },
};

//
let v = new Vue({
  el: 'app',
  data: {
    user: {
      name: 'user11',
      age: 0,
    },
  },
});
