document.addEventListener('DOMContentLoaded', () => {
    if (window.ethereum) {
        console.log('MetaMask is installed!');

        window.ethereum
            .request({ method: 'eth_requestAccounts' }) // Request user permission
            .then((accounts) => {
                const accountAddress = accounts[0];
                console.log('Connected to MetaMask. Account Address:', accountAddress);
                document.getElementById('accountaddress').innerText = accountAddress;

                const web3 = new Web3(window.ethereum);

                // Add your contract ABI and address here
                const contractABI = [
                    {
                        "inputs": [],
                        "name": "deposite",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "payable",
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
                                "internalType": "uint256",
                                "name": "_amount",
                                "type": "uint256"
                            }
                        ],
                        "name": "withdrawfunds",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "payable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_amount",
                                "type": "uint256"
                            }
                        ],
                        "name": "withdrow",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "payable",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "getbalance",
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
                        "name": "getcontractbalance",
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
                        "name": "owner",
                        "outputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                ]; // Your contract's ABI
                const contractAddress = '0x1C8231d37407A9871AB8dE4AC3B1220BD04BC60b'; // Your contract's address

                const myContract = new web3.eth.Contract(contractABI, contractAddress);

                // Deposit ETH
                const depositButton = document.getElementById('depositbutton');
                depositButton.addEventListener('click', async () => {
                    const amount = web3.utils.toWei(document.getElementById('depositeeth').value, 'ether');
                    try {
                        await myContract.methods.deposite().send({ from: accountAddress, value: amount });
                        console.log('ETH deposited successfully');
                    } catch (error) {
                        console.error('Error depositing ETH:', error);
                    }
                });

                // Withdraw ETH
                const withdrawButton = document.getElementById('withdrawbutton');
                withdrawButton.addEventListener('click', async () => {
                    const amount = web3.utils.toWei(document.getElementById('withdraweth').value, 'ether');
                    try {
                        await myContract.methods.withdrow(amount).send({ from: accountAddress });
                        console.log('ETH withdrawn successfully');
                    } catch (error) {
                        console.error('Error withdrawing ETH:', error);
                    }
                });

                // Get Balance
                const getBalanceButton = document.getElementById('getbalance');
                getBalanceButton.addEventListener('click', async () => {
                    try {
                        const balance = await myContract.methods.getbalance().call({ from: accountAddress });
                        document.getElementById('balance').innerText = web3.utils.fromWei(balance, 'ether') + ' ETH';
                    } catch (error) {
                        console.error('Error getting balance:', error);
                    }
                });
            })
            .catch((error) => {
                console.error('Error connecting to MetaMask:', error);
            });
    } else {
        alert('Please install MetaMask!');
    }
});
