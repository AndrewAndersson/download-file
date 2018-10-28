import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = 'https://jsonplaceholder.typicode.com/';
  testTypes: User = {
    name: 'String',
    login: 'String',
    city: 'String',
    street: 'String',
    email: 'String',
};

  constructor(
    private http: HttpClient
  ) { }
  getAllUsers () {
    return this.http.get(this.url + 'users');
  }

  // Get XML text
  emitXmlHeader () {
    let headerRow =  '<ss:Row>\n';
    for (const colName in this.testTypes) {
       if (this.testTypes) {
        headerRow += '  <ss:Cell>\n';
        headerRow += '    <ss:Data ss:Type="String">';
        headerRow += colName + '</ss:Data>\n';
        headerRow += '  </ss:Cell>\n';
       }
    }
    headerRow += '</ss:Row>\n';
    return '<?xml version="1.0"?>\n' +
           '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
           '<ss:Worksheet ss:Name="Sheet1">\n' +
           '<ss:Table>\n\n' + headerRow;
}

emitXmlFooter () {
  return '\n</ss:Table>\n' +
         '</ss:Worksheet>\n' +
         '</ss:Workbook>\n';
}

jsonToSsXml (jsonObject) {
  let row;
  let col;
  let xml;
  const data = typeof jsonObject !== 'object'
           ? JSON.parse(jsonObject)
           : jsonObject;

  xml = this.emitXmlHeader();

  for (row = 0; row < data.length; row++) {
      xml += '<ss:Row>\n';

      for (col in data[row]) {
         if (data) {
          xml += '  <ss:Cell>\n';
          xml += '    <ss:Data ss:Type="' + this.testTypes[col]  + '">';
          xml += data[row][col] + '</ss:Data>\n';
          xml += '  </ss:Cell>\n';
         }
      }

      xml += '</ss:Row>\n';
  }

  xml += this.emitXmlFooter();
  return xml;
}

}
