import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link, Tooltip, TableContainer, Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FiberNewIcon from '@material-ui/icons/FiberNew';

import { useTableStyles } from 'styles/table-styles';
import EnhancedTableToolbar from './table-toolbar';
import EnhancedTableHead from './table-head';
import { selectSearchReports } from 'selectors/collections';
import { useTable, stableSort, getSorting, getDisplayDate } from './lib/index-search';
import clsx from 'clsx';
import {
  BACKEND_REPORTS_FIELDS,
} from '../../pages/documents/constants';
import TablePaginationActions from './table-pagination-actions';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import {getDisplayValue} from 'lib/helpers';

export function getRecipientOfficeStr(report) {
  const recipientOffices = report.recipient_office || [];
  return recipientOffices.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1)).join(',');
}

const reportsTableHeadings = [
  { id: '', label: '', sortable: false },
  { id: BACKEND_REPORTS_FIELDS['ipNo'], label: 'IP No', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['ipName'], label: 'IP Name', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['documentType'], label: 'Document Type', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['documentLink'], label: 'Document Link', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['bap'], label: 'BAP', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['bapDescription'], label: 'BAP Description', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['faceNo'], label: 'FACE No', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['hactTransaction'], label: 'HACT Transaction', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['frNo'], label: 'FR No', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['fcNo'], label: 'FC No', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['uploadedDate'], label: 'Upload Date', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['uploadedBy'], label: 'Uploaded By', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['uploadedApp'], label: 'Uploaded App', sortable: true }
];

export default function ReportsTable() {
  const { trackPageView } = useMatomo();
  const classes = useTableStyles();

  const data = useSelector(selectSearchReports);
  const pageName = useSelector(selectMenuBarPage);
  const rows = data.items || [];
  const headCells = [...reportsTableHeadings];

  const {
    orderBy,
    order,
    page,
    handleRequestSort,
    handleChangePage
  } = useTable(BACKEND_REPORTS_FIELDS['recipientOffice']);

  useEffect(() => {
    trackPageView()
  }, [pageName]);

    const ExpandableTableRow = ({ children, rowData, ...otherProps }) => {
     ExpandableTableRow.propTypes = {
      children: PropTypes.any,
      rowData: PropTypes.any,
    }
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
      <>
        <TableRow {...otherProps}>
          <TableCell padding="checkbox">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {children}
        </TableRow>
        {isExpanded && (
          <TableRow bgcolor='#eeeeee'>
            <TableCell padding="checkbox" />
            <TableCell colSpan={13}>
               <Box className={classes.detailsPanel}>
                <Tooltip title={rowData.ip_type ? rowData.ip_type : ''}>
                  <div><p className={classes.detailsHeader}>IP Type</p>{getDisplayValue(rowData.ip_type)}</div>
                </Tooltip>
                <Tooltip title={rowData.cso_type ? rowData.cso_type : ''}>
                  <div><p className={classes.detailsHeader}>CSO Type</p>{getDisplayValue(rowData.cso_type)}</div>
                </Tooltip>
                <Tooltip title={rowData.face_form_type ? rowData.face_form_type : ''}>
                  <div><p className={classes.detailsHeader}>FACE Type</p>{getDisplayValue(rowData.face_form_type)}</div>
                </Tooltip>
                <Tooltip title={rowData.responsible_office ? rowData.responsible_office : ''}>
                  <div><p className={classes.detailsHeader}>Responsible Office</p>{getDisplayValue(rowData.responsible_office)}</div>
                </Tooltip>
                <Tooltip title={rowData.responsible_person ? rowData.responsible_person : ''}>
                  <div><p className={classes.detailsHeader}>Responsible Person</p>{getDisplayValue(rowData.responsible_person)}</div>
                </Tooltip>
                <Tooltip title={rowData.f_a_c_e_form_date ? getDisplayDate(rowData.f_a_c_e_form_date) : ''}>
                  <div><p className={classes.detailsHeader}>Face Form Date</p>{getDisplayValue(getDisplayDate(rowData.f_a_c_e_form_date))}</div>
                </Tooltip>
                <Tooltip title={rowData.ho_o_approval ? rowData.ho_o_approval : ''}>
                  <div><p className={classes.detailsHeader}>Head of Office</p>{getDisplayValue(rowData.ho_o_approval)}</div>
                </Tooltip>
              </Box>
            </TableCell>
          </TableRow>
          ) }
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer className={classes.tableContainer} aria-label="sticky table">
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              cells={headCells}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <ExpandableTableRow hover role="checkbox" tabIndex={-1} key={index} rowData={row}>

                      <Tooltip title={row.implementing_partner_code ? row.implementing_partner_code : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.implementing_partner_code}
                        </TableCell>
                      </Tooltip>

                      <Tooltip title={row.implementing_partner_name ? row.implementing_partner_name : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.implementing_partner_name}
                        </TableCell>
                      </Tooltip>

                      <Tooltip title={row.attachment_type ? row.attachment_type : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.attachment_type}
                        </TableCell>
                      </Tooltip>

                      <TableCell
                        className={clsx(classes.cell, classes.titleCell)}
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <Tooltip title={row.title ? row.title : ''}>
                          <Typography className={classes.overflow}>
                            <Link color="secondary" href={row.download_url} target="_blank">
                              {row.is_new && <FiberNewIcon fontSize="small" className={classes.icon} color="error" />}
                              {row.title}
                            </Link>
                          </Typography>
                        </Tooltip>
                      </TableCell>

                      <Tooltip title={row.b_a_p_document_no ? row.b_a_p_document_no : ''}>
                          <TableCell className={classes.cell} align="left">{row.b_a_p_document_no}</TableCell>
                      </Tooltip>

                      <Tooltip title={row.b_a_p_document_type ? row.b_a_p_document_type : ''}>
                          <TableCell className={classes.cell} align="left">{row.b_a_p_document_type}</TableCell>
                      </Tooltip>

                      <Tooltip title={row.face_form_no ? row.face_form_no : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.face_form_no}
                        </TableCell>
                      </Tooltip>

                      <Tooltip title={row.h_a_c_t_transaction_no ? row.h_a_c_t_transaction_no : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.h_a_c_t_transaction_no}
                        </TableCell>
                      </Tooltip>

                      <Tooltip title={row.fund_reservation_no ? row.fund_reservation_no : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.fund_reservation_no}
                        </TableCell>
                      </Tooltip>

                      <Tooltip title={row.funds_commitment_no ? row.funds_commitment_no : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.funds_commitment_no}
                        </TableCell>
                      </Tooltip>

                      <Tooltip title={row.created ? getDisplayDate(row.created): ''}>
                        <TableCell className={classes.cell} align="left">
                          {getDisplayDate(row.created)}
                        </TableCell>
                      </Tooltip>

                      <Tooltip title={row.uploaded_by ? row.uploaded_by : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.uploaded_by}
                        </TableCell>
                      </Tooltip>

                      <Tooltip title={row.documentuploaded_app ? row.documentuploaded_app : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.documentuploaded_app}
                        </TableCell>
                      </Tooltip>

                    </ExpandableTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25]}
          component="div"
          count={data.total_rows || 0}
          rowsPerPage={25}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}

          onChangePage={handleChangePage}
          ActionsComponent={TablePaginationActions}
        />
        {/* <DocViewer fileType={docFileType} filePath={doc} /> */}
      </Paper >
    </div >
  );
}
