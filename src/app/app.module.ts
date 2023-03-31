import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './interceptors/http-error-interceptor.service';
import { ExternalHtmlComponent } from './components/external-html/external-html.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { DynamicContainerComponent } from './components/dynamic-container/dynamic-container.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DynamicButtonComponent } from './components/dynamic-button/dynamic-button.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExternalHtmlComponent,
    MainPageComponent,
    DynamicFormComponent,
    InputFieldComponent,
    DynamicContainerComponent,
    DynamicButtonComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputMaskModule, 
    InputNumberModule,
    InputTextModule,
    PasswordModule,
    RadioButtonModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
