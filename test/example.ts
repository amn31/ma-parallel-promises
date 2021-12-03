
import { ParallelPromises } from "../lib/parallel-promises";


/* Array of data 
    here we have:
    [
        { user: '...', duration: 0.45 }
    ] 
*/
let items: any[] = [];
for (var i = 0; i < 100; i++) {
    items.push({
        user: 'user' + i,
        duration: Math.random()
    });
}

/* Global Context */
var GlobalContext = { nbItem: 0 };

/* Unitary data processing method */
let ModelTodealItem = (indice: number, _items: any[], context?: any): Promise<any> => {
    let data = _items[indice];
    let duration = 10000 * data.duration;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('ModelTodealItem', data, context);
            context.nbItem++;
            resolve(true)
        }, duration)
    });
}

/* Preparation */
let p = new ParallelPromises(items, ModelTodealItem, GlobalContext);

/* Run process */
p.run({
    maxPromise: 5,
    minWaitBeforeResult: 100,
    //abortOnError: false,
    //rejectOnError: false
}).then(d => { console.log("Started") });

/* Anytime it is possible to check if the process is finished */
p.isFinished().then(b => {
    if (b) {
        console.log("Process is complete")
    } else {
        console.log("Process is running")
    }
})

/* Waiting end process */
p.waitFinish().then(globalContext => {
    console.log('FINISHER', globalContext);
})