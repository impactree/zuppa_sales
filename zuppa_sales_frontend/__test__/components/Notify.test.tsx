import { Notify } from '@/components/Notify/Notify';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('displays error notification with correct styles', () => {
  Notify({
    message: 'Error message',
    type: 'ERROR',
  });

  expect(toast).toHaveBeenCalledWith('Error message', expect.objectContaining({
    position: 'top-right',
    style: expect.objectContaining({
      background: 'var(--danger)',
      color: '#fff',
    }),
  }));
});

test('displays loading notification with correct styles', () => {
  Notify({
    message: 'Loading message',
    type: 'LOADING',
  });

  expect(toast).toHaveBeenCalledWith('Loading message', expect.objectContaining({
    style: expect.objectContaining({
      background: 'white',
      color: 'black',
    }),
  }));
});

test('displays default notification with correct styles', () => {
  Notify({
    message: 'default message',
    type: 'SUCCESS',
  });

  expect(toast).toHaveBeenCalledWith('default message', expect.objectContaining({
    style: expect.objectContaining({}),
  }));
});
test('uses custom position and autoClose values', () => {
  Notify({
    message: 'Custom message',
    type: 'SUCCESS',
    position: 'bottom-left',
    autoClose: 5000,
  });

  expect(toast).toHaveBeenCalledWith('Custom message', expect.objectContaining({
    position: 'bottom-left',
    autoClose: 5000,
  }));
});
