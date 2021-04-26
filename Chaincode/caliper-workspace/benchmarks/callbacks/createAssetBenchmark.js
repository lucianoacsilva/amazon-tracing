'use strict';

module.exports.info  = 'Template callback';

const contractID = 'amazon-tracing';
const version = '0.0.8';

let bc, ctx, clientArgs, clientIdx;

module.exports.init = async function(blockchain, context, args) {
    // Initialize environment
    bc = blockchain;
    ctx = context;
    clientArgs = args;
    clientIdx = ctx.clientIdx.toString();
};

module.exports.run = function() {
    const randomId = Math.floor((Math.random() * 100)).toString();
    const latitude = Math.random() * 100;
    const longitude = Math.random() * 100;
    const timestamp = new Date(Date.now()).toISOString();

    const privateData = {
        latitude: latitude.toString(),
        longitude: longitude.toString()
    };

    const myArgs = {
        chaincodeFunction: 'createSpecimen',
        invokerIdentity: 'admin',
        chaincodeArguments: [randomId, timestamp],
        transientMap: privateData
    };

    return bc.bcObj.invokeSmartContract(ctx, contractID, version, myArgs);
};

module.exports.end = async function() {
};