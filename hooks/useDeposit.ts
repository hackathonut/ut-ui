import Web3 from "web3";
import { SendOptions } from "web3-eth-contract";

const CONTRACT_ADDRESS = "0x7A04c5660bBA30cfDf2F75Dacf42b69033b4b76a";

const contractAbi = [
        {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "CexAddressAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "CexAddressRemoved",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Deposited",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "cexAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "TokenWithdrawn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "WhitelistTokenAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "WhitelistTokenRemoved",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "trigger",
            "type": "address"
          }
        ],
        "name": "WithdrawTriggerAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "trigger",
            "type": "address"
          }
        ],
        "name": "WithdrawTriggerRemoved",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "cexAddress",
            "type": "address"
          }
        ],
        "name": "addCexAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "addWhitelistedToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "trigger",
            "type": "address"
          }
        ],
        "name": "addWithdrawTrigger",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "cexAddressList",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
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
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "cexAddress",
            "type": "address"
          }
        ],
        "name": "removeCexAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "removeWhitelistToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "trigger",
            "type": "address"
          }
        ],
        "name": "removeWithdrawTrigger",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IUtNft",
            "name": "utNft_",
            "type": "address"
          }
        ],
        "name": "setUtNft",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "utNft",
        "outputs": [
          {
            "internalType": "contract IUtNft",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "whitelistToken",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "cexAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawTokenToCex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "withdrawTriggerList",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
]

export const useDepositContract = (web3: Web3 | null) => {
    if(!web3){
        return {
            contractAddress: CONTRACT_ADDRESS,
            deposit: (address:string,amount:string, options: SendOptions) => {
                throw new Error("wallet not installed");
            },
            addWhitelistToken: (address:string) => {
                throw new Error("wallet not installed");
            },
            owner: () => {
                throw new Error("wallet not installed");
            },
            whitelistToken: (address:string) => {
                throw new Error("wallet not installed");
            },
            approve: (spenderAddr:string, amount:string) => {
              throw new Error("wallet not installed");
            }

            


            // mintPlanet: (options: SendOptions) => {
            //     throw new Error("wallet not installed");
            // },
            // tokenURI: (tokenId:string) => {
            //     throw new Error("wallet not installed");
            // },
            // ownerOf: (tokenId: string) => {
            //     throw new Error("wallet not installed");
            // },
            // totalSupply: () => {
            //     throw new Error("wallet not installed");
            // }
        };
    }

    const contract = new web3.eth.Contract(contractAbi as any, CONTRACT_ADDRESS);

    return {
        contractAddress: CONTRACT_ADDRESS,
        deposit: (address:string,amount:string, options: SendOptions) => contract.methods.deposit(address, amount).send(options),
        addWhitelistToken: (address:string) => contract.methods.addWhitelistedToken(address).call(),
        owner: () => contract.methods.owner().call(),
        whitelistToken: (address:string) => contract.methods.whitelistToken(address).call(),
        //approve: (spenderAddr:string, amount:string, options:SendOptions) => contract.methods.approve(spenderAddr, amount).send(options)
        // mintPlanet: (options: SendOptions) => contract.methods.mintPlanet().send(options),
        // tokenURI: (tokenId:string) => contract.methods.tokenURI(tokenId).call(),
        // ownerOf: (tokenId: string) => contract.methods.ownerOf(tokenId).call(),
        // totalSupply: () => contract.methods.totalSupply().call()
    }
  };
