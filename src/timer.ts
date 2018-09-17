type TimerCallback = () => void

/**
 * Self adjusting timer
 */
export class Timer {
  private currentTimeout: number = null
  private wantedTime: number = null
  private callback: TimerCallback = null

  // Paused
  private paused: boolean = false
  private timeleft: number = null

  // Repeated
  private expected: number = null
  private repeated: boolean = false

  // TIMER PLAYBACK

  /**
   * Starts countdown to 0
   * @param callback
   * @param time
   */
  countdown (callback: TimerCallback, time: number) {
    clearTimeout(this.currentTimeout)
    this.callback = callback
    this.wantedTime = time
    this.expected = new Date().getTime() + time
    this.currentTimeout = setTimeout(callback, time)
  }

  /**
   * Starts a repeated countdown
   * @param callback
   * @param interval
   */
  repeat (callback: TimerCallback, interval: number) {
    clearTimeout(this.currentTimeout)
    this.callback = callback
    this.wantedTime = interval
    this.repeated = true
    this.expected = new Date().getTime() + interval
    this.currentTimeout = setTimeout(() => {
      this.repeatStep()
    }, interval)
  }

  // TIMER PLAYBACK CONTROLS

  /**
   * Stops and resets to nothing
   */
  stop () {
    clearTimeout(this.currentTimeout)
    this.currentTimeout = null
    this.wantedTime = null
    this.callback = null
    this.paused = false
    this.timeleft = null
    this.expected = null
    this.repeated = false
  }

  /**
   * Temporarily stop the current timeout
   */
  pause () {
    clearTimeout(this.currentTimeout)
    this.paused = true
    this.timeleft = this.expected - new Date().getTime()
  }

  /**
   * Resumes a paused timeout
   */
  resume () {
    if (!this.paused || this.timeleft === null) {
      throw new Error('Timer is not currently paused')
    }

    this.currentTimeout = setTimeout(this.callback, this.timeleft)
  }

  /**
   * Skips ahead in the current timer
   * @param time Time to skip
   */
  skip (time?: number) {
    clearTimeout(this.currentTimeout)
    let newTime: number = 0
    if (time) {
      newTime = this.expected - time - new Date().getTime()
    }

    if (newTime > 0) {
      // If it is repeated, after new time restart a new repeated timer
      if (this.repeated) {
        this.currentTimeout = setTimeout(() => {
          this.callback()
          this.repeat(this.callback, this.wantedTime)
        }, newTime)
      } else {
        this.countdown(this.callback, newTime)
      }
    } else {
      this.callback()
      if (this.repeated) {
        this.repeat(this.callback, this.wantedTime)
      }
    }
  }

  /**
   * Add time to current timer
   * @param time Time to be added
   */
  addTime (time: number) {
    clearTimeout(this.currentTimeout)
    const newTime = this.expected + time - new Date().getTime()

    // If it is repeated, after new time restart a new repeated timer
    if (this.repeated) {
      this.currentTimeout = setTimeout(() => {
        this.callback()
        this.repeat(this.callback, this.wantedTime)
      }, newTime)
    } else {
      this.countdown(this.callback, newTime)
    }
  }

  /**
   * Repeated step
   */
  private repeatStep () {
    // Evaluate the difference between expected time and current time
    let diff = this.expected - new Date().getTime()

    this.callback()

    this.expected += this.wantedTime

    this.currentTimeout = setTimeout(() => {
      this.repeatStep()
    }, this.wantedTime + diff)
  }

  // GETTERS

  /**
   * Gets timer remaining
   * @returns Time remaining
   */
  getTimeRemaining (): number {
    return this.expected - new Date().getTime()
  }

  /**
   * Gets current paused status
   * @returns Whether the timer is paused
   */
  isPaused (): boolean {
    return this.paused
  }
}
