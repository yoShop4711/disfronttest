const Pagination = ({currentPage, totalCustomers, paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalCustomers / currentPage); i++) {
        pageNumbers.push(i)
    }
    return(<>
    
    <nav >
        <ul className="pagination">
        {
            pageNumbers.map((numero, index) => (
                <li key={index} className="page-item"><p className="page-link" onClick={() => paginate(numero)}> {numero}</p></li>
            ))
        }

        </ul>


    </nav>
    
    </>)
}

export default Pagination