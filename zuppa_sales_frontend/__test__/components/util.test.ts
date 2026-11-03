import { applyFilter, buildQueryParams, convertExcel, convertPdf, convertToPascalCase, dateFormatForList, getDateRange, getSlugClass, getStatusColor, getUserData, resetFilter, stringToHexColor, updateBuildQueryParams, updateQueryParams } from "@/lib/utils";
import moment from "moment";
import { AppRouterInstance, NavigateOptions, PrefetchOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

describe('buildQueryParams', () => {
  it('should return a query string for simple params', () => {
    expect(buildQueryParams({ key: 'value' })).toBe('key=value');
  });

  it('should handle array values', () => {
    expect(buildQueryParams({ key: ['value1', 'value2'] })).toBe('key=value1&key=value2');
  });

  it('should return an empty string for empty params', () => {
    expect(buildQueryParams(null)).toBe('');
  });
});


describe('convertToPascalCase', () => {
  it('should convert a lowercase sentence to PascalCase', () => {
    expect(convertToPascalCase('hello world')).toBe('Hello World');
  });

  it('should handle empty strings', () => {
    expect(convertToPascalCase('')).toBe('');
  });
});

describe('stringToHexColor', () => {
  it('should return a hex color based on a string', () => {
    expect(stringToHexColor('test')).toMatch(/^#[A-F0-9]{6}$/);
  });

  it('should return a default color for an empty string', () => {
    expect(stringToHexColor('')).toBe('#000000');
  });
});

describe('getSlugClass', () => {
  it('should return "is-valid" when slugValid is true', () => {
    expect(getSlugClass(true)).toBe('is-valid');
  });

  it('should return "is-invalid" when slugValid is false', () => {
    expect(getSlugClass(false)).toBe('is-invalid');
  });

  it('should return an empty string when slugValid is null', () => {
    expect(getSlugClass(null)).toBe('');
  });
});

describe('getStatusColor', () => {
  it('should return success for ACTIVE', () => {
    expect(getStatusColor('ACTIVE')).toBe('success');
  });

  it('should return danger for BLOCKED', () => {
    expect(getStatusColor('BLOCKED')).toBe('danger');
  });

  it('should return draft for DRAFT', () => {
    expect(getStatusColor('DRAFT')).toBe('draft');
  });

  it('should return success for unknown status', () => {
    expect(getStatusColor('UNKNOWN')).toBe('success');
  });
  it('should return success for InProgress status', () => {
    expect(getStatusColor('InProgress')).toBe('warning');
  });
  it('should return success for InProgress status', () => {
    expect(getStatusColor('PROCESSED')).toBe('pending');
  });
  it('should return success for COMMENT status', () => {
    expect(getStatusColor('COMMENT')).toBe('pending');
  });
  it('should return success for Draft status', () => {
    expect(getStatusColor('Draft')).toBe('draft');
  });
  it('should return success for PENDING status', () => {
    expect(getStatusColor('PENDING')).toBe('draft');
  });
  it('should return success for DRAFT status', () => {
    expect(getStatusColor('DRAFT')).toBe('draft');
  });
  it('should return success for EDIT status', () => {
    expect(getStatusColor('EDIT')).toBe('draft');
  });
  it('should return success for VIEW status', () => {
    expect(getStatusColor('VIEW')).toBe('current');
  });
  it('should return success for ADMIN status', () => {
    expect(getStatusColor('ADMIN')).toBe('permanent');
  });
});


describe('getDateRange', () => {
  it('should return today\'s date range for "today"', () => {
    const today = moment().format('YYYY-MM-DD');
    expect(getDateRange('today')).toEqual({ fromDate: today, toDate: today });
  });

  it('should return this week\'s date range for "week"', () => {
    const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
    const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
    expect(getDateRange('week')).toEqual({ fromDate: startOfWeek, toDate: endOfWeek });
  });
  it('should return this month\'s date range for "month"', () => {
    const startOfWeek = moment().startOf('month').format('YYYY-MM-DD');
    const endOfWeek = moment().endOf('month').format('YYYY-MM-DD');
    expect(getDateRange('month')).toEqual({ fromDate: startOfWeek, toDate: endOfWeek });
  });

  it('should return this quarter\'s date range for "quarter"', () => {
    const startOfWeek = moment().startOf('quarter').format('YYYY-MM-DD');
    const endOfWeek = moment().endOf('quarter').format('YYYY-MM-DD');
    expect(getDateRange('quarter')).toEqual({ fromDate: startOfWeek, toDate: endOfWeek });
  });

  it('should return this year\'s date range for "year"', () => {
    const startOfWeek = moment().startOf('year').format('YYYY-MM-DD');
    const endOfWeek = moment().endOf('year').format('YYYY-MM-DD');
    expect(getDateRange('year')).toEqual({ fromDate: startOfWeek, toDate: endOfWeek });
  });
});

describe('getUserData', () => {
  it('should return user data from the source object', () => {
    const source = {
      user: {
        name: 'John Doe',
        id: 1,
        status: 'active',
      },
    };
    expect(getUserData(source)).toEqual({
      user: {
        name: 'John Doe',
        id: 1,
        status: 'active',
        role: undefined,
        department: undefined,
        account: {
          id: undefined,
          name: undefined,
          slug: undefined,
          api_key: undefined,
          onboarding: undefined,
        },
        plan: undefined,
        apiKey: undefined,
        accessToken: undefined,
        refreshToken: undefined,
      },
    });
  });
});

describe('convertPdf', () => {
  it('should create a downloadable PDF file', () => {
    // Mock window.URL.createObjectURL
    const createObjectURLMock = jest.fn().mockReturnValue('mock-blob-url');
    global.URL.createObjectURL = createObjectURLMock;

    // Mock document.createElement for anchor element and its click method
    const link = {
      click: jest.fn(),
      download: '',
      href: '',
    } as unknown as HTMLAnchorElement;
    jest.spyOn(document, 'createElement').mockReturnValue(link);

    // Call the function with a dummy ArrayBuffer and a file name
    convertPdf(new ArrayBuffer(10), 'test-pdf');

    // Assertions
    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));
    expect(link.download).toMatch(/test-pdf_\d+\.pdf/);
    expect(link.href).toBe('mock-blob-url');
    expect(link.click).toHaveBeenCalled();
  });
});


