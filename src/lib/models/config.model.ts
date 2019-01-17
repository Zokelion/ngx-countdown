export interface NgxCountdownConfig {
    // Number of seconds you want your countdown to start at (eg: 3600 here will be one hour)
    timeLeft?: number;

    // Left times at which the notify event will be fired
    notifyAt?: number[];

    // Time format as supported by Angular's DatePipe (cf: https://angular.io/api/common/DatePipe)
    format?: string;
}
