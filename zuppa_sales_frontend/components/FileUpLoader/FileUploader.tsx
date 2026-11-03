/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint jsx-a11y/click-events-have-key-events: off */
/* eslint no-shadow: off */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable brace-style */

// import { IndustryService, QuestionService, SectorService } from '@/lib/service';
import { downloadErrors } from '@/lib/utils';
import {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import toast from 'react-hot-toast';
import './FileUpLoader.css';
import { useRouter } from 'next/navigation';
import { FiUploadCloud, FiFileText } from 'react-icons/fi';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import * as XLSX from 'xlsx';

import {
  IoDocumentTextOutline,
  IoFileTray,
  IoFileTrayFull,
} from 'react-icons/io5';
import { TaskService } from '@/lib/service';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';

// Icon With Progress Circle Component
interface IconProgressCircleProps {
  progress: number; // 0–100
  size?: number;
  strokeWidth?: number;
  icon?: React.ReactNode;
  trackColor?: string;
  progressColor?: string;
}

const IconProgressCircle: React.FC<IconProgressCircleProps> = ({
  progress,
  size = 80,
  strokeWidth = 6,
  icon = <IoDocumentTextOutline size={28} color="#2F66F6" />,
  trackColor = '#D8DBE3',
  progressColor = '#2F66F6',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          stroke={trackColor}
          fill="none"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={progressColor}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.4s ease',
          }}
        />
      </svg>
      {/* Centered Icon */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
    </div>
  );
};

