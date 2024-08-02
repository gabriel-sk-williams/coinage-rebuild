import {FormEvent, useState} from 'react';
import {addEmail} from '../../hooks/addMarketingEmail';
import {EmailInput} from '../Inputs/Email';
// import Success from "../assets/CheckCircle.svg";
// import Error from "../assets/XCircle.svg";
import {Button} from '../Actions';
import cx from 'classnames';
import {WalletMarketing} from '../Inputs/WalletMarketing';

type InputProps = {
  title: string;
  containerClassName?: string;
  titleClassName?: string;
  subscribeLocation?: string;
  formClassName?: string;
};
export const EmailSignup: React.FC<InputProps> = ({
  title, containerClassName, titleClassName, subscribeLocation, formClassName
}) => {

  const [status, setStatus] = useState<{
    state: null | 'success' | 'error' | 'loading';
    message: string;
  }>({state: null, message: ''});

  const shouldButtonBeDisabled = () => {
    if (!status.state) return false;
    return ['loading', 'error'].includes(status.state);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (status.state === 'error') return;
    setStatus({state: 'loading', message: ''});

    //@ts-expect-error
    const email = evt.target.email.value;
    //@ts-expect-error
    const walletAddress = evt.target.wallet.value;

    const {data, error} = await addEmail(email, subscribeLocation ?? 'subscribe', walletAddress);

    if (error) {
      return setStatus({
        state: 'error',
        message: 'Sorry something went wrong, please try again or email contact@trustless.media',
      });
    }
    if (data && !error) {
      return setStatus({
        state: 'success',
        message: "Thank you. We'll be in touch.",
      });
    }
    
  };

  return (
    <div className={containerClassName}>
      <p className={cx('mb-4', titleClassName)}>{title}</p>
      <form noValidate onSubmit={handleSubmit} className={cx('flex max-w-[500px] gap-2 flex-col', formClassName)}>
        <EmailInput status={status} setStatus={setStatus} inputClassName="px-4 py-2 border-slate-50 flex-1 tab:w-[300px] focus:outline-slate-400 text-coinage-black" />
        <WalletMarketing inputClassName="px-4 py-2 border-slate-50 flex-1 tab:w-[300px] focus:outline-slate-400 text-coinage-black" />
        <Button
          //analyticsProperty="email subscribe"
          modifier="primary"
          className="w-auto"
          type="submit"
          loading={status.state === 'loading'}
          disabled={shouldButtonBeDisabled()}
        >
          Sign Up
        </Button>
      </form>
      {status.state && (
        <div className="min-h-[60px] flex gap-2 text-coinage-black items-center">
          {status.state === 'error' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" />
              <path d="M15 9L9 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15 15L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          )}
          {status.state === 'success' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.125 9.75L10.6219 15L7.875 12.375" stroke="currentColor" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          )}
          <p className="text-sm">{status.message}</p>
        </div>
      )}
    </div>
  );
};
