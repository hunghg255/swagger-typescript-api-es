import type { GeneratedFileDto } from '../api-types';

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadFile(file: GeneratedFileDto) {
  const type = file.name.endsWith('.js') ? 'text/javascript' : 'text/plain';
  downloadBlob(new Blob([file.content], { type: `${type};charset=utf-8` }), file.name);
}

export async function downloadZip(files: GeneratedFileDto[], zipName: string) {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  for (const file of files) zip.file(file.name, file.content);
  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  downloadBlob(blob, zipName.endsWith('.zip') ? zipName : `${zipName}.zip`);
}
