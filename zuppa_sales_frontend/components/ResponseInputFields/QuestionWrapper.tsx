/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormGroup, FormLabel } from 'react-bootstrap';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { QuestionWrapperProps } from '../types';
import './NumberField.css';

export function QuestionWrapper({
  label,
  isCustomRequired,
  children,
  toolTip,
}: QuestionWrapperProps) {
  return (
    <FormGroup className="position-relative">
      <div className="row">
        <div className="col-12 col-lg-5">
          <FormLabel className="task_form_label">
            {`${label} ${isCustomRequired ? '*' : ''}`}
            {toolTip && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-html="true"
                title={toolTip}
                style={{
                  verticalAlign: 'middle',
                  display: 'inline-block',
                  marginLeft: '4px',
                }}
              >
                <IoMdInformationCircleOutline color="lightslategrey" />
              </span>
            )}
          </FormLabel>
        </div>
        <div className="col-12 col-lg-7">{children}</div>
      </div>
    </FormGroup>
  );
}
