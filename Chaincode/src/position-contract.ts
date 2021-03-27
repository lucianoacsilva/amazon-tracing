/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Specimen } from './position';

@Info({title: 'SpecimenContract', description: 'My Smart Contract' })
export class SpecimenContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async specimenExists(ctx: Context, specimenId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(specimenId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createSpecimen(ctx: Context, specimenId: string, latitude: Number, longitude: Number, timestamp: string): Promise<Specimen> {
        const exists = await this.specimenExists(ctx, specimenId);
        if (exists) {
            throw new Error(`The specimen ${specimenId} already exists`);
        }
        const specimen = new Specimen();

        specimen.specimenId = specimenId;
        specimen.latitude = latitude;
        specimen.longitude = longitude;
        specimen.timestamp = timestamp;

        const buffer = Buffer.from(JSON.stringify(specimen));
        await ctx.stub.putState(specimenId, buffer);

        return specimen;
    }

    @Transaction(false)
    @Returns('Specimen')
    public async readSpecimen(ctx: Context, specimenId: string): Promise<Specimen> {
        const exists = await this.specimenExists(ctx, specimenId);
        if (!exists) {
            throw new Error(`The specimen ${specimenId} does not exist`);
        }
        const buffer = await ctx.stub.getState(specimenId);
        const specimen = JSON.parse(buffer.toString()) as Specimen;
        return specimen;
    }

    @Transaction()
    public async updateSpecimen(ctx: Context, specimenId: string, latitude: Number, longitude: Number, timestamp: string): Promise<Specimen> {
        const exists = await this.specimenExists(ctx, specimenId);
        if (!exists) {
            throw new Error(`The specimen ${specimenId} does not exist`);
        }

        // Reads current value of specimen
        const currentSpecimen: Specimen = await this.readSpecimen(ctx, specimenId);

        // newSpecimen to be updated
        const newSpecimen = new Specimen();

        newSpecimen.specimenId = currentSpecimen.specimenId;
        newSpecimen.latitude = latitude;
        newSpecimen.longitude = longitude;
        newSpecimen.timestamp = timestamp;

        const buffer = Buffer.from(JSON.stringify(newSpecimen));
        await ctx.stub.putState(specimenId, buffer);

        return newSpecimen;
    }

    @Transaction()
    public async deleteSpecimen(ctx: Context, specimenId: string): Promise<void> {
        const exists = await this.specimenExists(ctx, specimenId);
        if (!exists) {
            throw new Error(`The specimen ${specimenId} does not exist`);
        }
        await ctx.stub.deleteState(specimenId);
    }

    @Transaction(false)
    public async getHistoryOfSpecimen(ctx: Context, key: string): Promise<any[]> {
        const historyIterator = await ctx.stub.getHistoryForKey(key);
        const allResults = [];

        while (true) {
            const res = await historyIterator.next();

            if (res.value && res.value.value.toString()) {
                let Record;

                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } 
                
                catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }

                allResults.push(Record);
            }

            if (res.done) {
                await historyIterator.close();
                console.info(allResults);
                return allResults;
            }
        }
        
    }

    @Transaction(false)
    public async readAllSpecimens(ctx: Context): Promise<Specimen[]> {
        // Query to get all assets
        const getAllQuery = {
            selector: {}
        };

        const iterator = await ctx.stub.getQueryResult(JSON.stringify(getAllQuery));  

        const allResults = [];

        // Return all assets

        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } 
                
                catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }

                Record.key = Key;
                allResults.push(Record);
            }

            if (res.done) {
                await iterator.close();
                console.info(allResults);
                return allResults;
            }
        }
    }

}
