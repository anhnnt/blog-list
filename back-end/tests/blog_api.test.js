const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('initially blogs in database', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('unique identifier property of blog is named id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('adding new blog', () => {
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("testpass", 10)
    const user = new User({ username: "test", name: "Anh", passwordHash})
    await user.save()

    const userForToken = {
      username: "test",
      id: user._id
    }

    return (token = jwt.sign(userForToken, process.env.SECRET))
  })

  test('new blog created successfully with code 201', async () => {
    const newBlog = {
      "title": "added blog test",
      "author": "Admin",
      "url": "https://cloud.mongodb.com/v2/",
      "likes": 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).toContain(
      'added blog test'
    )
  })

  test('if likes property is missing', async () => {
    const newBlog = {
      "title": "added blog",
      "author": "Admin",
      "url": "https://cloud.mongodb.com/v2/",
      "id": "3440e89838d8fee13a51cd35"
    }

    const newestBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(newestBlog.body.likes).toBe(0)
  })

  test('if title is missing', async () => {
    const newBlog = {
      "author": "Admin",
      "url": "https://cloud.mongodb.com/v2/",
      "likes": 5,
      "id": "3440e89838d8fee13a51cd35",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
    
    //const blogsAtEnd = await helper.blogsInDb()

    //expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if url is missing', async () => {
    const newBlog = {
      "title": "Cat Association",
      "author": "Admin",
      "likes": 5,
      "id": "3440e89838d8fee13a51cd35",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
    
    //const blogsAtEnd = await helper.blogsInDb()

    //expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('Token is not provided', async () => {
    const newBlog = {
      "author": "Admin",
      "url": "https://cloud.mongodb.com/v2/",
      "likes": 5,
      "id": "3440e89838d8fee13a51cd35",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    
    //const blogsAtEnd = await helper.blogsInDb()

    //expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


describe('deletion of a blog', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("testpass", 10)
    const user = new User({ username: "test", name: "Anh", passwordHash})
    await user.save()

    const userForToken = {
      username: "test",
      id: user._id
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      "title": "added blog test",
      "author": "Admin",
      "url": "https://cloud.mongodb.com/v2/",
      "likes": 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    return token
  })

  test('suceeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.content)
  })
})

describe('change the like value of the blog', () => {
  test('updated successfully with status code 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToChange = blogsAtStart[0]

    // update like from 10 to 5
    const updatedBlog = {
      "likes": 5, 
    }

    await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd[0].likes).toBe(5)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})