interface NavigationItemProps {
  isActive: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export default function NavigationItem(props: NavigationItemProps) {
  return (
    <button
      aria-current="page"
      className={`px-space-md py-space-sm transition-colors flex items-center justify-between 
      ${props.isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}
      font-body-md text-body-md rounded`}
      data-path="overview"
      onClick={props.onClick}
    >
      {props.title}
      <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface">
        {props.subtitle}
      </span>
    </button>
  );
}
