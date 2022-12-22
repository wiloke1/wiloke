// Type definitions for stompjs 2.3
// Project: https://github.com/jmesnil/stomp-websocket
// Definitions by: Jimi Charalampidis <https://github.com/jimic>
//                 Stefan Erichsen <https://github.com/Dr4k4n>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

export const VERSIONS: {
  V1_0: string;
  V1_1: string;
  V1_2: string;
  supportedVersions: () => string[];
};

export class Client {
  connected: boolean;
  counter: number;
  heartbeat: {
    incoming: number;
    outgoing: number;
  };
  maxWebSocketFrameSize: number;
  subscriptions: Record<string, any>;
  ws: WebSocket;

  debug(...args: string[]): any;

  connect(headers: Record<string, any>, connectCallback: (frame?: Frame) => any, errorCallback?: (error: Frame | string) => any): any;
  disconnect(disconnectCallback: () => any, headers?: Record<string, any>): any;

  send(destination: string, headers?: Record<string, any>, body?: string): any;
  subscribe(destination: string, callback?: (message: Message) => any, headers?: Record<string, any>): Subscription;
  unsubscribe(id: string): void;

  begin(transaction: string): any;
  commit(transaction: string): any;
  abort(transaction: string): any;

  ack(messageID: string, subscription: string, headers?: Record<string, any>): any;
  nack(messageID: string, subscription: string, headers?: Record<string, any>): any;
}

export interface Subscription {
  id: string;
  unsubscribe(): void;
}

export interface Message extends Frame {
  ack(headers?: Record<string, any>): any;
  nack(headers?: Record<string, any>): any;
}

export class Frame {
  command: string;
  headers: Record<string, any>;
  body: string;
  constructor(command: string, headers?: Record<string, any>, body?: string);

  toString(): string;
  static sizeOfUTF8(s: string): number;
  static unmarshall(datas: any): any;
  static marshall(command: string, headers?: Record<string, any>, body?: string): any;
}

export function client(url: string, protocols?: string | Array<string>): Client;
export function over(ws: WebSocket): Client;
export function overTCP(host: string, port: number): Client;
export function overWS(url: string): Client;
export function setInterval(interval: number, f: (...args: any[]) => void): NodeJS.Timer;
export function clearInterval(id: NodeJS.Timer): void;

export const Stomp = {
  over,
};
