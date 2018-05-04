import san from 'san';
import {router} from 'san-router';
import root from './root.san';

router.add({rule: '/', Component: root, target: 'body'});

router.start();
console.log('task6');