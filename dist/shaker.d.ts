export interface ShakerOptions {
    defaultInterval: number;
    autoShaking: boolean;
}
export declare type ShakerFunction = () => any;
export interface ShakerObject {
    readonly callback: ShakerFunction;
    readonly name?: string;
    readonly interval?: number;
}
export declare class Shaker {
    private options;
    private isAutoshaking;
    private leftObjects;
    private usedObjects;
    private timer;
    /**
     * Constructor for the Shaker object
     * @param {ShakerOptions} [options] Default options overrides
     */
    constructor(options?: ShakerOptions);
    /**
     * Adds shakerObject at the end of the shaker queue
     * @param {ShakerObject} shakerObject Shaker object
     *
     * @param {ShakerFunction} callback Callback function on shake
     * @param {number} [interval] Time between each autoshake
     * @param {string} [name] Unique name for the callback
     * @throws
     */
    add(shakerObject: ShakerObject): any;
    add(callback: ShakerFunction, interval?: number, name?: string): any;
    /**
     * Removes an object from the shaker queue
     * @param {number | string} idOrName Index or Unique name of the object to be removed
     */
    remove(idOrName: number | string): void;
    /**
     *  Runs the next callback in the queue
     */
    shake(): void;
    /**
     * Starts automatically shaking in intervals
     */
    startAutoshaker(): void;
    /**
     * Stops the autoshaker
     */
    stopAutoshaker(): void;
    /**
     * Pauses the autoshaker
     */
    pauseAutoshaker(): void;
    /**
     * Resume paused autoshaker
     */
    resumeAutoshaker(): void;
    /**
     * Timer callback for autoshaking
     */
    private autoShake;
    /**
     * Rewinds the shaker by one
     */
    rewind(): void;
    /**
     * Gets the number of left objects
     */
    getNbLeft(): number;
    /**
     * Gets the index of an object
     * @param {string} name Object name
     */
    getIndex(name: string): number;
}
