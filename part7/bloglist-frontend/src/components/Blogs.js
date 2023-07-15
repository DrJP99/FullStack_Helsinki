import { useQuery, useQueryClient } from 'react-query'
import Blog from './Blog'
import Togglable from './Togglable'
import { getAll } from '../services/blogs'

const Blogs = () => {
	const queryClient = useQueryClient()

	const handleDelete = (target) => {
		// event.preventDefault()
		console.log('want to delete...', target)
	}

	const handleLike = (target) => {
		// event.preventDefault()
		console.log('want to like...', target)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const result = useQuery('blogs', getAll, {
		refetchOnWindowFocus: false,
		retry: 2,
	})

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	if (result.isError) {
		return <div>Blog service is not available at the moment</div>
	}

	const blogs = result.data

	return (
		<div>
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle}>
					<Togglable
						buttonLabel='view'
						before={blog.title + ' ' + blog.author}
					>
						<Blog
							blog={blog}
							handleLike={handleLike}
							handleDelete={handleDelete}
						/>
					</Togglable>
				</div>
			))}
		</div>
	)
}

export default Blogs
