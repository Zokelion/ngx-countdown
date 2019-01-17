import { Component, OnInit, EventEmitter, Input, SimpleChanges, OnChanges, Output } from '@angular/core';
import { NgxCountdownNotifyEvent } from 'src/lib/models/notify-event.model';
import { NgxCountdownConfig } from 'src/lib/models/config.model';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-countdown',
    templateUrl: './ngx-countdown.component.html',
    styleUrls: ['./ngx-countdown.component.scss']
})
export class NgxCountdownComponent implements OnInit, OnChanges {
    @Output()
    public started: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public finished: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public notify: EventEmitter<NgxCountdownNotifyEvent> = new EventEmitter<NgxCountdownNotifyEvent>();

    // tslint:disable-next-line:no-input-rename
    @Input('config')
    public userConfig: NgxCountdownConfig;

    public remainingTime: number;

    protected _timer: NodeJS.Timer;
    protected _isRunning: boolean;
    protected _config: NgxCountdownConfig;

    protected _defaultConfig: NgxCountdownConfig = {
        notifyAt: [],
        timeLeft: 0,
        format: 'HH:mm:ss'
    };

    protected _decreaseFunction = () => {
        if (this.remainingTime > 0) {
            this.remainingTime--;
        } else {
            return;
        }

        // If we still have some time
        if (this.remainingTime > 0) {
            // Basically, we don't notify at 0 even if the user asks to because
            // there is another event (finished) just for this purpose
            if (this._hasToNotify()) {
                this._notify();
            }
        } else {
            // Otherwise, we must stop and emit the event
            this.stop();

            console.log("Emitting 'finish' event");
            this.finished.emit();
        }
        // tslint:disable-next-line:semicolon
    };

    constructor() {}

    public ngOnInit() {
        this._isRunning = false;
        // Merging user config with default one to have every values set
        this._configUpdated(this.userConfig);

        this.remainingTime = this._config.timeLeft;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // On changes, we must think about merging given config with the default one
        if (changes.userConfig) {
            this._configUpdated(changes.userConfig.currentValue);
        }
    }

    public start() {
        if (!this._timer) {
            console.log('If this (', this.remainingTime === this._config.timeLeft, ") is true I'ma fire started");
            if (this.remainingTime === this._config.timeLeft) {
                this.started.emit();
            }

            this._timer = setInterval(this._decreaseFunction, 1000);
        }
    }

    public stop() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    protected _notify() {
        this.notify.emit({
            timeLeft: this.remainingTime
        });
    }

    protected _configUpdated(config: NgxCountdownConfig) {
        this._config = {
            ...this._defaultConfig,
            ...config
        };
    }

    protected _hasToNotify() {
        return this._config.notifyAt.some((timeToNotify: number) => timeToNotify === this.remainingTime);
    }
}
