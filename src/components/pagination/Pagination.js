import React from 'react'
import styles from './Pagination.module.scss'
const Pagination = ({currentPage,setCurrentPage,productsPerPage, totalProducts}) => {
  const pageNumbers=[]
  const totalPages=totalProducts / productsPerPage
 
  
  const [pageNumbersLimit, setPageNumbersLimit] = React.useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = React.useState(0)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = React.useState(5)

  const paginate =(pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const paginateNext = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumbersLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumbersLimit)
    }

  }
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1)
    if ((currentPage - 1) % pageNumbersLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumbersLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumbersLimit)
    }
  }


  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }
//  console.log(totalPages);
  return (
    <ul className={styles.pagination}>
      <li onClick={paginatePrev} className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}>
        Prev
      </li>
      
        {pageNumbers.map((number)=>{
          if(number < maxPageNumberLimit +1 && number > minPageNumberLimit) {


            return (<li key={number} onClick={() => paginate(number)} className={currentPage === number ? `${styles.active}` : null}>{number}</li>)
          }
          

        })}
      
      
      <li onClick={paginateNext} className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : null}>
        Next
      </li>
      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span >
          {` of `}
        </span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>

      
    </ul>
  )
}

export default Pagination
