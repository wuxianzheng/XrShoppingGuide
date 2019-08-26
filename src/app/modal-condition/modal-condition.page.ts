import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { dateFormat } from '../services/api.service';


@Component({
  selector: 'app-modal-condition',
  templateUrl: './modal-condition.page.html',
  styleUrls: ['./modal-condition.page.scss'],
})
export class ModalConditionPage implements OnInit {

    @Input() beginDate: string;
    @Input() endDate: string;
    days: number;
 
    list: any;

    constructor(
        public platform: Platform,
        public modalCtrl: ModalController,
        private dateFormat: dateFormat
    ) {

        // this.character = characters[this.params.get('charNum')];
        // this.categoryDate=new Reqdata();
        // this.categoryDate.beginDate=Date();
        // this.categoryDate.endDate=Date();
        //this.dateFormat = new dateFormat();
        this.reset();
    }

    ngOnInit() {

  }
  

    dismiss() {
        const data = { beginDate: this.beginDate, endDate: this.endDate, days: this.days, list: this.list };
        this.modalCtrl.dismiss(data);
    }
    buildDate() {
        const l = new Date;
        l.setDate(l.getDate() - this.days + 1);
        this.beginDate = this.dateFormat.formatDateStr(l);
       this.endDate = this.dateFormat.formatDateCurrentDate();
    };
    reset() {
        this.beginDate = this.dateFormat.formatDateCurrentMonthFirst();
        this.endDate = this.dateFormat.formatDateCurrentDate();
            this.days = 0;
    };

}

