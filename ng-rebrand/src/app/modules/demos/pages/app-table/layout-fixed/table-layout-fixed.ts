import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'appd-table-layout-fixed',
    standalone: true,
    imports: [ CommonModule, SharedModule ],
    templateUrl: './table-layout-fixed.html',
})
export class AppdTableLayoutFixed {

    hierarchicalData = [
        {
            "title": "This is just a test",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            "children": [
                { "id": 1, "firstName": "Chelsy", "lastName": "Bartos", "email": "cbartos0@nbcnews.com", "gender": "Female", "field1": "230.178.176.179", "field2": "201.25.231.96", "field3": "225.100.140.237", "field4": "177.144.18.249", "field5": "241.99.180.211", "field6": "168.192.201.22" },
                { "id": 2, "firstName": "Ettie", "lastName": "Sturney", "email": "esturney1@senate.gov", "gender": "Female", "field1": "228.106.81.149", "field2": "24.50.141.193", "field3": "159.78.250.248", "field4": "190.42.115.192", "field5": "78.25.2.34", "field6": "71.12.219.89" },
                { "id": 3, "firstName": "Audy", "lastName": "Antonsson", "email": "aantonsson2@cnn.com", "gender": "Female", "field1": "218.69.159.179", "field2": "39.177.34.112", "field3": "23.194.52.144", "field4": "220.109.243.92", "field5": "156.139.242.78", "field6": "71.234.29.101" }
            ]
        },
        {
            "title": "Another test...",
            "description": "Ipsam similique accusantium totam asperiores consectetur!",
            "children": [
                { "id": 4, "firstName": "Julian", "lastName": "Ashford", "email": "jashford3@drupal.org", "gender": "Genderqueer", "field1": "24.106.55.190", "field2": "57.228.67.71", "field3": "17.116.200.125", "field4": "76.24.189.170", "field5": "141.232.176.11", "field6": "217.247.170.148" },
                { "id": 5, "firstName": "Staffard", "lastName": "Deme", "email": "sdeme4@photobucket.com", "gender": "Male", "field1": "110.0.24.249", "field2": "96.143.48.239", "field3": "247.227.86.65", "field4": "31.189.17.195", "field5": "33.189.230.38", "field6": "36.157.26.141" },
                { "id": 6, "firstName": "Reggie", "lastName": "O'Scanlan", "email": "roscanlan5@facebook.com", "gender": "Female", "field1": "166.112.160.242", "field2": "50.210.243.217", "field3": "213.40.89.72", "field4": "202.228.150.54", "field5": "106.94.118.92", "field6": "113.206.87.164" }
            ]
        },
        {
            "title": "Yet another test!",
            "description": "Voluptate iste veniam, in, dolor aspernatur amet nostrum!",
            "children": [
                { "id": 7, "firstName": "Ivor", "lastName": "Seifert", "email": "iseifert6@geocities.com", "gender": "Male", "field1": "9.235.14.111", "field2": "185.48.242.95", "field3": "206.177.69.208", "field4": "215.138.79.236", "field5": "64.192.48.78", "field6": "52.69.132.237" },
                { "id": 8, "firstName": "Nial", "lastName": "Baxill", "email": "nbaxill7@ifeng.com", "gender": "Male", "field1": "214.103.59.13", "field2": "21.52.46.30", "field3": "52.69.70.116", "field4": "18.120.116.173", "field5": "2.232.79.26", "field6": "111.102.8.78" },
                { "id": 9, "firstName": "Mattie", "lastName": "Musgrove", "email": "mmusgrove8@exblog.jp", "gender": "Female", "field1": "211.205.115.181", "field2": "121.210.124.95", "field3": "126.67.75.113", "field4": "19.128.48.141", "field5": "166.217.92.206", "field6": "175.10.154.117" }
            ]
        }
    ];
    
}