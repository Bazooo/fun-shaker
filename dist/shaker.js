"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./timer");
class Shaker {
    constructor(options) {
        this.options = {
            defaultInterval: 1000,
            autoShaking: false
        };
        this.isAutoshaking = false;
        this.leftObjects = [];
        this.usedObjects = [];
        if (options) {
            this.options = Object.assign({}, this.options, options);
        }
    }
    add(shakerObjectOrCallback, name, interval) {
        let obj;
        if (typeof shakerObjectOrCallback === 'object') {
            obj = shakerObjectOrCallback;
        }
        else {
            obj = {
                callback: shakerObjectOrCallback,
                name,
                interval
            };
        }
        if (obj.name && this.getIndex(obj.name) !== null) {
            throw new Error('Name is already in use');
        }
        this.leftObjects.push(obj);
    }
    /**
     * Removes an object from the shaker queue
     * @param idOrName Index or Unique name of the object to be removed
     */
    remove(idOrName) {
        let id;
        if (typeof idOrName === 'number') {
            id = idOrName;
            if (typeof this.leftObjects[id] === 'undefined') {
                throw new Error('Index out of bounds');
            }
        }
        else {
            id = this.getIndex(idOrName);
            if (id === null) {
                throw new Error('Name does not exist');
            }
        }
        this.leftObjects.splice(id, 1);
    }
    // SHAKER CONTROLS
    /**
     *  Runs the next callback in the queue
     */
    shake() {
        const obj = this.leftObjects.shift();
        obj.callback();
        this.usedObjects.push(obj);
    }
    /**
     * Starts automatically shaking in intervals
     */
    startAutoshaker() {
        this.isAutoshaking = true;
        this.timer = new timer_1.default();
        const obj = this.leftObjects[0];
        const time = obj.interval ? obj.interval : this.options.defaultInterval;
        this.timer.countdown(() => {
            this.autoShake();
        }, time);
    }
    // AUTOSHAKER PLAYBACK CONTROLS
    /**
     * Stops the autoshaker
     */
    stopAutoshaker() {
        this.isAutoshaking = false;
        this.timer.stop();
        this.timer = null;
    }
    /**
     * Pauses the autoshaker
     */
    pauseAutoshaker() {
        this.timer.pause();
    }
    /**
     * Resume paused autoshaker
     */
    resumeAutoshaker() {
        this.timer.resume();
    }
    /**
     * Timer callback for autoshaking
     */
    autoShake() {
        this.shake();
        if (this.getNbLeft() > 0) {
            const obj = this.leftObjects[0];
            let time = obj.interval ? obj.interval : this.options.defaultInterval;
            this.timer.countdown(() => {
                this.autoShake();
            }, time);
        }
        else {
            this.stopAutoshaker();
        }
    }
    // MISCELLANEOUS
    /**
     * Rewinds by one the shaker
     */
    rewind() {
        const obj = this.usedObjects.pop();
        this.leftObjects.unshift(obj);
    }
    // GETTERS
    /**
     * Gets the number of left objects
     */
    getNbLeft() {
        return this.leftObjects.length;
    }
    /**
     * Gets the index of an object
     * @param name Object name
     */
    getIndex(name) {
        let index = this.leftObjects.findIndex(obj => obj.name === name);
        if (index === -1) {
            index = this.usedObjects.findIndex(obj => obj.name === name);
            if (index === -1) {
                index = null;
            }
            else {
                index++;
                index = -index;
            }
        }
        return index;
    }
}
exports.Shaker = Shaker;
