import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ApiService, dateFormat, XrEchart } from './services/api.service';

import { ModalConditionPageModule } from './modal-condition/modal-condition.module';

import { PreviewimgPageModule } from './previewimg/previewimg.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      driverOrder: ['localstorage']
    }
    ),
     AppRoutingModule,
     HttpClientModule,
     IonicStorageModule.forRoot(),
     ModalConditionPageModule,
     PreviewimgPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ApiService,
    dateFormat,
    XrEchart,
    Camera,
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
