export const getUserData = (data, update = true) => ({ type: 'USER_RECEIVED', newUserData: data, update: update })

export const logOut = () => ({ type: 'LOG_OUT' })
