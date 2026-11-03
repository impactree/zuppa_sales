import { useParams } from 'next/navigation';
import { BsBuildings } from 'react-icons/bs';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { LuUser } from 'react-icons/lu';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { PiSignIn } from 'react-icons/pi';
import { SlBookOpen } from 'react-icons/sl';
// import { VscGraph } from 'react-icons/vsc';
import { ProgressBar, Step } from 'react-step-progress-bar';
import './MultiStepProgressBar.css';

const MultiStepProgressBar = () => {
  const params = useParams();
  const steps = [
    'company_information',
    'business_unit',
    'standard_regulations',
    'invite_user',
    // 'plans',
  ];

  const stepIndex = steps.indexOf(params?.slug as string);
  const stepPercentage = stepIndex >= 0 ? ((stepIndex + 1) * 100) / steps.length : 0;

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished }) => (
          <div className="d-flex align-items-center flex-column gap-3">
            <div
              data-testid="step"
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              {accomplished ? <IoCheckmarkSharp size={18} /> : null}
            </div>
            <span className="step-label d-none d-lg-block">Signup</span>
            <span className="step-label d-lg-none">
              <PiSignIn size={18} />
            </span>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished }) => (
          <div className="d-flex align-items-center flex-column gap-3">
            <div
              data-testid="step"
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              {accomplished ? <IoCheckmarkSharp size={18} /> : null}
            </div>

            <span className="step-label d-none d-lg-block">
              Company Information
            </span>
            <span className="step-label d-lg-none">
              <BsBuildings size={18} />
            </span>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished }) => (
          <div className="d-flex align-items-center flex-column gap-3">
            <div
              data-testid="step"
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              {accomplished ? <IoCheckmarkSharp size={18} /> : null}
            </div>

            <span className="step-label d-none d-lg-block">Business Unit</span>
            <span className="step-label d-lg-none">
              <MdOutlineBusinessCenter size={18} />
            </span>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished }) => (
          <div className="d-flex align-items-center flex-column gap-3">
            <div
              data-testid="step"
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              {accomplished ? <IoCheckmarkSharp size={18} /> : null}
            </div>

            <span className="step-label d-none d-lg-block">
              Standard & Regulations
            </span>
            <span className="step-label d-lg-none">
              <SlBookOpen size={18} />
            </span>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished }) => (
          <div className="d-flex align-items-center flex-column gap-3">
            <div
              data-testid="step"
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              {accomplished ? <IoCheckmarkSharp size={18} /> : null}
            </div>

            <span className="step-label d-none d-lg-block">Invite users</span>
            <span className="step-label d-lg-none">
              <LuUser size={18} />
            </span>
          </div>
        )}
      </Step>
      {/* <Step>
        {({ accomplished }) => (
          <div className="d-flex align-items-center flex-column gap-3">
            <div
              data-testid="step"
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              {accomplished ? <IoCheckmarkSharp size={18} /> : null}
            </div>

            <span className="step-label d-none d-lg-block">Plans</span>
            <span className="step-label d-lg-none">
              <VscGraph size={18} />
            </span>
          </div>
        )}
      </Step> */}
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
