import { swap } from './helpers';
const is = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    let current;
    for (let i = 0; i < array.length ; i++) {
        current = i;
        let j = i - 1;
        colorKey[current] = 1;
        while ((j >0||j===0) && array[current] < array[j]) {
            array = swap(array, current, j);
            colorKey[j] = 1;
            colorKey[current] = 0;
            current = j;
            j--;
            arraySteps.push(array.slice());
            colorSteps.push(colorKey.slice());
        }
        colorKey[current] = 0;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(3);
    return;
};
export default is;