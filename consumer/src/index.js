// import {initialize} from './initialize'
// workaround for webpack html plugin immediate src loading
// initialize();
const root = document.getElementById('root')
if (root) {
    import('./bootstrap').then(module => module.default())
} else {
    console.log('LOADING REACT APP ROOT ELEMENT...')
}

// import bootstrap from "./bootstrap";
// bootstrap();
