// Connect to MetaMask wallet
let web3;
let contract;
let account;

const contractAddress = "0x797AC47773660843eBD6ED7Fc6bC116dA589Fcba";  
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ECDSAInvalidSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "ECDSAInvalidSignatureLength",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "ECDSAInvalidSignatureS",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "ERC2612ExpiredSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "signer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC2612InvalidSigner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "currentNonce",
				"type": "uint256"
			}
		],
		"name": "InvalidAccountNonce",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidShortString",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "StringTooLong",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "EIP712DomainChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "eip712Domain",
		"outputs": [
			{
				"internalType": "bytes1",
				"name": "fields",
				"type": "bytes1"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "verifyingContract",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "salt",
				"type": "bytes32"
			},
			{
				"internalType": "uint256[]",
				"name": "extensions",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
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
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "nonces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
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
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Connect MetaMask wallet
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = (await web3.eth.getAccounts())[0];
            document.getElementById("account").innerText = account;
            contract = new web3.eth.Contract(abi, contractAddress);
        } catch (error) {
            console.error("User rejected the connection", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Get Token Balance
async function getTokenBalance() {
    if (contract && account) {
        const balance = await contract.methods.balanceOf(account).call();
        document.getElementById("tokenBalance").innerText = web3.utils.fromWei(balance, 'ether');
    }
}

// Transfer Tokens
async function transferTokens() {
    const recipient = document.getElementById("recipient").value;
    const amount = document.getElementById("amount").value;

    if (contract && account) {
        const amountInWei = web3.utils.toWei(amount, 'ether');
        await contract.methods.transfer(recipient, amountInWei).send({ from: account });
        alert("Transfer successful");
    }
}

// Permit Transfer (ERC20 Permit)
async function permitTransfer() {
    const permitRecipient = document.getElementById("permitRecipient").value;
    const permitAmount = web3.utils.toWei(document.getElementById("permitAmount").value, 'ether');
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60;  // Permit valid for 1 hour from now

    try {
        const chainId = await web3.eth.getChainId();
        let nonce = await contract.methods.nonces(account).call();

        const domain = {
            name: await contract.methods.name().call(),
            version: "1",
            chainId: chainId,
            verifyingContract: contractAddress
        };

        const types = {
            EIP712Domain: [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" }
            ],
            Permit: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" }
            ]
        };

        const message = {
            owner: account,
            spender: permitRecipient,
            value: permitAmount.toString(),   // Convert BigInt to string
            nonce: nonce.toString(),          // Convert BigInt to string
            deadline: deadline.toString()     // Convert BigInt to string
        };

        const data = {
            domain: domain,
            types: types,
            primaryType: "Permit",
            message: message
        };

        const jsonData = JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );

        const signature = await web3.currentProvider.request({
            method: "eth_signTypedData_v4",
            params: [account, jsonData],
        });

        const { r, s, v } = splitSignature(signature);

        await contract.methods.permit(account, permitRecipient, permitAmount, deadline, v, r, s).send({ from: account });

        alert("Permit successful, tokens can now be transferred by the recipient");

    } catch (error) {
        console.error("Permit Transfer Error:", error);
        alert("Permit functionality failed: " + error.message);
    }
}

// Helper function to split signature
function splitSignature(signature) {
    return {
        r: signature.slice(0, 66),
        s: '0x' + signature.slice(66, 130),
        v: parseInt(signature.slice(130, 132), 16)
    };
}

// Check Allowance for all related accounts
async function checkAllAllowances() {
    if (contract && account) {
        // Clear existing display
        document.getElementById("allowanceInfo").innerHTML = "";

        // Get past Approval events where current account is the spender
        const approvalEvents = await contract.getPastEvents('Approval', {
            filter: { spender: account }, // Only fetch events where current account is the spender
            fromBlock: 0,                 // Start from the first block
            toBlock: 'latest'             // Up to the latest block
        });

        // Create a Map to store unique owner addresses and their allowances
        const authorizedAccounts = new Map();

        // Process each Approval event
        for (let event of approvalEvents) {
            const owner = event.returnValues.owner;
            const allowance = await contract.methods.allowance(owner, account).call();

            // Only add if the allowance is greater than 0
            if (allowance > 0) {
                const allowanceInEth = web3.utils.fromWei(allowance, 'ether');
                
                // Avoid duplicates by using a Map and adding the largest allowance if multiple exist
                if (!authorizedAccounts.has(owner) || authorizedAccounts.get(owner) < allowanceInEth) {
                    authorizedAccounts.set(owner, allowanceInEth);
                }
            }
        }

        // Display the final list of unique authorized accounts
        authorizedAccounts.forEach((allowance, ownerAddress) => {
            displayAllowance(ownerAddress, allowance);
        });

        // Update the "Transfer From" dropdown with authorized accounts
        updateAuthorizedAccountsDropdown(authorizedAccounts);
    }
}

// Function to display the allowance info dynamically
function displayAllowance(ownerAddress, allowance) {
    const allowanceInfo = document.createElement('div');
    allowanceInfo.innerHTML = `<p>Owner: ${ownerAddress}, Allowance: ${allowance} MTK</p>`;
    document.getElementById("allowanceInfo").appendChild(allowanceInfo);
}

// Update the "Transfer From" dropdown with authorized accounts
function updateAuthorizedAccountsDropdown(authorizedAccounts) {
    const dropdown = document.getElementById("authorizedAccounts");
    dropdown.innerHTML = ""; // Clear the existing dropdown options

    authorizedAccounts.forEach((allowance, ownerAddress) => {
        const option = document.createElement("option");
        option.value = ownerAddress;
        option.text = `${ownerAddress} (${allowance} MTK)`;
        dropdown.appendChild(option);
    });
}

// Transfer From (called by spender using the permit authorization)
async function transferFrom() {
    const fromAddress = document.getElementById("authorizedAccounts").value; // Owner address (from dropdown)
    const toAddress = document.getElementById("toAddress").value;     // Recipient address
    const transferAmount = web3.utils.toWei(document.getElementById("transferAmount").value, 'ether'); // Amount to transfer

    if (contract && account) {
        await contract.methods.transferFrom(fromAddress, toAddress, transferAmount).send({ from: account });
        alert("Transfer from successful");
    }
}

// Event listeners
document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
document.getElementById("getBalanceBtn").addEventListener("click", getTokenBalance);
document.getElementById("transferBtn").addEventListener("click", transferTokens);
document.getElementById("permitBtn").addEventListener("click", permitTransfer);
document.getElementById("checkAllowanceBtn").addEventListener("click", checkAllAllowances);
document.getElementById("transferFromBtn").addEventListener("click", transferFrom);
