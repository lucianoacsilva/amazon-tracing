'use strict';

module.exports.info  = 'Template callback';

const contractID = 'amazon-tracing';
const version = '0.0.8';

let bc, ctx, clientArgs, clientIdx;

module.exports.init = async function(blockchain, context, args) {
    bc = blockchain;
    ctx = context;
    clientArgs = args;
    clientIdx = context.clientIdx.toString();
    for (let i = 0; i < clientArgs.assets; i++) {
        try {
            const assetID = `${clientIdx}_${i}`;
            console.log(`Client ${clientIdx}: Creating asset ${assetID}`);

            const transientData = new Map();
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
                chaincodeArguments: [assetID, timestamp],
                transientMap: privateData
            };

            console.log("Criando asset!!!");
            response = await bc.bcObj.invokeSmartContract(ctx, contractID, version, myArgs);
            console.log(`Criou asset ${assetID}!!!`);
        } catch (error) {
            console.log(`Client ${clientIdx}: Smart Contract threw with error: ${error}` );
        }
    }
};

module.exports.run = function() {
    const randomId =Math.floor(Math.random()*clientArgs.assets);
    
    const myArgs = {
        chaincodeFunction: 'readPublicSpecimenData',
        invokerIdentity: 'admin',
        chaincodeArguments: [`${clientIdx}_${randomId}`]
    };
    //console.log(`Lendo asset ${randomId}!!!`);
    return bc.bcObj.querySmartContract(ctx, contractID, version, myArgs);
};

module.exports.end = async function() {
    for (let i = 0; i < clientArgs.assets; i++) {
        try {
            const assetID = `${clientIdx}_${i}`;
            console.log(`Client ${clientIdx}: Deleting asset ${assetID}`);
            const myArgs = {
                chaincodeFunction: 'deleteSpecimen',
                invokerIdentity: 'admin',
                chaincodeArguments: [assetID]
            };
            console.log("Excluindo asset!!!");
            await bc.bcObj.invokeSmartContract(ctx, contractID, version, myArgs);
            console.log(`Excluiu asset ${assetID}!!!`);
        } catch (error) {
            console.log(`Client ${clientIdx}: Smart Contract threw with error: ${error}` );
        }
    }
};