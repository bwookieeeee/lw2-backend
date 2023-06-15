const constants = {
  permissionFlags: {
    canSendOrders: 1,                 // user can submit order requests
    canReceiveOrders: 2,             // user can receive order requests
    canWriteFiles: 4,               // User can write to files (non-destructive)
    canWriteFilesDestructively: 8, // User can write to files (destructive)
    canUpdateSelf: 16,             // User can modify their own user object
    canAddUsers: 32,              // User can add other users
    canDoBoxes: 64,              // User can create/modify/delete boxes
    canDoXrefs: 128,             // User can create/modify/delete xrefs
    presets: {
      admin: 255,
      orderDesk: 222,
      trainer: 116,
      citrixer: 92,
      operator: 20,
      caseWorker: 17,
    }
  },
  caseFlags: {
    readyForPrep: 1,
    readyForScan: 2,
    isStale: 4,   // case is partially ready to scan and has not updated in over 7 days
    isRetention: 8,
    isThirty: 16,
    isRedFlag: 32,
    isOut: 64,
  }
}

export default constants;