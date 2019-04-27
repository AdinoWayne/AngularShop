import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'environments/environment.prod';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AdminAuthGuardService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [ ProductCardComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
