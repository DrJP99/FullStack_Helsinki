import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
	return (
		<p>
			<div>
				<strong>
					{part.name} {part.exerciseCount}
				</strong>
			</div>
			{(part.kind === 'basic' ||
				part.kind === 'background' ||
				part.kind === 'special') &&
			part.description ? (
				<div>
					<i>{part.description}</i>
				</div>
			) : null}
			{part.kind === 'background' ? (
				<div>
					See the following: <i>{part.backgroundMaterial}</i>
				</div>
			) : null}
			{part.kind === 'group' ? (
				<div>Project exercises: {part.groupProjectCount}</div>
			) : null}
			{part.kind === 'special' ? (
				<div>
					Required skill:{' '}
					{part.requirements.map((r, i) => (
						<>
							{r}
							{part.requirements.length - 1 !== i ? (
								<>, </>
							) : null}
						</>
					))}
				</div>
			) : null}
		</p>
	);
};

export default Part;
