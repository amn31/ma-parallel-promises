

/**
 * Lib permettant d'effectuer l'exécution en parallèle d'une promise pour un ensemble des données d'un tableau.
 * La progression des exécution en parallèle est controler et est limité à un nombre 
 */



/**
 * Maximun thread running in parallel
 */
export type NumberPromise = number | 3;

/**
 * Option to use for run() 
 */
export interface ParallelOptions {
    /** Maximun thread running in parallel */
    maxPromise: NumberPromise;
    /** Number of milliseconds to wait before checking if the process is completed */
    minWaitBeforeResult?: number;
    /** The process will be stopped if a thread is rejected */
    abortOnError?: boolean;
    /** if a thread is rejected the promise of run() method will be rejected */
    rejectOnError?: boolean;

}

/**
 * Option for run()
 */
export type RunOptions = (NumberPromise | ParallelOptions);

/**
 * Permet de paralléliser l'exécution de données d'un tableau
 * 
 * Exemple 
 * 
    
import { ParallelPromises } from "@amn31/ma-parallel-promises";


// Les données sous la forme [{ user: '...', duration: 0.45 }] //
let items: any[] = [];
for (var i = 0; i < 100; i++) {
    items.push({
        user: 'user' + i,
        duration: Math.random()
    });
}

// Context global d'exécution //
var GlobalContext = { nbItem: 0 };

// Method unitaire de traitement des données //
function ModelTodealItem(indice: number, _items: any[], context?: any): Promise<any> {
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

// Préparation à l'exécution en parallèle //
let p = new ParallelPromises(items, ModelTodealItem, GlobalContext);

// Exécution en parallele par 5 items par 5 //
p.run({
    maxPromise: 5,
    minWaitBeforeResult: 100,
    //abortOnError: false,
    //rejectOnError: false
}).then(d => { console.log("Started") });

// N'importe quand il est possible de vérifier si le process est terminée //
p.isFinished().then(b => {
    if (b) {
        console.log("Process is complete")
    } else {
        console.log("Process is running")
    }
})

// Attente de la fin d'exécution //
p.waitFinish().then(globalContext => {
    console.log('FINISHER', globalContext);
})

*
*/
export class ParallelPromises {

    private context = {
        nitem: 0,
        currentIndice: 0,
        abortOnError: 0,
        max: 0,
        done: 0
    };

    private minWaitBeforeResult: number = 1000;
    private MAX_PARALLEL_PROMISE: number = 5;
    private nbParallel: number = this.MAX_PARALLEL_PROMISE;
    private waitDone: number[] = [];
    private promises: Promise<boolean>[] = [];
    private rejectOnError: boolean = false;
    private abortOnError: boolean = false;
    private dealItem!: (indice: number, items: any[], ctx?: any) => Promise<boolean>;
    private dealElem!: (elem: any[], ctx?: any) => Promise<boolean>;

    constructor(private items: Array<any>,
        unitDealItem?: (indice: number, items: any[], ctx?: any) => Promise<boolean>,
        private globalContext?: any) {

        if (unitDealItem) {
            this.dealItem = unitDealItem;
        }
        this.context.max = items.length
    }

    /**
     * set dealElem according method with parameter (elem: any[], ctx?: any)
     * 
     * @param dealElem 
     */
    public setDealElem (dealElem: (elem: any[], ctx?: any) => Promise<boolean>) {
        this.dealElem = dealElem;
    }

    private _dealItem(i: number, items: any[]): Promise<boolean> {

        return new Promise<any>((resolve, reject) => {
            
            let onSuccess = () => {
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
            }

            let onError = (err: any,reject: (arg0: { error: any; item: any; }) => any) => {
                console.log("ParallelPromises ERROR detect on item (", i, ')', err);
                this.context.abortOnError = 1
                this.waitDone.push(i);
                return reject({ error: err, item: items[i] })
            }

            if (this.dealElem != undefined) {
                let element = items[i];
                this.dealElem(element, this.globalContext).then(d => {
                    onSuccess();
                }).catch(err => {
                    return onError({ error: err, item: items[i] },reject)
                });

            } else {
                if (this.dealItem == undefined) {
                    return reject({ error: 'Bad usage of run()' });
                }
                this.dealItem(i, items, this.globalContext).then(d => {
                    onSuccess();
                }).catch(err => {
                    return onError({ error: err, item: items[i] },reject)
                });
            }
           
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
            this.promises = [];

        });
    }

    /**
     * Start process
     * 
     * @param options   ParallelOptions
                       {
                            maxPromise: 5,
                            minWaitBeforeResult: 1000,
                            abortOnError: false,
                            rejectOnError: false
                        }
     * @returns Promise<boolean[]>
     */
    run(options?: ParallelOptions): Promise<boolean[]> {
        this.waitDone = [];

        if (this.context.done != 0) {
            throw ('A thread is still running !');
        }

        this.nbParallel = this.MAX_PARALLEL_PROMISE;
        if (typeof (options) == 'object') {
            if (options.maxPromise > 0) {
                this.nbParallel = options.maxPromise -1;
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

    isDone(): boolean {
        return (this.context.done == 0)
    }

}

export class ParallelArray<T> extends Array<T> {

    private p!: ParallelPromises;
    private po!: ParallelOptions;
    private globalContext!: any;

    // remove: (elem: T) => Array<T> = (elem: T) => {
    //     console.log('R',this)
    //     return this.filter(e => e !== elem);
    // }

    /**
     * Can be used to clone an array
     * 
     * @param arr Array
     */
    cloneFrom: (arr: Array<T>) => void = (arr: Array<T>) => {
        this.splice(0);
        for (let o of arr) {
            this.push(o);
        }
    }

    /**
     * Duplicate data in a new array
     * 
     * @returns Array
     */
    print: () => void = () => {
        let a:any[] = []
        for(let o of this) {
            a.push(o);
        }
        return a;
    }

    /**
     * 
     * Start running unitDealItem() for each element of Array
     * 
     * @param unitDealItem Unitary data processing method
     * @param globalContext any
     * @returns void
     */
    parallelRun:
        (unitDealItem: (data: any, ctx?: any) => Promise<boolean>, globalContext?: any)
            => void
        = (unitDealItem: (data: any, ctx?: any) => Promise<boolean>, globalContext?: any) => {
            if (globalContext) {
                this.globalContext = globalContext
            }
            let f = () => {
                // console.log('CREATE INSTANCE p', this.po)
                this.p = new ParallelPromises(this, undefined, this.globalContext);
                this.p.setDealElem(unitDealItem);
                this.p.run(this.po);
            }
            if (this.p && this.p.isDone()) {
                //throw ("parallelRun() a process is already running")
                this.p.waitFinish().then(f).catch(f)
            } else {
                f();
            }
        }



    /**
     * Provide result of running method parallelRun()
     * 
     * @returns Promise<any>
     */
    parallelResult: () => Promise<any> = () => {
        if (this.p) {
            return this.p.waitFinish();
        } else {
            throw ('ParallelArray parallelRun() must be call before!');
        }
    }

    /**
     * Set options during execution of method parallelRun()
     * 
     * @param options   ParallelOptions
                       {
                            maxPromise: 5,
                            minWaitBeforeResult: 1000,
                            abortOnError: false,
                            rejectOnError: false
                        }
     * @param globalContext any
     */
    parallelOptions:
        (options: ParallelOptions, globalContext?: any)
            => void
        = (options: ParallelOptions, globalContext?: any) => {
            this.po = options;
            if (globalContext) {
                this.globalContext = globalContext
            }
        }

}