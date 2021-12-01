import { getInfoPresident, Presidents } from "../data-president";

import { ParallelArray } from "../lib/parallel-promises";


/* Construction of a new array in order to execute in parallel a promise for each element of the array  */
let myArray = new ParallelArray<any>();

/* Filling, here we have:
    [
        { party: 'Democratic', name: 'John F. Kennedy' }
    ] 
*/
for(let president of Presidents) {
    myArray.push(president);
}
// cloneFrom could be used to fill array
//myArray.cloneFrom(Presidents);

/* Options regarding parallel execution */
myArray.parallelOptions({
    maxPromise: 1,
    // abortOnError: false,
    // rejectOnError: false,
    minWaitBeforeResult: 100
})

/* 
    Execution for each element the following method with (element:any,globalcontext?:any)
    A global context can be provided
 */
myArray.parallelRun((element) => {
    console.log('Deal president ', element);
    // Define the unit Promise which return a boolean
    return new Promise<boolean>(async (resolve, reject) => {
        // Get asynchronous information regarding element
        let president = await getInfoPresident(element);
        element['info'] = president;
        //console.log('Info',president);
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