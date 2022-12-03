import {
  Button,
  ButtonGroup,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { LocaleContext } from "../../utils/context";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    padding: "20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    width: "auto",
    marginRight: 12,
    userSelect: "none",
    WebkitUserSelect: "none",
    borderCollapse: "collapse",
    "& td": {
      height: "4.3vh",
      minHeight: 20,
      padding: 3,
      border: "none",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
  },
  row: {
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  headerRow: {
    // width: "5vw",
    // minWidth: 54,
  },
  indexColumn: {
    width: 36,
  },
  selectableCell: {
    width: "5.4vw",
    minWidth: 54,
    maxWidth: 80,
    cursor: "cell",
    "& div": {
      pointerEvents: "none",
      zIndex: -1,
      backgroundClip: "padding-box",
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
  },
  buttonGroup: {
    marginTop: 20,
    "& button": {
      width: "90px",
      padding: 3,
      textTransform: "none",
      fontSize: "1rem",
    },
  },
  modeBtn: {
    "& .MuiButton-endIcon": {
      marginLeft: 5,
      marginRight: -8,
      "& svg": {
        fontSize: 20,
      },
    },
  },
}));

const SearchTimeTable = ({ selectedTable, setSelectedTable }) => {
  const classes = useStyles();
  const rowNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "B", "C", "D"];
  const columnNum = ["0", "1", "2", "3", "4", "5", "6"];
  const [tmpSelectedTable, setTmpSelectedTable] = useState(selectedTable);
  const [startPivot, setStartPivot] = useState(null);
  const Modes = { ADD: 0, REMOVE: 1 };
  const [mode, setMode] = useState(Modes.ADD);
  const [holdingShift, setHoldingShift] = useState(false);
  const { strings } = useContext(LocaleContext);
  const isRemoving = mode === Modes.REMOVE || holdingShift;
  const { palette } = useTheme();

  const startDragging = (row, column) => {
    // console.log("startDragging");
    setStartPivot({ row, column });
    updateTable({ row, column }, { row, column });
  };

  const onDragging = (row, column) => {
    if (startPivot !== null) {
      // console.log("onDragging", row, column);
      updateTable(startPivot, { row, column });
    }
  };

  useEffect(() => {
    const endDragging = () => {
      if (startPivot !== null) {
        // console.log("endPivot", startPivot);
        setStartPivot(null);
        setSelectedTable(tmpSelectedTable);
      }
    };
    // console.log("Start listen mouseup");
    window.addEventListener("mouseup", endDragging);
    return () => {
      window.removeEventListener("mouseup", endDragging);
      // console.log("End listen mouseup");
    };
  }, [startPivot, tmpSelectedTable, setSelectedTable]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target.className.includes("MuiInputBase-input")) {
        return;
      }
      if (e.shiftKey) {
        setHoldingShift(true);
      }
    };

    const onKeyUp = (e) => {
      if (e.key === "Shift") {
        setHoldingShift(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const updateTable = (startPivot, endPivot) => {
    let { row: rowNumStart, column: colNumStart } = startPivot;
    let { row: rowNumEnd, column: colNumEnd } = endPivot;

    // Sort to ascending order and get endpoints
    let [rowStartIndex, rowEndIndex] = [rowNumStart, rowNumEnd].sort((a, b) => a - b);
    let [colStartIndex, colEndIndex] = [colNumStart, colNumEnd].sort((a, b) => a - b);

    var selectedTableCopy = [...selectedTable];

    for (let colIndex = colStartIndex; colIndex < colEndIndex + 1; colIndex++) {
      let mask = (1 << (rowEndIndex + 1)) - (1 << rowStartIndex);
      if (isRemoving) {
        selectedTableCopy[colIndex - 1] &= ~mask;
      } else {
        selectedTableCopy[colIndex - 1] |= mask;
      }
    }
    setTmpSelectedTable(selectedTableCopy);
  };

  const getBlockColor = useCallback(
    (state) => {
      switch (state) {
        case 0: // 00 x -> x
          if (isRemoving) {
            return palette.action.disabled;
          } else {
            return palette.action.focus;
          }
        case 1: // 01 x -> v
          return palette.success.light;
        case 2: // 10 v -> x
          return palette.error.light;
        case 3: // 11 v -> v
          return palette.primary.main;
        default:
          return palette.action.focus;
      }
    },
    [isRemoving, palette]
  );

  const SelectableCell = ({ row, column }) => {
    let preValue = (selectedTable[column - 1] >> row) & 1; // Before dragging
    let tmpValue = (tmpSelectedTable[column - 1] >> row) & 1; // On dragging

    return (
      <TableCell
        className={classes.selectableCell}
        onMouseDown={(e) => {
          e.preventDefault();
          startDragging(row, column);
        }}
        onMouseMove={(e) => {
          e.preventDefault();
          onDragging(row, column);
        }}
        // onMouseUp={endDragging}
      >
        <div style={{ backgroundColor: getBlockColor((preValue << 1) | tmpValue) }} />
      </TableCell>
    );
  };

  const clearAll = () => {
    let empty = Array.from({ length: 6 }, (v) => 0);
    setSelectedTable(empty);
    setTmpSelectedTable(empty);
  };

  const selectAll = () => {
    let full = Array.from({ length: 6 }, (v) => (1 << 15) - 1);
    setSelectedTable(full);
    setTmpSelectedTable(full);
  };

  const reverseTable = () => {
    let reverse = Array.from(selectedTable, (v) => v ^ ((1 << 15) - 1));
    setSelectedTable(reverse);
    setTmpSelectedTable(reverse);
  };

  const produceTd = (row) => {
    let tdLists = columnNum.map((column, index) => {
      if (column === "0") {
        return (
          <TableCell
            id={"r" + row + "c" + column}
            key={"r" + row + "c" + column}
            className={classes.indexColumn}
          >
            {rowNum[row]}
          </TableCell>
        );
      } else {
        return <SelectableCell key={"r" + row + "c" + column} row={row} column={index} />;
      }
    });
    return (
      <TableRow id={`r${row}`} key={`r${row}`} className={classes.row}>
        {tdLists}
      </TableRow>
    );
  };

  const produceTr = () => {
    //console.log(selectedtable);
    let trLists = rowNum.map(function (row, index) {
      return produceTd(index);
    });
    return trLists;
  };

  const produceTitleRow = () => {
    const weekdays = strings.search.lable_weekdays;
    return (
      <TableRow className="week">
        <TableCell className={classes.indexColumn} />

        {Object.keys(weekdays).map((key, index) => (
          <TableCell key={key} className={classes.headerRow}>
            {weekdays[key]}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const getModeBtnHintLayout = () => {
    return (
      <div className="tooltip-content">{strings.search.hint_shift_mode(!isRemoving)}</div>
    );
  };

  return (
    <TableContainer className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {produceTitleRow()}
          {produceTr()}
        </TableBody>
      </Table>

      <ButtonGroup className={classes.buttonGroup} size="small" color="primary">
        <Button onClick={clearAll} disableRipple>
          {strings.search.lable_clear}
        </Button>
        <Button onClick={selectAll}> {strings.search.label_select_all} </Button>
        <Button onClick={reverseTable}> {strings.search.label_reverse_all} </Button>
        <Tooltip title={getModeBtnHintLayout()} placement="top" arrow>
          <Button
            id="mode-btn"
            variant="outlined"
            className={classes.modeBtn}
            disableElevation
            onClick={() => setMode(mode === Modes.REMOVE ? Modes.ADD : Modes.REMOVE)}
            style={{
              color: isRemoving ? palette.error.main : palette.success.main,
            }}
            endIcon={
              isRemoving ? <RemoveIcon viewBox="2 2 22 22" /> : <AddIcon viewBox="2 2 22 22" />
            }
          >
            {strings.search.label_shift_mode}
          </Button>
        </Tooltip>
      </ButtonGroup>
    </TableContainer>
  );
};

export default SearchTimeTable;
