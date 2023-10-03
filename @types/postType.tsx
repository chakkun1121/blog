export interface postType {
  title: string;
  /**
   * 絶対パスか/posts/img/{link}/からの相対パス
   */
  image: string;
  /**
   * 記事が入っているフォルダの名前
   */
  link: string;
  description: string;
  date: string;
  isShow?: boolean;
  tags?: string[];
}
