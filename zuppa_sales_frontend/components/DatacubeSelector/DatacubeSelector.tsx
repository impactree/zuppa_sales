'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IDataCube } from '@/lib/interface/IDataCube.interface';

interface DataCubeSelectorProps {
  datacubes: IDataCube[];
  selectedDatacubeId?: string;
}

export default function DataCubeSelector({ datacubes, selectedDatacubeId }: DataCubeSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDatacubeId = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (newDatacubeId) {
      params.set('datacubeId', newDatacubeId);
    } else {
      params.delete('datacubeId');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <select
      className="form-select w-auto"
      value={selectedDatacubeId || ''}
      onChange={handleChange}
    >
      {datacubes && datacubes.length > 0 ? (
        datacubes.map((datacube) => (
          <option key={datacube.id} value={datacube.id}>
            {datacube.financial_year}
          </option>
        ))
      ) : (
        <option value="">No data available</option>
      )}
    </select>
  );
}
