import {CSSProperties} from 'react';
import styles from './EmailBanner.module.css';
import {EmailSignup} from '../EmailSignup';

type BtnProps = {
  text?: string;
  color?: CSSProperties['color'];
  border?: CSSProperties['border'];
  fontSize?: CSSProperties['fontSize'];
  backgroundColor?: CSSProperties['backgroundColor'];
  textAlign?: CSSProperties['textAlign'];
};
export const EmailBanner: React.FC<BtnProps> = ({text}) => {
  return (
    <div className={`p-3 ${styles.innerWrapper} flex gap-8 items-center justify-center`}>
      <div className="subhead1">{text}</div>
      <div className="mt-8">
        <EmailSignup title="Sign up for game updates" subscribeLocation="trivia" />
      </div>
    </div>
  );
};
