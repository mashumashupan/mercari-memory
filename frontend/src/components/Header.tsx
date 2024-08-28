import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.title}>Mercari</div>
                <div className="w-full sm:w-auto order-3 sm:order-2 my-4 sm:my-0">
                    <input
                        type="text"
                        placeholder="Search for anything"
                        className={styles.searchInput}
                    />
                </div>
            </div>
        </header>
    )
}


// import Link from 'next/link'

// export default function Header() {
//     return (
//         <header className="bg-blue-800 text-white py-4" style={{ height: '80px' }}>
//             <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
//                 <div className="text-2xl font-bold">Mercari</div>
//                 <div className="w-full sm:w-auto order-3 sm:order-2 my-4 sm:my-0">
//                     <input
//                         type="text"
//                         placeholder="Search for anything"
//                         className="w-full px-4 py-2 rounded-full bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 {/* <nav className="flex items-center space-x-4 order-2 sm:order-3">
//                     <Link href="#" className="hidden sm:inline hover:text-blue-300">Download app</Link>
//                     <Link href="#" className="hover:text-blue-300">Sign up</Link>
//                     <Link href="#" className="hover:text-blue-300">Log in</Link>
//                     <Link href="#" className="hover:text-blue-300">🔔</Link>
//                     <Link href="#" className="hover:text-blue-300">🛒</Link>
//                     <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Sell</button>
//                 </nav> */}
//             </div>
//         </header>
//     )
// }