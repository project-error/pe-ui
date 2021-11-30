// Until we have access to CEFs ClipboardAPI, we will need
// to use the scuffed execCommand from back in the day
export const setClipboard = (content: string, tgtWrapper?: string) => {
  const clipEl = document.createElement('input');
  clipEl.value = content;
  clipEl.style.height = '0';

  const tgt = tgtWrapper
    ? document.getElementById(tgtWrapper) ?? document.body
    : document.body;

  tgt!.appendChild(clipEl);
  clipEl.select();
  document.execCommand('copy');
};
