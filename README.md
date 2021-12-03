# Run promises in parallel

Run in parallel a number of promises regarding an array of data.
The aim is to control the number of thread to run in parallel, the package proposes to keep the execution context at any time.
You can control the behaviour of the main process in case of error detect.


# Installation

```cmd
$ npm install @amn31/ma-parallel-promises
```

# Examples

## Basic solution with ParallelPromises

```ts

var maParallelPromises = require("@amn31/ma-parallel-promises")

/* Array of data 
    here we have:
    [
        { user: '...', duration: 0.45 }
    ] 
*/
let items = [];
for (var i = 0; i < 100; i++) {
    items.push({
        user: 'user' + i,
        duration: Math.random()
    });
}

/* Global Context */
var GlobalContext = { nbItem: 0 };

/* Unitary data processing method */
let ModelTodealItem = (indice, _items, context) => {
    let data = _items[indice];
    let duration = 1000 * data.duration;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('ModelTodealItem', data, context);
            context.nbItem++;
            resolve(true)
        }, duration)
    });
}

/* Preparation */
let p = new maParallelPromises.ParallelPromises(
                items, 
                ModelTodealItem, 
                GlobalContext);

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

```

## Array solution with ParallelArray

```ts

import { ParallelPromises } from "@amn31/ma-parallel-promises";
import { getInfoPresident, Presidents } from "../data-president";

/* Construction of a new array in order to execute in parallel a promise for each element of this array  */
let myArray = new ParallelArray<any>();

/* Filling, here we have:
    [
        { party: 'Democratic', name: 'John F. Kennedy' }
    ] 
*/
for(let president of Presidents) {
    myArray.push(president);
}

/* Options regarding parallel execution */
myArray.parallelOptions({
    maxPromise: 1,
    // abortOnError: false,
    // rejectOnError: false,
    minWaitBeforeResult: 100
})

/* 
    Execution for each element with the method (element:any,globalcontext?:any):Promise<boolean>
    A optional global context can be provided.
 */
myArray.parallelRun((element) => {

    console.log('Deal president ', element);
    // Define the unit Promise which return a boolean
    return new Promise<boolean>(async (resolve, reject) => {

        // Get asynchronous information regarding element
        let president = await getInfoPresident(element);
        // Array is completed 
        element['info'] = president;

        // Promise is closed
        resolve(true)
    });

});

 /* Waiting end process */
 myArray.parallelResult().then(globalcontext => {
    console.log('Result is the context ');
    /* At this stage : Array has been completed with field 'info' like this :
        [ {
            party: 'Democratic',
            name: 'John F. Kennedy',
            info: {
                Presidency: 35,
                President: 'John F. Kennedy',
                'Wikipedia Entry': 'http://en.wikipedia.org/wiki/John_F._Kennedy',
                'Took office': '20/01/1961',
                'Left office': '22/11/1963',
                Party: 'Democratic',
                Portrait: 'John_F_Kennedy.jpg',
                Thumbnail: 'thmb_John_F_Kennedy.jpg',
                'Home State': 'Massachusetts'
            }
        },]
    */
    console.log('First record is completed ',myArray[0])
    console.log('Barack record is completed',myArray[myArray.length - 1])
}).catch(err => {
    console.log('Execution error', err);
})

```


# Links

## License

[MIT](LICENSE)

[@amn31/ma-parallel-promises](https://www.npmjs.com/package/@amn31/ma-parallel-promises)