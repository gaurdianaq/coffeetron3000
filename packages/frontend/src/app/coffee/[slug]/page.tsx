export default function Page({ params }: { params: { slug: string } }) {
  return <main>{params.slug}</main>;
}
