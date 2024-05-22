"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};


// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line);
}

function createBlock(msg) {
	let currentIndex = Blockchain.blocks.length;
	let block = {
		index: currentIndex,
		prevHash: Blockchain.blocks[currentIndex -1].hash,
		data: msg,
		timestamp: Date.now(),
	}
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
	return block;
}

for (let block of Blockchain.blocks){
	console.log(block)
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function verifyChain (Blockchain) {

	let genesis = 0;
	for (let block of Blockchain.blocks){
		if (block.hash === "000000" && block.index === 0){
			genesis = 1;
		}
		if (genesis === 1){
			for (let block of Blockchain.blocks){

				verifyBlock(block);
			}
		} else {
			return false;
		}
	}
	return true
}


function verifyBlock(block){
	if (block.data && block.hash && block.index >= 0){
		let blockData = JSON.stringify(block);
		let currentHashedBlock = crypto.createHash("sha256").update(blockData).digest("hex");
		if (block.hash !== currentHashedBlock){
			return false;
		}
		console.log(`${block.hash} is verified`)
	}

	return false;
}

function blockHash(bl) {
	let blockData = JSON.stringify(bl)
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		blockData
	).digest("hex");
}
