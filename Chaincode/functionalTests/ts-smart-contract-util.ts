/*
* This file contains functions for the use of your test file.
* It doesn't require any changes for immediate use.
*/

import * as fabricNetwork from 'fabric-network';
import * as fs from 'fs-extra';
import * as yaml from 'js-yaml';
import { URL } from 'url';

import * as os from 'os';
import * as path from 'path';

export class SmartContractUtil {

    public static async getConnectionProfile() {
        const homedir = os.homedir();
        const connectionProfilePath: string = path.join(homedir, '.fabric-vscode', 'environments', 'TwoOrgEnv', 'gateways', 'Org1', 'Org1.json');

        const connectionProfileContents: any = await fs.readFile(connectionProfilePath, 'utf8');
        if (connectionProfilePath.endsWith('.json')) {
            return JSON.parse(connectionProfileContents);
        } else if (connectionProfilePath.endsWith('.yaml') || connectionProfilePath.endsWith('.yml')) {
            return yaml.safeLoad(connectionProfileContents);
        }
    }

    public static async submitWriteTransaction(contractName: string, functionName: string, args: string[], gateway, latitude?: Number, longitude?: Number): Promise<Buffer> {
        // Submit transaction
        const network: fabricNetwork.Network = await gateway.getNetwork('mychannel');
        let contract: fabricNetwork.Contract;
        if (contractName !== '') {
            contract = await network.getContract('amazon-tracing', contractName);
        } else {
            contract = await network.getContract('amazon-tracing');
        }

        const responseBuffer: Buffer = await contract.createTransaction(functionName).setTransient({
            latitude: Buffer.from(latitude.toString()),
            longitude: Buffer.from(longitude.toString())
        }).submit(...args);
        
        return responseBuffer;
    }

    public static async submitReadTransaction(contractName: string, functionName: string, args: string[], gateway, privateValue?: string): Promise<Buffer> {
        // Submit transaction
        const network: fabricNetwork.Network = await gateway.getNetwork('mychannel');
        let contract: fabricNetwork.Contract;
        if (contractName !== '') {
            contract = await network.getContract('amazon-tracing', contractName);
        } else {
            contract = await network.getContract('amazon-tracing');
        }

        const responseBuffer: Buffer = await contract.evaluateTransaction(functionName, ...args);
        return responseBuffer;
    }

    // Checks if URL is localhost
    public static isLocalhostURL(url: string): boolean {
        const parsedURL: URL = new URL(url);
        const localhosts: string[] = [
            'localhost',
            '127.0.0.1',
        ];
        return localhosts.indexOf(parsedURL.hostname) !== -1;
    }

    // Used for determining whether to use discovery
    public static hasLocalhostURLs(profile: any): boolean {
        const urls: string[] = [];
        for (const nodeType of ['orderers', 'peers', 'certificateAuthorities']) {
            if (!profile[nodeType]) {
                continue;
            }
            const nodes: any = profile[nodeType];
            for (const nodeName in nodes) {
                if (!nodes[nodeName].url) {
                    continue;
                }
                urls.push(nodes[nodeName].url);
            }
        }
        return urls.some((url: string) => this.isLocalhostURL(url));
    }
}
