import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { NavController, ModalController,Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { ModalConditionPage } from '../modal-condition/modal-condition.page';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.page.html',
  styleUrls: ['./performance.page.scss'],
})

export class PerformancePage implements OnInit {
  chartOption: EChartOption;
  item: any;
  echartOption1: EChartOption;
  mode = 'today';
  beginDate = '';
  endDate = '';
  mode1 = 'days';

  constructor(
    private readonly router: Router,
    private ApiService: ApiService,
    public modalCtrl: ModalController,
    private dateFormat: dateFormat
  ) {
  }

  back() {
    window.history.back();
  }

  ionViewDidEnter() {
    // this.rebuildData(this.item);
    // this.buildEChartOption(this.item);
     this.query();
     this.queryHomeChart();
  }

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


    // this.initChart()

/*    this.rebuildData(this.item);
    this.buildEChartOption(this.item);
    this.query();
    this.queryHomeChart();*/

  }

  async showCondition() {

    const l = this;
    const  n = await this.modalCtrl.create({
        component: ModalConditionPage,
        componentProps: { beginDate: l.beginDate, endDate: l.endDate }
      });
    await  n.present();
    await n.onDidDismiss().then(x => {
         let y: any = x.data;
         l.beginDate = y.beginDate;
         l.endDate = y.endDate;
         l.mode = 'between';
         l.query();
     });
  };

  query() {
    // this.mode=mode;
    //alert(this.mode);
    if (this.mode === '') {

        this.showCondition();
        return;
    }
    if ("month" == this.mode) {
          this.beginDate = this.dateFormat.formatDateCurrentMonthFirst();
          this.endDate = this.dateFormat.formatDateCurrentMonthLast();
      }
    else if ("week" == this.mode) {
          this.beginDate = this.dateFormat.formatDateCurrentWeekByFrist();
          this.endDate = this.dateFormat.formatDateCurrentWeekByLast();
      }
    else if ("today" == this.mode) {
          this.beginDate = this.dateFormat.formatDateCurrentDate();
          this.endDate = this.dateFormat.formatDateCurrentDate();
    }
    else if ("yesterday" == this.mode) {
          this.beginDate = this.dateFormat.formatDateByYesterday();
          this.endDate = this.dateFormat.formatDateByYesterday();
    }

    const data = new Reqdata();
    data.mode = this.mode;
    data.beginDate = this.beginDate;
    data.endDate = this.endDate;

    this.getRequestContact(data, true);
  }

  query2() {
    // this.mode1=l;
    // alert(this.mode1);
    this.queryHomeChart(false);
  }

  showdetail(type: string,vcode:string) {
    // alert(type);
      if (type === 'product') {
          this.router.navigate(['/productrankings'], {
        //this.navCtrl.navigateForward('/productrankings', {
            queryParams: {
                code: vcode,
                beginDate: this.beginDate,
                endDate: this.endDate
            }
        });
      // alert(this.item.productCode);
    } else if (type === 'shopping') {
        this.router.navigate(['/shoppingguiderankings'], {
            queryParams: {
                code: vcode,
                beginDate: this.beginDate,
                endDate: this.endDate
            }
        });
      // alert(this.item.shoppingCode);
    } else {
        this.router.navigate(['/storerankings'], {
            queryParams: {
                code: vcode,
                beginDate: this.beginDate,
                endDate: this.endDate
            }
        });
      // alert(this.item.storeCode);
    }
  }

queryHomeChart(showLoad: boolean = null) {
    const t = new Reqdata();
    t.mode = this.mode1;
    t.beginDate = this.beginDate;
    t.endDate = this.endDate;
    this.ApiService.requestData(t, (e) => {
            this.buildEChartOption1(e);
    });
  };

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
    // this.EChart2.setOption(this.echartOption1);
  };

  initChart() {
  }

  chartOption123 = {
    title: {
      text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }

Baroptions = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],

          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直达', selected: true },
            { value: 679, name: '营销广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],

          data: [
            { value: 335, name: '直达' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1048, name: '百度' },
            { value: 251, name: '谷歌' },
            { value: 147, name: '必应' },
            { value: 102, name: '其他' }
          ]
        }
      ]
    }

  linkoption = {
    title: {
      text: '懒猫今日访问量'
      },
      color: ['#3398DB'],
      //气泡提示框，常用于展现更详细的数据
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          //显示缩放按钮
          dataZoom: {
            show: true
          },
          //显示折线和块状图之间的切换
          magicType: {
            show: true,
            type: ['bar', 'line']
          },
          //显示是否还原
          restore: {
            show: true
          },
          //是否显示图片
          saveAsImage: {
            show: true
          }
        }
      },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: [21231,1212,21231,3213],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          rotate: 20
        },
      }],
      yAxis: [{
        name: "懒猫今日访问量",
        type: 'value'
      }],
      series: [{
        name: '今日访问次数',
        type: 'bar',
        barWidth: '60%',
        label: {
          normal: {
            show: true
          }
        },
        data:[21231,1212,21231,3213]
      }]
    }

  option1 = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {formatter:'{value}'},
          data: [{value: 40, name: '今日新增粉丝'}]
        }
    ]
};
// setInterval(function () {
//   option1.series[0].data[0].value = (Math.random() * 100).toFixed(2)-0;
//   myChart.setOption(option1, true);
// },2000);



}