// // import { Toaster } from 'sonner';

// // import { PlateEditor } from '@/components/plate-editor';
// // import { SettingsProvider } from '@/components/editor/settings';

// // export default function Page() {
// //   return (
// //     <div className="h-screen w-full plate-theme" data-registry="plate">
// //       {/* <SettingsProvider> */}
// //       <PlateEditor />
// //       {/* </SettingsProvider> */}

// //       <Toaster />
// //     </div>
// //   );
// // }

// "use client"
// import Link from 'next/link';
// import PlateEditor from '@/components/plate-editor';
// import { buttonVariants } from '@/components/plate-ui/button';
// import { SiteHeader } from '@/components/site/site-header';
// import { TailwindIndicator } from '@/components/site/tailwind-indicator';
// import { TooltipProvider } from '@radix-ui/react-tooltip';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { cn } from '@udecode/cn';
// import { fontSans } from '@/interfaces/fonts';

// export default function IndexPage() {

//   // const searchParams = useSearchParams();
//   // const docxUrl = searchParams.get('docxUrl');

//   const searchParams = useSearchParams();
//   const params = Object.fromEntries(searchParams);
//   const docxUrl = params.docxUrl;

//   return (
//       <><h1 style={{ fontSize: 20, fontWeight: "bold", color: "#0d47a1" }}>
//       Report Editor
//         </h1>
//         <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 plate-theme">
//           <div className="max-w-[1336px] rounded-lg border bg-background shadow">
//             <PlateEditor docxUrl={docxUrl} />
//           </div>
//         </section>
//       </>
//   );
// }

'use client';

import PlateEditor from '@/components/ui/plate-editor';
import { useSearchParams } from 'next/navigation';
// import { Download } from 'lucide-react';

export default function IndexPage() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { docxUrl } = params;

  return <PlateEditor docxUrl={docxUrl} />;
}
