import Head from "next/head";
const HeadSection = ({ title, metadata, links }) => {
  return (
    <Head>
      <title>{title}</title>
      {metadata &&
        metadata.length > 0 &&
        metadata.map(({ name, content }) => (
          <meta name={name} property={`og:${name}`} content={content} key={`${name}-key`} />
        ))}
      {links &&
        links.length > 0 &&
        links.map(({ rel, href }) => (
          <link rel={rel} href={href} key={`${href}-key`} />
        ))}
    </Head>
  );
};

export default HeadSection;
