import { ITaskResponse } from '@/components/TaskDataEntryForm/types';
import debounce from 'lodash.debounce';
import { useMemo, useRef } from 'react';

type SaveFn = (responses: ITaskResponse[]) => void;
type UpdateFn = (response: ITaskResponse, id: string) => void;

export const useDebouncedResponseSaver = (
  updateResponseToAPI: UpdateFn,
  saveResponseToAPI: SaveFn,
) => {
  const pendingUpdates = useRef<Map<string, ITaskResponse>>(new Map());

  return useMemo(
    () => debounce((response: ITaskResponse, answerId?: string) => {
      if (answerId) {
        pendingUpdates.current.set(answerId, response);
        if (pendingUpdates.current.size > 0) {
          setTimeout(() => {
            pendingUpdates.current.forEach((resp, id) => {
              updateResponseToAPI(resp, id);
            });
            pendingUpdates.current.clear();
          }, 2000);
        }
      } else {
        saveResponseToAPI([response]);
      }
    }, 2000),
    [updateResponseToAPI, saveResponseToAPI],
  );
};
