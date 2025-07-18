interface HeaderProps {
    toggleShowWatchList: () => void
}

export default function Header({toggleShowWatchList}: HeaderProps) {
    return <header>
        <h1>Find your film</h1>
        <button onClick={toggleShowWatchList}>My WatchList</button>
    </header>
}