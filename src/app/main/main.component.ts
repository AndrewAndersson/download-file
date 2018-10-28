import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { User } from '../models/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  dataSource: User[];
  displayedColumns: string[] = ['name', 'login', 'city', 'street', 'email'];

  constructor(
    private client: ClientService
  ) { }

  ngOnInit() {
    this.client.getAllUsers().subscribe((data: any) => {
      if (data) {
        this.dataSource = data.map(user => {
          return {
            name: user.name,
            login: user.username,
            city: user.address.city,
            street: user.address.street,
            email: user.email,
          };
        });
      }
    });
  }
  downloadTexFile() {
    const fileName = 'userList.xls';
    this.download(fileName, this.client.jsonToSsXml(JSON.stringify(this.dataSource)));
  }

  download(name, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', name);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }
}
