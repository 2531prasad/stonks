export function BackgroundBlobs() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-purple-500/20 blur-[150px]"></div>
            <div className="absolute top-1/4 left-1/4 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-pulse-medium rounded-full bg-blue-500/20 blur-[120px]"></div>
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse-fast rounded-full bg-pink-500/20 blur-[130px]"></div>
        </div>
    )
}
