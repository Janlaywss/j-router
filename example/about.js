export default {
    name: 'about',
    data() {
        return {
            count: 0
        }
    },
    render() {
        const handleClick = (e) => {
            this.count += 1
        };
        return (
            <div>
                <span>about</span>
                <p>{this.count}</p>
                <p>
                    <button onClick={handleClick}>
                        +1
                    </button>
                </p>
            </div>
        )
    }
}
