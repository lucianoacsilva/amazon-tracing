

// Setting for Hyperledger Fabric
const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const os = require("os")
const homedir = os.homedir();
const {
    envName,
    orgName,
    identityName,
    ccpName,
    ccName,
    channel
} = require("../env");
const ccpPath = path.join(homedir, '.fabric-vscode', 'environments', envName, 'gateways', orgName, orgName + '.json');


const getAllSpecimens = async function (req, res) {
    try {

        console.log("Connection Profile: ");
        console.log(ccpPath);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(homedir, '.fabric-vscode', 'environments', envName, 'wallets', orgName);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(identityName);
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(ccName);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('readAllSpecimens');
        console.log(`Transaction has been evaluated, result is: ${JSON.parse(result.toString())}`);

        const parsedResult = JSON.parse(result.toString());
        
        res.status(200).json({
            response: parsedResult
        });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
    }
}

const readSpecimen = async function (req, res) {
    try {
        const {
            index
        } = req.params;
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(homedir, '.fabric-vscode', 'environments', envName, 'wallets', orgName);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(identityName);

        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(ccName);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('readSpecimen', index);
        console.log(`Transaction has been evaluated, result is: ${JSON.parse(result.toString())}`);

        
        res.status(200).json({
            response: JSON.parse(result.toString())
        });

    } 
    
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
    }
}

const createSpecimen = async function (req, res) {
    try {
        const {
            specimenId,
            latitude,
            longitude,
            timestamp
        } = req.body;


        const arguments = [specimenId, timestamp]
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(homedir, '.fabric-vscode', 'environments', envName, 'wallets', orgName);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(identityName);

        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(ccName);

        // Evaluate the specified transaction.
        const result = await contract.createTransaction('createSpecimen').setTransient({
            latitude: Buffer.from(latitude.toString()),
            longitude: Buffer.from(longitude.toString())
        }).submit(...arguments);
        
        res.status(200).json({
            message: "Specimen created successfully",
            result: JSON.parse(result.toString())
        });

        // Disconnect from gateway
        await gateway.disconnect();

    } 
    
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });

    }
}

const updateSpecimen = async function (req, res) {
    try {

        const {
            specimenId
        } = req.params;

        const {
            latitude,
            longitude
        } = req.body;

        const timestamp = new Date(Date.now()).toISOString();
        const arguments = [specimenId, latitude.toString(), longitude.toString(), timestamp]
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(homedir, '.fabric-vscode', 'environments', envName, 'wallets', orgName);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(identityName);
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(ccName);

        // Evaluate the specified transaction.
        
        const result = await contract.submitTransaction('updateSpecimen', ... arguments);
        
        res.status(200).json({
            message: "Specimen updated successfully",
            result: JSON.parse(result.toString())
        });

        // Disconnect from gateway
        await gateway.disconnect();

    } 
    
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });

    }
}

const deleteSpecimen = async function (req, res) {
    try {
        const {
            index
        } = req.params;
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(homedir, '.fabric-vscode', 'environments', envName, 'wallets', orgName);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(identityName);
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(ccName);

        // Evaluate the specified transaction.
        const result = await contract.submitTransaction('deleteSpecimen', index);

        res.status(200).json({
            message: "Specimen deleted successfully",
        });

        // Disconnect from gateway
        await gateway.disconnect();

    } 
    
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });

    }
}

const getHistoryOfSpecimen = async function (req, res) {
    const {
        key
    } = req.params;

    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(homedir, '.fabric-vscode', 'environments', envName, 'wallets', orgName);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(identityName);
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(ccName);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('getHistoryOfSpecimen', key.toString());
        console.log(`Transaction has been evaluated, result is: ${JSON.parse(result.toString())}`);

        const parsedResult = JSON.parse(result.toString());
        
        res.status(200).json({
            response: parsedResult
        });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
    }
}

module.exports = {
    getAllSpecimens,
    readSpecimen,
    createSpecimen,
    updateSpecimen,
    deleteSpecimen,
    getHistoryOfSpecimen
}