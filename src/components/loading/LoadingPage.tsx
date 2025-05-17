export default function LoadingPage() {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-70"></div>
        </div>
    );
}