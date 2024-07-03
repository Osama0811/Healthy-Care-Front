import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/app/environments/environment.prod';

export const BASE_URL = environment.signalRUrl;
@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;

  constructor() {}

  public startConnection(userId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}AdminHub?UserId=${userId}`) 
      .build();
debugger
    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.log('Error while starting SignalR connection: ' + err));
  }

  public get(methodName: string, ...args: any[]): Promise<any> {
    if (!this.hubConnection) {
      return Promise.reject('No SignalR connection found.');
    }
    return this.hubConnection.invoke(methodName, ...args);
  }

  public on(methodName: string, newMethod: (...args: any[]) => void) {
    if (!this.hubConnection) {
      return;
    }
    this.hubConnection.on(methodName, newMethod);
  }

  public stopConnection() {
    if (!this.hubConnection) {
      return;
    }
    this.hubConnection.stop()
      .then(() => console.log('SignalR Disconnected'))
      .catch(err => console.log('Error while stopping SignalR connection: ' + err));
  }
}
