const LoginForm = ({
	handlesubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
}) => (
	<form onSubmit={handlesubmit}>
		<div>
			username{" "}
			<input
				type="text"
				value={username}
				name="Username"
				onChange={handleUsernameChange}
			/>
		</div>
		<div>
			password{" "}
			<input
				type="password"
				value={password}
				name="Password"
				onChange={handlePasswordChange}
			/>
		</div>
		<button type="submit">login</button>
	</form>
);

export default LoginForm;