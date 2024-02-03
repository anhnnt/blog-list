const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      "title": "testing1",
      "author": "Cat Association",
      "url": "https://cloud.mongodb.com/v2/",
      "likes": 10,
      "id": "6540e89838d8fee13a51cdad"
    },
    {
      "title": "testing",
      "author": "Cat",
      "url": "https://cloud.mongodb.com/v2/",
      "likes": 15,
      "id": "6540e89838d8fee13a51cd23"
    },
    {
      "title": "3testing",
      "author": "Association",
      "url": "https://cloud.mongodb.com/v2/",
      "likes": 3,
      "id": "3440e89838d8fee13a51cdad"
    }
  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { 
    initialBlogs, blogsInDb
}