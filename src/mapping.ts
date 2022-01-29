import { Address, BigInt } from "@graphprotocol/graph-ts"
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
import { Holder } from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAll): void { }

export function handleLog(event: Log): void { }

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

export function handlePayeeAdded(event: PayeeAdded): void { }

export function handlePaymentReceived(event: PaymentReceived): void { }

export function handlePaymentReleased(event: PaymentReleased): void { }

export function handleTransfer(event: Transfer): void {
  let to = event.params.to;
  let from = event.params.from;
  let tokenId = event.params.tokenId;
  if (from !== Address.zero()) {
    let fromEntity = Holder.load(from.toHex())
    if (!fromEntity) {
      fromEntity = new Holder(from.toHex())
    }
    let arr = fromEntity.ownedIds
    if (!arr) {
      arr = new Array<BigInt>()
    }
    let index = arr.indexOf(tokenId)
    if (index > -1) {
      arr.splice(index, 1)
    }
    fromEntity.ownedIds = arr
    fromEntity.save()
  }
  let toEntity = Holder.load(to.toHex())
  if (!toEntity) {
    toEntity = new Holder(to.toHex())
  }
  let arr = toEntity.ownedIds
  if (!arr) {
    arr = new Array<BigInt>()
  }
  arr.push(tokenId)
  toEntity.ownedIds = arr
  toEntity.save()
}
