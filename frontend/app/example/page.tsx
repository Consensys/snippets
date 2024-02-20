"use client";

import * as React from "react";
import { collection, item } from "phosphor";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { createCollection } = collection;
    createCollection({
      name: values.name,
      deploymentRequest: {
        networkId: 5,
        platform: {
          variant: {
            name: "FlexibleERC1155",
            tokenIDAssignmentStrategy: "MANUAL",
          },
          symbol: "SHAD",
        },
      },
    });
  }

  async function createItemCall() {
    const { createItem, editItem } = item;

    const resp = await createItem({
      collectionId: "020a4a10-cfd2-4601-bf01-d24d5e095715",
      attributes: {
        title: "title",
        description: "description",
        image_url:
          "https://images.freeimages.com/images/large-previews/527/bird-1361326.jpg?fmt=webp&w=500",
        otherAttributes: {
          isFinite: true,
          isMinted: null,
          num: 3,
        },
      },
    });

    console.log(await resp.json());
  }

  async function editItemCall() {
    const { editItem } = item;

    const resp = await editItem({
      itemId: "7642f788-3971-4b08-990e-4e2c100f8c13",

      attributes: {
        title: "title3",
        description: "description2",
      },
    });

    console.log(await resp.json());
  }

  // async function editItemMeta() {
  //   const { editItemMetadata } = item;

  //   const resp = await editItemMetadata({
  //     items: [  {
  //       itemId: "7642f788-3971-4b08-990e-4e2c100f8c13",
  //       attributes: {
  //         title: "titleXX",
  //         description: "description2",
  //       },
  //     }, 
  //     {
  //       itemId: "e580f392-f257-49fa-9930-bf045c4b0c79",
  //       attributes: {
  //         title: "titleYYY",
  //         description: "description2",
  //       },
  //     },],
  //   });

  //   console.log(await resp.json());
  // }

  async function lock() {
    const { lockItems } = item;

    const resp = await lockItems({
      collectionId: "020a4a10-cfd2-4601-bf01-d24d5e095715"
    });

    console.log(await resp.json());
  }

  async function minted() {
    const { mintItems } = item;

    const resp = await mintItems({
      itemId: "e580f392-f257-49fa-9930-bf045c4b0c79",
      toAddress: "0x4817b6eB2cB0c9e88A2c46C142E3a94011Df7126"
    });

    console.log(await resp.json());
  }



  async function checkMinted() {
    const { checkMintRequest } = item;

    const resp = await checkMintRequest("10bd056f-df7f-4cc5-baec-96e8cd64f744");

    console.log(await resp.json());
  }

  async function del() {
    const { deleteItem } = item;

    const resp = await deleteItem("7642f788-3971-4b08-990e-4e2c100f8c13");

    console.log(await resp.json());
  }

  // async function list() {
  //   const { createListing } = listing

  //   const resp = await createListing({
  //     currency: "ETH",
  //     maxQuantityPerTx: 1,
  //     paymentProviders: ["BETA_FREE_MINT"],
  //     policy: {
  //       ethAddresses: ["0x4817b6eB2cB0c9e88A2c46C142E3a94011Df7126"],
  //       txPayer: "BUYER"
  //     },
  //     price: "1000000000000000000",
  //     tokenIds: ["e580f392-f257-49fa-9930-bf045c4b0c79"],
  //     settlementCurrency: {
  //       "MINT_VOUCHER": "ETH"
  //     }
  //   })

  //   console.log(await resp.json());

  // }

  async function deployOwn() {
    const  { createCollectionWithOwnContract } = collection

    const resp = await createCollectionWithOwnContract({
      name: "test my own contract",
      deploymentRequest: {
        networkId: 5,
        abi: [
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "maxSupply",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "ticketPrice",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
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
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "ERC721IncorrectOwner",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "ERC721InsufficientApproval",
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
            "name": "ERC721InvalidApprover",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              }
            ],
            "name": "ERC721InvalidOperator",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "ERC721InvalidOwner",
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
            "name": "ERC721InvalidReceiver",
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
            "name": "ERC721InvalidSender",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "ERC721NonexistentToken",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "EnforcedPause",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "ExpectedPause",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "OwnableUnauthorizedAccount",
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
                "name": "approved",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
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
                "name": "operator",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "ApprovalForAll",
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
                "name": "account",
                "type": "address"
              }
            ],
            "name": "Paused",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "string",
                "name": "_value",
                "type": "string"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
              }
            ],
            "name": "PermanentURI",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "TicketMinted",
            "type": "event"
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
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "Unpaused",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "MAX_PER_MINT",
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
            "name": "MAX_SUPPLY",
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
            "name": "_ticketPrice",
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
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "contractBalance",
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
            "name": "eventOwner",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "getApproved",
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
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              }
            ],
            "name": "isApprovedForAll",
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
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_tokenURI",
                "type": "string"
              }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "payable",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "ownerOf",
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
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "paused",
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
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
              }
            ],
            "name": "setPrice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
              }
            ],
            "name": "supportsInterface",
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
            "name": "tokenId",
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
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "tokenMeta",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "tokenURI",
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
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
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
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        byteCode: "60806040525f60095566038d7ea4c68000600a553480156200001f575f80fd5b506040516200334f3803806200334f833981810160405281019062000045919062000418565b32836040518060400160405280600381526020017f4543540000000000000000000000000000000000000000000000000000000000815250815f90816200008d9190620006be565b5080600190816200009f9190620006be565b5050505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160362000115575f6040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016200010c9190620007e5565b60405180910390fd5b62000126816200019860201b60201c565b505f600660146101000a81548160ff021916908315150217905550816007819055503260085f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600a8190555050505062000800565b5f60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160065f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b620002bc8262000274565b810181811067ffffffffffffffff82111715620002de57620002dd62000284565b5b80604052505050565b5f620002f26200025b565b9050620003008282620002b1565b919050565b5f67ffffffffffffffff82111562000322576200032162000284565b5b6200032d8262000274565b9050602081019050919050565b5f5b83811015620003595780820151818401526020810190506200033c565b5f8484015250505050565b5f6200037a620003748462000305565b620002e7565b90508281526020810184848401111562000399576200039862000270565b5b620003a68482856200033a565b509392505050565b5f82601f830112620003c557620003c46200026c565b5b8151620003d784826020860162000364565b91505092915050565b5f819050919050565b620003f481620003e0565b8114620003ff575f80fd5b50565b5f815190506200041281620003e9565b92915050565b5f805f6060848603121562000432576200043162000264565b5b5f84015167ffffffffffffffff81111562000452576200045162000268565b5b6200046086828701620003ae565b9350506020620004738682870162000402565b9250506040620004868682870162000402565b9150509250925092565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680620004df57607f821691505b602082108103620004f557620004f46200049a565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620005597fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200051c565b6200056586836200051c565b95508019841693508086168417925050509392505050565b5f819050919050565b5f620005a6620005a06200059a84620003e0565b6200057d565b620003e0565b9050919050565b5f819050919050565b620005c18362000586565b620005d9620005d082620005ad565b84845462000528565b825550505050565b5f90565b620005ef620005e1565b620005fc818484620005b6565b505050565b5b818110156200062357620006175f82620005e5565b60018101905062000602565b5050565b601f82111562000672576200063c81620004fb565b62000647846200050d565b8101602085101562000657578190505b6200066f62000666856200050d565b83018262000601565b50505b505050565b5f82821c905092915050565b5f620006945f198460080262000677565b1980831691505092915050565b5f620006ae838362000683565b9150826002028217905092915050565b620006c98262000490565b67ffffffffffffffff811115620006e557620006e462000284565b5b620006f18254620004c7565b620006fe82828562000627565b5f60209050601f83116001811462000734575f84156200071f578287015190505b6200072b8582620006a1565b8655506200079a565b601f1984166200074486620004fb565b5f5b828110156200076d5784890151825560018201915060208501945060208101905062000746565b868310156200078d578489015162000789601f89168262000683565b8355505b6001600288020188555050505b505050505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f620007cd82620007a2565b9050919050565b620007df81620007c1565b82525050565b5f602082019050620007fa5f830184620007d4565b92915050565b612b41806200080e5f395ff3fe6080604052600436106101c1575f3560e01c80636352211e116100f65780638da5cb5b11610094578063b88d4fde11610063578063b88d4fde146105d1578063c87b56dd146105f9578063e985e9c514610635578063f2fde38b14610671576101c1565b80638da5cb5b1461052d57806391b7f5ed1461055757806395d89b411461057f578063a22cb465146105a9576101c1565b806377097fc8116100d057806377097fc8146104a75780637e40be66146104c35780638456cb59146104ed5780638b7afe2e14610503576101c1565b80636352211e1461041957806370a0823114610455578063715018a614610491576101c1565b806320214134116101635780633ccfd60b1161013d5780633ccfd60b1461039b5780633f4ba83a146103b157806342842e0e146103c75780635c975abb146103ef576101c1565b8063202141341461031f57806323b872dd1461034957806332cb6b0c14610371576101c1565b8063095ea7b31161019f578063095ea7b31461026757806309d42b301461028f5780630ae7a310146102b957806317d70f7c146102f5576101c1565b806301ffc9a7146101c557806306fdde0314610201578063081812fc1461022b575b5f80fd5b3480156101d0575f80fd5b506101eb60048036038101906101e69190612005565b610699565b6040516101f8919061204a565b60405180910390f35b34801561020c575f80fd5b5061021561077a565b60405161022291906120ed565b60405180910390f35b348015610236575f80fd5b50610251600480360381019061024c9190612140565b610809565b60405161025e91906121aa565b60405180910390f35b348015610272575f80fd5b5061028d600480360381019061028891906121ed565b610824565b005b34801561029a575f80fd5b506102a361083a565b6040516102b0919061223a565b60405180910390f35b3480156102c4575f80fd5b506102df60048036038101906102da9190612140565b61083f565b6040516102ec91906120ed565b60405180910390f35b348015610300575f80fd5b50610309610851565b604051610316919061223a565b60405180910390f35b34801561032a575f80fd5b50610333610857565b60405161034091906121aa565b60405180910390f35b348015610354575f80fd5b5061036f600480360381019061036a9190612253565b61087c565b005b34801561037c575f80fd5b5061038561097b565b604051610392919061223a565b60405180910390f35b3480156103a6575f80fd5b506103af610981565b005b3480156103bc575f80fd5b506103c56109d4565b005b3480156103d2575f80fd5b506103ed60048036038101906103e89190612253565b6109e6565b005b3480156103fa575f80fd5b50610403610a05565b604051610410919061204a565b60405180910390f35b348015610424575f80fd5b5061043f600480360381019061043a9190612140565b610a1b565b60405161044c91906121aa565b60405180910390f35b348015610460575f80fd5b5061047b600480360381019061047691906122a3565b610a2c565b604051610488919061223a565b60405180910390f35b34801561049c575f80fd5b506104a5610ae2565b005b6104c160048036038101906104bc91906123fa565b610af5565b005b3480156104ce575f80fd5b506104d7610cbe565b6040516104e4919061223a565b60405180910390f35b3480156104f8575f80fd5b50610501610cc4565b005b34801561050e575f80fd5b50610517610cd6565b604051610524919061223a565b60405180910390f35b348015610538575f80fd5b50610541610cdd565b60405161054e91906121aa565b60405180910390f35b348015610562575f80fd5b5061057d60048036038101906105789190612140565b610d05565b005b34801561058a575f80fd5b50610593610d17565b6040516105a091906120ed565b60405180910390f35b3480156105b4575f80fd5b506105cf60048036038101906105ca919061247e565b610da7565b005b3480156105dc575f80fd5b506105f760048036038101906105f2919061255a565b610dbd565b005b348015610604575f80fd5b5061061f600480360381019061061a9190612140565b610dda565b60405161062c91906120ed565b60405180910390f35b348015610640575f80fd5b5061065b600480360381019061065691906125da565b610e40565b604051610668919061204a565b60405180910390f35b34801561067c575f80fd5b50610697600480360381019061069291906122a3565b610ece565b005b5f7f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061076357507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610773575061077282610f52565b5b9050919050565b60605f805461078890612645565b80601f01602080910402602001604051908101604052809291908181526020018280546107b490612645565b80156107ff5780601f106107d6576101008083540402835291602001916107ff565b820191905f5260205f20905b8154815290600101906020018083116107e257829003601f168201915b5050505050905090565b5f61081382610fbb565b5061081d82611041565b9050919050565b610836828261083161107a565b611081565b5050565b600581565b606061084a82610dda565b9050919050565b60095481565b60085f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108ec575f6040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016108e391906121aa565b60405180910390fd5b5f6108ff83836108fa61107a565b611093565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610975578382826040517f64283d7b00000000000000000000000000000000000000000000000000000000815260040161096c93929190612675565b60405180910390fd5b50505050565b60075481565b61098961129e565b5f4790503373ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f193505050501580156109d0573d5f803e3d5ffd5b5050565b6109dc61129e565b6109e4611325565b565b610a0083838360405180602001604052805f815250610dbd565b505050565b5f600660149054906101000a900460ff16905090565b5f610a2582610fbb565b9050919050565b5f8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a9d575f6040517f89c62b64000000000000000000000000000000000000000000000000000000008152600401610a9491906121aa565b60405180910390fd5b60035f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b610aea61129e565b610af35f611387565b565b610afd61144a565b816005811115610b42576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b399061271a565b60405180910390fd5b80600a54610b509190612765565b341015610b92576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b89906127f0565b60405180910390fd5b60075481600954610ba3919061280e565b1115610be4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bdb9061288b565b60405180910390fd5b5f8111610c26576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1d906128f3565b60405180910390fd5b5f600190505b838111610cb85760095f815480929190610c4590612911565b9190505550610c563360095461148b565b610c5f846114a8565b6009543373ffffffffffffffffffffffffffffffffffffffff167fe3bc6f5972e89b7adec47f0277204f27cd981570e200dd4d408093535c9e8e6960405160405180910390a38080610cb090612911565b915050610c2c565b50505050565b600a5481565b610ccc61129e565b610cd4611527565b565b5f47905090565b5f60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610d0d61129e565b80600a8190555050565b606060018054610d2690612645565b80601f0160208091040260200160405190810160405280929190818152602001828054610d5290612645565b8015610d9d5780601f10610d7457610100808354040283529160200191610d9d565b820191905f5260205f20905b815481529060010190602001808311610d8057829003601f168201915b5050505050905090565b610db9610db261107a565b838361158a565b5050565b610dc884848461087c565b610dd4848484846116f3565b50505050565b6060610de582610fbb565b505f610def6118a5565b90505f815111610e0d5760405180602001604052805f815250610e38565b80610e17846118bb565b604051602001610e28929190612992565b6040516020818303038152906040525b915050919050565b5f60055f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff16905092915050565b610ed661129e565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f46575f6040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610f3d91906121aa565b60405180910390fd5b610f4f81611387565b50565b5f7f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b5f80610fc683611985565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361103857826040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161102f919061223a565b60405180910390fd5b80915050919050565b5f60045f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b5f33905090565b61108e83838360016119be565b505050565b5f8061109e84611985565b90505f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146110df576110de818486611b7d565b5b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461116a5761111e5f855f806119be565b600160035f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825403925050819055505b5f73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146111e957600160035f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8460025f8681526020019081526020015f205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b6112a661107a565b73ffffffffffffffffffffffffffffffffffffffff166112c4610cdd565b73ffffffffffffffffffffffffffffffffffffffff1614611323576112e761107a565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161131a91906121aa565b60405180910390fd5b565b61132d611c40565b5f600660146101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61137061107a565b60405161137d91906121aa565b60405180910390a1565b5f60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160065f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b611452610a05565b15611489576040517fd93c066500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6114a4828260405180602001604052805f815250611c80565b5050565b5f8190505b5f811115611523573373ffffffffffffffffffffffffffffffffffffffff166009547fdd267707350af9eb002f84a2bc2278781818109ea58377b5bc92601ce3a5c53f6114fb600954610dda565b60405161150891906120ed565b60405180910390a3808061151b906129b5565b9150506114ad565b5050565b61152f61144a565b6001600660146101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861157361107a565b60405161158091906121aa565b60405180910390a1565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036115fa57816040517f5b08ba180000000000000000000000000000000000000000000000000000000081526004016115f191906121aa565b60405180910390fd5b8060055f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516116e6919061204a565b60405180910390a3505050565b5f8373ffffffffffffffffffffffffffffffffffffffff163b111561189f578273ffffffffffffffffffffffffffffffffffffffff1663150b7a0261173661107a565b8685856040518563ffffffff1660e01b81526004016117589493929190612a2e565b6020604051808303815f875af192505050801561179357506040513d601f19601f820116820180604052508101906117909190612a8c565b60015b611814573d805f81146117c1576040519150601f19603f3d011682016040523d82523d5f602084013e6117c6565b606091505b505f81510361180c57836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161180391906121aa565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461189d57836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161189491906121aa565b60405180910390fd5b505b50505050565b606060405180602001604052805f815250905090565b60605f60016118c984611c9b565b0190505f8167ffffffffffffffff8111156118e7576118e66122d6565b5b6040519080825280601f01601f1916602001820160405280156119195781602001600182028036833780820191505090505b5090505f82602001820190505b60011561197a578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161196f5761196e612ab7565b5b0494505f8503611926575b819350505050919050565b5f60025f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b80806119f657505f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15611b28575f611a0584610fbb565b90505f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611a6f57508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b8015611a825750611a808184610e40565b155b15611ac457826040517fa9fbf51f000000000000000000000000000000000000000000000000000000008152600401611abb91906121aa565b60405180910390fd5b8115611b2657838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b8360045f8581526020019081526020015f205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b611b88838383611dec565b611c3b575f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611bfc57806040517f7e273289000000000000000000000000000000000000000000000000000000008152600401611bf3919061223a565b60405180910390fd5b81816040517f177e802f000000000000000000000000000000000000000000000000000000008152600401611c32929190612ae4565b60405180910390fd5b505050565b611c48610a05565b611c7e576040517f8dfc202b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b611c8a8383611eac565b611c965f8484846116f3565b505050565b5f805f90507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611cf7577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611ced57611cec612ab7565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611d34576d04ee2d6d415b85acef81000000008381611d2a57611d29612ab7565b5b0492506020810190505b662386f26fc100008310611d6357662386f26fc100008381611d5957611d58612ab7565b5b0492506010810190505b6305f5e1008310611d8c576305f5e1008381611d8257611d81612ab7565b5b0492506008810190505b6127108310611db1576127108381611da757611da6612ab7565b5b0492506004810190505b60648310611dd45760648381611dca57611dc9612ab7565b5b0492506002810190505b600a8310611de3576001810190505b80915050919050565b5f8073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611ea357508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611e645750611e638484610e40565b5b80611ea257508273ffffffffffffffffffffffffffffffffffffffff16611e8a83611041565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611f1c575f6040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401611f1391906121aa565b60405180910390fd5b5f611f2883835f611093565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611f9a575f6040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401611f9191906121aa565b60405180910390fd5b505050565b5f604051905090565b5f80fd5b5f80fd5b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611fe481611fb0565b8114611fee575f80fd5b50565b5f81359050611fff81611fdb565b92915050565b5f6020828403121561201a57612019611fa8565b5b5f61202784828501611ff1565b91505092915050565b5f8115159050919050565b61204481612030565b82525050565b5f60208201905061205d5f83018461203b565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561209a57808201518184015260208101905061207f565b5f8484015250505050565b5f601f19601f8301169050919050565b5f6120bf82612063565b6120c9818561206d565b93506120d981856020860161207d565b6120e2816120a5565b840191505092915050565b5f6020820190508181035f83015261210581846120b5565b905092915050565b5f819050919050565b61211f8161210d565b8114612129575f80fd5b50565b5f8135905061213a81612116565b92915050565b5f6020828403121561215557612154611fa8565b5b5f6121628482850161212c565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6121948261216b565b9050919050565b6121a48161218a565b82525050565b5f6020820190506121bd5f83018461219b565b92915050565b6121cc8161218a565b81146121d6575f80fd5b50565b5f813590506121e7816121c3565b92915050565b5f806040838503121561220357612202611fa8565b5b5f612210858286016121d9565b92505060206122218582860161212c565b9150509250929050565b6122348161210d565b82525050565b5f60208201905061224d5f83018461222b565b92915050565b5f805f6060848603121561226a57612269611fa8565b5b5f612277868287016121d9565b9350506020612288868287016121d9565b92505060406122998682870161212c565b9150509250925092565b5f602082840312156122b8576122b7611fa8565b5b5f6122c5848285016121d9565b91505092915050565b5f80fd5b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61230c826120a5565b810181811067ffffffffffffffff8211171561232b5761232a6122d6565b5b80604052505050565b5f61233d611f9f565b90506123498282612303565b919050565b5f67ffffffffffffffff821115612368576123676122d6565b5b612371826120a5565b9050602081019050919050565b828183375f83830152505050565b5f61239e6123998461234e565b612334565b9050828152602081018484840111156123ba576123b96122d2565b5b6123c584828561237e565b509392505050565b5f82601f8301126123e1576123e06122ce565b5b81356123f184826020860161238c565b91505092915050565b5f80604083850312156124105761240f611fa8565b5b5f61241d8582860161212c565b925050602083013567ffffffffffffffff81111561243e5761243d611fac565b5b61244a858286016123cd565b9150509250929050565b61245d81612030565b8114612467575f80fd5b50565b5f8135905061247881612454565b92915050565b5f806040838503121561249457612493611fa8565b5b5f6124a1858286016121d9565b92505060206124b28582860161246a565b9150509250929050565b5f67ffffffffffffffff8211156124d6576124d56122d6565b5b6124df826120a5565b9050602081019050919050565b5f6124fe6124f9846124bc565b612334565b90508281526020810184848401111561251a576125196122d2565b5b61252584828561237e565b509392505050565b5f82601f830112612541576125406122ce565b5b81356125518482602086016124ec565b91505092915050565b5f805f806080858703121561257257612571611fa8565b5b5f61257f878288016121d9565b9450506020612590878288016121d9565b93505060406125a18782880161212c565b925050606085013567ffffffffffffffff8111156125c2576125c1611fac565b5b6125ce8782880161252d565b91505092959194509250565b5f80604083850312156125f0576125ef611fa8565b5b5f6125fd858286016121d9565b925050602061260e858286016121d9565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061265c57607f821691505b60208210810361266f5761266e612618565b5b50919050565b5f6060820190506126885f83018661219b565b612695602083018561222b565b6126a2604083018461219b565b949350505050565b7f43616e6e6f74206d696e74206d6f7265207468616e2035207469636b657473205f8201527f617420612074696d650000000000000000000000000000000000000000000000602082015250565b5f61270460298361206d565b915061270f826126aa565b604082019050919050565b5f6020820190508181035f830152612731816126f8565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61276f8261210d565b915061277a8361210d565b92508282026127888161210d565b9150828204841483151761279f5761279e612738565b5b5092915050565b7f4e6f7420656e6f756768204554482073656e74000000000000000000000000005f82015250565b5f6127da60138361206d565b91506127e5826127a6565b602082019050919050565b5f6020820190508181035f830152612807816127ce565b9050919050565b5f6128188261210d565b91506128238361210d565b925082820190508082111561283b5761283a612738565b5b92915050565b7f4e6f7420656e6f756768207469636b657473206c6566740000000000000000005f82015250565b5f61287560178361206d565b915061288082612841565b602082019050919050565b5f6020820190508181035f8301526128a281612869565b9050919050565b7f416d6f756e74206d7573742062652067726561746572207468616e207a65726f5f82015250565b5f6128dd60208361206d565b91506128e8826128a9565b602082019050919050565b5f6020820190508181035f83015261290a816128d1565b9050919050565b5f61291b8261210d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361294d5761294c612738565b5b600182019050919050565b5f81905092915050565b5f61296c82612063565b6129768185612958565b935061298681856020860161207d565b80840191505092915050565b5f61299d8285612962565b91506129a98284612962565b91508190509392505050565b5f6129bf8261210d565b91505f82036129d1576129d0612738565b5b600182039050919050565b5f81519050919050565b5f82825260208201905092915050565b5f612a00826129dc565b612a0a81856129e6565b9350612a1a81856020860161207d565b612a23816120a5565b840191505092915050565b5f608082019050612a415f83018761219b565b612a4e602083018661219b565b612a5b604083018561222b565b8181036060830152612a6d81846129f6565b905095945050505050565b5f81519050612a8681611fdb565b92915050565b5f60208284031215612aa157612aa0611fa8565b5b5f612aae84828501612a78565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f604082019050612af75f83018561219b565b612b04602083018461222b565b939250505056fea264697066735822122016f8f66e672223b39f63e93bc2156f5a531c224bbe9a74d99b729fbc45774ccd64736f6c63430008180033",
        constructorArgs: ["ticket name", 10000,1]
      },

    })

    console.log(await resp.json())
  }

  return (
    <Button onClick={() => deployOwn()}>
      Create Collection
    </Button>
  );
};

export default Page;
