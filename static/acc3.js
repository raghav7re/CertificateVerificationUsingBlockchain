export const smartcontractadd3="0x91De66417D859440662DebA708Ee36424271ab04";




export const abicode3=[
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "documenthash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_stuId",
				"type": "bytes32"
			}
		],
		"name": "addCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "orgAddress",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "addOrganization",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "stuAddress",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "stuId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "addStudent",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "orgAddress",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "modifyOrganizationAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "orgId",
				"type": "bytes32"
			}
		],
		"name": "getName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "documenthash",
				"type": "bytes32"
			}
		],
		"name": "verifyCertificates",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
