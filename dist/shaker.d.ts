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
    constructor(options?: ShakerOptions);
    /**
     * Adds shakerObject at the end of the shaker queue
     * @param shakerObject Shaker object
     *
     * @param callback Callback function on shake
     * @param name Unique name for the callback
     * @param interval Time between each autoshake
     */
    add(shakerObject: ShakerObject): any;
    add(callback: ShakerFunction, name?: string, interval?: number): any;
    /**
     * Removes an object from the shaker queue
     * @param idOrName Index or Unique name of the object to be removed
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
     * Rewinds by one the shaker
     */
    rewind(): void;
    /**
     * Gets the number of left objects
     */
    getNbLeft(): number;
    /**
     * Gets the index of an object
     * @param name Object name
     */
    getIndex(name: string): number;
}
