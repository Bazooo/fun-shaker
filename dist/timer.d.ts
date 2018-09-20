declare type TimerCallback = () => void;
/**
 * Self adjusting timer
 */
export declare class Timer {
    private currentTimeout;
    private wantedTime;
    private callback;
    private paused;
    private timeleft;
    private expected;
    private repeated;
    /**
     * Starts countdown to 0
     * @param {TimerCallback} callback - Callback at the end of the timer
     * @param {number} time - Time before callback
     */
    countdown(callback: TimerCallback, time: number): void;
    /**
     * Starts a repeated countdown
     * @param {TimerCallback} callback - Callback at the each intervals of the timer
     * @param {number} Interval - Time between callbacks
     */
    repeat(callback: TimerCallback, interval: number): void;
    /**
     * Stops and resets to nothing
     */
    stop(): void;
    /**
     * Temporarily stop the current timeout
     */
    pause(): void;
    /**
     * Resumes a paused timeout
     */
    resume(): void;
    /**
     * Skips ahead in the current timer
     * @param {number} [time] Time to skip
     */
    skip(time?: number): void;
    /**
     * Add time to current timer
     * @param {number} time Time to be added
     */
    addTime(time: number): void;
    /**
     * Repeated step
     */
    private repeatStep;
    /**
     * Gets timer remaining
     * @returns {number} Time remaining
     */
    getTimeRemaining(): number;
    /**
     * Gets current paused status
     * @returns {boolean} Whether the timer is paused
     */
    isPaused(): boolean;
}
export {};
