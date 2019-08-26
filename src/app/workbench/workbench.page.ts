import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ChangeDetectorRef,  SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { HttpParams } from "@angular/common/http";

import { ApiService, Reqdata, dateFormat} from '../services/api.service';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.page.html',
  styleUrls: ['./workbench.page.scss'],
})


export class WorkbenchPage implements OnInit {
  data:any = {
      banner: [],
      menu: []
  };
  selectedDataSource: any = {};
  constructor(
      private readonly router: Router,
      private popoverCtrl: PopoverController,
      private api: ApiService
  ) {

  }

  ngOnInit(): void {
      this.data.menu = this.api.getMenuList();
      let that = this;
      this.api.storage.get("banner").then( l =>{
        var n = [];
        if (l) {
            for (var t in l){
               n.push(l[t]);
            }
            if (n.length) {
                  n.sort(that.compare("sort"));
                  that.data.banner = n;
              }
          }
          if (n.length==0)
              that.data.banner = [{
              base64: "assets/imgs/banner01.png",
              sort: 0
          }
          ];
          that.requestData(l);
      });

    this.api.storage.get("datasource") && this.api.storage.get("datasource").then(l => {
        that.selectedDataSource = l;
      });

  }

  compare(l) {
      return function (n, t) {
          return n[l] - t[l];
      }
  }

  requestData(l) {
      let that = this;
      l = l || {};
      let t = new HttpParams();
      let u = 0;
      for (let a in l) {
          t.set("list[" + u + "].id", l[a].id).set("list[" + u + "].time", l[a].time);
          u++;
      }
      that.api.getBanner(function (t) {
          var e = t && t.data || {};

          for (var u in e) {
              if ("2" == e[u].status && l[u])
                {  
                  e[u] = l[u];
                }
          }
          that.api.storage.set("banner", e);
      }, {
              params: t,
              isLoading: false,
              fullCall: true,
              error: function () { }
          });
  }


  toPage(l) {
      if (l.system) {
          let page = '/' + l.page.toLowerCase().replace(`page`, '');
          this.router.navigate([page]);
      }

      else{
          this.router.navigate(['/report'], {
              queryParams: {
                  title: l.name,
                  id: l.procId
              }
          });
        }
  }

 
}


// export class WorkbenchPage implements OnInit {
//   showloading:boolean = true;
//   constructor() {

//     setTimeout(()=> {
//       this.showloading = false;
//     }, 3000);

//    }


//   ngOnInit() {
//   }
//       chartOption = {
//         title: {
//           text: ''
//           },
//           tooltip: {
//             trigger: 'axis'
//           },
//           legend: {
//             data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
//           },
//           toolbox: {
//             feature: {
//               saveAsImage: {}
//             }
//           },
//           grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//           },
//           xAxis: [
//             {
//               type: 'category',
//               boundaryGap: false,
//               data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
//             }
//           ],
//           yAxis: [
//             {
//               type: 'value'
//             }
//           ],
//           series: [
//             {
//               name: '邮件营销',
//               type: 'line',
//               stack: '总量',
//               areaStyle: { normal: {} },
//               data: [120, 132, 101, 134, 90, 230, 210]
//             },
//             {
//               name: '联盟广告',
//               type: 'line',
//               stack: '总量',
//               areaStyle: { normal: {} },
//               data: [220, 182, 191, 234, 290, 330, 310]
//             },
//             {
//               name: '视频广告',
//               type: 'line',
//               stack: '总量',
//               areaStyle: { normal: {} },
//               data: [150, 232, 201, 154, 190, 330, 410]
//             },
//             {
//               name: '直接访问',
//               type: 'line',
//               stack: '总量',
//               areaStyle: { normal: {} },
//               data: [320, 332, 301, 334, 390, 330, 320]
//             },
//             {
//               name: '搜索引擎',
//               type: 'line',
//               stack: '总量',
//               label: {
//                 normal: {
//                   show: true,
//                   position: 'top'
//                 }
//               },
//               areaStyle: { normal: {} },
//               data: [820, 932, 901, 934, 1290, 1330, 1320]
//             }
//           ]
//         }

//     Baroptions = {
//         tooltip: {
//             trigger: 'item',
//             formatter: "{a} <br/>{b}: {c} ({d}%)"
//         },
//           legend: {
//             orient: 'vertical',
//             x: 'left',
//             data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
//           },
//           series: [
//             {
//               name: '访问来源',
//               type: 'pie',
//               selectedMode: 'single',
//               radius: [0, '30%'],

//               label: {
//                 normal: {
//                   position: 'inner'
//                 }
//               },
//               labelLine: {
//                 normal: {
//                   show: false
//                 }
//               },
//               data: [
//                 { value: 335, name: '直达', selected: true },
//                 { value: 679, name: '营销广告' },
//                 { value: 1548, name: '搜索引擎' }
//               ]
//             },
//             {
//               name: '访问来源',
//               type: 'pie',
//               radius: ['40%', '55%'],

//               data: [
//                 { value: 335, name: '直达' },
//                 { value: 310, name: '邮件营销' },
//                 { value: 234, name: '联盟广告' },
//                 { value: 135, name: '视频广告' },
//                 { value: 1048, name: '百度' },
//                 { value: 251, name: '谷歌' },
//                 { value: 147, name: '必应' },
//                 { value: 102, name: '其他' }
//               ]
//             }
//           ]
//         }



//       linkoption = {
//         title: {
//           text: '懒猫今日访问量'
//           },
//           color: ['#3398DB'],
//           //气泡提示框，常用于展现更详细的数据
//           tooltip: {
//             trigger: 'axis',
//             axisPointer: { // 坐标轴指示器，坐标轴触发有效
//               type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//             }
//           },
//           toolbox: {
//             show: true,
//             feature: {
//               //显示缩放按钮
//               dataZoom: {
//                 show: true
//               },
//               //显示折线和块状图之间的切换
//               magicType: {
//                 show: true,
//                 type: ['bar', 'line']
//               },
//               //显示是否还原
//               restore: {
//                 show: true
//               },
//               //是否显示图片
//               saveAsImage: {
//                 show: true
//               }
//             }
//           },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//           },
//           xAxis: [{
//             type: 'category',
//             data: [21231,1212,21231,3213],
//             axisTick: {
//               alignWithLabel: true
//             },
//             axisLabel: {
//               interval: 0,
//               rotate: 20
//             },
//           }],
//           yAxis: [{
//             name: "懒猫今日访问量",
//             type: 'value'
//           }],
//           series: [{
//             name: '今日访问次数',
//             type: 'bar',
//             barWidth: '60%',
//             label: {
//               normal: {
//                 show: true
//               }
//             },
//             data:[21231,1212,21231,3213]
//           }]
//         }


//       option1 = {
//         tooltip : {
//             formatter: "{a} <br/>{b} : {c}%"
//         },
//         toolbox: {
//             feature: {
//                 restore: {},
//                 saveAsImage: {}
//             }
//         },
//         series: [
//             {
//               name: '业务指标',
//               type: 'gauge',
//               detail: {formatter:'{value}'},
//               data: [{value: 40, name: '今日新增粉丝'}]
//             }
//         ]
//     };
//     // setInterval(function () {
//     //   option1.series[0].data[0].value = (Math.random() * 100).toFixed(2)-0;
//     //   myChart.setOption(option1, true);
//     // },2000);

// }