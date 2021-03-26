/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { PositionContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<ChaincodeStub> = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> = sinon.createStubInstance(ClientIdentity);
    public logging = {
        getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
        setLevel: sinon.stub(),
     };
}

describe('PositionContract', () => {

    let contract: PositionContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new PositionContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"position 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"position 1002 value"}'));
    });

    describe('#positionExists', () => {

        it('should return true for a position', async () => {
            await contract.positionExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a position that does not exist', async () => {
            await contract.positionExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createPosition', () => {

        it('should create a position', async () => {
            await contract.createPosition(ctx, '1003', 'position 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"position 1003 value"}'));
        });

        it('should throw an error for a position that already exists', async () => {
            await contract.createPosition(ctx, '1001', 'myvalue').should.be.rejectedWith(/The position 1001 already exists/);
        });

    });

    describe('#readPosition', () => {

        it('should return a position', async () => {
            await contract.readPosition(ctx, '1001').should.eventually.deep.equal({ value: 'position 1001 value' });
        });

        it('should throw an error for a position that does not exist', async () => {
            await contract.readPosition(ctx, '1003').should.be.rejectedWith(/The position 1003 does not exist/);
        });

    });

    describe('#updatePosition', () => {

        it('should update a position', async () => {
            await contract.updatePosition(ctx, '1001', 'position 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"position 1001 new value"}'));
        });

        it('should throw an error for a position that does not exist', async () => {
            await contract.updatePosition(ctx, '1003', 'position 1003 new value').should.be.rejectedWith(/The position 1003 does not exist/);
        });

    });

    describe('#deletePosition', () => {

        it('should delete a position', async () => {
            await contract.deletePosition(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a position that does not exist', async () => {
            await contract.deletePosition(ctx, '1003').should.be.rejectedWith(/The position 1003 does not exist/);
        });

    });

});
