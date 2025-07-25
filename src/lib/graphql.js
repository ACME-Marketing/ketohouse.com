import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://cms.acmemarketing.us/graphql';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    // You can add authentication headers here if your GraphQL endpoint requires them
    // For now, we'll assume it's public or handled by other means
  },
  timeout: 30000, // 30 second timeout
  retry: 3, // Retry failed requests up to 3 times
});

// Enhanced request function with retry logic and detailed logging
export async function requestWithRetry(query, variables = {}, maxRetries = 3) {
  let lastError;

  console.log("Initiating GraphQL request...");
  console.log("Query:", query);
  if (variables && Object.keys(variables).length > 0) {
    console.log("Variables:", JSON.stringify(variables, null, 2));
  } else {
    console.log("No variables for this query.");
  }
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`GraphQL request attempt ${attempt}/${maxRetries}`);
      const result = await graphQLClient.request(query, variables);
      console.log(`GraphQL request successful on attempt ${attempt}.`);
      console.log("Received data:", JSON.stringify(result, null, 2));
      return result;
    } catch (error) {
      console.error(`GraphQL request failed on attempt ${attempt}:`, error.message);
      if (error.response) {
        console.error("GraphQL Response Error:", JSON.stringify(error.response, null, 2));
      }
      lastError = error;
      
      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error("GraphQL request failed after all retries.");
  throw lastError;
}

export { gql };

export const getPostsByCategory = async (categoryName) => {
  const query = gql`
    query GetPostsByCategory($categoryName: String!) {
      posts(where: { categoryName: $categoryName, tagSlugIn: ["ketohouse"], status: PUBLISH }) {
        nodes {
          uri
          title
        }
      }
    }
  `;

  const variables = { categoryName };
  const data = await requestWithRetry(query, variables);
  return data.posts.nodes;
};

export const getRecipes = async () => {
  // This query looks for posts that have BOTH 'ketohouse' AND 'recipes' tags
  const query = gql`
    query GetRecipes {
      posts(where: { tagSlugIn: ["ketohouse"], status: PUBLISH }) {
        nodes {
          uri
          title
          tags {
            nodes {
              slug
            }
          }
        }
      }
    }
  `;

  const data = await requestWithRetry(query);
  // Filter to only include posts that have BOTH tags
  return data.posts.nodes.filter(post => 
    post.tags.nodes.some(tag => tag.slug === 'recipes')
  );
};

export const getPostByUri = async (uri) => {
  const query = gql`
    query GetPostByUri($uri: ID!) {
      post(id: $uri, idType: URI) {
        title
        content
      }
    }
  `;

  const variables = { uri };
  const data = await requestWithRetry(query, variables);
  return data.post;
};

export const getPostsByTag = async (tagSlug) => {
  const query = gql`
    query GetPostsByTag($tagSlug: [String]) {
      posts(where: { tagSlugIn: ["ketohouse", $tagSlug], status: PUBLISH }) {
        nodes {
          uri
          title
        }
      }
    }
  `;

  const variables = { tagSlug };
  const data = await requestWithRetry(query, variables);
  return data.posts.nodes;
};

export const getAllTags = async () => {
  const query = gql`
    query GetAllTags {
      tags(first: 100) {
        nodes {
          name
          slug
        }
      }
    }
  `;

  const data = await requestWithRetry(query);
  return data.tags.nodes;
};
