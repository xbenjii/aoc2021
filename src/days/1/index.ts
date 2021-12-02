function preprocess(input: string) {
    return input.split(/\n/).filter(Boolean).map(Number);
}

function countIncreases(input: number[]) {
    return input.reduce((acc, curr, i) => {
        if (i === 0) return acc;
        if (curr > input[i - 1]) return acc + 1;
        return acc;
    }, 0);
}

function slidingWindow(input: number[], windowSize: number) {
    return Array.from({
        length: input.length - (windowSize - 1)
    }, (_, index) => input.slice(index, index + windowSize));
}

function sumSlidingWindows(input: number[][]) {
    return input.map(window => window.reduce((acc, curr) => acc + curr, 0));
}

export async function run(input: string) {
    const data = preprocess(input);
    console.log(countIncreases(data));
    const slidingWindowData = slidingWindow(data, 3);
    console.log(countIncreases(sumSlidingWindows(slidingWindowData)));
}