import * as React from "react"
import { graphql, Link } from "gatsby"  // This "link" component that we get from Gatsby is preety much the gatsby version of ReactRouter link . Means that navigation happens with this link component 
import { StaticImage } from "gatsby-plugin-image" // The "staticImage" component provides  lazy loading with images and optimizing those images. Its just a gatsby methodology  


import Layout from "../components/layout"
import SEO from "../components/seo"   // This SEO component is mainly made for search enginer optimization 
import { node } from "prop-types"

import styled from "styled-components"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
` 


export default ({ data }) => (   // So here by Default we are automatically exporting out the function that represents the actual component that we render for our index page 
                                // On this 'props' Object will be the 'data' Object that is the query return .So using that data we are going to now end up creating some kind of default look to our Index page that shows us our list of blog post  
  <Layout>
    <SEO title="Home" />
    <div>
      <h1>Yihua's Thought</h1>
      <h4>{ data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>
                <span>{ node.frontmatter.title } - { node.frontmatter.date }</span>
              </BlogTitle>
            </BlogLink>
            <p>{ node.excerpt }</p>
          </div>
        ))
      }
    </div>
  </Layout>
)

// export default IndexPage;

export const query = graphql`    
  query {
    allMarkdownRemark (sort:{ fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
// Note: Gatsby is smart enough to know that if you export out something that has this graphql body , then this is probably the query you want to use and pass into whatever component you are exporting out by default 