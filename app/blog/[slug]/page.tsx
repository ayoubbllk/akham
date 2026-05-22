import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { posts, getPost } from '@/data/blog';
import { ArrowUpRight } from 'lucide-react';
import { ZelligeFragment } from '@/components/home/ZelligeFragment';
import { CalligraphyTexture } from '@/components/home/CalligraphyTexture';
import { ScanLine } from '@/components/home/ScanLine';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return { title: 'Article introuvable' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
    },
  };
}

function renderBody(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2
          key={i}
          className="h-display text-ivoire-pur text-3xl md:text-4xl mt-12 mb-4 flex items-center gap-3"
        >
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          {block.replace(/^##\s+/, '')}
        </h2>
      );
    }
    if (block.startsWith('> ')) {
      return (
        <blockquote
          key={i}
          className="relative my-12 pl-8 border-l-2 border-terracotta"
        >
          <div aria-hidden className="absolute -left-3 -top-4">
            <ZelligeFragment size={36} color="terracotta" opacity={0.5} rotation={20} shape="diamond" x="0" y="0" />
          </div>
          <p
            className="font-arabic text-terracotta"
            style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.35 }}
          >
            « {block.replace(/^>\s+/, '')} »
          </p>
        </blockquote>
      );
    }
    return (
      <p key={i} className="text-ivoire-pur/95 mb-6" style={{ fontSize: 18, lineHeight: 1.9 }}>
        {block}
      </p>
    );
  });
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const headings = post.content
    .split('\n\n')
    .filter((b) => b.startsWith('## '))
    .map((b) => b.replace(/^##\s+/, ''));

  return (
    <article className="bg-noir-chaud relative">
      <CalligraphyTexture
        words={[
          { text: 'حكاية', x: '70%', y: '10%', size: 200, rotate: -6, opacity: 0.04 },
        ]}
      />
      <ScanLine speed={14} opacity={0.18} />

      <header className="pt-40 pb-16 max-w-3xl mx-auto px-6 md:px-10 relative">
        <Link href="/blog" className="meta text-ivoire-warm hover:text-safran flex items-center gap-2 w-fit">
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          ← Journal
        </Link>
        <h1 className="h-display text-ivoire-pur text-5xl md:text-7xl mt-6 leading-tight">
          {post.title}
        </h1>
        <p className="meta text-ivoire-warm mt-6 flex items-center gap-2 flex-wrap">
          <span className="counter-mono">
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          <span className="counter-mono">{post.readTime} min</span>
          <span className="diamond" aria-hidden style={{ margin: 0 }} />
          <span>{post.author}</span>
        </p>
      </header>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <div className="relative aspect-cinema overflow-hidden bg-noir-relief">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.78)' }}
          />
          <div aria-hidden className="absolute -top-4 -right-4">
            <ZelligeFragment size={70} color="terracotta" opacity={0.5} rotation={20} shape="diamond" x="0" y="0" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="meta flex items-center gap-2">
                <span className="diamond" aria-hidden style={{ margin: 0 }} />
                Sommaire
              </p>
              <ol className="mt-4 space-y-2 text-sm text-ivoire-warm counter-mono">
                {headings.map((h, i) => (
                  <li key={i} className="hover:text-safran transition-colors">
                    <span className="text-safran/70">{String(i + 1).padStart(2, '0')}</span> · {h}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}
        <div className="max-w-2xl relative">{renderBody(post.content)}</div>
      </div>

      <section className="relative max-w-3xl mx-auto px-6 md:px-10 mt-24 mb-32 border-t border-terracotta/30 pt-12 text-center overflow-hidden">
        <div aria-hidden className="absolute -top-6 left-1/2 -translate-x-1/2">
          <ZelligeFragment size={80} color="safran" opacity={0.35} rotation={20} shape="diamond" x="0" y="0" />
        </div>
        <p className="meta">Un projet en tête ?</p>
        <h3 className="h-display text-ivoire-pur text-4xl md:text-5xl mt-3">
          Pitchez-nous <span className="text-zellige-fill">votre histoire</span>
        </h3>
        <Link href="/pitch" data-cursor="cta" className="cta-primary mt-8 inline-flex">
          Pitcher votre projet <ArrowUpRight size={14} />
        </Link>
      </section>
    </article>
  );
}