describe('resetFilter', () => {
  it('should reset form and update the router query', () => {
    const router: AppRouterInstance = {
      push: jest.fn(),
      back: function (): void {
        throw new Error("Function not implemented.");
      },
      forward: function (): void {
        throw new Error("Function not implemented.");
      },
      refresh: function (): void {
        throw new Error("Function not implemented.");
      },
      replace: function (href: string, options?: NavigateOptions): void {
        throw new Error("Function not implemented.");
      },
      prefetch: function (href: string, options?: PrefetchOptions): void {
        throw new Error("Function not implemented.");
      }
    };
    const resetForm = jest.fn();

    resetFilter(router, resetForm, '/test-path');

    expect(router.push).toHaveBeenCalledWith('/test-path?');
    expect(resetForm).toHaveBeenCalled();
  });
});

describe('updateQueryParams', () => {
  it('should update the router with the new query params', () => {
    const router: AppRouterInstance = {
      push: jest.fn(),
      back: function (): void {
        throw new Error("Function not implemented.");
      },
      forward: function (): void {
        throw new Error("Function not implemented.");
      },
      refresh: function (): void {
        throw new Error("Function not implemented.");
      },
      replace: function (href: string, options?: NavigateOptions): void {
        throw new Error("Function not implemented.");
      },
      prefetch: function (href: string, options?: PrefetchOptions): void {
        throw new Error("Function not implemented.");
      }
    };
    const params = { key: 'value' };

    updateQueryParams({ newKey: 'newValue' }, router, params, '/test-path');

    expect(router.push).toHaveBeenCalledWith('/test-path?key=value&newKey=newValue');
  });
});

describe('applyFilter', () => {
  it('should apply the filter and set the page to 1', () => {
    const router:AppRouterInstance  = {
      push: jest.fn(),
      back: function (): void {
        throw new Error("Function not implemented.");
      },
      forward: function (): void {
        throw new Error("Function not implemented.");
      },
      refresh: function (): void {
        throw new Error("Function not implemented.");
      },
      replace: function (href: string, options?: NavigateOptions): void {
        throw new Error("Function not implemented.");
      },
      prefetch: function (href: string, options?: PrefetchOptions): void {
        throw new Error("Function not implemented.");
      }
    };
    const params = { key: 'value' };
    const values = { filterKey: 'filterValue' };

    applyFilter(values, router, params, '/test-path');

    expect(router.push).toHaveBeenCalledWith('/test-path?key=value&filterKey=filterValue&page=1');
  });
});

