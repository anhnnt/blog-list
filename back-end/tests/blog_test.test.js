const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const res = listHelper.dummy(blogs)
    expect(res).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 10,
            id: '6538dbe2ac910ea02dc365bf'
        }
    ]

    const listWithTwoBlog = [
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 10,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 5,
            id: '6538dbe2ac910ea02dc365bf'
        }
    ]

    test('of empty list is zero', () => {
        const res = listHelper.totalLikes([])
        expect(res).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const res = listHelper.totalLikes(listWithOneBlog)
        expect(res).toBe(10)
    })

    test('of a bigger list is calculated right', () => {
        const res = listHelper.totalLikes(listWithTwoBlog)
        expect(res).toBe(15)
    })
})

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 3,
            id: '6538dbe2ac910ea02dc365bf'
        }
    ]

    const listWithTwoBlog = [
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 12,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 1,
            id: '6538dbe2ac910ea02dc365bf'
        }
    ]

    test('of empty list is zero', () => {
        const res = listHelper.favoriteBlog([])
        expect(res).toEqual({})
    })

    test('when list has only one blog, equals the likes of that', () => {
        const res = listHelper.favoriteBlog(listWithOneBlog)
        expect(res).toEqual(
            {
                title: "testing",
                author: "Cat Association",
                likes: 3
            }
        )
    })

    test('of a bigger list is calculated right', () => {
        const res = listHelper.favoriteBlog(listWithTwoBlog)
        expect(res).toEqual({
            title: "testing",
            author: "Cat Association",
            likes: 12
        })
    })
})

describe('most blogs', () => {
    const listWithOneBlog = [
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 3,
            id: '6538dbe2ac910ea02dc365bf'
        }
    ]

    const listWithManyBlog = [
        {
            title: 'testing',
            author: 'Cat',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 12,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 1,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 5,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 5,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 5,
            id: '6538dbe2ac910ea02dc365bf'
        }
    ]


    test('of empty list is zero', () => {
        const res = listHelper.mostBlogs([])
        expect(res).toEqual({})
    })

    test('when list has only one blog', () => {
        const res = listHelper.mostBlogs(listWithOneBlog)
        expect(res).toEqual(
            {
                author: "Cat Association",
                blogs: 1
            }
        )
    })

    test('of a bigger list is calculated right', () => {
        const res = listHelper.mostBlogs(listWithManyBlog)
        expect(res).toEqual({
            author: "Cat",
            blogs: 3
        })
    })
})

describe('most likes', () => {
    const listWithOneBlog = [
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 3,
            id: '6538dbe2ac910ea02dc365bf'
        }
    ]

    const listWithManyBlog = [
        {
            title: 'testing',
            author: 'Cat',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 12,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 1,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat Association',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 50,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 5,
            id: '6538dbe2ac910ea02dc365bf'
        },
        {
            title: 'testing',
            author: 'Cat',
            url: 'https://cloud.mongodb.com/v2/',
            likes: 5,
            id: '6538dbe2ac910ea02dc365bf'
        }
    ]


    test('of empty list is zero', () => {
        const res = listHelper.mostLikes([])
        expect(res).toEqual({})
    })

    test('when list has only one blog', () => {
        const res = listHelper.mostLikes(listWithOneBlog)
        expect(res).toEqual(
            {
                author: "Cat Association",
                likes: 3
            }
        )
    })

    test('of a bigger list is calculated right', () => {
        const res = listHelper.mostLikes(listWithManyBlog)
        expect(res).toEqual({
            author: "Cat Association",
            likes: 51
        })
    })
})
