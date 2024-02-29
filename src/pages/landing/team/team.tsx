

export default function Team() {
    return (

        <main className="flex-1 overflow-y-auto mt-[100px] h-screen pb-8">
            <section className="container grid max-w-3xl gap-8 px-4 py-8 mx-auto lg:gap-10 lg:px-6 lg:py-12">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet our Team</h1>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        The team behind the innovation. We're a group of passionate individuals dedicated to pushing the
                        boundaries of what's possible.
                    </p>
                </div>
                <div className="grid max-w-sm gap-8 sm:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <img
                            alt="Avatar"
                            className="rounded-full border aspect-square overflow-hidden object-cover object-center"
                            height="200"
                            src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
                            width="200"
                        />
                        <div className="flex flex-col items-center justify-center space-y-1">
                            <h3 className="text-xl font-bold">Alice Smith</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <img
                            alt="Avatar"
                            className="rounded-full border aspect-square overflow-hidden object-cover object-center"
                            height="200"
                            src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
                            width="200"
                        />
                        <div className="flex flex-col items-center justify-center space-y-1">
                            <h3 className="text-xl font-bold">Bob Johnson</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <img
                            alt="Avatar"
                            className="rounded-full border aspect-square overflow-hidden object-cover object-center"
                            height="200"
                            src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
                            width="200"
                        />
                        <div className="flex flex-col items-center justify-center space-y-1">
                            <h3 className="text-xl font-bold">Ella Davis</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">UX Designer</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <img
                            alt="Avatar"
                            className="rounded-full border aspect-square overflow-hidden object-cover object-center"
                            height="200"
                            src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
                            width="200"
                        />
                        <div className="flex flex-col items-center justify-center space-y-1">
                            <h3 className="text-xl font-bold">Mike Wilson</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <img
                            alt="Avatar"
                            className="rounded-full border aspect-square overflow-hidden object-cover object-center"
                            height="200"
                            src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
                            width="200"
                        />
                        <div className="flex flex-col items-center justify-center space-y-1">
                            <h3 className="text-xl font-bold">Sophia Lee</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Data Scientist</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

