import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	//new blog form
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const [message, setMessage] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogout = (e) => {
		e.preventDefault();

		console.log("logging out...");
		blogService.setToken(null);
		window.localStorage.removeItem("loggedBlogAppUser");
		setUser(null);
		setUsername("");
		setPassword("");
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log("logging in with", username, password);

		try {
			const user = await loginService.login({ username, password });

			window.localStorage.setItem(
				"loggedBlogAppUser",
				JSON.stringify(user)
			);
			setUser(user);
			blogService.setToken(user.token);
			setMessage(`${user.name} was logged in`);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			setUsername("");
			setPassword("");
		} catch (e) {
			setMessage(`Error loggin in: username or password incorrect`);
			setTimeout(() => {
				setUser(null);
			}, 5000);
			console.error(e);
		}
	};

	const loginForm = () => (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					username:{" "}
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => {
							console.log(target.value);
							setUsername(target.value);
						}}
					/>
				</div>
				<div>
					password:{" "}
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);

	const handleNewBlog = async (e) => {
		e.preventDefault();

		const new_blog = { title, author, url };

		try {
			const res = await blogService.create(new_blog);
			setBlogs(blogs.concat(res));

			setMessage(
				`a new blog ${title} by ${author} was successfully added!`
			);
			setTimeout(() => {
				setMessage(null);
			}, 5000);

			setTitle("");
			setAuthor("");
			setUrl("");
		} catch (e) {
			console.error(e.message);
			setMessage("Error creating new blog");
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const createNewForm = () => (
		<div>
			<form onSubmit={handleNewBlog}>
				<div>
					title:{" "}
					<input
						type="text"
						value={title}
						nmae="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:{" "}
					<input
						type="text"
						value={author}
						nmae="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:{" "}
					<input
						type="text"
						value={url}
						nmae="URL"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);

	const Notification = ({ message }) => {
		if (message === null) {
			return null;
		}

		return (
			<div
				style={{
					background: "lightgrey",
					fontSize: 20,
					borderStyle: "solid",
					borderRadius: 5,
					padding: 10,
					marginBottom: 10,
				}}
			>
				{message}
			</div>
		);
	};

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} />
			{!user ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged in{" "}
						<button onClick={handleLogout}>logout</button>
					</p>
					{createNewForm()}
				</div>
			)}
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
