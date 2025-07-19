import Link from 'next/link';

const Page = (props: any) => {
  const {children} = props;
  return (
    <main>{children}</main>
  );
};

/*
const Footer = () => {
  return (
    <div className="flex-col items-center justify-between">
      <Link href="/terms">
        <p className="mono2 text-center text-coinage-gray p-8 bottom-8">TERMS & CONDITIONS</p>
      </Link>
    </div>
  );
};
*/

export default Page;
