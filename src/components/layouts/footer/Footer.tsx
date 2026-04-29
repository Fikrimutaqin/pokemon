export default function Footer() {
    return (
        <footer className="w-full flex flex-col items-center justify-center mt-5">
            <div className="w-full text-center py-2">
                <p className="text-xs text-gray-400 font-medium">
                    @{new Date().getFullYear()} Pokemon
                </p>
            </div>
        </footer>
    )
}