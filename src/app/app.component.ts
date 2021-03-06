import { Component, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { NgxCountdownConfig } from 'src/lib/models/config.model';
import { NgxCountdownComponent } from 'src/lib/components/ngx-countdown/ngx-countdown.component';
import { NgxCountdownNotifyEvent } from 'src/lib/models/notify-event.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChildren('timer')
    public timers: QueryList<NgxCountdownComponent>;

    @ViewChild('singleTimer')
    public singleTimer: NgxCountdownComponent;

    public testConfigs: NgxCountdownConfig[] = [
        { timeLeft: 0 },
        { timeLeft: 30 },
        { timeLeft: 60 },
        { timeLeft: 120 },
        { timeLeft: 300, notifyAt: [290, 280, 270, 260, 250] },
        { timeLeft: 3600 }
    ];

    public singleConfig: NgxCountdownConfig = {
        timeLeft: 10
    };

    public addTime(seconds: number, timerIndex?: number) {
        if (timerIndex !== undefined) {
            const timerConfig = this.testConfigs[timerIndex];

            const config = {
                ...timerConfig,
                timeLeft: timerConfig.timeLeft + seconds
            };

            this.testConfigs[timerIndex] = config;
        } else {
            this.singleConfig = {
                ...this.singleConfig,
                timeLeft: this.singleConfig.timeLeft + seconds
            };

            this.singleTimer.reset();
        }
    }

    public startTimer(index?: number) {
        const timer = this._getTimer(index);

        timer.start();
    }

    public stopTimer(index?: number) {
        const timer = this._getTimer(index);

        timer.stop();
    }

    public timerStarted(index: number) {
        console.log('Timer', index, 'started');
    }

    public timerFinished(index: number) {
        console.log('Timer', index, 'finished');
    }

    public timerNotified(index: number, event: NgxCountdownNotifyEvent) {
        console.log('Timer', index, 'notified:', event);
    }

    protected _getTimer(index: number): NgxCountdownComponent {
        if (index > this.timers.length) {
            throw new Error("Can't get timer at index " + index + '. Max index is ' + this.timers.length);
        }

        return index === undefined ? this.singleTimer : this.timers.toArray()[index];
    }
}
