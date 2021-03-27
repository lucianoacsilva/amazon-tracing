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

import * as os from 'os';
import * as path from 'path';

describe('SpecimenContract-amazon-tracing@0.0.4', () => {

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

    describe('specimenExists', () => {
        it('should submit specimenExists transaction', async () => {
            // TODO: populate transaction parameters
            const specimenId: string = 'EXAMPLE';
            const args: string[] = [specimenId];

            const response: Buffer = await SmartContractUtil.submitTransaction('SpecimenContract', 'specimenExists', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createSpecimen', () => {
        it('should submit createSpecimen transaction', async () => {
            // TODO: populate transaction parameters
            const specimenId: string = 'EXAMPLE5';
            const latitude: number = 0;
            const longitude: number = 0;
            const timestamp: string = '13/05/2020';
            const args: string[] = [specimenId, latitude.toString(), longitude.toString(), timestamp];

            const response: Buffer = await SmartContractUtil.submitTransaction('SpecimenContract', 'createSpecimen', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            console.log(JSON.parse(response.toString()));
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readSpecimen', () => {
        it('should submit readSpecimen transaction', async () => {
            // TODO: populate transaction parameters
            const specimenId: string = 'EXAMPLE';
            const args: string[] = [specimenId];

            const response: Buffer = await SmartContractUtil.submitTransaction('SpecimenContract', 'readSpecimen', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updateSpecimen', () => {
        it('should submit updateSpecimen transaction', async () => {
            // TODO: populate transaction parameters
            const specimenId: string = 'EXAMPLE5';
            const latitude: number = 2;
            const longitude: number = 4;
            const timestamp: string = 'gigigigigi';
            const args: string[] = [specimenId, latitude.toString(), longitude.toString(), timestamp];

            const response: Buffer = await SmartContractUtil.submitTransaction('SpecimenContract', 'updateSpecimen', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            console.log(JSON.parse(response.toString()));
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deleteSpecimen', () => {
        it('should submit deleteSpecimen transaction', async () => {
            // TODO: populate transaction parameters
            const specimenId: string = 'EXAMPLE5';
            const args: string[] = [specimenId];

            const response: Buffer = await SmartContractUtil.submitTransaction('SpecimenContract', 'deleteSpecimen', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('getHistoryOfSpecimen', () => {
        it('should submit getHistoryOfSpecimen transaction', async () => {
            // TODO: populate transaction parameters
            const key: string = 'EXAMPLE5';
            const args: string[] = [key];

            const response: Buffer = await SmartContractUtil.submitTransaction('SpecimenContract', 'getHistoryOfSpecimen', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            console.log(JSON.parse(response.toString()));
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readAllSpecimens', () => {
        it('should submit readAllSpecimens transaction', async () => {
            // TODO: Update with parameters of transaction
            const args: string[] = [];

            const response: Buffer = await SmartContractUtil.submitTransaction('SpecimenContract', 'readAllSpecimens', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
