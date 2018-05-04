import san from 'san';
import {router} from 'san-router';
import style from './task5.san';

router.add({rule: '/', Component: style, target: 'body'});
router.start();
console.log('task5');