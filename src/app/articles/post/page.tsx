import type { Metadata } from 'next';
import PostViewClient from './PostViewClient';

// Viewer for posts written in the admin editor; .htaccess serves it for /articles/<slug>/
export const metadata: Metadata = {
  title: 'सनातन धर्म लेख (Sanatan Dharma Article)',
  description: 'सनातन धर्म, व्रत, पर्व, ध्यान और दर्शन पर प्रामाणिक आध्यात्मिक लेख।',
};

export default function PostPage() {
  return <PostViewClient />;
}
