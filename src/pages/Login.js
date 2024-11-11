export default function LogIn() {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col justify-center w-fit p-8 gap-12 bg-white shadow-lg border border-1 rounded-xl">
                <p className="font-bold text-3xl text-center">Log In</p>
                <div className="flex flex-col justify-center w-full gap-3">
                    <div className="flex flex-row items-center gap-8">
                        <div className="w-1/3">
                            <p>No HP:</p>
                        </div>
                        <div className="w-2/3">
                            <input className="border border-1 border-gray-200 p-1 pl-3 pr-3 rounded-lg" type="number" />
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-8">
                        <div className="w-1/3">
                            <p>Password:</p>
                        </div>
                        <div className="w-2/3">
                            <input className="border border-1 border-gray-200 p-1 pl-3 pr-3 rounded-lg" type="password" />
                        </div>
                    </div>
                </div>

                <button className="bg-green-600 p-3 rounded-lg text-white font-bold text-lg hover:scale-95">Masuk</button>
            </div>
        </div>

    )
}