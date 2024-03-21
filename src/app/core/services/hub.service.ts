import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from "@microsoft/signalr";

export abstract class HubService {

    protected connection: HubConnection|undefined;

    constructor(private url: string) {}

    protected async createConnection(params: IHttpConnectionOptions) {
        this.connection = new HubConnectionBuilder()
            .withUrl(this.url, params)
            .withAutomaticReconnect()
            .build();
        await this.connection.start();

        for(let key of Object.keys(this.subscriptions)) {
            this.connection.on(key, this.subscriptions[key]);
        }

        this.connection.onreconnecting((error?: Error|undefined) => this.onReconnecting(error));
        this.connection.onreconnected((connectionId?: string|undefined) => this.onReconnected(connectionId));
    }

    protected async stopConnection() {
        await this.connection?.stop();
        this.connection = undefined;
    }

    protected abstract get subscriptions(): Subscriptions;
    protected abstract onReconnecting(error?: Error|undefined): void;
    protected abstract onReconnected(connectionId?: string|undefined): void;
}

export interface Subscriptions {[key: string]: (...args: any) => void}