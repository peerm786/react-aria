import { useProgressBar } from '@react-aria/progress';

function ProgressButton(props: any) {
    let { isIndeterminate, value, minValue = 0, maxValue = 100, size = 'md' } = props;
    let { progressBarProps } = useProgressBar(props);

    type Size = 'sm' | 'md' | 'xl';
    const sizeMap: Record<Size, number> = {
        sm: 16,
        md: 32,
        xl: 64
    };


    let dimension = sizeMap[size as Size] || sizeMap['md'];
    let strokeWidth = 4;
    let center = dimension / 2;
    let r = center - strokeWidth;
    let c = 2 * r * Math.PI;
    let percentage = isIndeterminate ? 0.25 : (value - minValue) / (maxValue - minValue);
    let offset = c - percentage * c;

    return (
        <svg
            {...progressBarProps}
            width={dimension}
            height={dimension}
            viewBox={`0 0 ${dimension} ${dimension}`}
            fill="none"
            strokeWidth={strokeWidth}
        >
            <circle
                role="presentation"
                cx={center}
                cy={center}
                r={r}
                stroke="gray"
            />
            <circle
                role="presentation"
                cx={center}
                cy={center}
                r={r}
                stroke="blue"
                strokeDasharray={`${c} ${c}`}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${center} ${center})`}
            >
                {props.isIndeterminate &&
                    (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            begin="0s"
                            dur="1s"
                            from={`0 ${center} ${center}`}
                            to={`360 ${center} ${center}`}
                            repeatCount="indefinite"
                        />
                    )}
            </circle>
        </svg>
    );
}

export default ProgressButton;
