/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

import * as assert from 'assert';
import * as fabricNetwork from 'fabric-network';
import { SmartContractUtil } from './ts-smart-contract-util';
import { Position } from "../src/position";

import * as os from 'os';
import * as path from 'path';

describe('PositionContract-amazon-tracing@0.0.1', () => {

    const homedir: string = os.homedir();
    const walletPath: string = path.join(homedir, '.fabric-vscode', 'environments', 'TwoOrgEnv', 'wallets', 'Org1');
    const gateway: fabricNetwork.Gateway = new fabricNetwork.Gateway();
    const fabricWallet: fabricNetwork.FileSystemWallet = new fabricNetwork.FileSystemWallet(walletPath);
    const identityName: string = 'admin';
    let connectionProfile: any;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
    });

    beforeEach(async () => {
        const discoveryAsLocalhost: boolean = SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled: boolean = true;

        const options: fabricNetwork.GatewayOptions = {
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled,
            },
            identity: identityName,
            wallet: fabricWallet,
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    describe('positionExists', () => {
        it('should submit positionExists transaction', async () => {
            // TODO: populate transaction parameters
            const positionId: string = 'EXAMPLE';
            const args: string[] = [positionId];

            const response: Buffer = await SmartContractUtil.submitTransaction('PositionContract', 'positionExists', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createPosition', () => {
        it('should submit createPosition transaction', async () => {
            // TODO: populate transaction parameters
            const positionId: string = 'EXAMPLE';
            const latitude: number = 0;
            const longitude: number = 0;
            const timestamp: string = 'EXAMPLE';
            const args: string[] = [positionId, latitude.toString(), longitude.toString(), timestamp];

            const response: Buffer = await SmartContractUtil.submitTransaction('PositionContract', 'createPosition', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readPosition', () => {
        it('should submit readPosition transaction', async () => {
            // TODO: populate transaction parameters
            const positionId: string = 'EXAMPLE';
            const args: string[] = [positionId];

            const response: Buffer = await SmartContractUtil.submitTransaction('PositionContract', 'readPosition', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            const position: Position = JSON.parse(response.toString())

            assert.equal(position.latitude, 0);
            assert.equal(position.longitude, 0);
            assert.equal(position.timestamp, "EXAMPLE")
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updatePosition', () => {
        it('should submit updatePosition transaction', async () => {
            // TODO: populate transaction parameters
            const positionId: string = 'EXAMPLE';
            const latitude: number = -0.02;
            const longitude: number = -27.35;
            const timestamp: string = "13/05/2020:14:27:35";
            const args: string[] = [positionId, latitude.toString(), longitude.toString(), timestamp];

            const response: Buffer = await SmartContractUtil.submitTransaction('PositionContract', 'updatePosition', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deletePosition', () => {
        it('should submit deletePosition transaction', async () => {
            // TODO: populate transaction parameters
            const positionId: string = 'EXAMPLE';
            const args: string[] = [positionId];

            const response: Buffer = await SmartContractUtil.submitTransaction('PositionContract', 'deletePosition', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
