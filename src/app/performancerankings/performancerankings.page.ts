import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ChangeDetectorRef,  SimpleChanges } from '@angular/core';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { ApiService, Reqdata, dateFormat} from '../services/api.service';



@Component({
  selector: 'app-performancerankings',
  templateUrl: './performancerankings.page.html',
  styleUrls: ['./performancerankings.page.scss'],
})
export class PerformancerankingsPage implements OnInit {

  chartOption: EChartOption;
  item: any;
  echartOption1: EChartOption;
  mode = 'today';
  beginDate = '';
  endDate = '';
  mode1 = 'days';

  constructor(
    private ApiService: ApiService,
     )
   {  }

   ngOnInit(): void {
    this.item = {
      grossProfit: 0,
      num: 0,
      amount: 0,
      standardAmount: 0,
      orderNum: 0,
      lastNum: 0,
      lastAmount: 0,
      lastStandardAmount: 0,
      lastOrderNum: 0,
      yearNum: 0,
      yearAmount: 0,
      yearStandardAmount: 0,
      yearOrderNum: 0,
      productCode: '0',
      productName: '0',
      productNum: 0,
      productAmount: 0,
      productStandardAmount: 0,
      productOrderNum: 0,
      shoppingCode: '',
      shoppingName: '',
      shoppingStoreCode: '',
      shoppingStoreName: '',
      shoppingNum: 0,
      shoppingOrderNum: 0,
      shoppingAmount: 0,
      shoppingStandardAmount: 0,
      storeCode: '',
      storeName: '',
      storeNum: 0,
      storeAmount: 0,
      storeStandardAmount: 0,
      storeOrderNum: 0,
      vipCode: '',
      vipName: '',
      vipNewNum: 0,
      vipAmount: 0,
      vipStandardAmount: 0,
      vipOrderNum: 0,
      vipNum: 0,
      vipLastNum: 0,
      vipLastAmount: 0,
      vipLastStandardAmount: 0,
      vipLastOrderNum: 0,
      vipYearNum: 0,
      vipYearAmount: 0,
      vipYearStandardAmount: 0,
      vipYearOrderNum: 0,
      avgDiscount: 0 ,
      yearRatio : 0,
      latelyRatio : 0 ,
      grossProfitRatio : 0 ,
      vipYearRatio : 0 ,
      vipLatelyRatio : 0,
      EChartOption: {}
    };
  }




  ionViewDidEnter() {
     this.query();
     this.queryHomeChart();
  }

  query2() {
    // this.mode1=l;
    // alert(this.mode1);
    this.queryHomeChart(false);
  }

  query(){

    
    const data = new Reqdata();
    data.mode = this.mode;
    data.beginDate = this.beginDate;
    data.endDate = this.endDate;
    this.getRequestContact(data, true);
  }

  getRequestContact(data, showLoad: boolean = null) {

    this.ApiService.requestData(data, (e) => {
        this.item = e;
        this.rebuildData(this.item);
        this.buildEChartOption(this.item);
    }, showLoad);
 }

 rebuildData(l) {
  l.avgDiscount = 0 === l.standardAmount ? 0 : l.amount / l.standardAmount;
  l.yearRatio = 0 === l.yearAmount ? 0 : l.amount / l.yearAmount - 1;
  l.latelyRatio = 0 === l.lastAmount ? 0 : l.amount / l.lastAmount - 1;
  l.grossProfitRatio = 0 === l.grossProfit ? 0 : l.grossProfit / l.amount;
  l.vipYearRatio = 0 === l.vipYearAmount ? 0 : l.vipAmount / l.vipYearAmount - 1;
  l.vipLatelyRatio = 0 === l.vipLastAmount ? 0 : l.vipAmount / l.vipLastAmount - 1;
}

buildEChartOption(l) {
  l.EChartOption = {
    series: [{
      type: 'pie',
      hoverAnimation: !1,
      label: {
        normal: {
          show: !0,
          position: 'center'
        }
      },
      labelLine: {
        show: !1
      },
      radius: ['80%', '95%'],
      data: [{
        name: '',
        value: (1 - l.grossProfitRatio).toFixed(2),
        itemStyle: {
          normal: {
            color: '#ccc'
          }
        }
      },
        {
          name: (100 * l.grossProfitRatio).toFixed(2) + '%\n利率',
          value: l.grossProfitRatio,
          itemStyle: {
            normal: {
              color: '#23abff'
            }
          }
        }]
    }]
  };
  // this.EChart.setOption(l.EChartOption);
};


  queryHomeChart(showLoad: boolean = null) {
    const t = new Reqdata();
    t.mode = this.mode1;
    t.beginDate = this.beginDate;
    t.endDate = this.endDate;
    this.ApiService.requestData(t, (e) => {
            this.buildEChartOption1(e);
    });
  };

  buildEChartOption1(l) {
    const n = [];
    const t = [];
    for (let e = l.length - 1; e >= 0; e--) {
      n.push(l[e].name);
      t.push(l[e].amount);
    }

    this.echartOption1 = {
      grid: {
        left: '3%',
        containLabel: !0,
        y: 20,
        y2: 10
      },
      xAxis: [{
        type: 'category',
        boundaryGap: !1,
        data: n,
        axisLine: {
          show: !0,
          lineStyle: {
            color: '#999999'
          }
        },
        axisTick: {
          show: !1
        }
      }],
      yAxis: [{
        type: 'value',
        axisLine: {
          show: !1,
          lineStyle: {
            color: '#999999'
          }
        },
        splitLine: {
          show: !0,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisTick: {
          show: !1
        },
        axisLabel: {
          formatter(l) {
            return l >= 1e4 || l <= -1e3 ? (l / 1e3).toFixed(0) + 'k' : l >= 1e3 || l <= -1e3 ? (l / 1e3).toFixed(1) + 'k' : l;
          }
        }
      }],
      series: [{
        type: 'line',
        data: t,
        smooth: !0,
        itemStyle: {
          normal: {
            color: '#23abff',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
      label: {
        normal: {
         show: !0,
          formatter(l) {
            const n = l.value;
          return n >= 1e4 || n <= -1e3 ? (n / 1e3).toFixed(0) + 'k' : n >= 1e3 || n <= -1e3 ? (n / 1e3).toFixed(1) + 'k' : 0 == n ? 0 : n.toFixed(1);
           }
          }
        }
      }]
    };
  };


}
