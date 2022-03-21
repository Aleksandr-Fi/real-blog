export const getUserData = (data) => ({ type: 'USER_RECEIVED', newUserData: data })

export const logOut = () => ({ type: 'LOG_OUT' })
