export default function Loader({ size = 6, className = '', color = '#bf925e' }) {
  const s = `${size}rem`
  return (
    <div className={`inline-block ${className}`} style={{ width: s, height: s }}>
      <svg className="animate-spin" viewBox="0 0 50 50" width={s} height={s}>
        <circle cx="25" cy="25" r="20" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="31.4 31.4" />
      </svg>
    </div>
  )
}
