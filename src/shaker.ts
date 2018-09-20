import { Timer } from './timer'

export interface ShakerOptions {
  defaultInterval: number
  autoShaking: boolean
}

export type ShakerFunction = () => any

export interface ShakerObject {
  readonly callback: ShakerFunction
  readonly name?: string
  readonly interval?: number
}

export class Shaker {
  private options: ShakerOptions = {
    defaultInterval: 1000,
    autoShaking: false
  }

  private isAutoshaking = false
  private leftObjects: ShakerObject[] = []
  private usedObjects: ShakerObject[] = []
  private timer: Timer

  /**
   * Constructor for the Shaker object
   * @param {ShakerOptions} [options] Default options overrides
   */
  constructor (options?: ShakerOptions) {
    if (options) {
      this.options = {
        ...this.options,
        ...options
      }
    }
  }

  /**
   * Adds shakerObject at the end of the shaker queue
   * @param {ShakerObject} shakerObject Shaker object
   *
   * @param {ShakerFunction} callback Callback function on shake
   * @param {number} [interval] Time between each autoshake
   * @param {string} [name] Unique name for the callback
   * @throws
   */
  add (shakerObject: ShakerObject)
  add (callback: ShakerFunction, interval?: number, name?: string)
  add (shakerObjectOrCallback: ShakerObject | ShakerFunction, interval?: number, name?: string) {
    let obj: ShakerObject
    if (typeof shakerObjectOrCallback === 'object') {
      obj = shakerObjectOrCallback
    } else {
      obj = {
        callback: shakerObjectOrCallback,
        name,
        interval
      }
    }

    if (obj.name && this.getIndex(obj.name) !== null) {
      throw new Error('Name is already in use')
    }

    this.leftObjects.push(obj)
  }

  /**
   * Removes an object from the shaker queue
   * @param {number | string} idOrName Index or Unique name of the object to be removed
   */
  remove (idOrName: number | string) {
    let id
    if (typeof idOrName === 'number') {
      id = idOrName
      if (typeof this.leftObjects[id] === 'undefined') {
        throw new Error('Index out of bounds')
      }
    } else {
      id = this.getIndex(idOrName)
      if (id === null) {
        throw new Error('Name does not exist')
      }
    }

    this.leftObjects.splice(id, 1)
  }

  // SHAKER CONTROLS

  /**
   *  Runs the next callback in the queue
   */
  shake () {
    const obj = this.leftObjects.shift()
    obj.callback()

    this.usedObjects.push(obj)
  }

  /**
   * Starts automatically shaking in intervals
   */
  startAutoshaker () {
    this.isAutoshaking = true
    this.timer = new Timer()

    const obj = this.leftObjects[0]
    const time = obj.interval ? obj.interval : this.options.defaultInterval
    this.timer.countdown(() => {
      this.autoShake()
    }, time)
  }

  // AUTOSHAKER PLAYBACK CONTROLS

  /**
   * Stops the autoshaker
   */
  stopAutoshaker () {
    this.isAutoshaking = false
    this.timer.stop()
    this.timer = null
  }

  /**
   * Pauses the autoshaker
   */
  pauseAutoshaker () {
    this.timer.pause()
  }

  /**
   * Resume paused autoshaker
   */
  resumeAutoshaker () {
    this.timer.resume()
  }

  /**
   * Timer callback for autoshaking
   */
  private autoShake () {
    this.shake()
    if (this.getNbLeft() > 0) {
      const obj = this.leftObjects[0]
      let time = obj.interval ? obj.interval : this.options.defaultInterval
      this.timer.countdown(() => {
        this.autoShake()
      }, time)
    } else {
      this.stopAutoshaker()
    }
  }

  // MISCELLANEOUS

  /**
   * Rewinds the shaker by one
   */
  rewind () {
    const obj = this.usedObjects.pop()
    this.leftObjects.unshift(obj)
  }

  // GETTERS

  /**
   * Gets the number of left objects
   */
  getNbLeft (): number {
    return this.leftObjects.length
  }

  /**
   * Gets the index of an object
   * @param {string} name Object name
   */
  getIndex (name: string): number {
    let index: number = this.leftObjects.findIndex(obj => obj.name === name)
    if (index === -1) {
      index = this.usedObjects.findIndex(obj => obj.name === name)
      if (index === -1) {
        index = null
      } else {
        index++
        index = -index
      }
    }
    return index
  }
}
