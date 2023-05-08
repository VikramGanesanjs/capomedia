import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const TheaterPage = () => {
  return (
    <>
      <MetaTags title="Theater" description="Theater page" />

      <h1>TheaterPage</h1>
      <p>
        Find me in <code>./web/src/pages/TheaterPage/TheaterPage.tsx</code>
      </p>
      <p>
        My default route is named <code>theater</code>, link to me with `
        <Link to={routes.theater()}>Theater</Link>`
      </p>
    </>
  )
}

export default TheaterPage
