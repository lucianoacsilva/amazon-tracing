/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Position } from './position';

@Info({title: 'PositionContract', description: 'My Smart Contract' })
export class PositionContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async positionExists(ctx: Context, positionId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(positionId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createPosition(ctx: Context, positionId: string, specimenId: string, latitude: Number, longitude: Number, timestamp: string): Promise<void> {
        const exists = await this.positionExists(ctx, positionId);
        if (exists) {
            throw new Error(`The position ${positionId} already exists`);
        }
        const position = new Position();

        position.specimenId = specimenId;
        position.latitude = latitude;
        position.longitude = longitude;
        position.timestamp = timestamp;

        const buffer = Buffer.from(JSON.stringify(position));
        await ctx.stub.putState(positionId, buffer);
    }

    @Transaction(false)
    @Returns('Position')
    public async readPosition(ctx: Context, positionId: string): Promise<Position> {
        const exists = await this.positionExists(ctx, positionId);
        if (!exists) {
            throw new Error(`The position ${positionId} does not exist`);
        }
        const buffer = await ctx.stub.getState(positionId);
        const position = JSON.parse(buffer.toString()) as Position;
        return position;
    }

    @Transaction()
    public async updatePosition(ctx: Context, positionId: string, latitude: Number, longitude: Number, timestamp: string): Promise<void> {
        const exists = await this.positionExists(ctx, positionId);
        if (!exists) {
            throw new Error(`The position ${positionId} does not exist`);
        }

        // Reads current value of position
        const currentPosition: Position = await this.readPosition(ctx, positionId);

        // newPosition to be updated
        const newPosition = new Position();

        newPosition.specimenId = currentPosition.specimenId;
        newPosition.latitude = latitude;
        newPosition.longitude = longitude;
        newPosition.timestamp = timestamp;

        const buffer = Buffer.from(JSON.stringify(newPosition));
        await ctx.stub.putState(positionId, buffer);
    }

    @Transaction()
    public async deletePosition(ctx: Context, positionId: string): Promise<void> {
        const exists = await this.positionExists(ctx, positionId);
        if (!exists) {
            throw new Error(`The position ${positionId} does not exist`);
        }
        await ctx.stub.deleteState(positionId);
    }

    @Transaction(false)
    public async getHistoryOfAsset(ctx: Context, key: string): Promise<any[]> {
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
    public async readAllAssets(ctx: Context): Promise<Position[]> {
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
