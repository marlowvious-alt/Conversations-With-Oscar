export default function Button({ children, className = '', disabled = false, ...rest }) {
    return (
        <button
            className={"px-5 py-2 bg-[#bf925e] font-medium border-2 border-black text-sm shadow-[2px_2px_black] " + className + (disabled ? ' opacity-50 cursor-not-allowed' : '')}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}