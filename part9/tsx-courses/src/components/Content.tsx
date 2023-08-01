interface CourseParts {
	name: string;
	exerciseCount: number;
}

const Content = ({ parts }: { parts: CourseParts[] }) => {
	return (
		<div>
			{parts.map((p) => (
				<p>
					{p.name} {p.exerciseCount}
				</p>
			))}
		</div>
	);
};

export default Content;
