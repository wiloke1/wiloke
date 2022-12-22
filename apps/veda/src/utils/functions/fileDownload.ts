export interface FileDownloadParams {
  data: string;
  name: string;
  type?: string;
}

const fileDownload = ({ data, name, type = 'text' }: FileDownloadParams) => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = name;
  link.href = url;
  link.click();
  window.URL.revokeObjectURL(url);
};

export default fileDownload;
