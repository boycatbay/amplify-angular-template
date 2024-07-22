import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { HttpClient } from '@angular/common/http';



const client = generateClient<Schema>();

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})



export class TodosComponent {
  constructor(private http: HttpClient) {
  }
  title = 'lambda-upgrade';
  selectedRuntime = '';
  public lambda_list: any;
  public response: any;
  json_body = {};
  onSelected(value: string): void {

    this.selectedRuntime = value;
    console.log(this.selectedRuntime)
    this.json_body = {
      runtimeSelected: this.selectedRuntime
    }
    const url = "https://vzl6jtkdw2.execute-api.us-east-1.amazonaws.com/dev/get-deprecate-lambda-api"
    const api_key = "gSzr08HoSC42TDmeLypjm1lka9b7YWss2AEqtOOi"
    const headers = { 'Content-Type': 'application/json', 'x-api-key': api_key };
    this.http.post(url, this.json_body, { headers }).subscribe((data) => {
      this.lambda_list = data;

    })
  }
  onClick(value: string): void {
    var lambda_name = value;
    var json_body = {
      target_function_name: lambda_name
    };
    const url = "https://vzl6jtkdw2.execute-api.us-east-1.amazonaws.com/dev/upgrade-lambda"
    const api_key = "gSzr08HoSC42TDmeLypjm1lka9b7YWss2AEqtOOi"
    const headers = { 'Content-Type': 'application/json', 'x-api-key': api_key };
    this.http.post(url, json_body, { headers }).subscribe((data) => {
      this.response = data;
      
    })
    window.open("https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions", "_blank");
  }
}
