import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.css']
})
export class KitchenSinkComponent {

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.fragment
      .subscribe(fragment => {

        const element = document.querySelector("#" + fragment);

        if (element)
          element.scrollIntoView({ behavior: "smooth" });
      });
  }

}
