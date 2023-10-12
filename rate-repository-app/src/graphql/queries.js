import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query getRepositories {
  repositories {
    edges {
      node {
        description
        forksCount
        fullName
        id
        reviewCount
        ratingAverage
        ownerAvatarUrl
        language
        stargazersCount
      }
    }
  }
}
`
