export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, mode }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className={`${mode === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'} rounded-3xl p-6 w-full max-w-[320px] flex flex-col gap-y-4 shadow-lg`}>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className={`text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{message}</p>
                <div className="flex justify-end gap-x-3 pt-2">
                    <button 
                        onClick={onCancel}
                        className={`px-4 py-2 rounded-xl ${mode === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-xl bg-red-300 hover:bg-red-400 text-gray-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}