describe('updateBuildQueryParams', () => {
  it('should update URLSearchParams with new parameters', () => {
    const searchParams = new URLSearchParams('key=value');
    const newParams = { newKey: 'newValue' };

    const updatedParams = updateBuildQueryParams(newParams, searchParams);

    expect(updatedParams.get('newKey')).toBe('newValue');
    expect(updatedParams.get('key')).toBe('value');
  });
});

describe('getDateRange', () => {
  it('should return today\'s date range for "today"', () => {
    const today = moment().format('YYYY-MM-DD');
    expect(getDateRange('today')).toEqual({ fromDate: today, toDate: today });
  });

  it('should return yesterday\'s date range for "yesterday"', () => {
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
    expect(getDateRange('yesterday')).toEqual({ fromDate: yesterday, toDate: yesterday });
  });

  it('should return this week\'s date range for "week"', () => {
    const fromDate = moment().startOf('week').format('YYYY-MM-DD');
    const toDate = moment().endOf('week').format('YYYY-MM-DD');
    expect(getDateRange('week')).toEqual({ fromDate, toDate });
  });

  // Add tests for "month", "quarter", and "year"
});

describe('getUserData', () => {
  it('should extract user data from source', () => {
    const source = {
      user: {
        name: 'John Doe',
        id: '123',
        status: 'ACTIVE',
        role: 'Admin',
        department: 'IT',
        account: {
          id: '456',
          name: 'AccountName',
          slug: 'account-slug',
          api_key: 'api-key',
          onboarding: true,
        },
        plan: { plan_code: 'basic' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
    };

    expect(getUserData(source)).toEqual({
      user: {
        name: 'John Doe',
        id: '123',
        status: 'ACTIVE',
        role: 'Admin',
        department: 'IT',
        account: {
          id: '456',
          name: 'AccountName',
          slug: 'account-slug',
          api_key: 'api-key',
          current_onboarding_stage: undefined,
        },
        plan: 'basic',
        apiKey: 'api-key',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
    });
  });
});

describe('convertExcel', () => {
  let createObjectURLMock: jest.Mock;
  let clickMock: jest.Mock;

  beforeAll(() => {
    // Mock window.URL.createObjectURL
    createObjectURLMock = jest.fn().mockReturnValue('blob-url');
    global.URL.createObjectURL = createObjectURLMock;

    // Mock link.click()
    clickMock = jest.fn();
    jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return {
          click: clickMock,
          href: '',
          download: '',
        } as unknown as HTMLAnchorElement;
      }
      return document.createElement(tagName);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should create a Blob, generate a download link, and click it', () => {
    const fakeResponse = new Uint8Array([1, 2, 3, 4]);
    const fileType = 'testFile';

    convertExcel(fakeResponse, fileType);

    expect(createObjectURLMock).toHaveBeenCalledWith(
      expect.any(Blob)
    );

    const blobArgument = createObjectURLMock.mock.calls[0][0];
    expect(blobArgument.type).toBe(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
    );

    expect(clickMock).toHaveBeenCalled();
  });
});

describe('dateFormatForList', () => {
  it('should return formatted date when a valid date string is provided', () => {
    const date = '2024-11-29T10:15:30Z';
    const expectedFormattedDate = moment(date).format('lll'); // Example: "Nov 29, 2024 10:15 AM"
    
    const result = dateFormatForList(date);
    
    expect(result).toBe(expectedFormattedDate);
  });

  it('should return "-" when null is provided', () => {
    const result = dateFormatForList(null);
    expect(result).toBe('-');
  });

  it('should return "-" when an empty string is provided', () => {
    const result = dateFormatForList('');
    expect(result).toBe('-');
  });

  it('should handle invalid date formats gracefully', () => {
    const invalidDate = 'invalid-date';
    const result = dateFormatForList(invalidDate);
    expect(result).toBe('Invalid date');
  });
});