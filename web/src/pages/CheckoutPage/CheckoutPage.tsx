import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CheckoutPage = () => {
  return (
    <>
      <MetaTags title="Checkout" description="Checkout page" />

      <h1>CheckoutPage</h1>
      <p>
        Find me in <code>./web/src/pages/CheckoutPage/CheckoutPage.tsx</code>
      </p>
      <p>
        My default route is named <code>checkout</code>, link to me with `
        <Link to={routes.checkout()}>Checkout</Link>`
      </p>
    </>
  )
}

export default CheckoutPage
