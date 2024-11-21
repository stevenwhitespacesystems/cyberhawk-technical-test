type Props = {
    size?: "sm" | "md" | "lg";
    color?: string;
};

function Windmill({ size = "md", color = "white" }: Props) {
    const sizes = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <div className={`${sizes[size]}`}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <path d="M11 24L13 24L14 14L10 14L11 24Z" fill="white" />
                <rect x="10" y="12" width="4" height="4" fill="white" />
                <path d="M12 12L7 7L5.5 8.5L10.5 13.5L12 12Z" fill="white" />
                <path d="M12 12L17 7L15.5 5.5L10.5 10.5L12 12Z" fill="white" />
                <path d="M12 12L17 17L18.5 15.5L13.5 10.5L12 12Z" fill="white" />
                <path d="M12 12L7 17L8.5 18.5L13.5 13.5L12 12Z" fill="white" />
                <circle cx="12" cy="12" r="1" fill="white" />
            </svg>
        </div>
    );
}

export default Windmill;
