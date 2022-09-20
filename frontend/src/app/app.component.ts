import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private http:HttpClient) {}
//Bar Chart
type = 'bar';
         options = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes : [{
                    ticks : {
                        max : 100,    
                        min : 0
                    }
                }]
            }
        };
        data:any;
        barchart:any;
        ngOnInit(){
            //web api call
            this.http.get('http://localhost/chartjs.php').subscribe(data => {
                this.barchart = data;
                
               
                this.data = {
                    labels: this.barchart[0], //months
                    datasets: [{
                    label: "Angular 11",
                    data: this.barchart[1][0],
                    backgroundColor: "#f38b4a",
                    },{
                        label: "Angular 12",
                        data: this.barchart[1][1],
                        backgroundColor: "#6970d5",
                    }]
                };
      
                
        });
}

}
