import { ClipLoader } from 'react-spinners';

interface LoadingBoxProps {
	size?: number; // Optional, with a default value
	color?: string; // Optional, with a default value
	text?: string; // Optional, with a default value
	block?: boolean; // Optional, no default
}

export const LoadingBox: React.FC<LoadingBoxProps> = ({ size = 10, color = '#fe6b02', text = '', block }) => {
	return (
		<div className={`${'loadingBox'}   ${block && 'dim'} `}>
			<ClipLoader color={color} size={size} />
			{text === '' ? <span hidden>{text}</span> : <span>{text}</span>}
		</div>
	);
};
