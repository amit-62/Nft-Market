# Nft-Market
## Quickstart

```
git clone https://github.com/amit-62/Nft-Market
cd Nft-market
yarn
```
# Usage

Deploy:

```
yarn hardhat deploy
```

## Testing

```
yarn hardhat test
```
# Deployment to a testnet or mainnet

1. Setup environment variabltes

You'll want to set your `GOERLI_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in 

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). 
  
- `GOERLI_RPC_URL`: This is url of the goerli testnet node you're working with. 

2. Get testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Deploy

```
yarn hardhat deploy --network goerli
```
