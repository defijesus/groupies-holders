import { BigInt } from "@graphprotocol/graph-ts"
import {
  Groupies,
  Approval,
  ApprovalForAll,
  Log,
  OwnershipTransferred,
  PayeeAdded,
  PaymentReceived,
  PaymentReleased,
  Transfer
} from "../generated/Groupies/Groupies"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.approved = event.params.approved

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DURATION(...)
  // - contract.END_PRICE(...)
  // - contract.MAX_MINT_AMOUNT(...)
  // - contract.MAX_SUPPLY(...)
  // - contract.PRICE_PER_SECOND(...)
  // - contract.START_PRICE(...)
  // - contract.balanceOf(...)
  // - contract.baseURI(...)
  // - contract.contractURI(...)
  // - contract.currentPrice(...)
  // - contract.decimals(...)
  // - contract.details(...)
  // - contract.endTime(...)
  // - contract.getApproved(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerMintsRemaining(...)
  // - contract.ownerOf(...)
  // - contract.payee(...)
  // - contract.priceAtTime(...)
  // - contract.proxyRegistryAddress(...)
  // - contract.released(...)
  // - contract.shares(...)
  // - contract.startTime(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenURI(...)
  // - contract.totalReleased(...)
  // - contract.totalShares(...)
  // - contract.totalSupply(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleLog(event: Log): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePayeeAdded(event: PayeeAdded): void {}

export function handlePaymentReceived(event: PaymentReceived): void {}

export function handlePaymentReleased(event: PaymentReleased): void {}

export function handleTransfer(event: Transfer): void {}