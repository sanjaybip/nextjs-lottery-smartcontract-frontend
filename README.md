# Lottery Smart Contract Frontend

Connect [Lottery smart contract](https://github.com/sanjaydefidev/hardhat-lottery-smartcontract) with the frontend code written in this repository. 

Developed using the React framework `NextJS` and `TypeScript`, it allows you to connect your wallet with Raffle. A minimum lottery entrance fee of `0.1 ETH` is required to enter the raffle.

It displays the connected wallet address and its main balance. As soon as the user enters the raffle, we see a confirmation notification developed using `web3uikit`. We also use it to show the connect button so that players can connect their wallet with our frontend.

We also used `moralis` packages to interact with Lottery smart contract. To style the UI we have used `Tailwind CSS`. 

Our frontend was hosted on [fleek](https://fleek.co/) using IPFS in the most decentralized manner.

This code was written while following the free course on Solidity by Patrick Collions.

## Running the code
To run and test the code in your local development machine copy the repo with the following command. We have used `yarn` package manager. You can use `NPM`.
```shell
git clone https://github.com/sanjaydefidev/nextjs-lottery-smartcontract-frontend
```
Installing all the dependencies
```shell
yarn install
```
Check out this [link](https://github.com/PatrickAlphaC/nextjs-smartcontract-lottery-fcc) for more information about this tutorial.

## Special Thank You Note
Thanks to @PatrickAlphaC for creating such a helpful tutorial.
