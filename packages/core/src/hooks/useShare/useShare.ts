/** The use share options type */
export interface UseShareParams {
  /** Array of files to be shared */
  files?: File[];
  /** Text content to be shared */
  text?: string;
  /** Title of the content being shared */
  title?: string;
  /** URL link to be shared */
  url?: string;
}

/** The use share return type */
export interface UseShareReturn {
  /** Whether the Web Share API is supported in the current environment */
  supported: boolean;
  /** Function to trigger the native share dialog */
  trigger: (shareParams: ShareData) => Promise<void>;
}

/**
 * @name useShare
 * @description - Hook that utilizes the share api
 * @category Browser
 * @usage medium
 *
 * @browserapi share https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
 *
 * @param {UseShareParams} [params] The use share options
 * @returns {UseShareReturn}
 *
 * @example
 * const { share, supported } = useShare();
 */
export const useShare = (params?: UseShareParams) => {
  const supported = typeof navigator !== 'undefined' && 'share' in navigator;

  const trigger = async (shareParams: ShareData) => {
    if (!supported) return;

    const data = {
      ...params,
      ...shareParams
    };

    if (data.files && navigator.canShare({ files: data.files })) navigator.share(data);

    return navigator.share(data);
  };

  return { trigger, supported };
};
