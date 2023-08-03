import { render } from "../page";

export default function PostPage(props: {
  params: { title: string; page: number };
}) {
  return render(props);
}
