import * as React from "react"

import Layout from "../components/layout"

const ThirdPage = () => (
  <Layout>
    <h1>HELLO FROM THE THIRD PAGE</h1>
  </Layout>
)

export default ThirdPage

// NoTE : As long as we export something out that is a component as a default from this file gatsby will know to use that component for that route  . It will automatically show this component at /page-3