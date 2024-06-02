exports.signupView = (user) => userView(user)

const userView = (user) => {
  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  }
}
