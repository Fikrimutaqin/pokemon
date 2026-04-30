export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 z-50 w-full flex flex-col items-center justify-center py-3 bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="w-full text-center">
                <p className="text-xs text-gray-400 font-medium drop-shadow-md">
                    &copy; {new Date().getFullYear()} Pokemon
                </p>
            </div>
        </footer>
    )
}