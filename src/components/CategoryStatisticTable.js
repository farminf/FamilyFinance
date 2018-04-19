import React from "react";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import _ from "lodash";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3F51B5",
    color: theme.palette.common.white,
    textAlign: "center"
  },
  body: {
    fontSize: 14,
    textAlign: "center"
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 200,
    textAlign: "center"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const CategoryStatisticTable = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Category</CustomTableCell>
            <CustomTableCell numeric>Amount (€)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.orderBy(props.data, ["expense"], ["desc"]).map(n => {
            return (
              <TableRow key={n.categories} className={classes.row}>
                <CustomTableCell>{n.categories}</CustomTableCell>
                <CustomTableCell numeric>{n.expense}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(CategoryStatisticTable);