export default function FileUploader({
  btnName,
  onClose,
  dataCube,
  taskId,
  flag,
  datacubeId,
  moduleId,
  siteId,
  onUploadSuccess,
  initialUploadedFileUrl,
}: {
  btnName: string;
  onClose?: () => void;
  dataCube?: string | any;
  taskId?: string;
  flag?: string;
  datacubeId?: string;
  moduleId?: string;
  siteId?: string | any;
  onUploadSuccess?: (status: boolean) => void;
  initialUploadedFileUrl?: string;
}) {
  const router = useRouter();
  const context = useUser();
  const apiKey = context?.currentUser?.account?.api_key as string;
  const token = context?.currentUser?.token as string; // Assuming you have token in context
  const [fileName, setFileName] = useState<string | null>(null);

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [fileUrl, setFileUrl] = useState<string | null>(
    initialUploadedFileUrl || null,
  );

  const [file, setFile] = useState<File | null>(null);

  // Track if we have a previously uploaded file (from URL, not local File object)
  const hasUploadedFile = !!(file || initialUploadedFileUrl);

  const dropRef = useRef<HTMLLabelElement>(null);

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleImportErrors = (errors: any[]) => {
  //   if (!errors || errors.length === 0) return;
  //   const formattedErrors = errors
  //     .map((item, index) => {
  //       const questionTitle = item.row?.['Question Title'] || 'Unknown Question';
  //       return `${index + 1}. ${questionTitle}: ${item.error}`;
  //     })
  //     .join('\n');

  //   if (formattedErrors.length < 1000) {
  //     toast.error(`Import failed:\n${formattedErrors}`, {
  //       duration: 8000,
  //       style: { whiteSpace: 'pre-wrap' },
  //     });
  //   } else {
  //     downloadErrors(errors);
  //     toast.error('Import failed. Errors has been downloaded.');
  //   }
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toastMessage = (res: any) => {
    console.error(res?.data, 'res?.data');

    const {
      errors, success, message, details,
    } = res?.data as {
      errors: string[];
      success: boolean;
      message: string;
      details: {
        errors: string[];
      };
    };
    if (!errors && success) {
      toast.success(`${message}`);
      //   onClose();
    } else if (!success && message) {
      toast.error(message);
      downloadErrors(details?.errors);
    } else {
      downloadErrors(errors);
    }
    router.refresh();
  };

  // const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);
  //     setFileName(selectedFile.name);
  //     let res;
  //       switch (btnName) {
  //         case 'Industries':
  //           res = await IndustryService.uploadIndustry(formData);
  //           break;
  //         case 'Sectors':
  //           res = await SectorService.uploadSector(formData);
  //           break;
  //         case 'Questions':
  //           res = await QuestionService.uploadQuestions(formData);
  //           break;
  //         default:
  //           break;
  //       }
  //     toastMessage(res);
  //   }
  // };

  // ✅ Supported file MIME types and extensions
  const supportedTypes = [
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'text/csv', // .csv
  ];

  const supportedExtensions = ['.xls', '.xlsx', '.csv'];

  // --- Validate file type ---
  const isSupportedFile = (file: File) => {
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    return (
      supportedTypes.includes(file.type) || supportedExtensions.includes(ext)
    );
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!isSupportedFile(selectedFile)) {
      toast.error(
        'Unsupported file type. Please upload only .xls, .xlsx, or .csv files.',
      );
      e.target.value = ''; // reset input
      return;
    }

    await handleUpload(selectedFile);
    e.target.value = ''; // reset input
  };

  // --- Handle Drop Upload ---
  const handleDrop = useCallback(
    async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const droppedFile = e.dataTransfer?.files?.[0];
      if (!droppedFile) return;

      if (!isSupportedFile(droppedFile)) {
        toast.error(
          'Unsupported file type. Please upload only .xls, .xlsx, or .csv files.',
        );
        return;
      }

      await handleUpload(droppedFile);
      setFile(null); // optional if you want to allow re-dragging same file
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // const handleUpload = async (selectedFile: File) => {
  //   setFile(selectedFile);
  //   setFileUrl(URL.createObjectURL(selectedFile));
  //   setIsUploading(true);
  //   setUploadProgress(0);

  //   try {
  //     // Read Excel file
  //     const arrayBuffer = await selectedFile.arrayBuffer();
  //     const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];

  //     const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
  //       header: 1,
  //     });

  //     // Skip header row
  //     const dataToSend = jsonData.slice(1).map((row: any) => ({
  //       indicator: row[0] || '',
  //       subIndicator: row[1] || '',
  //       questionUid: row[2] || '',
  //       taskQuestionTitle: row[3] || '',
  //       answer: row[4] || '',
  //     }));

  //     console.log('Parsed Excel Data:', dataToSend);

  //     const payload = {
  //       datacubeId: datacubeId,
  //       taskId: taskId,
  //       answers: dataToSend,
  //     };
  //     console.log('Payload to send:', payload);
  //     // Send to backend
  //     // await axios.post('/api/task/upload-answers', {
  //     //   taskId: task?.id,
  //     //   answers: dataToSend,
  //     // });

  //     await fakeUpload(setUploadProgress);
  //     setIsUploading(false);
  //     toast.success('File uploaded successfully!');

  //     // alert('File uploaded successfully');
  //   } catch (err) {
  //     console.error(err);
  //     alert('Failed to upload file');
  //   }

  //   // try {
  //   //   // Simulate Upload Progress
  //   //   await fakeUpload(setUploadProgress);
  //   //   setIsUploading(false);
  //   //   toast.success('File uploaded successfully!');
  //   // } catch (error) {
  //   //   setIsUploading(false);
  //   //   toast.error('Upload failed. Please try again.');
  //   // }
  // };

  const handleUpload = async (selectedFile: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Read Excel file
      const arrayBuffer = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // ✅ Restrict multiple sheets if flag is "single"
      if (flag === 'single' && workbook.SheetNames.length > 1) {
        setIsUploading(false);
        toast.error('Please upload an Excel file with only one sheet.');
        return;
      }

      const extractInfoFromFilename = (urlOrName: string) => {
        const fileName = urlOrName?.split('/').pop() || '';
        const nameWithoutExt = fileName?.replace('.xlsx', '');

        // Remove prefix
        const parts = nameWithoutExt
          ?.replace('perfrequencynew-', '')
          .split('-');

        return {
          datacube: `${parts[0]}-${parts[1]}`, // 2025-2026
          module: parts?.slice(2).join('-'), // Biodiversity / Value_Chain_Partners
        };
      };

      const compareTemplateFiles = (fileA: string, fileB: string) => {
        const a = extractInfoFromFilename(fileA);
        const b = extractInfoFromFilename(fileB);

        const datacubeMatch = a.datacube === b.datacube;
        const moduleMatch = a.module === b.module;

        return {
          isMatch: datacubeMatch && moduleMatch,
          datacube: {
            fileA: a.datacube,
            fileB: b.datacube,
            match: datacubeMatch,
          },
          module: {
            fileA: a.module,
            fileB: b.module,
            match: moduleMatch,
          },
        };
      };

      // Try to read datacube/module info from the first row of the first sheet
      let headerMatch = false;
      try {
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const firstJson: any[] = XLSX.utils.sheet_to_json(firstSheet, {
          header: 1,
          raw: false,
          defval: '',
        });
        const headerRow = firstJson?.[0] || [];
        const headerText = (headerRow || []).join(' ').toLowerCase();

        const expectedDatacube = String(
          dataCube?.datacube_frequency?.datacube?.name
            || dataCube?.datacube_frequency?.datacube?.financial_year
            || '',
        );
        const expectedModule = String(
          dataCube?.task_questions?.[0]?.module_name
            || dataCube?.task_questions?.[0]?.question_sequence
              ?.public_module_name
            || '',
        )
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '_');

        if (expectedDatacube && expectedModule) {
          headerMatch = headerText.includes(expectedDatacube)
            && headerText.includes(expectedModule);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Header read failed:', e);
      }

      // Fallback to filename check if header didn't match or header not available
      const result = compareTemplateFiles(
        dataCube?.template_task_file_url,
        selectedFile?.name,
      );

      if (!headerMatch) {
        setIsUploading(false);
        toast.error('Module / Datacube not match. Please upload correct file.');
        return;
      }

      // Parse all sheets
      const allSheetsData: Record<string, any[]> = {};

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          raw: false, // Convert everything to strings first
          defval: '', // Default value for empty cells
        });

        const dataToSend = jsonData
          .slice(1) // skip header row
          .filter((row: any) => {
            const uid = row[2]?.toString().trim();
            // Skip empty rows and header-like rows
            return uid && uid !== 'UID' && uid !== 'Question UID';
          })
          .map((row: any, index: number) => {
            // Determine if it's a group question
            const groupName = row[4]?.toString().trim() || '';
            const isGroup = groupName !== '';

            // Get the answer from column G (index 6)
            let answer = row[6];

            // Handle different answer types
            if (answer === undefined || answer === null) {
              answer = '';
            } else if (typeof answer === 'number') {
              answer = answer.toString();
            } else if (typeof answer === 'string') {
              answer = answer.trim();
            } else {
              answer = String(answer).trim();
            }

            // For group questions, collect multiple answers from columns after G
            let answers: any;
            if (isGroup) {
              // For group questions, collect all values from column G onwards
              answers = row
                .slice(6) // Start from Answer column
                .filter((val: any) => {
                  // Keep all non-empty values
                  if (val === null || val === undefined) return false;
                  if (val === 0 || val === '0') return true; // Keep zeros
                  const str = String(val).trim();
                  return str !== '' && str.toLowerCase() !== 'text';
                });

              // If no answers found, use empty string as first element
              if (answers.length === 0) {
                answers = [''];
              }
            } else {
              // For non-group questions, just use the single answer
              answers = answer;
            }

            // console.log(`Row ${index + 2}: UID=${row[2]}, isGroup=${isGroup}, answer="${answer}", answers=`, answers);

            return {
              questionUid: row[2],
              isGroup,
              answers, // For groups: array, for non-groups: single value
            };
          });

        // console.log('Processed data for sheet:', sheetName, dataToSend);
        allSheetsData[sheetName] = dataToSend;
      });

      // ✅ Rename if only one sheet
      let finalSheetsData: Record<string, any[]> = {};
      if (workbook.SheetNames.length === 1) {
        const singleSheetData = allSheetsData[workbook.SheetNames[0]];
        const sheetName = dataCube?.datacube_frequency?.frequency_name
          || workbook.SheetNames[0];
        finalSheetsData[sheetName] = singleSheetData;
      } else {
        finalSheetsData = allSheetsData;
      }

      // ✅ Only set file and preview when upload is successful
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));

      // ✅ Start upload progress immediately (visual feedback)
      await fakeUpload(setUploadProgress);

      // ✅ First, upload the Excel file to S3 to get the URL
      let uploadedFileUrl: string | undefined;
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const fileUploadResponse = await TaskService.uploadFile(
          apiKey,
          formData,
        );
        if (
          fileUploadResponse?.data?.success
          && fileUploadResponse?.data?.url
        ) {
          uploadedFileUrl = fileUploadResponse.data.url;
        }
      } catch (fileUploadError) {
        // console.warn('File upload to S3 failed, continuing with answer upload:', fileUploadError);
        // Continue even if file upload fails - answers are more important
      }

      // ✅ Build payload with optional uploadedFileUrl
      const payload: any = {
        datacubeId:
          flag === 'single'
            ? dataCube?.datacube_frequency?.datacube?.id
            : datacubeId,
        moduleId:
          flag === 'single'
            ? dataCube?.task_questions?.[0]?.question_sequence?.public_module_id
            : moduleId,
        siteId: flag === 'single' ? dataCube?.site?.id : siteId,
        frequency: finalSheetsData,
        uploadedFileUrl, // ✅ Include the S3 URL if available
        isYearly: flag !== 'single',
      };

      // console.log('=== FINAL PAYLOAD ===');
      // console.log(JSON.stringify(payload, null, 2));

      // ✅ Call API to save answers
      try {
        const response = await TaskService.uploadTaskResponse(payload, apiKey);
        const resData = response?.data;

        // ✅ Handle Success
        if (resData?.status === 'Success' && resData?.success !== false) {
          onUploadSuccess?.(true);
          toast.success(resData?.message || 'File uploaded successfully!');
        }
        // ❌ Handle Known Failure (validation or business logic)
        else if (resData?.success === false) {
          const backendError = resData?.error?.[0]
            || resData?.message
            || 'Upload failed. Please try again.';
          onUploadSuccess?.(false);
          toast.error(backendError);
        }
        // ⚠️ Handle Unexpected or Empty Response
        else {
          onUploadSuccess?.(false);
          toast.error('Unexpected server response.');
        }
      } catch (apiError: any) {
        console.error('Upload API error:', apiError);

        // 🚨 Handle Network / Server Failures
        const backendError = apiError?.response?.data?.error?.[0]
          || apiError?.response?.data?.message
          || apiError?.message
          || 'Upload failed. Please try again.';

        onUploadSuccess?.(false);
        toast.error(backendError);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while processing the file.');
    } finally {
      setIsUploading(false);
    }
  };

  // --- Simulated Upload ---
  const fakeUpload = (onProgress: (value: number) => void): Promise<void> => new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        resolve();
      }
    }, 200);
  });

  // --- Add drag event listeners ---
  useEffect(() => {
    const dropZone = dropRef.current;
    if (!dropZone) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('drag-over');
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('drag-over');
    };

    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, [handleDrop]);

  const handlePreview = () => {
    if (!fileUrl) return;
    window.open(fileUrl, '_blank');
  };

  // Extract filename from URL for previously uploaded files
  const getFileNameFromUrl = (url: string) => {
    try {
      const urlPath = new URL(url).pathname;
      let filename = urlPath.substring(urlPath.lastIndexOf('/') + 1) || 'Uploaded File';

      // Remove UUID prefix if present (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx-)
      const uuidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-/i;
      filename = filename.replace(uuidPattern, '');

      return filename || 'Uploaded File';
    } catch {
      return 'Uploaded File';
    }
  };

  const displayFileName = file?.name
    || (initialUploadedFileUrl
      ? getFileNameFromUrl(initialUploadedFileUrl)
      : null);

  return (
    <div className="">
      {hasUploadedFile && displayFileName && (
        <div className="text-primary text-underline" onClick={handlePreview}>
          <FiFileText size={20} className="me-2 mb-1 d-inline" />
          <span className="text-decoration-underline">{displayFileName}</span>
        </div>
      )}
      <div className="drop_box">
        <label
          htmlFor="fileID"
          className="file-drop-box d-flex flex-column align-items-center cursor-pointer"
          ref={dropRef}
        >
          {!isUploading && (
            <FiUploadCloud size={40} className="upload-icon text-center" />
          )}

          {!hasUploadedFile ? (
            <>
              <header>
                <h4>Upload File</h4>
              </header>
              <p className="fs-12 fw-600 text-light-gray d-flex align-items-center gap-1 m-0">
                <span>
                  <HiOutlineInformationCircle size={18} />
                </span>
                <span>Upload or drag and drop the Template file here</span>
              </p>
              {/* <Button
                text={'Choose File'}
                className="mb-2 btn-sm px-sm-4 savebtn"
                onClick={() => document.getElementById('fileID')?.click()}
              ></Button> */}
            </>
          ) : (
            <form action="" method="post">
              <div className="form">
                {/* <h4>{fileName}</h4> */}
                {/* <Button
                  text="Uploaded"
                  isDisabled
                  className="mb-2 btn-sm px-sm-4 savebtn"
                ></Button> */}
                {isUploading ? (
                  // <div className="progress-container w-75 mt-3">
                  //   <div
                  //     className="progress-bar"
                  //     style={{ width: `${uploadProgress}%` }}
                  //   ></div>
                  //   <p className="fs-12 mt-1 text-secondary">
                  //     Uploading... {uploadProgress}%
                  //   </p>
                  // </div>
                  <div style={{ padding: 10 }}>
                    <IconProgressCircle progress={uploadProgress} />
                  </div>
                ) : (
                  <div>
                    <h4 className="text-center">Replace File</h4>
                    <p className="fs-12 fw-600 text-light-gray d-flex align-items-center gap-1 m-0">
                      <span>
                        <HiOutlineInformationCircle size={18} />
                      </span>
                      <span>
                        Upload or drag to replace the template file here
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </form>
          )}
        </label>
        <input
          type="file"
          hidden
          accept=".xls,.xlsx,.csv"
          id="fileID"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
