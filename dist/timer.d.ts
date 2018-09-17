declare type TimerCallback = () => void;
/**
 * Self adjusting timer
 */
export default class Timer {
    private currentTimeout;
    private wantedTime;
    private callback;
    private paused;
    private timeleft;
    private expected;
    private repeated;
    /**
     * Starts countdown to 0
     * @param callback
     * @param time
     */
    countdown(callback: TimerCallback, time: number): void;
    /**
     * Starts a repeated countdown
     * @param callback
     * @param interval
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
     * @param time Time to skip
     */
    skip(time?: number): void;
    /**
     * Add time to current timer
     * @param time Time to be added
     */
    addTime(time: number): void;
    /**
     * Repeated step
     */
    private repeatStep;
    /**
     * Gets timer remaining
     * @returns Time remaining
     */
    getTimeRemaining(): number;
    /**
     * Gets current paused status
     * @returns Whether the timer is paused
     */
    isPaused(): boolean;
}
export {};
