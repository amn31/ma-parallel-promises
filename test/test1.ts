
import { ParallelPromises } from "../lib/parallel-promises";

// Les données à traiter en parallèle
let items: any[] = [];
for (var i = 1; i <= 100; i++) {
    items.push({ user: 'user_'+i, duration: Math.random() });
}

// Context global d'exécution 
var GlobalContext = { nbItem: 0, nbDurationGreaterThan500: 0};

// Méthode unitaire d'exécution
function dealItem(indice: number, _items: any[], context?: any): Promise<boolean> {
    let data = _items[indice];
    let duration = 1000 * data.duration;
    return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            console.log('dealItem', data);
            // console.log('ModelTodealItem', data, context);
            context.nbItem++;
            if (duration > 500) {
                context.nbDurationGreaterThan500++
            }
            // Gestion des erreurs ...
            // if (indice == 23) {
            //     reject('blabla')
            // }
            resolve(true)
        }, duration)
    });
}

// Préparation à l'exécution en parallèle
let p = new ParallelPromises(items, dealItem, GlobalContext);

// Exécution en parallele par 10 items par 10
p.run({
    maxPromise: 10,
    // minWaitBeforeResult: 1000,
    // abortOnError: false,
    // rejectOnError: false
}).then(d => {
    console.log("Started ...")
})

// N'importe quand il est possible de vérifier si le process est terminée
p.isFinished().then(b => {
    if (b) {
        console.log("Process is complete")
    } else {
        console.log("Process is running")
    }
})

// Attente de la fin d'exécution
p.waitFinish().then(globalContext => {
    // Affichage du context d'exécution
    console.log('FINISH', globalContext);
}).catch(err => {
    console.log('FINISH WITH ERROR', err);
})
