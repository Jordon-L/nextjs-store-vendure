import Link from "next/link";
import { useRouter } from "next/router";

function ActiveLink(props: {
  children: string | JSX.Element | JSX.Element[];
  href: string;
}) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === props.href ? "red" : "black",
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(props.href);
  };

  return (
    <Link href={props.href} onClick={handleClick} style={style}>
      {props.children}
    </Link>
  );
}

export default ActiveLink;
