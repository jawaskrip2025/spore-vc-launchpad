"server only"

import { PinataSDK } from "pinata"

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`
})

export const converToIpfs = (cid:string) => {
  return `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${cid}`
}