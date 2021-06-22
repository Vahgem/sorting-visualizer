import { swap } from './helpers';
const ss = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    let small;
    for (let i = 0; i < array.length -1; i++) {
        small = i;
        for (let j = i+1; j < array.length; j++) {
            if (array[j] < array[small]) {
                small = j;
            }
            arraySteps.push(array.slice());
            colorKey[small] = 1;
            colorKey[j] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[small] = 0;
            colorKey[j] = 0;
        }
        array = swap(array, small, i);
        colorKey[i] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(3);
    return;
};
export default ss;