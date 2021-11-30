
var axios = require('axios');

import { ParallelPromises } from "../lib/parallel-promises";

// Les données 
let items: any[] = [];
for (var i = 1; i <= 20; i++) {
    items.push({ beer_id: i, duration: Math.random() });
}

// Context global d'exécution 
var GlobalContext = { nbBeer: 0 };


// Méthode unitaire d'exécution
function completeNameBeerItem(indice: number, _items: any[], context?: any): Promise<boolean> {
    let data = _items[indice];
    return new Promise<any>((resolve, reject) => {
        console.log('SEARCH : '+'https://api.punkapi.com/v2/beers/'+data.beer_id)
        
        axios.get('https://api.punkapi.com/v2/beers/'+data.beer_id).then((response: { data: any; }) => {
            context.nbBeer++;
            if (response.data && response.data.length == 1 && response.data[0].name) {
                data.name = response.data[0].name;
                resolve(true);
            } else {
                // Gestion des erreurs
                // console.log(response.data);
                reject({ error: 'Missing data', id: indice });
            }
        }).catch((error: any) => {
            reject({ error: error, id: indice });
        });
    });
}

// Préparation à l'exécution en parallèle
let p = new ParallelPromises(items, completeNameBeerItem, GlobalContext);

// Exécution en parallele par 2 items par 2
p.run({
    maxPromise: 2,
    minWaitBeforeResult: 100,
    abortOnError: false,
    rejectOnError: false
}).then((d: boolean[]) => {
    console.log("Started ", d)
})

// N'importe quand il est possible de vérifier si le process est terminée
p.isFinished().then((b: boolean) => {
    if (b) {
        console.log("Process is complete")
    } else {
        console.log("Process is running")
    }
})

// Attente de la fin d'exécution
p.waitFinish().then((globalContext: any) => {
    console.log('FINISH', globalContext);
    console.log(items)
}).catch((err: any) => {
    console.log('FINISH ON ERROR', err);
})
