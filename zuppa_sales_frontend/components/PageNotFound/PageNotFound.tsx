import Image from 'next/image';
import errorImg404 from '@/assests/Page not found.png';
import PageNotFoundImg from '@/assests/User.png';

export default function PageNotFound({
  isAccessDenied = false,
  isMessageShow = true,
  isImageShow = true,
}: {
  isAccessDenied?: boolean;
  isMessageShow?: boolean;
  isImageShow?: boolean;
}) {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={isImageShow ? { minHeight: '70vh' } : { minHeight: '41vh' }}
    >
      <div className={isImageShow ? ' errorImg404' : ''}>
        {isImageShow
          && (isAccessDenied ? (
            <Image src={errorImg404} alt="logo2" />
          ) : (
            <Image src={PageNotFoundImg} alt="logo3" />
          ))}
      </div>
      {isMessageShow && (
        <h4
          className="w-100 d-flex justify-content-center flex-column align-items-center"
          style={{ color: 'var(--secondary)' }}
        >
          {isAccessDenied
            ? "You can't access this page right now. Please reach out to Admin."
            : 'No data found'}
        </h4>
      )}
    </div>
  );
}
