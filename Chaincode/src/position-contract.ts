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
    public async createPosition(ctx: Context, positionId: string, latitude: Number, longitude: Number, timestamp: string): Promise<void> {
        const exists = await this.positionExists(ctx, positionId);
        if (exists) {
            throw new Error(`The position ${positionId} already exists`);
        }
        const position = new Position();

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
        const position = new Position();

        position.latitude = latitude;
        position.longitude = longitude;
        position.timestamp = timestamp;

        const buffer = Buffer.from(JSON.stringify(position));
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

}
