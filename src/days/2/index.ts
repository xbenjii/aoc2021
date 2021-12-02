interface Movement {
    direction: string;
    distance: number;
}

function preprocess(input: string) {
    return input.split(/\n/).filter(Boolean).map((row) => {
        const [ direction, distance ] = row.split(/\s/);
        return { direction, distance: Number(distance) } as Movement;
    });
}

function move(inputs: Movement[]) {
    return inputs.reduce(([x, y], { direction, distance }) => {
        switch (direction) {
            case 'forward':
                return [x + distance, y];
            case 'down':
                return [x, y + distance];
            case 'up':
                return [x, y - distance];
            default:
                return [x, y];
        }
    }, [0, 0] as number[]);                      
}

function moveAndAim(inputs: Movement[]) {
    return inputs.reduce(([x, y, aim], { direction, distance }) => {
        switch (direction) {
            case 'forward':
                return [x + distance, y + (distance * aim), aim];
            case 'down':
                return [x, y, (aim + distance)];
            case 'up':
                return [x, y, (aim - distance)];
            default:
                return [x, y, aim];
        }
    }, [0, 0, 0] as number[]); 
}

export async function run(input: string) {
    const data = preprocess(input);
    const [x, y] = move(data);
    console.log(x * y);
    const [x2, y2] = moveAndAim(data);
    console.log(x2 * y2);
}