interface TimerInitArgs {
    limitMs: number;
    runningMs: number;
}

export class Timer {
    public limitMs: number = 0;

    public runningMs: number = 0;

    private id: string;

    private startedAt?: Date;

    private stoppedAt?: Date;

    private runningClock?: ReturnType<typeof setInterval>;

    public constructor({ limitMs, runningMs }: TimerInitArgs) {
        this.limitMs = limitMs;

        this.runningMs = runningMs;

        this.id = Math.round(Math.random() * 100).toString();
    }

    public play(): void {
        if (this.stoppedAt) {
            this.runningMs = this.runningMs + (this.stoppedAt.getTime() - this.startedAt.getTime()); 
            this.startedAt = this.stoppedAt;
            this.stoppedAt = undefined;
        } else {
            this.runningMs = 0;
            this.startedAt = new Date();
        }
        
        this.runningClock = setInterval(() => this.tick(), 1000);
    }

    public reset(): void {
        this.clearInternalClock();

        this.clearTimestamps();
    }

    public stop(): void {
        console.log('[INFO] Stop'); 

        this.stoppedAt = new Date();

        this.clearInternalClock();
    }

    private clearTimestamps(): void {
        this.startedAt = undefined;

        this.stoppedAt = undefined;

    }

    private clearInternalClock(): void {
        clearInterval(this.runningClock);

        this.runningClock = undefined;

        this.runningMs = undefined; 

        console.log('[this.runningMs]', this.runningMs);
    }

    private finish(): void {
        console.log('[INFO] Finish')
        
        this.stop();

        this.clearTimestamps();
    }

    private tick(): void {
        this.runningMs += 1000;

        console.log('Running ms:', this.runningMs);

        if (this.runningMs >= this.limitMs) {
            this.finish();
        }
    }
}
