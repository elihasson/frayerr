    const isHome = useSelector(state => state.systemModule.isHome)
    const user = useSelector(state => state.userModule.user)

    const [isScroll, setIsScroll] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    const handleScroll = (ev) => {
        document?.documentElement?.scrollTop > 30 ? setIsScroll(true) : setIsScroll(false)
    }

    const getHeaderClass = () => {
        let headerClass = 'home-top-header'
        if (isHome && isScroll && !user) headerClass += '-with-scroll'
        if (isHome && !user) return headerClass += '-no-scroll'
        if (!user) return headerClass += '-with-scroll'
        return headerClass
    }