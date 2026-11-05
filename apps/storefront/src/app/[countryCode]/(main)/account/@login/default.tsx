import LoginTemplate from "@modules/account/templates/login-template"

// Signed-out visitors opening any account sub-route (profile, orders,
// addresses) see the login form instead of a 404.
export default function LoginDefault() {
  return <LoginTemplate />
}
