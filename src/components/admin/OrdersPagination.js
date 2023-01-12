function OrdersPagination({ currentPage, totalOrders, paginate }) {


  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / currentPage); i++) {
    pageNumbers.push(i);
  }




  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((numero, index) => (
            <li key={index} className="page-item">
              <p className=" page-link" onClick={() => paginate(numero)}>
                {" "}
                {numero}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default OrdersPagination;
