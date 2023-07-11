import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

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
			setUsername("");
			setPassword("");
		} catch (e) {
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

	return (
		<div>
			<h2>blogs</h2>
			{!user ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged in{" "}
						<button onClick={handleLogout}>logout</button>
					</p>
				</div>
			)}
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
