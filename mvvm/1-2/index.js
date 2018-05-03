const san = require('san');
const router = require('san-router').router;
const root = require('./root.san');
// 设置组件在页面中的位置
router.add({ rule: '/', Component: root, target: '#body' });

router.start();
console.log('task2');