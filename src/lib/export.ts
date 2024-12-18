import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Note, ExportFormat, ExportSettings } from '@/types/note';
import { renderMarkdown } from './markdown';

const defaultExportSettings: ExportSettings = {
  template: 'minimal',
  pageSize: 'a4',
  orientation: 'portrait',
  includeMetadata: true,
  includeWatermark: false,
};

async function exportToPDF(note: Note, settings: ExportSettings = defaultExportSettings): Promise<Blob> {
  const html = await renderMarkdown(note.content);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  tempDiv.className = `prose max-w-none p-8 template-${settings.template}`;

  if (settings.includeMetadata) {
    const metadata = document.createElement('div');
    metadata.className = 'text-sm text-gray-500 mb-4';
    metadata.innerHTML = `
      <h1 class="text-2xl font-bold mb-2">${note.title}</h1>
      <div>Created: ${new Date(note.createdAt).toLocaleDateString()}</div>
      <div>Last updated: ${new Date(note.updatedAt).toLocaleDateString()}</div>
    `;
    tempDiv.insertBefore(metadata, tempDiv.firstChild);
  }

  document.body.appendChild(tempDiv);
  const canvas = await html2canvas(tempDiv);
  document.body.removeChild(tempDiv);

  const pdf = new jsPDF({
    orientation: settings.orientation,
    unit: 'px',
    format: settings.pageSize,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const aspectRatio = canvas.width / canvas.height;
  const imgWidth = pdfWidth;
  const imgHeight = pdfWidth / aspectRatio;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  return pdf.output('blob');
}

async function exportToImage(note: Note, settings: ExportSettings = defaultExportSettings): Promise<Blob> {
  const html = await renderMarkdown(note.content);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  tempDiv.className = `prose max-w-none p-8 template-${settings.template}`;

  if (settings.includeMetadata) {
    const metadata = document.createElement('div');
    metadata.className = 'text-sm text-gray-500 mb-4';
    metadata.innerHTML = `
      <h1 class="text-2xl font-bold mb-2">${note.title}</h1>
      <div>Created: ${new Date(note.createdAt).toLocaleDateString()}</div>
      <div>Last updated: ${new Date(note.updatedAt).toLocaleDateString()}</div>
    `;
    tempDiv.insertBefore(metadata, tempDiv.firstChild);
  }

  document.body.appendChild(tempDiv);
  const canvas = await html2canvas(tempDiv);
  document.body.removeChild(tempDiv);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    }, 'image/png');
  });
}

function exportToMarkdown(note: Note): string {
  let markdown = '';

  if (note.exportSettings?.includeMetadata) {
    markdown += `# ${note.title}\n\n`;
    markdown += `Created: ${new Date(note.createdAt).toLocaleDateString()}\n`;
    markdown += `Last updated: ${new Date(note.updatedAt).toLocaleDateString()}\n\n`;
    markdown += '---\n\n';
  }

  markdown += note.content;
  return markdown;
}

export async function exportNote(
  note: Note,
  format: ExportFormat,
  settings: ExportSettings = defaultExportSettings
): Promise<Blob | string> {
  switch (format) {
    case 'pdf':
      return exportToPDF(note, settings);
    case 'image':
      return exportToImage(note, settings);
    case 'markdown':
      return exportToMarkdown(note);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}