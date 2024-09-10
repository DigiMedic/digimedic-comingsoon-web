import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('http://appwrite-e04ccc40g4wokkg4g44kks0g.194.164.72.131.sslip.io/v1')
    .setProject('66dffe7d00164ce5d81e');

export const account = new Account(client);
export { ID } from 'appwrite';
