declare namespace e {
  type userPermissions = {
    canSendOrders: boolean
    canReceiveOrders: boolean
    canWriteFiles: boolean
    canWriteDestructively: boolean
    canUpdateSelf: boolean
    canAddUsers: boolean
    canDoBoxes: boolean
    canDoXrefs: boolean
  }
  type fileStatus = {
    readyForPrep: boolean
    readyForScan: boolean
    isStale: boolean
  }
  type dbUser = {
    id: string
    pwHash: string
    email: string
    permissions: number | userPermissions
    firstName: string
    lastName: string | null
  }
}

export default e;