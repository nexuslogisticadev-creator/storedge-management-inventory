import type { ImgProps } from "./Img.types"

export default function Img({ className, src, alt }: ImgProps) {
    return <img className={className} src={src} alt={alt} />
}
