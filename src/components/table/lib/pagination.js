import {
  useState
} from 'react';

export function usePagination() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const resetPagination = () => {
    setPage(0);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    resetPagination,
    handleChangePage,
    handleChangeRowsPerPage
  };
}
