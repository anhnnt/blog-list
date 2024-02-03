const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const likesArray = blogs.map(blog => blog.likes)

  const maxIndex = likesArray.indexOf(Math.max(...likesArray))

  //return { title, author, likes } = blogs.maxIndex
  const favoriteBlog = {
    title: blogs[maxIndex].title,
    author: blogs[maxIndex].author,
    likes: blogs[maxIndex].likes
  }

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = blogs.map(blog => blog.author)

  const filterBlogs = _.values(_.groupBy(authors)).map(item => ({
    author: item[0],
    blogs: item.length
  }))
  
  const mostBlogs = filterBlogs.reduce((most, blog) => most.blogs > blog.blogs ? most : blog)

  return mostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const listAuthorsWithLikes = blogs.map(blog => ({
    author: blog.author,
    likes: blog.likes
  }))

  const sortedAuthorList = _.values(_.groupBy(listAuthorsWithLikes, 'author'))

  const mostLikes = sortedAuthorList.map(item => ({
    author: item[0].author,
    likes: item.reduce(((sum, item) => sum + item.likes), 0)
  })).reduce((most, blog) => most.likes > blog.likes ? most : blog)

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}