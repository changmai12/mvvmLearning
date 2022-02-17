import React, { useEffect, useState } from 'react';
import { getData } from 'service/getData';

interface DataInfo {
  id: number;
  profileImage: string;
  name: string;
}
const useViewModel = () => {
  const errorsRows = ['Cody Fisher', 'Cameron Williamson'];
  const [enable, setEnable] = useState(false);
  const [data, setData] = useState<Array<DataInfo>>([]);
  const [oldData, setOldData] = useState<Array<DataInfo>>([]);

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  const onRemoveData = (index: number) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  };
  const onDuplicateData = (index: number) => {
    let newList: any = [];
    data?.splice(index + 1, 0, data[index]);
    data.map((item) => newList.push(item));
    setData(newList);
  };
  const filterEnable = (enable: boolean) => {
    setEnable(enable);
  };
  useEffect(() => {
    setOldData(data);
    if (enable) {
      const filterData = data.filter((item, i) =>
        errorsRows.includes(item.name)
      );
      setData(filterData);
    } else {
      setData(oldData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enable]);
  return {
    data,
    onRemoveData,
    onDuplicateData,
    errorsRows,
    enable,
    filterEnable,
  };
};

export default useViewModel;
