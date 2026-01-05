
const Icon = ({src, alt, width, height, className}) => {
    return (
        <div className={className}>
            <img src={src} alt={alt} />
        </div>
    )
}

export default Icon