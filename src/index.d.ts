export type userPermissions = {
  canSendOrders: boolean
  canReceiveOrders: boolean
  canWriteFiles: boolean
  canWriteDestructively: boolean
  canUpdateSelf: boolean
  canAddUsers: boolean
  canDoBoxes: boolean
  canDoXrefs: boolean
}
export type fileStatus = {
  readyForPrep: boolean
  readyForScan: boolean
  isStale: boolean
}
export type dbUser = {
  id: string
  pwHash: string
  email: string
  permissions: number | userPermissions
  firstName: string
  lastName: string | null
}
