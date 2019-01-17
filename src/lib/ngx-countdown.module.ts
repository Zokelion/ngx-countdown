import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCountdownComponent } from './components/ngx-countdown/ngx-countdown.component';

@NgModule({
    declarations: [NgxCountdownComponent],
    imports: [CommonModule],
    exports: [NgxCountdownComponent]
})
export class NgxCountdownModule {}
