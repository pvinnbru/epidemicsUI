import { NgModule, Input, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RunOnCreateDirective } from './run-on-create.directive';
import { StartConditionComponent } from './components//website/simulation/start-condition/start-condition.component';
import { InfectionRateComponent } from './components//website/pathogenes/infection-rate/infection-rate.component';
import { StopCriterionComponent } from './components//website/simulation/stop-criterion/stop-criterion.component';
import { FormPercentComponent } from './components/reusable/form-percent/form-percent.component';
import { FormIntComponent } from './components/reusable/form-int/form-int.component';
import { SimulationComponent } from './components//website/simulation/simulation/simulation.component';
import { InterventionsComponent } from "./components//website/interventions/interventions/interventions.component";
import { PathogenesComponent } from "./components//website/pathogenes/pathogenes/pathogenes.component";
import { SettingsComponent } from "./components//website/settings/settings/settings.component";
import { FormTextComponent } from './components/reusable/form-text/form-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralParametersComponent } from './components//website/simulation/general-parameters/general-parameters.component';
import { FormDoubleComponent } from './components/reusable/form-double/form-double.component';
import { DistributionComponent } from './components/reusable/distribution/distribution.component';
import { AgeMatrixComponent } from './components//website/pathogenes/age-matrix/age-matrix.component';
import { DatabaseComponent } from './components//database/database.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AddTomlComponent } from './components/toml/add-toml/add-toml.component';
import { AddTomlDialogComponent } from './components/toml/add-toml-dialog/add-toml-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DropdownComponent } from './components/reusable/dropdown/dropdown.component';
import { DeleteTomlDialogComponent } from './components/toml/delete-toml-dialog/delete-toml-dialog.component';
import { DeleteTomlComponent } from './components/toml/delete-toml/delete-toml.component';
import { VaccinesComponent } from './components//website/vaccines/vaccines.component';
import { MenuItemComponent } from './components//database/menu-item/menu-item.component';
import { FilterMenuComponent } from './components//database/filter-menu/filter-menu.component';
import { AgeSliderComponent } from './components//website/pathogenes/age-matrix/age-slider/age-slider.component';
import { MatInputModule } from '@angular/material/input';
import { PropertiesPanelComponent } from './components//website/properties-panel/properties-panel.component';
import { LoginButtonComponent } from './components/login/login-button/login-button.component';
import { SignUpDialogComponent } from './components/login/sign-up-dialog/sign-up-dialog.component';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { CurrentUserWindowComponent } from './components/login/current-user-window/current-user-window.component';
import { DragAndDropComponent } from './components//website/interventions/drag-and-drop/drag-and-drop.component';
import { UploadDialogComponent } from './components/toml/upload-dialog/upload-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlotDistributionsComponent } from './components/reusable/distribution/plot-distributions/plot-distributions.component';
import { UploadFromPcComponent } from './components/toml/upload-from-pc/upload-from-pc.component';
import { MultiDropdownComponent } from './components/reusable/multi-dropdown/multi-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    RunOnCreateDirective,

    StartConditionComponent,
    InfectionRateComponent,
    StopCriterionComponent,


    SimulationComponent,
    InterventionsComponent,
    PathogenesComponent,
    SettingsComponent,

    GeneralParametersComponent,

    DistributionComponent,
    AgeMatrixComponent,
    DatabaseComponent,
    AddTomlComponent,
    AddTomlDialogComponent,

    DeleteTomlDialogComponent,
    DeleteTomlComponent,
    VaccinesComponent,
    MenuItemComponent,
    FilterMenuComponent,
    AgeSliderComponent,
    PropertiesPanelComponent,
    LoginButtonComponent,
    SignUpDialogComponent,
    LoginDialogComponent,
    CurrentUserWindowComponent,
    UploadDialogComponent,
    DragAndDropComponent,
    PlotDistributionsComponent,
    UploadFromPcComponent,
    AddTomlComponent
  ],
  imports: [
    BrowserModule,
    DropdownComponent,
    MultiDropdownComponent,
    AppRoutingModule,
    FormDoubleComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    FormIntComponent,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    FormPercentComponent,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatSlideToggleModule,

    FormPercentComponent,
    FormIntComponent,
    FormTextComponent,
    FormsModule,
    FormDoubleComponent,
    

    OverlayModule,
    PortalModule,
    MatDialogModule,
MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



