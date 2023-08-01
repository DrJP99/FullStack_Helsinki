import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ parts }: { parts: CoursePart[] }) => {
	return (
		<div>
			{parts.map((p) => (
				<Part part={p} />
			))}
		</div>
	);
};

export default Content;
