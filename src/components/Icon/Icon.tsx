interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({
  name,
  width = 24,
  height = 24,
  className,
}: IconProps) {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/icons/icons.svg#icon-${name}`} />
    </svg>
  );
}
