import san from 'san';
import {router} from 'san-router';
import s from './task3.san';

router.add({rule: '/', Component: s, target: 'body'});
router.start();
console.log('task3');