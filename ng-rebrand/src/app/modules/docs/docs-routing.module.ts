import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsComponent } from './docs.component';

const routes: Routes = [
    {
        path: "",
        component: DocsComponent,
        children: [
            { path: "", redirectTo: "kitchen-sink", pathMatch: "full" },
            {
                path: "kitchen-sink",
                loadChildren: () =>
                    import("../kitchen-sink/kitchen-sink.module").then(m => m.KitchenSinkModule)
            },
            {
                path: "demos",
                loadChildren: () =>
                    import("../demos/demos.module").then(m => m.DemosModule)
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocsRoutingModule { }
