/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {   // 'getNode' is a function that allows you to pull the actuall 'node' representation of a file or an edge 
    console.log(node.internal.type);

    const { createNodeField } = actions

    if (node.internal.type == `MarkdownRemark`){
        const slug = createFilePath({ node, getNode }) // Base is something we wanna add when we wanna add a basepath to the url 

        createNodeField({
            node,
            name: `slug`,
            value: slug 
        })
    }
}          //gatsby is expecting that is you export this method on create node, it is equal to the function and this is gonna pass this function a bunch of properties. One of these bneing the 'node' it self whenever it creating the node 
// As you remember when we did our graphQl query for our files, each file has a node which is a representation of that file 

// What we are gonna say is if node.internal.type is equal to MarkdownRemark then we are actually gonna create this thing called 'slug' 
// A 'Slug' inside gatsby is the URL or the link that the browser is able to access from our application inorder to navigate to the page required   
// So now we have to dynammically build out the slug and attach it to the node as a field . Because we want to access that field inside our application so that whenever we want to route to it we are always pathing to the correct path 
// { createNodeField } is an action we need to pluck out from the 'action' property of .onCreateNode 
// Nopw we are  going to build the field path to our nade. This field path is what we are ging to be using inside of our application to navigate to this page  
// The only things to keep in mind is that inside of gatsby this thing is called a 'Slug' . And a 'slug' is just some kind of file path or navigation path inside of the application that allows us to route to it 


// note : We could build our blog posts as pages but by uusing markdown, it will be easier as we add more and more posts in the future. 

exports.createPages = ({ graphql, actions })  => {            // 'createPages' has 2 arguments that we want to destructure 1. graphql, actions

    const { createPage } = actions              // here we destructured 'createPage' from action , this is an action that allows us to actually build the pages inside of our application based on whatever properties we pass to it
    // So what we wanna actually return from our createPage function is we wanna return a graphql query that gives us back all of our markedown remarks then we gonna iterate over it and simply just call createPage on each of those markdown nodes
    return graphql(`
    {
        allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `).then( result => {
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({            // Now with this node we are going to call 'createPage' and will pass a Object to it, This Object is going to provide the properties that this createPage needs to build the page 
                path: node.fields.slug,         // The 'path' will tell the final appliaction what path actually leads to that pages which I am building 
                component:  path.resolve(`./src/templates/blog-post.js`) ,                   // Now here we are gonna actually pass the component, the components is going to be the template that it uses inorder to actually populate out the final blogpost. So this is going to be a React Component 
                context: {
                  slug: node.fields.slug
                }
            }) 
        })
    })
}

