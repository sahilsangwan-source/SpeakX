import "../Css/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page) => {
        if (page !== currentPage) onPageChange(page);
    };

    const getPageNumbers = () => {
        const pages = [];
        for (let i = Math.max(1, currentPage - 3); i <= Math.min(totalPages, currentPage + 3); i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Prev
            </button>
            {currentPage > 4 && <span>...</span>}
            {getPageNumbers().map((page) => (
                <button 
                    key={page} 
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => handlePageClick(page)}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages - 3 && <span>...</span>}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;