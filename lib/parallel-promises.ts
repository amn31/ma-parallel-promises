
/*
export interface IOperators {
    [index: string]: symbol
}

type IOrAnd = "or" | "and" ;
interface ISimpleCondition {
    0: string | number;
    1: string | number;
    2: string | number;
}

export type ITabSimpleConditions = (ISimpleCondition |IOrAnd|CompleteConditions)[];
export type CompleteConditions = (ISimpleCondition | IOrAnd | ITabSimpleConditions)

export class Convert2Sequelize {
    private fc: IOrAnd = "and";
    

    display(r: any) {
       
        return r;
    }

}
*/

/**
 * Lib permettant d'effectuer l'exécution en parallèle d'une promise pour un ensemble des données d'un tableau.
 * La progression des exécution en parallèle est controler et est limité à un nombre 
 */

/**
 * Permet de paralléliser l'exécution de données d'un tableau
 * 
 * Exemple 
    import { ParallelPromises } from "../lib/ParallelPromises";

    // Les données 
    let items:any[]=[];
    for (var i = 0 ; i < 100; i++) {
        items.push({user: 'user'+i,duration: Math.random()});
    }

    // Context global d'exécution 
    var GlobalContext =  {info: 1};

    // Méthode unitaire d'exécution
    function ModelTodealItem(indice:number,_items:any[],context?:any):Promise<any> {
        let data = _items[indice];
        let duration = 10000*data.duration;
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                console.log('ModelTodealItem',data, context);
                context.info++;
                resolve(true)
            }, duration)
        });
    }

    // Préparation à l'exécution en parallèle
    let p = new ParallelPromises(items,ModelTodealItem, GlobalContext);

    // Exécution en parallele par 5 items par 5
    p.run({ maxPromise: 5, minWaitBeforeResult: 100 }).then(d => {
        console.log("Started")
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
        console.log('FINISHER',globalContext);
    })

*
*/

type NumberPromise = number | 3 ;
interface ParallelOptions {
    maxPromise: NumberPromise;
    minWaitBeforeResult?:number;
    rejectOnError?: boolean;
    abortOnError?: boolean;
}

/**
 * Options possible à la méthode run()
 */
export type RunOptions = (NumberPromise|ParallelOptions);

export class ParallelPromises {

    private context = {
        nitem: 0,
        currentIndice: 0,
        abortOnError: 0,
        max: 0,
        done: 0
    };
    private minWaitBeforeResult: number = 1000;
    private nbParallel: number = 0;
    private waitDone: number[] = [];
    private promises: Promise<boolean>[] = [];
    private rejectOnError: boolean = false;
    private abortOnError: boolean = false;

    constructor(private items: any[],
        private dealItem: (indice: number, items: any[], ctx?: any) => Promise<boolean>,
        private globalContext?: any) {
        this.context.max = items.length
    }

    private _dealItem(i: number, items: any[]): Promise<boolean> {

        return new Promise<any>((resolve, reject) => {
            //let data = items[i];
            this.dealItem(i, items, this.globalContext).then(d => {
                if ((!this.context.abortOnError || this.abortOnError == false) && this.context.currentIndice < this.context.max - 1) {
                    // console.log("Next " + (this.context.currentIndice + 1));
                    this.context.done = 0;
                    this.promises.push(this._dealItem(++this.context.currentIndice, items));
                } else {
                    // console.log('DONE '+i);
                    this.waitDone.push(i);
                    if (this.waitDone.length == this.nbParallel + 1 ||
                        this.waitDone.length == this.items.length) {
                        // console.log('FINISH DONE '+i, this.globalContext);
                        this.context.done = 1;
                    }
                }
            }).catch(err => {
                console.log("ParallelPromises ERROR detect on item (", i , ')',err);
                this.context.abortOnError = 1
                this.waitDone.push(i);
                return reject({error: err,item:items[i]})
            });
            resolve(true);
        });

    }

    /**
     * Return promise which indicates if complete process is finished
     * 
     * @returns Promise<boolean>
     */
    isFinished(): Promise<boolean> {
        return new Promise<any>((resolve, reject) => {
            if (this.context.done == 1) {
                resolve(true);
            } else {
                setTimeout(() => {
                    resolve(false);
                }, this.minWaitBeforeResult)
            }
        });
    }

    /**
     * Waiting for the complete result and provides the global context
     * 
     * @returns Promise<any>
     */
    waitFinish(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            let r = false;
            while (r != true) {
                r = await this.isFinished();
            }
            if (this.context.abortOnError == 1 && this.rejectOnError) {
                reject(this.globalContext);
            } else {
                resolve(this.globalContext);
            }
            
        });
    }

    /**
     * 
     * @param options 
     * @returns 
     */
    run(options?: ParallelOptions) {
        this.waitDone = [];
       
        this.nbParallel = 3;
        if (typeof(options) == 'object' ) {
            if (options.maxPromise > 0) {
                this.nbParallel = options.maxPromise
            }
            if (options.minWaitBeforeResult && options.minWaitBeforeResult > 0) {
                this.minWaitBeforeResult = options.minWaitBeforeResult
            }
            if (options.rejectOnError && options.rejectOnError === true) {
                this.rejectOnError = options.rejectOnError;
            }
            if (options.abortOnError && options.abortOnError === true) {
                this.abortOnError = options.abortOnError;
            }
        }
        
        this.context.done = 0;

        this.promises.push(this._dealItem(this.context.currentIndice, this.items));
        for (var n = 0; n < this.nbParallel && n < this.items.length - 1; n++) {
            this.promises.push(this._dealItem(++this.context.currentIndice, this.items));
        }

        return Promise.all(this.promises);

    }

}