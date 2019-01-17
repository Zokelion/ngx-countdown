# Welcome to @Zokelion/NgxCountdown !

This is an Angular 7+ package to make your life easier. But before we get started, let's just check that this plugin will fit your needs 😉

## What does this do ?

-   As the name suggests, this offers a component to display countdowns
-   We give customizable output format via config option. Since we rely on [Angular's DatePipe](https://angular.io/api/common/DatePipe) usage, anything shown [here](https://angular.io/api/common/DatePipe#custom-format-options) will work (in a limited way, we'll discuss this later 😉)

## What is it that this plugin won't do ?

-   Sadly, we don't support countdowns larger than 23 hours, 59 minutes and 59 seconds. As I said, we rely on [Angular's DatePipe](https://angular.io/api/common/DatePipe), so if you want to display a countdown with units bigger than hours, you'll get... A date (something like 03-01-1970 00:00:00) 😞

## NgxCountdown seems fine for your needs ?

Alright, so it's time for some serious doc now I guess, if you're gonna use this, here are the few things you'll need to know

### Quickstart

First of all, you'll need to import NgxCountdownModule into your app.module.ts, just like this:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxCountdownModule } from '../lib/ngx-countdown.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxCountdownModule], // Add this module to your imports here
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

Once this is done, it's pretty simple to use. By importing the module, you gained access to a brand new HTML tag: `<ngx-countdown>`
Let's get straight into the @Input() and @Output() of this component !

### @Input() parameters

| Name   |        Type        | Default Value |
| ------ | :----------------: | ------------- |
| config | NgxCountdownConfig | Cf: below     |

### NgxCountdownConfig type

This is a simple interface that describes expected parameters for a countdown component. It does not have many options, here are all of them:

| Name     | Type     | required | Description                                                                                                                                          | Default    |
| -------- | -------- | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| timeLeft | number   |    ❌    | The time at which your countdown will start in seconds, 3600 will make it 1 hour long                                                                | 0          |
| notifyAt | number[] |    ❌    | Whenever the timer hits one of the numbers given here, it will fire a NgxCountdownNotifyEvent. Doesn't work for 0 since we have the `finished` event | []         |
| format   | string   |    ❌    | The time format you want, anything shown [here](https://angular.io/api/common/DatePipe#custom-format-options) will work                              | 'HH:mm:ss' |

### Events fired by a countdown

| Name     | Event type              | Description                                                                                     |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| started  | void                    | Fired when the timer starts for the first time                                                  |
| finished | void                    | Fired when the countdown reaches 0                                                              |
| notify   | NgxCountdownNotifyEvent | Fired when the remaining time is one of the values givent in the `notifyAt` parameter of config |

### NgxCountdownNotifyEvent

This is a simple class that gives the remaining time when a notify event is fired by the component. It has only one property: `timeLeft`, which is a number.
I created it for more convenience if someday I decide to add some infos into this.

### Publicly available methods on the component

And the last part of this doc: "how do I use this component ?"
You'll need a reference to it in your TS, just like this:

```ts
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('timer')
    public timer: NgxCountdownComponent;
}
```

You can then call the following methods:

| Name  | Parameters | Return type | Description                                                                                                 |
| ----- | ---------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| start | none       | void        | Starts the timer and makes it continue after a call to stop()                                               |
| stop  | none       | void        | Stops the countdown. Actually, this could be named pause() as well since that's exactly he job it performs. |

And we're done for now guys, hope this will be useful to you, now do some fun things and enjoy coding 😎
