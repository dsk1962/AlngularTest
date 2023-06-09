import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExternalHtmlComponent } from './components/external-html/external-html.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { CalendarModule } from 'primeng/calendar';
import { BlockUIModule } from 'primeng/blockui';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { DynamicContainerComponent } from './components/dynamic-container/dynamic-container.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DynamicButtonComponent } from './components/dynamic-button/dynamic-button.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageAreaComponent } from './components/message-area/message-area.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ToolbarColumnComponent } from './components/toolbar-column/toolbar-column.component';

@NgModule({
  declarations: [
    AppComponent,
    ExternalHtmlComponent,
    MainPageComponent,
    DynamicFormComponent,
    InputFieldComponent,
    DynamicContainerComponent,
    DynamicButtonComponent,
    MessageAreaComponent,
    DataTableComponent,
    ToolbarColumnComponent
  ],
  imports: [
    AppRoutingModule,
    BlockUIModule,
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
    ReactiveFormsModule,
    TableModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
