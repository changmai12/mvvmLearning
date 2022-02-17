import Toggle from 'baseUI/button/toggle';
import { Table, TableBody } from 'baseUI/table';
import { TableColumn } from './components/tableColumn';
import { TableRow } from './components/tableRow';
import useViewModel from './useViewModel';

export const OverallPage = () => {
  const {
    data,
    onRemoveData,
    onDuplicateData,
    errorsRows,
    enable,
    filterEnable,
  } = useViewModel();
  return (
    <div className=" p-8 pt-[72px] mx-auto">
      <div className="mb-2">
        <Toggle enabled={enable} setEnabled={() => filterEnable(!enable)} />
      </div>
      <Table>
        <TableColumn />
        <TableBody>
          {data.map((entry, index) => {
            return (
              <TableRow
                data={entry}
                index={index}
                onRemove={() => onRemoveData(index)}
                onDuplicateData={() => onDuplicateData(index)}
                error={errorsRows.includes(entry.name)}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
