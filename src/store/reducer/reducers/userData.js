const userState = {
  isFetch: false,
}

const userData = (state = userState, action = 'ACTION') => {
  const { type, newUserData } = action
  switch (type) {
    case 'USER_RECEIVED':
      return {
        isFetch: true,
        user: newUserData,
      }
    case 'LOG_OUT':
      return {
        isFetch: false,
      }
    default:
      return state
  }
}

export default userData
