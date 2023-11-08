import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, first: $first, after: $after) {
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
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
  }
}
`

export const GET_REPOSITORY_BY_ID = gql`
query Repository($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    id
    fullName
    url
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    description
    language
    ownerAvatarUrl
    reviews (first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`

export const ME = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          text
          repositoryId
          rating
          createdAt
          id
          repository {
            name
            language
            fullName
          }
        }
      }
    }
  }
}
`
