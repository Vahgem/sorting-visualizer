import { swap } from './helpers';

const partition = (array, start, end, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    let pivot = array[end];
    let i = start - 1;
    for (let j = start; j < end; j++){
        if (array[j] <= pivot) {
            i++;
            array = swap(array, i, j);
            colorKey[j] = 1;
            colorKey[i] = 1;
            arraySteps.push(array.slice());
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[i] = 0;
        }
    }
    array = swap(array, i + 1, end);
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
    return i + 1;
}

const quickSort=(array, start, end,arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    if (start < end) {
        let pi = partition(array, start, end,arraySteps, colorSteps);
        colorKey[pi] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
        array = quickSort(array, start, pi - 1,arraySteps, colorSteps);
        array = quickSort(array, pi + 1, end,arraySteps, colorSteps);
    }
    else if (start == end) {
        colorKey[start] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    return array;
}

const qs = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    array = quickSort(array, 0, array.length - 1,arraySteps, colorSteps);
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(3);
    return;
};
export default qs;