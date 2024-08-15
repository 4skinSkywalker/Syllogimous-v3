import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DemosComponent } from './demos.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { routes as accordionRoutes } from './pages/bootstrap-widgets/accordion/accordion.routes';
import { routes as alertRoutes } from './pages/bootstrap-widgets/alert/alert.routes';
import { routes as carouselRoutes } from './pages/bootstrap-widgets/carousel/carousel.routes';
import { routes as collapseRoutes } from './pages/bootstrap-widgets/collapse/collapse.routes';
import { routes as datepickerRoutes } from './pages/bootstrap-widgets/datepicker/datepicker.routes';
import { routes as dropdownRoutes } from './pages/bootstrap-widgets/dropdown/dropdown.routes';
import { routes as modalRoutes } from './pages/bootstrap-widgets/modal/modal.routes';
import { routes as navRoutes } from './pages/bootstrap-widgets/nav/nav.routes';
import { routes as offcanvasRoutes } from './pages/bootstrap-widgets/offcanvas/offcanvas.routes';
import { routes as paginationRoutes } from './pages/bootstrap-widgets/pagination/pagination.routes';
import { routes as popoverRoutes } from './pages/bootstrap-widgets/popover/popover.routes';
import { routes as progressbarRoutes } from './pages/bootstrap-widgets/progressbar/progressbar.routes';
import { routes as ratingRoutes } from './pages/bootstrap-widgets/rating/rating.routes';
import { routes as tableRoutes } from './pages/bootstrap-widgets/table/table.routes';
import { routes as timepickerRoutes } from './pages/bootstrap-widgets/timepicker/timepicker.routes';
import { routes as toastRoutes } from './pages/bootstrap-widgets/toast/toast.routes';
import { routes as tooltipRoutes } from './pages/bootstrap-widgets/tooltip/tooltip.routes';
import { routes as typeaheadRoutes } from './pages/bootstrap-widgets/typeahead/typeahead.routes';
import { routes as appInputRoutes } from './pages/app-input/app-input.routes';
import { routes as appTableRoutes } from './pages/app-table/app-table.routes';
import { routes as wizardRoutes } from './pages/wizard/wizard.routes';
import { routes as appChartRoutes } from './pages/app-chart/app-chart.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'accordion', pathMatch: 'full' },
  { path: 'accordion', children: accordionRoutes },
  { path: 'alert', children: alertRoutes },
  { path: 'carousel', children: carouselRoutes },
  { path: 'collapse', children: collapseRoutes },
  { path: 'datepicker', children: datepickerRoutes },
  { path: 'dropdown', children: dropdownRoutes },
  { path: 'modal', children: modalRoutes },
  { path: 'nav', children: navRoutes },
  { path: 'offcanvas', children: offcanvasRoutes },
  { path: 'pagination', children: paginationRoutes },
  { path: 'popover', children: popoverRoutes },
  { path: 'progressbar', children: progressbarRoutes },
  { path: 'rating', children: ratingRoutes },
  { path: 'table', children: tableRoutes },
  { path: 'timepicker', children: timepickerRoutes },
  { path: 'toast', children: toastRoutes },
  { path: 'tooltip', children: tooltipRoutes },
  { path: 'typeahead', children: typeaheadRoutes },
  { path: 'app-input', children: appInputRoutes },
  { path: 'app-table', children: appTableRoutes },
  { path: 'wizard', children: wizardRoutes },
  { path: 'app-chart', children: appChartRoutes },
];

@NgModule({
  declarations: [
    DemosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DemosModule { }
